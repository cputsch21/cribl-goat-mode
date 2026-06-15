import type { CourseModule } from "./types";

// ─────────────────────────────────────────────────────────────
// ACT 1 — THE SALES MOTION
// The main event. How an Enterprise AE generates pipeline, runs a
// complex multi-party deal, and does it the Cribl way: Force
// Management's Command of the Message + Command of the Sale, and
// MEDDPICC as the diagnostic underneath every deal.
// ─────────────────────────────────────────────────────────────

export const M1: CourseModule = {
  id: "m1",
  period: 1,
  number: 1,
  title: "Command of the Message",
  tagline: "Sell the value, not the product — the Force Management way",
  minutes: 14,
  cards: [
    {
      id: "m1c1",
      title: "Command of the Message in one breath",
      paragraphs: [
        "Ami told you directly: Cribl runs Force Management. The core of it — 'Command of the Message' — is about selling the gap. Where is the customer today (current state) and what is that costing them (negative consequences)? Where could they be (future state) and what is that worth (positive business outcomes)? Then: what capabilities do they need to get there, and how will you both measure it?",
        "Here's your cheat code — Patrick quizzed you with this exact language in your first call: 'What's their current state? Negative consequences? Future state? How does it attach to their corporate objectives? What business outcomes are we driving?' Answer in that vocabulary and you sound like you've already been to their bootcamp.",
      ],
      sayThis:
        "I anchor every deal on the gap: current state and what it's costing them, future state and what it's worth — tied to their corporate objectives, with metrics we agree on up front.",
      source: "ami",
    },
    {
      id: "m1c2",
      title: "Why do anything / why now / why Cribl",
      paragraphs: [
        "Every deal has to answer three questions in order, and most stall on the first. Why do anything — is the pain big enough to spend money and political capital on? Why now — what makes this quarter different from last (a SIEM renewal, a breach, an AI mandate, a budget line)? Why Cribl — why us over the status quo, DIY, or the platform's bundled pipeline?",
        "Reps lose deals by jumping to 'why us' (the demo, the features) before earning 'why do anything' and 'why now.' No compelling 'why now' is the single most common reason a forecasted deal slips a quarter.",
      ],
      sayThis:
        "Before I ever talk product, I make sure we've answered why do anything and why now — because a deal with no compelling event doesn't close, it just slips.",
      source: "craft",
    },
    {
      id: "m1c3",
      title: "Before and after — paint both pictures",
      paragraphs: [
        "Command of the Message lives in two pictures. The before: data doubling, the SIEM bill growing faster than the budget, engineers babysitting fifty feeds, investigations crawling, AI projects stalled on ungoverned data. The after: control of the data layer — high-value data to the expensive tools, the rest to cheap storage they own, search across all of it, governed feeds to AI, and the bill back under control.",
        "The move is to make the customer feel the cost of staying put before you ever describe the future. People don't buy the future state; they buy escape from the current one.",
      ],
      sayThis:
        "Picture today: your data doubles, your SIEM bill tracks it, and your team is plumbing instead of defending. Now picture controlling the layer underneath — same tools, half the bill, and your engineers back on the actual mission.",
      source: "craft",
    },
    {
      id: "m1c4",
      title: "Required capabilities, not features",
      paragraphs: [
        "This is the part reps skip and it's the whole game. Don't pitch features. Translate the future state into the capabilities the customer MUST have to get there — 'you'd need to route any source to any destination without re-plumbing,' 'you'd need to search archived data without rehydrating it,' 'you'd need to mask sensitive fields before they leave your network.' Get them to agree those capabilities matter. THEN map Cribl to them.",
        "When the buyer says 'yes, we'd need that,' they've built the case for you. The competitor who leads with a feature demo never gets the buyer to define the bar — so they end up measured on the wrong things.",
      ],
      sayThis:
        "I don't sell features — I get the customer to agree on the capabilities they'd need to fix this, in their words. Once we agree on the bar, the product almost sells itself.",
      source: "craft",
    },
    {
      id: "m1c5",
      title: "Metrics — make the value countable",
      paragraphs: [
        "A future state with no number is a wish. Force Management ties every deal to metrics agreed up front: SIEM ingest cut 30–50%, investigations 10x faster, X engineer-hours a week back, a migration done in weeks not quarters. Then you attach those to the customer's published corporate objectives — cost takeout, audit readiness, AI initiatives — so the value ladders up to what the executive is already on the hook for.",
        "Metrics also become your decision criteria later (Module 3): the numbers you agree on now are the bar the POV gets measured against. Set them early or someone else will.",
      ],
      sayThis:
        "We agree the numbers up front — what we're cutting, what we're speeding up, what it's worth — and we tie it to what your leadership has already committed to publicly. That's how the value survives procurement.",
      source: "craft",
    },
    {
      id: "m1c6",
      title: "Differentiation that survives a bake-off",
      paragraphs: [
        "Differentiation only counts when it's tied to a required capability the customer values AND that competitors genuinely can't match. Cribl's three that hold up: vendor-neutral (route to any tool, swap platforms without re-plumbing), hybrid/on-prem (workers run where the data lives — SaaS-only rivals can't follow), and search-in-place (ask questions without rehydration). Lead with whichever maps to the capability the customer just agreed they need.",
        "Differentiation disconnected from a valued capability is just bragging. 'We're vendor-neutral' means nothing until the customer has agreed that reversibility matters to them.",
      ],
      sayThis:
        "My differentiation is only worth raising if you've told me it matters — if reversibility is the bar, vendor-neutral wins it; if it's the locked-down environment, our hybrid model is the only one that even shows up.",
      source: "craft",
    },
  ],
  quiz: [
    {
      id: "m1q1",
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
        "Current state → consequences → future state → outcomes, attached to what the company is publicly trying to do. Patrick used this exact vocabulary unprompted in your first call — mirror it.",
    },
    {
      id: "m1q2",
      prompt: "A forecasted deal keeps slipping a quarter. Most likely Command-of-the-Message gap:",
      options: [
        { text: "You never demoed enough features" },
        {
          text: "No compelling 'why now' — there's no event forcing a decision this quarter",
          correct: true,
        },
        { text: "The price was too high" },
      ],
      explain:
        "Why do anything / why now / why you — in that order. A deal with real pain but no compelling event doesn't die, it slips. Find the event (renewal, breach, audit, AI mandate, budget cycle) or create urgency around one.",
    },
    {
      id: "m1q3",
      prompt: "Why lead with 'required capabilities' instead of features?",
      options: [
        {
          text: "If the customer agrees on the capabilities they need, they've built your case — and they're measuring on the bar you set, not a competitor's feature list",
          correct: true,
        },
        { text: "Features are confidential until late in the deal" },
        { text: "It lets you avoid bringing in the SE" },
      ],
      explain:
        "Get the buyer to say 'yes, we'd need that' BEFORE you map Cribl to it. The rep who leads with a feature demo never gets the buyer to define the bar — so they get measured on the wrong things.",
    },
    {
      id: "m1q4",
      prompt: "In the before/after frame, what actually drives the purchase?",
      options: [
        { text: "Excitement about the future state" },
        {
          text: "The felt cost of staying in the current state — people buy escape from pain, then the future",
          correct: true,
        },
        { text: "The lowest price among the options" },
      ],
      explain:
        "Make them feel the cost of the status quo before you describe the future. A polished 'after' picture with no felt 'before' is just a nice demo — it doesn't move budget.",
    },
    {
      id: "m1q5",
      prompt: "Why tie your metrics to the customer's published corporate objectives?",
      options: [
        {
          text: "The value ladders up to what the executive is already accountable for — so it survives procurement and exec scrutiny",
          correct: true,
        },
        { text: "It's required for the order form" },
        { text: "It lets you skip the economic buyer" },
      ],
      explain:
        "Cost takeout, audit readiness, AI initiatives — whatever leadership has committed to publicly. When your numbers ladder up to those, the deal stops being 'a tool the team wants' and becomes 'how we hit the company's goal.'",
    },
    {
      id: "m1q6",
      prompt: "When is it worth raising 'Cribl is vendor-neutral'?",
      options: [
        { text: "In the first sentence of every pitch — it's the headline" },
        {
          text: "Only after the customer has agreed that reversibility / avoiding lock-in is a capability they need",
          correct: true,
        },
        { text: "Never — it sounds like a weakness" },
      ],
      explain:
        "Differentiation only counts when it's tied to a required capability the customer values. 'We're vendor-neutral' is bragging until they've told you reversibility matters — then it's the thing that wins the bake-off.",
    },
    {
      id: "m1q7",
      prompt: "Which is the strongest opening with a CISO under budget pressure?",
      options: [
        { text: "'Cribl is a telemetry pipeline with 80+ integrations and in-flight transformation.'" },
        {
          text: "'Your data's doubling and your SIEM bill is tracking it — what's that trajectory doing to your budget, and what's it costing your team in plumbing time?'",
          correct: true,
        },
        { text: "'We're cheaper than Splunk.'" },
      ],
      explain:
        "Open on their current state and its consequences — in a question, so they say the pain out loud. The first answer is a feature dump; the third is a race to the bottom.",
    },
    {
      id: "m1q8",
      prompt: "Patrick's three words for what the executive ultimately buys:",
      options: [
        { text: "Speed, scale, savings" },
        { text: "Choice, flexibility, control", correct: true },
        { text: "Visibility, velocity, value" },
      ],
      explain:
        "Choice, flexibility, control — over the entire data strategy. It's the positive-business-outcome layer of the message; use the exact words, they're how Patrick's team sells.",
    },
  ],
  writeIn: [
    {
      id: "m1w1",
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
      id: "m1w2",
      prompt:
        "Walk me through 'why do anything, why now, why Cribl' — and which one deals usually stall on.",
      keyPoints: [
        "Three questions in order: why do anything (is the pain worth spending on), why now (the compelling event), why Cribl (vs status quo / DIY / bundled)",
        "Reps lose by jumping to 'why Cribl' (the demo) before earning the first two",
        "Deals most often stall on 'why now' — no compelling event",
        "A deal with no compelling event doesn't die, it slips a quarter",
      ],
      model:
        "Every deal answers three questions in order. Why do anything — is this pain big enough to spend money and political capital on? Why now — what makes this quarter different: a renewal, a breach, an audit, an AI mandate? And why Cribl — over doing nothing, building it themselves, or the platform's bundled pipe. Most reps jump straight to why Cribl with a demo and skip the first two — and then the deal slips, because there was never a compelling 'why now.' That's the one I protect hardest.",
    },
    {
      id: "m1w3",
      prompt:
        "Why do you sell 'required capabilities' instead of features — and how does it change who controls the deal?",
      keyPoints: [
        "Translate the future state into the capabilities the customer MUST have, in their words",
        "Get them to agree those capabilities matter BEFORE mapping Cribl to them",
        "When they say 'yes, we'd need that,' they've built your case",
        "You're now measured on the bar you set, not a competitor's feature list",
        "Then differentiation only counts when it maps to a capability they've agreed they value",
      ],
      model:
        "I don't pitch features — I translate the future state into the capabilities they'd need to get there: route any source anywhere without re-plumbing, search the archive without rehydrating it, mask sensitive data before it leaves the network. I get them to agree those matter first. Once they say 'yes, we'd need that,' they've built the case for me, and the whole deal is now measured on the bar I set — not on whatever feature a competitor wants to demo. That's also when differentiation finally counts: vendor-neutral only wins if they've already told me reversibility matters.",
    },
  ],
};

