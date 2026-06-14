"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import type { QuizQuestion } from "@/lib/content";
import { PASS_MARK, recordQuiz, useProgress } from "@/lib/progress";
import { cn, shuffle } from "@/lib/utils";
import { QuizResultScreen } from "./quiz-result";

export function QuizRunner({
  kicker,
  questions,
  storageId,
  backHref,
  backLabel,
}: {
  kicker: string;
  questions: QuizQuestion[];
  storageId: string;
  backHref: string;
  backLabel: string;
}) {
  const progress = useProgress();
  const [attempt, setAttempt] = useState(0);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finalPct, setFinalPct] = useState<number | null>(null);

  const deck = useMemo(
    () =>
      shuffle(questions).map((q) => ({
        ...q,
        options: shuffle(q.options),
      })),
    // Reshuffle on every attempt.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [attempt, questions]
  );

  const q = deck[idx];
  const total = deck.length;
  const correctIdx = q ? q.options.findIndex((o) => o.correct) : -1;
  const stored = progress.quizzes[storageId];

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (deck[idx].options[i].correct) setCorrectCount((c) => c + 1);
  }

  function next() {
    if (idx + 1 < total) {
      setIdx(idx + 1);
      setPicked(null);
    } else {
      // correctCount is committed by the time Next is clicked.
      const pct = Math.round((correctCount / total) * 100);
      setFinalPct(pct);
      recordQuiz(storageId, pct);
    }
  }

  function retake() {
    setAttempt((a) => a + 1);
    setIdx(0);
    setPicked(null);
    setCorrectCount(0);
    setFinalPct(null);
  }

  // ── Results screen ────────────────────────────────────────────────
  if (finalPct !== null) {
    return (
      <QuizResultScreen
        finalPct={finalPct}
        passMark={PASS_MARK}
        stored={stored}
        backHref={backHref}
        backLabel={backLabel}
        onRetake={retake}
      />
    );
  }

  // ── Question screen ───────────────────────────────────────────────
  return (
    <div>
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <Link
            href={backHref}
            className="flex items-center gap-1.5 text-sm font-medium text-muted transition-colors duration-150 hover:text-ink"
          >
            <ArrowLeft size={16} /> Exit
          </Link>
          <span className="text-xs font-semibold tracking-wide text-faint">
            {idx + 1} / {total}
          </span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-violet transition-all duration-150 ease-out"
            style={{ width: `${((idx + (picked !== null ? 1 : 0)) / total) * 100}%` }}
          />
        </div>
        <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.14em] text-faint">
          {kicker}
        </p>
        <h1 className="mt-1 font-display text-xl font-bold leading-snug">
          {q.prompt}
        </h1>
      </header>

      <div className="grid gap-2.5">
        {q.options.map((o, i) => {
          const isPicked = picked === i;
          const showCorrect = picked !== null && i === correctIdx;
          const showWrong = isPicked && i !== correctIdx;
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              disabled={picked !== null}
              className={cn(
                "w-full rounded-xl px-4 py-3.5 text-left text-[15px] leading-snug transition-all duration-150 ease-out",
                picked === null && "bg-mist hover:bg-line active:scale-[0.99]",
                showCorrect && "bg-teal-faint ring-2 ring-teal-deep",
                showWrong && "bg-danger-tint ring-2 ring-danger",
                picked !== null && !showCorrect && !showWrong && "bg-mist opacity-50"
              )}
            >
              <span className="flex items-start gap-2.5">
                {showCorrect ? (
                  <Check size={18} className="mt-0.5 shrink-0 text-teal-dark" />
                ) : null}
                <span>{o.text}</span>
              </span>
            </button>
          );
        })}
      </div>

      {picked !== null ? (
        <div className="mt-4 duration-150 animate-in fade-in slide-in-from-bottom-1">
          <div className="rounded-xl bg-ink p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
              {picked === correctIdx ? "Right — here's the why" : "The why"}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-white/85">
              {q.explain}
            </p>
          </div>
          <button
            onClick={next}
            className="mt-3 w-full rounded-xl bg-teal py-3.5 font-semibold text-ink transition-transform duration-150 ease-out active:scale-[0.99]"
          >
            {idx + 1 < total ? "Next question" : "See my score"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
