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

// ─────────────────────────────────────────────────────────────
// The macro / "why now" — the forces in the industry that exist
// independent of Cribl, and why they're all peaking at once. Sits
// next to the product (m7) and the battlefield (m8). Bonus, so it
// teaches without changing the exam-unlock gate.
// ─────────────────────────────────────────────────────────────

export const M12: CourseModule = {
  id: "m12",
  period: 2,
  number: 12,
  title: "Why Now — The Industry",
  tagline: "The macro forces behind the category — and why they're all peaking at once",
  minutes: 12,
  bonus: true,
  cards: [
    {
      id: "m12c1",
      title: "The data explosion is the whole reason this category exists",
      paragraphs: [
        "Start with the force underneath everything. Every machine an enterprise runs — servers, laptops, firewalls, cloud apps — constantly produces telemetry: logs, metrics, traces, events. Security teams need it to catch attacks; IT teams need it to keep systems up. And the volume only goes one direction: Cribl's own framing is that telemetry roughly doubles about every 18 months.",
        "Sit with what that means. The data doubles on a fixed clock; the budgets don't. Every tool downstream wants its own copy in its own format. So an enterprise doesn't have a data shortage — it has a data control problem, and it gets worse every quarter whether or not anyone acts. That curve outran the old way of doing things, and that's the bedrock 'why now.'",
      ],
      sayThis:
        "Telemetry roughly doubles every eighteen months — and the budgets don't. That gap is the whole reason this category exists, and it widens every quarter you do nothing.",
      source: "cribl.io",
    },
    {
      id: "m12c2",
      title: "The cost crisis: the tools bill on ingest",
      paragraphs: [
        "Here's the mechanism that turns the data curve into a budget crisis: the big analysis tools — the SIEM most of all — bill by ingest volume, the amount of data entering them. Indexing that data so it's searchable fast is compute-heavy, which is why SIEM storage costs far more than plain storage. So as telemetry doubles, the license bill tracks it dollar-for-dollar.",
        "That's why 'ingest' is the most important word in any pricing conversation: control what enters the expensive tools and you control the bill. Cribl's published rule of thumb is a 25%+ reduction before data hits the costly platforms — a 30% reduction is typical, higher for chatty sources. The figure that makes it concrete: a $900K/yr Splunk license cut to $200K. The point isn't the exact number — it's the shape.",
      ],
      sayThis:
        "The SIEM bills on ingest, so the license bill grows exactly as fast as your data. The only lever you control is what you choose to send it — Cribl's own example is a $900K Splunk bill cut to $200K.",
      source: "cribl.io",
    },
    {
      id: "m12c3",
      title: "Platformization: the consolidation war everyone's fighting",
      paragraphs: [
        "Now the market context. Every mega-vendor is running the identical play: consolidate onto our platform. Palo Alto comes from the firewall, CrowdStrike from the endpoint, Datadog from monitoring, Splunk and Cisco from the SIEM. Each tells the CISO the same thing — stop buying best-of-breed point tools, our platform is good enough at everything.",
        "And executives are listening: fewer vendors, fewer contracts, one throat to choke. In Patrick's words this is the single most important market dynamic to understand before any call. You don't argue against platformization — that's a losing posture; it's a real, rational trend. The whole fight right now is over who controls the data underneath all those platforms.",
      ],
      sayThis:
        "Palo's coming from the firewall, CrowdStrike from the endpoint, Datadog from metrics — everyone's selling platformization right now. The whole fight is over who controls the data underneath.",
      source: "patrick",
    },
    {
      id: "m12c4",
      title: "Platformization vs. composability — two answers to one question",
      paragraphs: [
        "The industry has split into two answers to 'how do I tame this sprawl.' One is platformization: one vendor, simplicity through consolidation. The other is composability: keep choice and control by owning the neutral data layer, so any platform decision stays reversible. Cribl's published line — a composable SIEM empowers you to embrace both choice and control.",
        "The elegant move is that these aren't actually opposites if you control the data. Lean into platformization all you want — as long as you own the pipes. Then you can pick any platform today and swap it tomorrow, or run two during a migration, and the 'all your data is in us, good luck leaving' leverage evaporates. Note the nuance: Cribl isn't anti-consolidation — it champions agent consolidation and 'collect once, search anywhere.' Pro-consolidation at the data layer, pro-choice at the platform layer.",
      ],
      sayThis:
        "There are two answers to the sprawl problem: platformization, or composability — control the neutral data layer so every platform choice stays reversible. And they're not opposites: lean into platformization all you want, as long as you control the pipes.",
      source: "cribl.io",
    },
    {
      id: "m12c5",
      title: "SIEM migration is the wedge — and it's red-hot right now",
      paragraphs: [
        "Of all the use cases, SIEM migration has the most 'why now' energy in the market today — driven by Splunk and Cisco churn and a wave of new SIEM options. The classic trap: migrating SIEMs used to mean hand-rewiring hundreds of data feeds, so customers stayed stuck on a tool they'd outgrown.",
        "Cribl's mechanism removes the trap. Because you control the pipes, you can feed the legacy and the new SIEM simultaneously — run both, prove the new one, then switch, with no re-plumbing. Cost Control opens the door (the universal, board-visible pain); migration is the wedge that follows. It converts a one-time, terrifying cutover into a reversible, staged project — and that reframes the whole buying decision.",
      ],
      sayThis:
        "Everyone's mid-rethink on their SIEM right now with all the Splunk and Cisco churn. Because you control the pipes, you can feed the old and new SIEM at the same time and de-risk the whole cutover — no re-plumbing hundreds of feeds.",
      source: "cribl.io",
    },
    {
      id: "m12c6",
      title: "AI readiness = data readiness — the accelerant",
      paragraphs: [
        "This is the force that took a steady-burn category and lit it. Every board is pushing AI, and the new agentic tools — an AI SOC analyst, an AI incident responder — are hungry for exactly this telemetry. Feed them raw, ungoverned data and two things happen: compute bills blow up, and sensitive company data leaks into models.",
        "The thesis to land, in Cribl's own words: AI readiness is fundamentally data readiness. You don't get AI-ready by replacing every tool — you get there by fixing the telemetry layer first and enforcing governance at the data layer. The pipes you control become the safety layer for the AI era. Patrick's three-word umbrella for any senior conversation: AI readiness, AI governance, AI compliance.",
      ],
      sayThis:
        "AI readiness is really data readiness — you don't get there by ripping out tools, you get there by fixing the data layer first. With any executive it's three words: AI readiness, AI governance, AI compliance.",
      source: "patrick",
    },
    {
      id: "m12c7",
      title: "The observability side: same story, IT's bill instead of security's",
      paragraphs: [
        "Don't let the macro story sound security-only — it's the identical squeeze on the IT side. Observability answers a simple question — what's going on inside the system? — by reading health and performance from the logs, metrics, and traces a system emits. Datadog is that world's home turf, and it runs on the same exploding telemetry, billed the same brutal way.",
        "The kicker most people miss: security and observability often buy the same data twice. A shared, governed telemetry layer underneath both fixes that — Cribl serves security and IT equally (the IT plays are SRE / platform engineering and telemetry as a shared service). That's why this is a platform-level problem, not a point fix: the cost curve, the ingest economics, and the AI pressure hit both budgets at once.",
      ],
      sayThis:
        "It's the same story on the IT side — observability runs on the same exploding data, billed the same way. Security and observability buy the same data twice; a shared telemetry layer underneath both is how you stop paying twice.",
      source: "cribl.io",
    },
    {
      id: "m12c8",
      title: "The credibility stats: the market already voted",
      paragraphs: [
        "End the macro story with proof the market already moved — but carry these cold and hedged, because misquoting a stat sounds like a guy who skimmed a press release. From cribl.io: roughly half the Fortune 100 are customers, about 35% of the Fortune 500, and around 1,500 customers total.",
        "On revenue, get the hedge exactly right. The safely-citable public number is $300M+ ARR, growing over 40% year over year; the course canon also carries $339M (per Ami) as a possibly-fresher internal figure — lead with $300M+ publicly. Trajectory: 4th-fastest to $100M ARR. Present all of it as last-known and approximate. The point isn't the brag — half the Fortune 100 didn't adopt a neutral data layer for fun. They're on the same data curve you just described, and they voted.",
      ],
      sayThis:
        "Half the Fortune 100 runs Cribl, public ARR is north of $300 million growing over 40% a year — fourth-fastest software company ever to $100 million. I present those as last-known, but the product-market-fit conversation is over.",
      source: "cribl.io",
    },
  ],
  quiz: [
    {
      id: "m12q1",
      prompt: "What's the single force underneath the entire telemetry-control category?",
      options: [
        { text: "Machine data (telemetry) roughly doubles about every 18 months while budgets stay flat", correct: true },
        { text: "Cloud providers keep raising storage prices every year" },
        { text: "Regulators now require all logs to be kept for seven years" },
      ],
      explain:
        "Telemetry doubles on a fixed clock; budgets don't. That gap — not any one regulation or price hike — is why the category exists, and it widens every quarter.",
    },
    {
      id: "m12q2",
      prompt: "Why does the word 'ingest' decide pricing conversations?",
      options: [
        { text: "Ingest speed determines how accurate the alerts are" },
        { text: "The big analysis tools bill by data volume entering them — control ingest and you control the bill", correct: true },
        { text: "Regulators cap ingest volume for compliance" },
      ],
      explain:
        "Ingest-based billing is the economic engine of the category. Cut 25–50% of what enters the expensive tools and the project funds itself — Cribl cites a typical ~30% reduction.",
    },
    {
      id: "m12q3",
      prompt: "Cribl's published SIEM-migration example of the cost lever is:",
      options: [
        { text: "A $900K/yr Splunk license cut to $200K", correct: true },
        { text: "A $10M/yr Splunk license cut to zero" },
        { text: "A flat 5% discount on the SIEM contract" },
      ],
      explain:
        "Cribl's own number on its SIEM-migration page. The exact figure matters less than the shape: the bill grows on its own, and what you choose to send is the only lever.",
    },
    {
      id: "m12q4",
      prompt: "What is 'platformization,' and who's pushing it?",
      options: [
        { text: "Moving from on-prem to the cloud, led by AWS and Azure" },
        { text: "Mega-vendors pushing customers to consolidate point tools onto one platform — Palo (firewall), CrowdStrike (endpoint), Datadog (metrics), Splunk/Cisco (SIEM)", correct: true },
        { text: "Standardizing all data on one open format, led by OpenTelemetry" },
      ],
      explain:
        "Each vendor attacks from its beachhead with the same pitch: consolidate onto us. Knowing the word and who's pushing it signals market fluency instantly.",
    },
    {
      id: "m12q5",
      prompt: "Cribl's published reframe of the consolidation debate is called:",
      options: [
        { text: "Platformization done right" },
        { text: "Composability — own the neutral data layer so platform choices stay reversible", correct: true },
        { text: "Decentralization" },
      ],
      explain:
        "Cribl's line: a composable SIEM empowers you to embrace both choice and control. It's not anti-consolidation — Cribl endorses agent consolidation and 'collect once, search anywhere'; it's pro-choice at the platform layer.",
    },
    {
      id: "m12q6",
      prompt: "Why is SIEM migration especially hot right now, and how does Cribl de-risk it?",
      options: [
        { text: "SIEMs are being banned, so everyone must migrate" },
        { text: "Splunk/Cisco churn has customers rethinking, and controlling the pipes lets you feed the old and new SIEM simultaneously during the cutover", correct: true },
        { text: "Cribl replaces the SIEM entirely, so migration is automatic" },
      ],
      explain:
        "Migration used to mean hand-rewiring hundreds of feeds. Run both SIEMs in parallel, prove the new one, then switch — no re-plumbing. Cost Control opens the door; migration is the wedge that follows.",
    },
    {
      id: "m12q7",
      prompt: "The cleanest macro framing of why AI is the 'why now' accelerant:",
      options: [
        { text: "AI will replace SIEMs within a year" },
        { text: "AI readiness is fundamentally data readiness — fix the telemetry layer and govern at the data layer, rather than replacing every tool", correct: true },
        { text: "AI makes telemetry cheaper to store" },
      ],
      explain:
        "Cribl's own thesis. Agentic tools need accurate, governed, relevant data, or you get blown-out compute bills and data leaking into models. Patrick's umbrella: AI readiness, governance, compliance.",
    },
    {
      id: "m12q8",
      prompt: "The safest way to state Cribl's ARR in the room is:",
      options: [
        { text: "'Exactly $339 million ARR,' stated as current fact" },
        { text: "'$300M+ ARR publicly, growing over 40% a year — last-known, I'd check the live number' (with $339M as a possibly-fresher internal figure per Ami)", correct: true },
        { text: "'$1 billion ARR, growing 20% a year'" },
      ],
      explain:
        "Cribl's public milestone is the round, conservative $300M+. $339M is the internal figure from Ami — not a contradiction, but lead with $300M+ publicly and flag every dollar number as approximate.",
    },
  ],
  writeIn: [
    {
      id: "m12w1",
      prompt: "Tell the whole 'why now' in 60 seconds — the macro arc, no product pitch.",
      keyPoints: [
        "Telemetry roughly doubles ~every 18 months while budgets stay flat — the structural gap",
        "The tools bill on ingest, so the license bill tracks the data curve dollar-for-dollar",
        "The platformization war is live (Palo/CrowdStrike/Datadog/Splunk) — the fight is over who owns the data underneath",
        "AI is the accelerant: AI readiness = data readiness, with board-level urgency",
        "Net: a steady cost problem just got a deadline — that's the 'why now'",
      ],
      model:
        "The macro story is one curve and one accelerant. The curve: machine data doubles roughly every eighteen months and budgets don't, and because the big tools bill on ingest, the license bill tracks that curve dollar for dollar. On top of it, every mega-vendor is fighting a platformization war — Palo, CrowdStrike, Datadog, Splunk all saying consolidate onto us — so the real fight is over who controls the data underneath. Then AI lit the fuse: AI readiness is really data readiness, and now there's a board mandate and a deadline attached. So a steady cost problem suddenly has urgency — that's the why now.",
    },
    {
      id: "m12w2",
      prompt: "Explain the cost crisis to a CFO — why does the data bill grow on its own?",
      keyPoints: [
        "Telemetry doubles ~every 18 months (a rule of thumb — present as approximate)",
        "The expensive tools, especially the SIEM, bill by ingest volume",
        "Indexing is compute-heavy — why SIEM storage costs far more than plain storage",
        "The only lever is what you choose to send; Cribl cites typical ~25–30% reductions (an estimate, not a guarantee)",
        "Concrete shape: a $900K Splunk license cut to $200K",
      ],
      model:
        "Your data roughly doubles every eighteen months, and the security and monitoring tools bill by how much you feed them — by ingest. They also index everything, which is compute-heavy, so that storage costs far more than plain storage. Put those together and your bill grows on its own every quarter, whether or not anything changes. The only lever you actually control is what you choose to send those tools — and Cribl's customers typically cut a quarter to a third of it before it ever lands. Their own example is a $900K Splunk license cut to $200K. I'd present those as approximate, but the trajectory is the point.",
    },
    {
      id: "m12w3",
      prompt: "An exec says 'we're consolidating onto one platform.' Walk the platformization-vs-composability picture.",
      keyPoints: [
        "Acknowledge platformization is real and rational — fewer vendors, one throat to choke",
        "Every mega-vendor runs it from a different beachhead (firewall/endpoint/metrics/SIEM)",
        "The two answers: platformization (one vendor) vs composability (own the neutral data layer)",
        "They're not opposites if you control the pipes — any platform stays swappable; run two during a migration",
        "Cribl endorses the right consolidation: agent consolidation, 'collect once, search anywhere'",
      ],
      model:
        "Totally fair — platformization is real and rational; fewer vendors, one throat to choke. Every big vendor's running it from a different angle: Palo from the firewall, CrowdStrike from the endpoint, Datadog from metrics, Splunk from the SIEM. The industry's split into two answers, though: platformization, or composability — owning the neutral data layer so your platform choices stay reversible. And they're not opposites: lean into platformization all you want, as long as you control the pipes — then you can swap any platform tomorrow or run two during a migration. Cribl's actually pro-consolidation in the right place: collapse your agents, collect once, search anywhere. It's just pro-choice at the platform layer.",
    },
    {
      id: "m12w4",
      prompt: "Why is AI the accelerant that took this from a slow burn to urgent — and how do you frame it for a CISO?",
      keyPoints: [
        "Boards are pushing AI; agentic security/ops tools are hungry for exactly this telemetry",
        "Feed them raw/ungoverned data → compute bills blow up AND sensitive data leaks into models",
        "The thesis: AI readiness is fundamentally data readiness — fix the telemetry layer, govern at the data layer",
        "Patrick's three-word umbrella: AI readiness, AI governance, AI compliance",
        "It's the same data problem as the cost story, now with a board-level deadline",
      ],
      model:
        "AI is what turned a slow-burn cost problem into an urgent one. Every board is pushing AI, and the new agentic tools — an AI SOC analyst, an AI responder — are hungry for exactly this telemetry. Feed them raw, ungoverned data and two bad things happen at once: the compute bills blow up, and sensitive data leaks into the models. So with a CISO I frame it in three words: AI readiness, AI governance, AI compliance. And the core line is that AI readiness is really data readiness — you don't get there by replacing every tool, you get there by fixing the data layer first and governing right there. Same data problem as the cost story — now with a board mandate and a deadline.",
    },
  ],
};

export const PERIOD2 = [M7, M8, M12];
