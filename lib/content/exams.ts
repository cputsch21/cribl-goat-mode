import type { Exam } from "./types";

export const KAT_EXAM: Exam = {
  id: "kat",
  title: "The Kat Simulation",
  subtitle:
    "Fifteen scenarios, the way she'd actually raise them. Pass at 90% and walk in Monday like you've done this before.",
  questions: [
    {
      id: "kx1",
      prompt:
        "Kat opens with: 'So, tell me how you think about working with partners.' Your first beat:",
      options: [
        {
          text: "'Before I answer — I called a couple of friends at Ahead and SHI this weekend to hear how Cribl shows up from their side. Want to hear what they said?'",
          correct: true,
        },
        { text: "A crisp definition of VARs, distributors, and deal registration" },
        { text: "'I'll be honest — channel is the part of the job I know least about.'" },
      ],
      explain:
        "Lead with the homework nobody else did. It answers her real question (will this guy invest in partners?) with evidence instead of theory — then you can layer in the model and the honesty about what's new to you.",
    },
    {
      id: "kx2",
      prompt:
        "'We're about 95% channel. What does that actually mean for how you'd run your week?'",
      options: [
        {
          text: "Two partner meetings a week minimum, a named partner play inside every top-20 account plan, and leads flowing both directions — partners aren't a lane, they're in everything",
          correct: true,
        },
        { text: "Route all your prospecting through partner reps to maximize their coverage" },
        { text: "Focus your week on direct PG and pull partners in at the proposal stage" },
      ],
      explain:
        "At ~95% channel, partner motion is woven through everything — but you still drive your own demand (that's what makes you valuable TO partners). Option two outsources your job; option three is the 'paperwork partner' anti-pattern.",
    },
    {
      id: "kx3",
      prompt:
        "A boutique Philly partner brings you into their account, the deal closes, and weeks later you spot a second opportunity in the same account. You:",
      options: [
        {
          text: "Bring it straight back to that partner — their account, their intro, their economics — and build the play together",
          correct: true,
        },
        { text: "Run it direct — your relationship with the customer is established now" },
        { text: "Shop it to a bigger partner who can add more services value" },
      ],
      explain:
        "The partner who opened the door keeps the account relationship. Running direct or re-shopping their account is the kind of move that travels through the entire partner community by Friday. Loyalty compounds; betrayal compounds faster.",
    },
    {
      id: "kx4",
      prompt:
        "'Walk me through how you'd pick WHICH partner for a given opportunity.'",
      options: [
        {
          text: "Match the partner's lane to the play — security specialists like Optiv/GuidePoint for a SIEM migration, Ahead/Presidio for infrastructure, Carahsoft for federal — and weight who already has the relationship in that account",
          correct: true,
        },
        { text: "Always the biggest partner — more reach, more resources" },
        { text: "Rotate evenly so every partner gets fair share" },
      ],
      explain:
        "Two variables: lane fit and existing relationship. The relationship usually wins — a partner with a trusted exec contact in the account beats a slightly better lane fit without one. 'Biggest' and 'fairness rotation' both ignore what actually closes deals.",
    },
    {
      id: "kx5",
      prompt:
        "Kat: 'An AE on another team kept going around deal regs last year. What's your take on deal registration?'",
      options: [
        {
          text: "It's the trust engine — protected margin is WHY partners bring us deals. I'd treat a registered deal as the partner's deal and my job as making them money on it.",
          correct: true,
        },
        { text: "It's a necessary evil that sometimes costs the customer a better price" },
        { text: "Useful guideline, but the AE's quota has to come first when they conflict" },
      ],
      explain:
        "She's testing values, not vocabulary. Deal reg IS the partnership — undermine it once and the referral pipeline dies quietly. Any answer with an asterisk ('but quota first') is the wrong answer.",
    },
    {
      id: "kx6",
      prompt:
        "'How would you use your personal friendships at the partners without stepping on my relationships?'",
      options: [
        {
          text: "'They're warm doors, not my channel strategy — you own these partnerships and call the plays; my relationships just help us move faster on the plays you want to run.'",
          correct: true,
        },
        { text: "'I'd work my friends informally and keep it separate from the official motion.'" },
        { text: "'Honestly, with friends there, I probably don't need much formal partner programming.'" },
      ],
      explain:
        "Exactly the question her gut is asking. 'Back-channel my friends' and 'don't need the program' are both turf threats. Asset-under-her-game-plan is the force-multiplier answer — and happens to be the truth.",
    },
    {
      id: "kx7",
      prompt:
        "A partner rep asks you point-blank: 'Why should I pitch Cribl instead of the pipeline feature my SIEM vendor bundles for free?'",
      options: [
        {
          text: "'The bundled pipeline locks data INTO their platform — Cribl is neutral, makes everything in your portfolio work better, and attaches your services revenue. You stay the customer's trusted advisor instead of one vendor's reseller.'",
          correct: true,
        },
        { text: "'Cribl pays better margin than the SIEM vendor.'" },
        { text: "'The bundled tools are technically inferior — I can send a comparison sheet.'" },
      ],
      explain:
        "Sell the partner's self-interest, not just specs or margin: neutrality protects THEIR advisor status, services attach is THEIR revenue, and Cribl's 'data broker' pitch to partners (straight off cribl.io) makes their whole portfolio stickier.",
    },
    {
      id: "kx8",
      prompt:
        "'What would your first 30 days with the partner ecosystem look like?'",
      options: [
        {
          text: "Sit with you and map the real landscape — who drives pipeline vs. fulfills — then meet the key partner reps WITH you, bring my account-level intel to those meetings, and lock the two-meetings-a-week rhythm in",
          correct: true,
        },
        { text: "Blast an intro email to every partner in the region and book whoever responds" },
        { text: "Wait until I have my own pipeline before engaging partners — earn credibility first" },
      ],
      explain:
        "Start with HER map, enter together, bring something (intel, target lists) to every meeting, and systematize the cadence. Spray-intro is noise; 'wait until I have pipeline' misunderstands that partners are how pipeline gets built here.",
    },
    {
      id: "kx9",
      prompt:
        "Kat mentions co-hosting a field event with a partner next month. The AE's job around an event like that:",
      options: [
        {
          text: "Build the target list, personally drag prospects there (calls, not just emails), work the room with the partner reps, and run the follow-up within 48 hours — the event is the middle of the play, not the play",
          correct: true,
        },
        { text: "Show up polished and present Cribl's slides well" },
        { text: "Let the partner own attendance — it's their event and their list" },
      ],
      explain:
        "Patrick's system has four field events a month for a reason — but events only convert when the AE drives attendance before and follow-up after. 'I show up and present' is the demand-servicer answer in event form.",
    },
    {
      id: "kx10",
      prompt:
        "'A partner exec asks you what Cribl does — you've got 30 seconds at their sales kickoff.'",
      options: [
        {
          text: "'We're the control layer for enterprise machine data — collect everything, cut the junk, route each tool exactly what it needs. Your customers cut their SIEM bills, your team attaches services, and nothing in your portfolio gets ripped out.'",
          correct: true,
        },
        { text: "The standard customer pitch, word for word — consistency matters most" },
        { text: "'You'd really need one of our SEs for the technical version.'" },
      ],
      explain:
        "The partner version of the pitch ends differently: customer outcome AND partner economics AND portfolio safety. Knowing the pitch shifts per audience — customer, partner, exec — is exactly the fluency this interview is probing for.",
    },
    {
      id: "kx11",
      prompt:
        "Halfway through, Kat asks: 'What questions do you have for me?' Your strongest opener:",
      options: [
        {
          text: "'What does your best AE relationship look like — what does that person do that the average AE doesn't?'",
          correct: true,
        },
        { text: "'How did you get into channel work?'" },
        { text: "'What's Cribl's partner margin structure?'" },
      ],
      explain:
        "It asks her to describe the bar, signals you intend to clear it, and gives you material to respond to in real time. The career question is fine later (rapport); margin mechanics read as a partner-side question, not an AE's.",
    },
    {
      id: "kx12",
      prompt:
        "Kat: 'Be honest — you've never worked a two-tier channel. Why should I believe this will work?'",
      options: [
        {
          text: "'In benefits, the broker WAS the channel — eight years of selling through intermediaries taught me the golden rule: the partner has to win for me to win. The mechanics here are new — deal reg, sourced vs. influenced, MDF — and I've been studying exactly those. The values aren't new.'",
          correct: true,
        },
        { text: "'Channel is fundamentally just relationship-building, and relationships are my strength.'" },
        { text: "'You're right that it's a risk — I'd lean on you heavily for the first year.'" },
      ],
      explain:
        "Translate the experience you DO have (broker-as-channel = selling through intermediaries), name the specific mechanics you've learned, separate values from vocabulary. 'It's all just relationships' waves the question away; 'lean on you heavily' makes you her workload.",
    },
    {
      id: "kx13",
      prompt:
        "A partner shares intel: the CISO at one of your top-20 targets just got budget for a 'data normalization' project. Your move:",
      options: [
        {
          text: "Build the play WITH that partner — joint outreach using their relationship, deal reg theirs from day one — and feed them what your own prospecting has picked up in return",
          correct: true,
        },
        { text: "Thank them and have your SDR start a direct sequence to the CISO immediately" },
        { text: "Verify the intel independently before involving the partner further" },
      ],
      explain:
        "Partner intel converts when the partner stays in the play — their relationship is the warm path, and reciprocity (your intel back) keeps the loop alive. Going direct on their tip is theft with extra steps; 'verify independently' is just slow theft.",
    },
    {
      id: "kx14",
      prompt:
        "'How do you think about Palo Alto — they're platformizing against the category but they're also our technology partner?'",
      options: [
        {
          text: "'Coopetition is the normal state here. With customers I never trash them — Cribl feeds their platform too. Strategically, our story actually makes platform choices SAFER for customers, which is why the partnership makes sense for both sides.'",
          correct: true,
        },
        { text: "'I'd quietly steer customers away from Palo wherever possible.'" },
        { text: "'I find it confusing — companies should be partners or competitors, not both.'" },
      ],
      explain:
        "Switzerland, even under direct questioning. The mature take: vendor-neutrality makes Cribl complementary to every platform — which is why rivals at the strategy layer still integrate at the data layer. Confusion or sabotage both fail the channel-fluency test.",
    },
    {
      id: "kx15",
      prompt:
        "Closing beat. Kat asks if there's anything else. Strongest finish:",
      options: [
        {
          text: "'One thing: if I start in July, what's the single thing I could do in my first 30 days that would make YOUR life easier?' — then write the answer down.",
          correct: true,
        },
        { text: "A recap of your qualifications and enthusiasm for the role" },
        { text: "'No — I think we covered everything thoroughly.'" },
      ],
      explain:
        "It flips the interview into a working session and leaves her holding evidence of what partnership with you feels like. Recaps are forgettable; 'no questions' wastes the last impression. Take the note visibly — that's the move.",
    },
  ],
};

