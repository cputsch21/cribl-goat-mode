"use client";

import { useSyncExternalStore } from "react";
import { MODULES } from "@/lib/content";

export const PASS_MARK = 90;

export interface QuizResult {
  best: number;
  passed: boolean;
  attempts: number;
}

export interface ProgressState {
  quizzes: Record<string, QuizResult>;
  plan: Record<string, boolean>;
  times: Record<string, string>;
  /** Gauntlet results, keyed "{person}-{level}" e.g. "kat-3". */
  interviews: Record<string, QuizResult>;
}

const KEY = "goat-progress-v1";
const DEFAULT: ProgressState = { quizzes: {}, plan: {}, times: {}, interviews: {} };

let cacheRaw: string | null = null;
let cacheParsed: ProgressState = DEFAULT;

function read(): ProgressState {
  if (typeof window === "undefined") return DEFAULT;
  const raw = window.localStorage.getItem(KEY);
  if (raw === cacheRaw) return cacheParsed;
  cacheRaw = raw;
  try {
    cacheParsed = raw ? { ...DEFAULT, ...JSON.parse(raw) } : DEFAULT;
  } catch {
    cacheParsed = DEFAULT;
  }
  return cacheParsed;
}

function write(next: ProgressState) {
  cacheRaw = JSON.stringify(next);
  cacheParsed = next;
  window.localStorage.setItem(KEY, cacheRaw);
  window.dispatchEvent(new Event("goat-progress"));
}

function subscribe(cb: () => void) {
  window.addEventListener("goat-progress", cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener("goat-progress", cb);
    window.removeEventListener("storage", cb);
  };
}

export function useProgress(): ProgressState {
  return useSyncExternalStore(subscribe, read, () => DEFAULT);
}

export function recordQuiz(id: string, scorePct: number) {
  const s = read();
  const prev = s.quizzes[id];
  const best = Math.max(prev?.best ?? 0, scorePct);
  write({
    ...s,
    quizzes: {
      ...s.quizzes,
      [id]: {
        best,
        passed: best >= PASS_MARK,
        attempts: (prev?.attempts ?? 0) + 1,
      },
    },
  });
}

export function togglePlan(id: string) {
  const s = read();
  write({ ...s, plan: { ...s.plan, [id]: !s.plan[id] } });
}

export function setInterviewTime(id: string, value: string) {
  const s = read();
  write({ ...s, times: { ...s.times, [id]: value } });
}

/** All quiz units that count toward GOAT status. */
export const UNIT_IDS = [...MODULES.map((m) => m.id), "exam-kat", "exam-cam"];

export function isPassed(s: ProgressState, id: string) {
  return s.quizzes[id]?.passed ?? false;
}

export function bestFor(s: ProgressState, id: string): number | null {
  return s.quizzes[id]?.best ?? null;
}

export function countPassed(s: ProgressState) {
  return UNIT_IDS.filter((id) => isPassed(s, id)).length;
}

/** Boss exams unlock once modules 1–9 are passed (module 10 is bonus). */
export function examsUnlocked(s: ProgressState) {
  return MODULES.filter((m) => !m.bonus).every((m) => isPassed(s, m.id));
}

export function missingForExams(s: ProgressState) {
  return MODULES.filter((m) => !m.bonus && !isPassed(s, m.id));
}

// ─── The Gauntlet (voice interviews) ────────────────────────────────

export const GAUNTLET_PEOPLE = ["patrick", "kat", "cam", "tim"] as const;
export const GAUNTLET_LEVELS = [1, 2, 3, 4, 5] as const;
export const GAUNTLET_TOTAL = GAUNTLET_PEOPLE.length * GAUNTLET_LEVELS.length;

export function interviewKey(person: string, level: number) {
  return `${person}-${level}`;
}

export function recordInterview(
  person: string,
  level: number,
  score: number,
  passed: boolean
) {
  const s = read();
  const key = interviewKey(person, level);
  const prev = s.interviews?.[key];
  write({
    ...s,
    interviews: {
      ...s.interviews,
      [key]: {
        best: Math.max(prev?.best ?? 0, score),
        passed: (prev?.passed ?? false) || passed,
        attempts: (prev?.attempts ?? 0) + 1,
      },
    },
  });
}

export function interviewResult(s: ProgressState, person: string, level: number) {
  return s.interviews?.[interviewKey(person, level)] ?? null;
}

/** Level 1 is always open; higher levels need the previous one passed. */
export function levelUnlocked(s: ProgressState, person: string, level: number) {
  if (level <= 1) return true;
  return s.interviews?.[interviewKey(person, level - 1)]?.passed ?? false;
}

export function gauntletPassedCount(s: ProgressState) {
  let n = 0;
  for (const p of GAUNTLET_PEOPLE)
    for (const l of GAUNTLET_LEVELS)
      if (s.interviews?.[interviewKey(p, l)]?.passed) n++;
  return n;
}

export function gauntletComplete(s: ProgressState) {
  return gauntletPassedCount(s) === GAUNTLET_TOTAL;
}

// Last verdict per cell lives under its own key (can get big).
const FEEDBACK_KEY = "goat-gauntlet-feedback-v1";

export function saveVerdict(person: string, level: number, verdict: unknown) {
  try {
    const raw = window.localStorage.getItem(FEEDBACK_KEY);
    const all = raw ? JSON.parse(raw) : {};
    all[interviewKey(person, level)] = verdict;
    window.localStorage.setItem(FEEDBACK_KEY, JSON.stringify(all));
  } catch {
    // non-fatal
  }
}

export function loadVerdict(person: string, level: number): unknown {
  try {
    const raw = window.localStorage.getItem(FEEDBACK_KEY);
    return raw ? JSON.parse(raw)[interviewKey(person, level)] ?? null : null;
  } catch {
    return null;
  }
}
