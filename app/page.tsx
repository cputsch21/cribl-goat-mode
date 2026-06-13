"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  ChevronRight,
  Lock,
  NotebookPen,
  Pencil,
} from "lucide-react";
import {
  EXAMS,
  GAME_PLAN,
  INTERVIEWS,
  MODULES,
  PERIODS,
} from "@/lib/content";
import {
  bestFor,
  countPassed,
  examsUnlocked,
  GAUNTLET_TOTAL,
  gauntletPassedCount,
  isPassed,
  setInterviewTime,
  togglePlan,
  UNIT_IDS,
  useProgress,
  type ProgressState,
} from "@/lib/progress";
import { countdownLabel, formatSlot, useNow } from "@/components/countdown";
import { Sheet } from "@/components/sheet";
import { cn } from "@/lib/utils";

function StatusChip({ s, id }: { s: ProgressState; id: string }) {
  const best = bestFor(s, id);
  if (best === null)
    return (
      <span className="shrink-0 rounded-full bg-mist px-2.5 py-1 text-[11px] font-semibold text-muted">
        Not started
      </span>
    );
  if (isPassed(s, id))
    return (
      <span className="shrink-0 rounded-full bg-teal-tint px-2.5 py-1 text-[11px] font-bold text-teal-dark">
        Passed · {best}%
      </span>
    );
  return (
    <span className="shrink-0 rounded-full bg-gold-soft px-2.5 py-1 text-[11px] font-bold text-gold-deep">
      Best {best}% — retake
    </span>
  );
}

