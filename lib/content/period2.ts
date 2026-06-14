import type { CourseModule } from "./types";

export const M5: CourseModule = {
  id: "m5",
  period: 2,
  number: 5,
  title: "The Buyers",
  tagline: "Five personas, one product, five different conversations",
  minutes: 12,
  cards: [
    {
      id: "m5c1",
      title: "It's a committee, not a person",
      paragraphs: [
        "You already told Patrick this and he loved it: enterprise deals are consensus buys — four or five people minimum have to say yes, and you can waste months building a great relationship with someone who can't sign. Your job is to map the whole committee early.",
        "Patrick's addition: map the formal power (titles, org chart) AND the informal power — who actually has juice, whose opinion the CISO trusts. Partners often know the informal map better than anyone inside the account.",
      ],
      sayThis:
        "I learned the hard way early in my career: you can build a great relationship with the wrong person. Now the first thing I build is a map of the whole buying committee — formal and informal power.",
      source: "chris",
    },
    {
      id: "m5c2",
      title: "The CISO / CIO",
      paragraphs: [
        "What they care about: risk, cost, audit and compliance, vendor strategy, and lately AI readiness. They're being pitched platformization from every direction and they're under budget pressure.",
        "Patrick's exec-level message, almost verbatim: you get full choice, flexibility, and control over your data strategy — so you can use data as a strategic advantage for risk, visibility, audit, and compliance, and keep the company running safely, soundly, securely.",
      ],
      sayThis:
        "For a CISO it's one sentence: control your data layer and every platform decision becomes reversible — choice, flexibility, and control over the whole data strategy.",
      source: "patrick",
    },
    {
      id: "m5c3",
      title: "The VP of Observability / IT leadership",
      paragraphs: [
        "What they care about: tool sprawl, team toil, uptime and SLAs, and the migration projects they're scared to start. Their teams spend enormous time wiring data feeds instead of improving reliability.",
        "The message: onboard new data sources in hours instead of weeks, cut the plumbing toil, and make migrations safe — run old and new side-by-side. Hughes (from the case studies) is the reference: their observability team finally stopped saying no to requests.",
      ],
      sayThis:
        "For the VP of observability: your team stops being a plumbing crew. New sources in hours, migrations without fear, and capacity to say yes again.",
      source: "cribl.io",
    },
    {
      id: "m5c4",
      title: "The architect",
      paragraphs: [
        "What they care about: where data lives, how it flows, what happens when the company adopts the next tool — and increasingly, how the AI stack will plug in. They hate one-way doors.",
        "Patrick's architect message: you get a complete picture of where all the data lives and where it's going, and you can bring on new technologies as they come online in the AI era — without re-architecting anything.",
      ],
      sayThis:
        "For an architect: Cribl makes every data flow visible and every destination swappable — it's the layer that future-proofs the stack for whatever comes next.",
      source: "patrick",
    },
    {
      id: "m5c5",
      title: "The engineer (hands on keyboard)",
      paragraphs: [
        "What they care about: getting data in is a pain — agents on every box, parsing and normalizing for each tool, 2am pages when feeds break. They're the ones who'll actually use Cribl daily, and they make or break the technical evaluation.",
        "Patrick's engineer message: you control all the integrations and decide where data goes — one place to manage what used to be fifty scripts. These are also the people he sends new AEs to first: the day-in-the-life listening tour. They know the truth about the account.",
      ],
      sayThis:
        "For the engineer: one control plane instead of fifty scripts and five agents. You decide what goes where, and getting data in stops being your whole job.",
      source: "patrick",
    },
    {
      id: "m5c6",
      title: "Drill: same product, five sentences",
      paragraphs: [
        "The interview version of this skill: when Kat or Cam asks 'who do you call on?', don't just list titles — show you'd say something different to each. That's what separates a real enterprise seller from someone reading the org chart.",
        "CISO: control and reversibility. CIO: cost and strategy. VP: toil and capacity. Architect: visibility and future-proofing. Engineer: one control plane, less pain. Multi-thread from day one — and use partners to find the informal power.",
      ],
      sayThis:
        "The pitch changes per seat: the CISO buys control, the VP buys capacity back, the architect buys reversibility, the engineer buys fewer 2am pages. Same product, four different conversations.",
      source: "craft",
    },
  ],
  quiz: [
    {
      id: "m5q1",
      prompt: "'Choice, flexibility, and control over the data strategy' is the message for:",
      options: [
        { text: "The hands-on engineer" },
        { text: "The CISO / CIO", correct: true },
        { text: "The procurement team" },
      ],
      explain:
        "That's Patrick's executive pitch verbatim. Execs buy strategic control and reversibility; engineers buy relief from plumbing pain. Match the altitude to the seat.",
    },
    {
      id: "m5q2",
      prompt: "'One control plane instead of five agents and fifty scripts' lands best with:",
      options: [
        { text: "The CFO" },
        { text: "The hands-on engineer", correct: true },
        { text: "The CISO" },
      ],
      explain:
        "The engineer lives the agent-sprawl, parsing, 2am-page pain daily. Talk toil reduction with them — save 'data strategy' language for the executives.",
    },
    {
      id: "m5q3",
      prompt: "Patrick sends a new AE to do a 'day in the life' first with:",
      options: [
        { text: "The CISO, to establish executive alignment immediately" },
        {
          text: "The hands-on-keyboard engineers — how they bought Cribl, what they love, hate, and wish for",
          correct: true,
        },
        { text: "Procurement, to understand the paper process early" },
      ],
      explain:
        "The listening tour starts at the keyboard: engineers tell you the truth, and their love/hate/wish list is where new use cases (white space) hide. Executive alignment comes after, via the QBR motion.",
    },
    {
      id: "m5q4",
      prompt: "Formal vs. informal power — why does it matter?",
      options: [
        {
          text: "The org chart shows titles, but deals are swung by whoever actually has juice — and partners often know that informal map best",
          correct: true,
        },
        { text: "It doesn't — enterprise deals follow the org chart" },
        { text: "Informal power only matters in small companies" },
      ],
      explain:
        "Patrick's phrase: figure out 'who has influence and who has juice.' The trusted architect may outweigh a VP. Partners, who live in these accounts year-round, are your shortcut to the informal map.",
    },
    {
      id: "m5q5",
      prompt:
        "You've got one enthusiastic engineer champion and no one else engaged. What's the risk?",
      options: [
        {
          text: "You're single-threaded — if your one contact leaves or gets overruled, the deal dies. Build the committee.",
          correct: true,
        },
        { text: "No real risk — a strong technical champion is all you need" },
        { text: "The risk is moving too fast — slow down with the engineer" },
      ],
      explain:
        "Your own hard-won lesson from the benefits days: a relationship with the wrong (or only one) person is a stepping stone, not a strategy. Four or five yeses make an enterprise deal.",
    },
    {
      id: "m5q6",
      prompt: "The VP of Observability's most resonant outcome:",
      options: [
        { text: "Audit-ready compliance reporting" },
        {
          text: "Team stops doing plumbing — new data sources in hours, migrations without fear, capacity to say yes again",
          correct: true,
        },
        { text: "Endpoint agent consolidation" },
      ],
      explain:
        "Toil and capacity are the VP's currency (the Hughes story: the team could finally say yes to requests). Compliance is the CISO's; agents are the engineer's daily pain.",
    },
    {
      id: "m5q7",
      prompt: "Why do architects specifically love the Cribl story?",
      options: [
        {
          text: "Every flow becomes visible and every destination swappable — no more one-way doors as the AI era adds new tools",
          correct: true,
        },
        { text: "It eliminates the need for architecture reviews" },
        { text: "It standardizes the company on a single vendor" },
      ],
      explain:
        "Architects hate irreversible decisions. Patrick's architect pitch: see where all data lives and goes, and onboard new technologies without re-architecting. Reversibility is the gift.",
    },
    {
      id: "m5q8",
      prompt:
        "Kat asks who you'd call on in a new account. The strongest shape of answer:",
      options: [
        { text: "'CISOs and CIOs — always start at the top.'" },
        {
          text: "'The whole committee, with a different message per seat — CISO buys control, VP buys capacity, architect buys reversibility, engineer buys relief. And I'd use partners to find the informal power.'",
          correct: true,
        },
        { text: "'Engineers first, always — they're the real buyers at Cribl.'" },
      ],
      explain:
        "Listing titles is table stakes; differentiated messaging per persona plus the partner-intel move is what an experienced enterprise seller sounds like. (Bonus: it weaves partners in — exactly what Kat wants to hear.)",
    },
  ],
  writeIn: [
    {
      id: "m5w1",
      prompt:
        "Kat asks who you'd call on in a new account. Give the strong, differentiated answer — not just a list of titles.",
      keyPoints: [
        "The whole buying committee — it's a consensus buy, four or five yeses, so multi-thread from day one",
        "A different message per seat: CISO/CIO buys control and reversibility (choice, flexibility, control)",
        "VP of Observability buys capacity back / less plumbing toil",
        "Architect buys visibility and reversibility (no one-way doors)",
        "Engineer buys one control plane / fewer 2am pages",
        "Use partners to find the informal power",
      ],
      model:
        "The whole committee, and I'd say something different to each seat — that's the difference between an enterprise seller and someone reading the org chart. The CISO buys control and reversibility — choice, flexibility, control. The VP of observability buys capacity back, their team stops being a plumbing crew. The architect buys reversibility, no more one-way doors. The engineer buys one control plane instead of fifty scripts and fewer 2am pages. Same product, four conversations — and I'd lean on partners to find the informal power.",
    },
    {
      id: "m5w2",
      prompt:
        "Why map both formal AND informal power in an account — and who's your shortcut to the informal map?",
      keyPoints: [
        "The org chart shows titles, but deals get swung by whoever actually has 'juice'",
        "The trusted architect can outweigh a VP",
        "Single-threading is fragile — if your one contact leaves or gets overruled, the deal dies",
        "Partners live in these accounts year-round — they know the informal map best",
      ],
      model:
        "The org chart tells you the titles, but deals get swung by whoever actually has juice — the architect the CISO trusts might outweigh a VP on paper. If I only know the formal map, I'm single-threaded, and the day my one contact leaves or gets overruled, the deal dies. The shortcut to the informal map is partners — they're in these accounts all year, so they know who really has influence.",
    },
    {
      id: "m5w3",
      prompt:
        "Patrick sends a new AE to do a \"day in the life\" first — with whom, and why does he start there?",
      keyPoints: [
        "Start with the hands-on-keyboard engineers",
        "They tell you the truth about the account",
        "Learn what they love, hate, and wish — that's where white space (new use cases) hides",
        "Executive alignment comes later, through the QBR motion",
      ],
      model:
        "He starts the listening tour at the keyboard — the hands-on engineers. They'll tell you the truth: how they bought Cribl, what they love, what they hate, what they wish it did. That love-hate-wish list is exactly where the white space — the next use cases — is hiding. Executive alignment matters too, but that comes later through the QBR rhythm.",
    },
  ],
};

