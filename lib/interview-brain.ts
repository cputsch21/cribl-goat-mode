// Shared knowledge for every AI brain in GOAT Mode: the text Practice Room,
// the Gauntlet interviewer personas, the post-call judge, and the helper panel.
// Facts are sourced from cribl.io and Chris's interview transcripts — nothing invented.

export const KNOWLEDGE = `
FACTS YOU MAY USE (sourced from cribl.io and Chris's interview transcripts — do not invent beyond these):

WHAT CRIBL IS: The control layer between where machine data (telemetry) is created and everywhere it goes — SIEMs, observability tools, cheap storage, AI systems. Collect once, cut junk, mask sensitive data, enrich, route anywhere in the right format. 80+ sources/destinations. Not a rip-and-replace; makes existing tools cheaper and better. Exec trio: choice, flexibility, control.

PRODUCTS: Stream (pipeline engine — reduce/shape/enrich/mask/route/replay, petabyte scale). Edge (one vendor-neutral collection agent, fleet-managed up to 250,000 nodes from one console). Search (search-in-place/federated — query S3, lakes, edge without moving data; 10x faster investigations). Lake (low-cost open-format telemetry storage, "easy in, easy out", replay, BYOS). Cribl.Cloud, on-prem, or hybrid (workers live where data lives; avoids egress). FedRAMP Moderate authorized; NOT yet IL5. Cribl Guard masks sensitive data before it leaves the customer network. AI Copilot helps build pipelines.

PROOF: 50% of the Fortune 100 (cribl.io). $339M ARR, ~40% YoY growth (per Ami). 4th-fastest software company to $100M ARR, ~1,500 customers (per Patrick). Cases: Nutanix cut firewall log volume 50%; 41% EDR data reduction (9.25TB→5TB daily); Reddit, Sophos, ServiceNow, Accenture Federal Services, Cox Automotive, Hughes, Pegasystems. Use cases: Cost Control (door-opener), SIEM Migration, SOC Modernization, Investigations, Site Reliability, Telemetry as a Shared Service.

MARKET: Platformization wars — Palo Alto from the firewall, CrowdStrike from the endpoint, Datadog from metrics, Splunk/Cisco from the SIEM. Cribl = the neutral data layer: control the pipes and any platform decision is reversible. Real competition: status quo, DIY open source, vendors' bundled pipelines (which exist to lock data in). Never trash-talk. AI story: AI readiness / governance / compliance; agentic SOC tools need governed, masked, relevant telemetry.

SALES SYSTEM: Force Management Command of the Message (current state → negative consequences; future state → positive business outcomes; required capabilities; metrics; tied to corporate objectives) + MEDDPICC. Patrick's cadence: 10 emails + 10 calls + 10 LinkedIn daily, 2 partner meetings/week, 4 field events/month, in person whenever possible. Existing accounts: tier, day-in-the-life listening tour with engineers, QBR rhythm, exec alignment. Chris's 4-layer plan: live pipeline → top-20 strategic targets → Philly network → creative cold (video, pattern interrupt).

CHANNEL (Kat's world): ~95% channel-driven (Ami; Patrick says 100%). Partner-first; "the RIGHT partners, not EVERY partner" (cribl.io). Partners: SHI (volume giant), Optiv & GuidePoint (security specialists), Presidio & Ahead (infrastructure), Trace3, Carahsoft (gov — pairs with FedRAMP), GSIs Accenture/Deloitte, AWS/Microsoft marketplaces. Palo Alto is BOTH a rival and a technology partner (coopetition). Deal registration is sacred. Partner-sourced vs. influenced. MDF funds events. Kat Hummel = Partner Business Manager, hired by Ami ("very connected, very professional, very kind"). Chris has real friends at SHI, Ahead, Presidio, ModernOps — to be used under Kat's game plan, not around her.

SE WORLD (Cam's world): Cam Borgl leads SEs. Coverage per Patrick: 2 Philly, 1 Pittsburgh, 3 DMV. SEs do technical discovery, tailored demos, POVs, architecture. AE owns why/who/money/process; SE owns how/proof; discovery is shared. POV gate: written success criteria + timebox + exec sponsor + champion. Cardinal sins: unqualified demos, no pre-call brief, overpromising features/roadmap, demo-monkey treatment, going dark after POVs.

CHRIS'S STORY: 8 years B2B sales (employee benefits — brokers were the channel), 6 years startup founder (bootstrapped, exited early 2025), moved family back to Philly, four kids. Philly native, Penn State, played hockey (center). No industry experience — his policy is total honesty: never bluff; "I don't know that one yet, here's how I'd find out, and that's when I'd bring my SE in." He built this very study system to close the gap fast.
`;

