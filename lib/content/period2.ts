import type { CourseModule } from "./types";

// ─────────────────────────────────────────────────────────────
// ACT 2 — KNOW THE PRODUCT
// The sidebar, but still deep. Enough product to talk value, carry
// an honest technical conversation, and be credible in the room —
// without pretending to be the SE. Two modules, consolidated from
// the old four.
// ─────────────────────────────────────────────────────────────

export const M7: CourseModule = {
  id: "m7",
  period: 2,
  number: 7,
  title: "What Cribl Sells & Why It Matters",
  tagline: "The problem, the platform, and the honest fluency to talk it",
  minutes: 16,
  cards: [
    {
      id: "m7c1",
      title: "The problem, in one breath",
      paragraphs: [
        "Every big company's machines — servers, laptops, firewalls, cloud apps — constantly produce records of what's happening. That's telemetry: logs, metrics, events. Security teams need it to catch attacks. IT teams need it to keep systems up.",
        "Here's the squeeze: the amount of this data roughly doubles every couple of years, every tool wants its own copy in its own format, and the big analysis tools charge by how much you feed them. So costs explode, engineers drown in plumbing work, and most of what gets stored in the expensive tools is junk that never gets looked at.",
      ],
      sayThis:
        "Enterprises don't have a data shortage — they have a data control problem. The bills grow faster than the budgets, and every tool wants the same data in a different shape.",
      source: "craft",
    },
    {
      id: "m7c2",
      title: "What Cribl does — and your 30-second version",
      paragraphs: [
        "Cribl sits in the middle — between where data is born (the sources) and where it gets used (the destinations: Splunk, Datadog, Elastic, cheap cloud storage, AI systems). Collect it once, then shape it in flight: drop the junk, mask the sensitive parts, add useful context, convert the format. Then route it wherever it's useful. It connects to 80+ sources and destinations, which is why nobody has to rip anything out to adopt it.",
        "Memorize the 30-second version until it's boring — both Kat and Cam will, in some form, check whether you can say what Cribl does. The three words to always land are Patrick's: choice, flexibility, and control.",
      ],
      sayThis:
        "Cribl is the control layer for all the machine data an enterprise generates. We collect it from anywhere, cut the junk, protect the sensitive parts, and deliver it wherever it's useful — security tools, monitoring tools, cheap storage, or the AI systems they're standing up. Customers get choice, flexibility, and control — and it usually pays for itself in savings.",
      source: "chris",
    },
    {
      id: "m7c3",
      title: "The four products, one motion",
      paragraphs: [
        "Stream — the engine: collect from anywhere, transform in flight (reduce junk, shape per destination, enrich, mask, replay), route anywhere. Petabyte scale. It's where the cost savings and control live. Edge — one vendor-neutral agent that replaces the zoo of per-vendor collectors; fleet-manage up to 250,000 nodes from one console.",
        "Search — ask questions of data where it already lives (S3, the lake, the edge) without 'rehydrating' it back into an expensive tool first; Cribl claims 10x faster investigations. Lake — low-cost, open-format storage with no lock-in ('easy in, easy out'). The suite in one breath: collect with Edge, control with Stream, store cheap in Lake, ask anything with Search.",
      ],
      sayThis:
        "Four products, one motion: collect it with Edge, control it with Stream, store it cheap in Lake, and ask it anything with Search.",
      source: "cribl.io",
    },
    {
      id: "m7c4",
      title: "The money story: tiering",
      paragraphs: [
        "Patrick's value story is about putting data in homes that match its value. High-value security data goes to the expensive analysis tool (the SIEM) and lives there ~90 days. After that it rolls off to cheap storage the customer controls — still there for audits and investigations. The medium- and low-value data skips the expensive tools entirely.",
        "That's why this isn't a hard budget conversation: customers usually fund Cribl with what it saves them on licenses and storage. Real example from Cribl's site: one customer cut 41% of daily endpoint-security data — from 9.25TB to 5TB — without losing anything they cared about.",
      ],
      sayThis:
        "Send your highest-value data to the expensive tools, route everything else to storage you control — most customers fund the project with the savings.",
      source: "patrick",
    },
    {
      id: "m7c5",
      title: "Why now: the AI pressure",
      paragraphs: [
        "Every board is pushing AI initiatives, and the new AI agents — for security operations, incident response, reliability — are hungry for exactly this telemetry. Feed them raw, ungoverned data and two things happen: compute bills blow up, and sensitive company data can leak into models.",
        "Patrick frames the executive conversation as three words: AI readiness, AI governance, AI compliance. Cribl's public positioning leans straight in: 'The AI Platform for Telemetry,' serving data to both humans and AI agents. The pipes you control become the safety layer for the AI era. (Cribl Guard masks sensitive data before it leaves the network; AI Copilot helps build pipelines.)",
      ],
      sayThis:
        "Everyone's racing to put AI agents on their security and ops data. Cribl is how you feed those agents the right data — governed, masked, and affordable — instead of a firehose of risk.",
      source: "patrick",
    },
    {
      id: "m7c6",
      title: "Where it runs — and the government nuance",
      paragraphs: [
        "Cribl runs as SaaS (Cribl.Cloud), on-prem, or hybrid — workers live wherever the data lives, which also avoids surprise cloud egress bills. Patrick thinks the hybrid flexibility is a real moat: SaaS-only rivals like Datadog physically can't serve the most locked-down environments.",
        "Public sector: Cribl is FedRAMP Moderate authorized (cleared for government cloud use). It is NOT yet IL5 — the higher bar where agencies run a sealed copy in classified environments — but having a true on-prem offering means that path exists at all. Get this nuance exactly right; faking certs is a credibility killer.",
      ],
      sayThis:
        "Cloud, on-prem, or hybrid — Cribl goes where the data lives. That flexibility is why the government business is growing and why SaaS-only competitors can't follow. On certs I'm precise: FedRAMP Moderate authorized, not yet IL5.",
      source: "patrick",
    },
    {
      id: "m7c7",
      title: "The data path — your whiteboard picture",
      paragraphs: [
        "Hold this picture and you can navigate almost any technical exchange: data is born on machines, an agent collects it (Edge), it flows through the pipeline (Stream) where it's cleaned, shaped, masked, enriched, then lands in tiers — the SIEM for security alerting, observability tools for uptime, cheap object storage (S3, Lake) for the rest. Search asks questions anywhere along the path without moving the data; Replay pulls archived data back into a tool when needed.",
        "The terms that will come up, fast: telemetry (machine data — logs/metrics/traces), SIEM ('sim' — the security team's alerting hub, bills on ingest), SOC (the security team), observability (the IT-health side), ingest (data entering a tool — what the expensive tools bill on), agent, S3 (cheap object storage, also the standard interface), EDR (endpoint detection — CrowdStrike), replay. The full deck lives in Flashcards.",
      ],
      sayThis:
        "Born on machines, collected by one agent, shaped in the pipeline, landed in the right tier — SIEM, observability, or cheap storage — with search across all of it. The SIEM bills on ingest, which is why controlling what you send it is worth real money.",
      source: "patrick",
    },
    {
      id: "m7c8",
      title: "The honest-gap move",
      paragraphs: [
        "At some point an interviewer or a customer will reach the edge of your knowledge — maybe on purpose. The move: don't bluff, don't crumble, bridge. Name what you know, own what you don't, and show the system that closes the gap. This is your brand — you've told everyone you can't bullshit — and it's exactly what an SE leader wants to hear an AE say.",
        "The recovery script: 'Honest answer — I don't know that one yet. A few weeks ago I couldn't have told you what a SIEM was; here's what I've done since' — and your learning system IS the answer — 'and in a live deal, that's a question I'd bring my SE in on rather than guess.'",
      ],
      sayThis:
        "I don't know that one yet — and I'd rather tell you that than guess. Here's how I've been closing the gap, and in a deal that's the moment I'd bring my SE in.",
      source: "craft",
    },
  ],
  quiz: [
    {
      id: "m7q1",
      prompt: "Where does Cribl sit in a customer's world?",
      options: [
        { text: "It replaces the SIEM as the main security analysis tool" },
        {
          text: "Between data sources and destinations — a control layer in the middle",
          correct: true,
        },
        { text: "On the endpoint, as an antivirus-style agent only" },
      ],
      explain:
        "Cribl is the layer between where data is born and everywhere it needs to go. It doesn't replace Splunk or Datadog — it controls and optimizes what feeds them. 'We're not a rip-and-replace' disarms most early objections.",
    },
    {
      id: "m7q2",
      prompt: "A non-technical exec asks 'so what does Cribl do?' Strongest answer:",
      options: [
        { text: "We're a telemetry pipeline with 80+ integrations supporting schema-on-need transformations" },
        {
          text: "We put you back in control of your machine data — collect it once, clean it, protect it, send each tool only what it needs. It usually pays for itself in savings.",
          correct: true,
        },
        { text: "We're like Splunk, but cheaper" },
      ],
      explain:
        "Lead with control and outcomes, not features. The first answer is jargon soup; the third positions Cribl as a SIEM competitor (it isn't) and 'cheaper X' is a race to the bottom.",
    },
    {
      id: "m7q3",
      prompt: "Match the problem to the product: 'We run five collection agents on every server and upgrades are a nightmare.'",
      options: [
        { text: "Cribl Search" },
        { text: "Cribl Edge", correct: true },
        { text: "Cribl Lake" },
      ],
      explain:
        "Agent sprawl is Edge's problem to kill: one vendor-neutral agent, fleet-managed — up to 250,000 nodes from a single console.",
    },
    {
      id: "m7q4",
      prompt: "'Our investigations stall because pulling archived data back into the SIEM takes days.'",
      options: [
        { text: "Cribl Search — query the data where it sits, no rehydration", correct: true },
        { text: "Cribl Edge — collect less data in the first place" },
        { text: "Buy more SIEM capacity" },
      ],
      explain:
        "Search-in-place is the differentiator: ask questions of data in S3, the lake, or at the edge without moving it. That's the '10x faster investigations' claim on cribl.io.",
    },
    {
      id: "m7q5",
      prompt: "In Patrick's tiering story, what happens to the highest-value data?",
      options: [
        {
          text: "It goes to the SIEM for ~90 days, then rolls off to low-cost storage the customer controls",
          correct: true,
        },
        { text: "It's deleted after being analyzed once" },
        { text: "It all stays in the SIEM forever, just compressed" },
      ],
      explain:
        "High-value data earns the expensive home — ~90 days in the SIEM — then moves to cheap storage (S3 or Lake) where it's still searchable. Everything lower-value skips the expensive tools entirely.",
    },
    {
      id: "m7q6",
      prompt: "Cribl's government certification status (per Patrick):",
      options: [
        { text: "FedRAMP Moderate authorized; not yet IL5", correct: true },
        { text: "IL5 authorized; FedRAMP pending" },
        { text: "No government authorizations yet" },
      ],
      explain:
        "FedRAMP Moderate = authorized for government cloud. IL5 — sealed copies in classified environments — isn't there yet, but the on-prem product makes that path possible. Faking certs is a credibility killer.",
    },
    {
      id: "m7q7",
      prompt: "Why does 'ingest' matter so much in pricing conversations?",
      options: [
        {
          text: "The big analysis tools bill by data volume entering them — control ingest and you control the bill",
          correct: true,
        },
        { text: "Ingest speed determines alert accuracy" },
        { text: "Regulators cap ingest for compliance reasons" },
      ],
      explain:
        "Ingest-based billing is the economic engine of the category — and of Cribl's value prop: cut 30–50% of what enters the expensive tools and the project funds itself.",
    },
    {
      id: "m7q8",
      prompt: "Cam drops an acronym you've never heard. Best move:",
      options: [
        { text: "Nod and steer the conversation somewhere safer" },
        {
          text: "'I don't know that one yet — rather tell you that than guess. In a deal, that's exactly when I'd pull in my SE.' Then ask what it means.",
          correct: true,
        },
        { text: "Take your best guess from context — showing reasoning beats admitting ignorance" },
      ],
      explain:
        "The honest-gap move IS the test. An SE leader has watched a hundred AEs bluff; the one who says 'I don't know, here's my system, and that's when I'd bring you in' is the one he fights to work with.",
    },
  ],
  writeIn: [
    {
      id: "m7w1",
      prompt:
        "A non-technical exec asks, \"So what does Cribl actually do?\" Give your 30-second version.",
      keyPoints: [
        "Cribl is the control layer for an enterprise's machine data / telemetry",
        "Collect it once from anywhere",
        "Cut the junk, protect/mask the sensitive parts",
        "Deliver each tool only what it needs — security tools, monitoring, cheap storage, or AI systems",
        "Customers get choice, flexibility, and control — and it usually pays for itself in savings",
      ],
      model:
        "Cribl is the control layer for all the machine data an enterprise generates. We collect it from anywhere, cut the junk, protect the sensitive parts, and deliver it wherever it's useful — security tools, monitoring tools, cheap storage, or the AI systems they're standing up. Customers get choice, flexibility, and control — and it usually pays for itself in savings.",
    },
    {
      id: "m7w2",
      prompt:
        "Name Cribl's four products and the one problem each one kills — the way you'd say it on a call.",
      keyPoints: [
        "Stream — the engine: collect, transform in flight (reduce/shape/enrich/mask/replay), route anywhere; where the savings and control live",
        "Edge — one vendor-neutral agent that kills agent sprawl; fleet-manage up to 250,000 nodes from one console",
        "Lake — low-cost, open-format storage with no lock-in ('easy in, easy out')",
        "Search — search-in-place / federated; query data where it lives for 10x faster investigations",
        "The motion: collect (Edge) → control (Stream) → store (Lake) → ask (Search)",
      ],
      model:
        "Four products, one motion. Stream is the engine — data in from anywhere, transformed in flight, out to anywhere; that's where the savings and control live. Edge is one neutral agent that replaces the zoo of vendor agents — you manage up to 250,000 machines from one screen. Lake is cheap, open-format storage that doesn't lock your data in. And Search lets you ask questions of data where it already sits — 10x faster investigations. Collect with Edge, control with Stream, store cheap in Lake, ask anything with Search.",
    },
    {
      id: "m7w3",
      prompt:
        "Draw the data path in words — your whiteboard picture, left to right — and use 'ingest' naturally.",
      keyPoints: [
        "Data is born on machines — servers, laptops, firewalls, cloud services",
        "One agent collects it at the source (Edge)",
        "It flows through the pipeline (Stream) where it's cleaned, shaped, masked, enriched",
        "It lands in tiers: the SIEM for security alerting, observability tools for uptime, cheap object storage (S3 / Lake) for the rest",
        "Search asks questions anywhere without moving data; Replay pulls archived data back",
        "The SIEM bills on ingest — controlling what you send it is worth real money",
      ],
      model:
        "Picture it left to right. Data's born on machines — servers, laptops, firewalls, cloud apps. One agent collects it at the source. It flows through the pipeline, where it gets cleaned, shaped, masked, and enriched in flight. Then it lands in the tier it deserves: the SIEM for security alerting, observability tools for uptime, and cheap object storage like S3 or Cribl Lake for the rest. Search can ask questions anywhere along that path without moving the data, and Replay pulls old data back when an investigation needs it. And the reason it all matters: the SIEM bills on ingest, so controlling what you send it is worth real money.",
    },
    {
      id: "m7w4",
      prompt:
        "An interviewer reaches the edge of your technical knowledge. What do you actually do — and why is that the right move?",
      keyPoints: [
        "Don't bluff and don't crumble — bridge",
        "Name what you know, own what you don't: 'I don't know that one yet — rather tell you that than guess'",
        "Point to the system that's closing the gap (this learning machine, the partner calls)",
        "'In a live deal, that's exactly when I'd bring my SE in'",
        "Then ask what it means — curiosity, not weakness",
      ],
      model:
        "Honest answer — I don't know that one yet, and I'd rather tell you that than guess. A few weeks ago I couldn't have told you what a SIEM was; here's the system I built to close that gap fast. And in a live deal, that's exactly the kind of question I'd bring my SE in on rather than wing it. Then I'd ask you what it means — I want to learn it. With an SE leader, that honesty is the whole point: they've watched a hundred AEs bluff, and the one who doesn't is the one they fight to work with.",
    },
  ],
};

