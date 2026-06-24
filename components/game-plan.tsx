"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Check, ChevronRight, GripVertical } from "lucide-react";
import { GAME_PLAN, type PlanItem } from "@/lib/content";
import {
  movePlanItem,
  planDayOf,
  planOrderOf,
  togglePlan,
  useProgress,
  type ProgressState,
} from "@/lib/progress";
import { cn } from "@/lib/utils";

// Days in their original order — moving cards never adds or removes a column.
const DAYS = Array.from(new Set(GAME_PLAN.map((p) => p.day)));
const NATURAL_INDEX = new Map(GAME_PLAN.map((p, i) => [p.id, i]));

/** Cards on a given day, in order (untouched cards first, moved-in cards at the bottom). */
function cardsFor(s: ProgressState, day: string): PlanItem[] {
  return GAME_PLAN.filter((p) => planDayOf(s, p) === day).sort(
    (a, b) =>
      planOrderOf(s, a.id, NATURAL_INDEX.get(a.id) ?? 0) -
      planOrderOf(s, b.id, NATURAL_INDEX.get(b.id) ?? 0)
  );
}

interface DragState {
  id: string;
  label: string;
  x: number;
  y: number;
  dx: number; // pointer offset inside the lifted card
  dy: number;
  w: number;
  over: string | null; // the day column under the pointer
}