export const M2: CourseModule = {
  id: "m2",
  period: 1,
  number: 2,
  title: "MEDDPICC, Part 1",
  tagline: "The qualification framework, every letter — cold",
  minutes: 15,
  cards: [
    {
      id: "m2c1",
      title: "A diagnostic, not a checklist",
      paragraphs: [
        "Ami told you Cribl runs MEDDICC/MEDDPICC alongside Force Management. The trap in an interview — and in real deals — is reciting the letters like a checklist. The pros use it as a diagnostic: when a deal stalls, one of these boxes is empty, and finding which one tells you exactly what to go fix.",
        "The eight letters: Metrics, Economic Buyer, Decision Criteria, Decision Process, Paper Process, Identify Pain, Champion, Competition. Each has one inspection question. If you can't answer it with a name, a number, or a date, that box is your next move.",
      ],
      sayThis:
        "I use MEDDPICC as a diagnostic, not a checklist. When a deal stalls, one of those boxes is empty — and which one tells me exactly what to go fix.",
      source: "ami",
    },
    {
      id: "m2c2",
      title: "M — Metrics",
      paragraphs: [
        "The quantified economic impact — the numbers that justify the spend. Not 'they'll be happier,' but 'SIEM ingest cut 40%, $1.2M a year, investigations 10x faster.' This is where Command of the Message hands off to qualification: the metrics you agreed on become the case the economic buyer signs off on.",
        "Inspection question: what's the measurable business impact, and has the customer agreed to the number?",
      ],
      sayThis:
        "Metrics is the dollar value we both agree the change is worth — and if I can't put a number on it, I haven't earned the deal yet.",
      source: "craft",
    },
    {
      id: "m2c3",
      title: "E — Economic Buyer",
      paragraphs: [
        "The one person with the discretionary power to say yes and free up budget — usually the CISO, CIO, or a VP, not the engineer who loves the product. Many deals die because the rep never gets past the champion to the person who actually controls the money.",
        "Inspection question: have you met them, and do they know both the cost and the value in their own words? 'My champion says they're on board' is not the same as having been in the room.",
      ],
      sayThis:
        "The economic buyer owns the budget and the yes. If I haven't been in a room with them and heard them say the value back to me, I treat the deal as unqualified.",
      source: "craft",
    },
    {
      id: "m2c4",
      title: "D & D — Decision Criteria and Decision Process",
      paragraphs: [
        "Decision criteria: how they'll judge the options — the technical and business musts (often the POV success criteria). Your job in Module 1 was to shape these toward capabilities Cribl wins on. Decision process: the actual steps and dates to a yes — who's involved, what reviews happen, when.",
        "Inspection questions: do you know the criteria, and did you help write them? Do you know every step and date between today and signature? If the process is fuzzy, the close date is fiction.",
      ],
      sayThis:
        "Decision criteria is how they'll choose — and I want to help write it. Decision process is the steps and dates to yes — and if I can't lay those out, my forecast is a guess.",
      source: "craft",
    },
    {
      id: "m2c5",
      title: "P — Paper Process",
      paragraphs: [
        "The path from a verbal yes to a signature: legal, procurement, security review, vendor onboarding. It's where deals quietly die — a deal signed-off technically can sit in legal for weeks because nobody mapped it. This is the extra 'P' that separates MEDDPICC from plain MEDDIC, and it's the one new reps forget.",
        "Inspection question: do you know who reviews it, how long each step takes, and what's killed deals here before?",
      ],
      sayThis:
        "Paper process is where quarters go to die. I map it early — who signs, how long legal and security take, what's tripped up vendors before — so a verbal yes actually becomes a PO.",
      source: "craft",
    },
    {
      id: "m2c6",
      title: "I — Identify Pain",
      paragraphs: [
        "The compelling reason to act — and to act now. This is the 'why do anything / why now' from Command of the Message, qualified: the indefensible SIEM bill, the scary migration, the breach, the AI mandate with no governance. Real pain is specific, owned by someone, and tied to a consequence if it's ignored.",
        "Inspection question: can you name the pain, who owns it, and what happens to them if nothing changes this quarter?",
      ],
      sayThis:
        "Identify pain is the compelling event — not 'this would be nice' but 'this is costing us now and here's who's on the hook.' No pain, no deal — just a nice conversation.",
      source: "craft",
    },
    {
      id: "m2c7",
      title: "C & C — Champion and Competition",
      paragraphs: [
        "Champion: the person who sells for you when you're not in the room — and a real one has three things: personal skin in the game, influence with the economic buyer, and a willingness to be tested (give them the business case and see if they run with it). At Cribl it's often the architect or engineer whose life the product fixes. No champion is the most common empty box.",
        "Competition: who and what you're up against — and the biggest competitor is almost always the status quo (do nothing), then DIY open source, then the platform's bundled pipeline. Inspection questions: will your champion spend capital for you? And what's the customer's alternative to saying yes — including doing nothing?",
      ],
      sayThis:
        "A champion sells when I'm not in the room — so I test mine by handing them the business case and watching if they run with it. And I always count 'do nothing' as my number-one competitor.",
      source: "craft",
    },
  ],
  quiz: [
    {
      id: "m2q1",
      prompt: "The single most important way to USE MEDDPICC:",
      options: [
        { text: "As a checklist to recite to the buyer to show rigor" },
        {
          text: "As a diagnostic — when a deal stalls, find the empty box and that's your next move",
          correct: true,
        },
        { text: "As a forecasting score you report to management weekly" },
      ],
      explain:
        "Diagnostic, not checklist — it's the difference between a rep who name-drops MEDDPICC and one who uses it. Reciting the letters in an interview is the trap; showing how you'd find the missing box is the win.",
    },
    {
      id: "m2q2",
      prompt: "A deal is technically approved but has sat in 'legal review' for five weeks. Which box did you under-work?",
      options: [
        { text: "M — Metrics" },
        { text: "P — Paper Process", correct: true },
        { text: "I — Identify Pain" },
      ],
      explain:
        "Paper process: legal, procurement, security review. Map it early — who reviews, how long each step takes, what kills deals — or watch your quarter die in someone's contract queue.",
    },
    {
      id: "m2q3",
      prompt: "Your enthusiastic engineer contact says the CISO is 'totally on board.' What's still unqualified?",
      options: [
        { text: "Nothing — a strong champion confirming the EB is enough" },
        {
          text: "The Economic Buyer — you haven't been in the room to hear them say the value back; secondhand isn't qualified",
          correct: true,
        },
        { text: "The Competition — you should ask the engineer who else they're considering" },
      ],
      explain:
        "'My champion says they're on board' is not access to the economic buyer. Until you've heard the EB articulate the value and cost themselves, treat E as an empty box — it's where big deals quietly fall apart.",
    },
    {
      id: "m2q4",
      prompt: "'The person who sells for you when you're not in the room' is the:",
      options: [
        { text: "Economic buyer" },
        { text: "Champion", correct: true },
        { text: "Coach" },
      ],
      explain:
        "A champion has skin in the game and influence — and you test a real one by handing them the business case to see if they run with it. At Cribl it's often the architect or engineer whose life the product fixes.",
    },
    {
      id: "m2q5",
      prompt: "Best definition of Decision Criteria — and the AE's job with it:",
      options: [
        {
          text: "How the customer will judge the options — and the AE's job is to help write them, toward capabilities Cribl wins on",
          correct: true,
        },
        { text: "The legal terms in the contract" },
        { text: "The internal score the AE gives the deal" },
      ],
      explain:
        "Decision criteria = the musts they'll measure against (often the POV success criteria). Shape them early toward the required capabilities from Command of the Message, or you'll be graded on a competitor's bar.",
    },
    {
      id: "m2q6",
      prompt: "Which letter is the 'why now,' qualified?",
      options: [
        { text: "M — Metrics" },
        { text: "I — Identify Pain", correct: true },
        { text: "D — Decision Process" },
      ],
      explain:
        "Identify Pain is the compelling event with an owner and a consequence. It's Command of the Message's 'why do anything / why now' turned into a qualified, named, dated fact — not a nice-to-have.",
    },
    {
      id: "m2q7",
      prompt: "Why is 'do nothing' the competitor you must always name?",
      options: [
        {
          text: "The status quo is the most common alternative to a yes — and the easiest one for a committee to default to",
          correct: true,
        },
        { text: "It isn't — only named vendors count as competition" },
        { text: "Because procurement requires three competing bids" },
      ],
      explain:
        "Most lost enterprise deals are lost to 'no decision,' not to a rival. If you only track vendor competition, you miss the real threat — inertia. That's why pain and a compelling event matter so much.",
    },
    {
      id: "m2q8",
      prompt: "What does the extra 'P' add that plain MEDDIC misses?",
      options: [
        { text: "Pricing authority" },
        { text: "Paper Process — the legal/procurement/security path to signature", correct: true },
        { text: "Partner registration" },
      ],
      explain:
        "MEDDPICC = MEDDIC + Paper Process + a sharpened Competition. The paper process is the box new reps forget and seasoned ones map on day one — it's where a verbal yes goes to die.",
    },
  ],
  writeIn: [
    {
      id: "m2w1",
      prompt:
        "How do you actually USE MEDDPICC? And a deal's been stuck in legal review for five weeks — which box did you under-work?",
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
      id: "m2w2",
      prompt:
        "Walk me through what each letter of MEDDPICC means — fast, the way you'd prove you know it cold.",
      keyPoints: [
        "M — Metrics: the quantified business impact, a number the customer agreed to",
        "E — Economic Buyer: the person with discretionary budget and the yes; you've met them",
        "D — Decision Criteria: how they'll judge, which you helped shape",
        "D — Decision Process: the steps and dates to a signature",
        "P — Paper Process: legal, procurement, security review",
        "I — Identify Pain: the compelling event, owned, with a consequence",
        "C — Champion: sells for you when you're not there; has power; tested",
        "C — Competition: rivals, DIY, and the status quo",
      ],
      model:
        "Metrics — the dollar value we agree the change is worth. Economic buyer — the one with the budget and the yes, who I've actually met. Decision criteria — how they'll judge, which I help write. Decision process — the steps and dates to signature. Paper process — legal, procurement, security review. Identify pain — the compelling event, owned by someone, with a real consequence. Champion — the person who sells for me when I'm not in the room, with power, and tested. Competition — the rivals, DIY open source, and the status quo. And I work it as a diagnostic: whichever of those I can't answer is my next move.",
    },
    {
      id: "m2w3",
      prompt:
        "What makes a real champion — and how do you test that you've got one, not just a friend?",
      keyPoints: [
        "A champion sells for you when you're not in the room",
        "Three things: personal skin in the game, influence with the economic buyer, willingness to be tested",
        "Test them: hand them the business case and see if they run with it internally",
        "At Cribl it's often the architect or engineer whose life the product fixes",
        "No champion is the most common empty box",
      ],
      model:
        "A real champion sells for me when I'm not in the room — and three things make them real: they've got personal skin in the game, they have influence with the economic buyer, and they'll let themselves be tested. So I test them. I hand them the business case and watch whether they actually carry it inside — forward it, present it, push it up. If it goes quiet, I don't have a champion, I have a friend. At Cribl that person is usually the architect or engineer whose daily life the product fixes.",
    },
  ],
};

