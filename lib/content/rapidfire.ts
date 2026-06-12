import type { PersonId } from "./interviews";

// Shootout drill bank — one question per card, with the model answer
// (in Chris's voice) revealed on screen after he takes his swing.

export interface RapidFireQ {
  id: string;
  person: PersonId;
  level: 1 | 2 | 3 | 4 | 5;
  question: string;
  perfect: string;
  beats: string[];
}

export const RAPID_FIRE: RapidFireQ[] = [
  // ─── PATRICK ───────────────────────────────────────────────────────
  {
    id: "rf-p1",
    person: "patrick",
    level: 1,
    question: "Why sales, and why now, after six years of founding?",
    perfect:
      "I ran the whole army for six years — generalist, everything on my shoulders. I sold my company, my family's settled in Philly, and now I want to be a sniper on a bigger army: pick the one thing I'm best at, which is selling, and go deep. I love the eat-what-you-kill part. That's not a fallback — it's a choice.",
    beats: ["Army → sniper line", "Exit + family = timing", "Eat-what-you-kill, by choice"],
  },
  {
    id: "rf-p2",
    person: "patrick",
    level: 1,
    question: "What are you good at professionally?",
    perfect:
      "Three things. Big-picture problem solving — I cut through noise fast. Preparation — I'm not a winger, so when I walk in I know more than anyone expects. And relationships across a whole buying committee, not just the one guy who's friendly — I learned early that the wrong relationship is a waste of a quarter.",
    beats: ["Problem solver, cuts noise", "Preparation over improv", "Committee-wide relationships"],
  },
  {
    id: "rf-p3",
    person: "patrick",
    level: 2,
    question: "What are you NOT good at?",
    perfect:
      "I'm impatient — genuinely. It's fuel, but unmanaged it reads as pushy in a sale this consensus-driven, so I build process around it: follow-up cadences instead of follow-up impulses. And I can't bullshit. If I'm not prepared I'm average, so I just never show up unprepared.",
    beats: ["Impatience, owned with a guardrail", "Can't wing it → preparation system", "No humble-brag"],
  },
  {
    id: "rf-p4",
    person: "patrick",
    level: 2,
    question: "How would your last three leaders rate you, one to ten?",
    perfect:
      "Honest answer: nine-ish from the ones I respected, with the same caveat — 'hardest worker I had, occasionally needed reining in.' They'd say hard worker first, then loyal and easy to work with, then problem solver who finds a way. The one who'd score me lower is a coach I didn't respect — I've learned to handle that better.",
    beats: ["Specific number + why", "Hard worker / loyal / problem solver", "Honest about the outlier"],
  },
  {
    id: "rf-p5",
    person: "patrick",
    level: 3,
    question: "Walk me through taking over the existing book in this territory.",
    perfect:
      "Protect the base first. Tier every account, then a listening tour — day-in-the-life with the hands-on engineers: how they bought, what they love, hate, wish. I want them feeling like they got an upgrade, not a handoff. Then a QBR rhythm with their leadership in the room and your overlay teams seeding Search and Lake. The love-hate-wish answers become the white-space map.",
    beats: ["Tier → listening tour → QBR rhythm", "'They got an upgrade' feeling", "Love/hate/wish = expansion map"],
  },
  {
    id: "rf-p6",
    person: "patrick",
    level: 3,
    question: "What's your weekly PG math?",
    perfect:
      "Your floor is my floor: ten emails, ten calls, ten LinkedIn touches a day — to mapped people, not sprayed. Two partner meetings a week. Four field events a month. My personal bar on top: ten in-person meetings a month, because coffee in Philly spiders the network faster than any sequence.",
    beats: ["10-10-10 daily, owned", "2 partner meetings/wk, 4 events/mo", "10 in-person/mo personal bar"],
  },
  {
    id: "rf-p7",
    person: "patrick",
    level: 4,
    question: "Sellers with better resumes have flopped here. Why not you?",
    perfect:
      "Because the ones who flop are demand servicers wearing a generator's jacket — they need handed pipeline. I've never had handed anything: five percent close rates in benefits, bootstrapped fundraising, six years where nothing moved unless I moved it. Hearing no for months without folding isn't a risk for me — it's literally my resume. The gap I do have is industry knowledge, and you've seen how fast I'm closing that.",
    beats: ["Names the real failure mode", "Grit receipts, not adjectives", "Owns the actual gap + system"],
  },
  {
    id: "rf-p8",
    person: "patrick",
    level: 4,
    question: "Give me the 30-second Cribl pitch — I'm a CIO who's never heard of you.",
    perfect:
      "Your machine data doubles every couple years and the bills grow faster than the budgets — every tool wants its own copy. Cribl is the control layer in the middle: collect everything once, cut the junk, protect the sensitive parts, and send each tool only what it's worth. You get choice, flexibility, and control over the whole data strategy — and it usually funds itself in savings. Half the Fortune 100 already run it.",
    beats: ["Pain → control layer → outcome", "Choice, flexibility, control", "Funds itself + Fortune 100 proof"],
  },
  {
    id: "rf-p9",
    person: "patrick",
    level: 4,
    question: "How do I know you won't blow up my renewals while you learn?",
    perfect:
      "Because the first ninety days on existing accounts are listening, not pitching. I tier them, sit with the engineers, and don't touch anything until I understand why they bought and what they'd miss. The fastest way to blow up a renewal is showing up as the new guy with a quota — I show up as the guy making them look good at their own QBR.",
    beats: ["Listen before pitching", "Engineers first, truth lives there", "Make champions look good"],
  },
  {
    id: "rf-p10",
    person: "patrick",
    level: 5,
    question: "Quarter one ends at 40% of your pipeline number. What do you say in our one-on-one?",
    perfect:
      "I bring the autopsy before you ask: here's the activity ledger against the 10-10-10, here's where the funnel leaked, here's what I'm changing — more partner-sourced at-bats, tighter ICP focus, and the two plays that did work doubled down. No excuses, no blaming the territory. If the inputs were short, that's mine and I say so. Then I ask what you're seeing that I'm not.",
    beats: ["Own it before being asked", "Data: inputs vs. funnel leak", "Specific changes + asks for coaching"],
  },
  {
    id: "rf-p11",
    person: "patrick",
    level: 5,
    question: "Demand generator versus demand servicer — which are you, and prove it.",
    perfect:
      "Generator — and the proof is I've never lived anywhere demand existed. Benefits was cold territory at five percent close rates. Founding was inventing demand for a product nobody asked for, twice. Even this interview loop started with a video I sent to get your attention — pattern interrupt, not a job board. Servicers wait for the bell. I ring it.",
    beats: ["Claim + three receipts", "The video story = live evidence", "Servicers wait, generators ring"],
  },
  {
    id: "rf-p12",
    person: "patrick",
    level: 2,
    question: "What do you look for in a leader?",
    perfect:
      "Clear goals with no moving targets, prescriptive coaching — which you are, and I like it — and trust that's earned then given: hold me tight early, loosen as I prove it. Mutual respect is the non-negotiable; I've been the captain and I've been the problem for coaches I didn't respect, so I know the difference I bring when it's right.",
    beats: ["Clarity, no moving targets", "Earned trust → freedom", "Honest about the respect thing"],
  },
  {
    id: "rf-p13",
    person: "patrick",
    level: 3,
    question: "What's your people plan for a top-20 target?",
    perfect:
      "Map the committee before the first call: CISO, CIO, VP of observability, the architect, the hands-on engineers — formal power from the org chart, informal power from partners who live in the account. Different message per seat. Then multi-thread from day one: partner intro where they have juice, my network where I do, creative outreach where neither. One relationship is a stepping stone, not a strategy.",
    beats: ["Committee mapped, formal + informal", "Partners reveal who has juice", "Multi-thread, message per seat"],
  },
  {
    id: "rf-p14",
    person: "patrick",
    level: 1,
    question: "What does winning look like for you in year one?",
    perfect:
      "Number one: the number. But the version of the number I want is built right — pipeline I generated, partners who ask for me by name, and existing accounts that expanded because the engineers trust me. If I hit quota but the partners dodge my calls, I did it wrong. I want you bragging about the hire, not defending it.",
    beats: ["The number, said plainly", "Built right: PG + partners + expansion", "'Bragging, not defending'"],
  },
  {
    id: "rf-p15",
    person: "patrick",
    level: 5,
    question: "Why should I put my name on you?",
    perfect:
      "Because I'm the lowest-risk version of the high-upside bet. The downside cases — lazy, fragile, can't take a no, needs babysitting — none of those are me, and you've now tested for all of them twice. The upside case is a guy who built companies bringing founder-level ownership to one territory, with a Philly network and partner friendships nobody else interviewing has. You coach, I run through the wall. That trade works for both of us.",
    beats: ["Risk framed and dismissed with evidence", "Founder ownership + Philly unfair advantage", "Ends on the partnership, not himself"],
  },

  // ─── KAT ───────────────────────────────────────────────────────────
  {
    id: "rf-k1",
    person: "kat",
    level: 1,
    question: "How do you think about working with partners?",
    perfect:
      "Partners are how Cribl eats — ninety-five percent of business runs through the channel, so they're not a lane in my plan, they're in everything. My rule from eight years of broker-world selling: the partner has to win for me to win. Make them money, bring them in early, and the referrals compound.",
    beats: ["95% channel = in everything", "Partner wins first, always", "Broker world taught the values"],
  },
  {
    id: "rf-k2",
    person: "kat",
    level: 1,
    question: "What do you know about Cribl's partner ecosystem?",
    perfect:
      "The national names: SHI's the volume giant, Optiv and GuidePoint are the security specialists, Ahead and Presidio lean infrastructure, Trace3's in there, and Carahsoft is the government channel that pairs with our FedRAMP story. Plus the big integrators and the cloud marketplaces. And honestly — I have real friends at several of them, which I'd want to deploy under your game plan.",
    beats: ["Names + lanes, not just names", "Carahsoft ↔ FedRAMP pairing", "Friends offered under HER plan"],
  },
  {
    id: "rf-k3",
    person: "kat",
    level: 2,
    question: "Partner-sourced versus partner-influenced — and why do I care?",
    perfect:
      "Sourced means the partner originated the deal; influenced means they helped one along. You care because that's your scoreboard — and I care because feeding it is how I become your favorite AE. That means giving partners leads and intel, not just asking, so deals start on their side of the fence too.",
    beats: ["Clean definitions", "It's HER scoreboard", "Two-way street feeds sourced"],
  },
  {
    id: "rf-k4",
    person: "kat",
    level: 2,
    question: "What would make a partner rep want to bring you into their account?",
    perfect:
      "I make them money and make them look good — services attached, their deal reg protected without asking, their customer hearing me reinforce that the partner's the trusted advisor. And I bring something every time: intel from my prospecting, a target list overlap, an event idea with MDF behind it. Reps queue up for AEs who are generous and prepared.",
    beats: ["Money + look good", "Reg protected unprompted", "Always bring something"],
  },
  {
    id: "rf-k5",
    person: "kat",
    level: 3,
    question: "A partner registers a deal at an account you've been prospecting for a month. Go.",
    perfect:
      "Their registration, their deal — full stop. I call them same day, lay out everything I've learned so far, and we build the play together: my momentum plus their relationship and economics. A month of my prospecting just became a warmer co-sell, and that partner learns my name means safety. That story travels through the whole partner community.",
    beats: ["Zero hesitation: their deal", "Hand over intel, co-sell it", "Reputation compounds"],
  },
  {
    id: "rf-k6",
    person: "kat",
    level: 3,
    question: "SIEM migration play at a hospital system. Which partner and why?",
    perfect:
      "Security-specialized first — Optiv or GuidePoint — because a SIEM migration is a security-architecture sale and their practices live there. Tiebreaker is relationships: if SHI owns that hospital's spend relationship, it might be an SHI-led deal with security services pulled in. Lane fit first, then who actually has the door.",
    beats: ["Lane: security specialists", "Relationship can override lane", "Shows the decision logic"],
  },
  {
    id: "rf-k7",
    person: "kat",
    level: 3,
    question: "Your first 30 days with my partner ecosystem — specifically.",
    perfect:
      "Week one is your map, not mine: who actually drives pipeline versus fulfills. Then we go together — I don't meet your partners without you until you say so. I bring my account-level intel to every meeting and lock the two-a-week rhythm into my calendar permanently. By day thirty you've got a co-built plan per key partner and at least one joint play in motion.",
    beats: ["Her map first, enter together", "Bring intel, never empty-handed", "2/week rhythm locked in"],
  },
  {
    id: "rf-k8",
    person: "kat",
    level: 4,
    question: "Why should a partner pitch Cribl over the free pipeline their SIEM vendor bundles?",
    perfect:
      "Because the bundled pipeline exists to lock data INTO that vendor — it makes the partner a one-vendor reseller. Cribl is neutral: it makes everything else in their portfolio work better, attaches their services revenue, and keeps THEM the customer's trusted advisor instead of a logo's sales arm. Their margin on the bundle is zero anyway. Cribl pays them three ways.",
    beats: ["Bundle = lock-in for the vendor", "Neutrality protects advisor status", "Services + portfolio + margin"],
  },
  {
    id: "rf-k9",
    person: "kat",
    level: 4,
    question: "Quarter-end. Going direct on one deal closes it faster — the partner's been slow. Your manager wants the number.",
    perfect:
      "I don't go around the registration — that trade is one deal now for the whole channel later, and at a ninety-five percent channel company that math never works. What I do is get loud and helpful: call the partner's leadership, name the deadline, offer to do the heavy lifting under their paper. If it slips a quarter, I tell my manager exactly why, and I'd expect you to back me.",
    beats: ["Refuses the shortcut, names the math", "Escalate + carry the load WITH them", "Owns the slip out loud"],
  },
  {
    id: "rf-k10",
    person: "kat",
    level: 4,
    question: "A customer asks about the Palo Alto tension — rival and partner — in front of a Palo seller. Go.",
    perfect:
      "Easy, because it's true: Palo's platform is excellent, and Cribl makes it better — we feed it exactly the data it needs. The strategy question is who controls the data layer underneath, and keeping that neutral is what makes a big Palo bet safe to make. Rivals at the strategy layer, partners at the data layer — that's just the neighborhood. The Palo seller should nod along.",
    beats: ["Compliment, sincerely", "Neutral layer makes their bet safer", "Coopetition named without flinching"],
  },
  {
    id: "rf-k11",
    person: "kat",
    level: 5,
    question: "SHI sales kickoff. Two hundred reps. Thirty seconds. Why care about Cribl?",
    perfect:
      "Every customer you have is drowning in machine-data costs and getting platformization pitches from every vendor. Cribl is the neutral control layer underneath it all — it cuts their data bills, makes every product in your bag work better, and attaches your services on every deal. Half the Fortune 100 run it. Easiest co-sell you'll touch this year — come find me.",
    beats: ["Their customers' pain first", "Portfolio + services = their win", "Call to action, with energy"],
  },
  {
    id: "rf-k12",
    person: "kat",
    level: 5,
    question: "Your friend at Ahead tips you to budget — but Presidio holds the registration there. Your friend wants it. Choose.",
    perfect:
      "Presidio's deal — the registration decides, not the friendship. I thank my friend honestly: 'you just made me look great, and I owe you one — but this one's registered.' Then I find Ahead the next play in my territory so the intel keeps flowing. Friends respect a straight answer; the channel never forgets a crooked one.",
    beats: ["Registration wins, instantly", "Honest with the friend + repay later", "Long game over one deal"],
  },
  {
    id: "rf-k13",
    person: "kat",
    level: 2,
    question: "How does Patrick's cadence involve partners, and do you buy it?",
    perfect:
      "Two partner meetings a week, built into the floor — alongside the 10-10-10 and four field events a month. I buy it completely, and my version comes loaded: every meeting I bring prospecting intel or a target overlap, and every top-20 account plan has a named partner play. The cadence is just the heartbeat; the content is what makes partners answer my calls.",
    beats: ["2/week quoted exactly", "Loaded meetings, never check-ins", "Named partner play per account"],
  },
  {
    id: "rf-k14",
    person: "kat",
    level: 1,
    question: "Tell me about selling through intermediaries in your benefits days.",
    perfect:
      "The broker WAS the channel — for eight years nothing closed unless the broker won first. That taught me the values: their relationship outlives any one deal, protect their economics without being asked, and become the carrier rep they bring in to look good. The mechanics here are new — deal reg, sourced versus influenced, MDF — and I've studied exactly those. The instincts transfer whole.",
    beats: ["Broker = channel, values learned", "Honest: mechanics are new", "Names the mechanics he studied"],
  },
  {
    id: "rf-k15",
    person: "kat",
    level: 5,
    question: "Convince me that putting you in front of my best partner next week makes ME look good.",
    perfect:
      "Because I show up the way you'd coach me to: prepped on their book, leading with a target list and real intel, deal reg treated as gospel, and asking how their team wins before talking quota. Worst case, they tell you I was generous and prepared. Best case, you sourced the AE their reps start requesting. Either way it's your judgment that looks great — and I'll make sure they know you set it up.",
    beats: ["Prepped + generous, specifics", "Her reputation protected both ways", "Credit flows back to her"],
  },

  // ─── CAM ───────────────────────────────────────────────────────────
  {
    id: "rf-c1",
    person: "cam",
    level: 1,
    question: "What does Cribl actually do? I'm smart but I've never heard of you.",
    perfect:
      "Companies generate mountains of machine data — logs, metrics, telemetry — and every security and monitoring tool wants its own copy at premium prices. Cribl sits in the middle as the control layer: collect it once, cut the junk, mask the sensitive parts, and route each tool exactly what it needs. Bills go down, control goes up, and nothing has to be ripped out.",
    beats: ["Pain → middle layer → outcome", "Collect once, route anywhere", "No rip-and-replace"],
  },
  {
    id: "rf-c2",
    person: "cam",
    level: 1,
    question: "How technical are you, honestly?",
    perfect:
      "Six years sitting between business and engineering as a founder — I speak the language fluently, and I don't write the code. I'll never be your demo engine and I'll never pretend to be. What I will be is dangerous enough to whiteboard the story, honest at the edge of what I know, and disciplined about bringing my SE in before I'm past it.",
    beats: ["Calibrated: fluent, not coder", "Never pretends", "Knows where the SE line is"],
  },
  {
    id: "rf-c3",
    person: "cam",
    level: 2,
    question: "When do you pull an SE into a deal?",
    perfect:
      "After it's earned the hours: real pain identified, the right people engaged, a path to a decision. First calls are mine — business story, discovery, qualification. When I bring your SE in, they get a written brief: who's in the room, what each person cares about, what we know, and the next step we're driving to. Your team's hours should only land on deals that can close.",
    beats: ["Qualify first, always", "First calls are the AE's", "Brief every time, no surprises"],
  },
  {
    id: "rf-c4",
    person: "cam",
    level: 2,
    question: "A prospect asks for a capability you're not sure Cribl has. In the moment — go.",
    perfect:
      "'Good question — I don't want to guess on that one. Let me capture exactly what you need it to do, and I'll get you the real answer from my engineer this week.' Then I actually write it down, in their words. Guessing right earns nothing; guessing wrong costs the SE who has to walk it back and the trust I can't rebuild.",
    beats: ["Says the actual script", "Captures it precisely", "Names the cost of guessing"],
  },
  {
    id: "rf-c5",
    person: "cam",
    level: 2,
    question: "What has to be true before a POV starts?",
    perfect:
      "Four things in writing: success criteria the customer agreed to, a timebox, an exec sponsor, and a champion driving it internally. No criteria means it can never officially succeed — it's just free consulting that goes quiet. A POV is something a deal earns, not a step that happens automatically.",
    beats: ["Criteria, timebox, sponsor, champion", "No criteria = free consulting", "Earned, not automatic"],
  },
  {
    id: "rf-c6",
    person: "cam",
    level: 3,
    question: "Why does tiering save money? Mechanism, not vibes.",
    perfect:
      "The SIEM bills on ingest, and most of what's sent there is never queried by a human. So: high-value data goes to the SIEM for about ninety days; everything else routes to object storage at a fraction of the cost, still searchable in place, with replay to pull anything back when an investigation needs it. Real receipts: one customer cut 41% of daily EDR data, Nutanix halved firewall logs.",
    beats: ["Ingest billing is the engine", "Tier by value + replay safety net", "41% and Nutanix receipts"],
  },
  {
    id: "rf-c7",
    person: "cam",
    level: 3,
    question: "Walk a log from a server in their data center to a dashboard.",
    perfect:
      "Born on the machine, picked up by one agent — that's Edge. Flows through Stream where it's parsed, cleaned, enriched, masked. Then routed by value: SIEM if it earns SIEM prices, observability tooling for the ops side, cheap object storage for the rest. Search can query any of it where it sits, and replay pulls archives back into a tool when needed. Left to right, every time.",
    beats: ["Born → Edge → Stream → tiers", "Cribl sits BEFORE destinations", "Search-in-place + replay"],
  },
  {
    id: "rf-c8",
    person: "cam",
    level: 3,
    question: "Engineer says: we'll build this with open source. Your SE is in the room.",
    perfect:
      "I respect it — open source can move data, and saying otherwise would be false. My frame: total cost. Teams that build it end up staffing a pipeline-babysitting function — engineering hours, on-call, governance, scale — instead of doing security. Then I hand to my SE for the technical depth while I hold that business frame. It's a duet, not a handoff.",
    beats: ["Respect first, never 'it can't'", "Total-cost reframe", "Duet: AE frame + SE depth"],
  },
  {
    id: "rf-c9",
    person: "cam",
    level: 4,
    question: "How would you position us against their existing Kafka estate?",
    perfect:
      "Honest answer: I don't know Kafka well enough to position against it yet, and I'd rather tell you that than fake it — what is it, so I learn it right now? In a live deal that's exactly the moment I'd bring my SE in instead of guessing. What I can tell you is how I'd run that conversation: understand what it does for them today, then position around what it doesn't do.",
    beats: ["Instant honest gap, zero squirm", "Asks to learn on the spot", "Names the SE handoff moment"],
  },
  {
    id: "rf-c10",
    person: "cam",
    level: 4,
    question: "An AE promised a ship date to close a deal. It slipped. Your read — no 'it depends'.",
    perfect:
      "Cardinal sin, full stop — there's no deal size where it becomes okay, because the SE and customer success inherit a promise they never made. I don't commit roadmap. If a date genuinely matters to a deal, that's product's call, in writing, with you in the loop before the customer hears anything. Momentum you buy with a fake date gets repossessed with interest.",
    beats: ["No threshold, no 'depends'", "Product owns dates, papered", "Others inherit the broken promise"],
  },
  {
    id: "rf-c11",
    person: "cam",
    level: 4,
    question: "Pitch Cribl to a skeptical SOC engineer in thirty seconds — not the CIO version.",
    perfect:
      "One agent instead of five on every box, one control plane instead of fifty scripts. The junk gets dropped before it ever hits your SIEM ingest, sensitive fields get masked in flight, and the archive stays searchable — replay pulls back exactly what an investigation needs at 2am. Less plumbing, fewer pages, your tools get only what's worth their price.",
    beats: ["Agent sprawl + script pain", "Junk dropped pre-ingest", "Replay at 2am — his life, not strategy"],
  },
  {
    id: "rf-c12",
    person: "cam",
    level: 5,
    question: "CISO says CrowdStrike's platform does everything you do, included in what she pays. Forty-five seconds.",
    perfect:
      "CrowdStrike's platform is excellent — keep it. But their pipeline exists to feed CrowdStrike; that's the point of it. The question is whether your data strategy should be owned by any single platform. Control the layer underneath and the platformization bet becomes safe: go all-in with them today, add or swap tomorrow, nothing re-plumbed. We make their platform better AND keep it your choice. That's why half the Fortune 100 run both.",
    beats: ["Concede the platform sincerely", "Their pipeline = their lock-in", "Control underneath = reversible bets"],
  },
  {
    id: "rf-c13",
    person: "cam",
    level: 5,
    question: "Your SE bombs a demo — environment broken, customer annoyed, you're in the room. Go.",
    perfect:
      "In the moment I take the room: 'that's on us — let's use the time on your questions instead,' and I run discovery the demo was supposed to enable. Never a flicker of blame toward my SE in front of the customer. After, we debrief honestly, fix the root cause, and I get the re-demo booked within the week framed as 'we owe you a clean run.' Customers forgive a bad demo; they never forgive watching a team eat its own.",
    beats: ["Take the room, pivot to discovery", "Zero public blame, ever", "Fast re-demo + honest debrief"],
  },
  {
    id: "rf-c14",
    person: "cam",
    level: 5,
    question: "Make the case for why your deals deserve my team's hours — under a minute.",
    perfect:
      "Three commitments, auditable: nothing reaches your team unqualified — pain, power, and process verified first, with a written brief every time. No POV without agreed success criteria, a timebox, and a champion. And your engineers always hear the ending — win or lose, debrief every time. Run the experiment for a quarter: if my conversion-per-SE-hour isn't top of the team, pull the hours. I'll bet my pipeline on the discipline.",
    beats: ["Three auditable commitments", "Conversion-per-SE-hour framing", "Offers the experiment"],
  },
  {
    id: "rf-c15",
    person: "cam",
    level: 1,
    question: "What's a SIEM, and why does everyone complain about it?",
    perfect:
      "Say 'sim' — it's the security team's central hub for collecting and analyzing security data and firing alerts. Splunk and Microsoft Sentinel are the big names. Everyone complains because it bills on ingest — by the volume you feed it — and data doubles every couple of years while budgets don't. That gap is basically Cribl's founding story.",
    beats: ["Plain definition + big names", "Ingest billing = the complaint", "The gap is Cribl's opening"],
  },

  // ─── TIM ───────────────────────────────────────────────────────────
  {
    id: "rf-t1",
    person: "tim",
    level: 1,
    question: "Why Cribl, man? You could've gone anywhere.",
    perfect:
      "Three filters: product I'd actually evangelize, stage where one rep matters, and people I'd grind with. Cribl nailed all three — category of its own, the growth is absurd but it still feels hungry, and honestly Patrick sold me. I've talked to a lot of companies; this is the one where I kept thinking about the territory after the call ended.",
    beats: ["Three filters, named", "Stage: big enough, still hungry", "Patrick connection, genuine"],
  },
  {
    id: "rf-t2",
    person: "tim",
    level: 2,
    question: "What does a good week actually look like for you?",
    perfect:
      "The floor runs itself: 10-10-10 daily, blocked mornings. Two partner meetings, in person when I can. Two to three customer or prospect meetings — I'm pushing for ten in-person a month. One field event most weeks. Fridays I close the loop: CRM truth, next-week targets, and the one creative play — usually video — for accounts that won't open the door.",
    beats: ["Cadence as the floor, scheduled", "In-person bias, 10/month bar", "Friday loop-closing ritual"],
  },
  {
    id: "rf-t3",
    person: "tim",
    level: 2,
    question: "Patrick's 10-10-10 — honest feelings?",
    perfect:
      "Honest? It's a relief. Founder life had no floor — some weeks I did everything and nothing worked, and no one could tell me what enough looked like. A clear baseline I can beat is a gift. The trick is keeping the touches personal at that volume, which is where the prep and the video stuff earn their keep.",
    beats: ["Relief, not burden — founder contrast", "Floor to beat, not ceiling to hit", "Volume with personalization"],
  },
  {
    id: "rf-t4",
    person: "tim",
    level: 3,
    question: "Where does your pipeline really come from in year one? Honest mix.",
    perfect:
      "My guess, and I'd love your real numbers: forty percent my own PG, thirty partner-sourced if I do the channel right, twenty expansion from existing accounts, ten SDR and marketing. The honest part: month one through four skews way harder to my own outbound, because partner trust and account trust both have ramp curves. Which is why my calendar's front-loaded with exactly those two.",
    beats: ["Gives an actual mix", "Honest about early-months skew", "Asks for HIS real numbers"],
  },
  {
    id: "rf-t5",
    person: "tim",
    level: 3,
    question: "What's this video prospecting thing Patrick mentioned?",
    perfect:
      "Pattern interrupt. Everyone's inbox and texts are wallpaper now, so I record short personal videos — me, their name, one specific observation about their world, one reason to talk. It's how I got Patrick: he ignores recruiters all day, but a video selling MYSELF as the meeting got a reply in hours. I'll run the same play on Philly CISOs who've never heard of Cribl.",
    beats: ["Why: wallpaper inboxes", "The Patrick receipt", "Same play → territory"],
  },
  {
    id: "rf-t6",
    person: "tim",
    level: 3,
    question: "What scares you about this job? For real.",
    perfect:
      "The middle months — month four through eight, when the early energy's spent, the pipeline's built but nothing's closed yet, and the brand-awareness grind is just... heavy. I know my counter: the activity floor doesn't care about my feelings, and the partner flywheel starts paying right around then. But pretending nothing scares me would be the worse answer.",
    beats: ["Names a real, specific fear", "The dead-zone months", "Counter-plan without bravado"],
  },
  {
    id: "rf-t7",
    person: "tim",
    level: 4,
    question: "Everyone here has industry war stories. You're the guy nodding along at dinner. How long does that last?",
    perfect:
      "Shorter than you'd bet. I'm three weeks in and I can already hold the platformization conversation, the tiering math, and the partner map — because I study like it's my job, which it currently is. But I'll never fake a war story I don't have. I'll trade you founder stories — fundraising rejections are their own kind of combat — and within two quarters I'll have Cribl stories of my own.",
    beats: ["Evidence of pace, specific topics", "Won't fake stories — trades his own", "Two-quarter timeline, concrete"],
  },
  {
    id: "rf-t8",
    person: "tim",
    level: 4,
    question: "Four kids and a newborn. This job eats nights. How does that actually work?",
    perfect:
      "It works because it's planned like territory: my wife and I run the calendar Sunday night same as I run my pipeline. Travel clusters into planned weeks, evening events get traded against morning duty, and the 10-10-10 happens early before the house wakes up. Founder years with a newborn were worse hours with worse pay and no floor under any of it. This is an upgrade I don't take for granted.",
    beats: ["Calendar system, not vibes", "Founder-years comparison", "No defensiveness, no martyrdom"],
  },
  {
    id: "rf-t9",
    person: "tim",
    level: 4,
    question: "My worry: this is your pit stop until the next startup itch. Convince me.",
    perfect:
      "Fair worry — wrong read. I took my swing, got my exit, and learned what the founder lottery actually costs a family of six. The itch is scratched. What I never lost is the part that made founding fun — building something from nothing — and a territory where nobody knows Cribl yet IS that, with a floor under it. I'm not parking here. I'm switching arenas for good.",
    beats: ["Validates, then flips the read", "Exit = itch scratched, costs known", "Territory = building, with a floor"],
  },
  {
    id: "rf-t10",
    person: "tim",
    level: 5,
    question: "Patrick says you told him you'd skip cold outreach since your network's strong. True?",
    perfect:
      "No — and I'd bet Patrick didn't say that, because it's backwards from what I told him. Cold outreach is my layer four: smallest time slice, but never skipped, and it's the creative, personal kind — video, pattern interrupts. The network is layer three, not a replacement for outbound. Happy to walk the four layers again if it's useful.",
    beats: ["Calm, confident correction", "Restates the real layer four", "No flustering, offers the receipt"],
  },
  {
    id: "rf-t11",
    person: "tim",
    level: 5,
    question: "Month five: pipeline but no closes, and a rep with your profile just got cut in New York. What changes?",
    perfect:
      "Diagnosis before motion: pipeline that won't close usually means weak champions or no compelling event — so I MEDDPICC-audit every deal and kill or restructure the bottom third. Then double down where conversion lives: partner co-sell and existing-account expansion. And I get loud with Patrick — here's what I see, here's the plan, tell me what I'm missing. The cut rep probably went quiet. Quiet is the actual death.",
    beats: ["Audit: champions + events", "Kill the bottom third, no mercy", "Loud with the manager — quiet kills"],
  },
  {
    id: "rf-t12",
    person: "tim",
    level: 5,
    question: "Tell me something about this job that will genuinely suck. 'Nothing' ends the interview.",
    perfect:
      "The sixth no from the same account when I know the product would save them seven figures — that specific flavor of being right and unheard, for months. And losing evenings to events where nobody's heard of us yet. Both are the actual job, not bugs in it. I signed up anyway, eyes open — that's different from pretending it's all upside.",
    beats: ["Specific, real suck — not generic", "'Right and unheard' texture", "Eyes-open framing, no spin"],
  },
  {
    id: "rf-t13",
    person: "tim",
    level: 1,
    question: "What'd you play growing up? You've got locker-room energy.",
    perfect:
      "Hockey — center, my whole life. Polarizing player, honestly: captains loved me or coaches hated me, usually depending on whether they'd earned the room's respect. Sales is the closest legal thing to a faceoff I've found. And yes, I still have all my teeth — eighteen stitches, but all the teeth.",
    beats: ["Center — playmaker identity", "Polarizing, honestly owned", "The teeth line — let it land"],
  },
  {
    id: "rf-t14",
    person: "tim",
    level: 2,
    question: "What would you actually ask ME if this weren't an interview?",
    perfect:
      "Same things I'm asking now: what does a good week really look like — calendar, not philosophy. Where does your pipeline honestly come from, what surprised you most after joining, and knowing everything now, what would you do differently in your first ninety days? That last one's the gold — you paid tuition I'd rather borrow than re-pay.",
    beats: ["Real operational questions", "The first-90-days-redo gold", "'Borrow your tuition' line"],
  },
  {
    id: "rf-t15",
    person: "tim",
    level: 5,
    question: "One reason I vouch for you — and it can't be 'hard worker'.",
    perfect:
      "I make the people around me money. Partners get deals registered and serviced, SEs get qualified rooms and briefs, and the rep next to me gets a guy who shares what's working — the video play, the partner intel loop, all of it. You're not vouching for my effort, you're vouching for what your own year looks like with me on the row. It gets better.",
    beats: ["'I make people around me money'", "Receipts: partners, SEs, peers", "Flips to HIS upside"],
  },
];
