"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TrailMode, TrailStage, TrailTerm } from "@/lib/content";

function TermChip({ term }: { term: TrailTerm }) {
  return (
    <span className="group/term relative inline-block">
      <button
        type="button"
        className="rounded-lg border border-line bg-mist px-2 py-1 text-xs font-medium text-ink underline decoration-dotted decoration-faint underline-offset-2 transition-colors hover:border-teal hover:bg-teal-faint"
      >
        {term.term}
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-52 -translate-x-1/2 -translate-y-1 rounded-xl bg-ink px-3 py-2 text-left text-[11px] leading-snug text-white opacity-0 shadow-lift transition-all duration-150 ease-out group-hover/term:translate-y-0 group-hover/term:opacity-100"
      >
        {term.def}
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-ink" />
      </span>
    </span>
  );
}

/** Rich panel for the active stage. Re-keyed by the parent on stage/mode change
 *  so it animates in each time. */
export function DetailPanel({
  stage,
  mode,
  index,
  total,
  onClose,
}: {
  stage: TrailStage;
  mode: TrailMode;
  index: number;
  total: number;
  onClose: () => void;
}) {
  const Icon = stage.icon;
  return (
    <div
      aria-live="polite"
      className="rounded-2.5xl bg-surface p-5 shadow-card duration-200 animate-in fade-in slide-in-from-bottom-2"
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl",
            stage.isControlPlane && mode === "cribl"
              ? "bg-cribl text-ink"
              : "bg-ink text-white"
          )}
        >
          <Icon size={22} strokeWidth={2} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-faint">
              Stage {index + 1} / {total}
            </span>
            {stage.isControlPlane && (
              <span className="rounded-full bg-gold-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-deep">
                Where Cribl sits
              </span>
            )}
          </div>
          <h2 className="font-display text-xl font-bold leading-tight text-ink">{stage.title}</h2>
          <p className="mt-0.5 text-sm text-muted">{stage.blurb}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close detail"
          className="flex-shrink-0 rounded-lg p-1 text-faint transition-colors hover:bg-mist hover:text-ink"
        >
          <X size={18} />
        </button>
      </div>

      {/* The two realities — current mode highlighted */}
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <div
          className={cn(
            "rounded-xl border p-3 transition-all duration-200",
            mode === "legacy"
              ? "border-danger/30 bg-danger-tint"
              : "border-line bg-canvas opacity-60"
          )}
        >
          <div className="mb-1 text-[11px] font-bold uppercase tracking-wide text-danger">
            Without Cribl
          </div>
          <p className="text-sm leading-snug text-ink">{stage.legacy}</p>
        </div>
        <div
          className={cn(
            "rounded-xl border p-3 transition-all duration-200",
            mode === "cribl"
              ? "border-teal/40 bg-teal-faint"
              : "border-line bg-canvas opacity-60"
          )}
        >
          <div className="mb-1 text-[11px] font-bold uppercase tracking-wide text-teal-dark">
            With Cribl
          </div>
          <p className="text-sm leading-snug text-ink">{stage.cribl}</p>
        </div>
      </div>

      {/* Terminology chips */}
      {stage.terms && stage.terms.length > 0 && (
        <div className="mt-4">
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-faint">
            Key terms — hover to learn
          </div>
          <div className="flex flex-wrap gap-1.5">
            {stage.terms.map((t) => (
              <TermChip key={t.term} term={t} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