export const M3: CourseModule = {
  id: "m3",
  period: 1,
  number: 3,
  title: "MEDDPICC, Part 2",
  tagline: "Run a real Cribl deal through it — until it's reflex",
  minutes: 14,
  cards: [
    {
      id: "m3c1",
      title: "A live deal, letter by letter",
      paragraphs: [
        "Take a real shape: a bank's security team is drowning in an indefensible Splunk bill with a renewal in two quarters. Identify pain: the renewal quote is up 40% and the CISO has a board mandate to cut tooling cost. Metrics: route 45% of ingest to cheap storage, save ~$2M/yr, keep everything searchable. Economic buyer: the CISO owns the budget. Champion: the SecOps architect who's tired of dropping data to stay under license.",
        "Decision criteria: the POV must prove no loss of detection fidelity and a 40%+ ingest cut. Decision process: POV in March, security review in April, EB sign-off and PO before the renewal. Paper process: InfoSec vendor review (6 weeks) is the long pole. Competition: do nothing and eat the renewal, or let Splunk's own pipeline 'handle it.' That's a qualified deal you can forecast.",
      ],
      sayThis:
        "Give me a deal and I'll tell you the eight boxes: here's the pain, the number, who owns the money, who's selling for me inside, how they'll decide, the steps to signature, and what I'm really competing against — usually their own inertia.",
      source: "craft",
    },
    {
      id: "m3c2",
      title: "Find the empty box",
      paragraphs: [
        "The diagnostic in action. Deal won't progress past the demo? Probably no Identify Pain or no compelling event. Champion goes quiet? You never tested them, or they lack power. Stuck after a great POV? Usually no Economic Buyer access or an unmapped Paper Process. Slipped close date? The Decision Process was fuzzy — you forecasted a hope.",
        "In the interview, this is the move that separates you: don't recite letters, diagnose. 'If a deal stalls, I assume a box is empty and I go find which one' is exactly what a sales leader wants to hear.",
      ],
      sayThis:
        "When a deal stalls I don't push harder — I find the empty box. Stuck after a strong POV almost always means I don't really have the economic buyer or I never mapped the paper process.",
      source: "craft",
    },
    {
      id: "m3c3",
      title: "It's a committee — multi-thread to the boxes",
      paragraphs: [
        "You told Patrick this and he loved it: enterprise deals are consensus buys — four or five yeses minimum — and you can waste months on someone who can't sign. MEDDPICC is how you map them: the Economic Buyer (the money), the Champion (the seller-inside), plus the technical evaluators who own the Decision Criteria. Map formal power (titles) AND informal power (who the CISO actually trusts).",
        "Single-threading is the silent deal-killer: one contact leaves or gets overruled and the deal dies. Partners often know the informal map better than anyone inside the account — your shortcut to who really has juice.",
      ],
      sayThis:
        "I map the whole committee to the MEDDPICC boxes — who's the money, who's my champion, who owns the technical criteria — formal power and informal. Single-threaded deals die the day your one contact leaves.",
      source: "chris",
    },
    {
      id: "m3c4",
      title: "Build and arm the champion",
      paragraphs: [
        "A champion you don't equip is a champion who loses the internal argument. Your job: give them the business case in a form they can forward — the metrics, the before/after, the answer to 'why now' — and coach them on the objections they'll hit from finance and from the incumbent vendor. Then connect them to the economic buyer; a champion's highest value is the warm path to the money.",
        "Test relentlessly (Module 2): if they won't take a small risk for you now, they won't fight for you in the room where the decision actually happens.",
      ],
      sayThis:
        "I don't just find a champion, I arm one — I hand them the business case in their words and prep them for the pushback, because they're making my argument in the room I'm not in.",
      source: "craft",
    },
    {
      id: "m3c5",
      title: "Metrics that justify — cost as the door, then more",
      paragraphs: [
        "Cribl's own playbook: Cost Control is the door-opener because the bill is the universal, board-visible pain. Quantify it hard — '41% less daily endpoint data, 9.25TB to 5TB' is the kind of number that builds the economic buyer's case for them. Then expand the metrics into the bigger outcomes: faster investigations, safe migration, AI-ready governed data.",
        "The discipline: one credible number tied to their objective beats five stats in a row. The metrics you set here are the bar the POV gets graded on next — so set them where Cribl wins.",
      ],
      sayThis:
        "Cost is the door — I quantify the bill and hand the economic buyer a number that makes their case. Then I expand it: faster investigations, a clean migration, governed data for AI.",
      source: "craft",
    },
    {
      id: "m3c6",
      title: "Drive the decision and paper process by dates",
      paragraphs: [
        "A forecast with no dated process is a wish. Build a mutual action plan with the customer — work backwards from when they need value live to every step in between: POV, security review, EB sign-off, procurement, signature. Put the long poles (InfoSec review, legal) on the calendar early, because those are where time disappears.",
        "When you can recite the steps and dates between today and the PO, you've earned the right to forecast it. When you can't, you're guessing — and a sales leader can tell in one question.",
      ],
      sayThis:
        "I build a mutual action plan backwards from go-live — POV, security review, sign-off, procurement — and I put the long poles on the calendar first. If I can't name the steps and dates to the PO, I don't forecast it.",
      source: "craft",
    },
  ],
  quiz: [
    {
      id: "m3q1",
      prompt: "A deal stalls right after a strong POV. The most likely empty boxes:",
      options: [
        {
          text: "Economic Buyer access or an unmapped Paper Process",
          correct: true,
        },
        { text: "Metrics and Identify Pain — they clearly had neither" },
        { text: "Decision Criteria — the POV must have failed" },
      ],
      explain:
        "A strong POV means pain, criteria, and a champion were probably real. Stalling after it usually means you never got to the money (E) or never mapped the path to signature (P). Diagnose, don't push.",
    },
    {
      id: "m3q2",
      prompt: "Why is single-threading a deal so dangerous?",
      options: [
        {
          text: "Enterprise deals need four or five yeses — if your one contact leaves or gets overruled, the deal dies",
          correct: true,
        },
        { text: "It violates Cribl's deal-registration rules" },
        { text: "It isn't — one strong champion is all you need" },
      ],
      explain:
        "Your hard-won lesson from the benefits days: a relationship with the wrong (or only) person is a stepping stone, not a strategy. Map the whole committee to the MEDDPICC boxes — and use partners to find the informal power.",
    },
    {
      id: "m3q3",
      prompt: "You have a friendly contact but the deal isn't moving. The champion test:",
      options: [
        { text: "Ask if they like the product" },
        {
          text: "Hand them the business case and see if they'll carry it internally — forward it, present it, push it up",
          correct: true,
        },
        { text: "Ask them to introduce you on LinkedIn" },
      ],
      explain:
        "A champion who won't take a small risk for you now won't fight for you in the decision room. Arm them with the case in their words, then watch whether they actually run with it.",
    },
    {
      id: "m3q4",
      prompt: "Why does Cribl lead with Cost Control as the door-opener?",
      options: [
        {
          text: "The bill is the universal, board-visible pain — it funds the project and gives the economic buyer a number to take upstairs",
          correct: true,
        },
        { text: "It's the only thing Cribl does well" },
        { text: "Procurement requires a cost-savings justification" },
      ],
      explain:
        "Cost gets the meeting and funds the deal (a customer cut 41% of daily endpoint data, 9.25TB → 5TB). Then you expand the metrics into migration, investigations, and AI governance — the bigger expansion story.",
    },
    {
      id: "m3q5",
      prompt: "What earns you the right to forecast a deal's close date?",
      options: [
        { text: "The champion's confidence that it'll close" },
        {
          text: "A dated mutual action plan — you can name every step from today to the PO, with the long poles scheduled",
          correct: true,
        },
        { text: "A signed POV success document" },
      ],
      explain:
        "A forecast with no dated process is a wish. Build the MAP backwards from go-live and put InfoSec review and legal on the calendar early — those are where the time disappears.",
    },
    {
      id: "m3q6",
      prompt: "In the bank example, what's the realistic 'Competition'?",
      options: [
        { text: "Only Datadog — they're the biggest threat" },
        {
          text: "Doing nothing and eating the renewal, or letting Splunk's bundled pipeline 'handle it'",
          correct: true,
        },
        { text: "There is none — Cribl has no competitor here" },
      ],
      explain:
        "The real competition is inertia (eat the renewal) and the incumbent's own bundled pipeline. Name 'do nothing' every time — it's what most lost enterprise deals actually lose to.",
    },
    {
      id: "m3q7",
      prompt: "A champion is enthusiastic but keeps losing the internal argument. Most likely cause:",
      options: [
        {
          text: "You armed them poorly — they don't have the business case in a form they can forward, or coaching on the objections",
          correct: true,
        },
        { text: "They were never a real champion — drop them" },
        { text: "The product isn't good enough" },
      ],
      explain:
        "A champion you don't equip loses the argument. Give them the metrics, the before/after, the 'why now,' and prep them for finance and the incumbent's pushback — then connect them to the economic buyer.",
    },
    {
      id: "m3q8",
      prompt: "An interviewer asks you to qualify a deal. The strongest shape of answer:",
      options: [
        { text: "Recite the eight letters of MEDDPICC in order" },
        {
          text: "Walk a concrete deal through the boxes — pain, number, money, champion, criteria, steps and dates, real competition — then say which box you'd attack first",
          correct: true,
        },
        { text: "Explain that you'd schedule a demo to build interest" },
      ],
      explain:
        "Reciting letters is the rookie tell. Applying them to a real deal and naming the box you'd work next is what a sales leader is actually testing for.",
    },
  ],
  writeIn: [
    {
      id: "m3w1",
      prompt:
        "Take a real Cribl deal and qualify it out loud — run it through the MEDDPICC boxes.",
      keyPoints: [
        "Identify Pain / why now: a compelling event (e.g. SIEM renewal up sharply + a board mandate to cut cost)",
        "Metrics: a quantified number both sides agree to (e.g. cut ~45% of ingest, save ~$2M/yr, stay searchable)",
        "Economic Buyer: who owns the budget (often the CISO)",
        "Champion: the architect/engineer whose life the product fixes, tested and armed",
        "Decision Criteria + Process: the POV success criteria and the dated steps to a yes",
        "Paper Process: the long pole (InfoSec/security review, legal)",
        "Competition: do-nothing and the incumbent's bundled pipeline",
      ],
      model:
        "Say a bank's security team is drowning in a Splunk bill and the renewal's up 40% with a board mandate to cut tooling cost — that's my pain and my why-now. Metrics: route about 45% of ingest to cheap storage, save roughly $2M a year, keep it all searchable. Economic buyer is the CISO who owns the budget; my champion is the SecOps architect tired of dropping data to stay under license. Decision criteria is the POV proving a 40%-plus cut with no loss of detection. The process runs POV in March, security review in April, sign-off before the renewal — and the paper process long pole is a six-week InfoSec review I map on day one. Competition is doing nothing and eating the renewal, or letting Splunk's own pipeline handle it. That's a deal I can forecast.",
    },
    {
      id: "m3w2",
      prompt:
        "A deal stalls right after a great POV. How do you diagnose it with MEDDPICC?",
      keyPoints: [
        "Don't push harder — assume a box is empty and find which one",
        "A strong POV means pain, criteria, and a champion were probably real",
        "Stalling after a POV usually means no Economic Buyer access",
        "Or an unmapped Paper Process — legal/security review you never scoped",
        "Go fix that specific box, not the whole deal",
      ],
      model:
        "I don't push harder — I find the empty box. A strong POV tells me the pain, the criteria, and probably the champion were all real. So a stall right after it almost always means one of two things: I never actually got to the economic buyer — I've been selling to a champion who can't free the budget — or I never mapped the paper process, and it's now sitting in a security review I didn't scope. Either way, that one box is my whole job this week, not the deal in general.",
    },
    {
      id: "m3w3",
      prompt:
        "How do you build and arm a champion so they win the internal argument?",
      keyPoints: [
        "Don't just find a champion — equip one",
        "Give them the business case in a form they can forward (metrics, before/after, the 'why now')",
        "Coach them on the objections they'll hit from finance and the incumbent vendor",
        "Connect them to the economic buyer — the warm path to the money is their highest value",
        "Keep testing them — small risks now predict whether they'll fight in the decision room",
      ],
      model:
        "A champion I don't equip is a champion who loses the argument. So I hand them the business case in a form they can actually forward — the metrics, the before-and-after, the answer to 'why now' — and I coach them on the pushback they'll get from finance and from the incumbent. Then I use them for their highest value: the warm path to the economic buyer. And I keep testing them with small asks, because if they won't take a small risk for me now, they won't fight for me in the room where the decision actually gets made.",
    },
  ],
};

