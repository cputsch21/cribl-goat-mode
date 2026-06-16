// Turns a deal's structured data into the context block the AI coach reads.
// The richer the deal, the sharper the coaching — this is the "more info =
// more accurate" mechanic. Mirrors how lib/tutor-context.ts feeds the tutor.

import {
  MEDDPICC,
  VALUE_FIELDS,
  healthScore,
  guidance,
  type Deal,
  type Meeting,
} from "@/lib/deals";

export function buildDealContext(deal: Deal): string {
  const l: string[] = [];

  l.push(`ACCOUNT: ${deal.account || "(unnamed)"}`);
  l.push(`OPPORTUNITY: ${deal.oppName || "(unnamed)"}`);
  l.push(
    `PRODUCTS: ${deal.products.length ? deal.products.join(", ") : "(none selected)"}`
  );
  l.push(`ARR / DEAL SIZE: ${deal.arr || "(unknown)"}`);
  l.push(`TARGET CLOSE: ${deal.closeDate || "(unset)"}`);
  l.push(
    `STAGE: ${deal.stage}${
      deal.stage === "Closed" && deal.result ? ` (${deal.result})` : ""
    }`
  );
  l.push(`MEDDPICC HEALTH: ${healthScore(deal)}/100`);

  l.push("");
  l.push("MEDDPICC (qualification — status is Missing/Weak/Strong):");
  for (const el of MEDDPICC) {
    const st = deal.meddpicc[el.key];
    const fields = el.fields
      .map((f) => {
        const v = st?.fields?.[f.key];
        return v ? `${f.label}: ${v}` : null;
      })
      .filter(Boolean)
      .join("; ");
    l.push(
      `- ${el.name} [${st?.status ?? "Missing"}]${fields ? ` — ${fields}` : ""}${
        st?.notes ? ` — notes: ${st.notes}` : ""
      }`
    );
  }

  l.push("");
  l.push("VALUE FRAMEWORK (Command of the Message):");
  for (const f of VALUE_FIELDS) {
    const v = deal.value[f.key];
    l.push(`- ${f.label}: ${v ? v : "(blank)"}`);
  }

  l.push("");
  if (deal.stakeholders.length) {
    l.push("STAKEHOLDERS (buying committee):");
    for (const s of deal.stakeholders) {
      l.push(
        `- ${s.name || "(unnamed)"}${s.title ? `, ${s.title}` : ""} — ${s.role}, sentiment ${s.sentiment}`
      );
    }
  } else {
    l.push("STAKEHOLDERS: none mapped (single-threaded — a risk).");
  }

  l.push("");
  if (deal.actions.length) {
    l.push("ACTION PLAN:");
    for (const a of deal.actions) {
      l.push(
        `- [${a.done ? "done" : "open"}] ${a.text || "(blank)"}${
          a.owner ? ` (owner: ${a.owner})` : ""
        }${a.due ? ` (due: ${a.due})` : ""}`
      );
    }
  } else {
    l.push("ACTION PLAN: empty.");
  }

  const moves = guidance(deal);
  if (moves.length) {
    l.push("");
    l.push("THE APP'S DETERMINISTIC GAP-CHECKER ALREADY FLAGS:");
    for (const m of moves) {
      l.push(
        `- [${m.p === 1 ? "Now" : m.p === 2 ? "Next" : "Later"}] ${m.t}`
      );
    }
  }

  return l.join("\n");
}

/** Describes one meeting (type, who's in the room, the objective) for the prep model. */
export function buildMeetingContext(deal: Deal, meeting: Meeting): string {
  const l: string[] = [];
  l.push(`MEETING TYPE: ${meeting.type}`);
  if (meeting.date) l.push(`DATE: ${meeting.date}`);

  const named = meeting.attendeeIds
    .map((id) => deal.stakeholders.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map(
      (s) =>
        `${s.name || "(unnamed)"}${s.title ? `, ${s.title}` : ""} — ${s.role}, sentiment ${s.sentiment}`
    );
  const who = [...named, meeting.attendeesNote].filter(Boolean).join("; ");
  l.push(`ATTENDEES: ${who || "(not specified)"}`);

  l.push(`REP'S OBJECTIVE FOR THIS MEETING: ${meeting.objective || "(not specified)"}`);
  l.push(`WHAT'S KNOWN / UNKNOWN GOING IN: ${meeting.context || "(not specified)"}`);
  return l.join("\n");
}
