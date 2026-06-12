"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ConversationProvider, useConversation } from "@elevenlabs/react";
import { ArrowLeft, Eye, PhoneOff, SkipForward, Zap } from "lucide-react";
import { INTERVIEWERS, PERSON_IDS, type PersonId } from "@/lib/content/interviews";
import { RAPID_FIRE, type RapidFireQ } from "@/lib/content/rapidfire";
import { cn, shuffle } from "@/lib/utils";

type Phase = "idle" | "connecting" | "live" | "error";
type Filter = PersonId | "all";

function ShootoutInner() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [round, setRound] = useState(0);
  const [served, setServed] = useState<RapidFireQ | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [count, setCount] = useState(0);
  const idxRef = useRef(0);
  const endedRef = useRef(false);

  const queue = useMemo(
    () => shuffle(RAPID_FIRE.filter((q) => filter === "all" || q.person === filter)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter, round]
  );

  const conversation = useConversation({
    onDisconnect: () => {
      if (!endedRef.current) setPhase("idle");
    },
    onError: () => {
      if (phase !== "idle") {
        setErrorMsg("The call dropped — start the drill again.");
        setPhase("error");
      }
    },
  });

  async function start() {
    setPhase("connecting");
    setErrorMsg("");
    endedRef.current = false;
    idxRef.current = 0;
    setServed(null);
    setRevealed(false);
    setCount(0);
    try {
      const res = await fetch("/api/gauntlet/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ person: "shootout" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Session unavailable.");
      await conversation.startSession({
        signedUrl: data.signedUrl,
        overrides: data.overrides,
        connectionType: "websocket",
      } as unknown as Parameters<typeof conversation.startSession>[0]);
      setPhase("live");
    } catch (e) {
      setErrorMsg(
        e instanceof Error && e.message ? e.message : "Couldn't start the drill."
      );
      setPhase("error");
    }
  }

  function serveNext() {
    if (!queue.length) return;
    const q = queue[idxRef.current % queue.length];
    idxRef.current += 1;
    conversation.sendUserMessage(
      `NEXT [${INTERVIEWERS[q.person].name} · Level ${q.level}]: ${q.question}`
    );
    setServed(q);
    setRevealed(false);
    setCount((c) => c + 1);
  }

  async function end() {
    endedRef.current = true;
    try {
      await conversation.endSession();
    } catch {
      // already closed
    }
    setPhase("idle");
    setServed(null);
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
        {phase === "live" ? (
          <span className="rounded-full bg-mist px-3 py-1 text-xs font-bold text-muted">
            {count} served
          </span>
        ) : null}
      </header>

      <div className="mt-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-deep">
          ⚡ Rapid fire
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold">Shootout</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          One question at a time, out loud, from any interviewer at any level.
          One-line verdicts. Nothing recorded — just reps.
        </p>
      </div>

      {/* Filter chips */}
      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
        {(["all", ...PERSON_IDS] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => {
              setFilter(f);
              setRound((r) => r + 1);
              idxRef.current = 0;
            }}
            className={cn(
              "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize transition-colors duration-150 ease-out",
              filter === f ? "bg-ink text-white" : "bg-mist text-muted"
            )}
          >
            {f === "all" ? "Everyone" : INTERVIEWERS[f as PersonId].name.split(" ")[0]}
          </button>
        ))}
      </div>

      {phase === "idle" || phase === "connecting" || phase === "error" ? (
        <div className="mt-4 space-y-3">
          <div className="rounded-2.5xl bg-surface p-5 shadow-card">
            <p className="text-sm leading-relaxed text-muted">
              {queue.length} questions loaded
              {filter !== "all"
                ? ` from ${INTERVIEWERS[filter as PersonId].name.split(" ")[0]}`
                : " across all four interviewers"}
              . The drill machine reads each one in that interviewer&apos;s
              style, you answer out loud, it gives you a score out of 10 and
              one fix — then the perfect answer is one tap away.
            </p>
          </div>
          {phase === "error" ? (
            <div className="rounded-xl bg-danger-tint p-4 text-sm leading-relaxed text-ink/90">
              {errorMsg}
            </div>
          ) : null}
          <button
            onClick={start}
            disabled={phase === "connecting"}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-4 font-semibold text-white transition-all duration-150 ease-out active:scale-[0.99]",
              phase === "connecting" && "opacity-60"
            )}
          >
            <Zap size={17} />
            {phase === "connecting" ? "Loading the puck machine…" : "Start the shootout"}
          </button>
        </div>
      ) : null}

      {phase === "live" ? (
        <div className="mt-4 space-y-3">
          {served ? (
            <>
              <div className="rounded-2.5xl bg-surface p-5 shadow-card">
                <span className="rounded-full bg-ink px-3 py-1 font-display text-[11px] font-bold uppercase tracking-wide text-gold">
                  {INTERVIEWERS[served.person].name.split(" ")[0]} · Level {served.level}
                </span>
                <p className="mt-3 font-display text-lg font-bold leading-snug">
                  {served.question}
                </p>
                <p className="mt-2 text-xs text-faint">
                  Answer out loud — the machine scores you when you finish.
                </p>
              </div>

              {revealed ? (
                <div className="rounded-2xl bg-ink p-4 duration-150 animate-in fade-in slide-in-from-bottom-1">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
                    The perfect answer
                  </p>
                  <p className="mt-1.5 text-[15px] font-medium leading-relaxed text-white">
                    {served.perfect}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {served.beats.map((b, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-ink-3 px-2.5 py-1 text-[11px] font-semibold text-teal-tint"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <div className="rounded-2.5xl bg-surface p-5 text-center shadow-card">
              <p className="text-sm text-muted">
                Connected. Serve the first question when you&apos;re ready.
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            {served && !revealed ? (
              <button
                onClick={() => setRevealed(true)}
                className="flex items-center justify-center gap-2 rounded-xl bg-gold py-3.5 font-semibold text-ink transition-transform duration-150 active:scale-[0.99]"
              >
                <Eye size={16} /> Reveal answer
              </button>
            ) : (
              <button
                onClick={end}
                className="flex items-center justify-center gap-2 rounded-xl bg-mist py-3.5 font-semibold text-muted transition-colors duration-150 hover:text-ink"
              >
                <PhoneOff size={16} /> End drill
              </button>
            )}
            <button
              onClick={serveNext}
              className="flex items-center justify-center gap-2 rounded-xl bg-ink py-3.5 font-semibold text-white transition-transform duration-150 active:scale-[0.99]"
            >
              <SkipForward size={16} /> {served ? "Next question" : "Serve one"}
            </button>
          </div>
          {served && !revealed ? (
            <button
              onClick={end}
              className="mx-auto block text-xs font-semibold text-faint transition-colors duration-150 hover:text-ink"
            >
              End drill
            </button>
          ) : null}
        </div>
      ) : null}
    </main>
  );
}

export default function ShootoutPage() {
  return (
    <ConversationProvider>
      <ShootoutInner />
    </ConversationProvider>
  );
}