export const M4: CourseModule = {
  id: "m4",
  period: 1,
  number: 4,
  title: "Command of the Sale",
  tagline: "Drive the deal — plan, compete, and close on your terms",
  minutes: 13,
  cards: [
    {
      id: "m4c1",
      title: "Command of the Sale in one card",
      paragraphs: [
        "If Command of the Message is what you say, Command of the Sale is how you run the deal. It's the execution discipline on top: qualify hard (MEDDPICC), build a plan with the customer, drive to a decision by dates, and protect the value through procurement. Force Management pairs the two — message plus sale — because a great pitch with no deal control still slips.",
        "The mindset: you are the general contractor of the deal. The customer, your SE, your partner, and procurement are all on the build — your job is to sequence them so nothing stalls and the close date is real.",
      ],
      sayThis:
        "Command of the Message is what I say; Command of the Sale is how I run it — qualify hard, build the plan with the customer, and drive to a decision by dates instead of hoping.",
      source: "craft",
    },
    {
      id: "m4c2",
      title: "The mutual action plan",
      paragraphs: [
        "The single best deal-control tool: a close plan you build WITH the customer, working backwards from when they need value live. Every step in between — POV, security review, business case to the EB, procurement, legal, signature — gets an owner and a date. You share it, they agree to it, and now slipping a step is a conversation, not a surprise.",
        "A customer who won't co-build a MAP is telling you something: the pain or the 'why now' isn't real yet. That refusal is itself a qualification signal.",
      ],
      sayThis:
        "I build a mutual action plan with the customer — backwards from go-live, every step owned and dated. If they won't build it with me, that tells me the 'why now' isn't real yet.",
      source: "craft",
    },
    {
      id: "m4c3",
      title: "Compete without trashing anyone",
      paragraphs: [
        "Three real competitors, never one. The status quo — do nothing, keep overpaying — is the one you fight hardest, with pain and a compelling event. DIY open source — free software, expensive engineers babysitting pipelines, no governance or support. And the platform's bundled pipeline — which exists to lock data IN, where Cribl's exists to give choice. Never trash Splunk, Datadog, or CrowdStrike; they're destinations, partners, and rivals at once. Cribl wins as Switzerland.",
        "The competitive move is to trap your differentiation: get the customer to value a capability only Cribl has (reversibility, hybrid, search-in-place), so the comparison is over before it starts.",
      ],
      sayThis:
        "My biggest competitor is the status quo, then DIY, then the platform's bundled pipe — and theirs exists to lock data in while ours exists to give choice. I never trash a vendor; Cribl wins as Switzerland.",
      source: "chris",
    },
    {
      id: "m4c4",
      title: "The SE handoff and the POV gate",
      paragraphs: [
        "Your SE is the scarcest resource in the territory — spend their hours only on deals that can convert. Qualify first: real pain, engaged power, a defined process. Brief before every call: who's in the room, what they care about, what you're driving to. And the POV is something a deal EARNS, never an automatic step — it only starts with written success criteria, a timebox, an exec sponsor, and a champion driving it internally.",
        "A POV with no success criteria can never officially succeed; it just eats two weeks and goes quiet. Holding that gate is how you keep your SE team fighting to be on your deals.",
      ],
      sayThis:
        "A POV isn't a demo, it's an engineering engagement — so it has to be earned: written success criteria, a timebox, an exec sponsor, and a champion. Otherwise we're doing free consulting.",
      source: "craft",
    },
    {
      id: "m4c5",
      title: "Close and negotiate — protect the value",
      paragraphs: [
        "Closing is the natural end of a well-run process, not a high-pressure event. By now the value is quantified, the EB has seen it, and the MAP says today is signature day. In negotiation, the rule is never give a concession without a trade: a discount earns a multi-year term, a bigger commit, a case study, or a faster signature. Discounting to 'just get it done' trains the customer that your price was never real.",
        "Anchor on value, not price — the metrics you set in Module 1 are your defense. 'We agreed this saves you $2M a year; the question isn't whether it's worth the license, it's how fast you want the savings.'",
      ],
      sayThis:
        "I never give a concession without a trade — a discount buys me a longer term or a faster signature, never just goodwill. And I anchor on the value we already agreed to, not the price.",
      source: "craft",
    },
    {
      id: "m4c6",
      title: "Land and expand — the deal after the deal",
      paragraphs: [
        "Patrick's existing-account motion, which is most of an enterprise number: tier the accounts, run a day-in-the-life listening tour with the hands-on engineers (how they bought, what they love, hate, wish — that's where white space hides), set a QBR rhythm where their leadership shows up and you introduce new capabilities (Search, Lake), and build executive alignment by bringing your leadership in.",
        "Expansion isn't an accident, it's a calendar. A wish for 'faster search across the S3 archive' is a Cribl Search deal waiting at the next QBR — you just have to be running the motion to catch it.",
      ],
      sayThis:
        "Existing accounts get a system: tier them, listening tour with the engineers, quarterly reviews with their leadership in the room, exec alignment — that's how a wish on the listening tour becomes next quarter's pipeline.",
      source: "patrick",
    },
  ],
  quiz: [
    {
      id: "m4q1",
      prompt: "The difference between Command of the Message and Command of the Sale:",
      options: [
        {
          text: "Message is what you say (the value); Sale is how you run the deal (qualify, plan, drive to a decision, protect value)",
          correct: true,
        },
        { text: "They're two names for the same Force Management framework" },
        { text: "Message is for executives; Sale is for engineers" },
      ],
      explain:
        "Force Management pairs them on purpose: a great pitch with no deal control still slips. You're the general contractor — sequencing the customer, SE, partner, and procurement so the close date is real.",
    },
    {
      id: "m4q2",
      prompt: "A customer won't co-build a mutual action plan with you. What does that tell you?",
      options: [
        { text: "They're just busy — push the MAP later" },
        {
          text: "The pain or the 'why now' isn't real yet — the refusal is a qualification signal",
          correct: true,
        },
        { text: "They prefer to negotiate price first" },
      ],
      explain:
        "A real buyer with a compelling event will co-own the steps to value. Refusal to build the plan is itself data: you haven't earned 'why now,' so go back and work the pain.",
    },
    {
      id: "m4q3",
      prompt: "An engineer says 'we'd just build this with open source.' Best response:",
      options: [
        { text: "Open source can't technically do what Cribl does" },
        {
          text: "Some teams do — then they're staffing engineers to babysit pipelines instead of doing security; free software isn't free at scale, and it has no governance or support",
          correct: true,
        },
        { text: "You're right, DIY is usually the better call for technical teams" },
      ],
      explain:
        "Respect the engineer (open source CAN move data), then reframe to total cost: engineering time, on-call, governance, support, scale. Never claim it 'can't' — that's false and they'll know.",
    },
    {
      id: "m4q4",
      prompt: "What must exist BEFORE a POV starts?",
      options: [
        { text: "A signed purchase order" },
        {
          text: "Written success criteria, a timebox, an exec sponsor, and a champion driving it internally",
          correct: true,
        },
        { text: "Nothing — POVs are how you create interest in the first place" },
      ],
      explain:
        "A POV without success criteria can never officially succeed — it just consumes SE weeks and goes quiet. Criteria + timebox + sponsor + champion is the discipline that makes the SE team trust you with their hours.",
    },
    {
      id: "m4q5",
      prompt: "The rule in any negotiation concession:",
      options: [
        {
          text: "Never give a concession without a trade — a discount earns a longer term, bigger commit, case study, or faster signature",
          correct: true,
        },
        { text: "Give the discount early to build goodwill and speed the deal" },
        { text: "Hold firm on list price no matter what" },
      ],
      explain:
        "Discounting to 'just get it done' teaches the customer your price was never real. Every give earns a get — and you anchor on the value already agreed, not the price.",
    },
    {
      id: "m4q6",
      prompt: "Why is 'land and expand' most of an enterprise number?",
      options: [
        {
          text: "The existing-account motion — tier, listening tour, QBR rhythm, exec alignment — turns white space into repeatable pipeline",
          correct: true,
        },
        { text: "Renewals are automatic once a customer signs" },
        { text: "New logos are banned in year one" },
      ],
      explain:
        "Expansion is a calendar, not an accident. The QBR is an expansion engine disguised as a check-in: leadership shows up, champions get credit, and a 'wish' on the listening tour becomes a Search or Lake deal.",
    },
    {
      id: "m4q7",
      prompt: "Why never trash-talk Splunk, Datadog, or CrowdStrike?",
      options: [
        {
          text: "They're destinations, partners, and rivals at once — Cribl wins as Switzerland, and the customer keeps using them",
          correct: true,
        },
        { text: "Legal disparagement clauses forbid it" },
        { text: "You should — differentiation requires drawing blood" },
      ],
      explain:
        "Cribl feeds these platforms data daily and customers love them; 'keep what you love, we make it cheaper and better' wins. Trash talk also torches alliances — Palo Alto is literally a named Cribl partner.",
    },
    {
      id: "m4q8",
      prompt: "The cleanest way to handle the close after a well-run process:",
      options: [
        { text: "Apply heavy pressure and a now-or-never discount" },
        {
          text: "Treat it as the natural next step — the value's quantified, the EB has seen it, and the MAP says today is signature day",
          correct: true,
        },
        { text: "Wait for the customer to bring it up themselves" },
      ],
      explain:
        "Closing is the end of a process, not an event. If you've run Command of the Sale, the signature is already on the mutual action plan — you're confirming a date, not pressuring a decision.",
    },
  ],
  writeIn: [
    {
      id: "m4w1",
      prompt:
        "What's a mutual action plan, and why do you build it WITH the customer?",
      keyPoints: [
        "A close plan built backwards from when the customer needs value live",
        "Every step — POV, security review, business case to the EB, procurement, legal, signature — gets an owner and a date",
        "You share it and they agree, so a slip is a conversation, not a surprise",
        "If a customer won't co-build it, the pain / 'why now' isn't real yet — it's a qualification signal",
      ],
      model:
        "A mutual action plan is the close plan I build with the customer, working backwards from when they need value live. Every step in between — POV, security review, the business case to the economic buyer, procurement, legal, signature — gets an owner and a date, and because we built it together, slipping a step becomes a conversation instead of a surprise. And it's a qualifier: if a customer won't co-build the plan with me, they're telling me the 'why now' isn't real yet, and I go back and work the pain.",
    },
    {
      id: "m4w2",
      prompt:
        "How do you protect price in a negotiation — give me your actual rule.",
      keyPoints: [
        "Never give a concession without a trade",
        "A discount earns a longer term, bigger commit, case study, or faster signature",
        "Discounting to 'just close it' teaches the customer the price was never real",
        "Anchor on the value already agreed (the metrics), not on price",
      ],
      model:
        "My rule is simple: I never give a concession without a trade. If they want a discount, that buys me something — a multi-year term, a bigger commitment, a reference, a faster signature — never just goodwill, because discounting to 'just get it done' teaches them my price was never real. And I keep the conversation anchored on the value we already agreed to: we said this saves you $2M a year, so the question isn't whether it's worth the license, it's how fast you want the savings.",
    },
    {
      id: "m4w3",
      prompt:
        "Walk me through your land-and-expand motion on an existing account.",
      keyPoints: [
        "Tier the accounts",
        "Run a day-in-the-life listening tour with the hands-on engineers — what they love, hate, wish (white space)",
        "Set a QBR rhythm where their leadership shows up and you introduce new capabilities (Search, Lake)",
        "Build executive alignment by bringing your leadership in",
        "Expansion is a calendar, not an accident — a 'wish' becomes next quarter's pipeline",
      ],
      model:
        "Existing accounts get a system. I tier them, then run a day-in-the-life listening tour with the hands-on engineers — how they bought, what they love, what they hate, what they wish it did, because that wish list is where the white space hides. I set a quarterly rhythm where their leadership shows up, my champions get credit, and the specialist teams introduce Search or Lake. And I build executive alignment by bringing my own leadership in. Expansion isn't an accident — it's a calendar. A wish for faster archive search on the listening tour is a Cribl Search deal waiting at the next QBR.",
    },
  ],
};

