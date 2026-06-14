"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Plus } from "lucide-react";
import type { WriteInQuestion } from "@/lib/content";
import {
  recordQuiz,
  useProgress,
  WRITE_IN_PASS_MARK,
  writeInId,
} from "@/lib/progress";
import { cn, shuffle } from "@/lib/utils";
import { QuizResultScreen } from "./quiz-result";

interface Grade {
  score: number;
  verdict: "nailed" | "partial" | "missed";
  hit: string[];
  missed: string[];
  feedback: string;
}

const VERDICT: Record<Grade["verdict"], { label: string; cls: string }> = {
  nailed: { label: "🐐 Nailed it", cls: "bg-teal-faint text-teal-dark" },
  partial: { label: "Partially there", cls: "bg-gold-soft text-gold-deep" },
  missed: { label: "📚 Missed it", cls: "bg-danger-tint text-danger" },
};

export function WriteInRunner({
  kicker,
  moduleId,
  questions,
  backHref,
  backLabel,
}: {
  kicker: string;
  moduleId: string;
  questions: WriteInQuestion[];
  backHref: string;
  backLabel: string;
}) {
  const progress = useProgress();
  const [attempt, setAttempt] = useState(0);
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [grading, setGrading] = useState(false);
  const [grade, setGrade] = useState<Grade | null>(null);
  const [scores, setScores] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [finalPct, setFinalPct] = useState<number | null>(null);

  const deck = useMemo(
    () => shuffle(questions),
    // Reshuffle on every attempt.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [attempt, questions]
  );

  const q = deck[idx];
  const total = deck.length;
  const storageId = writeInId(moduleId);
  const stored = progress.quizzes[storageId];
  const tooShort = answer.trim().length < 4;

  async function submit() {
    if (grading || grade || tooShort) return;
    setGrading(true);
    setError(null);
    try {
      const res = await fetch("/api/quiz/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleId,
          questionId: q.id,
          answer: answer.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || typeof data.score !== "number") {
        throw new Error(data.error ?? "Scoring failed");
      }
      setGrade(data as Grade);
      setScores((s) => [...s, data.score]);
    } catch {
      setError(
        "The coach couldn't score that one — check your connection and try again."
      );
    } finally {
      setGrading(false);
    }
  }

  function next() {
    if (idx + 1 < total) {
      setIdx(idx + 1);
      setAnswer("");
      setGrade(null);
      setError(null);
    } else {
      const pct = Math.round(scores.reduce((a, b) => a + b, 0) / total);
      setFinalPct(pct);
      recordQuiz(storageId, pct, WRITE_IN_PASS_MARK);
    }
  }

  function retake() {
    setAttempt((a) => a + 1);
    setIdx(0);
    setAnswer("");
    setGrade(null);
    setScores([]);
    setError(null);
    setFinalPct(null);
  }

  // ── Results screen ────────────────────────────────────────────────
  if (finalPct !== null) {
    return (
      <QuizResultScreen
        finalPct={finalPct}
        passMark={WRITE_IN_PASS_MARK}
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
            style={{ width: `${((idx + (grade ? 1 : 0)) / total) * 100}%` }}
          />
        </div>
        <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.14em] text-faint">
          {kicker} · write-in
        </p>
        <h1 className="mt-1 font-display text-xl font-bold leading-snug">
          {q.prompt}
        </h1>
      </header>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submit();
        }}
        disabled={grade !== null}
        rows={5}
        placeholder="Type your answer the way you'd say it out loud…"
        className="w-full resize-none rounded-xl bg-mist px-4 py-3.5 text-[15px] leading-relaxed outline-none transition-shadow duration-150 placeholder:text-faint focus:ring-2 focus:ring-teal disabled:opacity-70"
      />

      {/* ── Reveal after scoring ── */}
      {grade ? (
        <div className="mt-4 space-y-3 duration-150 animate-in fade-in slide-in-from-bottom-1">
          <div className="flex items-center gap-2.5">
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-bold",
                VERDICT[grade.verdict].cls
              )}
            >
              {VERDICT[grade.verdict].label}
            </span>
            <span className="text-sm font-semibold text-muted">
              {grade.score}%
            </span>
          </div>

          {grade.hit.length > 0 ? (
            <div className="space-y-1.5">
              {grade.hit.map((h, i) => (
                <p
                  key={i}
                  className="flex items-start gap-2 text-sm leading-snug text-ink/90"
                >
                  <Check size={16} className="mt-0.5 shrink-0 text-teal-dark" />
                  {h}
                </p>
              ))}
            </div>
          ) : null}

          {grade.missed.length > 0 ? (
            <div className="space-y-1.5">
              {grade.missed.map((m, i) => (
                <p
                  key={i}
                  className="flex items-start gap-2 text-sm leading-snug text-muted"
                >
                  <Plus size={16} className="mt-0.5 shrink-0 text-faint" />
                  {m}
                </p>
              ))}
            </div>
          ) : null}

          {grade.feedback ? (
            <p className="text-sm leading-relaxed text-ink/90">
              {grade.feedback}
            </p>
          ) : null}

          <div className="rounded-xl bg-ink p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
              A strong answer
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-white/85">
              {q.model}
            </p>
          </div>

          <button
            onClick={next}
            className="w-full rounded-xl bg-teal py-3.5 font-semibold text-ink transition-transform duration-150 ease-out active:scale-[0.99]"
          >
            {idx + 1 < total ? "Next question" : "See my score"}
          </button>
        </div>
      ) : (
        <div className="mt-3 space-y-2">
          {error ? (
            <p className="rounded-xl bg-danger-tint px-4 py-3 text-sm text-danger">
              {error}
            </p>
          ) : null}
          <button
            onClick={submit}
            disabled={grading || tooShort}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-xl bg-teal py-3.5 font-semibold text-ink transition-all duration-150 ease-out active:scale-[0.99]",
              (grading || tooShort) && "opacity-40"
            )}
          >
            {grading ? (
              <>
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink [animation-delay:300ms]" />
                </span>
                Scoring…
              </>
            ) : (
              "Submit answer"
            )}
          </button>
          <p className="text-center text-[11px] text-faint">
            Claude scores your answer · {WRITE_IN_PASS_MARK}% to pass
          </p>
        </div>
      )}
    </div>
  );
}
