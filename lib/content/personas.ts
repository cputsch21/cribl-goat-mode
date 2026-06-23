// The Buyer Persona Dojo's content layer.
//
// One dossier per seat on a Cribl buying committee. The CISO is authored in
// full from vetted material already in this app (the course + the Coach
// knowledge pack, source-tagged patrick / ami / cribl.io); the other eight are
// stubs (`ready: false`) until they're written the same way.
//
// HARD RULE — never invent. Every line here is sourced from the repo's vetted
// content. Anything we couldn't source is marked `gap: true` and rendered as a
// visible "[fill from your notes]" slot, never a guess.

export type PersonaCluster = "security" | "ops" | "swing";

/** A study-card line. `gap` marks an unsourced slot to fill from Chris's notes. */
export interface PersonaPoint {
  text: string;
  gap?: boolean;
}

export interface PersonaObjection {
  objection: string;
  reframe: string;
  gap?: boolean;
}

export interface PersonaDiscovery {
  q: string;
  /** MEDDPICC / Command-of-the-Message tag, e.g. "Pain · Metrics". */
  tag: string;
}

export interface Persona {
  id: string;
  name: string;
  title: string;
  cluster: PersonaCluster;
  /** Their seat on the committee, in MEDDPICC terms. */
  committeeRole: string;
  /** One-line teaser for the list + the coming-soon state. */
  blurb: string;
  /** Authored in full (study card + rehearsal) vs. a stub. */
  ready: boolean;
  whereTheySit?: string;
  measuredOn?: PersonaPoint[];
  pains?: PersonaPoint[];
  whatLands?: PersonaPoint[];
  objections?: PersonaObjection[];
  discovery?: PersonaDiscovery[];
  /** Tunes how the rehearsal buyer behaves (server builds the role-play from this). */
  disposition?: string;
}

export const PERSONA_GROUPS: { key: PersonaCluster; label: string; sub: string }[] = [
  { key: "security", label: "Security", sub: "They buy on risk, control, and audit-readiness" },
  { key: "ops", label: "IT / Ops / Dev", sub: "They buy on cost, capacity, and velocity" },
  { key: "swing", label: "Swing roles", sub: "They never hear the pitch — but they can make or break the deal" },
];

