"use client";

import Link from "next/link";
import { ArrowLeft, ChevronRight, Lock } from "lucide-react";
import type { Exam } from "@/lib/content";
import { examsUnlocked, missingForExams, useProgress } from "@/lib/progress";
import { QuizRunner } from "@/components/quiz-runner";

export function ExamView({ exam }: { exam: Exam }) {
  const s = useProgress();

  if (!examsUnlocked(s)) {
    const missing = missingForExams(s);
    return (
      <main>
        <Link
          href="/"
          className="flex w-fit items-center gap-1.5 text-sm font-medium text-muted transition-colors duration-150 hover:text-ink"
        >
          <ArrowLeft size={16} /> Course
        </Link>
        <div className="mt-6 rounded-2.5xl bg-ink p-6 text-white">
          <Lock size={22} className="text-gold" />
          <h1 className="mt-3 font-display text-2xl font-bold">{exam.title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-white/65">
            The simulation unlocks once Modules 1–9 are passed at 90%. That
            ordering is the point — the boss fight only means something when
            you&apos;ve earned the weapons.
          </p>
        </div>
        <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-faint">
          Still to pass
        </p>
        <div className="mt-2 overflow-hidden rounded-2xl bg-surface shadow-card">
          {missing.map((m, i) => (
            <Link
              key={m.id}
              href={`/module/${m.id}`}
              className={`flex items-center justify-between gap-2 px-4 py-3 text-sm font-medium ${
                i < missing.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <span>
                Module {m.number} — {m.title}
              </span>
              <ChevronRight size={15} className="shrink-0 text-faint" />
            </Link>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main>
      <QuizRunner
        kicker={exam.title}
        questions={exam.questions}
        storageId={`exam-${exam.id}`}
        backHref="/"
        backLabel="Back to the course"
      />
    </main>
  );
}
