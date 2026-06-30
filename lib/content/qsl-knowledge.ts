// A model-readable knowledge pack built from the QSL course (lib/content/qsl.ts).
// This is the entire Qualified Sales Leader *playbook* — every framework,
// process, list, and question bank from the book, rendered as plain text so the
// Tutor and Professor brains can teach and quiz from it. (Frameworks and
// summaries in our own words — not the book's verbatim text.)

import { QSL_INTRO, QSL_COURSE, type QSLNode } from "@/lib/content/qsl";

function renderNode(n: QSLNode): string {
  switch (n.k) {
    case "p":
      return n.t;
    case "list":
      return n.items
        .map((it, i) => (n.ordered ? `${i + 1}. ` : "- ") + it)
        .join("\n");
    case "q":
      return (
        `${n.title ?? "Questions to ask"}:\n` +
        n.items.map((it) => `  • ${it}`).join("\n")
      );
    case "note":
      return `[${n.label}] ${n.t}`;
    case "sub":
      return `${n.title}\n` + n.nodes.map(renderNode).join("\n");
  }
}

const body = QSL_COURSE.map((m) => {
  const lessons = m.lessons
    .map(
      (l) =>
        `\n— ${l.title} (${l.tag})\n` +
        l.nodes.map(renderNode).join("\n")
    )
    .join("\n");
  const mastery = m.mastery?.length
    ? `\nPROVE-IT CHECKS: ${m.mastery.join(" | ")}`
    : "";
  return `\n\n## MODULE ${m.num} — ${m.title}\n${m.tag}${lessons}${mastery}`;
}).join("");

/**
 * The full QSL playbook as one string, ready to drop into a system prompt.
 * Covers: the 6-stage sales process, MEDDICC, discovery/scoping question banks,
 * champion-building, the economic-buyer playbook, POV, business case,
 * negotiation, recruiting/leadership, and forecasting strategy.
 */
export const QSL_KNOWLEDGE = `=== QSL PLAYBOOK — "The Qualified Sales Leader" (John McMahon) ===
This is the book's methodology as taught in the app's QSL course. Use it to teach, explain, and quiz Chris on the sales process, MEDDICC qualification, value selling, champions, the economic buyer, POV, negotiation, and forecasting. It is the methodology — not Cribl-specific facts.

THE SPINE: ${QSL_INTRO.spine}${body}
=== END QSL PLAYBOOK ===`;
