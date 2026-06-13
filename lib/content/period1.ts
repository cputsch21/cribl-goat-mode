import type { CourseModule } from "./types";

export const M1: CourseModule = {
  id: "m1",
  period: 1,
  number: 1,
  title: "The Pitch",
  tagline: "What Cribl does, in words you'd actually say out loud",
  minutes: 12,
  cards: [
    {
      id: "m1c1",
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
      id: "m1c2",
      title: "What Cribl actually does",
      paragraphs: [
        "Cribl sits in the middle — between where data is born (the sources) and where it gets used (the destinations: Splunk, Datadog, Elastic, cheap cloud storage, AI systems). Collect it once, then shape it in flight: drop the junk, mask the sensitive parts, add useful context, convert the format. Then route it wherever it's useful.",
        "Cribl's own one-liner for Stream: \"Get the data you need, in the format you want, wherever it needs to go.\" It connects to 80+ sources and destinations, which is why nobody has to rip anything out to adopt it.",
      ],
      sayThis:
        "Cribl is the control layer between where data is created and all the places it needs to go. Collect once, clean it up, protect it, and send each tool exactly what it needs — nothing more.",
      source: "cribl.io",
    },
    {
      id: "m1c3",
      title: "The money story: tiering",
      paragraphs: [
        "Patrick's version of the value story is about putting data in homes that match its value. The high-value security data goes to the expensive analysis tool (the SIEM) and lives there about 90 days. After that it rolls off to cheap storage the customer controls — still there for audits and investigations. The medium- and low-value data skips the expensive tools entirely.",
        "That's why this isn't a hard budget conversation: customers usually fund Cribl with what it saves them on licenses and storage. Real example from Cribl's site: one customer cut 41% of daily endpoint-security data — from 9.25TB down to 5TB — without losing anything they cared about.",
      ],
      sayThis:
        "Send your highest-value data to the expensive tools, route everything else to storage you control — most customers fund the project with the savings.",
      source: "patrick",
    },
    {
      id: "m1c4",
      title: "Why now: the AI pressure",
      paragraphs: [
        "Every board is pushing AI initiatives, and the new AI agents — for security operations, incident response, reliability — are hungry for exactly this telemetry data. Feed them raw, ungoverned data and two things happen: compute bills blow up, and sensitive company data can leak into models.",
        "Patrick frames the executive conversation as three words: AI readiness, AI governance, AI compliance. Cribl's public positioning leans straight into it: \"The AI Platform for Telemetry,\" serving data to both humans and AI agents. The pipes you control become the safety layer for the AI era.",
      ],
      sayThis:
        "Everyone's racing to put AI agents on their security and ops data. Cribl is how you feed those agents the right data — governed, masked, and affordable — instead of a firehose of risk.",
      source: "patrick",
    },
    {
      id: "m1c5",
      title: "Your 30-second version",
      paragraphs: [
        "Memorize this until it's boring. Both Kat and Cam will, in some form, check whether you can say what Cribl does. The three words to always land — Patrick's CISO language — are choice, flexibility, and control.",
        "If you only get one sentence: Cribl puts companies back in control of their machine data.",
      ],
      sayThis:
        "Cribl is the control layer for all the machine data an enterprise generates. We collect it from anywhere, cut the junk, protect the sensitive parts, and deliver it wherever it's useful — security tools, monitoring tools, cheap storage, or the AI systems they're standing up. Customers get choice, flexibility, and control — and it usually pays for itself in savings.",
      source: "chris",
    },
  ],
  quiz: [
    {
      id: "m1q1",
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
        "Cribl is the layer between where data is born and everywhere it needs to go. It doesn't replace Splunk or Datadog — it controls and optimizes what feeds them. That 'we're not a rip-and-replace' point disarms most early objections.",
    },
    {
      id: "m1q2",
      prompt:
        "A non-technical exec asks 'so what does Cribl do?' Strongest answer:",
      options: [
        {
          text: "We're a telemetry pipeline with 80+ integrations supporting schema-on-need transformations",
        },
        {
          text: "We put you back in control of your machine data — collect it once, clean it, protect it, send each tool only what it needs. It usually pays for itself in savings.",
          correct: true,
        },
        { text: "We're like Splunk, but cheaper" },
      ],
      explain:
        "Lead with control and outcomes, not features. The first answer is jargon soup; the third positions Cribl as a SIEM competitor, which it isn't — and 'cheaper X' is a race to the bottom.",
    },
    {
      id: "m1q3",
      prompt: "Cribl Stream connects to roughly how many sources and destinations?",
      options: [
        { text: "About a dozen, focused on Splunk and Datadog" },
        { text: "80+", correct: true },
        { text: "Over 5,000" },
      ],
      explain:
        "80+ integrations (from cribl.io). The point of the number: adopting Cribl doesn't force anyone to change their tools — it plugs into what they already run.",
    },
    {
      id: "m1q4",
      prompt: "In Patrick's tiering story, what happens to the highest-value data?",
      options: [
        {
          text: "It goes to the SIEM for around 90 days, then rolls off to low-cost storage the customer controls",
          correct: true,
        },
        { text: "It's deleted after being analyzed once" },
        { text: "It all stays in the SIEM forever, just compressed" },
      ],
      explain:
        "High-value data earns the expensive home — about 90 days in the SIEM — then moves to cheap storage (like S3 or Cribl Lake) where it's still searchable for audits and investigations. Everything lower-value skips the expensive tools entirely.",
    },
    {
      id: "m1q5",
      prompt: "How do most customers pay for Cribl?",
      options: [
        { text: "Net-new budget approved by the board" },
        {
          text: "Largely with the savings Cribl creates on licenses and storage",
          correct: true,
        },
        { text: "By cancelling their SIEM contract" },
      ],
      explain:
        "The project tends to fund itself: cut 30–50% of what feeds the expensive tools and the math works. Real proof point: a 41% reduction in daily endpoint data (9.25TB → 5TB) from Cribl's own site.",
    },
    {
      id: "m1q6",
      prompt: "Why does the AI boom make Cribl MORE relevant, not less?",
      options: [
        {
          text: "AI agents need governed, relevant, affordable telemetry — and ungoverned firehoses blow up cost and leak risk",
          correct: true,
        },
        { text: "AI will write the data pipelines, so tooling matters less" },
        { text: "It doesn't — AI is mostly a distraction in this space" },
      ],
      explain:
        "Patrick's executive framing: AI readiness, AI governance, AI compliance. Agentic security and ops tools are hungry for telemetry; Cribl is how you feed them the right data without leaking sensitive info or doubling compute bills.",
    },
    {
      id: "m1q7",
      prompt:
        "A CFO-type asks: 'Why buy another tool when we already pay for Splunk?' Best response:",
      options: [
        { text: "Splunk is legacy technology — most companies are leaving it" },
        {
          text: "Cribl isn't a replacement — it controls what feeds Splunk, so you keep the tool and cut the bill. Most customers fund Cribl with those savings.",
          correct: true,
        },
        { text: "Fair point — Cribl mostly matters for companies without a SIEM" },
      ],
      explain:
        "Never trash the incumbent — half the value prop is making existing tools cheaper and better. 'Keep the tool, cut the bill, gain control' answers the CFO's actual question, which is about money.",
    },
    {
      id: "m1q8",
      prompt:
        "Patrick's three words for what the CISO ultimately buys:",
      options: [
        { text: "Speed, scale, savings" },
        { text: "Choice, flexibility, control", correct: true },
        { text: "Visibility, velocity, value" },
      ],
      explain:
        "Choice, flexibility, control — over the entire data strategy. Use these exact words; they're the language Patrick's team sells with, and they'll signal you've internalized the message.",
    },
  ],
};

