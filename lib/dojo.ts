"use client";

// Per-persona rehearsal results, persisted on-device exactly like lib/deals.ts:
// a cached localStorage read, a write() that fires a custom event, and
// useSyncExternalStore so every subscribed component re-renders. No backend.

import { useSyncExternalStore } from "react";

export interface DojoSimLine {
  role: "rep" | "buyer";
  text: string;
}

/** Same shape the persona-debrief route returns (mirrors lib/deals SimDebrief). */
export interface DojoDebrief {
  score: number;
  summary: string;
  advanced: boolean;
  advanceNote: string;
  meddpicc: { area: string; verdict: "Hit" | "Partial" | "Missed"; note: string }[];
  valueExecution: string[];
  strengths: string[];
  fixes: { issue: string; sayThis: string }[];
}

export interface DojoSim {
  id: string;
  at: number;
  seconds: number;
  score: number;
  transcript: DojoSimLine[];
  debrief: DojoDebrief | null;
}

export interface PersonaResult {
  lastScore: number | null;
  lastAt: number | null;
  attempts: number;
  best: number;
  sims: DojoSim[]; // newest first
}

export interface DojoState {
  byPersona: Record<string, PersonaResult>;
}

export const uid = (p: string) =>
  p + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

const KEY = "persona-dojo-v1";
const EVT = "persona-dojo-change";
const DEFAULT: DojoState = { byPersona: {} };

let cacheRaw: string | null = null;
let cacheParsed: DojoState = DEFAULT;

function read(): DojoState {
  if (typeof window === "undefined") return DEFAULT;
  const raw = window.localStorage.getItem(KEY);
  if (raw === cacheRaw) return cacheParsed; // identity short-circuit keeps getSnapshot stable
  cacheRaw = raw;
  try {
    cacheParsed = raw ? normalize(JSON.parse(raw) as DojoState) : DEFAULT;
  } catch {
    cacheParsed = DEFAULT;
  }
  return cacheParsed;
}

/** Back-fill fields added in later versions so older saved results still load. */
function normalize(s: DojoState): DojoState {
  if (!s?.byPersona) return DEFAULT;
  for (const id in s.byPersona) {
    const r = s.byPersona[id];
    if (!Array.isArray(r.sims)) r.sims = [];
    if (r.best === undefined) r.best = r.lastScore ?? 0;
    if (r.attempts === undefined) r.attempts = r.sims.length;
  }
  return s;
}

function write(next: DojoState) {
  cacheRaw = JSON.stringify(next);
  cacheParsed = next;
  window.localStorage.setItem(KEY, cacheRaw);
  window.dispatchEvent(new Event(EVT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function useDojo(): DojoState {
  return useSyncExternalStore(subscribe, read, () => DEFAULT);
}

export function usePersonaResult(personaId: string | undefined): PersonaResult | null {
  const s = useDojo();
  return personaId ? s.byPersona[personaId] ?? null : null;
}

/** False during SSR + first client render, true after — gates localStorage UI. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

/** Save a finished rehearsal: best-of merge for the score, newest sim first. */
export function recordSim(
  personaId: string,
  sim: { seconds: number; transcript: DojoSimLine[]; debrief: DojoDebrief }
) {
  const s = read();
  const prev = s.byPersona[personaId];
  const score = sim.debrief.score;
  const entry: DojoSim = {
    id: uid("sim_"),
    at: Date.now(),
    seconds: sim.seconds,
    score,
    transcript: sim.transcript,
    debrief: sim.debrief,
  };
  write({
    byPersona: {
      ...s.byPersona,
      [personaId]: {
        lastScore: score,
        lastAt: entry.at,
        attempts: (prev?.attempts ?? 0) + 1,
        best: Math.max(prev?.best ?? 0, score),
        sims: [entry, ...(prev?.sims ?? [])],
      },
    },
  });
}
