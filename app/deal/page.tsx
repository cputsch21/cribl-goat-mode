"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Target, RotateCcw } from "lucide-react";
import {
  useDeals,
  useHydrated,
  ensureSeeded,
  createDeal,
  usePendingUndo,
  undoDelete,
  clearUndo,
  healthScore,
  type Deal,
} from "@/lib/deals";

function healthDot(h: number) {
  return h >= 67 ? "bg-good" : h >= 34 ? "bg-warn" : "bg-danger";
}

export default function DealListPage() {
  const router = useRouter();
  const { deals, order } = useDeals();
  const undo = usePendingUndo();
  const hydrated = useHydrated();

  // Seed the worked example on first ever visit.
  useEffect(() => {
    ensureSeeded();
  }, []);

  // The undo banner auto-dismisses after a few seconds.
  useEffect(() => {
    if (!undo) return;
    const t = setTimeout(() => clearUndo(), 6000);
    return () => clearTimeout(t);
  }, [undo]);

  function handleNew() {
    const id = createDeal();
    router.push(`/deal/${id}`);
  }

  const list = order.map((id) => deals[id]).filter(Boolean) as Deal[];

  return (
    <main className="mx-auto w-full max-w-xl lg:max-w-3xl">
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-faint">
            Deal Command
          </p>
          <h1 className="mt-1.5 font-display text-3xl font-bold leading-tight">
            Your deals
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">
            Coach every deal through MEDDPICC and Command of the Message.
          </p>
        </div>
        <button
          onClick={handleNew}
          className="flex shrink-0 items-center gap-1.5 rounded-xl bg-teal px-4 py-2.5 text-sm font-semibold text-ink transition-transform duration-150 ease-out active:scale-[0.98]"
        >
          <Plus size={16} strokeWidth={2.4} /> New deal
        </button>
      </header>

      {!hydrated ? null : list.length === 0 ? (
        <button
          onClick={handleNew}
          className="flex w-full flex-col items-center rounded-2.5xl border border-dashed border-line bg-surface/60 px-6 py-14 text-center transition-colors hover:border-teal"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-soft text-violet">
            <Target size={22} />
          </span>
          <span className="mt-4 font-display text-lg font-bold text-ink">
            Start your first deal
          </span>
          <span className="mt-1 max-w-sm text-sm text-muted">
            Each deal gets a fresh template that walks you through qualification
            and the value story until it&apos;s closed.
          </span>
        </button>
      ) : (
        <div className="space-y-3">
          {list.map((d) => {
            const h = healthScore(d);
            return (
              <Link
                key={d.id}
                href={`/deal/${d.id}`}
                className="block rounded-2.5xl bg-surface p-5 shadow-card transition-shadow duration-150 hover:shadow-lift"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 shrink-0 rounded-full ${healthDot(h)}`}
                      />
                      <h2 className="truncate font-display text-lg font-bold leading-snug text-ink">
                        {d.account || "Untitled account"}
                      </h2>
                    </div>
                    <p className="mt-0.5 truncate text-sm text-muted">
                      {d.oppName || "—"}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-display text-lg font-bold tabular-nums text-ink">
                      {h}
                      <span className="text-xs font-semibold text-faint">/100</span>
                    </p>
                    {d.arr ? (
                      <p className="text-xs font-medium text-muted">{d.arr}</p>
                    ) : null}
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                    {d.stage}
                  </span>
                  {d.stage === "Closed" && d.result ? (
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
                        d.result === "Won"
                          ? "bg-good-soft text-good-deep"
                          : "bg-danger-tint text-danger"
                      }`}
                    >
                      {d.result}
                    </span>
                  ) : null}
                  {d.products.map((p) => (
                    <span
                      key={p}
                      className="rounded-full bg-mist px-2.5 py-1 text-[11px] font-semibold text-muted"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Undo-on-delete — the safety net for a removed deal. */}
      {undo ? (
        <div className="fixed bottom-24 left-1/2 z-40 -translate-x-1/2 lg:bottom-8">
          <div className="flex items-center gap-3 rounded-2xl bg-ink px-4 py-3 shadow-lift">
            <span className="text-sm text-white">
              Deleted{" "}
              <span className="font-semibold">
                {undo.deal.account || "deal"}
              </span>
            </span>
            <button
              onClick={() => undoDelete()}
              className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-gold transition-colors hover:bg-white/15"
            >
              <RotateCcw size={14} /> Undo
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}
