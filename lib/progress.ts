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
}

const KEY = "goat-progress-v1";
const DEFAULT: ProgressState = { quizzes: {}, plan: {}, times: {} };

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
