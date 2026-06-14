"use client";

import { useState } from "react";
import type { QuizQuestion, WriteInQuestion } from "@/lib/content";
import { cn } from "@/lib/utils";
import { QuizRunner } from "./quiz-runner";
import { WriteInRunner } from "./write-in-runner";

type Mode = "mc" | "write";

export function QuizModeSwitcher({
  kicker,
  moduleId,
  mc,
  writeIn,
  backHref,
  backLabel,
}: {
  kicker: string;
  moduleId: string;
  mc: QuizQuestion[];
  writeIn: WriteInQuestion[];
  backHref: string;
  backLabel: string;
}) {
  const [mode, setMode] = useState<Mode>("mc");

  return (
    <div>
      <div className="mb-5 grid grid-cols-2 gap-1 rounded-xl bg-mist p-1">
        <button
          onClick={() => setMode("mc")}
          className={cn(
            "rounded-lg py-2.5 text-sm font-semibold transition-colors duration-150 ease-out",
            mode === "mc"
              ? "bg-surface text-ink shadow-card"
              : "text-muted hover:text-ink"
          )}
        >
          Multiple choice
        </button>
        <button
          onClick={() => setMode("write")}
          className={cn(
            "rounded-lg py-2.5 text-sm font-semibold transition-colors duration-150 ease-out",
            mode === "write"
              ? "bg-surface text-ink shadow-card"
              : "text-muted hover:text-ink"
          )}
        >
          Write-in
        </button>
      </div>

      {mode === "mc" ? (
        <QuizRunner
          key="mc"
          kicker={kicker}
          questions={mc}
          storageId={moduleId}
          backHref={backHref}
          backLabel={backLabel}
        />
      ) : (
        <WriteInRunner
          key="write"
          kicker={kicker}
          moduleId={moduleId}
          questions={writeIn}
          backHref={backHref}
          backLabel={backLabel}
        />
      )}
    </div>
  );
}
