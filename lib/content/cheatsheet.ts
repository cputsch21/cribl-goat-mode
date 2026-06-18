// The Cheat Sheet — the whole course on one screen.
// Ten highest-leverage plays, each with the line to say and 1–2 paragraphs
// you can drill into. Every line traces back to a module's `sayThis`, so this
// is a distillation, not new canon. Read it in five minutes; walk in ready.

import type { Source } from "./types";

/** The one utterance to nail — what Cribl does, in 30 seconds. */
export const PITCH = {
  say: "Cribl is the control layer for all the machine data an enterprise generates. We collect it from anywhere, cut the junk, protect the sensitive parts, and deliver it wherever it's useful — security tools, monitoring tools, cheap storage, or the AI systems they're standing up. Customers get choice, flexibility, and control — and it usually pays for itself in savings.",
  tag: "Choice, flexibility, control — Patrick's three words. Land them every time.",
};

export interface CheatItem {
  id: string;
  /** The big thing, in a few words. */
  title: string;
  /** The line you can say out loud, verbatim. */
  say: string;
  /** 1–2 paragraphs of detail, revealed on tap. */
  detail: string[];
  source: Source;
}

/** The ten that win the room. Universal — true in all three calls. */
export const CHEAT_ITEMS: CheatItem[] = [
  {
    id: "gap",
    title: "Sell the gap, not the product",
    say: "I anchor every deal on the gap — where they are today and what it's costing them, where they could be and what it's worth — tied to their corporate objectives, with metrics we agree on up front.",
    detail: [
      "This is Force Management's Command of the Message, and Cribl runs it — Ami confirmed it. Current state → negative consequences → future state → positive business outcomes. Patrick quizzed you in that exact vocabulary on your first call; mirror it and you sound like you've already been to their bootcamp.",
      "People don't buy the future — they buy escape from the pain of today. Make them feel the cost of staying put first, then translate the future into the capabilities they'd need, and get them to agree those matter before you ever map Cribl to them.",
    ],
    source: "ami",
  },
  {
    id: "whynow",
    title: "Why do anything / why now / why Cribl",
    say: "A deal with no compelling event doesn't close — it just slips. So before I ever talk product, I make sure we've earned 'why do anything' and 'why now.'",
    detail: [
      "Three questions, in order, and most deals stall on the first two. Why do anything (is the pain worth real money and political capital?), why now (the renewal, breach, audit, AI mandate, or budget cycle that makes this quarter different?), why Cribl (over doing nothing, building it themselves, or the platform's bundled pipe). Reps lose by jumping straight to 'why Cribl' with a demo.",
      "No compelling 'why now' is the single most common reason a forecasted deal slips a quarter. It's the box you protect hardest.",
    ],
    source: "craft",
  },
  {
    id: "meddpicc",
    title: "MEDDPICC is a diagnostic, not a checklist",
    say: "I use MEDDPICC as a diagnostic — when a deal stalls, one of those boxes is empty, and which one tells me exactly what to go fix.",
    detail: [
      "The eight, cold: Metrics (a number they agreed to), Economic Buyer (you've actually been in the room), Decision Criteria (you helped write them), Decision Process (the steps and dates to a yes), Paper Process (legal/procurement/security — where quarters go to die), Identify Pain (the compelling event, owned, with a consequence), Champion (sells for you when you're not there — test them by handing over the business case), Competition (always including 'do nothing').",
      "Stalling after a strong POV almost always means no real Economic Buyer access or an unmapped Paper Process. Don't push harder — find the empty box and go work that one thing.",
    ],
    source: "ami",
  },
  {
    id: "command-sale",
    title: "Run the deal by dates — the mutual action plan",
    say: "I build a mutual action plan with the customer, backwards from go-live, every step owned and dated. If I can't name the steps to the PO, I don't forecast it.",
    detail: [
      "Command of the Message is what you say; Command of the Sale is how you run it. You're the general contractor — sequencing the customer, the SE, the partner, and procurement so the close date is real, not a hope.",
      "A customer who won't co-build the plan is telling you the 'why now' isn't real yet. And never give a concession without a trade — a discount buys a longer term or a faster signature, never just goodwill. Anchor on the value you already agreed to, not the price.",
    ],
    source: "craft",
  },
  {
    id: "pipeline",
    title: "Demand generator, not demand servicer",
    say: "Ten emails, ten calls, ten LinkedIn touches a day; two partner meetings a week; four field events a month — the floor, not the ceiling. Six years as a founder was 100% demand generation.",
    detail: [
      "Patrick's sharpest filter: sellers who only service demand someone else created flop at Cribl, because half the market doesn't know Cribl exists yet. Your founder years — no inbound, brutal close rates, constant fundraising rejection — are the proof you generate it. The cadence is just structure around grit you already have.",
      "The four-layer territory plan, weighted in order: live pipeline first, then a top-20 target list with real account plans and a named partner angle each, then your Philly network, then creative cold outreach. The personalized video is your signature — it's literally how you got Patrick to take your call.",
    ],
    source: "patrick",
  },
  {
    id: "channel",
    title: "Channel is ~95% — deal reg is sacred",
    say: "If a partner registered the deal, that's their deal — my job is to make them money on it, because that's what keeps the next ten referrals coming.",
    detail: [
      "Cribl is ~95% channel (Ami; Patrick rounds it to 100%), so partners aren't a lane in your plan — they're in every deal. They love Cribl because it's vendor-neutral: it makes everything else in their bag work better, nothing to rip out, services revenue attached. An AE who creates channel friction is dead on arrival.",
      "Bring partners in early, not at the end for paperwork. Know the cast and their lanes: SHI (volume giant), Optiv & GuidePoint (security), Ahead & Presidio (infrastructure), Carahsoft (government). Partners live in these accounts year-round — they're your informal power map.",
    ],
    source: "craft",
  },
  {
    id: "product",
    title: "The product in one motion — and the money story",
    say: "Collect with Edge, control with Stream, store it cheap in Lake, ask it anything with Search — and most customers fund the whole thing with the savings.",
    detail: [
      "Cribl sits between where data is born and everywhere it's used — a control layer, not a rip-and-replace. The money story is tiering: high-value data to the expensive SIEM for ~90 days, everything else to cheap storage the customer controls, all of it still searchable.",
      "Why it's worth real money: the big analysis tools bill on ingest. Cut 30–50% of what feeds them and the project pays for itself. Real proof: one customer cut 41% of daily endpoint data — 9.25TB down to 5TB — without losing anything they cared about.",
    ],
    source: "cribl.io",
  },
  {
    id: "competition",
    title: "Cribl is Switzerland — the enemy is the status quo",
    say: "Platformization is completely fine — if you control the data. Control the pipes and you can swap the platform whenever you want. Honestly, the biggest competitor is the status quo.",
    detail: [
      "Every mega-vendor is running the same play — Palo from the firewall, CrowdStrike from the endpoint, Datadog from metrics, Splunk from the SIEM — all selling 'consolidate onto us.' Cribl's counter-move: own the neutral data layer underneath, and every platform decision stays reversible.",
      "There's no single like-for-like rival. The real competition shows up three ways: the status quo (do nothing, keep overpaying), DIY open source (free software, expensive engineers), and the platforms' bundled pipelines — which exist to lock data in, where Cribl's gives choice. Never trash a vendor; they're partners, destinations, and rivals at once.",
    ],
    source: "patrick",
  },
  {
    id: "ai",
    title: "Why now at the top: AI readiness, governance, compliance",
    say: "Every CISO is asking the same two questions: how do we feed AI the right data, and how do we make sure it never leaks the wrong data. Cribl is the control point for both.",
    detail: [
      "Boards are pushing AI, and the new agentic security tools are hungry for exactly this telemetry. Feed them raw, ungoverned data and two things happen: compute bills blow up, and sensitive company data leaks into models. Cribl's public positioning leans straight in — 'The AI Platform for Telemetry.'",
      "Patrick's three-word umbrella for any senior conversation: AI readiness, AI governance, AI compliance. Use that trio with anyone senior and you're speaking their language. (Cribl Guard masks sensitive data before it ever leaves the network.)",
    ],
    source: "patrick",
  },
  {
    id: "honesty",
    title: "The honest-gap move — your brand",
    say: "I don't know that one yet — and I'd rather tell you that than guess. In a deal, that's exactly when I'd bring my SE in.",
    detail: [
      "Don't bluff, don't crumble — bridge. Name what you know, own what you don't, and show the system that's closing the gap. With an SE leader this IS the test: he's watched a hundred AEs bluff, and the one who doesn't is the one he fights to work with. One bluff erases every good answer before it.",
      "On 'how technical are you?': 'I sat between business and engineering for six years — I speak the language, I don't write the code, and I built a system to close this industry's gap fast.' Calibrated honesty survives every follow-up; inflating gets found out in minutes.",
    ],
    source: "craft",
  },
];