export const M6: CourseModule = {
  id: "m6",
  period: 2,
  number: 6,
  title: "The System",
  tagline: "Force Management, MEDDPICC, and Patrick's playbook — speak it natively",
  minutes: 15,
  cards: [
    {
      id: "m6c1",
      title: "Force Management in one card",
      paragraphs: [
        "Ami told you directly: Cribl runs Force Management (they just rolled it out) plus MEDDICC. Force Management's core — 'Command of the Message' — is about selling the gap: where the customer is today (current state) and what it's costing them (negative consequences), versus where they could be (future state) and what that's worth (positive business outcomes). Then: what capabilities they need to get there, and how they'll measure success.",
        "Here's your cheat code — Patrick already quizzed you with this exact language in your first call: 'What's their current state? Negative consequences? Future state? How does it attach to their corporate objectives? What business outcomes are we driving?' Answer in that vocabulary and you sound like you've already been to their bootcamp.",
      ],
      sayThis:
        "I anchor every deal on the gap: current state and what it's costing them, future state and what it's worth — tied to their corporate objectives, with metrics we agree on up front.",
      source: "ami",
    },
    {
      id: "m6c2",
      title: "MEDDPICC, mapped to a Cribl deal",
      paragraphs: [
        "Metrics — the numbers that justify the deal: SIEM ingest cut 40%, investigations 10x faster. Economic buyer — who owns the budget (often the CISO or CIO). Decision criteria — how they'll judge (usually the proof-of-value success criteria). Decision process — the steps and dates to a signature. Paper process — legal, procurement, security review; where deals quietly die. Identify pain — the bleeding: indefensible bill, scary migration, AI mandate. Champion — the person who sells when you're not in the room. Competition — status quo, DIY, bundled pipelines.",
        "You name-dropped MEDDPICC to Patrick already. The trap now would be reciting letters; in the interviews, use it diagnostically — 'if a deal stalls, it's because one of these is missing, so I go find which one.'",
      ],
      sayThis:
        "I use MEDDPICC as a diagnostic — when a deal stalls, one of those boxes is empty. Usually it's the champion or the paper process, and that tells me exactly what to go fix.",
      source: "craft",
    },
    {
      id: "m6c3",
      title: "Patrick's playbook for existing accounts",
      paragraphs: [
        "He laid out his coaching sequence explicitly. 1) Tier the existing accounts. 2) Run the day-in-the-life listening tour with the hands-on engineers: how they bought Cribl, why, what they love, hate, wish — that's where white space (new use cases) hides. 3) Establish a quarterly cadence — QBRs where their leadership shows up, you make your contacts look good, and Cribl's specialist teams (Search, Lake) introduce new capabilities. 4) Executive alignment: bring Patrick or the VP in to build top-level relationships.",
        "The outcome of the motion: new use cases to run at existing business. Expansion isn't an accident — it's a calendar.",
      ],
      sayThis:
        "Existing accounts get a system: tier them, listening tour with the engineers, quarterly business reviews with their leadership in the room, and executive alignment — that's how white space turns into pipeline.",
      source: "patrick",
    },
    {
      id: "m6c4",
      title: "The PG math (pipeline generation)",
      paragraphs: [
        "Patrick is prescriptive about the baseline, and he'll expect you to know it: 10 emails + 10 phone calls + 10 LinkedIn messages to 10 people, daily. Two partner meetings a week. Four field marketing events a month. Do that and pipeline happens; do more and more happens.",
        "His style notes: take meetings in person — coffees and lunches 'spider' your network through the territory. 'Sell from your feet, not your seat.' Be a street rat — out hustling, mixing it up, building rapport. Your 10-in-person-meetings-a-month goal fits right into this; he confirmed it's realistic.",
      ],
      sayThis:
        "Ten emails, ten calls, ten LinkedIn touches a day; two partner meetings a week; four field events a month — that's the floor, not the ceiling. And as much of it in person as I can make happen.",
      source: "patrick",
    },
    {
      id: "m6c5",
      title: "Your 4-layer territory plan (the one you already pitched)",
      paragraphs: [
        "Patrick responded well to this — keep telling it the same way. Layer 1: deals already in the pipeline — they get the most time, transition them carefully. Layer 2: the top-20 strategic targets — build account files, people plans, and partner angles for each. Layer 3: your network — Philly born and raised, Penn State, eight years of benefits relationships, founder network. Layer 4: strategic cold outreach — personal, creative, pattern-interrupt (your video play that got Patrick's attention), never spray-and-pray.",
        "Time-weight them in that order. When Tim asks about your process, this is the spine of the answer too — they will compare notes.",
      ],
      sayThis:
        "Four layers: live pipeline first, then a top-20 target list with real account plans, then my Philly network, then creative cold outreach — weighted in that order.",
      source: "chris",
    },
    {
      id: "m6c6",
      title: "Demand generator, not demand servicer",
      paragraphs: [
        "Patrick's sharpest filter: there are sellers who generate demand and sellers who service demand someone else created — and the second kind 'flop very quickly' at Cribl because you're activating people who don't know what Cribl is yet. Buyers need to hear the story six, seven, eight times. His metaphor: the gritty defensive lineman who gets hit every snap and is ready when the hole opens.",
        "Your counter-evidence when this comes up: founder life was 100% demand generation — five-percent close rates, fundraising rejections, no inbound anything. You've already lived the grit; now it gets a system.",
      ],
      sayThis:
        "I know the difference between generating demand and servicing it — I spent six years where nothing happened unless I made it happen. The 10-10-10 baseline is just structure around what I already do.",
      source: "patrick",
    },
  ],
  quiz: [
    {
      id: "m6q1",
      prompt: "The core of Force Management's 'Command of the Message':",
      options: [
        {
          text: "Sell the gap: current state and its negative consequences vs. future state and its positive business outcomes — tied to corporate objectives, with agreed metrics",
          correct: true,
        },
        { text: "A scripted demo flow that every rep follows identically" },
        { text: "Lead every deal with maximum discounting authority" },
      ],
      explain:
        "Current state → pain → future state → outcomes, attached to what the company is publicly trying to do. Patrick used this exact vocabulary unprompted in your first call — mirror it.",
    },
    {
      id: "m6q2",
      prompt: "A deal is signed-off technically but has sat in 'legal review' for five weeks. Which MEDDPICC letter did you under-work?",
      options: [
        { text: "M — Metrics" },
        { text: "P — Paper process", correct: true },
        { text: "I — Identify pain" },
      ],
      explain:
        "Paper process: legal, procurement, security review. Map it early — who reviews, how long each step takes, what kills deals — or watch your quarter die in someone's contract queue.",
    },
    {
      id: "m6q3",
      prompt: "'The person who sells for you when you're not in the room' is the:",
      options: [
        { text: "Economic buyer" },
        { text: "Champion", correct: true },
        { text: "Coach" },
      ],
      explain:
        "A champion has personal skin in the game and the influence to push. At Cribl that's often the architect or engineer whose life the product fixes. No champion, no deal — it's the most common empty box.",
    },
    {
      id: "m6q4",
      prompt: "Patrick's daily PG baseline:",
      options: [
        { text: "25 cold calls before noon" },
        {
          text: "10 emails + 10 calls + 10 LinkedIn messages to 10 people, every day",
          correct: true,
        },
        { text: "5 personalized videos a day" },
      ],
      explain:
        "10-10-10 daily is the floor. On top: two partner meetings a week and four field events a month. Quote it back to him and to Tim — it's their shared operating language.",
    },
    {
      id: "m6q5",
      prompt: "The weekly and monthly layers above the daily baseline:",
      options: [
        { text: "1 partner meeting a month, 1 field event a quarter" },
        {
          text: "2 partner meetings a week, 4 field events a month",
          correct: true,
        },
        { text: "Daily partner standups, weekly field events" },
      ],
      explain:
        "Two partner meetings a week (remember that one for Kat — it's a quarter of the PG system), four field marketing events a month. In person wherever possible: 'sell from your feet, not your seat.'",
    },
    {
      id: "m6q6",
      prompt: "In Patrick's existing-account motion, what's the QBR actually for?",
      options: [
        { text: "Reviewing support tickets and renewal paperwork" },
        {
          text: "Getting customer leadership in the room, making your contacts look good, and introducing new capabilities (Search, Lake) — turning white space into pipeline",
          correct: true,
        },
        { text: "Renegotiating pricing quarterly" },
      ],
      explain:
        "The QBR is an expansion engine disguised as a check-in: leadership shows up, your champions get credit, specialist teams seed new use cases, and executive alignment gets built.",
    },
    {
      id: "m6q7",
      prompt: "In your 4-layer territory plan, what gets the MOST time?",
      options: [
        { text: "Layer 4 — creative cold outreach, because new logos matter most" },
        {
          text: "Layer 1 — deals already in the pipeline",
          correct: true,
        },
        { text: "Layer 3 — personal network coffees" },
      ],
      explain:
        "Live pipeline first — those deals are closest to revenue and most fragile during a territory handoff. Then top-20 strategic targets, then network activation, then cold outreach. Weighted, in that order.",
    },
    {
      id: "m6q8",
      prompt: "Patrick's 'demand servicer' warning describes someone who:",
      options: [
        {
          text: "Thrives on inbound and existing demand but flops where buyers don't know the product exists yet",
          correct: true,
        },
        { text: "Spends too much time servicing existing customers" },
        { text: "Relies too heavily on SEs in deals" },
      ],
      explain:
        "Cribl sellers activate people who've never heard the story — it takes six-plus touches and real grit. Your founder years are the counter-evidence: nobody was inbound-ing you funding or customers.",
    },
    {
      id: "m6q9",
      prompt: "Engineers on the listening tour tell you they 'love Stream but wish search across the S3 archive was faster.' That's:",
      options: [
        {
          text: "White space — a Cribl Search expansion conversation waiting to happen, via the QBR",
          correct: true,
        },
        { text: "A support ticket — route it and move on" },
        { text: "A churn risk signal — escalate to Patrick immediately" },
      ],
      explain:
        "Love/hate/wish answers ARE the expansion map. A wish for faster archive search is a Cribl Search use case — bring the overlay team to the next QBR and turn the wish into pipeline.",
    },
    {
      id: "m6q10",
      prompt: "Tim asks: 'Walk me through your process when you get a new opportunity.' Your spine:",
      options: [
        {
          text: "Qualify the gap (current vs. future state), map the committee and the MEDDPICC boxes, agree on success criteria before any POV, drive the decision and paper process by dates",
          correct: true,
        },
        { text: "Get a demo scheduled as fast as possible — momentum is everything" },
        { text: "Send pricing early to qualify hard on budget" },
      ],
      explain:
        "Process = gap → committee → MEDDPICC discipline → success criteria → dated close plan. A demo-first or price-first answer reads as a demand servicer. Stay consistent with what you told Patrick — they compare notes.",
    },
  ],
  writeIn: [
    {
      id: "m6w1",
      prompt:
        "Explain Force Management's \"Command of the Message\" in your own words — the way you'd anchor a deal.",
      keyPoints: [
        "Sell the gap",
        "Current state → negative consequences (what staying put is costing them)",
        "Future state → positive business outcomes (what change is worth)",
        "Plus the required capabilities and the metrics",
        "Tie it to their corporate objectives, with metrics agreed up front",
      ],
      model:
        "I anchor every deal on the gap. Where are they today — current state — and what is that costing them? Then the future state and what it's worth in business outcomes. From there it's the capabilities they'd need to get there and the metrics we'll measure, all tied to their corporate objectives and agreed up front. Current state, consequences, future state, outcomes — that's the spine.",
    },
    {
      id: "m6w2",
      prompt:
        "How do you actually use MEDDPICC? And a deal's been stuck in legal review for five weeks — which box did you under-work?",
      keyPoints: [
        "Use MEDDPICC as a diagnostic, not a checklist of letters to recite",
        "When a deal stalls, one of the boxes is empty — go find which one",
        "Here it's the Paper process — legal, procurement, security review",
        "Map it early: who reviews, how long each step takes, what kills deals",
      ],
      model:
        "I use MEDDPICC as a diagnostic, not a checklist — when a deal stalls, one of those boxes is empty and that tells me exactly what to go fix. Five weeks in legal review is the paper process: legal, procurement, security review. I should've mapped that early — who reviews it, how long each step takes, where deals quietly die — instead of finding out now. That's where quarters go to die if you don't work it.",
    },
    {
      id: "m6w3",
      prompt:
        "Recite Patrick's pipeline-generation baseline — daily, weekly, and monthly.",
      keyPoints: [
        "Daily: 10 emails + 10 calls + 10 LinkedIn messages to 10 people",
        "Weekly: 2 partner meetings",
        "Monthly: 4 field marketing events",
        "It's the floor, not the ceiling — and in person wherever possible ('sell from your feet, not your seat')",
      ],
      model:
        "Ten emails, ten calls, and ten LinkedIn touches to ten people — every day. Two partner meetings a week. Four field events a month. That's the floor, not the ceiling; do more and more happens. And as much of it in person as I can make happen — sell from your feet, not your seat.",
    },
    {
      id: "m6w4",
      prompt:
        "Walk me through your 4-layer territory plan — and be clear which layer gets the most time.",
      keyPoints: [
        "Layer 1: deals already in the pipeline — they get the MOST time (closest to revenue, fragile in a handoff)",
        "Layer 2: top-20 strategic targets — account files, people plans, a named partner angle for each",
        "Layer 3: the Philly network — born and raised, Penn State, benefits and founder relationships",
        "Layer 4: creative, personalized cold outreach — video and pattern interrupts, never spray-and-pray",
        "Weighted in that order",
      ],
      model:
        "Four layers, weighted in order. Layer one is the deals already in the pipeline — they get the most time because they're closest to revenue and the most fragile in a territory handoff. Layer two is a top-20 target list, each with a real account file, a people plan, and a named partner angle. Layer three is my Philly network — born and raised, Penn State, eight years of benefits relationships and my founder network. Layer four is creative, personalized cold outreach — video and pattern interrupts, never spray-and-pray. A video is literally how I got Patrick's attention.",
    },
  ],
};

