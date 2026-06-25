"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ConversationProvider, useConversation } from "@elevenlabs/react";
import {
  Mic,
  PhoneOff,
  RotateCcw,
  Captions,
  Check,
  AlertTriangle,
  Radio,
} from "lucide-react";
import {
  patchMeeting,
  pickBuyer,
  type Deal,
  type Meeting,
  type SimDebrief,
  type SimLine,
} from "@/lib/deals";
import { buildDealContext, buildMeetingContext } from "@/lib/deal-context";
import { cn } from "@/lib/utils";
import { PushToTalkButton } from "@/components/voice/push-to-talk-button";

type Phase =
  | "idle"
  | "connecting"
  | "live"
  | "debriefing"
  | "done"
  | "tooShort"
  | "error";

const MIN_SECONDS = 30;

export function SimPanel({ deal, meeting }: { deal: Deal; meeting: Meeting }) {
  return (
    <ConversationProvider>
      <SimInner deal={deal} meeting={meeting} />
    </ConversationProvider>
  );
}

function SimInner({ deal, meeting }: { deal: Deal; meeting: Meeting }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [transcript, setTranscript] = useState<SimLine[]>([]);
  const [debrief, setDebrief] = useState<SimDebrief | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [captionsOn, setCaptionsOn] = useState(true);
  // Push-to-talk: the mic stays muted unless the user is holding the button.
  const [talking, setTalking] = useState(false);
  const [doneSeconds, setDoneSeconds] = useState(0);

  const transcriptRef = useRef<SimLine[]>([]);
  const endedRef = useRef(false);
  const startedAtRef = useRef(0);
  const maxSecondsRef = useRef(0);
  const phaseRef = useRef<Phase>("idle");
  // Latest values for the deferred voice callbacks, synced after each render.
  const dealRef = useRef(deal);
  const meetingRef = useRef(meeting);
  const finishRef = useRef<(hangUp: boolean) => void>(() => {});

  const buyer = pickBuyer(deal, meeting);
  const buyerName = buyer?.name || "the buyer";

  const conversation = useConversation({
    micMuted: !talking,
    onMessage: (m: { message?: string; source?: string }) => {
      const text = m?.message ?? "";
      if (!text) return;
      const role: SimLine["role"] = m?.source === "user" ? "rep" : "buyer";
      transcriptRef.current = [...transcriptRef.current, { role, text }];
      setTranscript(transcriptRef.current);
    },
    onDisconnect: () => {
      if (phaseRef.current === "live" && !endedRef.current) void finishRef.current(false);
    },
    onError: () => {
      if (phaseRef.current === "connecting" || phaseRef.current === "live") {
        const secs = startedAtRef.current
          ? Math.floor((Date.now() - startedAtRef.current) / 1000)
          : 0;
        if (phaseRef.current === "live" && secs >= MIN_SECONDS) {
          void finishRef.current(false);
        } else {
          setErrorMsg(
            "The call dropped. Check your mic permission and connection, then run it back."
          );
          setPhase("error");
        }
      }
    },
  });

  // Countdown to the cap.
  useEffect(() => {
    if (phase !== "live") return;
    const t = setInterval(() => {
      const left = Math.max(
        0,
        maxSecondsRef.current -
          Math.floor((Date.now() - startedAtRef.current) / 1000)
      );
      setRemaining(left);
      if (left <= 0 && !endedRef.current) void finishRef.current(true);
    }, 1000);
    return () => clearInterval(t);
  }, [phase]);

  // End the call if the panel unmounts (e.g. leaving the meeting mid-rehearsal).
  useEffect(() => {
    return () => {
      endedRef.current = true;
      void conversation.endSession?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function start() {
    setPhase("connecting");
    setErrorMsg("");
    setTalking(false);
    transcriptRef.current = [];
    setTranscript([]);
    setDebrief(null);
    endedRef.current = false;
    try {
      const res = await fetch("/api/sim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          context: buildDealContext(deal),
          meeting: buildMeetingContext(deal, meeting),
          buyer: buyer
            ? {
                name: buyer.name,
                title: buyer.title,
                role: buyer.role,
                sentiment: buyer.sentiment,
              }
            : null,
          account: deal.account,
          meetingType: meeting.type,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Rehearsal unavailable.");
      maxSecondsRef.current = data.maxSeconds ?? 600;

      await conversation.startSession({
        signedUrl: data.signedUrl,
        overrides: data.overrides,
        connectionType: "websocket",
      } as unknown as Parameters<typeof conversation.startSession>[0]);

      startedAtRef.current = Date.now();
      setRemaining(maxSecondsRef.current);
      setPhase("live");
    } catch (e) {
      setErrorMsg(
        e instanceof Error && e.message
          ? e.message
          : "Couldn't start the rehearsal. Mic permission?"
      );
      setPhase("error");
    }
  }

  const finish = useCallback(
    async (hangUp: boolean) => {
      if (endedRef.current) return;
      endedRef.current = true;
      if (hangUp) {
        try {
          await conversation.endSession();
        } catch {
          // already closed
        }
      }
      const lines = transcriptRef.current;
      const seconds = startedAtRef.current
        ? Math.floor((Date.now() - startedAtRef.current) / 1000)
        : 0;
      const repTurns = lines.filter((t) => t.role === "rep").length;
      if (seconds < MIN_SECONDS || repTurns < 2) {
        setPhase("tooShort");
        return;
      }
      setPhase("debriefing");
      const d = dealRef.current;
      const mtg = meetingRef.current;
      try {
        const res = await fetch("/api/sim-debrief", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            context: buildDealContext(d),
            meeting: buildMeetingContext(d, mtg),
            transcript: lines,
            seconds,
          }),
        });
        const data = await res.json();
        if (!res.ok || data?.error) throw new Error(data?.error);
        if (data?.incomplete) {
          setPhase("tooShort");
          return;
        }
        const v = data as SimDebrief;
        setDebrief(v);
        patchMeeting(d.id, mtg.id, {
          sim: { buyer: buyerName, transcript: lines, seconds, debrief: v },
          simAt: Date.now(),
        });
        setDoneSeconds(seconds);
        setPhase("done");
      } catch {
        setErrorMsg(
          "The debrief couldn't be written. Your rehearsal still happened — try again in a minute."
        );
        setPhase("error");
      }
    },
    [conversation, buyerName]
  );

  // Keep the refs the deferred voice callbacks read pointed at the latest values.
  useEffect(() => {
    phaseRef.current = phase;
    dealRef.current = deal;
    meetingRef.current = meeting;
    finishRef.current = finish;
  });

  const saved = meeting.sim;
  const mins = remaining !== null ? Math.floor(remaining / 60) : 0;
  const secs = remaining !== null ? remaining % 60 : 0;

  return (
    <div className="mt-4">
      {/* ── Pre-call / idle ── */}
      {phase === "idle" || phase === "connecting" || phase === "error" ? (
        <div className="rounded-2.5xl bg-surface p-5 shadow-card">
          <div className="flex items-center gap-2">
            <Radio size={18} className="text-violet" />
            <h4 className="font-display text-lg font-bold text-ink">
              Rehearse this meeting
            </h4>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            Practice this meeting out loud against an AI buyer built from the
            deal. You&apos;ll be live with{" "}
            <span className="font-semibold text-ink">{buyerName}</span>
            {buyer?.title ? (
              <span className="text-muted"> — {buyer.title}</span>
            ) : null}
            {buyer?.role ? (
              <span className="text-faint"> ({buyer.role})</span>
            ) : null}
            . When you wrap up, you get a MEDDPICC + value-execution debrief.
          </p>
          <ul className="mt-3 space-y-1 text-[13px] leading-relaxed text-muted">
            <li>• Headphones on, quiet room — talk to them like a real call.</li>
            <li>• Hold the button to talk, release when you&apos;re done — then they push back.</li>
            <li>• Hit End (or just wrap up) and the coach reviews the tape.</li>
          </ul>

          {phase === "error" ? (
            <div className="mt-3 rounded-xl bg-danger-tint p-3 text-sm leading-relaxed text-ink/90">
              {errorMsg}
            </div>
          ) : null}

          <button
            onClick={start}
            disabled={phase === "connecting"}
            className={cn(
              "mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-teal py-3.5 font-semibold text-ink transition-transform duration-150 ease-out active:scale-[0.99]",
              phase === "connecting" && "opacity-60"
            )}
          >
            <Mic size={16} />
            {phase === "connecting"
              ? "Connecting…"
              : saved?.debrief
              ? "Rehearse again"
              : "Start rehearsal"}
          </button>
          <p className="mt-2 text-center text-[11px] text-faint">
            Voice runs on the live site; locally it needs the server voice key.
          </p>

          {saved?.debrief && phase !== "error" ? (
            <div className="mt-5 border-t border-line pt-5">
              <DebriefView
                debrief={saved.debrief}
                seconds={saved.seconds}
                transcript={saved.transcript}
                heading="Last rehearsal"
              />
            </div>
          ) : null}
        </div>
      ) : null}

      {/* ── Live ── */}
      {phase === "live" ? (
        <div className="flex flex-col items-center rounded-2.5xl bg-surface p-6 shadow-card">
          <div className="flex w-full items-center justify-between">
            <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-danger">
              <span className="h-2 w-2 animate-pulse rounded-full bg-danger" />
              Live
            </span>
            {remaining !== null ? (
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-bold tabular-nums",
                  remaining < 60 ? "bg-danger-tint text-danger" : "bg-mist text-muted"
                )}
              >
                {mins}:{secs.toString().padStart(2, "0")}
              </span>
            ) : null}
          </div>

          <div
            className={cn(
              "mt-4 flex h-32 w-32 items-center justify-center rounded-full transition-all duration-150 ease-out",
              conversation.isSpeaking
                ? "bg-violet/15 ring-8 ring-violet/20"
                : talking
                  ? "bg-danger-tint ring-8 ring-danger/30"
                  : "bg-teal-tint ring-8 ring-teal/25"
            )}
          >
            <div className="text-center">
              <p className="font-display text-2xl font-bold text-ink">
                {buyerName.split(" ")[0]}
              </p>
              <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wide text-ink/55">
                {conversation.isSpeaking ? "talking" : talking ? "recording…" : "hold to talk"}
              </p>
            </div>
          </div>

          {captionsOn ? (
            <div className="mt-4 max-h-36 w-full space-y-1.5 overflow-y-auto">
              {transcript.slice(-4).map((t, i) => (
                <p
                  key={`${transcript.length}-${i}`}
                  className={cn(
                    "text-[13px] leading-snug",
                    t.role === "buyer" ? "text-ink/85" : "text-teal-dark"
                  )}
                >
                  <b>{t.role === "buyer" ? buyerName.split(" ")[0] : "You"}:</b>{" "}
                  {t.text}
                </p>
              ))}
            </div>
          ) : null}

          <PushToTalkButton
            talking={talking}
            onStart={() => setTalking(true)}
            onStop={() => setTalking(false)}
            className="mt-6"
          />

          <div className="mt-2.5 flex items-center justify-center gap-2.5">
            <button
              onClick={() => setCaptionsOn((c) => !c)}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-150",
                captionsOn ? "bg-ink text-white" : "bg-mist text-ink"
              )}
              aria-label="Toggle captions"
            >
              <Captions size={18} />
            </button>
            <button
              onClick={() => finish(true)}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-danger px-4 font-semibold text-white transition-transform duration-150 active:scale-[0.98]"
            >
              <PhoneOff size={18} /> End &amp; debrief
            </button>
          </div>
        </div>
      ) : null}

      {/* ── Debriefing ── */}
      {phase === "debriefing" ? (
        <div className="rounded-2.5xl bg-surface p-10 text-center shadow-card">
          <div className="text-4xl">📼</div>
          <p className="mt-3 animate-pulse font-display text-lg font-bold text-ink">
            Reviewing the tape…
          </p>
          <p className="mt-1 text-sm text-muted">
            Grading your MEDDPICC and value execution.
          </p>
        </div>
      ) : null}

      {/* ── Too short ── */}
      {phase === "tooShort" ? (
        <div className="rounded-2.5xl bg-surface p-8 text-center shadow-card">
          <div className="text-4xl">⏱️</div>
          <p className="mt-3 font-display text-lg font-bold text-ink">
            Too short to debrief
          </p>
          <p className="mx-auto mt-1 max-w-sm text-sm leading-relaxed text-muted">
            Give the buyer a few real answers before wrapping up, then I can
            score it.
          </p>
          <button
            onClick={start}
            className="mx-auto mt-4 flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 font-semibold text-white"
          >
            <RotateCcw size={16} /> Run it back
          </button>
        </div>
      ) : null}

      {/* ── Done ── */}
      {phase === "done" && debrief ? (
        <div>
          <DebriefView
            debrief={debrief}
            seconds={doneSeconds}
            transcript={transcript}
            heading="Debrief"
          />
          <button
            onClick={start}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-3.5 font-semibold text-white transition-transform duration-150 active:scale-[0.99]"
          >
            <RotateCcw size={16} /> Rehearse again
          </button>
        </div>
      ) : null}
    </div>
  );
}

