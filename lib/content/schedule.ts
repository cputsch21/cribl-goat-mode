import type { PlanItem } from "./types";

// A ramp cadence, not a calendar: learn the motion, then the product, then
// drill the buying committee in the Dojo, then run live reps in Deal Command.
// Drag a card between phases on the dashboard.
export const GAME_PLAN: PlanItem[] = [
  { id: "w1-1", day: "Week 1 · The motion", label: "Module 1 — Command of the Message", href: "/module/m1" },
  { id: "w1-2", day: "Week 1 · The motion", label: "Module 2 — MEDDPICC, Part 1", href: "/module/m2" },
  { id: "w1-3", day: "Week 1 · The motion", label: "Module 3 — MEDDPICC, Part 2", href: "/module/m3" },
  { id: "w1-4", day: "Week 1 · The motion", label: "Module 4 — Command of the Sale", href: "/module/m4" },
  { id: "w1-5", day: "Week 1 · The motion", label: "Module 5 — Pipeline Generation", href: "/module/m5" },
  { id: "w1-6", day: "Week 1 · The motion", label: "Module 6 — The Channel & The Room", href: "/module/m6" },

  { id: "w1-7", day: "Week 1 · The product", label: "Module 7 — What Cribl Sells & Why It Matters", href: "/module/m7" },
  { id: "w1-8", day: "Week 1 · The product", label: "Module 8 — The Battlefield & The Receipts", href: "/module/m8" },
  { id: "w1-9", day: "Week 1 · The product", label: "Module 12 — Why Now: The Industry", href: "/module/m12" },
  { id: "w1-10", day: "Week 1 · The product", label: "First pass through the flashcards", href: "/flashcards" },

  { id: "w2-1", day: "Week 2 · The committee", label: "Study the CISO in the Buyer Persona Dojo", href: "/dojo/ciso" },
  { id: "w2-2", day: "Week 2 · The committee", label: "Rehearse a persona out loud, get scored", href: "/dojo" },
  { id: "w2-3", day: "Week 2 · The committee", label: "The cheat sheet — the whole course on one screen", href: "/cheat-sheet" },

  { id: "w2-4", day: "Week 2 · Live deals", label: "Open a deal in Deal Command, run it through MEDDPICC", href: "/deal" },
  { id: "w2-5", day: "Week 2 · Live deals", label: "Practice Room — a quick rep when you can't talk out loud", href: "/practice" },
  { id: "w2-6", day: "Week 2 · Live deals", label: "Retake any quiz under 90%", href: "/" },
];