export const M2: CourseModule = {
  id: "m2",
  period: 1,
  number: 2,
  title: "The Products",
  tagline: "Four products, one engine — and the problem each one kills",
  minutes: 14,
  cards: [
    {
      id: "m2c1",
      title: "Stream — the engine",
      paragraphs: [
        "Stream is the flagship: the pipeline that collects data from anywhere, transforms it in flight, and routes it anywhere. Reduce (drop junk events and fields), shape (reformat for each destination), enrich (add context like geo-IP), mask (hide sensitive values), and replay (pull old data back from cheap storage when an investigation needs it).",
        "Scale credentials from Cribl's site: petabyte-scale deployments, processing billions of events with sub-second latency. Patrick's shorthand: the best stream product in the business.",
      ],
      sayThis:
        "Stream is the engine — data in from anywhere, transformed in flight, out to anywhere. It's where the cost savings and the control live.",
      source: "cribl.io",
    },
    {
      id: "m2c2",
      title: "Edge — the agent",
      paragraphs: [
        "Edge solves agent fatigue. Today a single server might run five different collection agents — one per vendor tool. Edge is one vendor-neutral agent that collects everything at the source (Windows, Linux, Kubernetes) and can process data right there before it ever crosses the network.",
        "The ops win is fleet management: monitor and configure up to 250,000 nodes from one console. Cribl's tagline: \"your not-so-secret agent.\"",
      ],
      sayThis:
        "Edge replaces the zoo of vendor agents with one neutral agent — and you manage the whole fleet, up to 250,000 machines, from one screen.",
      source: "cribl.io",
    },
    {
      id: "m2c3",
      title: "Search — ask without moving",
      paragraphs: [
        "The old way: to search archived data you first 'rehydrate' it — restore it from cheap, cold storage back into an expensive analysis tool so it can be re-indexed and searched — then wait hours or days for that to finish. Cribl Search flips it: search the data where it already lives: in S3 buckets, in the data lake, at the edge, across cloud providers. No moving, no re-ingesting, no rehydration.",
        "Cribl claims 10x faster investigations. Patrick's detail: there are two engines under one experience — federated search (search-in-place, anywhere) and fast indexed search — so teams get one way to ask questions across everything.",
      ],
      sayThis:
        "Search lets a security team ask questions of data sitting in cheap storage without hauling it back into the expensive tools first — that's where the 10x faster investigations come from.",
      source: "cribl.io",
    },
    {
      id: "m2c4",
      title: "Lake — storage without lock-in",
      paragraphs: [
        "Lake is turnkey, low-cost storage for telemetry — the affordable tier in the tiering story. Data is stored in open formats, so it's never trapped: Cribl's own taglines are \"storage that doesn't lock data in\" and \"easy in, easy out.\" Replay any of it to any tool later, or bring your own cloud storage and let Lake manage it.",
        "Together the four products make one motion: collect (Edge) → control (Stream) → store (Lake) → ask (Search).",
      ],
      sayThis:
        "The suite in one breath: collect it with Edge, control it with Stream, store it cheap in Lake, and ask it anything with Search.",
      source: "cribl.io",
    },
    {
      id: "m2c5",
      title: "Where it runs — and the government angle",
      paragraphs: [
        "Cribl runs as SaaS (Cribl.Cloud), on-prem, or hybrid — workers live wherever the data lives, which also avoids surprise cloud egress bills. Patrick thinks the hybrid flexibility is a real moat: SaaS-only rivals like Datadog physically can't serve the most locked-down environments.",
        "Public sector: Cribl is FedRAMP Moderate authorized (cleared for government cloud use). It is not yet IL5 — the higher bar where agencies run a sealed copy of your product in classified environments — but having a true on-prem offering means that path exists at all. Patrick says pubsec is growing like wildfire.",
      ],
      sayThis:
        "Cloud, on-prem, or hybrid — Cribl goes where the data lives. That flexibility is why the government business is growing and why SaaS-only competitors can't follow.",
      source: "patrick",
    },
    {
      id: "m2c6",
      title: "The AI inside the product",
      paragraphs: [
        "Two things to know. First, Cribl ships AI in the product — an AI Copilot that helps engineers build pipelines, map schemas, and write transformations instead of hand-coding them. Second, Cribl Guard: protection that masks sensitive data before it leaves the customer's network and flags logging that looks abnormal.",
        "Don't oversell the details here — if Cam goes deep, the honest move is: 'I know Copilot accelerates pipeline building and Guard handles masking and governance; I'd love to see how customers actually use them.'",
      ],
      sayThis:
        "Cribl Guard masks the sensitive stuff before it ever leaves the customer's network — that's the answer to 'how do we adopt AI without leaking data into models.'",
      source: "patrick",
    },
  ],
  quiz: [
    {
      id: "m2q1",
      prompt: "Match the problem to the product: 'We run five different collection agents on every server and upgrades are a nightmare.'",
      options: [
        { text: "Cribl Search" },
        { text: "Cribl Edge", correct: true },
        { text: "Cribl Lake" },
      ],
      explain:
        "Agent sprawl is Edge's problem to kill: one vendor-neutral agent, fleet-managed — up to 250,000 nodes from a single console.",
    },
    {
      id: "m2q2",
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
      id: "m2q3",
      prompt: "'We want cheap long-term retention, but we're scared of getting locked into another vendor.'",
      options: [
        { text: "Cribl Lake — open formats, 'easy in, easy out'", correct: true },
        { text: "Cribl Stream — compress the data harder" },
        { text: "Keep everything in the SIEM but negotiate the renewal" },
      ],
      explain:
        "Lake's whole identity is storage without lock-in — open formats, replay to any tool later, even bring-your-own storage. 'Storage that doesn't lock data in' is Cribl's own tagline.",
    },
    {
      id: "m2q4",
      prompt: "What does Stream do to data 'in flight'?",
      options: [
        {
          text: "Reduces, reshapes, enriches, and masks it — then routes it to the right destination in the right format",
          correct: true,
        },
        { text: "Encrypts it for transport only — transformation happens at the destination" },
        { text: "Indexes it for search" },
      ],
      explain:
        "Transformation happens in the pipe — that's the magic. Each destination gets exactly the shape of data it needs, junk gets dropped before anyone pays for it, and sensitive fields get masked on the way.",
    },
    {
      id: "m2q5",
      prompt: "The fleet management number for Edge worth having cold:",
      options: [
        { text: "Up to 2,500 nodes from one console" },
        { text: "Up to 250,000 nodes from one console", correct: true },
        { text: "Unlimited nodes, but only on Linux" },
      ],
      explain:
        "250,000 nodes, one console (cribl.io). It's the kind of concrete number that makes you sound like you've done your homework without showing off.",
    },
    {
      id: "m2q6",
      prompt: "Why does hybrid deployment matter competitively?",
      options: [
        {
          text: "Workers run wherever data lives — locked-down and on-prem environments stay reachable, and egress bills stay down. SaaS-only rivals can't follow.",
          correct: true,
        },
        { text: "It's mostly a pricing lever — hybrid is cheaper to sell" },
        { text: "It doesn't — cloud-only is the future and Cribl is moving there" },
      ],
      explain:
        "Patrick's point exactly: Datadog and CrowdStrike are SaaS-only. Cribl can live on-prem, in the cloud, or both — which opens government and regulated industries the others can't fully serve.",
    },
    {
      id: "m2q7",
      prompt: "Cribl's government certification status (per Patrick):",
      options: [
        { text: "FedRAMP Moderate authorized; not yet IL5", correct: true },
        { text: "IL5 authorized; FedRAMP pending" },
        { text: "No government authorizations yet" },
      ],
      explain:
        "FedRAMP Moderate = authorized for government cloud. IL5 — running sealed copies in classified environments — isn't there yet, but Cribl's on-prem product makes that path possible. Get this nuance right; faking certs is a credibility killer.",
    },
    {
      id: "m2q8",
      prompt: "What is Cribl Guard for?",
      options: [
        { text: "DDoS protection for Cribl.Cloud" },
        {
          text: "Masking sensitive data before it leaves the customer's network and flagging abnormal logging",
          correct: true,
        },
        { text: "Encrypting data at rest in Lake" },
      ],
      explain:
        "Guard is the data-protection answer in the AI conversation: sensitive values get masked before data ever leaves the network, so adopting AI tools doesn't mean leaking secrets into models.",
    },
  ],
};