export const PERSONAS: Persona[] = [
  // ── Security cluster ──────────────────────────────────────────────────────
  {
    id: "ciso",
    name: "The CISO",
    title: "Chief information security officer",
    cluster: "security",
    committeeRole: "Economic buyer",
    blurb:
      "Owns security strategy, risk, and usually the SIEM budget — the most common economic buyer in a Cribl deal.",
    ready: true,
    whereTheySit:
      "Signs the check — usually the economic buyer who owns the SIEM budget. Your champion (often the SecOps architect) has to sell them internally, so arm the champion with the business case.",
    measuredOn: [
      { text: "Choice, flexibility & control over the data strategy" },
      { text: "Audit readiness & compliance posture" },
      { text: "Cost of the security stack — the SIEM bill they own" },
      { text: "AI readiness, governance & compliance" },
      { text: "[The board-level security KPI they report up]", gap: true },
    ],
    pains: [
      {
        text:
          "An indefensible, rising SIEM bill — security data roughly doubles every ~18 months and the license tracks it.",
      },
      { text: "Coverage gaps when the team drops data just to stay under license." },
      { text: "Feeding AI the right data — without leaking the wrong data into models." },
      { text: "[A real CISO pain in their own words — from your notes]", gap: true },
    ],
    whatLands: [
      {
        text:
          "Tiering: high-value data to the SIEM (~90 days), everything else to cheap storage they control — most customers fund the project with the savings.",
      },
      {
        text:
          "Vendor-neutral control layer: keep Splunk / CrowdStrike — Cribl makes them cheaper and better, not a rip-and-replace.",
      },
      {
        text:
          "The control point for AI: governed data in, sensitive data (PII, PCI) masked before it ever leaves.",
      },
      {
        text:
          "Required capabilities that hold up: vendor-neutral, hybrid / on-prem, and search-in-place.",
      },
      {
        text:
          "Proof tied to their pain: SRA cut SIEM costs ~80%; one customer's Splunk license went $900K → $200K/yr.",
      },
    ],
    objections: [
      {
        objection: "We already have Splunk.",
        reframe:
          "Keep it. Cribl controls what feeds it — cheaper and better, not a rip-and-replace.",
      },
      {
        objection: "Is this really necessary?",
        reframe:
          "Your data doubles every couple of years and your bill tracks it, and your AI plans need governed data. The status quo is the expensive choice.",
      },
      {
        objection: "We could build this with open source.",
        reframe:
          "Some teams do — then they're babysitting pipelines instead of doing security. Free software isn't free at enterprise scale.",
      },
      {
        objection: "Another vendor wants me to consolidate onto their platform — why not go all-in?",
        reframe:
          "Fine to consolidate — if you control the data. Own the pipes and you can swap the platform anytime. Cribl wins as Switzerland.",
      },
    ],
    discovery: [
      {
        q: "Your data's doubling and your SIEM bill is tracking it — what's that trajectory doing to your budget, and what's it costing your team in plumbing time?",
        tag: "Pain · Metrics",
      },
      { q: "When's your next SIEM renewal — and what's the quote doing?", tag: "Compelling event" },
      {
        q: "Who signs off on a change to the security data stack, and who else weighs in?",
        tag: "Economic Buyer · Decision Process",
      },
      {
        q: "How are you thinking about feeding AI the right data without leaking the wrong data?",
        tag: "Pain · Why now",
      },
      {
        q: "If nothing changes before that renewal, what does it cost you over the next year?",
        tag: "Why change · cost of inaction",
      },
    ],
    disposition:
      "A professionally skeptical economic buyer who owns the security budget. You're under pressure on cost and on AI, but you've heard a hundred pitches — you won't move on features or on 'we're cheaper than Splunk.' A quantified, self-funding business case tied to your renewal or a board mandate, with real differentiation, earns the next step. Weak or generic selling does not.",
  },
  {
    id: "vp-infosec",
    name: "The VP of InfoSec",
    title: "VP of information security",
    cluster: "security",
    committeeRole: "Economic buyer · decision maker",
    blurb:
      "A close cousin of the CISO — often the one who runs the InfoSec security review that can stall a deal in paper process.",
    ready: false,
  },
  {
    id: "soc-analyst",
    name: "The SOC analyst",
    title: "SecOps / SOC analyst",
    cluster: "security",
    committeeRole: "Technical user · influencer",
    blurb:
      "Lives in the SIEM all day and feels the pain of dropped data and noisy alerts. An AI SOC agent is only as good as the telemetry feeding it.",
    ready: false,
  },

  // ── IT / Ops / Dev cluster ────────────────────────────────────────────────
  {
    id: "cio",
    name: "The CIO",
    title: "Chief information officer",
    cluster: "ops",
    committeeRole: "Economic buyer",
    blurb:
      "Owns the broader IT budget and platform strategy — cares about consolidation, cost takeout, and AI readiness across IT and security.",
    ready: false,
  },
  {
    id: "it-ops",
    name: "The IT ops leader",
    title: "VP / director of IT operations",
    cluster: "ops",
    committeeRole: "Decision maker",
    blurb:
      "Wants capacity back and fewer tools to babysit — toil and capacity are this seat's currency.",
    ready: false,
  },
  {
    id: "vp-devops",
    name: "The VP of DevOps",
    title: "VP of DevOps / platform engineering",
    cluster: "ops",
    committeeRole: "Decision maker",
    blurb:
      "Watches observability cost and developer velocity — tired of the monitoring bill and agent sprawl.",
    ready: false,
  },
  {
    id: "sre",
    name: "The SRE",
    title: "Observability / SRE engineer",
    cluster: "ops",
    committeeRole: "Technical user · champion",
    blurb:
      "Feels the plumbing pain daily and fears the one-way door of lock-in — often becomes your champion.",
    ready: false,
  },

  // ── Swing roles ───────────────────────────────────────────────────────────
  {
    id: "splunk-admin",
    name: "The Splunk admin",
    title: "Incumbent-tool admin",
    cluster: "swing",
    committeeRole: "Blocker or champion",
    blurb:
      "Owns the incumbent tool. Can block you (their job feels tied to Splunk) or quietly champion you (tired of dropping data to stay under license).",
    ready: false,
  },
  {
    id: "procurement",
    name: "Finance / procurement",
    title: "Procurement & finance",
    cluster: "swing",
    committeeRole: "Gatekeeper",
    blurb:
      "Never hears your pitch but can kill the deal — the paper process where deals stall for weeks: legal, procurement, vendor onboarding.",
    ready: false,
  },
];

export function getPersona(id: string): Persona | undefined {
  return PERSONAS.find((p) => p.id === id);
}

export function personasByCluster(c: PersonaCluster): Persona[] {
  return PERSONAS.filter((p) => p.cluster === c);
}

/** True if any study-card line is still an unsourced "[fill from your notes]" slot. */
export function personaHasGaps(p: Persona): boolean {
  const pts = [...(p.measuredOn ?? []), ...(p.pains ?? []), ...(p.whatLands ?? [])];
  return pts.some((x) => x.gap) || (p.objections ?? []).some((o) => o.gap);
}
