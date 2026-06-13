// Deep Cribl reference, injected into the tutor's system prompt (and ONLY the
// tutor — not the Practice Room or Gauntlet personas). Built from a one-time
// research pass over official Cribl-owned sources (cribl.io, docs.cribl.io,
// trust.cribl.io). Every fact carries its source URL; fast-moving numbers are
// flagged "verify - may be dated" so the tutor hedges instead of stating them
// as current fact. This is the human-readable big-context doc too — read it here.
//
// Editing note: this is a template literal, so do not introduce backticks or the
// sequence ${ into the text below.

export const REFERENCE = `
DEEP CRIBL REFERENCE (official Cribl sources only — teach from this; it is part of your knowledge pack).

HOW TO USE THIS REFERENCE:
- Every fact below traces to an official Cribl-owned source (cribl.io, docs.cribl.io, trust.cribl.io). If something is not here and not in the facts above, it is a genuine gap — do the honest-gap move (say so, point Chris to his SE or the recruiter). With this reference loaded, that should be rare.
- Numbers go stale. Anything marked "VERIFY - may be dated" (ARR, growth, Fortune-100 %, node counts, pricing, FedRAMP status) must be taught as approximate / "as of last I saw - check the live number," never stated as a hard current fact.
- Lines marked "STATE EXACTLY" (the compliance posture) must be quoted precisely.

== THE ONE-LINER ==
Cribl is "the data engine for IT and Security"; the current portfolio tagline is "The AI Platform for Telemetry" - manage and analyze telemetry for humans and agents with no lock-in, no data loss, no compromises. The whole pitch is choice, control, and flexibility: a vendor-neutral control layer between where machine data is created and everywhere it needs to go, so existing tools get cheaper and better without a rip-and-replace. (cribl.io, cribl.io/products)

== PRODUCTS ==
Suite in one breath: collect (Edge) -> control (Stream) -> store (Lake) -> ask (Search), with Cribl AI/Copilot assisting across all of it and Cribl Guard protecting sensitive data in flight.

Cribl Stream - the engine.
- What: the industry's leading observability pipeline - collect, reduce, enrich, and route telemetry from any source to any tool, in the right format. (cribl.io/products/stream)
- Kills: vendor lock-in and runaway ingest/storage costs by decoupling sources from destinations - no re-architecture as you scale. (cribl.io/blog/cost-reduction-and-cribl-stream)
- How it's built: Sources collect data -> Routes evaluate each event against a filter expression (JS-compatible), in order -> each Route sends matches to one Pipeline + one Destination. A Pipeline is an ordered sequence of Functions (reduce, shape, enrich, mask, aggregate, sample, suppress). Packs bundle a whole config for reuse. (docs.cribl.io/stream/pipelines, docs.cribl.io/stream/routes, docs.cribl.io/stream/packs)
- The five verbs: Reduce (drop junk events/fields, dynamic sampling, logs->metrics), Shape (reformat per destination), Enrich (add context, e.g. GeoIP/threat-intel), Mask (hide sensitive values), Route (fan out to many destinations at once), plus Replay (pull full-fidelity data back from cheap storage on demand). (cribl.io/products/stream)
- Connectivity: "connects to 80+ data sources and destinations." VERIFY - may be dated. (cribl.io/products/stream)
- Scale claims: "process billions of events per second with sub-millisecond latency"; customers already at multi-petabyte/day. VERIFY - single marketing source. (cribl.io/products/stream)
- Reduction rule of thumb: customers "reduce data volumes by 25% or more"; "a 30% reduction is typical," higher for chatty sources like DNS. Estimate, not a guarantee. (cribl.io/solutions/use-cases/reduce-size-of-data)

Cribl Edge - the agent.
- What: a vendor-neutral, intelligent agent built for the variety and scale of modern architectures. (cribl.io/products/edge)
- Kills: agent sprawl / "agent fatigue" - consolidate multiple collection agents into one. Positioned as a Universal Forwarder alternative (vs Splunk's UF). (cribl.io/products/edge, cribl.io/blog/cribl-edge-a-universal-forwarder-alternative)
- Fleet management: a Fleet = Edge Nodes sharing one config; centrally configure, monitor, and upgrade fleets in minutes. Built to manage up to 250,000 nodes. VERIFY - headline figure, single source. (docs.cribl.io/edge/fleets, cribl.io/products/edge)
- Runs on: Linux, macOS, Windows, containers/Kubernetes; collects logs/metrics/system metrics; processes at the edge. Footprint ~1 CPU core per node, in-memory. (docs.cribl.io/use-cases/usecase-edge)

Cribl Search - ask without moving.
- What: combines federated, centralized search with decentralized storage to offer a search-in-place solution - "the industry's first search-in-place solution." (docs.cribl.io/search/about, cribl.io/products)
- Kills: the cost and delay of shipping/ingesting/indexing data before you can analyze it - investigate anywhere "without moving or rehydrating your data," no indexing required. (cribl.io/search)
- Two engines, one experience: a federated engine runs search-in-place where data lives; a lakehouse engine option queries data ingested into Lakehouse for best performance. (docs.cribl.io/search/about)
- Query language: KQL (Microsoft Kusto Query Language) with Cribl extensions. (docs.cribl.io/search/language-reference)
- Native sources: AWS S3 / S3-compatible, Amazon Security Lake, Azure Blob, Google Cloud Storage, Azure Data Explorer, Cribl Lake - plus live SaaS APIs (Okta, Zoom, Microsoft Graph, Google Workspace). (docs.cribl.io/search/connect-to-data)
- "10x faster investigations": Cribl's headline marketing claim for Search. Marketing claim; no official hard throughput/latency numbers exist - do not invent any. (cribl.io/products/search)

Cribl Lake - storage without lock-in.
- What: a turnkey data lake to store, manage, access, replay, and search data - "the industry's first turnkey data lake solution." (cribl.io/products/lake, cribl.io/blog/introducing-cribl-lake)
- Kills: proprietary-storage lock-in and slow/expensive lake setup - stand up a usable lake in "minutes, not months." (cribl.io/products/lake)
- Open formats / no lock-in: taglines "Storage that Doesn't Lock Data In" and "easy in, easy out." Data in open formats; logs/metrics/traces. (cribl.io/blog/introducing-cribl-lake)
- BYOS (Bring Your Own Storage): store in your own Amazon S3 or Azure Blob - data stays under your control, Cribl manages it. BYOS list price: 0.02 credits / GB / month on compressed volume ($1 = 1 credit). VERIFY - pricing. (docs.cribl.io/lake)
- Plays with the suite: Stream replays from the lake; Search queries Lake datasets directly. Can ingest Splunk DDSS data directly, then Search queries it with no rehydration. (docs.cribl.io/lake/splunk-cloud, cribl.io/blog/from-archive-to-insight-ingest-splunk-ddss-data-directly-into-cribl-lake)

Cribl Lakehouse - instant analytics on telemetry.
- What: a feature within Cribl Lake (not a standalone SKU) that stores massive, ever-changing telemetry while enabling real-time, high-performance dashboards and analytics - "purpose-built for the dynamic and unpredictable nature of telemetry data." (docs.cribl.io/lake/lakehouse, cribl.io/blog/introducing-lakehouse-instant-insights-scalability-lower-costs)
- Kills: ETL/parser overhead and the slow-query tradeoff of plain object storage - "just send the data in, and it's instantly available."
- Best for: searches spanning more than a few hundred GB; near-real-time search; queried via Search's lakehouse engine. (docs.cribl.io/lake/lakehouse)

Cribl.Cloud - the managed platform (SaaS).
- What: fully managed, cloud-native platform giving instant access to all Cribl products (Stream, Edge, Search, Lake) plus AI-powered solutions. (cribl.io/products/cribl-cloud)
- Free tier: "up to 1TB/day at no cost," nothing to install, no license, no payment collected. VERIFY - allowance. (cribl.io/products/cribl-cloud)
- Hybrid (Enterprise): the Leader lives in Cribl.Cloud and manages Stream Workers and Edge Nodes wherever they run (Cribl-hosted, on-prem, private cloud) - so data can be processed where it lives. Credits / consumption billing. (docs.cribl.io/stream/deploy-cloud, cribl.io/blog/cribl-cloud-pricing)

Cribl AI / Cribl Copilot - assistive, human-in-the-loop.
- Naming: Cribl AI is the umbrella AI layer; Cribl Copilot is the embedded assistant within it. "Transparent, assistive AI that works with you" - the AI suggests and does the heavy lifting, but you keep full control over what gets implemented. (cribl.io/products/cribl-ai)
- Where it shows up: Copilot Editor builds/edits Stream Pipelines from plain language; a KQL assistant turns natural language into Search queries; a Copilot Chatbot answers config/troubleshooting questions anywhere in the suite; agentic investigations in Search; BYOAI to bring your own model. (docs.cribl.io/stream/copilot-editor, docs.cribl.io/suite/copilot-kql, docs.cribl.io/copilot/cribl-byoai)

Cribl Guard - protect sensitive data in flight.
- Naming: "Cribl Guard" is the real official product (own docs space, own launch). Do not confuse it with the lowercase Stream "Guard" Function - distinct things. (docs.cribl.io/guard, docs.cribl.io/stream/guard-function)
- What: combines advanced AI with a human-in-the-loop control point to spot sensitive data (credit-card, passport, SSN) as it flows through Cribl Stream. (cribl.io/news/cribl-unveils-cribl-guard-to-protect-sensitive-data)
- Kills: accidental PII leakage into downstream tools / AI models, and eases privacy compliance. Actions: mask, redact, encrypt, delete, block, or route before data reaches the Destination. Helps meet GDPR, HIPAA, PCI, CCPA. Ships with 200+ customizable rules (first release). VERIFY - rule count and GA date. (cribl.io/news/cribl-unveils-cribl-guard-to-protect-sensitive-data)

== GLOSSARY (define on demand) ==
Three terms (rehydration, index, egress) have no dedicated Cribl glossary page; Cribl uses them in context. Definitions below are grounded in Cribl's actual usage.

Rehydration: the traditional, slow, costly process of retrieving archived/cold data out of cheap storage and restoring it back into an analytics tool (like a SIEM) so it becomes queryable again. Cribl always frames rehydration as a pain to eliminate, not a feature to sell: legacy restores often take 24+ hours, and Splunk archive restores hit a strict ~10% entitlement cap. Cribl's answer is to avoid rehydration altogether - Replay (re-ingest only what you need) and search-in-place (query the archive where it sits). "Instantly query your Lake DDSS dataset - no access delays, no rehydration." (docs.cribl.io/use-cases/usecase-replay, cribl.io/products/search)

Replay: a Cribl Stream capability to "selectively ingest, and re-ingest, data into systems of analysis." Keep full-fidelity telemetry in low-cost storage (S3, Azure Blob, Cribl Lake), then use a Stream Collector to specify a time range and replay just the data an investigation, backfill, audit, or migration needs - without recollecting from the original sources. Can enrich on the way back. (docs.cribl.io/use-cases/usecase-replay)

Search-in-place / Federated search: search-in-place = searching data where it already lives (edge, in flight, Cribl Lake, existing systems) without first moving or rehydrating it, no indexing required. Federated search = a mechanism that abstracts and unifies queries to multiple data sources, relaying them as if they were a single query, running search-in-place against data stored elsewhere. (docs.cribl.io/search/basic-concepts, cribl.io/glossary/federated-search)

Data tiering: a data-management strategy that organizes/stores data by usage pattern, moving cold/less-used data to cheaper tiers. High-value data -> hot analytics tools; low-value data -> cheap object storage that stays searchable. The engine of the cost-control story. (cribl.io/glossary/data-tiering)

Ingest / ingestion: data being collected from sources and loaded into a tool or lake - the first stage of a pipeline. Big analytics tools bill by ingest volume, which is why controlling it is worth real money. (cribl.io/glossary/data-pipeline)

Index / indexing: (no standalone official definition.) The compute-heavy downstream step that organizes ingested data so it can be searched fast - part of why SIEM storage costs far more than plain storage. Cribl's differentiator: Search runs federated queries with no onboarding or indexing required. (docs.cribl.io/search/about)

Telemetry: the automated collection and transmission of data from remote sources - the "input" end of an observability pipeline. Logs + metrics + traces, the raw material of security and IT monitoring. (cribl.io/glossary/telemetry)

SIEM (Security Information and Event Management): a cybersecurity tool that aggregates and analyzes security-related data from various sources in real time - combining log collection/storage (SIM) with real-time monitoring, correlation, and alerting (SEM). Bills on ingest. Say it "sim." (cribl.io/glossary/siem)

Observability: answers "What's going on inside the system?" - the ability to interrogate an environment by analyzing the logs, metrics, and traces it emits, including questions you didn't know to ask in advance. (cribl.io/blog/observability-vs-monitoring-vs-telemetry)

Agent / forwarder: a lightweight shipper installed near the data source to collect and forward its data. Historically every vendor required its own - hence "agent fatigue." Cribl's agent is Cribl Edge, a vendor-neutral Universal Forwarder alternative. (docs.cribl.io/stream/usecase-logging-agents)

Egress: (no standalone official definition.) Outbound data movement - data leaving the system through Destinations, which clouds charge for. Cribl reduces egress cost by filtering/reducing data before it leaves and by processing data where it lives. (docs.cribl.io/reference-architectures/cva-network-egress)

DDSS (Splunk Dynamic Data Self Storage): Splunk's feature that lets users archive petabytes of data to S3 to save on hot/archive storage. The flagship anti-Splunk proof point: Cribl Lake can ingest DDSS data directly, and Cribl Search queries it instantly - no rehydration - bypassing Splunk's slow (24+ hr) restores and ~10% entitlement cap. (cribl.io/glossary/dynamic-data-self-storage-ddss, docs.cribl.io/lake/splunk-cloud)

Data lake: a centralized repository that stores raw data in its native format, without predefined structures. Cribl's managed version is Cribl Lake. (cribl.io/glossary/data-lakes)

Schema-on-read (and Cribl's schema-on-need): schema-on-read = store data as-is with no predefined schema and apply structure only at query time - cheaper and more agile than schema-on-write (no heavy upfront ETL). Cribl's variant, schema-on-need, automatically transforms data into the format required as you route it. (cribl.io/glossary/schema-on-read, cribl.io/glossary/schema-on-need)

Cribl deployment vocabulary: Worker Node = a Stream instance that does the data processing. Worker Group = a set of Workers sharing one config (often mapped to a region/business unit). Leader Node = the control-plane instance that centrally authors config and monitors all Workers (Workers poll it ~every 10s). Fleet = the Edge equivalent of a Worker Group. (docs.cribl.io/stream/deploy-distributed, docs.cribl.io/edge/fleets)

== DEPLOYMENT and COMPLIANCE ==
Deployment models: Cribl.Cloud (SaaS) - Cribl hosts the Leader and optionally Workers/Edge Nodes. On-prem / self-hosted - you run everything in your own DCs or cloud. Hybrid - Leader in Cribl.Cloud, Workers in your own infrastructure so sensitive data stays in your controlled environment. Connected Environments link on-prem Stream/Edge to a Cribl.Cloud instance for unified management while still using cloud-only Lake and Search. (docs.cribl.io/stream/deploy-cloud, docs.cribl.io/reference-architectures/arch-hybrid-planning)

Data residency: Cribl-managed Worker Groups run in AWS or Azure across multiple regions (US East/West, Canada Central, Frankfurt, London/UK South, Sydney, Paris, etc. - treat the list as approximate). The Org's home region is set at registration and can't be changed, but you can add Worker Groups in other regions. VERIFY region list on live docs. (docs.cribl.io/stream/cloud-workers)

Government and compliance - STATE EXACTLY:
- FedRAMP: MODERATE - AUTHORIZED (ATO granted Jan 29, 2026) via Cribl.Cloud Government, listed on the FedRAMP Marketplace. (Was "In Process" as of Sept 17, 2025 - so say "Authorized," not "In Process.") Built on FedRAMP-Moderate AWS Commercial US-East/US-West - NOT AWS GovCloud. Products in scope: Stream, Edge, Lake, Search. More than 20 U.S. federal agencies already use Cribl. (cribl.io/news/cribl-achieves-fedramp-authority-to-operate-for-us-federal-government-agencies, docs.cribl.io/fedramp)
- No FedRAMP High. No DoD IL4 / IL5. None claimed - do not claim these. (The on-prem product makes a future higher-bar path possible, but it isn't there.)
- SOC 2 Type II - since June 2022. (trust.cribl.io/certifications/soc2type_2)
- ISO 27001:2022 - achieved Dec 2023; scope covers Stream, Edge, Search, Cribl.Cloud. (trust.cribl.io/certifications/iso27001)
- HIPAA / GDPR / PCI / CCPA - Cribl helps customers comply (via Cribl Guard); these are NOT certifications Cribl itself holds. Never say "Cribl is HIPAA/PCI certified" - say "Cribl helps you meet" those. (docs.cribl.io/guard)
- Trust portal for actual documents: trust.cribl.io

== USE CASES / INITIATIVES (official GTM) ==
Cost control is the door-opener (most prominent, most repeated claim); the rest is land-and-expand.
- Cost control / slash storage costs: telemetry doubling costs ~every 18 months; reduce telemetry 50% or more before sending to costly platforms, reclaim budget via tiering. (cribl.io/solutions/initiatives/cost-control)
- SIEM migration and optimization: feed legacy + new SIEM simultaneously to de-risk the cutover; cited example, a $900K/yr Splunk license cut to $200K. (cribl.io/solutions/initiatives/siem-migration-and-optimization)
- SIEM augmentation: route critical data to the SIEM, full-fidelity copy to tiered storage; query everything with Search. (cribl.io/solutions/initiatives/siem-augmentation)
- SOC modernization: "Control Data, Ready for AI" - a vendor-neutral telemetry control plane in front of SIEM, XDR, lakes, and the AI stack - modernize without ripping out your existing stack. (cribl.io/solutions/initiatives/soc-modernization)
- Investigations: faster incident investigations and root-cause analysis with unified search, AI-ready telemetry, cost-efficient pipelines (the 10x Investigations story). (cribl.io/solutions/initiatives/investigations)
- Platform engineering / SRE: keep high-value data hot, tier the rest, speed MTTI/MTTR. (cribl.io/solutions/initiatives/platform-engineering)
- Telemetry as a shared service: governed, multi-tenant shared service; golden pipelines + self-service workspaces without becoming a gatekeeper. (cribl.io/solutions/initiatives/telemetry-as-a-shared-service)
- AI readiness: AI and LLM readiness is fundamentally data readiness - start by fixing the telemetry layer, not replacing every tool; governance enforced at the data layer. (cribl.io/ai-readiness)
- Data lake strategy / data tiering: Cribl Lake as the industry's first turnkey data lake, turning telemetry from a budget drain into a strategic asset. (cribl.io/solutions/initiatives/data-lake-strategy)
- Compliance / redact sensitive data: Cribl Guard masks/redacts/encrypts PII before it reaches the destination. (cribl.io/solutions/use-cases/redact-sensitive-data)
- Also: agent consolidation, application sprawl, cloud migration. (cribl.io/solutions/initiatives/agent-consolidation)

== CUSTOMERS and PROOF POINTS (official, attributed) ==
- Autodesk: 93% savings on data costs with Stream. (cribl.io/customers/autodesk)
- TransUnion: DNS/Sysmon logging cut ~1TB/day -> ~150GB/day (~85%, ~20x); sub-second firewall search over billions of daily events. (cribl.io/customers/transunion)
- Sally Beauty: 41% EDR reduction - 9.25TB/day -> ~5TB/day. (This is the "41% EDR" stat in the course flashcards.) (cribl.io/customers/sally-beauty)
- Security Risk Advisors: SIEM costs cut 80%; 60%+ on Windows Event Logs. (cribl.io/customers/sra)
- Finality: 250% faster threat detection; ~47% Windows Events reduction. (cribl.io/customers/finality)
- Nutanix: firewall log consumption ~50% reduction. (cribl.io/solutions/use-cases/reduce-size-of-data)
Aggregate: Cribl Stream customers reduce data volumes by 25% or more. (cribl.io/solutions/use-cases/reduce-size-of-data)

== COMPANY STATS and FUNDING == (all fast-moving - VERIFY before quoting)
From the ~Feb 2026 "$300M ARR" release: surpassed $300M ARR, growing >40% YoY; Cloud ARR over $130M growing >75% YoY; $500K+ ARR customers up >50%; total customer base up >25% YoY; ~50% of the Fortune 100; ~35% of the Fortune 500. (cribl.io/news/cribl-surpasses-usd300-million-in-arr-powering-the-essential-infrastructure)
Note on the course canon: the KNOWLEDGE block cites "$339M ARR (per Ami)." Cribl's public number is "surpassed $300M" (a round, conservative milestone). Not a contradiction - ARR moves and Ami may have a fresher internal figure - but the safely-citable public number is $300M+.
Trajectory: $200M ARR +70% YoY (Jan 22, 2025): 43 of the Fortune 100, 130 of the Fortune 500, NDR >130%. (cribl.io/news/cribl-surpasses-200m-in-arr-growing-more-than-70-percent-year-over-year) | $100M ARR in <4 years (Oct 2023): "fourth-fastest infrastructure company to reach centaur status" (the course's "4th-fastest to $100M" - official wording is "4th-fastest infra company to centaur status"). (cribl.io/news/cribl-surpasses-100m-in-annual-recurring-revenue-in-less-than-four-years) | Series E: $319M at a $3.5B valuation (Aug 27, 2024), led by GV (Google Ventures); total raised >$600M. (cribl.io/news/cribl-announces-319m-series-e) | Recognition: 2025 Forbes Cloud 100; #1 Forbes America's Best Startup Employers 2025.

== MARKET and COMPETITIVE POSITIONING (Cribl's own words) ==
- Self-framing: "the data engine for IT and Security" / "The AI Platform for Telemetry" / "powering the essential infrastructure for the AI era." Central theme: vendor-neutral - choice, control, flexibility, no lock-in, no data loss, no compromises. (cribl.io, cribl.io/avoid-vendor-lock-in)
- Control plane: "a single, unified control plane for telemetry - you decide what data goes where, in what shape, and at what cost." (cribl.io/solutions/initiatives/soc-modernization)
- Composability vs platformization: Cribl reframes the consolidation debate and lands on composability - "Platformization promises simplicity through one vendor but often sacrifices agility and innovation. A composable SIEM empowers you to embrace both choice and control." A deliberate counter to single-vendor pitches. The consolidation Cribl does endorse: agent consolidation and "collect once, search anywhere." (cribl.io/blog/engineering-for-a-composable-siem-architecture)
- Coopetition (partner with rivals): Palo Alto Networks (Cortex XSIAM integration), CrowdStrike (Falcon Next-Gen SIEM), plus the Technology Alliance Partner (TAP) program - Microsoft, Wiz, Grafana, Corelight, Gigamon, and more. Cribl routes both to and around vendors who are also competitors. (cribl.io/partners/tap)
- Channel: "the RIGHT partners, not EVERY partner"; a partner-first org. Key differentiator: Cribl isn't asking partners to sell its products instead of other vendors - it unlocks value from a customer's existing tools rather than ripping them out. (cribl.io/partners)
- Vs status quo / DIY: the alternative Cribl argues against is tightly-coupled, lock-in-prone architectures where ingestion is bound to one analytics platform; its pitch is decoupling so you evolve your stack without re-architecting everything. (No explicit "vs DIY open source" comparison page found on cribl.io.)

== NUMBERS TO RE-VERIFY (volatile) ==
ARR ($300M+), growth (>40%), Cloud ARR ($130M/75%); Fortune 100 (~50%) / Fortune 500 (~35%); valuation ($3.5B) / total raised ($600M+, dates to Aug 2024); Stream "80+ sources/destinations"; Stream "billions of events/sec, sub-ms latency"; Edge "up to 250,000 nodes"; Lake BYOS "0.02 credits/GB/mo"; Cribl.Cloud free tier "1TB/day"; Guard "200+ rules" and GA month; FedRAMP status (currently Moderate/Authorized, Jan 2026).
`;
