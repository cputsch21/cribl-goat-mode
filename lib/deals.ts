"use client";

import { useSyncExternalStore } from "react";

/* ------------------------------------------------------------------ *
 *  DEAL COMMAND — data model + on-device store.
 *
 *  Ported from the deal-command.jsx prototype. MEDDPICC is the
 *  qualification / gap-detection layer; the Value Framework is the
 *  Command of the Message (Force Management) story that FEEDS it.
 *
 *  Persisted exactly like course progress: localStorage, no sign-in,
 *  reactive via a custom event + useSyncExternalStore.
 * ------------------------------------------------------------------ */

export const STAGES = [
  "Discover",
  "Validate",
  "Business Case",
  "Negotiate",
  "Closed",
] as const;
export const PRODUCTS = ["Stream", "Edge", "Search", "Lake"] as const;
export const STATUSES = ["Missing", "Weak", "Strong"] as const;
export const ROLES = [
  "Economic Buyer",
  "Champion",
  "Coach",
  "Technical Buyer",
  "Influencer",
  "Blocker",
] as const;
export const SENTIMENTS = ["Positive", "Neutral", "Negative"] as const;
export const MEETING_TYPES = [
  "Discovery",
  "Technical Validation",
  "Economic Buyer Meeting",
  "Business Case Review",
  "Negotiation",
  "Executive Briefing",
  "Follow-up",
] as const;
/** The Command of the Message arc a pitch deck follows. */
export const SLIDE_KINDS = [
  "title",
  "before",
  "whyChange",
  "capability",
  "after",
  "proof",
  "cta",
] as const;
export type SlideKind = (typeof SLIDE_KINDS)[number];

export type Stage = (typeof STAGES)[number];
export type Product = (typeof PRODUCTS)[number];
export type Status = (typeof STATUSES)[number];
export type Sentiment = (typeof SENTIMENTS)[number];

/* ── The methodology "spec" — copy is verbatim from the prototype ── */

export interface MeddField {
  key: string;
  label: string;
  type: "text" | "select";
  options?: string[];
}
export interface MeddElement {
  key: string;
  letter: string;
  name: string;
  prompt: string;
  fields: MeddField[];
}

export const MEDDPICC: MeddElement[] = [
  {
    key: "metrics",
    letter: "M",
    name: "Metrics",
    prompt:
      "What measurable business value will the customer get? Use THEIR numbers (% SIEM ingest reduced, $ saved, analyst hours back) — not your features.",
    fields: [{ key: "metric", label: "Headline metric / ROI", type: "text" }],
  },
  {
    key: "eb",
    letter: "E",
    name: "Economic Buyer",
    prompt:
      "Who controls the budget and can ultimately say yes? Do you have direct access, or are you stuck a layer down?",
    fields: [
      { key: "name", label: "Name / title", type: "text" },
      {
        key: "access",
        label: "Access",
        type: "select",
        options: [
          "No access",
          "Identified, no access",
          "Met once",
          "Actively engaged",
        ],
      },
    ],
  },
  {
    key: "dcriteria",
    letter: "D",
    name: "Decision Criteria",
    prompt:
      "What technical, business, and vendor criteria will they judge on? Are YOUR differentiators on the list, or a competitor's?",
    fields: [],
  },
  {
    key: "dprocess",
    letter: "D",
    name: "Decision Process",
    prompt:
      "What are the exact steps to a decision — POV, technical validation, business case, approvals — who owns each, and by when?",
    fields: [],
  },
  {
    key: "paper",
    letter: "P",
    name: "Paper Process",
    prompt:
      "What does procurement, legal, and security review require to get from 'yes' to signature? This is where deals slip — map it early.",
    fields: [],
  },
  {
    key: "pain",
    letter: "I",
    name: "Identify Pain",
    prompt:
      "What's the compelling business pain — AND the compelling event that forces action by a date (renewal, audit, migration, budget cycle)?",
    fields: [{ key: "event", label: "Compelling event", type: "text" }],
  },
  {
    key: "champion",
    letter: "C",
    name: "Champion",
    prompt:
      "Who sells for you when you're not in the room, has real influence, and a personal win? Have they PROVEN it with an action?",
    fields: [
      { key: "name", label: "Name / title", type: "text" },
      {
        key: "validated",
        label: "Status",
        type: "select",
        options: [
          "Suspected",
          "Coach (info only)",
          "Champion (has taken action)",
        ],
      },
    ],
  },
  {
    key: "competition",
    letter: "C",
    name: "Competition",
    prompt:
      "Who/what are you up against — including 'do nothing' and 'build it ourselves'? What's your real position?",
    fields: [
      { key: "primary", label: "Primary alternative", type: "text" },
      {
        key: "position",
        label: "Our position",
        type: "select",
        options: ["Behind", "Even", "Ahead", "Sole option"],
      },
    ],
  },
];