export const M8: CourseModule = {
  id: "m8",
  period: 2,
  number: 8,
  title: "The Battlefield & The Receipts",
  tagline: "Why the neutral data layer wins — and the numbers that prove it",
  minutes: 14,
  cards: [
    {
      id: "m8c1",
      title: "The platformization war",
      paragraphs: [
        "Every mega-vendor is running the same play: 'consolidate onto our platform.' Palo Alto comes at the customer from the firewall. CrowdStrike from the endpoint. Datadog from monitoring. Splunk/Cisco from the SIEM. Each tells the CISO: stop buying best-of-breed point tools, our platform is good enough at everything.",
        "And execs are listening — fewer vendors, fewer contracts, one throat to choke. This is the single most important market dynamic to understand before your calls.",
      ],
      sayThis:
        "Palo's coming from the firewall, CrowdStrike from the endpoint, Datadog from metrics — everyone's selling platformization. The fight is over who controls the data underneath.",
      source: "patrick",
    },
    {
      id: "m8c2",
      title: "Cribl's counter-move",
      paragraphs: [
        "The data layer is the neutral ground under all those platforms. If the customer controls their own data pipes, platformization stops being a trap: pick any platform today, swap it tomorrow, run two during a migration. The platforms' leverage — 'all your data is in us, good luck leaving' — evaporates.",
        "This is why Cribl describes itself as vendor-neutral everywhere. The customer's data strategy becomes the strategic asset, not any one vendor's platform.",
      ],
      sayThis:
        "It's completely fine to lean into platformization — if you control the data. Control the pipes and you can swap the platform whenever you want. That's Cribl.",
      source: "patrick",
    },
    {
      id: "m8c3",
      title: "So who's the competition?",
      paragraphs: [
        "There's no single like-for-like competitor — you said this to Patrick and he confirmed it ('we're winning way more than our unfair share'). The real competition shows up three ways: the status quo (do nothing, keep overpaying), build-it-yourself with open-source pipelines (free software, expensive engineers), and the platforms' own bundled pipeline features — which exist to keep data flowing INTO their platform, not to give the customer choice.",
        "Posture matters: never trash-talk. Cribl wins as Switzerland. The platforms are simultaneously partners, destinations, and rivals — that's normal here (Palo Alto is literally a named Cribl partner).",
      ],
      sayThis:
        "Honestly, the biggest competitor is the status quo. Second is 'our platform vendor throws in a basic pipeline' — but their pipeline exists to lock data in, and ours exists to give you choice.",
      source: "chris",
    },
    {
      id: "m8c4",
      title: "The AI conversation at the top",
      paragraphs: [
        "Where CISO conversations are right now: everyone's experimenting with AI, and even the experiments blow out compute budgets and create governance headaches — agent systems with brittle connections, no oversight, sensitive data wandering into models.",
        "The umbrella Patrick named: AI readiness, AI governance, AI compliance. The new agentic security tools (an 'AI SOC analyst,' an AI incident responder) only work if fed accurate, relevant, governed data. Useful parallel for execs: Databricks and Snowflake play this 'controlled data layer' game for general business data; Cribl is that layer for telemetry.",
      ],
      sayThis:
        "Every CISO is asking the same two questions: how do we feed AI the right data, and how do we make sure it never leaks the wrong data. Cribl is the control point for both.",
      source: "patrick",
    },
    {
      id: "m8c5",
      title: "Objections clinic",
      paragraphs: [
        "'We already have Splunk/Datadog.' → Great — keep them. Cribl makes them cheaper and better by controlling what feeds them. Not a rip-and-replace.",
        "'Is this really necessary?' → Your data doubles every couple of years, your license bill tracks it, and your AI initiatives need governed data. The status quo is the expensive choice. 'We could build this with open source.' → Some teams do — then they discover they've hired a team to babysit pipelines instead of doing security. Free software isn't free at enterprise scale, and it doesn't come with governance, support, or a roadmap.",
      ],
      sayThis:
        "You don't have to change anything you love — Cribl makes the tools you already have cheaper and better, and gives you an exit ramp you'll be glad exists later.",
      source: "craft",
    },
    {
      id: "m8c6",
      title: "The headline numbers",
      paragraphs: [
        "Have these cold, with their sources straight. From cribl.io: 50% of the Fortune 100 are customers. From Ami: $339M ARR (the subscription run-rate), growing ~40% year over year, and she joined before $100M, so she's watched it 3x. From Patrick: 4th-fastest software company ever to $100M ARR, around 1,500 customers.",
        "Why sources matter: 'Ami mentioned you're at $339M now' sounds connected. Misquoting a stat you can't back up sounds like a guy who skimmed a press release. (These are last-known figures — present them as approximate, and check the live number.)",
      ],
      sayThis:
        "Half the Fortune 100 runs Cribl, and Ami mentioned you've more than tripled since she joined — fourth-fastest company to $100 million. The product-market fit conversation is over.",
      source: "ami",
    },
    {
      id: "m8c7",
      title: "Proof points — logos and stories with numbers",
      paragraphs: [
        "Logos you can name (cribl.io case studies): Reddit, Sophos, Accenture Federal Services, Cox Automotive, Hughes, Pegasystems, ServiceNow, Nutanix. Pick a security one (Sophos), a federal one (Accenture Federal), and a consumer brand for range.",
        "Stories with numbers attached: Nutanix cut firewall log volume 50%. The EDR case: 41% less daily endpoint data (9.25TB → 5TB). Search: 10x faster investigations. Hughes: the observability team finally says yes to more requests (that one's about capacity, not cost). The pattern is always the same — cut a third to half of what feeds the expensive tools, investigations get faster, the team stops saying no.",
      ],
      sayThis:
        "The pattern across the case studies is the same: cut a third to half of the data feeding the expensive tools, investigations get faster, and the team stops saying no to new requests.",
      source: "cribl.io",
    },
    {
      id: "m8c8",
      title: "The use-case menu + how to deploy a stat",
      paragraphs: [
        "Cribl organizes its story around six repeatable plays: Cost Control (the door-opener), SIEM Migration (move or run two SIEMs without re-plumbing — huge right now with Splunk/Cisco churn), SOC Modernization (better data to security, incl. the AI angle), Investigations (Search speed), Site Reliability (the IT/uptime side), and Telemetry as a Shared Service. Cost Control opens the door; the rest are the expansion story.",
        "And the discipline: stats don't persuade on their own — attach them to a pain. Not '50% of the Fortune 100 use Cribl,' but 'most teams come to us when the SIEM bill becomes indefensible — that's how half the Fortune 100 ended up here.' One stat per point, attached to a story, with a source you trust.",
      ],
      sayThis:
        "Most customers show up when the data bill becomes indefensible — that's how half the Fortune 100 got here. Cost control is the door; then migration, SOC modernization, and telemetry as a shared service.",
      source: "craft",
    },
  ],
  quiz: [
    {
      id: "m8q1",
      prompt: "What is 'platformization'?",
      options: [
        {
          text: "Mega-vendors pushing customers to consolidate many point tools onto their single platform",
          correct: true,
        },
        { text: "Moving from on-prem software to cloud platforms" },
        { text: "Standardizing all data on one open format" },
      ],
      explain:
        "Palo, CrowdStrike, Datadog, Splunk/Cisco — all selling 'consolidate onto us.' Knowing the word and who's pushing it instantly signals market fluency.",
    },
    {
      id: "m8q2",
      prompt: "Why does controlling the data layer defuse platform lock-in?",
      options: [
        {
          text: "If you control your own pipes, you can adopt any platform and still swap it later — their 'all your data lives in us' leverage disappears",
          correct: true,
        },
        { text: "It encrypts the data so platforms can't read it" },
        { text: "It forces platforms to lower prices through regulation" },
      ],
      explain:
        "Patrick's core argument: platformization is fine IF you control the data. The customer keeps choice, flexibility, control — and every vendor has to keep earning the business.",
    },
    {
      id: "m8q3",
      prompt: "Kat or Cam asks: 'Who's Cribl's biggest competitor?' Strongest answer:",
      options: [
        { text: "Splunk — the legacy player everyone wants to beat" },
        {
          text: "There's no one direct competitor — the real fights are the status quo, DIY open-source pipelines, and platform vendors bundling pipelines to keep data locked in",
          correct: true,
        },
        { text: "Datadog, because they have the most money" },
      ],
      explain:
        "Naming one vendor misreads the category. The sophisticated answer covers status quo, DIY, and bundled pipelines — and notes the incentive difference: their pipelines lock data in; Cribl's gives choice.",
    },
    {
      id: "m8q4",
      prompt: "Why never trash-talk Splunk, Datadog, or CrowdStrike in a Cribl deal?",
      options: [
        {
          text: "They're destinations, partners, and rivals at once — Cribl wins as Switzerland, and the customer keeps using them",
          correct: true,
        },
        { text: "Legal reasons — disparagement clauses in partner contracts" },
        { text: "Actually, you should — differentiation requires drawing blood" },
      ],
      explain:
        "Cribl feeds these platforms data every day; customers love them. 'Keep what you love, we'll make it cheaper and better' wins — and trash talk torches alliances (Palo Alto is a named Cribl partner).",
    },
    {
      id: "m8q5",
      prompt: "Patrick's three-word umbrella for the executive AI conversation:",
      options: [
        { text: "AI speed, AI scale, AI savings" },
        { text: "AI readiness, AI governance, AI compliance", correct: true },
        { text: "AI agents, AI models, AI data" },
      ],
      explain:
        "Readiness (is our data ready to feed AI?), governance (who controls what the AI sees?), compliance (can we prove it?). Use this trio with anyone senior and you're speaking their language.",
    },
    {
      id: "m8q6",
      prompt: "The ARR and growth numbers Ami gave you (present as approximate):",
      options: [
        { text: "$100M ARR, growing 100% a year" },
        { text: "~$339M ARR, growing about 40% a year", correct: true },
        { text: "$1B ARR, growing about 20% a year" },
      ],
      explain:
        "~$339M ARR, ~40% YoY, and she joined before $100M. Patrick separately said 4th-fastest ever to $100M. Cite people for people-numbers, and flag them as last-known — 'check the live figure.'",
    },
    {
      id: "m8q7",
      prompt: "Which use case is usually the door-opener in a first conversation?",
      options: [
        { text: "Telemetry as a Shared Service" },
        { text: "Cost Control", correct: true },
        { text: "Site Reliability" },
      ],
      explain:
        "Cost is the universal pain — it funds the project and gets meetings. Migration, SOC modernization, and shared-service telemetry are the expansion story once you're in.",
    },
    {
      id: "m8q8",
      prompt: "Strongest way to deploy the Fortune 100 stat:",
      options: [
        { text: "'Did you know 50% of the Fortune 100 use Cribl?'" },
        {
          text: "'Most teams come to us when the data bill becomes indefensible — that's how half the Fortune 100 ended up here.'",
          correct: true,
        },
        { text: "List it alongside ARR, growth rate, and customer count for maximum impact" },
      ],
      explain:
        "Stat + pain + story beats stat alone. And one number per point — a stat barrage is a rookie tell.",
    },
  ],
  writeIn: [
    {
      id: "m8w1",
      prompt:
        "Explain platformization and Cribl's counter-move, like you're talking to an exec who's heard the pitch from every vendor.",
      keyPoints: [
        "Mega-vendors all push 'consolidate onto our platform' — Palo from firewall, CrowdStrike from endpoint, Datadog from metrics, Splunk/Cisco from the SIEM",
        "Execs like it: fewer vendors, fewer contracts, one throat to choke",
        "Cribl's counter: control the neutral data layer underneath all of them",
        "If you control your own pipes, any platform choice is reversible — swap tomorrow, run two during a migration",
        "Their 'all your data lives in us' lock-in leverage disappears",
      ],
      model:
        "Every mega-vendor is running the same play — Palo from the firewall, CrowdStrike from the endpoint, Datadog from metrics, Splunk from the SIEM — all saying 'consolidate onto us.' And it's tempting: fewer vendors, fewer contracts. Here's the thing — platformization is completely fine if you control the data underneath. Control your own pipes and you can pick any platform today and swap it tomorrow, or run two during a migration. Their leverage — 'all your data is in us, good luck leaving' — just evaporates. That's Cribl: the neutral data layer that keeps every platform decision reversible.",
    },
    {
      id: "m8w2",
      prompt:
        "Kat or Cam asks: \"Who do you see as Cribl's biggest competitor?\" Give your answer.",
      keyPoints: [
        "There's no single like-for-like competitor",
        "The real competition is the status quo — do nothing, keep overpaying",
        "DIY open-source pipelines — free software, expensive engineers",
        "The platforms' own bundled pipelines — which exist to lock data IN, where Cribl's give choice",
        "Never trash-talk; Cribl wins as Switzerland",
      ],
      model:
        "Honestly, there's no one direct competitor — Cribl wins way more than its unfair share. The real competition shows up three ways. First, the status quo — do nothing and keep overpaying. Second, teams that try to build it themselves with open source — free software, very expensive engineers. Third, the platform vendors bundling a basic pipeline — but their pipeline exists to lock data into their platform, and ours exists to give the customer choice. I never trash-talk any of them — Cribl's whole position is being Switzerland.",
    },
    {
      id: "m8w3",
      prompt:
        "Rattle off the headline numbers that prove Cribl's product-market fit — with the right source on each, and the right hedge.",
      keyPoints: [
        "50% of the Fortune 100 are customers (cribl.io)",
        "~$339M ARR, growing ~40% year over year (Ami — she joined before $100M and has watched it 3x)",
        "4th-fastest software company ever to $100M ARR (Patrick)",
        "~1,500 customers (Patrick)",
        "Attribute people-numbers to the person who told you; present figures as last-known / approximate",
      ],
      model:
        "Half the Fortune 100 runs Cribl — that's straight from their site. Ami mentioned they're around $339 million ARR now, growing about 40% a year, and she joined before $100M, so she's watched it more than triple. Patrick said they're the fourth-fastest software company ever to $100M, with around 1,500 customers. I'd present the dollar figures as last-known and check the live number — but the product-market-fit conversation is over.",
    },
    {
      id: "m8w4",
      prompt:
        "Which use case opens the door first — and why is SIEM Migration so hot right now?",
      keyPoints: [
        "Cost Control is usually the door-opener — universal pain, and it funds the project",
        "SIEM Migration is hot because of Splunk/Cisco churn and new options",
        "Cribl lets customers switch or run two SIEMs side-by-side without re-plumbing every feed",
        "When you control the pipes, swapping the destination is easy",
      ],
      model:
        "Cost Control is almost always the foot in the door — it's the universal pain and it funds the project. SIEM Migration is the one that's red-hot right now, with all the Splunk and Cisco churn. The reason Cribl makes it easy: when you control the pipes, you can feed the old and the new SIEM simultaneously during the transition instead of hand-rewiring hundreds of feeds. Then it expands into SOC modernization and telemetry as a shared service.",
    },
  ],
};

export const PERIOD2 = [M7, M8];
