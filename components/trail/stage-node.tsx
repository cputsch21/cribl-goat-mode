"use client";

import { cn } from "@/lib/utils";
import type { TrailMode, TrailStage } from "@/lib/content";

/** A single stop on the trail: icon chip + caption, with hover tooltip. */
export function StageNode({
  stage,
  mode,
  active,
  visited,
  onSelect,
}: {
  stage: TrailStage;
  mode: TrailMode;
  active: boolean;
  visited: boolean;
  onSelect: () => void;
}) {
  const Icon = stage.icon;
  const isControl = stage.isControlPlane;
  // The Cribl Stream node only truly "exists" in Cribl mode; in legacy mode it
  // reads as a ghosted gap to drive home that there's no control point.
  const ghostedControl = isControl && mode === "legacy";

  return (
    <div className="group relative flex flex-shrink-0 flex-col items-center gap-2">
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={active}
        aria-label={`${stage.label} — ${stage.title}`}
        className={cn(
          "relative flex h-16 w-16 items-center justify-center rounded-2.5xl transition-all duration-300 ease-out active:scale-[0.97]",
          active && !ghostedControl && "trail-pulse scale-105",
          ghostedControl
            ? "border-2 border-dashed border-line bg-canvas text-faint"
            : isControl
              ? "bg-cribl text-ink shadow-lift ring-2 ring-teal/40"
              : visited || active
                ? "bg-ink text-white shadow-card"
                : "bg-surface text-muted shadow-card hover:text-ink"
        )}
      >
        <Icon size={26} strokeWidth={2} />
        {isControl && !ghostedControl && (
          <span className="absolute -right-1 -top-1 rounded-full bg-ink px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-gold">
            Cribl
          </span>
        )}
      </button>

      <span
        className={cn(
          "text-center text-xs font-semibold leading-tight transition-colors",
          active ? "text-ink" : "text-muted"
        )}
      >
        {stage.label}
      </span>

      {/* Hover tooltip */}
      <div
        role="tooltip"
        className="pointer-events-none absolute bottom-full z-20 mb-2 w-44 -translate-y-1 rounded-xl bg-ink px-3 py-2 text-center text-[11px] leading-snug text-white opacity-0 shadow-lift transition-all duration-150 ease-out group-hover:translate-y-0 group-hover:opacity-100"
      >
        {stage.blurb}
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-ink" />
      </div>
    </div>
  );
}
