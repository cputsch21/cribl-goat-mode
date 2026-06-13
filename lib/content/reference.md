# Cribl Reference — interview-grade facts, official sources only

> **What this is.** A standalone, human-readable reference for everything Cribl that a
> Cribl Enterprise AE candidate might need to define or defend in an interview. It is the
> deep backstop behind the bite-sized course modules and the tutor's `KNOWLEDGE` block.
>
> **Sourcing discipline.** Every fact here traces to an **official Cribl-owned source**
> (`cribl.io`, `docs.cribl.io`, `trust.cribl.io`). No third-party blogs, analyst sites, or
> competitor pages were used for facts. If you can't find it below with a `cribl.io` link,
> treat it as unknown — the honest-gap move, not a guess.
>
> **Dating.** Numbers go stale. Anything marked **⚠️ [verify — may be dated]** is a
> fast-moving figure (ARR, growth, Fortune-100 %, node counts, pricing). Before you quote
> one in a live interview, open the linked page and confirm the current wording.
>
> **Wiring.** This doc is a reference Chris (and the team) read and grep. It does **not**
> auto-load into the tutor — so it adds zero per-call token cost and can't bloat the model's
> context. If a fact here earns its place in the always-on `KNOWLEDGE` block, promote it
> deliberately into `lib/interview-brain.ts`.
>
> _Generated 2026-06-13 from official Cribl sources._

---

## 0. The one-liner

