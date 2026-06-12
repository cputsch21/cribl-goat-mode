import type { CramSheet } from "./types";

export const CRAM_SHEETS: CramSheet[] = [
  {
    id: "kat",
    name: "Kat Hummel",
    role: "Partner Business Manager — Monday 3:30",
    intel: [
      "Owns Cribl's partner relationships in the region: partner-sourced pipeline, enablement, joint events. Measured on what partners bring in.",
      "Hired by Ami, who calls her 'very connected, very professional, very kind, very good human.' Expect warmth — match it, don't perform at it.",
      "Her real question: if I put this AE in front of my partners, does he make Cribl look good — and does he feed the partnership or just take from it?",
      "LinkedIn pass before the call: her path into channel, shared connections (especially at SHI/Ahead/Presidio), anything Philly. One genuine observation beats five flattering ones.",
    ],
    land: [
      "Open with the homework: 'I called friends at the partners this weekend — want to hear how Cribl shows up from their side?' Nobody else did that.",
      "Cribl is ~95% channel (Ami's number; Patrick says 100%) — so partners aren't a lane in your plan, they're in everything: a named partner play in every top-20 account.",
      "Patrick's cadence has 2 partner meetings a week built in — quote it; she likely knows his system.",
      "Your friendships at Ahead/SHI/Presidio/ModernOps: warm doors deployed under HER game plan. She calls the plays; your relationships add speed.",
      "Benefits translation: the broker WAS the channel for eight years — partner-wins-first is muscle memory; only the mechanics (deal reg, sourced vs. influenced, MDF) are new, and you've studied them.",
    ],
    stats: [
      "~95% of business through channel (Ami) — the number that explains this interview",
      "'Partner-first organization… the RIGHT partners, not EVERY partner' — cribl.io's own words",
      "The cast: SHI (volume giant), Optiv + GuidePoint (security specialists), Ahead + Presidio (infrastructure), Trace3, Carahsoft (gov channel — pairs with FedRAMP Moderate), GSIs Accenture/Deloitte, AWS/Microsoft marketplaces",
      "50% of the Fortune 100 run Cribl · $339M ARR, ~40% YoY (Ami) · 4th-fastest to $100M (Patrick)",
      "2 partner meetings/week · 4 field events/month — the partner share of Patrick's PG system",
    ],
    traps: [
      "Flexing the friend network as 'I've got partners covered' — it's HER turf; you bring doors, she calls plays.",
      "Any answer that smells like going around deal reg or running direct-first. At 95% channel there is no direct-first.",
      "Faking channel experience. The winning move is the honest translation: brokers-as-channel values, newly studied mechanics.",
    ],
    ask: [
      "Which partners actually drive pipeline in this region — versus just fulfill?",
      "What does your best AE relationship look like — what does that person do that the average AE doesn't?",
      "How do you and the AE typically split a top-20 account list?",
      "Where's partner-sourced pipeline strongest right now — security, observability, public sector?",
      "If I start in July: what one thing in my first 30 days would make your life easier? (Write the answer down.)",
    ],
  },
  {
    id: "cam",
    name: "Cam Borgl",
    role: "Sales Engineering Leader — Tuesday morning",
    intel: [
      "Leads SEs for the region — Patrick's coverage map: 2 in the Philly area, 1 in Pittsburgh, 3 in the DMV. His people are the scarcest resource in every deal.",
      "Ami on SEs: 'the technical gurus… they're salesy too' — and the AE-SE relationship is 'vital.'",
      "His real question: if my SE gives this guy's deals ten hours, do those hours convert? Will he qualify first, brief always, and never bluff?",
      "Expect at least one deliberate reach past your knowledge. That's the honesty test, not a knowledge test.",
    ],
    land: [
      "The 30-second pitch, cold, in business language — then the whiteboard picture in words: born → collected (Edge) → controlled (Stream) → tiered (SIEM ~90 days / Lake-S3 for the rest) → Search across it all, governed feeds to AI.",
      "The division of labor, one breath: 'I own the why, the who, the money, and the process. The SE owns the how and the proof. We share discovery.'",
      "The good-AE contract: every call gets a brief (who's in the room, what they care about, what we're driving to); every POV gets written success criteria + timebox + exec sponsor + champion; the SE always hears the outcome.",
      "The honest-gap move, delivered with comfort: 'I don't know that one yet — and I'd rather tell you that than guess. In a deal, that's when I'd bring my SE in.' Then ask what it means.",
      "Calibrated technical self-assessment: six years between business and engineering — speak the language, don't write the code, learning system already running (you're inside it).",
    ],
    stats: [
      "80+ sources and destinations (Stream) · up to 250,000 nodes from one console (Edge)",
      "10x faster investigations (Search) · 'storage that doesn't lock data in' (Lake)",
      "41% EDR data cut — 9.25TB → 5TB daily · Nutanix halved firewall log volume",
      "SIEMs bill on ingest — that's the economic engine of the whole story",
      "FedRAMP Moderate authorized; not IL5 yet — on-prem story is why pubsec grows",
    ],
    traps: [
      "Bluffing an acronym. One bluff erases every good answer before it — the honest-gap script exists, use it.",
      "Overpromising anything — features, dates, roadmap. 'That's product's call, in writing, with you in the loop.'",
      "Demo-monkey vibes: implying SEs exist to demo on demand. Their hours are earned by qualified deals.",
    ],
    ask: [
      "What separates your best AE partnership from the average one?",
      "Where do deals stall technically here — and what do you wish the AE had done two calls earlier?",
      "How does your team like to get briefed — what format actually gets read?",
      "What does a typical POV look like at Cribl — length, criteria, who drives?",
      "How do I make sure my deals deserve your team's hours from day one?",
    ],
  },
];
