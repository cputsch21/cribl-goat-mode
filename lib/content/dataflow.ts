// Goat Trail — the end-to-end journey of observability data, and where Cribl
// sits in it. Each stage carries two realities: `legacy` (the world without
// Cribl) and `cribl` (the world with Cribl as the control plane). The page at
// /goat-trail flips between them with a single toggle.
import {
  Server,
  Antenna,
  SlidersHorizontal,
  Split,
  Database,
  Telescope,
  type LucideIcon,
} from "lucide-react";

export interface TrailTerm {
  term: string;
  /** Plain-English definition shown in a tooltip. */
  def: string;
}

export interface TrailStage {
  id: string;
  /** Headline shown in the detail panel. */
  title: string;
  /** Short caption under the node. */
  label: string;
  icon: LucideIcon;
  /** One-line plain-English summary. */
  blurb: string;
  /** The "Without Cribl" reality at this stage. */
  legacy: string;
  /** The "With Cribl" reality at this stage. */
  cribl: string;
  /** Only true for the Cribl Stream stage — the highlighted control plane. */
  isControlPlane?: boolean;
  /** Real terminology, surfaced as tooltip chips in the detail panel. */
  terms?: TrailTerm[];
}

export const DATAFLOW_STAGES: TrailStage[] = [
  {
    id: "sources",
    title: "Data is born",
    label: "Sources",
    icon: Server,
    blurb:
      "Every server, firewall, cloud app, container and endpoint constantly emits telemetry — logs, metrics and traces.",
    legacy:
      "Hundreds of systems spew raw telemetry in every imaginable format. Nobody decides what's worth keeping — it all just flows.",
    cribl:
      "Same firehose of sources, but now there's a plan for it. You'll decide value before paying to store it.",
    terms: [
      {
        term: "Telemetry",
        def: "The machine data systems emit about themselves — logs, metrics and traces.",
      },
      {
        term: "Logs / Metrics / Traces",
        def: "The three pillars of observability data: events, measurements over time, and request paths.",
      },
    ],
  },
  {
    id: "collection",
    title: "Data gets collected",
    label: "Collection",
    icon: Antenna,
    blurb:
      "Agents installed on each system pick up the telemetry and ship it onward.",
    legacy:
      "Agent sprawl: a Splunk forwarder here, a Datadog agent there, a CrowdStrike sensor, vendor agents everywhere — each one its own thing to install, update and pay for.",
    cribl:
      "One Cribl Edge agent collects it all and hands it to the control plane — fewer agents, less endpoint overhead, vendor-neutral.",
    terms: [
      {
        term: "Agent sprawl",
        def: "Running many vendor-specific agents on every host — heavy to manage and to license.",
      },
      {
        term: "Cribl Edge",
        def: "Cribl's single, lightweight agent for collecting telemetry from endpoints.",
      },
      {
        term: "Forwarder",
        def: "A tool (e.g. the Splunk Universal Forwarder) that ships data from a host to a destination.",
      },
    ],
  },
  {
    id: "stream",
    title: "The control plane",
    label: "Cribl Stream",
    icon: SlidersHorizontal,
    isControlPlane: true,
    blurb:
      "Cribl Stream is the point of control between sources and destinations — where you shape data in flight.",
    legacy:
      "There is no control point. Raw data flows straight through to expensive tools untouched — no parsing, no masking, no trimming. What you collect is what you pay to store.",
    cribl:
      "Collect once, then parse, normalize, enrich, mask sensitive fields and drop the noise — all in flight, before anything hits a paid destination.",
    terms: [
      {
        term: "Cribl Stream",
        def: "Cribl's pipeline that sits between sources and destinations to route and shape data in motion.",
      },
      { term: "Parse", def: "Turn raw text into structured fields you can act on." },
      {
        term: "Normalize",
        def: "Standardize fields across different sources so they line up (e.g. a common schema).",
      },
      {
        term: "Enrich",
        def: "Add context — geo-IP, asset owner, threat intel — to events as they pass through.",
      },
      {
        term: "Mask / Redact",
        def: "Hide or remove sensitive data (PII, secrets) before it ever lands downstream.",
      },
    ],
  },
  {
    id: "routing",
    title: "Routed by value",
    label: "Route & Tier",
    icon: Split,
    blurb:
      "Data is directed to the right place based on how valuable it is — not blindly into one bucket.",
    legacy:
      "One pipe, one destination: everything raw gets shoved into the SIEM at full volume. Cost scales with noise, and there's no cheap copy to fall back on.",
    cribl:
      "Send a trimmed, high-value stream to the SIEM, a full-fidelity copy to cheap object storage / Cribl Lake, and metrics to your observability tool — each gets exactly what it needs.",
    terms: [
      {
        term: "Data tiering",
        def: "Matching data value to storage cost — hot/expensive for the critical slice, cheap for the rest.",
      },
      {
        term: "Routes",
        def: "Rules in Cribl Stream that decide which data goes to which destination.",
      },
      {
        term: "Full fidelity",
        def: "An untouched, complete copy of the data kept cheaply in case you need it later.",
      },
    ],
  },
  {
    id: "destinations",
    title: "Data lands",
    label: "Destinations",
    icon: Database,
    blurb:
      "Telemetry arrives at the systems where teams actually use it — and at storage for everything else.",
    legacy:
      "The pricey SIEM is the only real home, so ingest and license costs balloon. Adding a new tool means re-plumbing every source to it.",
    cribl:
      "Any destination, swappable at will: Splunk or Sentinel, Datadog or Elastic, S3 and Cribl Lake — point the routes, no re-plumbing of sources.",
    terms: [
      {
        term: "SIEM",
        def: "Security Information & Event Management — e.g. Splunk, Microsoft Sentinel.",
      },
      {
        term: "Object storage",
        def: "Cheap, durable bulk storage like Amazon S3 — ideal for full-fidelity copies.",
      },
      {
        term: "Cribl Lake",
        def: "Cribl's turnkey, searchable data lake for cheap long-term retention.",
      },
    ],
  },
  {
    id: "outcomes",
    title: "Data delivers value",
    label: "Outcomes",
    icon: Telescope,
    blurb:
      "Finally the data does its job — powering security, observability and AI.",
    legacy:
      "Investigations stall on data that was dropped to save money, or that's locked in one vendor. Old data is gone, and feeding AI means dumping a raw, ungoverned firehose at it.",
    cribl:
      "Search in place across tiers, replay archived data on demand for an investigation, and feed AI governed, masked, well-shaped data — without vendor lock-in.",
    terms: [
      {
        term: "Cribl Search",
        def: "Query data where it already lives (search-in-place) instead of moving it first.",
      },
      {
        term: "Replay",
        def: "Rehydrate archived data from cheap storage back into a tool on demand.",
      },
      {
        term: "AI-ready data",
        def: "Governed, masked, normalized data that's safe and useful to feed to AI systems.",
      },
    ],
  },
];

export type TrailMode = "legacy" | "cribl";

/** Relative data-volume-into-SIEM and cost figures (0–100) driving the meter. */
export const COST_BY_MODE: Record<
  TrailMode,
  { volume: number; cost: number }
> = {
  legacy: { volume: 100, cost: 100 },
  cribl: { volume: 45, cost: 30 },
};