export const CAM_EXAM: Exam = {
  id: "cam",
  title: "The Cam Simulation",
  subtitle:
    "Fifteen scenarios at SE-leader difficulty. Pass at 90% and Tuesday morning is yours.",
  questions: [
    {
      id: "cx1",
      prompt:
        "Cam opens casually: 'So — what does Cribl actually do? Pretend I'm a CIO you just met.'",
      options: [
        {
          text: "'You're generating more machine data every year, every tool wants its own copy, and the bills grow faster than the budgets. Cribl is the control layer in the middle: collect once, cut the junk, protect the sensitive parts, send each tool only what it's worth. Choice, flexibility, control — and it usually funds itself in savings.'",
          correct: true,
        },
        { text: "'Cribl makes Stream, Edge, Search, and Lake — four products covering the telemetry pipeline end to end, with 80+ integrations.'" },
        { text: "'It's an observability pipeline doing reduction, enrichment, and routing of telemetry with replay from object storage.'" },
      ],
      explain:
        "He said CIO — so it's pain → mechanism → outcome in business language, closed with the choice/flexibility/control trio. The product list and the jargon version are both correct facts aimed at the wrong audience; that aim is precisely what he's testing.",
    },
    {
      id: "cx2",
      prompt: "'Okay, now same question — but I'm a skeptical SOC engineer.'",
      options: [
        {
          text: "'One agent instead of five, one control plane instead of fifty scripts. You decide what goes where; junk gets dropped before it hits your SIEM ingest; archived data stays searchable and replays on demand when an investigation needs it.'",
          correct: true,
        },
        { text: "The same CIO pitch — a consistent message is more trustworthy than a tailored one" },
        { text: "'You'll love it — it cuts your SIEM bill by about half.'" },
      ],
      explain:
        "The engineer buys relief, not strategy: agent sprawl, ingest junk, replay during incidents. Repeating the exec pitch to an engineer is how reps lose technical rooms — and 'cuts the bill' is the CFO's reason, not the person on call at 2am.",
    },
    {
      id: "cx3",
      prompt:
        "'A prospect's CISO says: my CrowdStrike rep tells me their platform handles all of this natively. Go.'",
      options: [
        {
          text: "'CrowdStrike's pipeline exists to feed CrowdStrike — it's good at that. The question is whether you want your data strategy owned by any one platform. Control the layer underneath and platformization becomes safe: adopt them fully today, swap or add tomorrow. We make their platform better AND keep it optional.'",
          correct: true,
        },
        { text: "'Their pipeline capabilities are years behind Cribl's — we win those bake-offs.'" },
        { text: "'Fair point — if they're all-in on CrowdStrike, the bundled option is probably fine.'" },
      ],
      explain:
        "The judo move: concede the platform is good, reframe to who owns the data layer, land choice-flexibility-control. Trash talk fails (they love their EDR — and CrowdStrike is in Cribl's ecosystem); capitulation fails harder. Incentives, not insults.",
    },
    {
      id: "cx4",
      prompt:
        "'Walk me through what happens to a log between a server in their data center and someone's dashboard.'",
      options: [
        {
          text: "'Born on the machine → an agent like Edge picks it up → through Stream where it's cleaned, shaped, masked, enriched → routed to the tier it deserves: SIEM if it's high-value, observability tooling for ops, cheap object storage for the rest — and Search can query any of it in place, with replay pulling archives back when needed.'",
          correct: true,
        },
        { text: "'The agent indexes it locally, Search distributes the queries, and the SIEM pulls what it needs on demand.'" },
        { text: "'It's encrypted at the source and goes straight to the SIEM, where Cribl filters what gets stored.'" },
      ],
      explain:
        "Left to right, every time: born → collected → controlled → tiered → searchable. The wrong options scramble the order — Cribl's value is BEFORE the destinations (filtering at the SIEM is too late; you already paid for ingest).",
    },
    {
      id: "cx5",
      prompt:
        "Cam pushes a term you don't know: 'How would you position us against their existing Kafka estate?' You've never heard 'Kafka.' You:",
      options: [
        {
          text: "'I don't know Kafka yet — I'd rather tell you that than fake it. What is it, so I learn it now? In a live deal that's exactly the moment I'd bring my SE in instead of guessing.'",
          correct: true,
        },
        { text: "Infer from context — 'estate' suggests infrastructure, so give a general data-infrastructure answer with confidence" },
        { text: "'Great question — positioning would really depend on the customer's specific architecture.'" },
      ],
      explain:
        "This question IS the interview. An SE leader has watched a hundred AEs bluff and can smell the deflection in option three from orbit. Honest gap + curiosity + 'that's when I'd bring you in' is the only answer that builds trust — and it's your stated brand.",
    },
    {
      id: "cx6",
      prompt:
        "'When in a deal do you pull in an SE? Walk me through it.'",
      options: [
        {
          text: "'After I've qualified — real pain, the right people engaged, a defined process. First meetings are mine to run with the business story. When I bring your SE in, they get a brief: who's in the room, what they care about, what we know, what we're driving toward.'",
          correct: true,
        },
        { text: "'Immediately — technical credibility from the first call doubles win rates.'" },
        { text: "'As late as possible — SE time is precious, so I'd handle everything until the POV.'" },
      ],
      explain:
        "Qualify first, brief always. 'Immediately' burns scarce SE hours on unqualified meetings; 'as late as possible' means the SE inherits a deal shaped without technical truth. The brief detail is what separates 'knows the answer' from 'lives it.'",
    },
    {
      id: "cx7",
      prompt:
        "'A prospect wants a POV. What has to be true before my engineer starts building it?'",
      options: [
        {
          text: "'Written success criteria the customer agreed to, a timebox, an exec sponsor, and a champion driving it internally. Otherwise it's free consulting that can't officially succeed.'",
          correct: true,
        },
        { text: "'Genuine enthusiasm from the technical team — momentum matters more than paperwork.'" },
        { text: "'Budget confirmed and legal already engaged — no POV until the deal is basically done.'" },
      ],
      explain:
        "Criteria + timebox + sponsor + champion: the four-part gate. Enthusiasm without criteria is how two SE weeks evaporate into silence; demanding a done deal first means no one ever gets proof. He wants discipline, not paranoia.",
    },
    {
      id: "cx8",
      prompt:
        "Mid-POV, the customer's engineer asks your SE for a capability Cribl doesn't have. Your SE says so honestly. The prospect cools. Your move as the AE:",
      options: [
        {
          text: "Back your SE's honesty, requalify the gap against the agreed success criteria — is it a need or a nice-to-have? — and reframe to what the POV is proving. Capture the request precisely for product.",
          correct: true,
        },
        { text: "Privately suggest the SE soften the answer — 'on the roadmap' keeps deals alive" },
        { text: "Escalate to Cam for an exception commitment to win the deal" },
      ],
      explain:
        "Never make your SE walk back the truth — that's the overpromising sin with extra steps, and Cam is listening for exactly it. Most 'missing features' are nice-to-haves that the success criteria already scoped out; requalify before you panic.",
    },
    {
      id: "cx9",
      prompt:
        "'Why does our tiering story actually save customers money? Numbers, not vibes.'",
      options: [
        {
          text: "'The SIEM bills on ingest. Most of what's sent there is never queried. Route high-value data to the SIEM for ~90 days, everything else to object storage at a fraction of the cost — still searchable, replayable on demand. Real cases: 41% less daily EDR data, Nutanix halved firewall logs.'",
          correct: true,
        },
        { text: "'Compression and deduplication shrink the data so everything fits in the SIEM for less.'" },
        { text: "'Cribl's licensing is simply cheaper than Splunk's, so the swap saves the delta.'" },
      ],
      explain:
        "The mechanism is routing by value, not shrinking everything or swapping vendors: ingest-based billing + tiering + replay safety net, anchored by the 41% and Nutanix-50% receipts. Get the mechanism right and the numbers do the selling.",
    },
    {
      id: "cx10",
      prompt:
        "'Our AI story — give me the version you'd say to a CISO who's being told to “do AI” by the board.'",
      options: [
        {
          text: "'Your AI agents are only as good as the data feeding them — and only as safe. Cribl is the control point: governed, relevant, masked-before-it-leaves-your-network telemetry to whatever models and agents you adopt. AI readiness, governance, and compliance — without the compute bill exploding.'",
          correct: true,
        },
        { text: "'Cribl ships its own AI SOC agents that replace tier-1 analysts.'" },
        { text: "'Honestly, the AI angle is mostly marketing — the core pipeline value is the real story.'" },
      ],
      explain:
        "Patrick's trio (readiness/governance/compliance) + Guard's mask-before-it-leaves + cost control = the CISO version. Claiming Cribl replaces analysts overstates the product; dismissing AI contradicts both the market and Cribl's own positioning ('the AI platform for telemetry').",
    },
    {
      id: "cx11",
      prompt:
        "'What would you do in your first 30 days to get technically credible — specifically?'",
      options: [
        {
          text: "'Cribl University and the sandbox — hands on, not just slides. Day-in-the-life sessions with the engineers at existing accounts. Shadow your SEs on live calls and take notes on the questions customers actually ask. And keep the system I'm already running — I built a full course on this space to prep for this interview.'",
          correct: true,
        },
        { text: "'Immerse in the docs and certifications until I can run demos myself — AEs shouldn't need SEs for basics.'" },
        { text: "'Honestly, credibility comes from reps — I'd learn by doing deals.'" },
      ],
      explain:
        "Concrete, multi-channel, and humble about the goal (fluency, not SE-replacement). 'Run demos myself' aims at the wrong target; 'learn by doing' is how reps stay vague forever. Mentioning the system you already built turns the answer into evidence.",
    },
    {
      id: "cx12",
      prompt:
        "'An engineer at a prospect says: we'll just build this with open-source tools. Your SE is in the room. What do you do?'",
      options: [
        {
          text: "Respect the instinct, reframe to total cost — 'teams that build it end up staffing a pipeline babysitting function' — then hand to your SE for the technical depth while you hold the business frame: engineering hours, on-call, governance, scale.",
          correct: true,
        },
        { text: "Let the SE handle it entirely — it's a technical objection" },
        { text: "'Open source can't do what Cribl does' — shut it down before it takes root" },
      ],
      explain:
        "DIY is half technical, half economic — so it's a duet: you own the cost-of-ownership frame, the SE owns the technical comparison. Punting entirely abandons your half; 'open source can't' is false and the engineer knows it.",
    },
    {
      id: "cx13",
      prompt:
        "'How do you and an SE split discovery on a first technical call?'",
      options: [
        {
          text: "'I drive the business thread — initiative, stakes, who cares, what success means. The SE drives the technical thread — sources, tools, volumes, architecture. We plan the handoffs before the call and debrief after: one shared picture, two lenses.'",
          correct: true,
        },
        { text: "'I open with intros, then it's the SE's call — discovery is technical work.'" },
        { text: "'I run all the questions and the SE listens for technical signals to follow up on later.'" },
      ],
      explain:
        "Shared discovery, planned handoffs, joint debrief — 'you sell the gap, the SE proves the bridge' in operating form. Disappearing after intros OR hogging the mic both waste having two people in the room.",
    },
    {
      id: "cx14",
      prompt:
        "'Last quarter an AE here promised a customer a feature ship date to close the deal. It slipped. What's your read?'",
      options: [
        {
          text: "'That's the cardinal sin — the SE and CS inherit a broken promise they never made. I don't commit roadmap. If a date matters to the deal, that's a conversation product owns, in writing, with you in the loop.'",
          correct: true,
        },
        { text: "'Sometimes you need momentum — I'd just pad the date heavily next time.'" },
        { text: "'Tough call — depends how big the deal was.'" },
      ],
      explain:
        "There is no deal-size threshold at which overpromising becomes okay — that's the values trap inside the question. Roadmap commitments belong to product, papered, with the SE leader aware. 'Pad the date' is the same sin with a buffer.",
    },
    {
      id: "cx15",
      prompt:
        "Cam wraps: 'Anything you want to ask me?' Your strongest close:",
      options: [
        {
          text: "'Two things: where do deals stall technically here — and what do you wish the AE had done two calls earlier? And as I ramp: how does your team like to get briefed, so my deals deserve your hours from day one?'",
          correct: true,
        },
        { text: "'What's your favorite thing about working at Cribl?'" },
        { text: "'Do you think I have the technical depth for this role?'" },
      ],
      explain:
        "Both questions are operational and SE-centric: one mines his pattern recognition, the other commits you to his team's preferred way of working. The culture question wastes the slot; asking him to grade you live puts him on the spot and you on the back foot.",
    },
  ],
};

export const EXAMS = [KAT_EXAM, CAM_EXAM];
