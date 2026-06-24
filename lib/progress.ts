"use client";

import { useSyncExternalStore } from "react";
import { GAME_PLAN, MODULES } from "@/lib/content";

export const PASS_MARK = 90;
/** A module only counts as *complete* on a flawless run. */
export const COMPLETE_MARK = 100;
/** Write-in quizzes are harder (typed from memory), so they pass at a lower bar. */
export const WRITE_IN_PASS_MARK = 75;

/** The storage key for a module's write-in quiz, kept separate from its multiple-choice score. */
export function writeInId(moduleId: string) {
  return `${moduleId}-write`;
}

export interface QuizResult {
  best: number;
  passed: boolean;
  /** True once the quiz has been aced (100%). */
  completed: boolean;
  attempts: number;
}

export interface ProgressState {
  quizzes: Record<string, QuizResult>;
  plan: Record<string, boolean>;
  /** Per-card day override for the game plan, e.g. dragging "Module 1" from Saturday to Sunday. */
  planDay: Record<string, string>;
  /** Sort key per game-plan card; a moved card gets a high value so it lands at the bottom of its new day. */
  planOrder: Record<string, number>;
  times: Record<string, string>;
  /** Gauntlet results, keyed "{person}-{level}" e.g. "kat-3". */
  interviews: Record<string, QuizResult>;
}

const KEY = "goat-progress-v2";
const DEFAULT: ProgressState = {
  quizzes: {},
  plan: {},
  planDay: {},
  planOrder: {},
  times: {},
  interviews: {},
};

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

export function recordQuiz(id: string, scorePct: number, passMark = PASS_MARK) {
  const s = read();
  const prev = s.quizzes[id];
  const best = Math.max(prev?.best ?? 0, scorePct);
  write({
    ...s,
    quizzes: {
      ...s.quizzes,
      [id]: {
        best,
        passed: best >= passMark,
        completed: best >= COMPLETE_MARK,
        attempts: (prev?.attempts ?? 0) + 1,
      },
    },
  });
}

export function togglePlan(id: string) {
  const s = read();
  write({ ...s, plan: { ...s.plan, [id]: !s.plan[id] } });
}

/** The day a game-plan card currently lives on: its dragged-to override, or its original day. */
export function planDayOf(s: ProgressState, item: { id: string; day: string }): string {
  return s.planDay?.[item.id] ?? item.day;
}

/** Sort key for a card within its day. Untouched cards keep their natural order; moved cards sort last. */
export function planOrderOf(s: ProgressState, id: string, naturalIndex: number): number {
  return s.planOrder?.[id] ?? naturalIndex;
}

/** Move a game-plan card to another day, dropping it at the bottom of that day's list. */
export function movePlanItem(id: string, day: string) {
  const s = read();
  const orders = Object.values(s.planOrder ?? {});
  const nextOrder = Math.max(GAME_PLAN.length, ...orders) + 1;
  write({
    ...s,
    planDay: { ...s.planDay, [id]: day },
    planOrder: { ...s.planOrder, [id]: nextOrder },
  });
}

export function setInterviewTime(id: string, value: string) {
  const s = read();
  write({ ...s, times: { ...s.times, [id]: value } });
}

/** All quiz units that count toward GOAT status. */
export const UNIT_IDS = [...MODULES.map((m) => m.id)];

export function isPassed(s: ProgressState, id: string) {
  return s.quizzes[id]?.passed ?? false;
}

/** A module is complete only after a 100% quiz run. */
export function isComplete(s: ProgressState, id: string) {
  return s.quizzes[id]?.completed ?? (s.quizzes[id]?.best ?? 0) >= COMPLETE_MARK;
}

export function bestFor(s: ProgressState, id: string): number | null {
  return s.quizzes[id]?.best ?? null;
}

/**
 * A unit "counts" when it's fully cleared. A module now requires BOTH its
 * multiple-choice and its write-in quiz to pass; exams have only one quiz.
 */
export function unitPassed(s: ProgressState, id: string): boolean {
  if (id.startsWith("exam-")) return isPassed(s, id);
  return isPassed(s, id) && isPassed(s, writeInId(id));
}

export function countPassed(s: ProgressState) {
  return UNIT_IDS.filter((id) => unitPassed(s, id)).length;
}

/** Boss exams unlock once modules 1–9 are fully passed — both quizzes each (module 10 is bonus). */
export function examsUnlocked(s: ProgressState) {
  return MODULES.filter((m) => !m.bonus).every((m) => unitPassed(s, m.id));
}

export function missingForExams(s: ProgressState) {
  return MODULES.filter((m) => !m.bonus && !unitPassed(s, m.id));
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
  const best = Math.max(prev?.best ?? 0, score);
  write({
    ...s,
    interviews: {
      ...s.interviews,
      [key]: {
        best,
        passed: (prev?.passed ?? false) || passed,
        completed: (prev?.completed ?? false) || best >= COMPLETE_MARK,
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
