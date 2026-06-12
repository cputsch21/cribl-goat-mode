"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { FLASHCARDS, type FlashCategory } from "@/lib/content";
import { cn, shuffle } from "@/lib/utils";

const CATEGORIES: { id: FlashCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "data", label: "Data" },
  { id: "security", label: "Security & AI" },
  { id: "sales", label: "Sales" },
  { id: "channel", label: "Channel" },
];

const CATEGORY_LABEL: Record<FlashCategory, string> = {
  data: "Data",
  security: "Security & AI",
  sales: "Sales",
  channel: "Channel",
};

export default function FlashcardsPage() {
  const [cat, setCat] = useState<FlashCategory | "all">("all");
  const [round, setRound] = useState(0);
  const initial = useMemo(
    () => shuffle(FLASHCARDS.filter((f) => cat === "all" || f.category === cat)),
    [cat, round]
  );
  const [queue, setQueue] = useState(initial);
  const [flipped, setFlipped] = useState(false);

  // Reset the queue whenever the filter or round changes.
  const [prevInitial, setPrevInitial] = useState(initial);
  if (initial !== prevInitial) {
    setPrevInitial(initial);
    setQueue(initial);
    setFlipped(false);
  }

  const total = initial.length;
  const card = queue[0];

  function advance(again: boolean) {
    setFlipped(false);
    setQueue((q) => (again ? [...q.slice(1), q[0]] : q.slice(1)));
  }

  return (
    <main>
      <header>
        <h1 className="font-display text-3xl font-bold">Flashcards</h1>
        <p className="mt-1 text-sm text-muted">
          The jargon arsenal — tap a card to flip it. Two passes today, one
          tomorrow, and nothing in those rooms can surprise you.
        </p>
      </header>

      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={cn(
              "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-150 ease-out",
              cat === c.id ? "bg-ink text-white" : "bg-mist text-muted"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      {card ? (
        <>
          <div className="mt-3 flex items-baseline justify-between text-xs font-semibold text-faint">
            <span>{queue.length} to go</span>
            <span>
              {total - queue.length} / {total} done
            </span>
          </div>
          <button
            onClick={() => setFlipped((f) => !f)}
            className="mt-2 flex min-h-[19rem] w-full flex-col items-center justify-center rounded-2.5xl bg-surface p-6 text-center shadow-card transition-shadow duration-150 ease-out active:shadow-lift"
          >
            {!flipped ? (
              <>
                <span className="rounded-full bg-teal-tint px-3 py-1 text-[11px] font-bold text-teal-dark">
                  {CATEGORY_LABEL[card.category]}
                </span>
                <span className="mt-4 font-display text-3xl font-bold leading-tight">
                  {card.term}
                </span>
                <span className="mt-4 text-xs font-medium text-faint">
                  tap to flip
                </span>
              </>
            ) : (
              <>
                <span className="font-display text-lg font-bold">{card.term}</span>
                <span className="mt-3 text-[15px] leading-relaxed text-ink/90">
                  {card.plain}
                </span>
                <span className="mt-4 w-full rounded-xl border-l-4 border-teal bg-mist p-3.5 text-left text-sm leading-relaxed text-ink/80">
                  {card.sentence}
                </span>
              </>
            )}
          </button>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              onClick={() => advance(true)}
              disabled={!flipped}
              className={cn(
                "rounded-xl bg-mist py-3.5 font-semibold text-muted transition-all duration-150 ease-out active:scale-[0.99]",
                !flipped && "opacity-40"
              )}
            >
              Again
            </button>
            <button
              onClick={() => advance(false)}
              disabled={!flipped}
              className={cn(
                "rounded-xl bg-ink py-3.5 font-semibold text-white transition-all duration-150 ease-out active:scale-[0.99]",
                !flipped && "opacity-40"
              )}
            >
              Got it
            </button>
          </div>
        </>
      ) : (
        <div className="mt-4 rounded-2.5xl bg-ink p-8 text-center text-white">
          <div className="text-4xl">🐐</div>
          <p className="mt-3 font-display text-xl font-bold">
            Deck cleared.
          </p>
          <p className="mt-1.5 text-sm text-white/65">
            {total} terms down. Run it again tomorrow — spaced reps are what
            make it stick.
          </p>
          <button
            onClick={() => setRound((r) => r + 1)}
            className="mx-auto mt-5 flex items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3 font-semibold text-ink transition-transform duration-150 ease-out active:scale-[0.99]"
          >
            <RotateCcw size={16} /> Shuffle and restart
          </button>
        </div>
      )}
    </main>
  );
}
