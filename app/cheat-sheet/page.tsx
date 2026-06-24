"use client";

import { useState } from "react";
import { ChevronRight, Sparkles } from "lucide-react";
import {
  CHEAT_ITEMS,
  CHEAT_STATS,
  PITCH,
  SOURCE_LABELS,
  type CheatItem,
} from "@/lib/content";
import { cn } from "@/lib/utils";

/** One of the ten plays — title + line to say always shown; detail on tap. */
function Play({ item, n }: { item: CheatItem; n: number }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      className="w-full rounded-2xl bg-surface p-4 text-left shadow-card transition-shadow duration-150 ease-out hover:shadow-lift"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-ink font-display text-sm font-bold text-gold">
          {n}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-[15px] font-bold leading-snug">
              {item.title}
            </h3>
            <ChevronRight
              size={18}
              className={cn(
                "mt-0.5 shrink-0 text-faint transition-transform duration-150 ease-out",
                open && "rotate-90"
              )}
            />
          </div>

          <p className="mt-2 border-l-2 border-teal pl-3 text-[15px] font-medium leading-relaxed text-ink">
            “{item.say}”
          </p>

          {/* Detail — animates open without a fixed height. */}
          <div
            className={cn(
              "grid transition-all duration-150 ease-out",
              open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              <div className="space-y-2.5">
                {item.detail.map((p, i) => (
                  <p
                    key={i}
                    className="text-[14px] leading-relaxed text-ink/80"
                  >
                    {p}
                  </p>
                ))}
                <p className="text-[11px] font-medium text-faint">
                  {SOURCE_LABELS[item.source]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function CheatSheetPage() {
  return (
    <main className="mx-auto w-full max-w-xl lg:max-w-3xl">
      <header className="mb-6">
        <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-gold-deep">
          <Sparkles size={13} /> Cheat sheet · the whole course on one screen
        </p>
        <h1 className="mt-1.5 font-display text-3xl font-bold leading-tight">
          The five-minute read
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">
          The ten plays that win the room, the exact lines to say, and the
          numbers cold. Tap any play for the why.
        </p>
      </header>

      {/* ── The one pitch to nail ── */}
      <section className="rounded-2.5xl bg-ink p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
          Say this — the 30-second pitch
        </p>
        <p className="mt-2.5 font-display text-xl font-bold leading-snug text-white">
          “{PITCH.say}”
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-white/65">
          {PITCH.tag}
        </p>
      </section>

      {/* ── The ten plays ── */}
      <section className="mt-8">
        <h2 className="font-display text-lg font-bold">The ten that win the room</h2>
        <p className="mt-0.5 text-sm text-muted">
          Universal — true in every room. Tap a play to drill in.
        </p>
        <div className="mt-3 space-y-2">
          {CHEAT_ITEMS.map((item, i) => (
            <Play key={item.id} item={item} n={i + 1} />
          ))}
        </div>
      </section>

      {/* ── Numbers to have cold ── */}
      <section className="mt-8 rounded-2.5xl bg-ink p-5 text-white">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
          Numbers to have cold
        </h2>
        <ul className="mt-2.5 space-y-2.5">
          {CHEAT_STATS.map((stat, i) => (
            <li
              key={i}
              className="flex gap-2 text-[15px] leading-relaxed text-white/90"
            >
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              <span>
                {stat.text}
                {stat.src ? (
                  <span className="text-white/45"> · {stat.src}</span>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Footer reminder ── */}
      <footer className="mt-8 rounded-2xl bg-mist p-4 text-[12px] leading-relaxed text-muted">
        This is the floor — your one-screen walk-in. Every line here traces to
        cribl.io, Patrick, or Ami — say the numbers as approximate, and never
        bluff a cert.
      </footer>
    </main>
  );
}
