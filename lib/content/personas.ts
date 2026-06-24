// The Buyer Persona Dojo's content layer.
//
// One dossier per seat on a Cribl buying committee. Each is authored from
// vetted material already in this app (the course + the Coach knowledge pack,
// source-tagged patrick / ami / cribl.io / chris / craft).
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
    ready: true,
    whereTheySit:
      "Signs off like an economic buyer, but their fingerprints are on the paper process — they (or their team) run the InfoSec security review that's the long pole to signature. Win them on the business case like a CISO, and map their review early so a verbal yes becomes a PO.",
    measuredOn: [
      { text: "Choice, flexibility & control over the data strategy" },
      { text: "Audit readiness & compliance posture" },
      { text: "Cost of the security stack — the SIEM bill they own" },
      { text: "Getting vendors through security review without adding risk" },
      { text: "[A board-level / VP-specific security KPI they report up]", gap: true },
    ],
    pains: [
      { text: "An indefensible, rising SIEM bill — security data doubles ~every 18 months and the license tracks it." },
      { text: "Coverage gaps when the team drops data just to stay under license." },
      { text: "Feeding AI the right data without leaking PII into models." },
      { text: "New vendors piling onto a security-review queue where deals quietly stall." },
    ],
    whatLands: [
      { text: "Tiering: high-value data to the SIEM (~90 days), everything else to cheap storage they control — funded by the savings." },
      { text: "Vendor-neutral control layer: keep Splunk / CrowdStrike — cheaper and better, not a rip-and-replace." },
      { text: "The control point for AI: governed data in, PII / PCI masked before it leaves the network." },
      { text: "Required capabilities that survive a review: vendor-neutral, hybrid / on-prem, search-in-place." },
      { text: "An easier security review: SOC 2 Type II, ISO 27001, FedRAMP Moderate authorized (state exactly — not IL5)." },
    ],
    objections: [
      { objection: "We already have Splunk.", reframe: "Keep it. Cribl controls what feeds it — cheaper and better, not a rip-and-replace." },
      { objection: "Adding a vendor in the data path is new attack surface.", reframe: "Cribl is the control point that reduces exposure — it masks PII / PCI before data leaves your network, and holds SOC 2 Type II, ISO 27001, FedRAMP Moderate." },
      { objection: "Is this really necessary?", reframe: "Your data doubles every couple of years and your bill tracks it; your AI plans need governed data. The status quo is the expensive choice." },
      { objection: "Why not consolidate onto one platform?", reframe: "Fine to consolidate — if you control the data. Own the pipes and you can swap platforms anytime. Cribl wins as Switzerland." },
    ],
    discovery: [
      { q: "When a new tool comes in, what does your security review require, who runs it, and how long does it take?", tag: "Paper Process" },
      { q: "Your data's doubling and your SIEM bill is tracking it — what's that doing to your budget and your team's plumbing time?", tag: "Pain · Metrics" },
      { q: "When's your next SIEM renewal — and what's the quote doing?", tag: "Compelling event" },
      { q: "How are you feeding AI the right data without leaking the wrong data?", tag: "Pain · Why now" },
      { q: "Who signs off on a change to the security data stack, and who else weighs in?", tag: "Economic Buyer · Decision Process" },
    ],
    disposition:
      "A professionally skeptical economic buyer who owns both the security budget and the security review. You won't move on features or on 'we're cheaper than Splunk.' Two things move you: a quantified, self-funding business case tied to your renewal or a board mandate, and credible answers on risk and compliance — masking sensitive data before it leaves, plus SOC 2 / ISO 27001 / FedRAMP Moderate (and you'll catch anyone who fakes a cert). You probe the paper process hard, because the security review is yours. Weak or generic selling does not move you.",
  },
  {
    id: "soc-analyst",
    name: "The SOC analyst",
    title: "SecOps / SOC analyst",
    cluster: "security",
    committeeRole: "Technical user · influencer",
    blurb:
      "Lives in the SIEM all day and feels the pain of dropped data and noisy alerts. An AI SOC agent is only as good as the telemetry feeding it.",
    ready: true,
    whereTheySit:
      "A technical user and influencer, not the budget — they own the decision criteria and feel the product's value daily, which makes them a champion to arm, not the buyer to close. Win them, then route them to the economic buyer.",
    measuredOn: [
      { text: "Catching real attacks — and not missing them in the noise" },
      { text: "Investigation speed (the 10x-faster-investigations story)" },
      { text: "Full coverage — no dropped sources creating blind spots" },
      { text: "Getting agentic SOC / AI tools to actually work on their data" },
      { text: "[An analyst-side metric — alert volume or MTTR — from your notes]", gap: true },
    ],
    pains: [
      { text: "Alert noise from a firehose of low-value data — most firewall logs are never queried by a human, they just sit in the SIEM at premium prices." },
      { text: "Dropped data sources — the team drops feeds to stay under license, creating blind spots." },
      { text: "Investigations that stall for hours waiting on rehydration." },
      { text: "AI SOC agents making garbage decisions because the telemetry feeding them isn't governed." },
    ],
    whatLands: [
      { text: "Cut the junk upstream so the SIEM holds signal, not noise — every junk event you drop is money back." },
      { text: "Stop dropping sources: tier hard because replay exists — 90 days hot, archive the rest, pull back what the incident needs." },
      { text: "Search-in-place = 10x faster investigations: no rehydration, no waiting, no double-paying." },
      { text: "Governed, masked, relevant telemetry is what makes their agentic-SOC pilots actually work." },
      { text: "One control plane instead of fifty scripts — fewer 2am pages." },
    ],
    objections: [
      { objection: "If you filter upstream, won't I lose data I need for an investigation?", reframe: "Archive boldly to the lake — replay pulls it back when an investigation needs it. Tier hard because replay exists." },
      { objection: "We'd just build this with open source.", reframe: "Some teams do — then they're babysitting pipelines instead of doing security. Free software isn't free at enterprise scale." },
      { objection: "Pulling old data back takes days anyway.", reframe: "That's rehydration — the tax Search kills. Query the archive in place instead of hauling it back into the SIEM." },
    ],
    discovery: [
      { q: "How much of what hits your SIEM does a human ever query — and how much is just noise at premium prices?", tag: "Pain · Metrics" },
      { q: "Are you dropping any sources today to stay under license? Where does that leave you blind?", tag: "Identify Pain" },
      { q: "When an investigation needs archived data, what's the wait — and what does that do to response time?", tag: "Pain · Metrics" },
      { q: "Are you piloting any agentic SOC / AI tools — and what's blocking them?", tag: "Why now" },
      { q: "Walk me through your alert load on a bad day — what's the noise costing the team?", tag: "Identify Pain" },
    ],
    disposition:
      "A hands-on technical user who lives in the SIEM all day — skeptical of slideware, allergic to anything that smells like losing data or detection fidelity. They light up at relief from daily pain: less alert noise, no dropping sources, investigations that don't stall on rehydration, AI tools that finally have governed data. They don't control budget and won't pretend to — their value is as a champion you arm and route to the economic buyer. What moves them is a credible 'here's how your 2am gets better' plus the replay safety net; what doesn't is exec cost talk or being treated as the decision-maker.",
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
    ready: true,
    whereTheySit:
      "Economic buyer on the IT side — owns the broader IT budget and platform strategy, the IT counterpart to the CISO. Your champion has to sell them internally, so arm the champion with a quantified case that ladders up to their published objectives: cost takeout, consolidation, AI readiness.",
    measuredOn: [
      { text: "Consolidation and cost takeout across the IT estate" },
      { text: "AI readiness across IT and security" },
      { text: "Total cost of the data and tooling stack" },
      { text: "Fewer vendors / one throat to choke — the platformization pull" },
      { text: "[The board-level IT / transformation KPI they report up]", gap: true },
    ],
    pains: [
      { text: "The platformization trap: every mega-vendor pushes 'consolidate onto us' — and consolidating hands that vendor lock-in leverage." },
      { text: "Data and the bill doubling every couple of years while budgets don't." },
      { text: "AI initiatives stalling on ungoverned data — and the risk of sensitive data leaking into models." },
      { text: "[A real CIO pain in their own words — from your notes]", gap: true },
    ],
    whatLands: [
      { text: "Vendor-neutral control layer = platformization made safe: control the pipes and any platform bet is reversible." },
      { text: "The project funds itself: cut 30–50% of what feeds the expensive tools — cost takeout without a rip-and-replace." },
      { text: "The control point for AI across IT and security: governed, masked, relevant telemetry in." },
      { text: "Required capabilities that hold up in a bake-off: vendor-neutral, hybrid / on-prem, search-in-place." },
      { text: "The consolidation Cribl does endorse: one agent instead of five, collect once and search anywhere." },
    ],
    objections: [
      { objection: "Another vendor wants me to consolidate everything onto their platform — why not go all-in?", reframe: "Fine to consolidate — if you control the data. Own the pipes and you can swap the platform anytime. Cribl wins as Switzerland." },
      { objection: "Is this really necessary?", reframe: "Your data doubles every couple of years and your bill tracks it; your AI plans need governed data. The status quo is the expensive choice." },
      { objection: "We already have Splunk / Datadog / CrowdStrike.", reframe: "Keep them. Cribl controls what feeds them — cheaper and better, not a rip-and-replace." },
      { objection: "We could build this with open source.", reframe: "Some teams do — then they've hired a team to babysit pipelines instead of doing the mission. Free isn't free at enterprise scale." },
    ],
    discovery: [
      { q: "Every platform vendor is pitching you consolidation — how are you thinking about that bet, and what would lock-in cost you?", tag: "Competition · Why change" },
      { q: "Your data's doubling and the bills are tracking it — what's that doing to the IT budget?", tag: "Pain · Metrics" },
      { q: "Where are your AI initiatives today, and how do you get them the right data without leaking the wrong data?", tag: "Pain · Why now" },
      { q: "Who else weighs in on a platform-level data decision, and who signs?", tag: "Economic Buyer · Decision Process" },
      { q: "If nothing changes before your next renewal or budget cycle, what does it cost you over the next year?", tag: "Why change · cost of inaction" },
    ],
    disposition:
      "A professionally skeptical economic buyer who owns IT budget and platform strategy — he's heard 'consolidate onto us' from every mega-vendor and is genuinely tempted by fewer vendors and one throat to choke. He won't move on features or 'we're cheaper.' What earns the next step: reframing platformization as safe only if he controls the neutral data layer, a self-funding case tied to cost takeout or an AI mandate he already owns, and the three differentiators that hold up. Never trash the platforms — they're partners, destinations, and rivals at once.",
  },
  {
    id: "it-ops",
    name: "The IT ops leader",
    title: "VP / director of IT operations",
    cluster: "ops",
    committeeRole: "Decision maker",
    blurb:
      "Wants capacity back and fewer tools to babysit — toil and capacity are this seat's currency.",
    ready: true,
    whereTheySit:
      "Decision maker, not the economic buyer — a VP / director of IT ops whose currency is toil and capacity. Sell capacity back: fewer tools to babysit, the team off plumbing duty. Their yes shapes decision criteria; route the money to the CIO above them.",
    measuredOn: [
      { text: "Capacity — the team's ability to say yes to new requests" },
      { text: "Toil reduction — fewer tools and agents to babysit" },
      { text: "Uptime / system health" },
      { text: "Tool and agent sprawl across the estate" },
      { text: "[The ops SLA / availability target they report on]", gap: true },
    ],
    pains: [
      { text: "The team is a plumbing crew, not an ops team — engineers babysitting fifty feeds and parsing every new source." },
      { text: "Agent sprawl: five agents per server, each with its own upgrade cycle." },
      { text: "Onboarding a new data source takes weeks of engineering toil." },
      { text: "[A real IT-ops pain in their own words — from your notes]", gap: true },
    ],
    whatLands: [
      { text: "Edge kills agent sprawl: one vendor-neutral agent replaces the zoo, fleet-managed up to 250,000 nodes from one console." },
      { text: "Capacity back: the team stops plumbing and can say yes again — new sources in hours, migrations without fear." },
      { text: "Stream removes the toil: reduce / shape / enrich / mask in flight so engineers stop hand-parsing every source." },
      { text: "The SRE play: keep high-value data hot, tier the rest, speed MTTI / MTTR." },
      { text: "One control plane instead of fifty scripts." },
    ],
    objections: [
      { objection: "We'd just build this ourselves with open source.", reframe: "Some teams do — then they're staffing engineers to babysit pipelines instead of running ops. Free isn't free at scale." },
      { objection: "Adding Cribl is one more tool for my team to babysit.", reframe: "It's the opposite — one neutral agent replaces five, one control plane replaces fifty scripts. Net fewer things to babysit." },
      { objection: "We already have Datadog / Splunk for this.", reframe: "Keep them. Cribl controls and reduces what feeds them — cheaper and better, not a rip-and-replace." },
    ],
    discovery: [
      { q: "How many collection agents run on a typical server today, and what does upgrade season cost your team?", tag: "Pain · Metrics" },
      { q: "How much of your team's week goes to plumbing — onboarding, parsing, babysitting — versus actual ops?", tag: "Identify Pain" },
      { q: "When a new source comes in, how long until it's usable, and who does that work?", tag: "Pain · Metrics" },
      { q: "What are you saying no to right now because the team's at capacity?", tag: "Pain · Why now" },
      { q: "Who owns the budget for a change like this, and who else has to be on board?", tag: "Economic Buyer · Decision Process" },
    ],
    disposition:
      "A pragmatic decision maker who lives in toil and capacity, not budget. He's skeptical of 'one more tool to babysit' and of vendor promises that add work. What moves him: concrete relief from plumbing — one agent instead of five, one control plane instead of fifty scripts, new sources in hours not weeks, his team finally able to say yes again. What doesn't: cost-savings pitches aimed over his head (that's the CIO's language) or compliance framing (that's the CISO's). Win him on capacity, then he helps shape decision criteria and points you to the economic buyer.",
  },
  {
    id: "vp-devops",
    name: "The VP of DevOps",
    title: "VP of DevOps / platform engineering",
    cluster: "ops",
    committeeRole: "Decision maker",
    blurb:
      "Watches observability cost and developer velocity — tired of the monitoring bill and agent sprawl.",
    ready: true,
    whereTheySit:
      "Decision maker who owns observability cost and developer velocity — the monitoring bill and agent sprawl are this seat's pressure points. Work them on the bill plus getting the team out of plumbing; budget sign-off lives with the CIO above.",
    measuredOn: [
      { text: "The observability / monitoring bill — Datadog-style ingest cost" },
      { text: "Developer velocity" },
      { text: "Capacity — the team off plumbing, able to take on more" },
      { text: "Agent sprawl across the fleet" },
      { text: "[The DevOps metric they report — deploy frequency or MTTR target]", gap: true },
    ],
    pains: [
      { text: "The monitoring bill: observability tools bill on ingest, and the cost climbs as telemetry doubles." },
      { text: "Security and observability buying the same data twice — duplicated telemetry spend across two stacks." },
      { text: "Agent sprawl on every host, each agent with its own upgrade cycle." },
      { text: "The team stuck as a plumbing crew instead of shipping — a drag on velocity." },
    ],
    whatLands: [
      { text: "Cut the monitoring bill like the SIEM bill: reduce 30–50% before it lands; logs→metrics and dynamic sampling for chatty sources." },
      { text: "One shared telemetry layer for security AND observability — stop buying the same data twice." },
      { text: "Edge kills agent sprawl: one vendor-neutral agent, fleet-managed up to 250,000 nodes." },
      { text: "Capacity back = velocity: the team stops plumbing and says yes to more (the Hughes story — capacity, not cost)." },
      { text: "Works with OpenTelemetry — same vendor-neutral philosophy, no re-tooling." },
    ],
    objections: [
      { objection: "Datadog / our platform already does our pipeline.", reframe: "Keep Datadog — Cribl controls what feeds it so you stop overfeeding it. Their bundled pipeline locks data in; ours gives you choice." },
      { objection: "We'd build it ourselves with OTel collectors.", reframe: "Some teams do — then they're babysitting pipelines instead of shipping. Free isn't free at scale, and it has no governance or roadmap." },
      { objection: "Is this really necessary?", reframe: "Your telemetry doubles every couple of years and the monitoring bill tracks it. Standing still is the expensive choice." },
      { objection: "Won't another layer in the pipeline add latency and slow us down?", reframe: "[Your disarm on added latency — from your notes / the SE handoff]", gap: true },
    ],
    discovery: [
      { q: "What's your monitoring / observability spend doing year over year as telemetry grows?", tag: "Pain · Metrics" },
      { q: "Are security and observability ingesting the same data into separate tools — and paying twice?", tag: "Pain · Why change" },
      { q: "How many agents are on each host, and what's that costing in upgrades and overhead?", tag: "Pain · Metrics" },
      { q: "How much of your engineers' time goes to pipeline plumbing versus shipping features?", tag: "Identify Pain · Why now" },
      { q: "Who owns the observability budget, and who signs off on a pipeline change?", tag: "Economic Buyer · Decision Process" },
    ],
    disposition:
      "A decision maker focused on the monitoring bill and developer velocity, fluent in the observability world (Datadog, metrics, OTel). He's wary of anything that adds a layer or slows the team. What moves him: a credible path to cut the observability bill the way Cribl cuts the SIEM bill (reduce before ingest, logs→metrics, kill duplicate spend), killing agent sprawl, and giving the team capacity back. What doesn't: pure security / compliance framing (that's the CISO) or hand-wavy savings with no number. Never trash Datadog — Cribl wins as Switzerland and feeds it daily.",
  },
  {
    id: "sre",
    name: "The SRE",
    title: "Observability / SRE engineer",
    cluster: "ops",
    committeeRole: "Technical user · champion",
    blurb:
      "Feels the plumbing pain daily and fears the one-way door of lock-in — often becomes your champion.",
    ready: true,
    whereTheySit:
      "A technical user who feels the plumbing pain daily and fears the one-way door of lock-in — the seat Cribl most often turns into a champion. Win them on relief from toil and on reversibility, then arm them with the business case for the economic buyer.",
    measuredOn: [
      { text: "MTTI / MTTR — investigation and incident-response speed" },
      { text: "Reliability / uptime" },
      { text: "Toil — the plumbing and 2am pages they personally eat" },
      { text: "Reversibility — avoiding one-way doors / lock-in" },
      { text: "[The on-call / reliability metric they're graded on]", gap: true },
    ],
    pains: [
      { text: "Living the plumbing pain daily: five agents per box, fifty scripts to maintain, junk flooding the SIEM." },
      { text: "Investigations stall because pulling archived data back (rehydration) takes hours or days." },
      { text: "Getting paged at 2am and replaying archives by hand to get what the incident needs." },
      { text: "The fear of a one-way door — locked into a tool or format with no exit." },
    ],
    whatLands: [
      { text: "Search-in-place kills rehydration: query data where it lives, no hauling it back — 10x faster investigations." },
      { text: "Replay as the safety net: archive boldly, then pull back exactly what the incident needs — tier hard because replay exists." },
      { text: "One control plane instead of fifty scripts, one agent instead of five — fewer 2am pages." },
      { text: "No lock-in: vendor-neutral, open formats, easy in / easy out — the reversibility this seat fears losing." },
      { text: "Junk dropped before it hits SIEM ingest, sensitive fields masked in flight." },
    ],
    objections: [
      { objection: "We'd just build this ourselves — we know open source.", reframe: "Respect — open source can move data. But then you've built a second job babysitting pipelines instead of doing reliability work, with no governance, support, or roadmap." },
      { objection: "Isn't this just another agent / layer for me to maintain?", reframe: "The opposite — one neutral agent replaces five, one control plane replaces fifty scripts. Less to maintain, fewer 2am pages." },
      { objection: "If I archive aggressively, I'll lose data mid-incident.", reframe: "That's what Replay is for: tier hard, then pull back exactly what the investigation needs — and Search queries the archive in place without rehydrating." },
      { objection: "Won't I get locked into Cribl's format — another one-way door?", reframe: "Open formats, easy in, easy out — vendor-neutral by design. Cribl is the exit ramp, not the next lock-in." },
    ],
    discovery: [
      { q: "How many collection agents and custom scripts are you personally maintaining right now?", tag: "Identify Pain · Metrics" },
      { q: "When an investigation needs archived data, how long to get it back into a searchable tool?", tag: "Pain · Metrics" },
      { q: "What did your last bad 2am page look like — how much was plumbing versus the actual incident?", tag: "Identify Pain · Why now" },
      { q: "Where are you most worried about getting locked into a tool or format you can't get out of?", tag: "Decision Criteria · Why change" },
      { q: "If we killed the plumbing pain and sped up investigations, who above you owns the budget to make it happen?", tag: "Champion → Economic Buyer" },
    ],
    disposition:
      "A hands-on engineer who feels the plumbing pain every day and is instinctively wary of one-way doors. He's technical and will respect you only if you're honest at the edge of your knowledge — never bluff an acronym; if you don't know, say so and name the SE handoff. What moves him: tangible relief from his actual life — one agent instead of five, one control plane instead of fifty scripts, faster investigations with no rehydration, replay as a safety net, fewer 2am pages — and a credible no-lock-in story. What doesn't: exec buzzwords, savings math he doesn't own, or any claim that open source 'can't' do something (he'll know it's false). Win him and he becomes the champion.",
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
    ready: true,
    whereTheySit:
      "A swing seat: can block you (their job feels tied to Splunk) or quietly champion you (tired of dropping data to stay under license). Lead with the disarming truth — nobody wants to rip out the SIEM, they want to stop overfeeding it. Make Splunk better and cheaper for them, not a thing you're taking away.",
    measuredOn: [
      { text: "Keeping Splunk healthy and under its license tier" },
      { text: "Onboarding new sources without weeks of parsing toil" },
      { text: "Retention / compliance met without premium SIEM prices for cold data" },
      { text: "Not dropping sources the SOC needs" },
    ],
    pains: [
      { text: "Ingest growth blowing past the license tier — the renewal forces a decision." },
      { text: "Dropping data sources to stay under budget, and owning the blind spots that creates." },
      { text: "Every new source meaning weeks of parsing and normalizing — that's the toil." },
      { text: "[What they personally fear about a change like this — from your notes]", gap: true },
    ],
    whatLands: [
      { text: "Nobody wants to rip out the SIEM — they want to stop overfeeding it. Splunk stays; Cribl controls what feeds it." },
      { text: "Tiering keeps Splunk for what deserves SIEM prices — high-value ~90 days hot, the rest cheap but still searchable." },
      { text: "Stop dropping sources — archive boldly because replay pulls back what an incident needs." },
      { text: "Stream removes the parsing / normalizing toil on every new source." },
      { text: "Proof for the incumbent path: run old + new SIEM in parallel to de-risk the cutover; one $900K/yr Splunk license cut to $200K." },
    ],
    objections: [
      { objection: "You're trying to replace Splunk / replace my job.", reframe: "Nobody wants to rip out the SIEM — they want to stop overfeeding it. Cribl makes Splunk cheaper and better; you still own it." },
      { objection: "If I send less to Splunk I'll lose data I might need.", reframe: "Archive boldly to the lake — replay pulls it back when an investigation needs it. 90 days hot, archive the rest." },
      { objection: "Splunk's own pipeline can handle this.", reframe: "Their pipeline exists to lock data in; Cribl's exists to give you choice — route anywhere and swap platforms without re-plumbing." },
    ],
    discovery: [
      { q: "How close is your ingest to the license tier right now — and what's the renewal quote look like?", tag: "Identify Pain · Compelling event" },
      { q: "Are you dropping any sources today to stay under budget? Which ones, and who feels it?", tag: "Pain · Metrics" },
      { q: "How long does onboarding a new source take you — the parsing and normalizing?", tag: "Pain (toil)" },
      { q: "When you need archived data back, what's the restore like today?", tag: "Pain (rehydration)" },
      { q: "If Splunk stayed exactly where it is but got cheaper and stopped dropping sources, what's that worth to you?", tag: "Future state · Champion test" },
    ],
    disposition:
      "A swing seat whose identity is wrapped up in the incumbent tool — they'll block on instinct if they hear 'replace Splunk,' and warm up fast if they hear 'keep Splunk, stop overfeeding it.' They're privately tired of dropping sources to stay under license and of the parsing toil on every new feed. What flips them from blocker to champion: framing Cribl as making Splunk cheaper and better (not a rip-and-replace), the replay safety net so they never lose data, and removing the parse / normalize grind. What hardens them into a blocker: any whiff of rip-and-replace, trash-talking Splunk, or implying their job goes away.",
  },
  {
    id: "procurement",
    name: "Finance / procurement",
    title: "Procurement & finance",
    cluster: "swing",
    committeeRole: "Gatekeeper",
    blurb:
      "Never hears your pitch but can kill the deal — the paper process where deals stall for weeks: legal, procurement, vendor onboarding.",
    ready: true,
    whereTheySit:
      "The gatekeeper who never hears the pitch but can kill the deal — they own the paper process: legal, procurement, vendor onboarding, where deals stall for weeks. You don't sell them; you map them early and arm your champion to clear them.",
    measuredOn: [
      { text: "Cost / spend control — contract size and the savings case" },
      { text: "A clean paper process: legal, procurement, vendor onboarding done right" },
      { text: "Getting from verbal yes to signature on time, no surprises" },
      { text: "Whether spend can run through existing committed cloud spend" },
      { text: "[A finance-owned KPI — target savings % or procurement-cycle SLA]", gap: true },
    ],
    pains: [
      { text: "Deals that sit unmapped and stall — a technically-approved deal can sit in legal for weeks because nobody mapped it." },
      { text: "A rising, indefensible tooling bill they're asked to keep approving while budgets don't grow." },
      { text: "New-vendor onboarding friction — security assessments and legal redlines, especially in regulated shops." },
    ],
    whatLands: [
      { text: "It's a cost-takeout story, not new spend — most customers fund Cribl with the savings." },
      { text: "A hard, defensible number: 41% of daily endpoint data cut (9.25TB→5TB); one Splunk license $900K→$200K/yr." },
      { text: "Easier procurement via the cloud marketplace — committed AWS spend turns procurement from months into weeks." },
      { text: "Lower onboarding risk: SOC 2 Type II, ISO 27001, FedRAMP Moderate authorized (state exactly — not IL5)." },
      { text: "No rip-and-replace means no parallel migration cost or stranded spend." },
    ],
    objections: [
      { objection: "This is another line item / new spend we have to justify.", reframe: "It's a cost-takeout, not a cost — most customers fund it with the savings, and we agree the number up front." },
      { objection: "Procurement and vendor onboarding here take months.", reframe: "If you have committed AWS or Microsoft spend, we can transact through the marketplace — months become weeks." },
      { objection: "We need security review and legal redlines before any new vendor.", reframe: "Expected — Cribl is built for it: SOC 2 Type II, ISO 27001, FedRAMP Moderate, and it masks sensitive data before it leaves your network." },
    ],
    discovery: [
      { q: "What does the path from a verbal yes to a signature look like — legal, procurement, security, onboarding — and how long does each step take?", tag: "Paper Process" },
      { q: "Who reviews a new vendor, and what's stalled deals at that step before?", tag: "Paper Process" },
      { q: "Do you have committed AWS or Microsoft spend we could transact against?", tag: "Decision Process · Paper Process" },
      { q: "Who owns the budget line this comes out of, and what number makes it an easy yes for finance?", tag: "Economic Buyer · Metrics" },
      { q: "Working back from when you need this live, when do legal and procurement have to start?", tag: "Decision Process" },
    ],
    disposition:
      "A gatekeeper who never sits through the value pitch and doesn't care about features — they care about cost, contract terms, and a clean, on-time paper process. You rarely win them in a room; you win by mapping their process early and handing your champion a business case in numbers finance can defend. What moves the deal through them: a quantified cost-takeout (savings, not new spend), a marketplace path that compresses procurement, and clean compliance that de-risks onboarding. What stalls them: an unmapped process, a fuzzy number, and surprise legal or security review. In a role-play they push on price, terms, timelines, and onboarding — not on the product.",
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
