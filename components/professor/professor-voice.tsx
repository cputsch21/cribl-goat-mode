"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ConversationProvider, useConversation } from "@elevenlabs/react";
import { Mic, MicOff, PhoneOff, Captions, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

type Phase = "idle" | "connecting" | "live" | "error";

type Line = { role: "you" | "prof"; text: string };

export function ProfessorVoice({ moduleId }: { moduleId: string | null }) {
  return (
    <ConversationProvider>
      <VoiceInner moduleId={moduleId} />
    </ConversationProvider>
  );
}

function VoiceInner({ moduleId }: { moduleId: string | null }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [transcript, setTranscript] = useState<Line[]>([]);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [captionsOn, setCaptionsOn] = useState(true);
  const [micMuted, setMicMuted] = useState(false);
  const [ready, setReady] = useState<boolean | null>(null);

  const transcriptRef = useRef<Line[]>([]);
  const endedRef = useRef(false);
  const startedAtRef = useRef(0);
  const maxSecondsRef = useRef(0);
  const phaseRef = useRef<Phase>("idle");
  const endRef = useRef<(hangUp: boolean) => void>(() => {});

  // Is the voice engine wired up on the server? (Degrades gracefully locally.)
  useEffect(() => {
    let live = true;
    fetch("/api/professor/voice")
      .then((r) => r.json())
      .then((d) => {
        if (live) setReady(Boolean(d?.ready));
      })
      .catch(() => {
        if (live) setReady(false);
      });
    return () => {
      live = false;
    };
  }, []);

  const conversation = useConversation({
    micMuted,
    onMessage: (m: { message?: string; source?: string }) => {
      const text = m?.message ?? "";
      if (!text) return;
      const role: Line["role"] = m?.source === "user" ? "you" : "prof";
      transcriptRef.current = [...transcriptRef.current, { role, text }];
      setTranscript(transcriptRef.current);
    },
    onDisconnect: () => {
      // No grading here — a dropped/ended call just returns to idle.
      if (phaseRef.current === "live" && !endedRef.current) endRef.current(false);
    },
    onError: () => {
      if (phaseRef.current === "connecting" || phaseRef.current === "live") {
        if (phaseRef.current === "live") {
          endRef.current(false);
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
      if (left <= 0 && !endedRef.current) endRef.current(true);
    }, 1000);
    return () => clearInterval(t);
  }, [phase]);

  // End the call if the panel unmounts (e.g. switching to text mode mid-call).
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
    transcriptRef.current = [];
    setTranscript([]);
    endedRef.current = false;
    try {
      const res = await fetch("/api/professor/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Office hours unavailable.");
      maxSecondsRef.current = data.maxSeconds ?? 20 * 60;

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
          : "Couldn't start office hours. Mic permission?"
      );
      setPhase("error");
    }
  }

  const end = useCallback(
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
      setRemaining(null);
      setPhase("idle");
    },
    [conversation]
  );

  // Keep the refs the deferred voice callbacks read pointed at the latest values.
  useEffect(() => {
    phaseRef.current = phase;
    endRef.current = end;
  });

  const mins = remaining !== null ? Math.floor(remaining / 60) : 0;
  const secs = remaining !== null ? remaining % 60 : 0;

  return (
    <div className="mt-4">
      {/* ── Pre-call / idle / error ── */}
      {phase === "idle" || phase === "connecting" || phase === "error" ? (
        <div className="rounded-2.5xl bg-surface p-5 shadow-card">
          <div className="flex items-center gap-2">
            <Radio size={18} className="text-violet" />
            <h4 className="font-display text-lg font-bold text-ink">
              Talk it through out loud
            </h4>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            Office hours, but spoken. Hop on the line with the Professor and
            think out loud — ask the dumb question, chase the tangent, let it
            explain things back to you. No grade, no debrief.
          </p>
          <ul className="mt-3 space-y-1 text-[13px] leading-relaxed text-muted">
            <li>• Headphones on, quiet room — talk like it&apos;s a real call.</li>
            <li>• Interrupt any time; it&apos;ll roll with you.</li>
            <li>• Hang up whenever — there&apos;s nothing to finish.</li>
          </ul>

          {phase === "error" ? (
            <div className="mt-3 rounded-xl bg-danger-tint p-3 text-sm leading-relaxed text-ink/90">
              {errorMsg}
            </div>
          ) : null}

          <button
            onClick={start}
            disabled={phase === "connecting" || ready === false}
            className={cn(
              "mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-teal py-3.5 font-semibold text-ink transition-transform duration-150 ease-out active:scale-[0.99]",
              (phase === "connecting" || ready === false) && "opacity-60"
            )}
          >
            <Mic size={16} />
            {phase === "connecting" ? "Connecting…" : "Start office hours"}
          </button>
          <p className="mt-2 text-center text-[11px] text-faint">
            {ready === false
              ? "Voice runs on the live site; locally it needs the server voice key."
              : "Live voice — mic permission required."}
          </p>
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
                : "bg-teal-tint ring-8 ring-teal/25"
            )}
          >
            <div className="text-center">
              <p className="font-display text-xl font-bold text-ink">Professor</p>
              <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wide text-ink/55">
                {conversation.isSpeaking ? "talking" : "your turn"}
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
                    t.role === "prof" ? "text-ink/85" : "text-teal-dark"
                  )}
                >
                  <b>{t.role === "prof" ? "Professor" : "You"}:</b> {t.text}
                </p>
              ))}
            </div>
          ) : null}

          <div className="mt-6 flex items-center justify-center gap-2.5">
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
            <button
              onClick={() => end(true)}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-danger px-4 font-semibold text-white transition-transform duration-150 active:scale-[0.98]"
            >
              <PhoneOff size={18} /> End
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