export interface CheatStat {
  text: string;
  /** Short attribution, shown muted. */
  src?: string;
}

/** Numbers to have cold — all approximate, said as last-known. */
export const CHEAT_STATS: CheatStat[] = [
  { text: "~95% of business runs through the channel", src: "Ami" },
  { text: "~$339M ARR (publicly “$300M+”), growing ~40% a year — say it as approximate", src: "Ami" },
  { text: "50% of the Fortune 100 are customers · ~1,500 customers · 4th-fastest software company to $100M", src: "Patrick / cribl.io" },
  { text: "41% EDR data cut — 9.25TB → 5TB a day · Nutanix halved its firewall logs", src: "cribl.io" },
  { text: "10x faster investigations (Search) · 80+ sources & destinations · up to 250,000 nodes (Edge)", src: "cribl.io" },
  { text: "SIEMs bill on ingest — that's the economic engine of the whole pitch" },
  { text: "FedRAMP Moderate AUTHORIZED — NOT IL5. State it exactly; faking a cert kills credibility." },
];

export interface CheatCall {
  id: "kat" | "cam" | "rep";
  name: string;
  role: string;
  /** The one thing they're really testing. */
  tests: string;
  /** Your single best line for this person. */
  say: string;
  /** The one trap to avoid. */
  trap: string;
  href: string;
  hrefLabel: string;
}

