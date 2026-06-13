"use client";

/** Shown in the "Without Cribl" view in place of the Cribl Stream node: a fun,
 *  subtle hand-drawn curved arrow pointing at the gap in the line where the
 *  control plane is missing. */
export function CriblGap() {
  return (
    <div className="group relative flex flex-shrink-0 flex-col items-center justify-center gap-1 px-2 py-1">
      <span className="max-w-[7rem] text-center text-[11px] font-semibold italic leading-tight text-violet">
        where Cribl would go
      </span>
      <svg
        width="58"
        height="34"
        viewBox="0 0 58 34"
        fill="none"
        aria-hidden
        className="text-violet/70"
      >
        {/* curved, dashed pointer swooping down to the line */}
        <path
          d="M6 4 C 2 18, 18 24, 30 27"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="0.5 5"
        />
        {/* arrowhead */}
        <path
          d="M23 22 L31 28 L22 31"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