export const M7: CourseModule = {
  id: "m7",
  period: 2,
  number: 7,
  title: "Talk Tech Without Faking It",
  tagline: "Honest fluency: the mental picture, the vocabulary, the recovery move",
  minutes: 10,
  cards: [
    {
      id: "m7c1",
      title: "Why this module exists",
      paragraphs: [
        "Cam isn't testing whether you can configure a pipeline — he's testing whether you can carry a technical conversation honestly: use the vocabulary correctly, know where your knowledge ends, and handle the edge gracefully. You've told everyone you can't bullshit. Good — that's the brand. This module makes sure you rarely need to.",
        "The standard isn't 'expert.' It's 'dangerous enough to whiteboard, humble enough to hand off.'",
      ],
      sayThis:
        "I'm not going to pretend to be an engineer — my job is to be dangerous enough to whiteboard the story and smart enough to bring my SE in before I'm out of my depth.",
      source: "craft",
    },
    {
      id: "m7c2",
      title: "The data path — your mental picture",
      paragraphs: [
        "Hold this picture and you can navigate almost any technical exchange: Data is born on machines (servers, laptops, firewalls, cloud services). Agents collect it there (that's Edge). It flows through the pipeline (Stream) where it's cleaned, shaped, masked, enriched. Then it lands in destinations: the SIEM for security alerting (Splunk, Sentinel...), observability tools for uptime (Datadog...), and cheap object storage (S3, Cribl Lake) for everything else. Search can ask questions anywhere along that path — without moving the data. Replay pulls old data from storage back into a tool when needed.",
        "Practice drawing it once on paper: sources → agent → pipeline → three destination tiers, with Search across the top. That's the whiteboard.",
      ],
      sayThis:
        "Born on machines, collected by one agent, shaped in the pipeline, landed in the right tier — SIEM, observability, or cheap storage — with search across all of it.",
      source: "patrick",
    },
    {
      id: "m7c3",
      title: "The twelve terms that will definitely come up",
      paragraphs: [
        "Telemetry (machine data: logs, metrics, traces). Log (timestamped record of an event). SIEM ('sim' — the security team's alerting/analysis hub). SOC (security operations center — the team watching the screens). Observability (knowing your systems' health from their outputs — the IT side of the house). Ingest (data entering a tool — what the expensive tools bill on). Index (how a tool organizes data for fast search — costly). Agent (small software on each machine that collects and ships data). S3 / object storage (cheap, infinitely scalable cloud storage; S3 is also the de facto standard interface). EDR (endpoint detection & response — CrowdStrike et al). OTel / OpenTelemetry (open standard for emitting telemetry). Replay (pull archived data back into a tool on demand).",
        "The full deck — about 40 terms including the channel and sales vocabulary — lives in Flashcards. Two passes today, one tomorrow.",
      ],
      sayThis:
        "The SIEM bills on ingest — that's why controlling what you send it is worth real money.",
      source: "craft",
    },
    {
      id: "m7c4",
      title: "Sentences that signal fluency",
      paragraphs: [
        "A few composed lines that deploy vocabulary naturally — practice saying them aloud. 'Most teams are paying SIEM prices to store data nobody ever queries — route that to object storage and keep it searchable.' 'Agent fatigue is real — five collectors per server, and every upgrade cycle is a project. One neutral agent changes the math.' 'The replay story sells itself to anyone who's been through an incident: keep ninety days hot, archive the rest, pull back exactly what the investigation needs.'",
        "Notice the pattern: every sentence is pain → mechanism → outcome. Vocabulary in service of a point, never decoration.",
      ],
      sayThis:
        "Most teams pay SIEM prices to store data nobody ever queries. Route it to storage you control, keep it searchable, replay it when an investigation actually needs it.",
      source: "craft",
    },
    {
      id: "m7c5",
      title: "The honest-gap move",
      paragraphs: [
        "At some point Cam will reach the edge of your knowledge — possibly on purpose. The move: don't bluff, don't crumble, bridge. Name what you do know, own what you don't, and show the system that closes the gap.",
        "The recovery script: 'Honest answer — I don't know that one yet. Three weeks ago I couldn't have told you what a SIEM was; here's what I've done since' — and your learning system (this app, the partner calls, the use-case study) IS the answer. Then: 'and in a live deal, that's a question I'd bring my SE in on rather than guess.' That last sentence is exactly what an SE leader wants to hear an AE say.",
      ],
      sayThis:
        "I don't know that one yet — and I'd rather tell you that than guess. Here's how I've been closing the gap, and in a deal that's the moment I'd bring my SE in.",
      source: "craft",
    },
  ],
  quiz: [
    {
      id: "m7q1",
      prompt: "What's a SIEM?",
      options: [
        {
          text: "The security team's central hub for collecting, analyzing, and alerting on security data — bills largely on data ingest",
          correct: true,
        },
        { text: "An endpoint agent that blocks malware" },
        { text: "A cloud storage tier for archived logs" },
      ],
      explain:
        "Security Information and Event Management — say 'sim.' Splunk and Microsoft Sentinel are the household names. Its ingest-based pricing is the root of the cost pain Cribl fixes.",
    },
    {
      id: "m7q2",
      prompt: "Observability, in this world, refers to:",
      options: [
        {
          text: "The IT side — understanding system health and performance from outputs (logs, metrics, traces); Datadog's home turf",
          correct: true,
        },
        { text: "Physical security camera infrastructure" },
        { text: "A compliance framework for data retention" },
      ],
      explain:
        "Two houses buy telemetry: security (SIEM/SOC) and observability (IT health/uptime). Cribl serves both — that's the 'IT and security' framing on everything they publish.",
    },
    {
      id: "m7q3",
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
        "Ingest-based billing is the economic engine of the whole category — and of Cribl's value prop: cut 30–50% of what enters the expensive tools and the project funds itself.",
    },
    {
      id: "m7q4",
      prompt: "S3 in a sentence:",
      options: [
        {
          text: "Amazon's cheap object storage — and the de facto standard interface other storage systems speak too",
          correct: true,
        },
        { text: "A Splunk product tier" },
        { text: "A security certification level" },
      ],
      explain:
        "S3 = cheap, bottomless cloud storage. Because it became the standard interface, 'S3-compatible' storage is everywhere — which is exactly what Cribl Search can query in place (Patrick: 'S3 is a protocol').",
    },
    {
      id: "m7q5",
      prompt: "'Replay' means:",
      options: [
        {
          text: "Pulling archived data from cheap storage back into an analysis tool when an investigation or audit needs it",
          correct: true,
        },
        { text: "Re-running a failed pipeline job" },
        { text: "Recording a demo for the buying committee" },
      ],
      explain:
        "Replay is what makes aggressive tiering safe: archive boldly because you can always pull data back. Anyone who's lived through an incident response immediately gets why this matters.",
    },
    {
      id: "m7q6",
      prompt: "OpenTelemetry (OTel) is:",
      options: [
        {
          text: "An open standard for how systems emit telemetry — vendor-neutral by design, so it rhymes with Cribl's whole philosophy",
          correct: true,
        },
        { text: "Cribl's proprietary agent protocol" },
        { text: "A Datadog pricing plan" },
      ],
      explain:
        "OTel standardizes how apps emit logs/metrics/traces. If it comes up, the safe true sentence: 'vendor-neutral emission standard — fits the same philosophy as Cribl, and Cribl works with it.'",
    },
    {
      id: "m7q7",
      prompt: "EDR is:",
      options: [
        {
          text: "Endpoint detection and response — CrowdStrike's category; its agents generate huge data volumes",
          correct: true,
        },
        { text: "Enterprise data retention — a compliance policy" },
        { text: "A type of database index" },
      ],
      explain:
        "EDR watches endpoints for threats — and floods the SIEM with data. That's why the 41% EDR-reduction case study (9.25TB → 5TB daily) is such a relatable proof point.",
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
        "The honest-gap move IS the test. An SE leader has watched a hundred AEs bluff; the one who says 'I don't know, here's my system, and that's when I'd bring you in' is the one he fights to work with. Asking the follow-up shows curiosity, not weakness.",
    },
  ],
  writeIn: [
    {
      id: "m7w1",
      prompt:
        "Cam drops an acronym you've never heard. What do you actually do — and why is that the right move with an SE leader?",
      keyPoints: [
        "Don't bluff and don't crumble — bridge",
        "Name what you know, own what you don't: 'I don't know that one yet — rather tell you that than guess'",
        "Point to the system that's closing the gap (this learning machine, the partner calls)",
        "'In a live deal, that's exactly when I'd bring my SE in'",
        "Then ask what it means — curiosity, not weakness",
      ],
      model:
        "Honest answer — I don't know that one yet, and I'd rather tell you that than guess. Three weeks ago I couldn't have told you what a SIEM was; here's the system I built to close that gap fast. And in a live deal, that's exactly the kind of question I'd bring my SE in on rather than wing it. Then I'd ask you what it means — I want to learn it.",
    },
    {
      id: "m7w2",
      prompt:
        "Draw the data path in words — your whiteboard picture, left to right.",
      keyPoints: [
        "Data is born on machines — servers, laptops, firewalls, cloud services",
        "One agent collects it at the source (Edge)",
        "It flows through the pipeline (Stream) where it's cleaned, shaped, masked, enriched",
        "It lands in tiers: the SIEM for security alerting, observability tools for uptime, cheap object storage (S3 / Lake) for the rest",
        "Search asks questions anywhere along the path without moving data; Replay pulls archived data back when needed",
      ],
      model:
        "Picture it left to right. Data's born on machines — servers, laptops, firewalls, cloud apps. One agent collects it at the source. It flows through the pipeline, where it gets cleaned, shaped, masked, and enriched in flight. Then it lands in the tier it deserves: the SIEM for security alerting, observability tools for uptime, and cheap object storage like S3 or Cribl Lake for everything else. Search can ask questions anywhere along that path without moving the data, and Replay pulls old data back into a tool when an investigation needs it.",
    },
    {
      id: "m7w3",
      prompt:
        "Why does \"ingest\" matter so much in a pricing conversation? Use the term naturally.",
      keyPoints: [
        "The big analysis tools — SIEMs — bill by the volume of data entering them; that's ingest",
        "Control the ingest and you control the bill",
        "Most teams pay SIEM prices to store data nobody ever queries",
        "Cut 30–50% of what enters the expensive tools and the project funds itself",
      ],
      model:
        "The SIEM bills on ingest — the volume of data entering it — so controlling what you send it is worth real money. Most teams are paying SIEM prices to store data nobody ever queries. Route that to storage you control, keep it searchable, and you cut 30 to 50% of what feeds the expensive tool. That's the savings that funds the whole Cribl project.",
    },
  ],
};

export const PERIOD2 = [M5, M6, M7];
