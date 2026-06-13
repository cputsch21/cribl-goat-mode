"use client";

import { cn } from "@/lib/utils";

const DOTS = [
  { speed: "2.4s", delay: "0s" },
  { speed: "2.4s", delay: "0.8s" },
  { speed: "2.4s", delay: "1.6s" },
];

/** The segment between two stage stops, with gently flowing dots that read as
 *  "telemetry in motion". Horizontal on lg+, vertical on mobile. */
export function Connector() {
  return (
    <div
      aria-hidden
      className={cn(
        // Vertical on mobile, horizontal on lg+ (aligned to the 64px icon row)
        "relative my-1 h-8 w-px self-center overflow-visible rounded-full bg-line lg:my-0 lg:mt-8 lg:h-px lg:w-auto lg:flex-1 lg:self-start"
      )}
    >
      {/* Vertical dots (mobile) */}
      <div className="lg:hidden">
        {DOTS.map((d, i) => (
          <span
            key={`y-${i}`}
            className="trail-flow-dot trail-flow-dot-y absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal"
            style={
              {
                "--trail-speed": d.speed,
                "--trail-delay": d.delay,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
      {/* Horizontal dots (desktop) */}
      <div className="hidden lg:block">
        {DOTS.map((d, i) => (
          <span
            key={`x-${i}`}
            className="trail-flow-dot trail-flow-dot-x absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal"
            style={
              {
                "--trail-speed": d.speed,
                "--trail-delay": d.delay,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