function verdictTone(v: string) {
  if (v === "Hit") return "bg-good-soft text-good-deep";
  if (v === "Partial") return "bg-warn-soft text-warn-deep";
  return "bg-danger-tint text-danger";
}

function DebriefView({
  debrief,
  seconds,
  transcript,
  heading,
}: {
  debrief: SimDebrief;
  seconds: number;
  transcript: SimLine[];
  heading: string;
}) {
  const mins = Math.round(seconds / 60);
  return (
    <div className="space-y-3">
      {/* Score */}
      <div className="rounded-2.5xl bg-ink p-6 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
          {heading}
        </p>
        <div className="mt-2 font-display text-6xl font-bold text-gold">
          {debrief.score}
        </div>
        <p className="mt-1 text-xs text-white/55">
          execution · ~{mins} min
        </p>
        <p className="mt-3 text-sm leading-relaxed text-white/80">
          {debrief.summary}
        </p>
        <div
          className={cn(
            "mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold",
            debrief.advanced
              ? "bg-good-soft text-good-deep"
              : "bg-warn-soft text-warn-deep"
          )}
        >
          {debrief.advanced ? <Check size={13} /> : <AlertTriangle size={13} />}
          {debrief.advanced ? "Advanced the deal" : "Didn't advance"}
        </div>
        <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-white/65">
          {debrief.advanceNote}
        </p>
      </div>

      {/* MEDDPICC execution */}
      <div className="rounded-2.5xl bg-surface p-5 shadow-card">
        <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal-dark">
          MEDDPICC execution
        </h4>
        <div className="mt-2.5 space-y-2">
          {debrief.meddpicc.map((m, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span
                className={cn(
                  "mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                  verdictTone(m.verdict)
                )}
              >
                {m.verdict}
              </span>
              <p className="text-sm leading-relaxed text-ink/90">
                <span className="font-bold text-ink">{m.area}.</span> {m.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Value execution */}
      {debrief.valueExecution.length ? (
        <div className="rounded-2.5xl bg-surface p-5 shadow-card">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal-dark">
            Value story
          </h4>
          <ul className="mt-2 space-y-1.5">
            {debrief.valueExecution.map((v, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm leading-relaxed text-ink/90"
              >
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
                {v}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Strengths */}
      {debrief.strengths.length ? (
        <div className="rounded-2.5xl bg-surface p-5 shadow-card">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal-dark">
            What landed
          </h4>
          <ul className="mt-2 space-y-1.5">
            {debrief.strengths.map((s, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm leading-relaxed text-ink/90"
              >
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Fixes */}
      {debrief.fixes.map((f, i) => (
        <div key={i} className="rounded-2.5xl bg-ink p-5">
          <p className="text-sm leading-relaxed text-white/85">{f.issue}</p>
          <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
            Say this instead
          </p>
          <p className="mt-1 text-[15px] font-medium leading-relaxed text-white">
            “{f.sayThis}”
          </p>
        </div>
      ))}

      {/* Transcript */}
      {transcript.length ? (
        <details className="rounded-2.5xl bg-surface p-5 shadow-card">
          <summary className="cursor-pointer text-[11px] font-bold uppercase tracking-[0.14em] text-faint">
            Full transcript
          </summary>
          <div className="mt-3 space-y-1.5">
            {transcript.map((t, i) => (
              <p key={i} className="text-[13px] leading-relaxed text-ink/85">
                <b className={t.role === "rep" ? "text-teal-dark" : "text-ink"}>
                  {t.role === "rep" ? "You" : "Buyer"}:
                </b>{" "}
                {t.text}
              </p>
            ))}
          </div>
        </details>
      ) : null}
    </div>
  );
}