Cribl is **"the data engine for IT and Security"**; the current portfolio tagline is
**"The AI Platform for Telemetry"** — _"manage and analyze telemetry for humans and agents
with no lock-in, no data loss, no compromises."_ The whole pitch is **choice, control, and
flexibility**: a vendor-neutral control layer that sits between where machine data is created
and everywhere it needs to go, so existing tools get cheaper and better without a
rip-and-replace. (https://cribl.io/ , https://cribl.io/products/)

---

## 1. Products

The AI-powered suite, in Cribl's own words: _"Cribl Stream, the industry's leading
observability pipeline; Cribl Edge, an intelligent vendor-neutral agent; Cribl Search, the
industry's first search-in-place solution; and Cribl Lake and Lakehouse, turnkey open-format
storage solutions."_ (https://cribl.io/products/)

The motion in one breath: **collect (Edge) → control (Stream) → store (Lake) → ask (Search)**,
with **Cribl AI / Copilot** assisting across all of it and **Cribl Guard** protecting sensitive
data in flight.

### Cribl Stream — the engine
- **What:** _"the industry's leading observability pipeline, letting you collect, reduce,
  enrich, and route telemetry data from any source to any tool, in the right format."_
  (https://cribl.io/products/stream/)
- **Kills:** vendor lock-in and runaway ingest/storage costs by **decoupling sources from
  destinations** — no re-architecture as you scale. (https://cribl.io/blog/cost-reduction-and-cribl-stream/)
- **How it's built:** Sources collect data → **Routes** evaluate each event against a filter
  expression (JS-compatible), in order → each Route sends matches to one **Pipeline** + one
  **Destination**. A Pipeline is an ordered sequence of **Functions** (reduce, shape, enrich,
  mask, aggregate, sample, suppress…). **Packs** bundle a whole config for reuse.
  (https://docs.cribl.io/stream/pipelines/ , https://docs.cribl.io/stream/routes/ , https://docs.cribl.io/stream/packs/)
- **The five verbs:** **Reduce** (drop junk events/fields, dynamic sampling, logs→metrics),
  **Shape** (reformat per destination), **Enrich** (add context, e.g. GeoIP/threat-intel),
  **Mask** (hide sensitive values), **Route** (fan out to many destinations at once), plus
  **Replay** (pull full-fidelity data back from cheap storage on demand).
  (https://cribl.io/products/stream/)
- **Connectivity:** _"connects to 80+ data sources and destinations."_ ⚠️ [verify — may be dated]
  (https://cribl.io/products/stream/)
- **Scale claims:** _"process billions of events per second with sub-millisecond latency"_;
  customers already at **multi-petabyte/day**. ⚠️ [verify — single marketing source]
  (https://cribl.io/products/stream/ , https://cribl.io/blog/building-for-multi-petabyte-scale-pt1/)
- **Reduction rule of thumb:** customers _"reduce data volumes by 25% or more"_; _"a 30%
  reduction is typical,"_ higher for chatty sources like DNS. ⚠️ [estimate, not a guarantee]
  (https://cribl.io/solutions/use-cases/reduce-size-of-data/)
- **Also:** Persistent Queuing for backpressure. (https://cribl.io/blog/cribl-persistent-queuing/)

### Cribl Edge — the agent
- **What:** _"a vendor-neutral, intelligent agent built for the variety and scale of today's
  modern architectures."_ (https://cribl.io/products/edge/)
- **Kills:** agent sprawl / "agent fatigue" — _"consolidate multiple data collection agents
  into a single unified data collection system."_ Explicitly positioned as a **Universal
  Forwarder alternative** (vs. Splunk's UF).
  (https://cribl.io/products/edge/ , https://cribl.io/blog/cribl-edge-a-universal-forwarder-alternative/)
- **Fleet management:** a **Fleet** = Edge Nodes sharing one config; centrally
  _"configure, monitor, and upgrade fleets in minutes, without relying on endpoint owners."_
  Built to manage **up to 250,000 nodes**. ⚠️ [verify — headline figure, single source]
  (https://docs.cribl.io/edge/fleets/ , https://cribl.io/products/edge/)
- **Runs on:** Linux, macOS, Windows, containers/Kubernetes; collects logs, metrics, system
  metrics; processes at the edge before sending. Footprint: ~1 CPU core per Edge Node,
  in-memory. (https://docs.cribl.io/use-cases/usecase-edge/ , https://docs.cribl.io/edge/4.2/deploy-planning/)

### Cribl Search — ask without moving
- **What:** _"combines federated, centralized search with decentralized data storage to offer
  a search-in-place solution"_ — Cribl calls it **"the industry's first search-in-place
  solution."** (https://docs.cribl.io/search/about/ , https://cribl.io/products/)
- **Kills:** the cost and delay of shipping/ingesting/indexing data before you can analyze it
  — _"investigate anything, anywhere — without moving or rehydrating your data,"_ with **no
  onboarding or indexing required.** (https://cribl.io/search/ , https://docs.cribl.io/search/about/)
- **Two engines, one experience:** a **federated engine** runs search-in-place against data
  where it lives; a **lakehouse engine** option queries data ingested into Lakehouse for best
  performance. (https://docs.cribl.io/search/about/)
- **Query language:** **KQL** (Microsoft Kusto Query Language) with Cribl extensions.
  (https://docs.cribl.io/search/language-reference/)
- **Native sources:** AWS S3 / S3-compatible, Amazon Security Lake, Azure Blob, Google Cloud
  Storage, Azure Data Explorer, Cribl Lake — plus live SaaS APIs (Okta, Zoom, Microsoft
  Graph, Google Workspace…). (https://docs.cribl.io/search/connect-to-data/)
- **"10x faster investigations":** Cribl's headline marketing claim for Search. ⚠️ [marketing
  claim; no official hard throughput/latency numbers exist — do **not** invent any]
  (https://cribl.io/products/search/)

### Cribl Lake — storage without lock-in
- **What:** _"a turnkey data lake solution that makes it easy to store, manage, access,
  replay, and search data"_ — _"the industry's first turnkey data lake solution."_
  (https://cribl.io/products/lake/ , https://cribl.io/blog/introducing-cribl-lake/)
- **Kills:** proprietary-storage lock-in and slow/expensive lake setup — stand up a usable
  lake in _"minutes, not months."_ (https://cribl.io/products/lake/)
- **Open formats / no lock-in:** taglines _"Storage that Doesn't Lock Data In"_ and
  _"easy in, easy out."_ Data kept in open formats; logs/metrics/traces, structured or not.
  (https://cribl.io/blog/introducing-cribl-lake/)
- **BYOS (Bring Your Own Storage):** store in your own Amazon S3 or Azure Blob — data stays
  under your control, Cribl manages it. BYOS list price: **0.02 credits / GB / month** on
  compressed volume ($1 = 1 credit). ⚠️ [verify — pricing]
  (https://cribl.io/blog/byos-with-cribl-lake-data-ownership-meets-flexibility/ , https://docs.cribl.io/lake/)
- **Plays with the suite:** Stream replays from the lake; Search queries Lake datasets
  directly (Lake datasets are instantly available as Search datasets). It can also **ingest
  Splunk DDSS data directly** — then Search queries it with no rehydration.
  (https://docs.cribl.io/lake/splunk-cloud/ , https://cribl.io/blog/from-archive-to-insight-ingest-splunk-ddss-data-directly-into-cribl-lake/)

### Cribl Lakehouse — instant analytics on telemetry
- **What:** a **feature within Cribl Lake** (not a standalone SKU) that stores massive,
  ever-changing telemetry while enabling _"real-time, high-performance dashboards and
  analytics"_ — _"the first solution purpose-built for the dynamic and unpredictable nature
  of telemetry data."_ (https://docs.cribl.io/lake/lakehouse/ , https://cribl.io/blog/introducing-lakehouse-instant-insights-scalability-lower-costs/)
- **Kills:** the ETL/parser overhead and the slow-query tradeoff of plain object storage —
  _"just send the data in, and it's instantly available,"_ no expensive ETL pipelines.
- **Best for:** searches spanning more than a few hundred GB; near-real-time search; queried
  via Search's lakehouse engine. (https://docs.cribl.io/lake/lakehouse/)

### Cribl.Cloud — the managed platform (SaaS)
- **What:** Cribl's _"fully managed, cloud-native platform that gives you instant access to
  all Cribl products… Stream, Edge, Search, and Lake, as well as AI-powered solutions."_
  (https://cribl.io/products/cribl-cloud/)
- **Free tier:** _"up to 1TB/day at no cost,"_ nothing to install, no license, no payment
  collected. ⚠️ [verify — allowance]  (https://cribl.io/products/cribl-cloud/)
- **Hybrid (Enterprise):** the **Leader** lives in Cribl.Cloud and manages Stream Workers and
  Edge Nodes wherever they run (Cribl-hosted, on-prem, private cloud) — so data can be
  processed where it lives. **Credits / consumption** billing — pay for what you use.
  (https://docs.cribl.io/stream/deploy-cloud/ , https://cribl.io/blog/cribl-cloud-pricing/)

### Cribl AI / Cribl Copilot — assistive, human-in-the-loop
- **Naming:** **Cribl AI** is the umbrella AI layer; **Cribl Copilot** is the embedded
  assistant within it. _"Transparent, assistive AI that works with you"_ — the AI suggests
  and does the heavy lifting, _"but you maintain full control over what actually gets
  implemented."_ (https://cribl.io/products/cribl-ai/)
- **Where it shows up:** **Copilot Editor** builds/edits Stream Pipelines from plain language;
  a **KQL assistant** turns natural language into Search queries; a **Copilot Chatbot** answers
  config/troubleshooting questions anywhere in the suite; **agentic investigations** in Search;
  **BYOAI** to bring your own model.
  (https://docs.cribl.io/stream/copilot-editor/ , https://docs.cribl.io/suite/copilot-kql/ , https://docs.cribl.io/copilot/cribl-byoai/)

### Cribl Guard — protect sensitive data in flight
- **Naming:** **"Cribl Guard"** is the real, official product (own docs space, own launch). Do
  **not** confuse it with the lowercase Stream **"Guard" Function** — distinct things.
  (https://docs.cribl.io/guard/ , https://docs.cribl.io/stream/guard-function/)
- **What:** _"combines advanced AI with a human-in-the-loop control point to spot sensitive
  data, such as credit-card, passport, and Social Security numbers, as it flows through Cribl
  Stream."_ (https://cribl.io/news/cribl-unveils-cribl-guard-to-protect-sensitive-data/)
- **Kills:** accidental PII leakage into downstream tools / AI models, and eases privacy
  compliance. Actions: **mask, redact, encrypt, delete, block, or route** _before data reaches
  the Destination._ Helps meet **GDPR, HIPAA, PCI, CCPA**. Ships with **200+ customizable
  rules** (first release). ⚠️ [verify — rule count & GA date]
  (https://cribl.io/news/cribl-unveils-cribl-guard-to-protect-sensitive-data/)

---

## 2. Glossary — terms to define on demand

> Three of these (**rehydration, index, egress**) have no dedicated `cribl.io/glossary` page —
> Cribl uses them heavily in context but never formally defines them. Their definitions below
> are grounded in Cribl's actual product/docs usage and are marked accordingly.

### Rehydration  ⭐ (the gap that started this doc)
The traditional, slow, costly process of **retrieving archived/cold data out of cheap storage
and restoring it back into an analytics tool (like a SIEM) so it becomes queryable again.**
Cribl always frames rehydration as a **pain to eliminate**, not a feature to sell: legacy
restores _"often take 24+ hours"_ and Splunk archive restores hit a strict ~10% entitlement
cap. Cribl's answer is to **avoid rehydration altogether** — **Replay** (re-ingest only what
you need) and **search-in-place** (query the archive where it sits). _"With Cribl Search you
can instantly query your Lake DDSS dataset — no access delays, no rehydration."_
_(No dedicated glossary page; synthesized from Cribl's product/docs usage.)_
(https://docs.cribl.io/use-cases/usecase-replay/ , https://cribl.io/products/search/ , https://cribl.io/blog/from-archive-to-insight-ingest-splunk-ddss-data-directly-into-cribl-lake/)

### Replay
A Cribl Stream capability that lets you _"selectively ingest, and re-ingest, data into systems
of analysis."_ Keep full-fidelity telemetry in low-cost storage (S3, Azure Blob, Cribl Lake),
then use a Stream **Collector** to specify a time range and replay just the data an
investigation, backfill, audit, or migration needs — without recollecting from the original
sources. Can enrich on the way back. (https://docs.cribl.io/use-cases/usecase-replay/)

### Search-in-place / Federated search
**Search-in-place:** searching data where it already lives — at the edge, in flight, in Cribl
Lake, or in existing systems — _"without first moving or rehydrating it,"_ no indexing
required. **Federated search:** a mechanism that _"abstracts and unifies queries to multiple
data sources, relaying them as if they were a single query to a single database,"_ running
search-in-place against data stored elsewhere.
(https://docs.cribl.io/search/basic-concepts/ , https://cribl.io/glossary/federated-search/)

### Data tiering
_"A data management strategy… organizing and storing different types of data based on their
usage patterns,"_ moving cold/less-used data to cheaper tiers. High-value data → hot analytics
tools; low-value data → cheap object storage that stays searchable. The engine of the
cost-control story. (https://cribl.io/glossary/data-tiering/)

### Ingest / ingestion
Data being collected from sources and loaded into a tool or lake — _"the first stage"_ of a
pipeline (source → transform/enrich → destination). Big analytics tools bill by ingest volume,
which is why controlling it is worth real money. (https://cribl.io/glossary/data-pipeline/)

### Index / indexing
_(No standalone official definition.)_ Indexing is the compute-heavy downstream step that
organizes ingested data so it can be searched fast — part of why SIEM storage costs far more
than plain storage. Cribl's differentiator: Search runs federated queries _"with no onboarding
or indexing required."_ (https://docs.cribl.io/search/about/)

### Telemetry
_"The automated collection and transmission of data from remote sources… the 'input' end of an
observability pipeline."_ Logs + metrics + traces — the raw material of both security and IT
monitoring. (https://cribl.io/glossary/telemetry/)

### SIEM (Security Information and Event Management)
_"A cybersecurity tool that aggregates and analyzes security-related data from various sources
in real-time"_ — combining log collection/storage (SIM) with real-time monitoring, event
correlation, and alerting (SEM). Bills on ingest. Say it "sim." (https://cribl.io/glossary/siem/)

### Observability
Answers _"What's going on inside the system?"_ — the ability to interrogate an environment by
analyzing the **logs, metrics, and traces** it emits, including questions you didn't know to
ask in advance. (https://cribl.io/blog/observability-vs-monitoring-vs-telemetry/)

### Agent / forwarder
A lightweight shipper installed near the data source to collect and forward its data.
Historically every vendor required its own — hence "agent fatigue." Cribl's agent is **Cribl
Edge**, positioned as a vendor-neutral **Universal Forwarder alternative**.
(https://docs.cribl.io/stream/usecase-logging-agents/ , https://cribl.io/blog/cribl-edge-a-universal-forwarder-alternative/)

### Egress
_(No standalone official definition.)_ Outbound data movement — data **leaving** the system
through Destinations, which clouds charge for. Cribl reduces egress cost by filtering/reducing
data before it leaves and by processing data where it lives. (https://docs.cribl.io/reference-architectures/cva-network-egress/)

### DDSS (Splunk Dynamic Data Self Storage)
_"Splunk's feature that allows users to archive petabytes of data to S3 to save on hot and
archive storage costs."_ The flagship anti-Splunk proof point: Cribl Lake can **ingest DDSS
data directly**, and Cribl Search then **queries it instantly — no rehydration** — bypassing
Splunk's slow (24+ hr) restores and ~10% entitlement cap.
(https://cribl.io/glossary/dynamic-data-self-storage-ddss/ , https://docs.cribl.io/lake/splunk-cloud/)

### Data lake
_"A centralized repository that stores raw data in its native format, without the constraints
of predefined structures."_ Cribl's managed version is **Cribl Lake**.
(https://cribl.io/glossary/data-lakes/)

### Schema-on-read (and Cribl's "schema-on-need")
**Schema-on-read:** store data as-is with no predefined schema and apply structure only at
query time — cheaper and more agile than schema-on-write (no heavy upfront ETL). Cribl's own
variant, **schema-on-need**, _"automatically transform[s] data into the format required as you
route it."_ (https://cribl.io/glossary/schema-on-read/ , https://cribl.io/glossary/schema-on-need/)

### Cribl deployment vocabulary
- **Worker Node:** a Cribl Stream instance that does the data processing.
- **Worker Group:** a set of Workers sharing one config (often mapped to a region/business
  unit); config is deployed at the group level.
- **Leader Node:** the control-plane instance that centrally authors config and monitors all
  Workers (Workers poll it ~every 10s).
- **Fleet:** the Edge equivalent of a Worker Group — Edge Nodes sharing one config.
- **Routes / Pipelines / Functions / Packs:** see Cribl Stream above.
(https://docs.cribl.io/stream/deploy-distributed/ , https://docs.cribl.io/edge/fleets/)

---

## 3. Deployment & compliance

### Deployment models
- **Cribl.Cloud (SaaS):** Cribl hosts the Leader and (optionally) Workers/Edge Nodes.
- **On-prem / self-hosted:** you run everything (Leader + Workers) in your own DCs or cloud.
- **Hybrid:** Leader/control plane in Cribl.Cloud; **Workers run in your own infrastructure**
  so _"sensitive data stays within your controlled environment."_ **Connected Environments**
  link on-prem Stream/Edge to a Cribl.Cloud instance for unified management while still using
  cloud-only Lake and Search.
(https://docs.cribl.io/stream/deploy-cloud/ , https://docs.cribl.io/reference-architectures/arch-hybrid-planning/ , https://docs.cribl.io/stream/cloud-connected-env/)

### Data residency
Cribl-managed Worker Groups run in **AWS or Azure** across multiple regions (US East/West,
Canada Central, Frankfurt, London/UK South, Sydney, Paris, etc. — treat the list as
approximate, region availability changes). The **Org's home region is set at registration and
can't be changed**, but you can add Worker Groups in other regions to process data in-region.
⚠️ [verify region list on live docs] (https://docs.cribl.io/stream/cloud-workers/)

### Government & compliance — **state these exactly**
- **FedRAMP: MODERATE — AUTHORIZED (ATO granted Jan 29, 2026)** via **Cribl.Cloud
  Government**, listed on the FedRAMP Marketplace. (Was **"In Process"** as of Sept 17, 2025 —
  so **say "Authorized," not "In Process."**) Built on **FedRAMP-Moderate AWS Commercial
  US-East/US-West — NOT AWS GovCloud.** Products in scope: Stream, Edge, Lake, Search.
  _"More than 20 U.S. federal agencies already use Cribl."_
  (https://cribl.io/news/cribl-achieves-fedramp-authority-to-operate-for-us-federal-government-agencies/ , https://docs.cribl.io/fedramp/)
- **No FedRAMP High. No DoD IL4 / IL5.** None claimed on any Cribl page — **do not claim
  these.** (The on-prem product makes a future higher-bar path *possible*, but it isn't there.)
- **SOC 2 Type II** — since June 2022; current reports on the trust portal.
  (https://trust.cribl.io/certifications/soc2type_2)
- **ISO 27001:2022** — achieved Dec 2023; scope covers Stream, Edge, Search, and Cribl.Cloud.
  (https://trust.cribl.io/certifications/iso27001)
- **HIPAA / GDPR / PCI / CCPA** — Cribl **helps customers comply** (via Cribl Guard); these are
  **not** certifications Cribl itself holds. **Never say "Cribl is HIPAA/PCI certified"** — say
  "Cribl helps you meet" those. (https://docs.cribl.io/guard/)
- **Trust portal** for the actual documents: https://trust.cribl.io/

---

## 4. Use cases / initiatives (Cribl's official GTM)

Cribl markets these under `cribl.io/solutions/initiatives/`. **Cost control is the door-opener**
(most prominent, most repeated claim); everything else is the land-and-expand.

- **Cost control / slash storage costs** — telemetry doubling costs ~every 18 months;
  _"reduce telemetry 50% or more before sending to costly platforms,"_ reclaim budget via
  tiering. (https://cribl.io/solutions/initiatives/cost-control/)
- **SIEM migration & optimization** — feed legacy + new SIEM **simultaneously** to de-risk the
  cutover; cited example: a $900K/yr Splunk license cut to $200K. (https://cribl.io/solutions/initiatives/siem-migration-and-optimization/)
- **SIEM augmentation** — route critical data to the SIEM, full-fidelity copy to tiered
  storage; query everything with Search. (https://cribl.io/solutions/initiatives/siem-augmentation/)
- **SOC modernization** — _"Control Data, Ready for AI"_: a vendor-neutral telemetry control
  plane in front of SIEM, XDR, lakes, and the AI stack — modernize _"without ripping out your
  existing stack."_ (https://cribl.io/solutions/initiatives/soc-modernization/)
- **Investigations** — _"Faster incident investigations and root cause analysis with unified
  search, AI-ready telemetry, and cost-efficient pipelines"_ (the "10x Investigations" story).
  (https://cribl.io/solutions/initiatives/investigations/)
- **Platform engineering / SRE** — keep high-value data hot, tier the rest, speed MTTI/MTTR.
  (https://cribl.io/solutions/initiatives/platform-engineering/)
- **Telemetry as a shared service** — _"governed, multi-tenant shared service,"_ golden
  pipelines + self-service workspaces _"without becoming a gatekeeper."_
  (https://cribl.io/solutions/initiatives/telemetry-as-a-shared-service/)
- **AI readiness** — _"AI and LLM readiness is fundamentally data readiness… start by fixing
  the telemetry layer, not replacing every tool,"_ governance enforced at the data layer.
  (https://cribl.io/ai-readiness/)
- **Data lake strategy / data tiering** — Cribl Lake as _"the industry's first turnkey data
  lake,"_ turning telemetry _"from a budget drain into a strategic asset."_
  (https://cribl.io/solutions/initiatives/data-lake-strategy/)
- **Compliance / redact sensitive data** — Cribl Guard masks/redacts/encrypts PII before it
  reaches the destination. (https://cribl.io/solutions/use-cases/redact-sensitive-data/)
- **Also:** agent consolidation, application sprawl, cloud migration.
  (https://cribl.io/solutions/initiatives/agent-consolidation/)

---

## 5. Customers & proof points (official, attributed)

| Customer | Result | Source |
|---|---|---|
| **Autodesk** | **93% savings on data costs** with Stream | https://cribl.io/customers/autodesk/ |
| **TransUnion** | DNS/Sysmon logging cut **~1TB/day → ~150GB/day (~85%, ~20x)**; sub-second firewall search over billions of daily events | https://cribl.io/customers/transunion/ |
| **Sally Beauty** | **41% EDR reduction** — 9.25TB/day → ~5TB/day _(this is the unnamed "41% EDR" stat already in the course)_ | https://cribl.io/customers/sally-beauty/ |
| **Security Risk Advisors** | **SIEM costs cut 80%**; 60%+ on Windows Event Logs | https://cribl.io/customers/sra/ |
| **Finality** | **250% faster threat detection**; ~47% Windows Events reduction | https://cribl.io/customers/finality/ |
| **Nutanix** | Firewall log consumption **~50% reduction** | https://cribl.io/solutions/use-cases/reduce-size-of-data/ |

Aggregate: _"Cribl Stream customers reduce data volumes by 25% or more."_
(https://cribl.io/solutions/use-cases/reduce-size-of-data/)

---

## 6. Company stats & funding  ⚠️ [all fast-moving — verify before quoting]

From the **~Feb 2026** "$300M ARR" release
(https://cribl.io/news/cribl-surpasses-usd300-million-in-arr-powering-the-essential-infrastructure/):
- **Surpassed $300M ARR**, growing **>40% YoY**.
- **Cloud ARR over $130M, growing >75% YoY.**
- **$500K+ ARR customers up >50%**; total customer base **up >25% YoY**.
- **~50% of the Fortune 100; ~35% of the Fortune 500.**

> **Reconcile with the course canon:** the app's `KNOWLEDGE` cites **"$339M ARR (per Ami)"**.
> Cribl's official press number is **"surpassed $300M"** (a deliberately round, conservative
> milestone). Not a contradiction — ARR is a moving target and Ami may have shared a more
> current internal figure — but if pressed, the safely-citable public number is **$300M+**.

Trajectory / context:
- **$200M ARR, +70% YoY** (Jan 22, 2025): **43 of the Fortune 100, 130 of the Fortune 500**,
  NDR **>130%**, multi-product customers up 200%+.
  (https://cribl.io/news/cribl-surpasses-200m-in-arr-growing-more-than-70-percent-year-over-year/)
- **$100M ARR in <4 years** (Oct 2023): _"fourth-fastest infrastructure company to reach
  centaur status."_ _(Note: the course's "4th-fastest to $100M" phrasing — official wording is
  "4th-fastest infra company to centaur status.")_
  (https://cribl.io/news/cribl-surpasses-100m-in-annual-recurring-revenue-in-less-than-four-years/)
- **Series E: $319M at a $3.5B valuation** (Aug 27, 2024), led by **GV (Google Ventures)**;
  total raised **>$600M**. (https://cribl.io/news/cribl-announces-319m-series-e/)
- Recognition: 2025 Forbes Cloud 100; #1 Forbes America's Best Startup Employers 2025.

---

## 7. Market & competitive positioning (Cribl's own words)

- **Self-framing:** _"the data engine for IT and Security"_ / _"The AI Platform for
  Telemetry"_ / _"powering the essential infrastructure for the AI era."_ Central theme:
  **vendor-neutral**, _"choice, control, and flexibility… no lock-in, no data loss, no
  compromises."_ (https://cribl.io/ , https://cribl.io/avoid-vendor-lock-in/)
- **Control plane:** _"a single, unified control plane for telemetry… you decide what data
  goes where, in what shape, and at what cost."_ (https://cribl.io/solutions/initiatives/soc-modernization/)
- **Composability vs. platformization:** Cribl reframes the consolidation debate and lands on
  **composability** — _"Platformization promises simplicity through one vendor… but it often
  sacrifices agility and innovation. A composable SIEM empowers you to embrace both choice and
  control."_ A deliberate counter to single-vendor pitches. The consolidation Cribl *does*
  endorse: **agent consolidation** and "collect once, search anywhere."
  (https://cribl.io/blog/engineering-for-a-composable-siem-architecture/)
- **Coopetition** (partner with rivals): **Palo Alto Networks** (Cortex XSIAM integration),
  **CrowdStrike** (Falcon Next-Gen SIEM), plus the **Technology Alliance Partner (TAP)**
  program — Microsoft, Wiz, Grafana, Corelight, Gigamon, and more. Cribl routes both to and
  around vendors who are also competitors. (https://cribl.io/partners/tap/)
- **Channel:** _"the RIGHT partners, not EVERY partner"_; a **partner-first** org. Key
  differentiator: _"Cribl isn't asking partners to sell their products instead of other
  vendors"_ — it unlocks value from a customer's existing tools rather than ripping them out.
  (https://cribl.io/partners/)
- **Vs. status quo / DIY:** the alternative Cribl argues against is tightly-coupled,
  lock-in-prone architectures where ingestion is bound to one analytics platform; its pitch is
  **decoupling** so you _"evolve your stack without re-architecting everything."_ _(No explicit
  "vs. DIY open source" comparison page found on cribl.io.)_

---

## 8. Numbers to re-verify before quoting (volatile)

| Fact | Why it drifts |
|---|---|
| ARR ($300M+), growth (>40%), Cloud ARR ($130M/75%) | Updated each milestone release |
| Fortune 100 (~50%) / Fortune 500 (~35%) | Updated each release |
| Valuation ($3.5B) / total raised ($600M+) | Dates to Aug 2024 Series E |
| Stream "80+ sources/destinations" | Integration count grows |
| Stream "billions of events/sec, sub-ms latency" | Single marketing source |
| Edge "up to 250,000 nodes" | Headline figure, single source |
| Lake BYOS "0.02 credits/GB/mo" | Pricing |
| Cribl.Cloud free tier "1TB/day" | Allowance |
| Guard "200+ rules", GA month | "First release" count; year unstated |
| FedRAMP status | **Currently Moderate/Authorized (Jan 2026)** — re-confirm it hasn't advanced |

> **Method note:** during research, direct page fetches of `cribl.io` returned HTTP 403, so
> exact quotes were captured from Cribl's own search-indexed page content. Wording is faithful;
> if you need a tagline verbatim for customer-facing collateral, eyeball the live page first.
