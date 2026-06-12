import { PERIOD1 } from "./period1";
import { PERIOD2 } from "./period2";
import { PERIOD3 } from "./period3";
import { EXAMS, KAT_EXAM, CAM_EXAM } from "./exams";
import { FLASHCARDS } from "./flashcards";
import { CRAM_SHEETS } from "./cram";
import { GAME_PLAN, INTERVIEWS } from "./schedule";
import type { CourseModule, Exam } from "./types";

export const MODULES: CourseModule[] = [...PERIOD1, ...PERIOD2, ...PERIOD3];

export const MODULES_BY_ID = new Map(MODULES.map((m) => [m.id, m]));
export const EXAMS_BY_ID = new Map<string, Exam>(EXAMS.map((e) => [e.id, e]));

export const PERIODS: { number: 1 | 2 | 3; title: string; subtitle: string }[] = [
  { number: 1, title: "Period 1 — Know the Company", subtitle: "The pitch, the products, the war, the receipts" },
  { number: 2, title: "Period 2 — Know the Sale", subtitle: "Buyers, the system, and honest technical fluency" },
  { number: 3, title: "Period 3 — Know Your Interviewers", subtitle: "Kat, Cam, and the peer call" },
];

/** Quizzes that count toward GOAT status (all modules + both exams). */
export const TOTAL_UNITS = MODULES.length + EXAMS.length;

export { EXAMS, KAT_EXAM, CAM_EXAM, FLASHCARDS, CRAM_SHEETS, GAME_PLAN, INTERVIEWS };
export * from "./types";
