// Context helpers for the Professor (office hours) page. Unlike the Tutor —
// which reads the current route to know where Chris is — the Professor lives on
// its own page with no module in the URL, so it gets its focus from an in-page
// module picker. These helpers feed that picker and turn the chosen module into
// the FOCUS string the Professor brain reads.

import { MODULES } from "@/lib/content";
import { isPassed, unitPassed, type ProgressState } from "@/lib/progress";
import { describeProgress } from "@/lib/tutor-context";

/** The module to open office hours on: his current/next unpassed core module. */
export function professorDefaultModuleId(progress: ProgressState): string {
  const next = MODULES.find((m) => !m.bonus && !unitPassed(progress, m.id));
  return (next ?? MODULES[0]).id;
}

/** Lightweight list for the picker UI. */
export function moduleOptions() {
  return MODULES.map((m) => ({ id: m.id, number: m.number, title: m.title }));
}

/** The FOCUS context string sent to /api/professor for the chosen module. */
export function describeFocus(
  moduleId: string | null,
  progress: ProgressState
): string {
  const m = moduleId ? MODULES.find((x) => x.id === moduleId) : undefined;
  if (!m) {
    return `Chris is in office hours and hasn't picked a specific lesson — let him steer, and help him with anything in the course.\n${describeProgress(
      progress
    )}`;
  }
  const lines = [
    `Chris is in office hours, digging into Module ${m.number}: "${m.title}" — ${m.tagline}.`,
    m.audience ? `(${m.audience}.)` : "",
    `The pieces of this lesson: ${m.cards.map((c) => c.title).join("; ")}.`,
    `When he says "this", he means this module — but follow any tangent he raises, that's the point of office hours.`,
    isPassed(progress, m.id)
      ? `He's already passed this one, so go deeper than the basics if he wants.`
      : ``,
  ].filter(Boolean);
  return `${lines.join(" ")}\n${describeProgress(progress)}`;
}

/** Open-ended, rabbit-hole-flavored starters for the empty office-hours chat. */
export function professorStarters(moduleId: string | null): string[] {
  if (moduleId) {
    return [
      "Explain this from first principles — like I've never heard of it",
      "Why does this even exist? What problem made it necessary?",
      "Give me the deep version, not the interview version",
      "What's a question I don't know to ask here?",
    ];
  }
  return [
    "What's the one idea that ties this whole course together?",
    "Teach me something most reps get wrong",
    "I want to go down a rabbit hole — pick a good one",
    "What's a question I don't know to ask?",
  ];
}
