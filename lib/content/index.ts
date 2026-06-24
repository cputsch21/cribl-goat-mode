import { PERIOD1 } from "./period1";
import { PERIOD2 } from "./period2";
import { FLASHCARDS } from "./flashcards";
import { GAME_PLAN } from "./schedule";
import type { CourseModule } from "./types";

export const MODULES: CourseModule[] = [...PERIOD1, ...PERIOD2];

export const MODULES_BY_ID = new Map(MODULES.map((m) => [m.id, m]));

export const PERIODS: { number: 1 | 2 | 3; title: string; subtitle: string }[] = [
  { number: 1, title: "Period 1 — The Sales Motion", subtitle: "Command of the Message, MEDDPICC, the deal, pipeline, and the channel" },
  { number: 2, title: "Period 2 — Know the Product", subtitle: "What Cribl sells, why it wins, the industry, and the honest fluency to talk it" },
];

/** Quizzes that count toward GOAT status (all modules). */
export const TOTAL_UNITS = MODULES.length;

export { FLASHCARDS, GAME_PLAN };
export * from "./types";
export * from "./dataflow";
export * from "./cheatsheet";