export function GamePlan() {
  const s = useProgress();
  const [drag, setDrag] = useState<DragState | null>(null);

  // Mirror drag in a ref so the pointer handlers always read the latest value.
  const dragRef = useRef<DragState | null>(null);
  const pending = useRef<{
    id: string;
    label: string;
    pointerId: number;
    startX: number;
    startY: number;
    rect: DOMRect;
    handle: HTMLElement;
  } | null>(null);

  function dayAtPoint(x: number, y: number): string | null {
    const el = document.elementFromPoint(x, y);
    return el?.closest<HTMLElement>("[data-day]")?.dataset.day ?? null;
  }

  function onHandleDown(e: React.PointerEvent, item: PlanItem) {
    if (e.button !== 0) return; // left mouse / touch / pen only
    const card = (e.currentTarget as HTMLElement).closest<HTMLElement>(
      "[data-card]"
    );
    if (!card) return;
    const handle = e.currentTarget as HTMLElement;
    pending.current = {
      id: item.id,
      label: item.label,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      rect: card.getBoundingClientRect(),
      handle,
    };
    handle.setPointerCapture(e.pointerId);
    e.preventDefault();
  }

  function onHandleMove(e: React.PointerEvent) {
    const p = pending.current;
    if (!p || e.pointerId !== p.pointerId) return;
    const current = dragRef.current;

    // Not dragging yet — wait until the pointer clears a small threshold so a
    // tap on the handle doesn't lift the card.
    if (!current) {
      if (Math.hypot(e.clientX - p.startX, e.clientY - p.startY) < 6) return;
      const next: DragState = {
        id: p.id,
        label: p.label,
        x: e.clientX,
        y: e.clientY,
        dx: e.clientX - p.rect.left,
        dy: e.clientY - p.rect.top,
        w: p.rect.width,
        over: dayAtPoint(e.clientX, e.clientY),
      };
      dragRef.current = next;
      setDrag(next);
      e.preventDefault();
      return;
    }

    const next: DragState = {
      ...current,
      x: e.clientX,
      y: e.clientY,
      over: dayAtPoint(e.clientX, e.clientY),
    };
    dragRef.current = next;
    setDrag(next);
    e.preventDefault();
  }

  function endDrag(e: React.PointerEvent) {
    const p = pending.current;
    if (!p || e.pointerId !== p.pointerId) return;
    const d = dragRef.current;
    if (d?.over) {
      const item = GAME_PLAN.find((g) => g.id === d.id);
      if (item && planDayOf(s, item) !== d.over) movePlanItem(d.id, d.over);
    }
    try {
      p.handle.releasePointerCapture(p.pointerId);
    } catch {
      // capture may already be gone — harmless
    }
    pending.current = null;
    dragRef.current = null;
    setDrag(null);
  }

  return (
    <section>
      <h2 className="font-display text-lg font-bold">The game plan</h2>
      <p className="mt-0.5 text-sm text-muted">
        Check things off — follow the order and you&apos;ll ramp fast.
      </p>
      <p className="mt-0.5 text-xs text-faint">
        Drag a card by its handle to move it to another day.
      </p>
      <div className="mt-3 space-y-4 lg:grid lg:grid-cols-4 lg:items-start lg:gap-4 lg:space-y-0">
        {DAYS.map((day) => {
          const items = cardsFor(s, day);
          const isOver = drag?.over === day;
          return (
            <div key={day} data-day={day}>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-faint">
                {day}
              </p>
              <div
                className={cn(
                  "mt-1.5 overflow-hidden rounded-2xl bg-surface shadow-card transition-shadow duration-150 ease-out",
                  // Empty days still need to be a droppable target.
                  items.length === 0 && "min-h-[3.5rem]",
                  isOver && "ring-2 ring-teal-deep/50"
                )}
              >
                {items.length === 0 ? (
                  <p className="px-4 py-4 text-xs italic text-faint">
                    {drag ? "Drop here" : "Nothing here yet"}
                  </p>
                ) : (
                  items.map((item, i) => {
                    const done = !!s.plan[item.id];
                    const lifted = drag?.id === item.id;
                    return (
                      <div
                        key={item.id}
                        data-card
                        className={cn(
                          "flex items-center gap-2.5 px-4 py-3 transition-opacity duration-150",
                          i < items.length - 1 && "border-b border-line",
                          lifted && "opacity-40"
                        )}
                      >
                        <button
                          type="button"
                          aria-label="Drag to another day"
                          onPointerDown={(e) => onHandleDown(e, item)}
                          onPointerMove={onHandleMove}
                          onPointerUp={endDrag}
                          onPointerCancel={endDrag}
                          className="-ml-1.5 flex h-8 w-5 shrink-0 cursor-grab touch-none items-center justify-center text-faint/70 transition-colors duration-150 ease-out hover:text-muted active:cursor-grabbing"
                        >
                          <GripVertical size={16} />
                        </button>
                        <button
                          onClick={() => togglePlan(item.id)}
                          aria-label={done ? "Mark not done" : "Mark done"}
                          className={cn(
                            "flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-colors duration-150 ease-out",
                            done ? "bg-teal-deep text-white" : "bg-mist"
                          )}
                        >
                          {done ? <Check size={13} strokeWidth={3} /> : null}
                        </button>
                        {item.href ? (
                          <Link
                            href={item.href}
                            className={cn(
                              "flex flex-1 items-center justify-between gap-2 text-sm leading-snug",
                              done ? "text-faint" : "text-ink"
                            )}
                          >
                            {item.label}
                            <ChevronRight
                              size={15}
                              className="shrink-0 text-faint"
                            />
                          </Link>
                        ) : (
                          <span
                            className={cn(
                              "flex-1 text-sm leading-snug",
                              done ? "text-faint" : "text-ink"
                            )}
                          >
                            {item.label}
                          </span>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* The lifted card following the pointer. */}
      {drag ? (
        <div
          className="pointer-events-none fixed z-50 flex items-center gap-2.5 rounded-2xl bg-surface px-4 py-3 shadow-lift ring-1 ring-line"
          style={{
            left: drag.x - drag.dx,
            top: drag.y - drag.dy,
            width: drag.w,
          }}
        >
          <GripVertical size={16} className="-ml-1.5 shrink-0 text-muted" />
          <span className="h-5 w-5 shrink-0 rounded-md bg-mist" />
          <span className="flex-1 text-sm leading-snug text-ink">
            {drag.label}
          </span>
        </div>
      ) : null}
    </section>
  );
}
