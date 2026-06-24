// Turns "where Chris is in the app" into something the tutor brain can use.
// The drawer reads the current route + progress and ships these strings to
// /api/tutor so "explain this" and "what should I study next" actually land.

import { MODULES, MODULES_BY_ID } from "@/lib/content";
import { isPassed, type ProgressState } from "@/lib/progress";

/** A tiny label for the drawer header chip ("Module 3", "Flashcards", …). */
export function locationLabel(pathname: string): string {
  const quiz = pathname.match(/^\/module\/([^/]+)\/quiz/);
  if (quiz) {
    const m = MODULES_BY_ID.get(quiz[1]);
    if (m) return `Module ${m.number} quiz`;
  }
  const mod = pathname.match(/^\/module\/([^/]+)/);
  if (mod) {
    const m = MODULES_BY_ID.get(mod[1]);
    if (m) return `Module ${m.number}`;
  }
  if (pathname.startsWith("/dojo")) return "Buyer Persona Dojo";
  if (pathname.startsWith("/deal")) return "Deal Command";
  if (pathname.startsWith("/flashcards")) return "Flashcards";
  if (pathname.startsWith("/practice")) return "Practice Room";
  if (pathname.startsWith("/cheat-sheet")) return "Cheat sheet";
  if (pathname === "/") return "Course home";
  return "GOAT Mode";
}

/** The full "where Chris is" sentence(s) the model reads as context. */
export function describeLocation(pathname: string): string {
  const quiz = pathname.match(/^\/module\/([^/]+)\/quiz/);
  if (quiz) {
    const m = MODULES_BY_ID.get(quiz[1]);
    if (m)
      return `Chris is taking the quiz for Module ${m.number}: "${m.title}". He needs 90%+ to pass (100% to mark it complete). Help him understand, don't just hand him answers.`;
  }
  const mod = pathname.match(/^\/module\/([^/]+)/);
  if (mod) {
    const m = MODULES_BY_ID.get(mod[1]);
    if (m)
      return [
        `Chris is reading Module ${m.number}: "${m.title}" — ${m.tagline}.`,
        m.audience ? `(${m.audience}.)` : "",
        `The sections on this page: ${m.cards.map((c) => c.title).join("; ")}.`,
        `When he says "this", he means this module.`,
      ]
        .filter(Boolean)
        .join(" ");
  }
  if (pathname.startsWith("/dojo"))
    return `Chris is in the Buyer Persona Dojo — studying a seat on the buying committee and rehearsing against an AI playing that buyer. Help him prep for that persona.`;
  if (pathname.startsWith("/deal"))
    return `Chris is in Deal Command — his live-deal workspace (MEDDPICC, the value story, the committee, meeting prep). Help him advance the real deal.`;
  if (pathname.startsWith("/flashcards"))
    return `Chris is reviewing flashcards — terms with their plain meaning and how they show up in a real sentence.`;
  if (pathname.startsWith("/practice"))
    return `Chris is in the Practice Room — text role-play against an AI buyer or coach.`;
  if (pathname === "/")
    return `Chris is on the course dashboard — the modules and his ramp game plan.`;
  return `Chris is somewhere in the GOAT Mode app.`;
}

/** What he's passed and what's left — so "study next" knows where to point. */
export function describeProgress(s: ProgressState): string {
  const passed = MODULES.filter((m) => isPassed(s, m.id));
  const notPassed = MODULES.filter((m) => !m.bonus && !isPassed(s, m.id));
  if (notPassed.length === 0)
    return `Progress: every core module is passed — he's polishing now, so push for sharper phrasing and edge cases.`;
  const names = notPassed
    .slice(0, 5)
    .map((m) => `Module ${m.number} (${m.title})`)
    .join(", ");
  return `Progress: ${passed.length}/${MODULES.length} modules passed. Not yet passed: ${names}. If he asks what to study next, steer him to these in order.`;
}

/** Context-aware quick-start prompts for the empty drawer. */
export function tutorStarters(pathname: string): string[] {
  if (/^\/module\/[^/]+\/quiz/.test(pathname))
    return [
      "I got one wrong — explain why",
      "Give me a hint, don't tell me",
      "What's the trap in these questions?",
    ];
  if (/^\/module\//.test(pathname))
    return [
      "Explain this module like I'm new",
      "Quiz me on this module",
      "Why does this matter in a real deal?",
    ];
  if (pathname.startsWith("/dojo"))
    return [
      "What does this persona care about most?",
      "What objections will they throw at me?",
      "Three sharp discovery questions for them",
    ];
  if (pathname.startsWith("/flashcards"))
    return [
      "Use this term in a sentence",
      "Which of these come up most in real deals?",
      "Quiz me on definitions",
    ];
  return [
    "What should I study next?",
    "Give me the 30-second pitch",
    "Quiz me — your pick",
  ];
}
