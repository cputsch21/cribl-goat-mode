"use client";

import { cn } from "@/lib/utils";
import type { TrailMode, TrailStage } from "@/lib/content";

/** A single stop on the trail. Tapping it toggles a popover to the side and
 *  colors the node; tapping again (or anywhere off the track) clears it. */
export function StageNode({
  stage,
  mode,
  open,
  side,
  onToggle,
}: {
  stage: TrailStage;
  mode: TrailMode;
  open: boolean;
  /** Which way the popover opens on desktop. */
  side: "left" | "right";
  onToggle: () => void;
}) {
  const Icon = stage.icon;
  const isControl = stage.isControlPlane;
  const reality = mode === "cribl" ? stage.cribl : stage.legacy;

  return (
    <div className="group relative flex flex-shrink-0 flex-col items-center gap-2">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-label={`${stage.label} — ${stage.title}`}
        className={cn(
          "relative flex h-16 w-16 items-center justify-center rounded-2.5xl transition-all duration-200 ease-out active:scale-[0.97]",
          open && "scale-105 ring-2 ring-offset-2 ring-offset-cribl-soft",
          isControl
            ? "bg-cribl text-ink shadow-lift ring-teal/50"
            : open
              ? "bg-ink text-white shadow-lift ring-ink/30"
              : "bg-surface text-muted shadow-card hover:text-ink"
        )}
      >
        <Icon size={26} strokeWidth={2} />
        {isControl && (
          <span className="absolute -right-1 -top-1 rounded-full bg-ink px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-gold">
            Cribl
          </span>
        )}
      </button>

      <span
        className={cn(
          "text-center text-xs font-semibold leading-tight transition-colors",
          open ? "text-ink" : "text-muted"
        )}
      >
        {stage.label}
      </span>

      {/* Tap popover — opens to the side on desktop, below on mobile */}
      {open && (
        <div
          role="dialog"
          aria-label={stage.title}
          className={cn(
            "absolute z-30 w-64 rounded-2xl bg-surface p-4 text-left shadow-lift ring-1 ring-line duration-150 animate-in fade-in zoom-in-95",
            // Mobile: centered below the node
            "left-1/2 top-full mt-3 -translate-x-1/2",
            // Desktop: vertically centered, to the chosen side
            "lg:top-1/2 lg:mt-0 lg:translate-x-0 lg:-translate-y-1/2",
            side === "right"
              ? "lg:left-full lg:right-auto lg:ml-3"
              : "lg:left-auto lg:right-full lg:mr-3"
          )}
        >
          <h2 className="font-display text-base font-bold leading-tight text-ink">
            {stage.title}
          </h2>
          <p className="mt-1 text-xs leading-snug text-muted">{stage.blurb}</p>

          <div
            className={cn(
              "mt-3 rounded-xl border p-2.5",
              mode === "cribl"
                ? "border-teal/40 bg-teal-faint"
                : "border-danger/30 bg-danger-tint"
            )}
          >
            <div
              className={cn(
                "mb-1 text-[10px] font-bold uppercase tracking-wide",
                mode === "cribl" ? "text-teal-dark" : "text-danger"
              )}
            >
              {mode === "cribl" ? "With Cribl" : "Without Cribl"}
            </div>
            <p className="text-xs leading-snug text-ink">{reality}</p>
          </div>

          {stage.terms && stage.terms.length > 0 && (
            <dl className="mt-3 space-y-1.5">
              {stage.terms.map((t) => (
                <div key={t.term} className="text-[11px] leading-snug">
                  <dt className="inline font-semibold text-ink">{t.term} — </dt>
                  <dd className="inline text-muted">{t.def}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      )}
    </div>
  );
}
