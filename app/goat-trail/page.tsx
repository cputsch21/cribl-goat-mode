"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { DATAFLOW_STAGES, type TrailMode } from "@/lib/content";
import { ModeToggle } from "@/components/trail/mode-toggle";
import { StageNode } from "@/components/trail/stage-node";
import { Connector } from "@/components/trail/connector";
import { CriblGap } from "@/components/trail/cribl-gap";
import { CostMeter } from "@/components/trail/cost-meter";

const LAST = DATAFLOW_STAGES.length - 1;
const HALF = DATAFLOW_STAGES.length / 2;

export default function GoatTrailPage() {
  const [mode, setMode] = useState<TrailMode>("legacy");
  const [openStage, setOpenStage] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Tap anywhere off the pipeline closes the open popover.
  useEffect(() => {
    if (openStage === null) return;
    const onDown = (e: PointerEvent) => {
      if (trackRef.current && !trackRef.current.contains(e.target as Node)) {
        setOpenStage(null);
      }
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [openStage]);

  const toggle = (i: number) => setOpenStage((cur) => (cur === i ? null : i));

  const changeMode = (m: TrailMode) => {
    setOpenStage(null);
    setMode(m);
  };

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
          Telemetry travels from the moment it&apos;s born to the moment it delivers value. Tap any
          step to see what happens there — then flip the switch to see what changes when Cribl sits in
          the middle.
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
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row lg:items-start lg:justify-between"
        >
          {DATAFLOW_STAGES.map((s, i) => {
            // In the legacy view the Cribl control plane doesn't exist — show a
            // pointer to where it would go instead of a node.
            const node =
              s.isControlPlane && mode === "legacy" ? (
                <CriblGap />
              ) : (
                <StageNode
                  stage={s}
                  mode={mode}
                  open={openStage === i}
                  side={i < HALF ? "right" : "left"}
                  onToggle={() => toggle(i)}
                />
              );
            return (
              <Fragment key={s.id}>
                {node}
                {i < LAST && <Connector />}
              </Fragment>
            );
          })}
        </div>
      </section>

      {/* Cost / noise meter */}
      <div className="mt-4">
        <CostMeter mode={mode} />
      </div>

      {/* Legend */}
      <div className="mt-4 rounded-2.5xl bg-surface p-4 shadow-card">
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-faint">
          Legend
        </div>
        <ul className="grid gap-2 text-xs text-muted sm:grid-cols-2">
          <li className="flex items-center gap-2">
            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-ink text-[8px] font-bold text-white">
              i
            </span>
            Tap any step to open its details
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
            <span className="text-base leading-none text-violet">↪</span>
            The arrow marks where Cribl would go (legacy view)
          </li>
        </ul>
      </div>
    </main>
  );
}