export default function Dashboard() {
  const s = useProgress();
  const now = useNow();
  const [timesOpen, setTimesOpen] = useState(false);

  const passed = countPassed(s);
  const total = UNIT_IDS.length;
  const goat = passed === total;
  const unlocked = examsUnlocked(s);
  const gauntletPassed = gauntletPassedCount(s);

  const days = Array.from(new Set(GAME_PLAN.map((p) => p.day)));

  return (
    <main className="mx-auto w-full max-w-xl space-y-8 lg:max-w-5xl">
      <div className="space-y-8 lg:grid lg:grid-cols-3 lg:items-start lg:gap-6 lg:space-y-0">
      {/* ── Hero ── */}
      <section className="rounded-2.5xl bg-cribl p-6 text-ink lg:col-span-2 lg:p-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-violet-dark">
          🐐 GOAT Mode
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold leading-tight lg:text-4xl">
          Walk in 3x more ready
          <br />
          than you need to be.
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-ink/75">
          Built from your Patrick and Ami transcripts plus cribl.io. Pass every
          quiz at 90%+ — modules, then both simulations — and the Kat and Cam
          calls are yours.
        </p>
        <div className="mt-5">
          <div className="flex items-baseline justify-between text-xs font-semibold">
            <span className="text-ink/70">
              {passed} of {total} quizzes passed
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
            🐐 3x READY — every quiz, both simulations. Go eat.
          </div>
        ) : null}
      </section>

      {/* ── Interviews ── */}
      <section>
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-lg font-bold">The calls</h2>
          <button
            onClick={() => setTimesOpen(true)}
            className="flex items-center gap-1 text-xs font-semibold text-muted transition-colors duration-150 hover:text-ink"
          >
            <Pencil size={12} /> Adjust times
          </button>
        </div>
        <div className="mt-3 grid gap-2">
          {INTERVIEWS.map((slot) => {
            const at = new Date(s.times[slot.id] ?? slot.defaultAt);
            return (
              <div
                key={slot.id}
                className="flex items-center justify-between gap-3 rounded-2xl bg-surface p-4 shadow-card"
              >
                <div className="min-w-0">
                  <p className="font-semibold leading-tight">{slot.name}</p>
                  <p className="mt-0.5 truncate text-xs text-muted">{slot.role}</p>
                  <p className="mt-1 text-xs font-medium text-faint">
                    {formatSlot(at)}
                    {slot.id !== "rep" ? (
                      <>
                        {" · "}
                        <Link
                          href={`/cram/${slot.id}`}
                          className="font-semibold text-teal-dark"
                        >
                          Cram sheet →
                        </Link>
                      </>
                    ) : null}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-teal-tint px-3 py-1.5 text-xs font-bold text-teal-dark">
                  {countdownLabel(at, now)}
                </span>
              </div>
            );
          })}
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-faint">
          Times pulled from the call recordings — double-check your calendar
          invites and adjust if needed.
        </p>
      </section>
      </div>

      {/* ── Game plan ── */}
      <section>
        <h2 className="font-display text-lg font-bold">The game plan</h2>
        <p className="mt-0.5 text-sm text-muted">
          Check things off — the weekend is enough if you follow the order.
        </p>
        <div className="mt-3 space-y-4 lg:grid lg:grid-cols-4 lg:items-start lg:gap-4 lg:space-y-0">
          {days.map((day) => (
            <div key={day}>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-faint">
                {day}
              </p>
              <div className="mt-1.5 overflow-hidden rounded-2xl bg-surface shadow-card">
                {GAME_PLAN.filter((p) => p.day === day).map((item, i, arr) => {
                  const done = !!s.plan[item.id];
                  return (
                    <div
                      key={item.id}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3",
                        i < arr.length - 1 && "border-b border-line"
                      )}
                    >
                      <button
                        onClick={() => togglePlan(item.id)}
                        aria-label={done ? "Mark not done" : "Mark done"}
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-colors duration-150 ease-out",
                          done ? "bg-teal-deep text-white" : "bg-mist"
                        )}
                      >
                        {done ? <Check size={13} strokeWidth={3} /> : null}
                      </button>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className={cn(
                            "flex flex-1 items-center justify-between gap-2 text-sm leading-snug",
                            done ? "text-faint" : "text-ink"
                          )}
                        >
                          {item.label}
                          <ChevronRight size={15} className="shrink-0 text-faint" />
                        </Link>
                      ) : (
                        <span
                          className={cn(
                            "flex-1 text-sm leading-snug",
                            done ? "text-faint" : "text-ink"
                          )}
                        >
                          {item.label}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Periods & modules ── */}
      {PERIODS.map((period) => (
        <section key={period.number}>
          <h2 className="font-display text-lg font-bold">{period.title}</h2>
          <p className="mt-0.5 text-sm text-muted">{period.subtitle}</p>
          <div className="mt-3 grid gap-2 lg:grid-cols-2 lg:gap-3">
            {MODULES.filter((m) => m.period === period.number).map((m) => (
              <Link
                key={m.id}
                href={`/module/${m.id}`}
                className="flex gap-3.5 rounded-2xl bg-surface p-4 shadow-card transition-shadow duration-150 ease-out hover:shadow-lift"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink font-display text-sm font-bold text-gold">
                  {m.number}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold leading-tight">{m.title}</p>
                    <StatusChip s={s} id={m.id} />
                  </div>
                  <p className="mt-1 text-[13px] leading-snug text-muted">
                    {m.tagline}
                  </p>
                  <p className="mt-1.5 text-[11px] font-medium text-faint">
                    {m.minutes} min · {m.quiz.length}-question quiz
                    {m.bonus ? " · bonus" : ""}
                  </p>
                  {m.audience ? (
                    <span className="mt-2 inline-block rounded-full bg-gold-soft px-2.5 py-0.5 text-[11px] font-bold text-gold-deep">
                      {m.audience}
                    </span>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* ── Overtime: boss exams ── */}
      <section>
        <h2 className="font-display text-lg font-bold">Overtime — boss exams</h2>
        <p className="mt-0.5 text-sm text-muted">
          Fifteen scenarios each, asked the way they&apos;d actually ask them.
        </p>
        <div className="mt-3 grid gap-2 lg:grid-cols-2 lg:gap-3">
          {EXAMS.map((exam) => {
            const id = `exam-${exam.id}`;
            const card = (
              <div
                className={cn(
                  "rounded-2xl bg-violet p-5 text-white",
                  unlocked &&
                    "transition-shadow duration-150 ease-out hover:shadow-lift"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-display text-lg font-bold text-white">
                    {exam.title}
                  </p>
                  {unlocked ? (
                    <StatusChip s={s} id={id} />
                  ) : (
                    <Lock size={16} className="mt-1 shrink-0 text-white/50" />
                  )}
                </div>
                <p className="mt-1.5 text-[13px] leading-snug text-white/80">
                  {unlocked
                    ? `${exam.questions.length} scenarios · pass at 90%`
                    : "Unlocks once Modules 1–9 are passed."}
                </p>
              </div>
            );
            return unlocked ? (
              <Link key={exam.id} href={`/exam/${exam.id}`}>
                {card}
              </Link>
            ) : (
              <div key={exam.id} className="opacity-80">
                {card}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── The Gauntlet ── */}
      <section>
        <h2 className="font-display text-lg font-bold">The Gauntlet</h2>
        <p className="mt-0.5 text-sm text-muted">
          Live voice interviews — all four of them, five levels each.
        </p>
        <Link
          href="/gauntlet"
          className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-ink p-5 text-white transition-shadow duration-150 ease-out hover:shadow-lift"
        >
          <div className="min-w-0">
            <p className="font-display text-lg font-bold text-gold">
              🎙 Take the Gauntlet
            </p>
            <p className="mt-1 text-[13px] leading-snug text-white/65">
              Patrick, Kat, Cam, and Tim — Preseason to Game 7. The judge
              scores every tape.
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-ink-3 px-3 py-1.5 text-xs font-bold text-gold">
            {gauntletPassed}/{GAUNTLET_TOTAL}
          </span>
        </Link>
      </section>

      {/* ── Footer ── */}
      <footer className="flex items-start gap-2 pb-2 text-[11px] leading-relaxed text-faint">
        <NotebookPen size={13} className="mt-0.5 shrink-0" />
        <span>
          Every fact in this course is tagged to its source — cribl.io, Patrick,
          or Ami. The two things the app can&apos;t do for you: the weekend calls
          to your partner friends (script in Module 8) and the LinkedIn pass on
          Kat and Cam (prompts in the cram sheets).
        </span>
      </footer>

      {/* ── Adjust times sheet ── */}
      <Sheet
        open={timesOpen}
        onOpenChange={setTimesOpen}
        title="Interview times"
        description="From the recordings — double-check against your calendar invites."
      >
        <div className="grid gap-4">
          {INTERVIEWS.map((slot) => {
            const value = (s.times[slot.id] ?? slot.defaultAt).slice(0, 16);
            return (
              <label key={slot.id} className="block">
                <span className="text-sm font-semibold">{slot.name}</span>
                <span className="mt-0.5 block text-xs text-muted">{slot.role}</span>
                <input
                  type="datetime-local"
                  value={value}
                  onChange={(e) => setInterviewTime(slot.id, e.target.value)}
                  className="mt-2 w-full rounded-xl bg-mist px-3.5 py-3 text-sm font-medium outline-none transition-shadow duration-150 focus:ring-2 focus:ring-teal"
                />
              </label>
            );
          })}
        </div>
      </Sheet>
    </main>
  );
}