export const M3: CourseModule = {
  id: "m3",
  period: 1,
  number: 3,
  title: "The Battlefield",
  tagline: "Platformization wars, and why the neutral data layer wins",
  minutes: 12,
  cards: [
    {
      id: "m3c1",
      title: "The war Patrick described",
      paragraphs: [
        "Every mega-vendor is running the same play: 'consolidate onto our platform.' Palo Alto comes at the customer from the firewall. CrowdStrike from the endpoint. Datadog from monitoring. Splunk/Cisco from the SIEM. Each tells the CISO: stop buying best-of-breed point tools, our platform is good enough at everything.",
        "And execs are listening — fewer vendors, fewer contracts, one throat to choke. Patrick heard it all week from practitioners in Richmond. This is the single most important market dynamic to understand before your calls.",
      ],
      sayThis:
        "Palo's coming from the firewall, CrowdStrike from the endpoint, Datadog from metrics — everyone's selling platformization. The fight is over who controls the data underneath.",
      source: "patrick",
    },
    {
      id: "m3c2",
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
      id: "m3c3",
      title: "So who's the competition?",
      paragraphs: [
        "There's no single like-for-like competitor — you said this to Patrick and he confirmed it ('we're winning way more than our unfair share'). The real competition shows up three ways: the status quo (do nothing, keep overpaying), build-it-yourself with open-source pipelines (free software, expensive engineers), and the platforms' own bundled pipeline features — which exist to keep data flowing INTO their platform, not to give the customer choice.",
        "Posture matters: never trash-talk. Cribl wins as Switzerland. The platforms are simultaneously partners, destinations, and rivals — that's normal here.",
      ],
      sayThis:
        "Honestly, the biggest competitor is the status quo. Second is 'our platform vendor throws in a basic pipeline' — but their pipeline exists to lock data in, and ours exists to give you choice.",
      source: "chris",
    },
    {
      id: "m3c4",
      title: "The AI conversation at the top",
      paragraphs: [
        "Patrick laid out where CISO conversations are right now: everyone's experimenting with AI, and even the experiments are blowing out compute budgets and creating governance headaches — agent systems with brittle connections, no oversight, sensitive data wandering into models.",
        "The umbrella he named: AI readiness, AI governance, AI compliance. Concretely — the new agentic security tools (an 'AI SOC analyst,' an AI incident responder) only work if they're fed accurate, relevant, governed data. Cribl's site backs the same story: AI-SOC agents, AI-SRE, 'the AI platform for telemetry,' serving humans and agents. Databricks and Snowflake play this game for general business data; Cribl is that layer for telemetry.",
      ],
      sayThis:
        "Every CISO is asking the same two questions: how do we feed AI the right data, and how do we make sure it never leaks the wrong data. Cribl is the control point for both.",
      source: "patrick",
    },
    {
      id: "m3c5",
      title: "Objections clinic",
      paragraphs: [
        "'We already have Splunk/Datadog.' → Great — keep them. Cribl makes them cheaper and better by controlling what feeds them. Not a rip-and-replace.",
        "'Is this really necessary?' → Your data doubles every couple of years, your license bill tracks it, and your AI initiatives need governed data. The status quo is the expensive choice.",
        "'We could build this with open source.' → Some teams do. Then they discover they've hired a team to babysit pipelines instead of doing security. Free software isn't free at enterprise scale — and it doesn't come with governance, support, or a roadmap.",
      ],
      sayThis:
        "You don't have to change anything you love — Cribl makes the tools you already have cheaper and better, and gives you an exit ramp you'll be glad exists later.",
      source: "craft",
    },
  ],
  quiz: [
    {
      id: "m3q1",
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
        "Palo, CrowdStrike, Datadog, Splunk/Cisco — all selling 'consolidate onto us.' Knowing this word and who's pushing it instantly signals market fluency.",
    },
    {
      id: "m3q2",
      prompt: "Match the vendor to their platformization entry point:",
      options: [
        { text: "Palo Alto from the endpoint, CrowdStrike from the firewall" },
        {
          text: "Palo Alto from the firewall, CrowdStrike from the endpoint, Datadog from metrics/monitoring",
          correct: true,
        },
        { text: "All three are coming from the SIEM" },
      ],
      explain:
        "Patrick's exact mapping: Palo → firewall, CrowdStrike → endpoint, Datadog → metrics. Each leverages its beachhead to expand into everything else.",
    },
    {
      id: "m3q3",
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
      id: "m3q4",
      prompt: "Kat or Cam asks: 'Who do you see as Cribl's biggest competitor?' Strongest answer:",
      options: [
        { text: "Splunk — they're the legacy player everyone wants to beat" },
        {
          text: "There's no one direct competitor — the real fights are the status quo, DIY open-source pipelines, and platform vendors bundling basic pipelines to keep data locked in",
          correct: true,
        },
        { text: "Datadog, because they have the most money" },
      ],
      explain:
        "Naming one vendor as 'the competitor' misreads the category. The sophisticated answer covers status quo, DIY, and bundled pipelines — and notes the incentive difference: their pipelines lock data in; Cribl's gives choice.",
    },
    {
      id: "m3q5",
      prompt: "Why never trash-talk Splunk, Datadog, or CrowdStrike in a Cribl deal?",
      options: [
        {
          text: "They're simultaneously destinations, partners, and rivals — Cribl wins by being Switzerland, and the customer keeps using them",
          correct: true,
        },
        { text: "Legal reasons — disparagement clauses in partner contracts" },
        { text: "Actually, you should — differentiation requires drawing blood" },
      ],
      explain:
        "Cribl feeds these platforms data every day; customers love them. 'Keep what you love, we'll make it cheaper and better' wins. Trash talk would also torch the alliance relationships (Palo Alto is literally a named Cribl partner).",
    },
    {
      id: "m3q6",
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
      id: "m3q7",
      prompt: "How do Databricks and Snowflake fit into the picture?",
      options: [
        {
          text: "They play the same 'controlled data layer' game for general business data — Cribl is that layer for telemetry",
          correct: true,
        },
        { text: "They're Cribl's two biggest direct competitors" },
        { text: "They're irrelevant — different industry entirely" },
      ],
      explain:
        "Patrick's framing: the 'AI gateway' idea is everywhere — Databricks and Snowflake for general-purpose data, Cribl for the telemetry side (security and operations data). Useful parallel for execs who know those names.",
    },
    {
      id: "m3q8",
      prompt: "An engineer says: 'We could build this ourselves with open source.' Best response:",
      options: [
        { text: "Open source can't do what Cribl does technically" },
        {
          text: "Some teams do — then they're staffing engineers to babysit pipelines instead of doing security. Free software isn't free at enterprise scale, and it doesn't come with governance or support.",
          correct: true,
        },
        { text: "True — for technical teams, DIY is usually the right call" },
      ],
      explain:
        "Respect the engineer (open source CAN move data), then reframe to total cost: engineering time, on-call burden, governance, scale, support. Never claim open source 'can't' — that's false and they'll know it.",
    },
  ],
};