export const M5: CourseModule = {
  id: "m5",
  period: 1,
  number: 5,
  title: "Pipeline Generation",
  tagline: "Self-source pipeline and win net-new — the thing they're really hiring for",
  minutes: 13,
  cards: [
    {
      id: "m5c1",
      title: "Demand generator, not demand servicer",
      paragraphs: [
        "Patrick's sharpest filter: there are sellers who generate demand and sellers who service demand someone else created — and the second kind 'flop very quickly' at Cribl, because you're activating people who don't even know what Cribl is yet. Buyers need to hear the story six, seven, eight times. His metaphor: the gritty defensive lineman who gets hit every snap and is ready when the hole opens.",
        "Your counter-evidence: founder life was 100% demand generation — five-percent close rates, fundraising rejection, no inbound anything. You've already lived the grit; the cadence below is just structure around what you do.",
      ],
      sayThis:
        "I know the difference between generating demand and servicing it — I spent six years where nothing happened unless I made it happen. The cadence is just structure around what I already do.",
      source: "patrick",
    },
    {
      id: "m5c2",
      title: "The cadence — the floor, not the ceiling",
      paragraphs: [
        "Patrick is prescriptive and will expect you to know it: 10 emails + 10 phone calls + 10 LinkedIn touches to 10 people, every day. Two partner meetings a week. Four field-marketing events a month. Do that and pipeline happens; do more and more happens.",
        "Style notes that matter: take meetings in person — coffees and lunches 'spider' your network through the territory. 'Sell from your feet, not your seat.' Your personal bar — ten in-person meetings a month — fits right in, and Patrick confirmed it's realistic.",
      ],
      sayThis:
        "Ten emails, ten calls, ten LinkedIn touches a day; two partner meetings a week; four field events a month — that's the floor, not the ceiling. And as much of it in person as I can make happen.",
      source: "patrick",
    },
    {
      id: "m5c3",
      title: "The 4-layer territory plan",
      paragraphs: [
        "The plan Patrick responded well to — tell it the same way every time. Layer 1: deals already in the pipeline — most time, transition them carefully. Layer 2: the top-20 strategic targets — real account files, people plans, and a named partner angle for each. Layer 3: your network — Philly born and raised, Penn State, eight years of benefits relationships, founder network. Layer 4: strategic cold outreach — personal, creative, pattern-interrupt, never spray-and-pray.",
        "Time-weight them in that order. When Tim asks about your process, this is the spine of the answer — and they compare notes.",
      ],
      sayThis:
        "Four layers, weighted in order: live pipeline first, then a top-20 target list with real account plans, then my Philly network, then creative cold outreach.",
      source: "chris",
    },
    {
      id: "m5c4",
      title: "The prospecting message — Command of the Message, cold",
      paragraphs: [
        "Outbound that works isn't 'can I have 15 minutes' — it's the gap, compressed. Lead with a current-state pain the prospect actually has ('your Splunk renewal is coming and your data's up 30%'), hint at the consequence, and offer the future state as the reason to talk. Same engine as a deal, just shorter.",
        "Then the pattern interrupt that's your signature: a personalized video. It's literally how you got Patrick's attention — a receipt, not a claim. In a sea of identical emails, the rep who does something human and specific gets the call back.",
      ],
      sayThis:
        "My outbound is the gap in two sentences — your renewal's coming, your data's exploding, here's the version where you control it. And my pattern interrupt is a personal video; it's how I got Patrick to take my call.",
      source: "chris",
    },
    {
      id: "m5c5",
      title: "Multi-thread the target from the outside",
      paragraphs: [
        "Prospecting isn't one contact, it's a beachhead into a committee. Pick a top-20 account and work several seats at once with a different angle each: the engineer feels the plumbing pain, the architect fears the one-way door, the VP wants capacity back, the CISO wants control and audit-readiness. Multiple warm threads beat one cold one — and if your single contact goes quiet, the account doesn't.",
        "This is where PG and qualification meet: the threads you open now become the committee you map with MEDDPICC later.",
      ],
      sayThis:
        "I don't prospect a person, I prospect an account — several seats at once, a different angle each, so the account stays alive even if one contact goes dark.",
      source: "craft",
    },
    {
      id: "m5c6",
      title: "Partners as a pipeline engine",
      paragraphs: [
        "At ~95% channel, partners aren't just how deals close — they're where pipeline comes from. Two partner meetings a week (Patrick's baseline) is a PG channel: partners live in these accounts year-round, know who has budget and who has juice, and can hand you warm intros to initiatives you'd never find cold. Partner-sourced pipeline is the highest-quality pipeline you'll generate.",
        "The trade is reciprocity — you bring them deals too. An AE who only takes from partners gets cut off; one who feeds them becomes the rep their reps call first. (The full channel motion is the next module.)",
      ],
      sayThis:
        "Two partner meetings a week isn't overhead, it's a pipeline channel — partners know who owns the budget and the initiative before I'd ever find it cold, as long as I'm feeding them deals too.",
      source: "patrick",
    },
  ],
  quiz: [
    {
      id: "m5q1",
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
        "Cribl sellers activate people who've never heard the story — six-plus touches, real grit. Your founder years are the counter-evidence: nobody was inbound-ing you funding or customers.",
    },
    {
      id: "m5q2",
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
      id: "m5q3",
      prompt: "In your 4-layer territory plan, what gets the MOST time?",
      options: [
        { text: "Layer 4 — creative cold outreach, because new logos matter most" },
        { text: "Layer 1 — deals already in the pipeline", correct: true },
        { text: "Layer 3 — personal network coffees" },
      ],
      explain:
        "Live pipeline first — closest to revenue and most fragile in a handoff. Then top-20 strategic targets, then network activation, then cold outreach. Weighted, in that order.",
    },
    {
      id: "m5q4",
      prompt: "What makes a cold outbound message actually work?",
      options: [
        { text: "A polite ask for 15 minutes and a calendar link" },
        {
          text: "The gap compressed — a real current-state pain, the consequence, and the future state as the reason to talk",
          correct: true,
        },
        { text: "A full feature list so they know what Cribl does" },
      ],
      explain:
        "Same engine as a deal, just shorter: lead with their pain (renewal coming, data exploding), not your ask. Then a pattern interrupt — your personalized video — to stand out in a sea of identical emails.",
    },
    {
      id: "m5q5",
      prompt: "Why prospect several seats in a target account at once?",
      options: [
        {
          text: "Multiple warm threads beat one cold one — and if a single contact goes quiet, the account stays alive",
          correct: true,
        },
        { text: "It hits your daily activity numbers faster" },
        { text: "Procurement requires three internal contacts" },
      ],
      explain:
        "Prospect the account, not the person — engineer, architect, VP, CISO, each with a different angle. The threads you open now become the committee you map with MEDDPICC later.",
    },
    {
      id: "m5q6",
      prompt: "Why are two partner meetings a week part of PIPELINE generation, not just deal execution?",
      options: [
        {
          text: "Partners live in accounts year-round and hand you warm intros to initiatives you'd never find cold — partner-sourced is the highest-quality pipeline",
          correct: true,
        },
        { text: "Partners process the paperwork faster" },
        { text: "It's a compliance requirement at Cribl" },
      ],
      explain:
        "At ~95% channel, partners are a pipeline engine, not overhead. They know who owns budget and who has juice — but only if you're feeding them deals too. Reciprocity is the price of the intel.",
    },
    {
      id: "m5q7",
      prompt: "Your signature pattern interrupt — and why it belongs in your PG story:",
      options: [
        {
          text: "A personalized video — it's a receipt, not a claim: it's literally how you got Patrick to take your call",
          correct: true,
        },
        { text: "Mass-sending a templated email to 500 prospects" },
        { text: "Waiting for marketing to warm the lead first" },
      ],
      explain:
        "'I do creative outreach' is a claim; 'here's the video that got Patrick on the phone' is proof. Peers and managers respect receipts — and Patrick already told you that move stood out.",
    },
    {
      id: "m5q8",
      prompt: "An interviewer asks 'where will your pipeline come from?' The weakest answer:",
      options: [
        { text: "'Live pipeline first, then my top-20 with account plans, my network, and creative cold — with the 10-10-10 floor under it.'" },
        { text: "'Marketing and the SDR team will feed me leads.'", correct: true },
        { text: "'Partner-sourced is my highest-quality channel, so two partner meetings a week.'" },
      ],
      explain:
        "Leaning on marketing/SDRs is the demand-servicer answer that flops at Cribl. They're hiring a demand generator — your four layers and the 10-10-10 floor are the answer.",
    },
  ],
  writeIn: [
    {
      id: "m5w1",
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
      id: "m5w2",
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
    {
      id: "m5w3",
      prompt:
        "Why are you confident you can self-source pipeline — and how is that different from servicing demand?",
      keyPoints: [
        "Demand generators create interest where none exists; demand servicers work leads someone else made",
        "Patrick's filter: demand servicers flop at Cribl because buyers don't know Cribl yet",
        "Six years as a founder was 100% demand generation — no inbound, ~5% close rates, fundraising rejection",
        "The 10-10-10 cadence is just structure around grit you already have",
        "Partner-sourced pipeline and creative outbound (the video) are your highest-quality channels",
      ],
      model:
        "There are sellers who generate demand and sellers who service it — and Patrick's point is the servicers flop at Cribl, because half the market doesn't even know what Cribl is yet. I spent six years as a founder where nothing happened unless I made it happen — no inbound, brutal close rates, constant fundraising rejection. That's pure demand generation, and the 10-10-10 cadence is just structure around grit I already have. On top of it I lean on the two channels that convert best: partner-sourced intros and creative outbound — the personal video that got Patrick on the phone.",
    },
  ],
};

export const M6: CourseModule = {
  id: "m6",
  period: 1,
  number: 6,
  title: "The Channel & The Room",
  tagline: "Run the VAR ecosystem AND the customer's committee — the multi-pronged motion",
  minutes: 14,
  cards: [
    {
      id: "m6c1",
      title: "Why channel is existential at Cribl",
      paragraphs: [
        "Ami's number: Cribl is ~95% channel-driven. Patrick says 100%. Either way, essentially every deal involves a partner — which is why an AE who creates channel friction is a non-starter, whatever else they bring. Cribl's own site calls it a 'partner-first organization' and says it plainly: 'We work with the RIGHT partners, not EVERY partner.'",
        "The strategic logic is elegant: partners love Cribl because it's vendor-neutral. It makes everything else in their bag work better, there's nothing to rip out, and there's services revenue attached. Cribl pitches partners on becoming the 'data broker' for their customers. It's the easiest co-sell in their bag.",
      ],
      sayThis:
        "Cribl being vendor-neutral makes it the easiest co-sell in a partner's bag — it makes everything else they sell work better, with services revenue attached. At ~95% channel, an AE who fights that is dead on arrival.",
      source: "ami",
    },
    {
      id: "m6c2",
      title: "Deal registration is sacred",
      paragraphs: [
        "Deal registration: a partner files a claim on an opportunity they sourced, locking in their margin and protection. Respecting deal reg is the #1 etiquette rule — it's the partner's incentive to bring Cribl deals at all. Going around a partner's registration to run direct is how an AE gets blacklisted by the entire partner community, not just one firm.",
        "The instinct to internalize: a partner-registered deal at one of your target accounts is GOOD news. Co-sell it, make them money, and use their relationship to go deeper than you could alone. Contesting it torches a relationship the partner manager spent years building — over one deal.",
      ],
      sayThis:
        "If a partner registered the deal, that's their deal — my job is to make them money on it, because that's what keeps the next ten referrals coming.",
      source: "craft",
    },
    {
      id: "m6c3",
      title: "The partner cast and their lanes",
      paragraphs: [
        "Solution providers / VARs advise, resell, and implement. The regional names in Cribl's ecosystem: SHI (the volume giant, NJ-based), Optiv and GuidePoint (security-specialized), Presidio and Ahead (infrastructure/cloud), Trace3. Also: Carahsoft (the government channel — pairs with the FedRAMP story), GSIs like Accenture and Deloitte, and the cloud marketplaces (AWS, Microsoft — deals can transact through committed-spend agreements).",
        "And the coopetition fact: Palo Alto is both a platformization rival and a named Cribl technology partner. That tangle is normal here — speak of every vendor respectfully. Knowing each partner's lane tells you which one fits which play: a SIEM migration → security specialist; a FedRAMP deal → Carahsoft; infrastructure modernization → Ahead/Presidio; everywhere → SHI.",
      ],
      sayThis:
        "I know the regional cast — SHI, Optiv, GuidePoint, Presidio, Ahead — and their lanes, so I bring the right partner to the right play instead of treating them as interchangeable.",
      source: "cribl.io",
    },
    {
      id: "m6c4",
      title: "Co-sell and the intel loop",
      paragraphs: [
        "Bring partners in EARLY — when there's still services revenue and influence to share — not at the end for paperwork. The vocabulary that matters: partner-sourced vs. partner-influenced (did they originate it or help it along — partner managers get measured on this); MDF (market development funds — vendor money for partner events); enablement (teaching partner reps to spot Cribl triggers — SIEM renewal pain, agent sprawl, AI data projects — so they call you).",
        "The intel loop Patrick described: you pick up a signal in an account → the partner tells you who owns that initiative, where the funding sits, who has juice → you walk in with a warm intro to the right person. Partners ARE the informal power map; that's what your two partner meetings a week are for.",
      ],
      sayThis:
        "I bring partners in early and feed the loop both directions — my signal for their account intel — so I'm meeting whoever actually owns the initiative instead of burning a first meeting finding out.",
      source: "patrick",
    },
    {
      id: "m6c5",
      title: "Work the room — multi-thread the committee",
      paragraphs: [
        "The other half of 'multi-pronged': inside the customer, it's a committee, and you say something different to each seat. CISO/CIO buys control and reversibility (choice, flexibility, control). VP of Observability buys capacity back — the team stops being a plumbing crew. The architect buys reversibility — no one-way doors. The engineer buys one control plane instead of fifty scripts and fewer 2am pages. Same product, four conversations.",
        "Map formal power (titles, org chart) AND informal power (who actually has juice, whose opinion the CISO trusts). Single-threading is fragile; the trusted architect may outweigh a VP on paper — and partners often know that informal map better than anyone inside the account.",
      ],
      sayThis:
        "The pitch changes per seat: the CISO buys control, the VP buys capacity back, the architect buys reversibility, the engineer buys fewer 2am pages. Same product, four different conversations — and I map informal power, not just the org chart.",
      source: "patrick",
    },
    {
      id: "m6c6",
      title: "Orchestrate the multi-party deal",
      paragraphs: [
        "An enterprise Cribl deal has more players than a direct sale: the customer's committee, the partner (or partners), your SE, sometimes a cloud marketplace or an alliance like AWS. You're the conductor. The skill is sequencing — partner opens the door and brings intel, you run the business case and qualify, the SE proves the technical bridge, the partner attaches services and helps with paper, the marketplace handles the transaction.",
        "Get the order wrong and people step on each other; get it right and every party is making money and pushing the deal forward at once. That orchestration — not product depth — is what the AE role actually is.",
      ],
      sayThis:
        "I think of myself as the conductor of a multi-party deal — partner opens the door and brings intel, I run the business case, the SE proves the bridge, the partner attaches services. My job is sequencing them so nobody steps on anybody.",
      source: "craft",
    },
  ],
  quiz: [
    {
      id: "m6q1",
      prompt: "How much of Cribl's business runs through the channel?",
      options: [
        { text: "About half" },
        { text: "~95% (Ami) — Patrick rounds it to 100%", correct: true },
        { text: "About 25% — channel is an experiment" },
      ],
      explain:
        "Essentially every deal involves a partner. That single number explains why the Kat interview exists: an AE who creates channel friction is a non-starter, whatever else they bring.",
    },
    {
      id: "m6q2",
      prompt: "A partner registered a deal at one of YOUR top-20 targets. You:",
      options: [
        {
          text: "Lean in: co-sell it, make them money, and use their relationship to go deeper than you could alone",
          correct: true,
        },
        { text: "Contest the registration — you had the account in your plan first" },
        { text: "Work your own contacts in parallel and keep the motions separate" },
      ],
      explain:
        "A partner-registered deal at your target is good news: warm relationships + protected partner economics + your execution. Contesting or running parallel torches the relationship the partner manager spent years building — over one deal.",
    },
    {
      id: "m6q3",
      prompt: "When should a partner enter a deal you sourced yourself?",
      options: [
        { text: "At the end — to process paperwork and take their margin" },
        {
          text: "Early — while there's still influence, services revenue, and account intel to share",
          correct: true,
        },
        { text: "Never — self-sourced deals should stay direct" },
      ],
      explain:
        "Bringing partners in early is what 'partner-first' means in practice — they add services, intel, and exec relationships, and they remember which AEs share early. At ~95% channel, 'keep it direct' isn't on the menu.",
    },
    {
      id: "m6q4",
      prompt: "Match partner to lane:",
      options: [
        {
          text: "Optiv & GuidePoint = security specialists; SHI = volume giant; Ahead & Presidio = infrastructure/cloud; Carahsoft = government",
          correct: true,
        },
        { text: "Carahsoft = security boutique; Optiv = government distributor" },
        { text: "They're interchangeable national VARs — lane doesn't matter" },
      ],
      explain:
        "Knowing each lane tells you which partner fits which play: SIEM migration → security specialist; FedRAMP → Carahsoft; infra modernization → Ahead/Presidio; everywhere → SHI.",
    },
    {
      id: "m6q5",
      prompt: "The 'intel loop' with partners is:",
      options: [
        {
          text: "Your prospecting signal flows to the partner; their account knowledge — who owns the initiative, where funding sits, who has juice — flows back; you both enter warmer",
          correct: true,
        },
        { text: "Partners share customer lists quarterly for cold outreach" },
        { text: "Cribl sends partners weekly market-intel briefings" },
      ],
      explain:
        "Two-way intel is the real channel motion: you bring fresh signal, they bring the informal power map built over years. That exchange is what your two partner meetings a week are for.",
    },
    {
      id: "m6q6",
      prompt: "The right message for the VP of Observability:",
      options: [
        { text: "Audit-ready compliance reporting" },
        {
          text: "Your team stops being a plumbing crew — new sources in hours, migrations without fear, capacity to say yes again",
          correct: true,
        },
        { text: "Endpoint agent consolidation" },
      ],
      explain:
        "Toil and capacity are the VP's currency (the Hughes story: the team could finally say yes). Compliance is the CISO's; agents are the engineer's daily pain. Match the message to the seat.",
    },
    {
      id: "m6q7",
      prompt: "Why map informal power, not just the org chart?",
      options: [
        {
          text: "Deals get swung by whoever actually has juice — the trusted architect can outweigh a VP — and partners often know that informal map best",
          correct: true,
        },
        { text: "It doesn't matter — enterprise deals follow the org chart" },
        { text: "Informal power only matters at small companies" },
      ],
      explain:
        "Patrick's phrase: figure out 'who has influence and who has juice.' Single-threading the org chart misses the real decision-makers. Partners, who live in these accounts year-round, are your shortcut to the informal map.",
    },
    {
      id: "m6q8",
      prompt: "The AE's actual core skill in a multi-party Cribl deal:",
      options: [
        { text: "Deep technical knowledge of the product" },
        {
          text: "Orchestration — sequencing the partner, the committee, the SE, and procurement so every party is moving the deal at once",
          correct: true,
        },
        { text: "Negotiating the lowest possible price" },
      ],
      explain:
        "You're the conductor: partner opens the door and brings intel, you run the business case, the SE proves the bridge, the partner attaches services. That orchestration — not product depth — is what the AE job is.",
    },
  ],
  writeIn: [
    {
      id: "m6w1",
      prompt:
        "Why is channel existential at Cribl — and why do partners genuinely love selling it?",
      keyPoints: [
        "~95% channel-driven (Ami); Patrick rounds it to 100% — essentially every deal has a partner",
        "Cribl is a partner-first organization: 'the RIGHT partners, not EVERY partner'",
        "Partners love it because it's vendor-neutral — it makes their whole portfolio work better, nothing to rip out",
        "It lets them become 'data brokers' with services revenue attached",
        "So an AE who creates channel friction is a non-starter",
      ],
      model:
        "Ami says about 95% channel-driven; Patrick just says 100%. Either way, essentially every deal has a partner in it — which is why an AE who creates channel friction is a non-starter. And partners love Cribl because it's vendor-neutral: it makes everything else in their bag work better, so there's nothing to rip out, plus services revenue attached. Cribl's own pitch to them is 'become the data broker for your customers.' It's the easiest co-sell in their bag.",
    },
    {
      id: "m6w2",
      prompt:
        "A partner registered a deal at one of YOUR top-20 targets. What do you do, and why?",
      keyPoints: [
        "Lean in — co-sell it with them and make them money",
        "Use their relationship to go deeper than you could alone",
        "Do NOT contest the registration or quietly run your own contacts in parallel",
        "Deal reg is sacred — it's the partner's incentive to bring you the next ten deals",
        "At ~95% channel, 'keep it direct' isn't even on the menu",
      ],
      model:
        "That's good news, not a turf problem. I co-sell it with them — make them money on it and use their relationship to get deeper than I could alone. What I don't do is contest the registration or run my own contacts in parallel; that torches a relationship the partner manager spent years building, over one deal. If a partner registered it, that's their deal, and protecting that is what keeps the next ten referrals coming.",
    },
    {
      id: "m6w3",
      prompt:
        "Kat asks who you'd call on in a new account. Give the strong, differentiated answer — and tie in the channel.",
      keyPoints: [
        "The whole buying committee — a consensus buy, four or five yeses, so multi-thread from day one",
        "A different message per seat: CISO/CIO buys control and reversibility; VP buys capacity back; architect buys reversibility; engineer buys one control plane / fewer 2am pages",
        "Map informal power, not just the org chart",
        "Use partners to find the informal power and the warm intro",
      ],
      model:
        "The whole committee, and I'd say something different to each seat — that's the difference between an enterprise seller and someone reading the org chart. The CISO buys control and reversibility, choice and flexibility. The VP of observability buys capacity back, their team stops being a plumbing crew. The architect buys reversibility, no one-way doors. The engineer buys one control plane and fewer 2am pages. Same product, four conversations. And I map informal power, not just titles — which is exactly where partners earn their keep: they've been in the account for years, so they tell me who actually has juice and get me the warm intro.",
    },
  ],
};

export const PERIOD1 = [M1, M2, M3, M4, M5, M6];
