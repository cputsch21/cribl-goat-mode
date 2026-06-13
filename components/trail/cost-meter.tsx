"use client";

import { cn } from "@/lib/utils";
import { COST_BY_MODE, type TrailMode } from "@/lib/content";

function Bar({
  label,
  value,
  mode,
}: {
  label: string;
  value: number;
  mode: TrailMode;
}) {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-xs font-medium text-muted">{label}</span>
        <span
          className={cn(
            "text-xs font-bold tabular-nums transition-colors",
            mode === "cribl" ? "text-teal-dark" : "text-danger"
          )}
        >
          {value}%
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-mist">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            mode === "cribl" ? "bg-teal" : "bg-danger"
          )}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

/** Twin bars that visibly collapse when you switch to the Cribl view — the
 *  "so what" of the whole page in one glance. */
export function CostMeter({ mode }: { mode: TrailMode }) {
  const { volume, cost } = COST_BY_MODE[mode];
  return (
    <div className="rounded-2.5xl bg-surface p-5 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-sm font-bold text-ink">The bill at the end of the line</h3>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide transition-colors",
            mode === "cribl" ? "bg-teal-faint text-teal-dark" : "bg-danger-tint text-danger"
          )}
        >
          {mode === "cribl" ? "Trimmed & tiered" : "Everything, raw"}
        </span>
      </div>
      <div className="space-y-3">
        <Bar label="Data volume into the SIEM" value={volume} mode={mode} />
        <Bar label="Relative ingest / license cost" value={cost} mode={mode} />
      </div>
      <p className="mt-3 text-xs leading-snug text-muted">
        {mode === "cribl"
          ? "Cribl drops the noise and tiers the rest to cheap storage — only high-value data hits the pricey tools."
          : "With no control point, every raw byte lands in the most expensive place. Cost scales with noise."}
      </p>
    </div>
  );
}