// What Chris has actually said in his real interviews — the canon his answers
// should stay consistent with. Tim (the peer round) and the Game 7 levels
// probe against this; the judge checks for contradictions.
export const CANON = `
CHRIS'S CANON (what he has already told Patrick and Ami — his answers must stay consistent with this):

STORY ARC: 8 years employee-benefits B2B sales (Philly rookie territory, then Pittsburgh; brokers were the channel; ~5% close rates taught him rejection). 6 years startup founder — bootstrapped, sold the first company in early 2025, second one wound down after his family's medical year. Moved from Austin back to Philly (Newtown Square) for Children's Hospital; four kids including a newborn. Not retreating from founding — choosing: "I ran the whole army for six years; now I want to be a sniper on a bigger one." Eat-what-you-kill mentality; money for his family is the honest #1 motivator.

TERRITORY PLAN (the 4 layers, weighted in order): 1) deals already in the pipeline get the most time, 2) top-20 strategic targets with real account files, people plans, and a named partner angle each, 3) his Philly network (born and raised, Penn State, benefits relationships, founder network), 4) creative, personalized cold outreach — video prospecting and pattern interrupts (a video is literally how he got Patrick's attention).

OPERATING SYSTEM: Force Management gap language (current state → negative consequences → future state → business outcomes) + MEDDPICC as a diagnostic, not a checklist. Patrick's cadence as the floor: 10 emails + 10 calls + 10 LinkedIn daily, 2 partner meetings a week, 4 field events a month. Personal bar: ~10 in-person meetings a month. Existing accounts: tier them, listening tour ("day in the life") with engineers, make customers feel they got an upgrade, QBR rhythm, exec alignment.

HONEST-GAP POLICY: he cannot and will not bluff — "I'm not a good bullshitter; I prepare instead." When he hits the edge of his knowledge: "I don't know that one yet, I'd rather tell you that than guess — here's how I'd find out, and in a deal that's when I'd bring my SE in."

CHANNEL INSTINCTS: deal registration is sacred; partners must win for him to win (learned in benefits where the broker WAS the channel); personal friends at SHI, Ahead, Presidio, ModernOps — deployed under Kat's game plan, never around her; Ami's homework was calling partner friends to ask how Cribl shows up.

SE CONTRACT: qualify before spending SE hours; written pre-call brief (who's in the room, what they care about, what we're driving to); POV only with success criteria + timebox + exec sponsor + champion; debrief after every call and POV; never commit features or roadmap dates.

PERSONALITY: hockey player (center), competitive, self-aware about impatience ("my biggest weakness — I rein it in so it doesn't read as pushy"), organized and process-driven, strong in person, builds relationships easily but learned early that relationships with the wrong people waste time — map the whole buying committee, formal and informal power.

SELF-RATINGS HE'S GIVEN: leaders would say — very hard worker, likable/easy to work with, loyal and trustworthy, problem solver who thinks outside the box. Strengths: big-picture problem solving, cutting through noise, preparation-driven confidence, relationship building across a committee. Weaknesses: impatience; can't wing it without preparation.
`;
