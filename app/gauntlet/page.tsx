"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Headphones, Lock, MessageCircle, Zap } from "lucide-react";
import { INTERVIEWERS, LEVELS, PERSON_IDS } from "@/lib/content/interviews";
import {
  GAUNTLET_TOTAL,
  gauntletPassedCount,
  interviewResult,
  levelUnlocked,
  useProgress,
} from "@/lib/progress";
import { cn } from "@/lib/utils";

type Mode = "game" | "skate";

export default function GauntletPage() {
  const s = useProgress();
  const [mode, setMode] = useState<Mode>("game");
  const [ready, setReady] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/gauntlet/session")
      .then((r) => r.json())
      .then((d) => setReady(Boolean(d.ready)))
      .catch(() => setReady(false));
  }, []);

  const passed = gauntletPassedCount(s);
  const complete = passed === GAUNTLET_TOTAL;

  return (
    <main className="space-y-7">
      <header>
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-dark">
          🎙 Live voice interviews
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold">The Gauntlet</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          Four interviewers, five levels each, out loud. Pass all twenty and
          there is no version of Monday that surprises you.
        </p>
      </header>

      {/* Hall of Fame strip */}
      <section className="rounded-2.5xl bg-ink p-5 text-white">
        <div className="flex items-baseline justify-between text-xs font-semibold">
          <span className="text-white/70">{passed} of {GAUNTLET_TOTAL} interviews passed</span>
          <span className="text-gold">{Math.round((passed / GAUNTLET_TOTAL) * 100)}%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ink-3">
          <div
            className="h-full rounded-full bg-gold transition-all duration-150 ease-out"
            style={{ width: `${(passed / GAUNTLET_TOTAL) * 100}%` }}
          />
        </div>
        {complete ? (
          <div className="mt-4 rounded-xl bg-gold p-3.5 text-center font-display text-sm font-bold text-ink">
            🏆 HALL OF FAME — all twenty. There's nothing left to ask you.
          </div>
        ) : null}
      </section>

      {ready === false ? (
        <section className="rounded-2.5xl bg-gold-soft p-5">
          <p className="font-display text-base font-bold text-gold-deep">
            Voice engine warming up
          </p>
          <p className="mt-1 text-sm leading-relaxed text-gold-deep/90">
            The interviews aren&apos;t wired to the voice service yet. Until
            then, the{" "}
            <Link href="/practice" className="font-bold underline">
              text Practice Room
            </Link>{" "}
            has Kat, Cam, and the Coach.
          </p>
        </section>
      ) : null}

      {/* Mode picker */}
      <section>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setMode("game")}
            className={cn(
              "rounded-xl px-3 py-3 text-center transition-colors duration-150 ease-out",
              mode === "game" ? "bg-ink text-white" : "bg-mist text-muted"
            )}
          >
            <span className="block text-lg">🎯</span>
            <span className="mt-0.5 block text-xs font-bold">Game Time</span>
            <span className={cn("block text-[10px]", mode === "game" ? "text-white/60" : "text-faint")}>
              counts toward the 20
            </span>
          </button>
          <button
            onClick={() => setMode("skate")}
            className={cn(
              "rounded-xl px-3 py-3 text-center transition-colors duration-150 ease-out",
              mode === "skate" ? "bg-ink text-white" : "bg-mist text-muted"
            )}
          >
            <span className="block text-lg">🧊</span>
            <span className="mt-0.5 block text-xs font-bold">Morning Skate</span>
            <span className={cn("block text-[10px]", mode === "skate" ? "text-white/60" : "text-faint")}>
              helper panel · nothing recorded
            </span>
          </button>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-faint">
          {mode === "game"
            ? "Real rules: levels unlock in order, the judge scores the tape, tripwires are armed from Level 3."
            : "Practice rules: every level open, perfect answers one tap away, zero stakes."}
        </p>
      </section>

      {/* Shootout */}
      <Link
        href="/gauntlet/shootout"
        className="flex items-center gap-3.5 rounded-2xl bg-surface p-4 shadow-card transition-shadow duration-150 ease-out hover:shadow-lift"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold">
          <Zap size={18} className="text-ink" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold leading-tight">Shootout</p>
          <p className="mt-0.5 text-[13px] leading-snug text-muted">
            Rapid-fire questions from any interviewer, any level — one-line
            verdicts, perfect answers revealed.
          </p>
        </div>
      </Link>

      {/* The 4×5 grid */}
      <section className="space-y-3">
        {PERSON_IDS.map((pid) => {
          const p = INTERVIEWERS[pid];
          return (
            <div key={pid} className="rounded-2xl bg-surface p-4 shadow-card">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-semibold leading-tight">
                    {p.emoji} {p.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">{p.title}</p>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold",
                    p.authenticity === "transcript"
                      ? "bg-teal-tint text-teal-dark"
                      : "bg-mist text-muted"
                  )}
                >
                  {p.authenticity === "transcript"
                    ? "from his real transcripts"
                    : "inferred from role + intel"}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-5 gap-1.5">
                {LEVELS.map((l) => {
                  const r = interviewResult(s, pid, l.n);
                  const open = mode === "skate" || levelUnlocked(s, pid, l.n);
                  const inner = (
                    <div
                      className={cn(
                        "flex h-14 flex-col items-center justify-center rounded-xl text-center transition-colors duration-150 ease-out",
                        !open && "bg-mist text-faint",
                        open && r?.passed && "bg-ink text-gold",
                        open && !r?.passed && r && "bg-gold-soft text-gold-deep",
                        open && !r && "bg-mist text-ink hover:bg-line"
                      )}
                    >
                      {!open ? (
                        <Lock size={14} />
                      ) : r?.passed ? (
                        <>
                          <Check size={14} strokeWidth={3} />
                          <span className="mt-0.5 text-[10px] font-bold">{r.best}</span>
                        </>
                      ) : r ? (
                        <>
                          <span className="font-display text-sm font-bold">L{l.n}</span>
                          <span className="text-[10px] font-bold">best {r.best}</span>
                        </>
                      ) : (
                        <>
                          <span className="font-display text-sm font-bold">L{l.n}</span>
                          <span className="text-[10px] font-medium opacity-70">{l.minutes}m</span>
                        </>
                      )}
                    </div>
                  );
                  return open ? (
                    <Link
                      key={l.n}
                      href={`/gauntlet/play?person=${pid}&level=${l.n}&mode=${mode}`}
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div key={l.n} title="Pass the previous level first">
                      {inner}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      <footer className="space-y-2 pb-2">
        <p className="flex items-start gap-2 text-[11px] leading-relaxed text-faint">
          <Headphones size={13} className="mt-0.5 shrink-0" />
          <span>
            Headphones on, quiet room, answer out loud like it&apos;s the real
            call — you can interrupt them mid-sentence, just like a phone call.
          </span>
        </p>
        <p className="flex items-start gap-2 text-[11px] leading-relaxed text-faint">
          <MessageCircle size={13} className="mt-0.5 shrink-0" />
          <span>
            No mic right now?{" "}
            <Link href="/practice" className="font-semibold text-teal-dark">
              The text Practice Room
            </Link>{" "}
            still works anywhere.
          </span>
        </p>
      </footer>
    </main>
  );
}