export interface ValueField {
  key: string;
  label: string;
  help: string;
}
export const VALUE_FIELDS: ValueField[] = [
  {
    key: "pbo",
    label: "Positive Business Outcomes",
    help: "The strategic results the buyer's business is chasing — cost, risk, speed, growth.",
  },
  {
    key: "capabilities",
    label: "Required Capabilities",
    help: "Frame as 'the ability to ___' — what they must be able to DO to hit those outcomes.",
  },
  {
    key: "before",
    label: "Before",
    help: "How it works today and what the status quo is costing them.",
  },
  {
    key: "after",
    label: "After",
    help: "The future state with Cribl and the improved outcome.",
  },
  {
    key: "metrics",
    label: "Metrics",
    help: "Quantify the gap between Before and After.",
  },
  {
    key: "differentiators",
    label: "Differentiators (Why Us)",
    help: "Proof Cribl delivers the required capability in a way alternatives can't.",
  },
  {
    key: "whyChange",
    label: "Why Change",
    help: "Cost of inaction — why standing still is the riskiest option.",
  },
  {
    key: "whyNow",
    label: "Why Now",
    help: "What makes this urgent — tie it to the compelling event.",
  },
  {
    key: "whyYou",
    label: "Why Cribl",
    help: "Your unique, defensible value versus every alternative.",
  },
];

/* ── Per-deal shape ── */

export interface MeddState {
  status: Status;
  notes: string;
  fields: Record<string, string>;
}
export interface Stakeholder {
  id: string;
  name: string;
  title: string;
  role: string;
  sentiment: Sentiment;
}
export interface Action {
  id: string;
  text: string;
  owner: string;
  due: string;
  done: boolean;
}
/** The structured meeting-prep doc Claude returns, saved per meeting. */
export interface PrepDoc {
  objective: string;
  successOutcome: string;
  agenda: string[];
  proofPoints: string[];
  gaps: { gap: string; questions: string[] }[];
  objections: { objection: string; response: string }[];
  valueFraming: { before: string; capability: string; after: string };
}
/** A pitch-deck slide and the deck Claude returns, saved per meeting. */
export interface Slide {
  heading: string;
  bullets: string[];
  speakerNotes: string;
  /** which beat of the Command of the Message arc (see SLIDE_KINDS) */
  kind: string;
}
export interface Deck {
  title: string;
  subtitle: string;
  slides: Slide[];
}
export interface Meeting {
  id: string;
  type: string;
  date: string;
  objective: string;
  /** ids into the deal's stakeholders */
  attendeeIds: string[];
  attendeesNote: string;
  /** what's known / unknown going in */
  context: string;
  prep: PrepDoc | null;
  prepAt: number | null;
  deck: Deck | null;
  deckAt: number | null;
  createdAt: number;
  updatedAt: number;
}
export interface Deal {
  id: string;
  account: string;
  oppName: string;
  products: Product[];
  arr: string;
  closeDate: string;
  stage: Stage;
  result: string;
  meddpicc: Record<string, MeddState>;
  value: Record<string, string>;
  stakeholders: Stakeholder[];
  actions: Action[];
  meetings: Meeting[];
  createdAt: number;
  updatedAt: number;
}
export interface DealsState {
  deals: Record<string, Deal>;
  order: string[];
}

