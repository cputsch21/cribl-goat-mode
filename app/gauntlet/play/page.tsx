"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ConversationProvider, useConversation } from "@elevenlabs/react";
import {
  ArrowLeft,
  BookOpen,
  Captions,
  Mic,
  MicOff,
  PhoneOff,
  RotateCcw,
} from "lucide-react";
import {
  INTERVIEWERS,
  LEVELS_BY_N,
  type PersonId,
} from "@/lib/content/interviews";
import {
  levelUnlocked,
  recordInterview,
  saveVerdict,
  useProgress,
} from "@/lib/progress";
import { Sheet } from "@/components/sheet";
import { cn } from "@/lib/utils";

type Phase = "idle" | "connecting" | "live" | "judging" | "verdict" | "tooShort" | "error";

interface Line {
  role: "user" | "interviewer";
  text: string;
}

interface Verdict {
  score: number;
  passed: boolean;
  passBar: number;
  tripped: boolean;
  summary: string;
  strengths: string[];
  fixes: { issue: string; sayThis: string }[];
  moments: string[];
  tripwiresHit: string[];
}

const MIN_TURNS = 6;

function PlayInner() {
  const params = useSearchParams();
  const person = (params.get("person") ?? "") as PersonId;
  const level = (Number(params.get("level")) || 1) as 1 | 2 | 3 | 4 | 5;
  const mode = params.get("mode") === "skate" ? "skate" : "game";

  const progress = useProgress();
  const p = INTERVIEWERS[person];
  const l = LEVELS_BY_N.get(level);

  const [phase, setPhase] = useState<Phase>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [transcript, setTranscript] = useState<Line[]>([]);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [captionsOn, setCaptionsOn] = useState(true);
  const [micMuted, setMicMuted] = useState(false);
  const [helperOpen, setHelperOpen] = useState(false);
  const [helper, setHelper] = useState<{ perfect: string; beats: string[] } | null>(null);
  const [helperLoading, setHelperLoading] = useState(false);

  const transcriptRef = useRef<Line[]>([]);
  const endedRef = useRef(false);
  const startedAtRef = useRef(0);
  const maxSecondsRef = useRef(0);
  const helperCache = useRef(new Map<string, { perfect: string; beats: string[] }>());
  const phaseRef = useRef<Phase>("idle");
  phaseRef.current = phase;

  const conversation = useConversation({
    micMuted,
    onMessage: (m: { message?: string; source?: string }) => {
      const text = m?.message ?? "";
      if (!text) return;
      const role: Line["role"] = m?.source === "user" ? "user" : "interviewer";
      transcriptRef.current = [...transcriptRef.current, { role, text }];
      setTranscript(transcriptRef.current);
    },
    onDisconnect: () => {
      // Agent or network closed the call — judge what we have.
      if (phaseRef.current === "live" && !endedRef.current) void finish(false);
    },
    onError: () => {
      if (phaseRef.current === "connecting" || phaseRef.current === "live") {
        if (transcriptRef.current.filter((t) => t.role === "user").length >= MIN_TURNS) {
          void finish(false);
        } else {
          setErrorMsg(
            "The call dropped. Check your mic permission and connection, then run it back."
          );
          setPhase("error");
        }
      }
    },
  });

  // Countdown
  useEffect(() => {
    if (phase !== "live") return;
    const t = setInterval(() => {
      const left = Math.max(
        0,
        maxSecondsRef.current - Math.floor((Date.now() - startedAtRef.current) / 1000)
      );
      setRemaining(left);
      if (left <= 0 && !endedRef.current) void finish(true);
    }, 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // End session on unmount
  useEffect(() => {
    return () => {
      endedRef.current = true;
      void conversation.endSession?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lastQuestion = useMemo(() => {
    for (let i = transcript.length - 1; i >= 0; i--) {
      if (transcript[i].role === "interviewer") return transcript[i].text;
    }
    return null;
  }, [transcript]);

  // Morning Skate helper: fetch the perfect answer for the latest question.
  useEffect(() => {
    if (mode !== "skate" || !helperOpen || !lastQuestion) return;
    const cached = helperCache.current.get(lastQuestion);
    if (cached) {
      setHelper(cached);
      return;
    }
    setHelperLoading(true);
    setHelper(null);
    fetch("/api/gauntlet/helper", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: lastQuestion, person }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d?.perfect) {
          helperCache.current.set(lastQuestion, d);
          setHelper(d);
        }
      })
      .catch(() => {})
      .finally(() => setHelperLoading(false));
  }, [mode, helperOpen, lastQuestion, person]);

  async function start() {
    setPhase("connecting");
    setErrorMsg("");
    transcriptRef.current = [];
    setTranscript([]);
    setVerdict(null);
    endedRef.current = false;
    try {
      const res = await fetch("/api/gauntlet/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ person, level }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Session unavailable.");
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
          : "Couldn't start the call. Mic permission?"
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
      const turns = lines.filter((t) => t.role === "user").length;
      if (turns < MIN_TURNS) {
        setPhase("tooShort");
        return;
      }
      setPhase("judging");
      try {
        const seconds = Math.floor((Date.now() - startedAtRef.current) / 1000);
        const res = await fetch("/api/gauntlet/judge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ person, level, transcript: lines, seconds }),
        });
        const data = await res.json();
        if (!res.ok || data?.error) throw new Error(data?.error);
        if (data?.incomplete) {
          setPhase("tooShort");
          return;
        }
        const v = data as Verdict;
        setVerdict(v);
        if (mode === "game") {
          recordInterview(person, level, v.score, v.passed);
          saveVerdict(person, level, v);
        }
        setPhase("verdict");
      } catch {
        setErrorMsg(
          "The judge couldn't review the tape. Your interview still happened — try judging again in a minute."
        );
        setPhase("error");
      }
    },
    [conversation, level, mode, person]
  );

  if (!p || !l) {
    return (
      <main className="mx-auto w-full max-w-xl lg:max-w-2xl">
        <Link href="/gauntlet" className="flex w-fit items-center gap-1.5 text-sm font-medium text-muted">
          <ArrowLeft size={16} /> Gauntlet
        </Link>
        <p className="mt-6 text-sm text-muted">That interview doesn&apos;t exist.</p>
      </main>
    );
  }

  const locked = mode === "game" && !levelUnlocked(progress, person, level);
  const mins = remaining !== null ? Math.floor(remaining / 60) : 0;
  const secs = remaining !== null ? remaining % 60 : 0;

  // ── Locked guard ──
  if (locked) {
    return (
      <main className="mx-auto w-full max-w-xl lg:max-w-2xl">
        <Link href="/gauntlet" className="flex w-fit items-center gap-1.5 text-sm font-medium text-muted">
          <ArrowLeft size={16} /> Gauntlet
        </Link>
        <div className="mt-6 rounded-2.5xl bg-ink p-6 text-white">
          <p className="font-display text-xl font-bold">
            {p.name} · Level {level} is locked
          </p>
          <p className="mt-2 text-sm text-white/65">
            Pass Level {level - 1} in Game Time first — or run it as a Morning
            Skate with the helper, no stakes.
          </p>
          <Link
            href={`/gauntlet/play?person=${person}&level=${level}&mode=skate`}
            className="mt-4 block w-full rounded-xl bg-gold py-3 text-center font-semibold text-ink"
          >
            Open as Morning Skate
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-xl lg:max-w-2xl">
      <header className="flex items-center justify-between">
        <Link
          href="/gauntlet"
          className="flex w-fit items-center gap-1.5 text-sm font-medium text-muted transition-colors duration-150 hover:text-ink"
        >
          <ArrowLeft size={16} /> Gauntlet
        </Link>
        {phase === "live" && remaining !== null ? (
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-bold tabular-nums",
              remaining < 60 ? "bg-danger-tint text-danger" : "bg-mist text-muted"
            )}
          >
            {mins}:{secs.toString().padStart(2, "0")}
          </span>
        ) : null}
      </header>

      {/* ── Pre-call ── */}
      {phase === "idle" || phase === "connecting" || phase === "error" ? (
        <div className="mt-6 space-y-4">
          <div className="rounded-2.5xl bg-surface p-5 shadow-card">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-display text-2xl font-bold leading-tight">
                  {p.emoji} {p.name}
                </p>
                <p className="mt-1 text-sm text-muted">{p.title}</p>
              </div>
              <span className="shrink-0 rounded-full bg-ink px-3 py-1.5 font-display text-xs font-bold text-gold">
                L{level} · {l.name}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink/85">{l.blurb}</p>
            <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] font-semibold">
              <span className="rounded-full bg-mist px-2.5 py-1 text-muted">~{l.minutes} min</span>
              {mode === "game" ? (
                <span className="rounded-full bg-teal-tint px-2.5 py-1 text-teal-dark">
                  pass at {l.passBar} · counts
                </span>
              ) : (
                <span className="rounded-full bg-gold-soft px-2.5 py-1 text-gold-deep">
                  morning skate · helper on · nothing recorded
                </span>
              )}
              {level >= 3 ? (
                <span className="rounded-full bg-danger-tint px-2.5 py-1 text-danger">
                  tripwires armed
                </span>
              ) : null}
            </div>
          </div>

          <ul className="space-y-1.5 px-1 text-[13px] leading-relaxed text-muted">
            <li>• Headphones on, quiet room, answer out loud and naturally.</li>
            <li>• You can interrupt {p.name.split(" ")[0]} mid-sentence — it&apos;s a real call.</li>
            <li>
              • When they say goodbye (or time runs out), the judge reviews the
              tape{mode === "game" ? " and scores it" : ""}.
            </li>
            {mode === "skate" ? (
              <li>• The 📖 helper shows the perfect answer to the current question.</li>
            ) : null}
          </ul>

          {phase === "error" ? (
            <div className="rounded-xl bg-danger-tint p-4 text-sm leading-relaxed text-ink/90">
              {errorMsg}
            </div>
          ) : null}

          <button
            onClick={start}
            disabled={phase === "connecting"}
            className={cn(
              "w-full rounded-xl bg-ink py-4 text-center font-semibold text-white transition-all duration-150 ease-out active:scale-[0.99]",
              phase === "connecting" && "opacity-60"
            )}
          >
            {phase === "connecting" ? "Calling…" : `Start the interview`}
          </button>
        </div>
      ) : null}

      {/* ── Live call ── */}
      {phase === "live" ? (
        <div className="mt-6 flex flex-col items-center">
          <div
            className={cn(
              "flex h-40 w-40 items-center justify-center rounded-full transition-all duration-150 ease-out",
              conversation.isSpeaking
                ? "bg-teal-tint ring-8 ring-teal/30"
                : "bg-gold-soft ring-8 ring-gold/30"
            )}
          >
            <div className="text-center">
              <div className="text-4xl">{p.emoji}</div>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-ink/60">
                {conversation.isSpeaking ? `${p.name.split(" ")[0]} talking` : "your turn"}
              </p>
            </div>
          </div>

          <p className="mt-4 font-display text-lg font-bold">
            {p.name} · {l.name}
          </p>

          {captionsOn ? (
            <div className="mt-4 max-h-40 w-full space-y-1.5 overflow-y-auto">
              {transcript.slice(-4).map((t, i) => (
                <p
                  key={`${transcript.length}-${i}`}
                  className={cn(
                    "text-[13px] leading-snug",
                    t.role === "interviewer" ? "text-ink/85" : "text-teal-dark"
                  )}
                >
                  <b>{t.role === "interviewer" ? p.name.split(" ")[0] : "You"}:</b> {t.text}
                </p>
              ))}
            </div>
          ) : null}

          <div className="mt-6 flex w-full items-center justify-center gap-2.5">
            <button
              onClick={() => setMicMuted((m) => !m)}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-150",
                micMuted ? "bg-danger text-white" : "bg-mist text-ink"
              )}
              aria-label={micMuted ? "Unmute" : "Mute"}
            >
              {micMuted ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
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
            {mode === "skate" ? (
              <button
                onClick={() => setHelperOpen(true)}
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-gold px-4 font-semibold text-ink transition-transform duration-150 active:scale-[0.98]"
              >
                <BookOpen size={18} /> Helper
              </button>
            ) : null}
            <button
              onClick={() => finish(true)}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-danger px-4 font-semibold text-white transition-transform duration-150 active:scale-[0.98]"
            >
              <PhoneOff size={18} /> End
            </button>
          </div>
        </div>
      ) : null}

      {/* ── Judging ── */}
      {phase === "judging" ? (
        <div className="mt-16 text-center">
          <div className="text-5xl">📼</div>
          <p className="mt-4 animate-pulse font-display text-xl font-bold">
            The judge is reviewing the tape…
          </p>
          <p className="mt-2 text-sm text-muted">
            Scoring substance, form, and {level >= 3 ? "tripwires" : "fundamentals"}.
          </p>
        </div>
      ) : null}

      {/* ── Too short ── */}
      {phase === "tooShort" ? (
        <div className="mt-10 space-y-4 text-center">
          <div className="text-5xl">⏱️</div>
          <p className="font-display text-xl font-bold">Too short to judge</p>
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted">
            A real round needs at least {MIN_TURNS} answers from you. Run it
            back and go the distance — hang in until {p.name.split(" ")[0]} wraps it up.
          </p>
          <button
            onClick={start}
            className="mx-auto flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 font-semibold text-white"
          >
            <RotateCcw size={16} /> Run it back
          </button>
        </div>
      ) : null}

      {/* ── Verdict ── */}
      {phase === "verdict" && verdict ? (
        <div className="mt-6 space-y-4">
          <div
            className={cn(
              "rounded-2.5xl p-7 text-center",
              verdict.passed ? "bg-ink text-white" : "bg-surface shadow-card"
            )}
          >
            <div className="text-4xl">{verdict.passed ? "🐐" : verdict.tripped ? "🪤" : "📚"}</div>
            <div
              className={cn(
                "mt-3 font-display text-6xl font-bold",
                verdict.passed ? "text-gold" : "text-ink"
              )}
            >
              {verdict.score}
            </div>
            <p className={cn("mt-1 text-xs font-semibold", verdict.passed ? "text-white/60" : "text-faint")}>
              pass bar {verdict.passBar}{mode === "skate" ? " · morning skate — not recorded" : ""}
            </p>
            <p className={cn("mt-3 font-display text-lg font-bold", verdict.passed ? "text-white" : "text-ink")}>
              {verdict.passed
                ? `${l.name} — passed.`
                : verdict.tripped
                ? "Tripwire. Automatic fail — read why below."
                : "Not yet. The tape tells you exactly why."}
            </p>
            <p className={cn("mt-2 text-sm leading-relaxed", verdict.passed ? "text-white/70" : "text-muted")}>
              {verdict.summary}
            </p>
          </div>

          {verdict.tripwiresHit.length > 0 ? (
            <section className="rounded-2xl bg-danger-tint p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-danger">
                Tripwires hit
              </p>
              <ul className="mt-2 space-y-2">
                {verdict.tripwiresHit.map((t, i) => (
                  <li key={i} className="text-sm leading-relaxed text-ink/90">
                    {t}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="rounded-2xl bg-surface p-4 shadow-card">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal-dark">
              What landed
            </p>
            <ul className="mt-2 space-y-2">
              {verdict.strengths.map((t, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed text-ink/90">
                  <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                  {t}
                </li>
              ))}
            </ul>
          </section>

          {verdict.fixes.map((f, i) => (
            <section key={i} className="rounded-2xl bg-ink p-4">
              <p className="text-sm leading-relaxed text-white/85">{f.issue}</p>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
                Say this instead
              </p>
              <p className="mt-1 text-sm font-medium leading-relaxed text-white">
                “{f.sayThis}”
              </p>
            </section>
          ))}

          {verdict.moments.length ? (
            <section className="rounded-2xl bg-surface p-4 shadow-card">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal-dark">
                From the tape
              </p>
              <ul className="mt-2 space-y-2">
                {verdict.moments.map((m, i) => (
                  <li key={i} className="border-l-2 border-line pl-3 text-sm italic leading-relaxed text-ink/80">
                    {m}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className="grid gap-2">
            {verdict.passed && mode === "game" && level < 5 ? (
              <Link
                href={`/gauntlet/play?person=${person}&level=${level + 1}&mode=game`}
                className="w-full rounded-xl bg-gold py-4 text-center font-semibold text-ink transition-transform duration-150 active:scale-[0.99]"
              >
                Next: Level {level + 1} — {LEVELS_BY_N.get((level + 1) as 2 | 3 | 4 | 5)?.name}
              </Link>
            ) : null}
            <button
              onClick={start}
              className="w-full rounded-xl bg-ink py-3.5 font-semibold text-white transition-transform duration-150 active:scale-[0.99]"
            >
              Run it back
            </button>
            <Link
              href="/gauntlet"
              className="w-full rounded-xl bg-mist py-3.5 text-center font-semibold text-muted transition-colors duration-150 hover:text-ink"
            >
              Back to the Gauntlet
            </Link>
          </div>
        </div>
      ) : null}

      {/* ── Morning Skate helper panel ── */}
      <Sheet
        open={helperOpen}
        onOpenChange={setHelperOpen}
        title="The perfect answer"
        description={lastQuestion ? `“${lastQuestion}”` : "Waiting for a question…"}
      >
        {helperLoading ? (
          <p className="animate-pulse text-sm text-muted">Writing the perfect answer…</p>
        ) : helper ? (
          <div className="space-y-4">
            <div className="rounded-xl bg-ink p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
                Say this
              </p>
              <p className="mt-1.5 text-[15px] font-medium leading-relaxed text-white">
                {helper.perfect}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal-dark">
                The beats
              </p>
              <ul className="mt-1.5 space-y-1.5">
                {helper.beats.map((b, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-ink/90">
                    <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-[11px] leading-relaxed text-faint">
              Don&apos;t read it back word for word — steal the beats, say it your way.
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted">
            Once {p.name.split(" ")[0]} asks something, the perfect answer shows up here.
          </p>
        )}
      </Sheet>
    </main>
  );
}

export default function PlayPage() {
  return (
    <ConversationProvider>
      <Suspense fallback={null}>
        <PlayInner />
      </Suspense>
    </ConversationProvider>
  );
}