/** Quick hits — the three calls, one glance each. */
export const CHEAT_CALLS: CheatCall[] = [
  {
    id: "kat",
    name: "Kat — Channel",
    role: "Partner Business Manager",
    tests: "Will you feed partners, or just take from them?",
    say: "I called friends at the partners this weekend — want to hear how Cribl shows up from their side?",
    trap: "Don't flex your friend network as “I've got partners covered.” It's her turf — you bring doors, she calls the plays.",
    href: "/cram/kat",
    hrefLabel: "Kat cram sheet",
  },
  {
    id: "cam",
    name: "Cam — Sales Engineering",
    role: "SE Leader",
    tests: "Will your deals convert his SEs' scarce hours?",
    say: "I own the why, the who, the money, and the process. The SE owns the how and the proof. We share discovery.",
    trap: "Never bluff an acronym — one bluff erases every good answer. Use the honest-gap move instead.",
    href: "/cram/cam",
    hrefLabel: "Cam cram sheet",
  },
  {
    id: "rep",
    name: "Tim — The Peer",
    role: "Enterprise AE, Patrick's team",
    tests: "Would I want this guy next to me in the trenches?",
    say: "I ran the whole army for six years — now I want to be a sniper on a bigger one.",
    trap: "Be consistent with what you told Patrick — they compare notes. Curious about his world, dead consistent about yours.",
    href: "/module/m11",
    hrefLabel: "The Rep Call",
  },
];
