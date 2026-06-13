"use client";

import { cn } from "@/lib/utils";
import type { TrailMode } from "@/lib/content";

const OPTIONS: { id: TrailMode; label: string; sub: string }[] = [
  { id: "legacy", label: "Without Cribl", sub: "the legacy way" },
  { id: "cribl", label: "With Cribl", sub: "the control plane" },
];

/** Segmented Legacy ↔ Cribl switch with an animated sliding thumb. */
export function ModeToggle({
  mode,
  onChange,
}: {
  mode: TrailMode;
  onChange: (m: TrailMode) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Compare data flow with and without Cribl"
      className="relative grid grid-cols-2 gap-1 rounded-2xl bg-mist p-1"
    >
      {/* Sliding thumb */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-xl shadow-card transition-transform duration-300 ease-out",
          mode === "cribl" ? "translate-x-[calc(100%+0.25rem)] bg-cribl" : "translate-x-0 bg-ink"
        )}
      />
      {OPTIONS.map((opt) => {
        const active = mode === opt.id;
        return (
          <button
            key={opt.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.id)}
            className={cn(
              "relative z-10 rounded-xl px-3 py-2 text-center transition-colors duration-200 ease-out active:scale-[0.99]",
              active
                ? opt.id === "cribl"
                  ? "text-ink"
                  : "text-white"
                : "text-muted hover:text-ink"
            )}
          >
            <span className="block text-sm font-semibold">{opt.label}</span>
            <span
              className={cn(
                "block text-[11px]",
                active ? (opt.id === "cribl" ? "text-ink/70" : "text-white/70") : "text-faint"
              )}
            >
              {opt.sub}
            </span>
          </button>
        );
      })}
    </div>
  );
}