export const M4: CourseModule = {
  id: "m4",
  period: 1,
  number: 4,
  title: "The Receipts",
  tagline: "The numbers and stories that make you sound like an insider",
  minutes: 10,
  cards: [
    {
      id: "m4c1",
      title: "The headline numbers",
      paragraphs: [
        "Have these cold, with their sources straight. From cribl.io: 50% of the Fortune 100 are customers. From Ami: $339M ARR (annual recurring revenue — the subscription run-rate), growing about 40% year over year, and she joined before $100M, so she's watched it 3x. From Patrick: 4th-fastest software company ever to $100M ARR, around 1,500 customers, Forbes-ranked best startup employer.",
        "Why sources matter: if someone presses, 'Ami mentioned you're at $339M now' sounds connected. Misquoting a stat you can't back up sounds like a guy who skimmed a press release.",
      ],
      sayThis:
        "Half the Fortune 100 runs Cribl, and Ami mentioned you've more than tripled since she joined — fourth-fastest company to $100 million. The product-market fit conversation is over.",
      source: "ami",
    },
    {
      id: "m4c2",
      title: "Logos you can name",
      paragraphs: [
        "Featured case studies on cribl.io: Reddit (streamlined security data management), Sophos (modernized data management), Accenture Federal Services (cloud visibility for a large civilian agency), Cox Automotive, Hughes Network Systems, Pegasystems, ServiceNow, Nutanix.",
        "Logo wall regulars: Siemens, Leidos, New Balance, Domino's, Aflac, Vodafone, FINRA, TransUnion. Pick two or three you'd genuinely reference — a security-heavy one (Sophos), a federal one (Accenture Federal), and a consumer brand (Domino's) covers most conversations.",
      ],
      sayThis:
        "What sold me on the company was the proof: Reddit, Sophos, ServiceNow, half the Fortune 100 — and a federal practice that's already FedRAMP authorized.",
      source: "cribl.io",
    },
    {
      id: "m4c3",
      title: "Stories with numbers attached",
      paragraphs: [
        "Nutanix: cut firewall log volume 50%. The EDR case: 41% less daily endpoint data (9.25TB → 5TB). Search: 10x faster investigations. Hughes: the observability team finally says yes to more requests — that one's about capacity, not cost.",
        "And Ami's anecdote, usable as color if you label it as hers: a customer hit with a major breach was told a data fix would take ~6 weeks; Cribl's team did it in about 45 minutes. Details are fuzzy — tell it as 'Ami shared a story,' never as a citable case study.",
      ],
      sayThis:
        "The pattern across the case studies is the same: cut a third to half of the data feeding the expensive tools, investigations get faster, and the team stops saying no to new requests.",
      source: "cribl.io",
    },
    {
      id: "m4c4",
      title: "The use-case menu",
      paragraphs: [
        "Cribl organizes its story around six repeatable plays — memorize the list: Cost Control (cut what feeds the expensive tools), SIEM Migration (move or run two SIEMs without re-plumbing everything — this is huge right now with Splunk/Cisco churn), SOC Modernization (better data to the security team, including the AI-agent angle), Investigations (Search-in-place speed), Site Reliability (the IT/uptime side), and Telemetry as a Shared Service (central team serves governed data to everyone).",
        "In a first conversation, Cost Control is usually the door-opener; the others are the expansion story.",
      ],
      sayThis:
        "Cost control is usually the foot in the door — then SIEM migration, SOC modernization, and eventually telemetry as a shared service across the whole company.",
      source: "cribl.io",
    },
    {
      id: "m4c5",
      title: "How to deploy a stat",
      paragraphs: [
        "Stats don't persuade on their own — attach them to a pain. Wrong: '50% of the Fortune 100 use Cribl.' Right: 'Most of these teams come to us when the SIEM bill becomes indefensible — that's how half the Fortune 100 ended up here.'",
        "One stat per point, attached to a story, with a source you trust. That's it. Reciting five numbers in a row is a tell that you're new.",
      ],
      sayThis:
        "Most customers show up when the data bill becomes indefensible — that's how half the Fortune 100 got here.",
      source: "craft",
    },
  ],
  quiz: [
    {
      id: "m4q1",
      prompt: "Cribl's Fortune 100 penetration (per cribl.io):",
      options: [
        { text: "50% of the Fortune 100", correct: true },
        { text: "10% of the Fortune 100" },
        { text: "90% of the Fortune 500" },
      ],
      explain:
        "Half the Fortune 100. (Patrick joked '51 of the Fortune 50' in your call — the citable version is 50% of the Fortune 100, straight from cribl.io.)",
    },
    {
      id: "m4q2",
      prompt: "The ARR and growth numbers Ami gave you:",
      options: [
        { text: "$100M ARR, growing 100% a year" },
        { text: "$339M ARR, growing about 40% a year", correct: true },
        { text: "$1B ARR, growing about 20% a year" },
      ],
      explain:
        "$339M ARR, ~40% YoY growth, and she joined before $100M. Patrick separately said 4th-fastest ever to $100M. Cite people for people-numbers: 'Ami mentioned...' sounds connected, not rehearsed.",
    },
    {
      id: "m4q3",
      prompt: "The Nutanix result worth quoting:",
      options: [
        { text: "50% reduction in firewall log volume", correct: true },
        { text: "90% faster incident response" },
        { text: "$50M in license savings" },
      ],
      explain:
        "Nutanix halved firewall log volume — a clean, defensible number from cribl.io's customer stories. Pair it with the 41% EDR-data case and you've got two concrete proof points.",
    },
    {
      id: "m4q4",
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
      id: "m4q5",
      prompt: "Why is SIEM Migration such a hot use case right now?",
      options: [
        {
          text: "Lots of enterprises are rethinking their SIEM (Splunk/Cisco churn, new options) — Cribl lets them switch or run two side-by-side without re-plumbing every data feed",
          correct: true,
        },
        { text: "SIEMs are being phased out industry-wide" },
        { text: "Regulators are forcing SIEM changes in 2026" },
      ],
      explain:
        "When you control the pipes, swapping the destination is easy — feed the old and new SIEM simultaneously during the transition. Without Cribl, a SIEM migration means re-wiring hundreds of feeds by hand.",
    },
    {
      id: "m4q6",
      prompt: "How should you use Ami's '6 weeks → 45 minutes' breach story?",
      options: [
        { text: "As a flagship case study with the customer's industry named" },
        {
          text: "As color, clearly attributed: 'Ami shared a story...' — never as a citable case",
          correct: true,
        },
        { text: "Don't use it at all — secondhand stories are off-limits" },
      ],
      explain:
        "She told it loosely and on purpose ('I can't remember the specifics'). Attributed color is fine and humanizes you; presenting it as a hard case study you can't back up is exactly the bluffing you've promised not to do.",
    },
    {
      id: "m4q7",
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
    {
      id: "m4q8",
      prompt: "Roughly how many customers does Cribl have (per Patrick)?",
      options: [
        { text: "About 150" },
        { text: "About 1,500", correct: true },
        { text: "About 15,000" },
      ],
      explain:
        "~1,500 customers — which alongside $339M ARR tells you these are big enterprise deals, six figures on average. That's the Enterprise AE job in one arithmetic step.",
    },
  ],
};

export const PERIOD1 = [M1, M2, M3, M4];