/* ----------------------------- helpers ----------------------------- */

export const uid = (p: string) =>
  p + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

export function freshMeddpicc(): Record<string, MeddState> {
  const o: Record<string, MeddState> = {};
  MEDDPICC.forEach((el) => (o[el.key] = { status: "Missing", notes: "", fields: {} }));
  return o;
}
export function freshValue(): Record<string, string> {
  const o: Record<string, string> = {};
  VALUE_FIELDS.forEach((f) => (o[f.key] = ""));
  return o;
}
export function newDeal(): Deal {
  const now = Date.now();
  return {
    id: uid("d_"),
    account: "",
    oppName: "New opportunity",
    products: [],
    arr: "",
    closeDate: "",
    stage: "Discover",
    result: "",
    meddpicc: freshMeddpicc(),
    value: freshValue(),
    stakeholders: [],
    actions: [],
    meetings: [],
    createdAt: now,
    updatedAt: now,
  };
}

/** 0–100 MEDDPICC health: average of the eight elements' Missing/Weak/Strong. */
export function healthScore(deal: Deal): number {
  const sum = MEDDPICC.reduce(
    (a, el) => a + STATUSES.indexOf(deal.meddpicc[el.key]?.status ?? "Missing"),
    0
  );
  return Math.round((sum / (MEDDPICC.length * 2)) * 100);
}

export interface Move {
  p: 1 | 2 | 3;
  t: string;
}

/** The guidance engine: reads deal state, returns prioritized next moves.
    p:1 = Now, p:2 = Next, p:3 = Later. Ported rule-for-rule. */
export function guidance(deal: Deal): Move[] {
  const g: Move[] = [];
  const m = deal.meddpicc;
  const stageIdx = STAGES.indexOf(deal.stage);
  const st = (k: string) => m[k]?.status ?? "Missing";
  const fld = (k: string, fk: string) => m[k]?.fields?.[fk] ?? "";

  if (st("pain") !== "Strong")
    g.push({
      p: 1,
      t: "Sharpen the pain: name the business problem AND the compelling event that forces a decision by a date.",
    });

  const access = fld("eb", "access");
  if (
    st("eb") === "Missing" ||
    access === "No access" ||
    access === "Identified, no access" ||
    access === ""
  )
    g.push({
      p: 1,
      t: "Get to the Economic Buyer — confirm who signs, what they care about, and earn direct access.",
    });

  if (st("metrics") !== "Strong" || !deal.value.metrics)
    g.push({
      p: 1,
      t: "Quantify value in the customer's own numbers — this feeds MEDDPICC Metrics AND your business case.",
    });

  if (fld("champion", "validated") !== "Champion (has taken action)")
    g.push({
      p: 2,
      t: "Develop and TEST your Champion — have they taken a concrete action for you (intro to EB, shared intel, sold internally)?",
    });

  if (stageIdx >= 1 && st("dprocess") !== "Strong")
    g.push({
      p: 2,
      t: "Map the decision process: every step, owner, and date from here to signature.",
    });

  if (stageIdx >= 2 && st("paper") !== "Strong")
    g.push({
      p: 1,
      t: "Map the paper process NOW — security review, legal, procurement — or your close date will slip.",
    });

  if (st("dcriteria") !== "Strong")
    g.push({
      p: 3,
      t: "Document the decision criteria and get YOUR differentiators written into them.",
    });

  if (!fld("competition", "primary"))
    g.push({
      p: 3,
      t: "Name the competition — including 'do nothing' and 'build it' — and set your traps.",
    });

  const vFilled = VALUE_FIELDS.filter((x) => deal.value[x.key]).length;
  if (vFilled < VALUE_FIELDS.length)
    g.push({
      p: 2,
      t: `Complete the Value Framework (${vFilled}/${VALUE_FIELDS.length}) — Before → Required Capability → After, anchored to a differentiator.`,
    });

  const positives = deal.stakeholders.filter((s) => s.sentiment === "Positive").length;
  if (deal.stakeholders.length <= 1 || positives === 0)
    g.push({
      p: 2,
      t: "Multi-thread: build more than one relationship so the deal doesn't hinge on a single contact.",
    });

  return g.sort((a, b) => a.p - b.p).slice(0, 6);
}

