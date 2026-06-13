import type { InterviewSlot, PlanItem } from "./types";

// Times pulled from the call recordings — the dashboard tells Chris to
// double-check against his calendar invites and edit if needed.
export const INTERVIEWS: InterviewSlot[] = [
  {
    id: "kat",
    name: "Kat Hummel",
    role: "Channel · Partner Business Manager",
    defaultAt: "2026-06-15T15:30:00",
  },
  {
    id: "cam",
    name: "Cam Borgl",
    role: "Sales Engineering Leader",
    defaultAt: "2026-06-16T10:30:00",
  },
  {
    id: "rep",
    name: "Tim",
    role: "Enterprise AE · Patrick's team",
    defaultAt: "2026-06-16T11:00:00",
  },
];

// No Friday work — the whole course fits in Sat + Sun, with Monday
// reserved for Kat's ladder and retakes before her 3:30.
export const GAME_PLAN: PlanItem[] = [
  { id: "sat-1", day: "Saturday", label: "Module 1 — The Pitch (own the 30-second version)", href: "/module/m1" },
  { id: "sat-2", day: "Saturday", label: "Module 2 — The Products", href: "/module/m2" },
  { id: "sat-3", day: "Saturday", label: "Module 3 — The Battlefield", href: "/module/m3" },
  { id: "sat-4", day: "Saturday", label: "Module 4 — The Receipts", href: "/module/m4" },
  { id: "sat-5", day: "Saturday", label: "Module 5 — The Buyers", href: "/module/m5" },
  { id: "sat-6", day: "Saturday", label: "First pass through the flashcards", href: "/flashcards" },
  { id: "sat-7", day: "Saturday", label: "Call 2–3 partner friends (script in Module 8) — Ami's homework", href: "/module/m8" },
  { id: "sat-8", day: "Saturday", label: "Gauntlet: Shootout warm-up (text Practice Room if you can't talk)", href: "/gauntlet" },

  { id: "sun-1", day: "Sunday", label: "Module 6 — The System", href: "/module/m6" },
  { id: "sun-2", day: "Sunday", label: "Module 7 — Talk Tech Without Faking It", href: "/module/m7" },
  { id: "sun-3", day: "Sunday", label: "Module 8 — The Kat Module", href: "/module/m8" },
  { id: "sun-4", day: "Sunday", label: "Module 9 — The Cam Module", href: "/module/m9" },
  { id: "sun-5", day: "Sunday", label: "Module 10 — The Rep Call", href: "/module/m10" },
  { id: "sun-6", day: "Sunday", label: "LinkedIn pass on Kat and Cam (prompts in cram sheets)", href: "/cram/kat" },
  { id: "sun-7", day: "Sunday", label: "Boss exam: the Kat Simulation", href: "/exam/kat" },
  { id: "sun-8", day: "Sunday", label: "Boss exam: the Cam Simulation", href: "/exam/cam" },
  { id: "sun-9", day: "Sunday", label: "Gauntlet: Kat Levels 1–3", href: "/gauntlet" },

  { id: "mon-1", day: "Monday", label: "Retake any quiz under 90%", href: "/" },
  { id: "mon-2", day: "Monday", label: "Gauntlet: Kat Levels 4–5 — beat Game 7 before her call", href: "/gauntlet" },
  { id: "mon-3", day: "Monday", label: "30 min before Kat: her cram sheet, phone away, walk in", href: "/cram/kat" },
  { id: "mon-4", day: "Monday", label: "Tonight, after Kat: Gauntlet Cam Levels 1–5 (Patrick & Tim if time)", href: "/gauntlet" },

  { id: "tue-1", day: "Tuesday", label: "30 min before Cam: his cram sheet", href: "/cram/cam" },
  { id: "tue-2", day: "Tuesday", label: "Right after: quick reset, then Tim — be consistent with what you told Patrick", href: "/module/m10" },
];
