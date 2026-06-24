"use client";

import Link from "next/link";
import { Check, NotebookPen } from "lucide-react";
import { MODULES, PERIODS } from "@/lib/content";
import {
  bestFor,
  countPassed,
  isComplete,
  isPassed,
  UNIT_IDS,
  useProgress,
  writeInId,
  type ProgressState,
} from "@/lib/progress";
import { GamePlan } from "@/components/game-plan";
import { cn } from "@/lib/utils";

/** Compact per-quiz pill for the module cards — one for multiple-choice, one for write-in. */
function LabeledChip({
  s,
  id,
  label,
}: {
  s: ProgressState;
  id: string;
  label: string;
}) {
  const best = bestFor(s, id);
  const passed = isPassed(s, id);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold",
        best === null
          ? "bg-mist text-muted"
          : passed
            ? "bg-teal-tint text-teal-dark"
            : "bg-gold-soft text-gold-deep"
      )}
    >
      {passed ? <Check size={10} strokeWidth={3} /> : null}
      {label}
      {best === null ? "" : ` ${best}%`}
    </span>
  );
}

export default function Dashboard() {
  const s = useProgress();

  const passed = countPassed(s);
  const total = UNIT_IDS.length;
  const goat = passed === total;

  return (
    <main className="mx-auto w-full max-w-xl space-y-8 lg:max-w-5xl">
      {/* ── Hero ── */}
      <section className="rounded-2.5xl bg-cribl p-6 text-ink lg:p-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-violet-dark">
          🐐 GOAT Mode
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold leading-tight lg:text-4xl">
          Walk into every room
          <br />
          3x more ready.
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-ink/75">
          Built from your Patrick and Ami notes plus cribl.io. Clear every module
          both ways — multiple-choice and write-in — then drill the buying
          committee in the Dojo and run your live deals in Deal Command.
        </p>
        <div className="mt-5">
          <div className="flex items-baseline justify-between text-xs font-semibold">
            <span className="text-ink/70">
              {passed} of {total} cleared
            </span>
            <span className="text-violet-dark">
              {Math.round((passed / total) * 100)}%
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ink/15">
            <div
              className="h-full rounded-full bg-ink transition-all duration-150 ease-out"
              style={{ width: `${(passed / total) * 100}%` }}
            />
          </div>
        </div>
        {goat ? (
          <div className="mt-4 rounded-xl bg-ink p-3.5 text-center font-display text-sm font-bold text-teal">
            🐐 GOAT MODE — every module, both ways. Now go sell.
          </div>
        ) : null}
      </section>

      {/* ── Game plan ── */}
      <GamePlan />

      {/* ── Periods & modules ── */}
      {PERIODS.map((period) => (
        <section key={period.number}>
          <h2 className="font-display text-lg font-bold">{period.title}</h2>
          <p className="mt-0.5 text-sm text-muted">{period.subtitle}</p>
          <div className="mt-3 grid gap-2 lg:grid-cols-2 lg:gap-3">
            {MODULES.filter((m) => m.period === period.number).map((m) => {
              const complete = isComplete(s, m.id);
              return (
                <Link
                  key={m.id}
                  href={`/module/${m.id}`}
                  className="flex gap-3.5 rounded-2xl bg-surface p-4 shadow-card transition-shadow duration-150 ease-out hover:shadow-lift"
                >
                  <div
                    aria-label={complete ? "Module complete" : "Module not complete"}
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center self-center rounded-md transition-colors duration-150 ease-out",
                      complete
                        ? "bg-teal-deep text-white"
                        : "border-2 border-line bg-transparent"
                    )}
                  >
                    {complete ? <Check size={15} strokeWidth={3} /> : null}
                  </div>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink font-display text-sm font-bold text-gold">
                    {m.number}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold leading-tight">{m.title}</p>
                    <p className="mt-1 text-[13px] leading-snug text-muted">
                      {m.tagline}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <LabeledChip s={s} id={m.id} label="Quiz" />
                      <LabeledChip s={s} id={writeInId(m.id)} label="Write-in" />
                      <span className="text-[11px] font-medium text-faint">
                        {m.minutes} min{m.bonus ? " · bonus" : ""}
                      </span>
                    </div>
                    {m.audience ? (
                      <span className="mt-2 inline-block rounded-full bg-gold-soft px-2.5 py-0.5 text-[11px] font-bold text-gold-deep">
                        {m.audience}
                      </span>
                    ) : null}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      {/* ── Footer ── */}
      <footer className="flex items-start gap-2 pb-2 text-[11px] leading-relaxed text-faint">
        <NotebookPen size={13} className="mt-0.5 shrink-0" />
        <span>
          Every fact in this course is tagged to its source — cribl.io, Patrick,
          or Ami. Say the numbers as approximate, and never bluff a cert.
        </span>
      </footer>
    </main>
  );
}
