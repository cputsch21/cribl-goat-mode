import type { Flashcard } from "./types";

export const FLASHCARDS: Flashcard[] = [
  // ─── Data & telemetry ───────────────────────────────────────────
  {
    id: "f-telemetry",
    term: "Telemetry",
    category: "data",
    plain:
      "The machine data systems constantly produce about what's happening — logs, metrics, events, traces. The raw material of both security and IT monitoring.",
    sentence: "“Telemetry volume roughly doubles every couple of years — the budgets don't.”",
  },
  {
    id: "f-log",
    term: "Log",
    category: "data",
    plain:
      "A timestamped record of something that happened — a login, an error, a blocked connection. The most common kind of telemetry.",
    sentence: "“Most firewall logs are never queried by a human — they just sit in the SIEM at premium prices.”",
  },
  {
    id: "f-metrics",
    term: "Metrics & traces",
    category: "data",
    plain:
      "Metrics are numeric health measurements over time (CPU, latency). Traces follow one request through all the systems it touches. Logs + metrics + traces = the observability trio.",
    sentence: "“Datadog grew up on metrics — that's their beachhead for platformization.”",
  },
  {
    id: "f-ingest",
    term: "Ingest",
    category: "data",
    plain:
      "Data entering a tool. The big analysis tools bill by ingest volume — which is why controlling it is worth real money.",
    sentence: "“The SIEM bills on ingest, so every junk event you drop upstream is money back.”",
  },
  {
    id: "f-index",
    term: "Index",
    category: "data",
    plain:
      "How a tool organizes data internally so searches come back fast. Indexing is compute-heavy — part of why SIEM storage costs so much more than plain storage.",
    sentence: "“Keep 90 days indexed and hot; everything older belongs in cheap storage you can still search.”",
  },
  {
    id: "f-parse",
    term: "Parse / normalize",
    category: "data",
    plain:
      "Parsing: splitting raw data into structured fields. Normalizing: making different sources' fields line up so tools can compare them. Tedious engineering work Cribl does in the pipeline.",
    sentence: "“Every new data source used to mean weeks of parsing and normalizing — that's the toil Stream removes.”",
  },
  {
    id: "f-agent",
    term: "Agent / forwarder",
    category: "data",
    plain:
      "Small software installed on each machine to collect and ship its data. Every vendor historically required their own — hence 'agent fatigue.'",
    sentence: "“Five agents per server, each with its own upgrade cycle — Edge collapses that to one.”",
  },
  {
    id: "f-s3",
    term: "S3 / object storage",
    category: "data",
    plain:
      "Cheap, effectively bottomless cloud storage. S3 is Amazon's version and also the de facto interface standard — lots of storage 'speaks S3.'",
    sentence: "“Patrick's line: S3 is a protocol — Cribl Search can query any of it in place, any cloud.”",
  },
  {
    id: "f-lake",
    term: "Data lake",
    category: "data",
    plain:
      "A big pool of cheap storage holding raw data in open formats until someone needs it. Cribl Lake is a turnkey one for telemetry — 'easy in, easy out.'",
    sentence: "“Archive boldly to the lake — replay means you can always pull it back when an investigation needs it.”",
  },
  {
    id: "f-replay",
    term: "Replay",
    category: "data",
    plain:
      "Pulling archived data from cheap storage back into an analysis tool on demand. The safety net that makes aggressive cost-cutting safe.",
    sentence: "“Tier hard because replay exists — 90 days hot, archive the rest, pull back exactly what the incident needs.”",
  },
  {
    id: "f-otel",
    term: "OpenTelemetry (OTel)",
    category: "data",
    plain:
      "An open, vendor-neutral standard for how systems emit telemetry. Same neutrality philosophy as Cribl; Cribl works with it.",
    sentence: "“They're standardizing on OTel — good news, that rhymes with our whole vendor-neutral story.”",
  },
  {
    id: "f-egress",
    term: "Egress",
    category: "data",
    plain:
      "Data leaving a cloud — which cloud providers charge for. Moving data around carelessly creates surprise egress bills.",
    sentence: "“Hybrid workers process data where it lives, so you're not paying egress to move it twice.”",
  },
  {
    id: "f-tiering",
    term: "Data tiering",
    category: "data",
    plain:
      "Matching each data type to storage worth its value: high-value → expensive analysis tools, the rest → cheap storage that stays searchable.",
    sentence: "“Tiering is the money story: the SIEM gets only what deserves SIEM prices.”",
  },
  {
    id: "f-fedsearch",
    term: "Federated / search-in-place",
    category: "data",
    plain:
      "Searching data where it already lives — across buckets, lakes, clouds, even the edge — instead of hauling it into a tool first.",
    sentence: "“Search-in-place is the 10x investigations claim: no rehydration, no waiting, no double-paying.”",
  },

  // ─── Security & AI ──────────────────────────────────────────────
  {
    id: "f-siem",
    term: "SIEM",
    category: "security",
    plain:
      "Say 'sim.' Security Information & Event Management — the security team's central hub for collecting, analyzing, and alerting on security data. Splunk and Microsoft Sentinel are the big names. Bills on ingest.",
    sentence: "“Nobody wants to rip out the SIEM — they want to stop overfeeding it. That's us.”",
  },
  {
    id: "f-soc",
    term: "SOC",
    category: "security",
    plain:
      "Security Operations Center — the team (and room) watching the alerts and responding to threats. 'SOC modernization' = giving them better data and now AI help.",
    sentence: "“An AI SOC agent is only as good as the telemetry feeding it — governed data or garbage decisions.”",
  },
  {
    id: "f-edr",
    term: "EDR",
    category: "security",
    plain:
      "Endpoint Detection & Response — software watching every laptop and server for threats. CrowdStrike's category. Generates enormous data volume.",
    sentence: "“The case study cut 41% of daily EDR data — 9.25 terabytes down to 5 — with nothing lost.”",
  },
  {
    id: "f-ciso",
    term: "CISO",
    category: "security",
    plain:
      "Chief Information Security Officer — owns security strategy, risk, and usually the SIEM budget. The most common economic buyer in Cribl deals.",
    sentence: "“For the CISO it's three words: choice, flexibility, control over the data strategy.”",
  },
  {
    id: "f-observability",
    term: "Observability",
    category: "security",
    plain:
      "The IT side of the telemetry world: understanding system health and performance from outputs. Datadog's home turf. Cribl serves it and security equally.",
    sentence: "“Security and observability buy the same data twice — a shared telemetry layer fixes that.”",
  },
  {
    id: "f-masking",
    term: "PII / masking",
    category: "security",
    plain:
      "PII = personally identifiable information. Masking hides sensitive values in data before it travels. Cribl Guard does this before data leaves the customer's network.",
    sentence: "“Guard masks the sensitive fields before anything leaves your network — that's how you adopt AI without leaking secrets into models.”",
  },
  {
    id: "f-fedramp",
    term: "FedRAMP",
    category: "security",
    plain:
      "The certification that lets US government agencies use a cloud product. Cribl is FedRAMP Moderate authorized — the federal door is open.",
    sentence: "“We're FedRAMP Moderate — and Carahsoft is the channel that pairs with it.”",
  },
  {
    id: "f-il5",
    term: "IL5",
    category: "security",
    plain:
      "A higher DoD bar where agencies run a sealed copy of your product in classified environments. Cribl isn't there yet — but its on-prem product makes the path possible, which SaaS-only rivals lack.",
    sentence: "“Not IL5 yet — but we have a real on-prem story, which is why pubsec is growing like wildfire.”",
  },
  {
    id: "f-agentic",
    term: "Agentic SOC / AI agents",
    category: "security",
    plain:
      "AI systems that don't just chat — they take actions: triaging alerts, investigating incidents. The hot direction in security ops, and they're hungry for governed telemetry.",
    sentence: "“Everyone's piloting agentic SOC tools — the blocker is feeding them accurate, relevant, governed data.”",
  },
  {
    id: "f-mcp",
    term: "MCP",
    category: "security",
    plain:
      "Model Context Protocol — the emerging standard for connecting AI agents to tools and data. Patrick's point: enterprises are wiring agents together with brittle connections and no governance.",
    sentence: "“One MCP server talking to another with no governance — that's the chaos CISOs are trying to get ahead of.”",
  },
  {
    id: "f-gateway",
    term: "AI gateway",
    category: "security",
    plain:
      "A control point between an enterprise's data and the AI models consuming it — governing what goes in and out. Databricks and Snowflake play this for business data; Cribl is that layer for telemetry.",
    sentence: "“Think of it as the AI gateway for telemetry: models get exactly the data they should see, nothing they shouldn't.”",
  },

  // ─── Sales system ───────────────────────────────────────────────
  {
    id: "f-arr",
    term: "ARR",
    category: "sales",
    plain:
      "Annual Recurring Revenue — the subscription run-rate. Cribl: $339M and growing ~40% a year, per Ami.",
    sentence: "“Ami joined before $100M ARR — it's $339M now. She's watched it triple.”",
  },
  {
    id: "f-icp",
    term: "ICP",
    category: "sales",
    plain:
      "Ideal Customer Profile — the attributes of accounts most likely to buy big: data-heavy, SIEM-burdened, multi-tool enterprises.",
    sentence: "“My top-20 list starts from the ICP, then gets re-ranked by partner relationships and live signals.”",
  },
  {
    id: "f-pg",
    term: "PG (pipeline generation)",
    category: "sales",
    plain:
      "The discipline of creating your own future deals. Patrick's floor: 10 emails + 10 calls + 10 LinkedIn daily, 2 partner meetings weekly, 4 field events monthly.",
    sentence: "“PG is the job — the 10-10-10 is the floor, not the ceiling.”",
  },
  {
    id: "f-meddpicc",
    term: "MEDDPICC",
    category: "sales",
    plain:
      "Deal-health checklist: Metrics, Economic buyer, Decision criteria, Decision process, Paper process, Identify pain, Champion, Competition. Cribl runs it with Force Management.",
    sentence: "“When a deal stalls, a MEDDPICC box is empty — usually champion or paper process.”",
  },
  {
    id: "f-com",
    term: "Command of the Message",
    category: "sales",
    plain:
      "Force Management's framework: sell the gap between current state (and its negative consequences) and future state (and its positive business outcomes), tied to corporate objectives, with agreed metrics.",
    sentence: "“Current state, negative consequences, future state, business outcomes — Patrick asked me exactly those words.”",
  },
  {
    id: "f-pov",
    term: "POV (proof of value)",
    category: "sales",
    plain:
      "A time-boxed, hands-on evaluation in the customer's environment, run by the SE against agreed success criteria. Earned by qualification, not granted by default.",
    sentence: "“No POV without written success criteria, a timebox, an exec sponsor, and a champion driving it.”",
  },
  {
    id: "f-qbr",
    term: "QBR",
    category: "sales",
    plain:
      "Quarterly Business Review — the structured cadence with existing customers. At Cribl: leadership in the room, champions made to look good, specialist teams seeding new use cases.",
    sentence: "“The QBR is an expansion engine disguised as a check-in.”",
  },
  {
    id: "f-champion",
    term: "Champion",
    category: "sales",
    plain:
      "The person inside the account who sells for you when you're not in the room — has influence and personal skin in the game. At Cribl, often the architect or engineer whose pain you fixed.",
    sentence: "“No champion, no deal — it's the most commonly empty MEDDPICC box.”",
  },
  {
    id: "f-eb",
    term: "Economic buyer",
    category: "sales",
    plain:
      "The person who actually owns the budget and can say yes when everyone else says maybe. In Cribl deals, usually the CISO or CIO.",
    sentence: "“The engineers loved us — but I hadn't met the economic buyer, so 'yes' had no owner.”",
  },
  {
    id: "f-whitespace",
    term: "White space",
    category: "sales",
    plain:
      "Use cases a customer hasn't bought yet — found by listening. The love/hate/wish answers from engineers are the map.",
    sentence: "“Their wish for faster archive search is white space — that's a Cribl Search conversation at the next QBR.”",
  },
  {
    id: "f-multithread",
    term: "Multi-threading",
    category: "sales",
    plain:
      "Building relationships across the whole buying committee instead of betting on one contact. The opposite — single-threading — is how deals die with one resignation.",
    sentence: "“I multi-thread from day one: different message per seat, partners helping map the informal power.”",
  },

  // ─── Channel ────────────────────────────────────────────────────
  {
    id: "f-var",
    term: "VAR / solution provider",
    category: "channel",
    plain:
      "Value-Added Reseller — advises customers, resells vendors' products, and implements them. SHI, Optiv, GuidePoint, Presidio, Ahead, Trace3 are the national names around Cribl.",
    sentence: "“Optiv and GuidePoint are the security specialists; SHI is the volume giant; Ahead and Presidio lean infrastructure.”",
  },
  {
    id: "f-disti",
    term: "Distributor",
    category: "channel",
    plain:
      "The logistics layer between vendors and resellers — contracts, credit, fulfillment at scale. Carahsoft plays this role for government.",
    sentence: "“For federal deals, Carahsoft is the channel — it pairs with the FedRAMP story.”",
  },
  {
    id: "f-gsi",
    term: "GSI",
    category: "channel",
    plain:
      "Global System Integrator — consulting giants (Accenture, Deloitte) who run huge transformation projects and embed products like Cribl inside them.",
    sentence: "“Accenture Federal built a whole Cribl case study — GSIs bring deals you'd never see alone.”",
  },
  {
    id: "f-dealreg",
    term: "Deal registration",
    category: "channel",
    plain:
      "A partner's filed claim on an opportunity they sourced — locking in their margin and protection. The trust engine of the entire channel.",
    sentence: "“If a partner registered it, it's their deal — my job is making them money on it so the next ten referrals come.”",
  },
  {
    id: "f-mdf",
    term: "MDF",
    category: "channel",
    plain:
      "Market Development Funds — vendor money partners use to run events and campaigns. How a lot of those four-field-events-a-month get funded.",
    sentence: "“Let's put MDF behind a Philly security breakfast and split the target list.”",
  },
  {
    id: "f-cosell",
    term: "Co-sell",
    category: "channel",
    plain:
      "Working an account jointly with a partner — each side bringing its relationships and getting paid. The default motion at a ~95%-channel company.",
    sentence: "“Every top-20 account plan names the partner and the co-sell play.”",
  },
  {
    id: "f-sourced",
    term: "Partner-sourced vs. influenced",
    category: "channel",
    plain:
      "Sourced: the partner originated the deal. Influenced: they helped one along. PBMs like Kat are measured on these — help her numbers and she'll help yours.",
    sentence: "“I want partner-sourced pipeline, not just influence — that means feeding partners deals too, not only asking.”",
  },
  {
    id: "f-coopetition",
    term: "Coopetition",
    category: "channel",
    plain:
      "Competing and partnering with the same company at once. Palo Alto platformizes against the category AND sits in Cribl's partner ecosystem. Normal here — handle without trash talk.",
    sentence: "“Rivals at the strategy layer, partners at the data layer — that's just the neighborhood.”",
  },
  {
    id: "f-marketplace",
    term: "Cloud marketplace",
    category: "channel",
    plain:
      "Buying software through AWS or Microsoft's store, often using cloud spend the customer already committed. Makes procurement dramatically easier.",
    sentence: "“They have committed AWS spend — transacting through the marketplace turns procurement from months into weeks.”",
  },
  {
    id: "f-pbm",
    term: "PBM (Partner Business Manager)",
    category: "channel",
    plain:
      "Kat's job: owns the partner relationships in the region, builds partner-sourced pipeline, runs enablement and joint events, and decides which AEs get the warmest partner doors.",
    sentence: "“My first 30 days: sit with the PBM, learn the real partner map, and enter every partner meeting with her game plan.”",
  },
];