/* ------------------------------ store ------------------------------ *
 *  Same shape as lib/progress.ts: a cached localStorage read, a write
 *  that fires a custom event, and a useSyncExternalStore subscription.
 * ------------------------------------------------------------------ */

const KEY = "deal-command-v1";
const EVT = "deal-command-change";
const DEFAULT: DealsState = { deals: {}, order: [] };

let cacheRaw: string | null = null;
let cacheParsed: DealsState = DEFAULT;

function read(): DealsState {
  if (typeof window === "undefined") return DEFAULT;
  const raw = window.localStorage.getItem(KEY);
  if (raw === cacheRaw) return cacheParsed;
  cacheRaw = raw;
  try {
    cacheParsed = raw ? normalize(JSON.parse(raw) as DealsState) : DEFAULT;
  } catch {
    cacheParsed = DEFAULT;
  }
  return cacheParsed;
}

/** Back-fill fields added in later phases so older saved deals stay valid. */
function normalize(s: DealsState): DealsState {
  if (!s?.deals) return DEFAULT;
  for (const id in s.deals) {
    if (!Array.isArray(s.deals[id].meetings)) s.deals[id].meetings = [];
  }
  return s;
}

function write(next: DealsState) {
  cacheRaw = JSON.stringify(next);
  cacheParsed = next;
  window.localStorage.setItem(KEY, cacheRaw);
  window.dispatchEvent(new Event(EVT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function useDeals(): DealsState {
  return useSyncExternalStore(subscribe, read, () => DEFAULT);
}

export function useDeal(id: string | undefined): Deal | null {
  const s = useDeals();
  return id ? s.deals[id] ?? null : null;
}

/** False during SSR + first client render, true after hydration. Lets a page
    gate localStorage-only UI without a set-state-in-effect. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function createDeal(): string {
  const d = newDeal();
  const s = read();
  write({ deals: { ...s.deals, [d.id]: d }, order: [d.id, ...s.order] });
  return d.id;
}

export function patchDeal(id: string, patch: Partial<Deal>) {
  const s = read();
  const cur = s.deals[id];
  if (!cur) return;
  write({
    ...s,
    deals: { ...s.deals, [id]: { ...cur, ...patch, updatedAt: Date.now() } },
  });
}

/* ── Meetings (per deal) ── */

export function freshMeeting(): Meeting {
  const now = Date.now();
  return {
    id: uid("m_"),
    type: "Discovery",
    date: "",
    objective: "",
    attendeeIds: [],
    attendeesNote: "",
    context: "",
    prep: null,
    prepAt: null,
    deck: null,
    deckAt: null,
    createdAt: now,
    updatedAt: now,
  };
}

export function addMeeting(dealId: string): string {
  const m = freshMeeting();
  const d = read().deals[dealId];
  if (d) patchDeal(dealId, { meetings: [m, ...(d.meetings ?? [])] });
  return m.id;
}

export function patchMeeting(
  dealId: string,
  meetingId: string,
  patch: Partial<Meeting>
) {
  const d = read().deals[dealId];
  if (!d) return;
  patchDeal(dealId, {
    meetings: (d.meetings ?? []).map((m) =>
      m.id === meetingId ? { ...m, ...patch, updatedAt: Date.now() } : m
    ),
  });
}

export function deleteMeeting(dealId: string, meetingId: string) {
  const d = read().deals[dealId];
  if (!d) return;
  patchDeal(dealId, {
    meetings: (d.meetings ?? []).filter((m) => m.id !== meetingId),
  });
}

/* ── Delete with undo (the safety net — no hard-delete-without-recourse) ── */

let pendingUndo: { deal: Deal; index: number } | null = null;
const undoSubs = new Set<() => void>();
function notifyUndo() {
  undoSubs.forEach((c) => c());
}

export function deleteDeal(id: string) {
  const s = read();
  const index = s.order.indexOf(id);
  const deal = s.deals[id];
  const deals = { ...s.deals };
  delete deals[id];
  write({ deals, order: s.order.filter((x) => x !== id) });
  if (deal) {
    pendingUndo = { deal, index: index < 0 ? 0 : index };
    notifyUndo();
  }
}

export function undoDelete() {
  if (!pendingUndo) return;
  const { deal, index } = pendingUndo;
  const s = read();
  const order = s.order.filter((x) => x !== deal.id);
  order.splice(Math.min(index, order.length), 0, deal.id);
  write({ deals: { ...s.deals, [deal.id]: deal }, order });
  pendingUndo = null;
  notifyUndo();
}

export function clearUndo() {
  if (!pendingUndo) return;
  pendingUndo = null;
  notifyUndo();
}

export function usePendingUndo(): { deal: Deal; index: number } | null {
  return useSyncExternalStore(
    (cb) => {
      undoSubs.add(cb);
      return () => undoSubs.delete(cb);
    },
    () => pendingUndo,
    () => null
  );
}

/* ── First-run seed: one fully worked example deal you can study or delete ── */

export function ensureSeeded() {
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem(KEY) !== null) return;
  const seed = exampleDeal();
  write({ deals: { [seed.id]: seed }, order: [seed.id] });
}

function exampleDeal(): Deal {
  const now = Date.now();
  return {
    id: "d_example_northwind",
    account: "Northwind Bank",
    oppName: "Splunk ingest offload — Stream + Lake",
    products: ["Stream", "Lake"],
    arr: "$420K",
    closeDate: "2026-09-30",
    stage: "Validate",
    result: "",
    meddpicc: {
      metrics: {
        status: "Strong",
        notes:
          "Modeled off a 30-day ingest sample Marcus pulled. Still need Dana (CISO) to put her name on the $ figure.",
        fields: {
          metric: "Cut Splunk ingest ~45% (≈$1.1M/yr) + reclaim ~30 analyst hrs/wk",
        },
      },
      eb: {
        status: "Weak",
        notes:
          "Marcus reports to her and she owns the Splunk budget line. Haven't met her — need a working session before the business case.",
        fields: { name: "Dana Reyes, CISO", access: "Identified, no access" },
      },
      dcriteria: {
        status: "Weak",
        notes:
          "Must reduce ingest cost without losing detections, route to the existing SIEM unchanged, and meet PCI retention. Our 'no re-tooling the SOC' angle isn't written into their criteria yet.",
        fields: {},
      },
      dprocess: {
        status: "Weak",
        notes:
          "POV → security review → business case to Dana → procurement. Owners and dates past the POV aren't confirmed.",
        fields: {},
      },
      paper: {
        status: "Missing",
        notes:
          "Haven't mapped security review or procurement. It's a bank — expect a vendor security assessment and legal redlines. Map this now.",
        fields: {},
      },
      pain: {
        status: "Strong",
        notes:
          "Ingest growth is blowing past their license tier; the renewal forces a decision in Q4.",
        fields: { event: "Splunk renewal 11/30 — vendor quoted ~30% uplift" },
      },
      champion: {
        status: "Weak",
        notes:
          "Gives great intel and wants this, but hasn't sold it upward or introduced Dana yet — not a proven champion until he takes an action.",
        fields: {
          name: "Marcus Lin, Dir. Security Engineering",
          validated: "Coach (info only)",
        },
      },
      competition: {
        status: "Weak",
        notes:
          "Platform team floated building it on Kafka. Need to set the build-vs-buy trap and quantify the DIY maintenance cost.",
        fields: {
          primary: "Status quo (renew Splunk) + DIY Kafka pipeline",
          position: "Even",
        },
      },
    },
    value: {
      pbo: "Take cost out of the SIEM program without weakening detections, and stop ingest growth from dictating the security budget.",
      capabilities:
        "The ability to filter, reduce, and route security data in-flight — and retain full-fidelity data cheaply for compliance — without re-tooling the SOC.",
      before:
        "Everything is shipped straight into Splunk. Ingest is up ~40% YoY, the license tier is maxed, and the team drops data sources to stay under budget — creating blind spots.",
      after:
        "Cribl Stream trims and routes the noise before Splunk; full-fidelity data lands in Cribl Lake for cheap long-term retention. Splunk holds only what needs to be searched hot.",
      metrics:
        "~45% less Splunk ingest (≈$1.1M/yr), no dropped sources, and PCI retention met in low-cost storage instead of premium SIEM.",
      differentiators:
        "Vendor-neutral pipeline — works with the Splunk and tools they already run, no agent rip-and-replace, routes to multiple destinations, and the data stays in their control.",
      whyChange:
        "Standing still means a ~30% renewal uplift and more blind spots as they keep dropping sources to fit budget.",
      whyNow:
        "The 11/30 Splunk renewal is the forcing function — decide before they re-sign at the higher tier.",
      whyYou:
        "Cribl sits in front of the SIEM they already run, so they cut cost without betting the SOC on a brand-new platform — something neither 'renew as-is' nor a DIY Kafka build delivers.",
    },
    stakeholders: [
      { id: "s_ex1", name: "Dana Reyes", title: "CISO", role: "Economic Buyer", sentiment: "Neutral" },
      { id: "s_ex2", name: "Marcus Lin", title: "Dir. Security Engineering", role: "Champion", sentiment: "Positive" },
      { id: "s_ex3", name: "Priya Shah", title: "SOC Manager", role: "Technical Buyer", sentiment: "Positive" },
      { id: "s_ex4", name: "Tom Becker", title: "Platform Eng Lead", role: "Blocker", sentiment: "Negative" },
    ],
    actions: [
      { id: "a_ex1", text: "Run the 30-day ingest analysis with Marcus to lock the savings number", owner: "Marcus / me", due: "2026-07-10", done: true },
      { id: "a_ex2", text: "Get Marcus to introduce Dana (EB) for a working session", owner: "Marcus", due: "2026-07-24", done: false },
      { id: "a_ex3", text: "Scope the POV success criteria with Priya (SOC)", owner: "me", due: "2026-07-31", done: false },
      { id: "a_ex4", text: "Map the security review + procurement steps (paper process)", owner: "me", due: "2026-08-07", done: false },
      { id: "a_ex5", text: "Build the business-case deck for Dana", owner: "me", due: "2026-08-21", done: false },
    ],
    meetings: [
      {
        id: "m_ex1",
        type: "Economic Buyer Meeting",
        date: "2026-07-24",
        objective:
          "Earn Dana's sponsorship: get her to validate the savings number and agree to a business-case review.",
        attendeeIds: ["s_ex1", "s_ex2"],
        attendeesNote: "",
        context:
          "First time meeting Dana (CISO); Marcus is setting it up. She owns the Splunk budget and the 11/30 renewal. Unknown: her appetite for change vs. just re-signing.",
        prep: null,
        prepAt: null,
        deck: null,
        deckAt: null,
        createdAt: now,
        updatedAt: now,
      },
    ],
    createdAt: now,
    updatedAt: now,
  };
}
