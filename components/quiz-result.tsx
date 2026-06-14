"use client";

import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
import type { QuizResult as StoredResult } from "@/lib/progress";
import { cn } from "@/lib/utils";

/** The shared score screen for both the multiple-choice and write-in quizzes. */
export function QuizResultScreen({
  finalPct,
  passMark,
  stored,
  backHref,
  backLabel,
  onRetake,
}: {
  finalPct: number;
  passMark: number;
  stored?: StoredResult;
  backHref: string;
  backLabel: string;
  onRetake: () => void;
}) {
  const passed = finalPct >= passMark;
  return (
    <div className="flex min-h-[70dvh] flex-col">
      <header className="mb-8 flex items-center justify-between">
        <Link
          href={backHref}
          className="flex items-center gap-1.5 text-sm font-medium text-muted transition-colors duration-150 hover:text-ink"
        >
          <ArrowLeft size={16} /> {backLabel}
        </Link>
      </header>

      <div
        className={cn(
          "rounded-2.5xl p-8 text-center duration-150 animate-in fade-in",
          passed ? "bg-ink text-white" : "bg-surface shadow-card"
        )}
      >
        <div className="text-5xl">{passed ? "🐐" : "📚"}</div>
        <div
          className={cn(
            "mt-4 font-display text-6xl font-bold",
            passed ? "text-gold" : "text-ink"
          )}
        >
          {finalPct}%
        </div>
        <p
          className={cn(
            "mt-2 font-display text-xl font-bold",
            passed ? "text-white" : "text-ink"
          )}
        >
          {passed ? "Passed — GOAT level." : `Not yet — ${passMark}% to pass.`}
        </p>
        <p className={cn("mt-2 text-sm", passed ? "text-white/65" : "text-muted")}>
          {passed
            ? "This material is yours now. Say it out loud once for good measure."
            : "Retakes are free and the questions reshuffle. Skim the module once more, then run it back."}
        </p>
        {stored ? (
          <p className={cn("mt-4 text-xs", passed ? "text-white/50" : "text-faint")}>
            Best: {stored.best}% · Attempt {stored.attempts}
          </p>
        ) : null}
      </div>

      <div className="mt-4 grid gap-2">
        {!passed ? (
          <button
            onClick={onRetake}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal py-3.5 font-semibold text-ink transition-transform duration-150 ease-out active:scale-[0.99]"
          >
            <RotateCcw size={16} /> Retake the quiz
          </button>
        ) : null}
        <Link
          href={backHref}
          className={cn(
            "w-full rounded-xl py-3.5 text-center font-semibold transition-transform duration-150 ease-out active:scale-[0.99]",
            passed ? "bg-ink text-white" : "bg-mist text-ink"
          )}
        >
          {backLabel}
        </Link>
        {passed ? (
          <button
            onClick={onRetake}
            className="w-full rounded-xl bg-mist py-3.5 text-center font-semibold text-muted transition-colors duration-150 hover:text-ink"
          >
            Run it again anyway
          </button>
        ) : null}
      </div>
    </div>
  );
}
