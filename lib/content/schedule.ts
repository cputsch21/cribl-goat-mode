import type { InterviewSlot, PlanItem } from "./types";

// Call times aren't known yet — Chris adds each one on the dashboard
// (Adjust times) once it's actually booked.
export const INTERVIEWS: InterviewSlot[] = [
  {
    id: "kat",
    name: "Kat Hummel",
    role: "Channel · Partner Business Manager",
    defaultAt: "",
  },
  {
    id: "cam",
    name: "Cam Borgl",
    role: "Sales Engineering Leader",
    defaultAt: "",
  },
  {
    id: "rep",
    name: "Tim",
    role: "Enterprise AE · Patrick's team",
    defaultAt: "",
  },
];

// A prep cadence, not a calendar — the calls aren't dated yet. The course
// fits in a weekend; the later days are for laddering the Gauntlet and retakes.
export const GAME_PLAN: PlanItem[] = [
  { id: "sat-1", day: "Saturday", label: "Module 1 — Command of the Message (own the gap + the three whys)", href: "/module/m1" },
  { id: "sat-2", day: "Saturday", label: "Module 2 — MEDDPICC, Part 1 (every letter, cold)", href: "/module/m2" },
  { id: "sat-3", day: "Saturday", label: "Module 3 — MEDDPICC, Part 2 (run a live Cribl deal through it)", href: "/module/m3" },
  { id: "sat-4", day: "Saturday", label: "Module 4 — Command of the Sale", href: "/module/m4" },
  { id: "sat-5", day: "Saturday", label: "Module 5 — Pipeline Generation", href: "/module/m5" },
  { id: "sat-6", day: "Saturday", label: "Module 6 — The Channel & The Room", href: "/module/m6" },
  { id: "sat-7", day: "Saturday", label: "First pass through the flashcards", href: "/flashcards" },
  { id: "sat-8", day: "Saturday", label: "Call 2–3 partner friends (script in Module 9) — Ami's homework", href: "/module/m9" },
  { id: "sat-9", day: "Saturday", label: "Gauntlet: Shootout warm-up (text Practice Room if you can't talk)", href: "/gauntlet" },

  { id: "sun-1", day: "Sunday", label: "Module 7 — What Cribl Sells & Why It Matters", href: "/module/m7" },
  { id: "sun-2", day: "Sunday", label: "Module 8 — The Battlefield & The Receipts", href: "/module/m8" },
  { id: "sun-3", day: "Sunday", label: "Module 9 — The Kat Module", href: "/module/m9" },
  { id: "sun-4", day: "Sunday", label: "Module 10 — The Cam Module", href: "/module/m10" },
  { id: "sun-5", day: "Sunday", label: "Module 11 — The Rep Call", href: "/module/m11" },
  { id: "sun-6", day: "Sunday", label: "LinkedIn pass on Kat and Cam (prompts in cram sheets)", href: "/cram/kat" },
  { id: "sun-7", day: "Sunday", label: "Boss exam: the Kat Simulation", href: "/exam/kat" },
  { id: "sun-8", day: "Sunday", label: "Boss exam: the Cam Simulation", href: "/exam/cam" },
  { id: "sun-9", day: "Sunday", label: "Gauntlet: Kat Levels 1–3", href: "/gauntlet" },

  { id: "mon-1", day: "Monday", label: "Retake any quiz under 90%", href: "/" },
  { id: "mon-2", day: "Monday", label: "Gauntlet: Kat Levels 4–5 — beat Game 7 before her call", href: "/gauntlet" },
  { id: "mon-3", day: "Monday", label: "30 min before Kat: her cram sheet, phone away, walk in", href: "/cram/kat" },
  { id: "mon-4", day: "Monday", label: "After the Kat call: Gauntlet Cam Levels 1–5 (Patrick & Tim if time)", href: "/gauntlet" },

  { id: "tue-1", day: "Tuesday", label: "30 min before Cam: his cram sheet", href: "/cram/cam" },
  { id: "tue-2", day: "Tuesday", label: "Right after: quick reset, then Tim — be consistent with what you told Patrick", href: "/module/m11" },
];
