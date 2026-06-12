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

export const GAME_PLAN: PlanItem[] = [
  { id: "fri-1", day: "Tonight · Fri", label: "Module 1 — The Pitch (own the 30-second version)", href: "/module/m1" },
  { id: "fri-2", day: "Tonight · Fri", label: "Module 2 — The Products", href: "/module/m2" },
  { id: "fri-3", day: "Tonight · Fri", label: "First pass through the flashcards", href: "/flashcards" },

  { id: "sat-1", day: "Saturday", label: "Module 3 — The Battlefield", href: "/module/m3" },
  { id: "sat-2", day: "Saturday", label: "Module 4 — The Receipts", href: "/module/m4" },
  { id: "sat-3", day: "Saturday", label: "Module 5 — The Buyers", href: "/module/m5" },
  { id: "sat-4", day: "Saturday", label: "Module 6 — The System", href: "/module/m6" },
  { id: "sat-5", day: "Saturday", label: "Module 7 — Talk Tech Without Faking It", href: "/module/m7" },
  { id: "sat-6", day: "Saturday", label: "Call 2–3 partner friends (script in Module 8) — Ami's homework", href: "/module/m8" },
  { id: "sat-7", day: "Saturday", label: "Practice Room warm-up with the Coach", href: "/practice" },
  { id: "sat-8", day: "Saturday", label: "Gauntlet: Shootout warm-up, then Kat Levels 1–2", href: "/gauntlet" },

  { id: "sun-1", day: "Sunday", label: "Module 8 — The Kat Module", href: "/module/m8" },
  { id: "sun-2", day: "Sunday", label: "Module 9 — The Cam Module", href: "/module/m9" },
  { id: "sun-3", day: "Sunday", label: "LinkedIn pass on Kat and Cam (prompts in cram sheets)", href: "/cram/kat" },
  { id: "sun-4", day: "Sunday", label: "Module 10 — The Rep Call", href: "/module/m10" },
  { id: "sun-5", day: "Sunday", label: "Boss exam: the Kat Simulation", href: "/exam/kat" },
  { id: "sun-6", day: "Sunday", label: "Boss exam: the Cam Simulation", href: "/exam/cam" },
  { id: "sun-7", day: "Sunday", label: "Practice Room: one round as Kat, one as Cam", href: "/practice" },
  { id: "sun-8", day: "Sunday", label: "Gauntlet: Kat Levels 3–5 — beat Game 7", href: "/gauntlet" },
  { id: "sun-9", day: "Sunday", label: "Gauntlet: Cam Levels 1–5", href: "/gauntlet" },

  { id: "mon-1", day: "Monday", label: "Retake any quiz under 90%", href: "/" },
  { id: "mon-1b", day: "Monday", label: "Gauntlet: retake anything failed; Patrick & Tim runs if time", href: "/gauntlet" },
  { id: "mon-2", day: "Monday", label: "30 min before Kat: her cram sheet, phone away, walk in", href: "/cram/kat" },

  { id: "tue-1", day: "Tuesday", label: "30 min before Cam: his cram sheet", href: "/cram/cam" },
  { id: "tue-2", day: "Tuesday", label: "Right after: quick reset, then Tim — be consistent with what you told Patrick", href: "/module/m10" },
];
