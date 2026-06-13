"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw, Sparkles } from "lucide-react";
import { DATAFLOW_STAGES, type TrailMode } from "@/lib/content";
import { ModeToggle } from "@/components/trail/mode-toggle";
import { StageNode } from "@/components/trail/stage-node";
import { Connector } from "@/components/trail/connector";
import { DetailPanel } from "@/components/trail/detail-panel";
import { CostMeter } from "@/components/trail/cost-meter";

const LAST = DATAFLOW_STAGES.length - 1;
const STEP_MS = 1700;

export default function GoatTrailPage() {
  const [mode, setMode] = useState<TrailMode>("legacy");
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Respect the OS "reduce motion" preference.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Autoplay driver: walk the play head stage-by-stage, then stop. Reduced
  // motion never sets `playing`, so this interval stays idle in that case.
  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => {
      setActive((i) => {
        if (i >= LAST) {
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, STEP_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing]);

  const stop = useCallback(() => setPlaying(false), []);

  const handlePlay = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    // Reduced motion: skip the animated walk, just reveal the final stage.
    if (reduced) {
      setActive(LAST);
      return;
    }
    // Restart from the top if we're sitting at the end.
    if (active >= LAST) setActive(0);
    setPlaying(true);
  };

  const goTo = (i: number) => {
    stop();
    setActive(Math.max(0, Math.min(LAST, i)));
  };

  const changeMode = (m: TrailMode) => {
    stop();
    setMode(m);
  };

  const stage = DATAFLOW_STAGES[active];

  return (
    <main className="mx-auto w-full max-w-xl pb-28 lg:max-w-5xl lg:pb-12">
      <header>
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-violet" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-violet">
            The Goat Trail
          </span>
        </div>
        <h1 className="mt-1 font-display text-3xl font-bold text-ink">
          Follow the data, find the Cribl
        </h1>
        <p className="mt-1 text-sm text-muted">
          Watch a packet of telemetry travel from the moment it&apos;s born to the moment it delivers
          value — then flip the switch to see what changes when Cribl sits in the middle.
        </p>
      </header>

      {/* Mode toggle */}
      <div className="mt-5">
        <ModeToggle mode={mode} onChange={changeMode} />
      </div>

      {/* Pipeline track */}
      <section
        aria-label="Data flow pipeline"
        className="mt-5 rounded-2.5xl bg-cribl-soft p-5 shadow-card lg:p-7"
      >
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          {DATAFLOW_STAGES.map((s, i) => (
            <Fragment key={s.id}>
              <StageNode
                stage={s}
                mode={mode}
                active={i === active}
                visited={i < active}
                onSelect={() => goTo(i)}
              />
              {i < LAST && <Connector active={i < active} />}
            </Fragment>
          ))}
        </div>

        {/* Playback controls */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous stage"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-ink shadow-card transition-transform duration-150 ease-out active:scale-[0.95] disabled:opacity-40"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={handlePlay}
            className="flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 font-semibold text-white shadow-card transition-transform duration-150 ease-out active:scale-[0.98]"
          >
            {playing ? <Pause size={18} /> : <Play size={18} />}
            {playing ? "Pause" : active >= LAST ? "Replay" : "Play"}
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === LAST}
            aria-label="Next stage"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-ink shadow-card transition-transform duration-150 ease-out active:scale-[0.95] disabled:opacity-40"
          >
            <ChevronRight size={20} />
          </button>
          <button
            type="button"
            onClick={() => goTo(0)}
            aria-label="Reset to start"
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-muted shadow-card transition-transform duration-150 ease-out hover:text-ink active:scale-[0.95]"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </section>

      {/* Detail + cost, side by side on desktop */}
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <DetailPanel
          // Re-key so it re-animates on every stage/mode change.
          key={`${stage.id}-${mode}`}
          stage={stage}
          mode={mode}
          index={active}
          total={DATAFLOW_STAGES.length}
          onClose={() => goTo(0)}
        />
        <CostMeter mode={mode} />
      </div>

      {/* Legend */}
      <div className="mt-4 rounded-2.5xl bg-surface p-4 shadow-card">
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-faint">
          Legend
        </div>
        <ul className="grid gap-2 text-xs text-muted sm:grid-cols-2">
          <li className="flex items-center gap-2">
            <span className="trail-pulse flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-ink" />
            Glowing node = where the data packet is right now
          </li>
          <li className="flex items-center gap-2">
            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-cribl text-[8px] font-bold text-ink">
              C
            </span>
            Cyan node = Cribl, the control plane
          </li>
          <li className="flex items-center gap-2">
            <span className="relative h-5 w-5 flex-shrink-0">
              <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-teal" />
              <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal" />
            </span>
            Flowing dots = telemetry in motion between stages
          </li>
          <li className="flex items-center gap-2">
            <span className="h-5 w-5 flex-shrink-0 rounded-md border-2 border-dashed border-line bg-canvas" />
            Dashed gap = no control point (legacy view)
          </li>
        </ul>
      </div>
    </main>
  );
}
