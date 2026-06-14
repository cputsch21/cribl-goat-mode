import type { CourseModule } from "./types";

export const M8: CourseModule = {
  id: "m8",
  period: 3,
  number: 8,
  title: "The Kat Module",
  tagline: "Channel is how Cribl eats — show her you'll make partners love working with you",
  minutes: 16,
  audience: "Built for Monday 3:30 — Kat Hummel",
  cards: [
    {
      id: "m8c1",
      title: "Who Kat is and what she's evaluating",
      paragraphs: [
        "Kat Hummel is the Partner Business Manager for the region — she owns Cribl's relationships with the partner firms (the resellers and integrators), builds pipeline through them, runs joint events, and enables their sellers to spot Cribl opportunities. Ami hired her and describes her as 'very connected, very professional, very kind, very good human.'",
        "What she's actually deciding in 30 minutes: if I put this AE in front of my partners, does he make Cribl look good? Will he feed the partnership or just take from it? Does he get that channel is how deals happen here — or will he try to do everything direct and create friction?",
      ],
      sayThis:
        "My read is that your partners are an extension of the sales team — so my job is to be the AE their reps want to bring into accounts, not the one they hide from.",
      source: "ami",
    },
    {
      id: "m8c2",
      title: "Why channel is existential at Cribl",
      paragraphs: [
        "Ami's number: Cribl is ~95% channel-driven. Patrick said '100% channel.' Either way: essentially every deal involves a partner. Cribl's own site calls it a 'partner-first organization' and says it plainly: 'We work with the RIGHT partners, not EVERY partner.'",
        "The strategic logic is elegant: partners love Cribl because it's vendor-neutral — Cribl's site literally pitches partners on becoming 'data brokers' for their customers, attaching services revenue, and never having to rip out the other products they sell. Cribl makes the partner's whole portfolio work better together.",
      ],
      sayThis:
        "Cribl being vendor-neutral makes it the easiest co-sell in a partner's bag — it makes everything else they sell work better, and there's services revenue attached for them.",
      source: "ami",
    },
    {
      id: "m8c3",
      title: "The cast of characters",
      paragraphs: [
        "Solution providers / VARs — advise customers, resell, and implement: SHI, Optiv, GuidePoint Security, Presidio, Ahead, Trace3 are the national names in Cribl's ecosystem (several confirmed on cribl.io's partner page; Ami named SHI, Optiv, Presidio, Ahead, GuidePoint for this region, plus Philly boutiques). Optiv and GuidePoint are security-specialized; SHI is the volume giant (huge, NJ-based); Ahead and Presidio lean infrastructure/cloud.",
        "Also in the picture: Carahsoft (the government channel — pairs with the FedRAMP story), global integrators like Accenture and Deloitte, cloud marketplaces (AWS, Microsoft — deals can transact through cloud committed-spend agreements), and technology alliances (including Palo Alto — yes, a platformization rival is also a partner; coopetition is normal here).",
      ],
      sayThis:
        "I know the regional cast — SHI, Optiv, GuidePoint, Presidio, Ahead — and I know a few of their people personally. What I'd want from you is the real map: who actually drives Cribl pipeline here versus who just takes orders.",
      source: "cribl.io",
    },
    {
      id: "m8c4",
      title: "The vocabulary that matters to her",
      paragraphs: [
        "Deal registration: a partner files a claim on an opportunity they sourced, locking in their margin and protection. Respecting deal reg is the #1 etiquette rule — it's the partner's incentive to bring Cribl deals at all. Going around a partner's registration to run direct is how an AE gets blacklisted by the entire partner community.",
        "Partner-sourced vs. partner-influenced pipeline (did they originate it, or help it along) — PBMs get measured on this. MDF: market development funds — vendor money for partner-run events and campaigns. Co-sell: working an account jointly, each side bringing its relationships. Enablement: teaching partner sellers to spot Cribl triggers (SIEM renewal pain, agent sprawl, AI data projects) so they call you.",
      ],
      sayThis:
        "If a partner registered the deal, that's their deal — my job is to make them money on it, because that's what keeps the next ten referrals coming.",
      source: "craft",
    },
    {
      id: "m8c5",
      title: "What a great AE looks like to a PBM",
      paragraphs: [
        "Bring partners in early — when there's still services revenue and influence to share — not at the end for paperwork. Joint account planning on the top-20 list: which partner has the relationship in each target, and what's the play. Two partner meetings a week (it's literally in Patrick's PG baseline — Kat almost certainly knows his system). Give as much as you take: pass leads to partners, share intel, co-host events, make their reps look good in front of their customers.",
        "And the intel loop Patrick described: you pick up a signal in an account → the partner tells you who owns that initiative, where the funding sits, who has juice → suddenly you're meeting the right person with a warm intro. Partners live in these accounts year-round; they ARE the informal power map.",
      ],
      sayThis:
        "Patrick's baseline has two partner meetings a week built in. My version of that: joint plans on the top-20 accounts, leads flowing both directions, and using partner intel to find who actually owns the initiative before I burn a first meeting.",
      source: "patrick",
    },
    {
      id: "m8c6",
      title: "Your unfair advantage — used the right way",
      paragraphs: [
        "You have real friends at Ahead, SHI, Presidio, and ModernOps from growing up and selling in Philly. That's genuinely rare for a new AE. The wrong way to use it with Kat: as a flex ('I already know everybody'). The right way: as an asset you'll deploy under her guidance — she owns these relationships at the firm level; your personal connections accelerate her plays.",
        "Ami's homework — do it before Monday: call 2–3 of those friends this weekend. The script: (1) How does Cribl show up for you — what's the rep on the street? (2) Which vendors are easiest to co-sell with, and what makes them easy? (3) Where does Cribl come up — security, observability, cost projects? (4) What makes an AE your favorite to work with? (5) Any Philly-area accounts making noise about data costs or SIEM migrations? Then OPEN the Kat call with this: 'I called a few friends at Ahead and SHI this weekend — here's what I heard.' Instant credibility; nobody else interviewing did that.",
      ],
      sayThis:
        "I called a couple of friends at the partners this weekend to hear how Cribl shows up from their side. Want to hear what they said?",
      source: "ami",
    },
    {
      id: "m8c7",
      title: "Likely questions, strong answers",
      paragraphs: [
        "'Have you worked with channel partners before?' — Honest version: not in this two-tier tech model — in benefits the brokers WERE the channel, so I've sold with and through intermediaries, and I know the golden rule is making them money. Then show you've learned the model: deal reg, co-sell, sourced vs. influenced, MDF. Honesty + fluency beats fake experience.",
        "'How would you balance direct vs. partner motion?' — Trick question; the answer is they're the same motion: every deal has a partner angle, my top-20 plans each name a partner play, and my PG week has two partner meetings in it. 'Direct' just means I'm doing my own prospecting too — which makes me MORE valuable to partners, because I bring them deals, not just asks.",
      ],
      sayThis:
        "In benefits, the broker was the channel — I've lived 'the partner makes the deal' for eight years. What's new for me is this industry's mechanics — deal reg, sourced versus influenced, MDF — and I've been studying exactly that.",
      source: "chris",
    },
    {
      id: "m8c8",
      title: "Five sharp questions to ask Kat",
      paragraphs: [
        "(1) Which partners actually drive pipeline in this region, versus just fulfill? (2) When you look at your best AE relationship — what does that person do that the average AE doesn't? (3) How do you and the AE typically split a top-20 account list — who takes which doors? (4) Where's partner-sourced pipeline strongest right now — security, observability, public sector? (5) If I start in July, what's the one thing I could do in my first 30 days that would make your life easier?",
        "Each one signals: I think of you as a partner in the territory plan, not a resource I consume. Number 5 is the closer — it flips the interview into a working session.",
      ],
      sayThis:
        "What does your best AE do that the average one doesn't?",
      source: "craft",
    },
  ],
  quiz: [
    {
      id: "m8q1",
      prompt: "How much of Cribl's business runs through the channel?",
      options: [
        { text: "About half" },
        { text: "~95% (Ami) — Patrick rounds it to 100%", correct: true },
        { text: "About 25% — channel is an experiment" },
      ],
      explain:
        "Essentially every deal involves a partner. That single number explains why this interview exists: an AE who creates channel friction is a non-starter, whatever else they bring.",
    },
    {
      id: "m8q2",
      prompt: "Deal registration is:",
      options: [
        {
          text: "A partner's filed claim on an opportunity they sourced — locking their margin and protection, and fueling their incentive to bring Cribl deals",
          correct: true,
        },
        { text: "The legal paperwork stage at the end of a deal" },
        { text: "Registering the customer for Cribl.Cloud" },
      ],
      explain:
        "Deal reg is the economic engine of partner trust. The partner who sources a deal gets protected margin on it; an AE who circumvents that gets quietly frozen out by every partner in the territory.",
    },
    {
      id: "m8q3",
      prompt:
        "A partner registered a deal at one of YOUR top-20 targets — an account you wanted to crack direct. You:",
      options: [
        {
          text: "Lean in: co-sell it with them, make them money, and use their relationship to go deeper than you could alone",
          correct: true,
        },
        { text: "Contest the registration — you had the account in your plan first" },
        { text: "Work your own contacts in parallel and keep the motions separate" },
      ],
      explain:
        "A partner-registered deal at your target is GOOD news: warm relationships + protected partner economics + your execution. Contesting or running parallel torches the relationship Kat spent years building — over one deal.",
    },
    {
      id: "m8q4",
      prompt: "Which pairing is right?",
      options: [
        {
          text: "Optiv & GuidePoint = security-specialized; SHI = volume giant; Ahead & Presidio = infrastructure/cloud lean; Carahsoft = government channel",
          correct: true,
        },
        { text: "Carahsoft = security boutique; Optiv = government distributor" },
        { text: "They're all interchangeable national VARs — specialization doesn't matter" },
      ],
      explain:
        "Knowing each partner's lane tells you which one fits which play: SIEM-migration deal → security specialist (Optiv/GuidePoint); FedRAMP opportunity → Carahsoft; infrastructure modernization → Ahead/Presidio; everywhere → SHI.",
    },
    {
      id: "m8q5",
      prompt: "When should a partner enter a deal you sourced yourself?",
      options: [
        { text: "At the end — to process the paperwork and take their margin" },
        {
          text: "Early — while there's still influence, services revenue, and intel to share",
          correct: true,
        },
        { text: "Never — self-sourced deals should stay direct to protect your number" },
      ],
      explain:
        "Bringing partners in early is what 'partner-first' means in practice. They add implementation services (sweetens their economics), account intel, and exec relationships — and they remember which AEs share early. (At ~95% channel, 'keep it direct' isn't even on the menu.)",
    },
    {
      id: "m8q6",
      prompt: "The 'intel loop' Patrick described with partners:",
      options: [
        {
          text: "Your signals from prospecting flow to the partner; their account knowledge — who owns the initiative, where funding sits, who has juice — flows back; you both enter warmer",
          correct: true,
        },
        { text: "Partners share their customer lists quarterly for cold outreach" },
        { text: "Cribl provides partners weekly market-intel briefings" },
      ],
      explain:
        "Two-way intel is the real channel motion: you bring fresh signal, they bring the informal power map they've built over years inside the account. That exchange is what your two partner meetings a week are FOR.",
    },
    {
      id: "m8q7",
      prompt: "The right way to present your friendships at Ahead/SHI/Presidio to Kat:",
      options: [
        { text: "'I already have the partner relationships covered in this region.'" },
        {
          text: "As an asset deployed under her game plan — her firm-level relationships, accelerated by your personal ones",
          correct: true,
        },
        { text: "Don't mention them — personal connections sound unprofessional" },
      ],
      explain:
        "Kat owns these partnerships; an AE claiming them as 'covered' sounds like friction. The winning frame: 'I bring warm doors — you call the plays.' That's a force multiplier, not a turf grab.",
    },
    {
      id: "m8q8",
      prompt: "Ami's pre-interview homework was to:",
      options: [
        {
          text: "Call your partner friends and ask how Cribl shows up from their side — then bring what you heard into the interviews",
          correct: true,
        },
        { text: "Get a partner to formally refer you for the role" },
        { text: "Memorize the partner portal's deal reg workflow" },
      ],
      explain:
        "'Talk to your friends at Ahead or SHI — ask them about Cribl.' Opening the Kat call with 'I called two partner friends this weekend; here's what I heard' is the single highest-credibility move available to you Monday.",
    },
    {
      id: "m8q9",
      prompt: "Palo Alto Networks appears on Cribl's partner page — while also platformizing against the category. This is:",
      options: [
        {
          text: "Normal coopetition: rivals at the strategy layer, partners at the data layer — handle it without trash talk",
          correct: true,
        },
        { text: "A mistake on the website" },
        { text: "A sign Cribl is about to be acquired by Palo Alto" },
      ],
      explain:
        "The ecosystem is tangled on purpose: Cribl feeds data TO the platforms, so they integrate with it even while competing for the consolidation narrative. Switzerland status is the whole position — speak of every vendor respectfully.",
    },
    {
      id: "m8q10",
      prompt: "Strongest question to ask Kat (of these):",
      options: [
        { text: "'How many partners does Cribl have nationally?'" },
        {
          text: "'What does your best AE relationship look like — what does that person do that the average AE doesn't?'",
          correct: true,
        },
        { text: "'Can partners help me hit my number in year one?'" },
      ],
      explain:
        "It invites her to describe the bar — and lets you spend the rest of the call demonstrating you'd clear it. The first option is trivia; the third is about you, not the partnership.",
    },
  ],
  writeIn: [
    {
      id: "m8w1",
      prompt:
        "Kat asks: \"Have you worked with channel partners before?\" Give your honest, fluent answer.",
      keyPoints: [
        "Be honest: not in this two-tier tech model",
        "But in benefits, the brokers WERE the channel — eight years selling with and through intermediaries",
        "You know the golden rule: the partner has to make money",
        "Show you've learned this industry's mechanics: deal registration, co-sell, sourced vs. influenced, MDF",
        "Honesty plus fluency beats faking experience",
      ],
      model:
        "Not in this exact two-tier tech model — I'll be straight about that. But in benefits, the broker was the channel, so I spent eight years selling with and through intermediaries, and I know the golden rule cold: the partner has to make money or there is no next deal. What's new for me is this industry's mechanics — deal reg, sourced versus influenced, MDF — and that's exactly what I've been studying.",
    },
    {
      id: "m8w2",
      prompt:
        "A partner registered a deal at one of YOUR top-20 targets — an account you wanted to crack direct. What do you do, and why?",
      keyPoints: [
        "Lean in — co-sell it with them and make them money",
        "Use their relationship to go deeper than you could alone",
        "Do NOT contest the registration or quietly run your own contacts in parallel",
        "Deal reg is sacred — it's the partner's incentive to bring you the next ten deals",
        "At ~95% channel, 'keep it direct' isn't even on the menu",
      ],
      model:
        "That's good news, not a turf problem. I co-sell it with them — make them money on it and use their relationship to get deeper than I could alone. What I don't do is contest the registration or run my own contacts in parallel; that torches a relationship Kat spent years building, over one deal. If a partner registered it, that's their deal, and protecting that is what keeps the next ten referrals coming.",
    },
    {
      id: "m8w3",
      prompt:
        "Why is channel existential at Cribl — and why do partners genuinely love selling it?",
      keyPoints: [
        "~95% channel-driven (Ami); Patrick rounds it to 100% — essentially every deal has a partner",
        "Cribl is a partner-first organization: 'the RIGHT partners, not EVERY partner'",
        "Partners love it because it's vendor-neutral — it makes their whole portfolio work better, nothing to rip out",
        "It lets them become 'data brokers' with services revenue attached",
      ],
      model:
        "Ami says about 95% channel-driven; Patrick just says 100%. Either way, essentially every deal has a partner in it — that's why an AE who creates channel friction is a non-starter. And partners love Cribl because it's vendor-neutral: it makes everything else in their bag work better, so there's nothing to rip out, plus services revenue attached. Cribl's own pitch to them is 'become the data broker for your customers.' It's the easiest co-sell in their bag.",
    },
    {
      id: "m8w4",
      prompt:
        "What was Ami's pre-interview homework, and how do you open the Kat call with it?",
      keyPoints: [
        "Call 2–3 partner friends (Ahead, SHI, Presidio) this weekend and ask how Cribl shows up from their side",
        "Ask: the rep on the street, which vendors are easiest to co-sell, where Cribl comes up, what makes an AE their favorite, any local accounts with data-cost / SIEM pain",
        "Open the call with it: 'I called a few friends at Ahead and SHI this weekend — here's what I heard'",
        "It's the single highest-credibility move — nobody else interviewing did it",
      ],
      model:
        "Ami's homework was to call my partner friends — Ahead, SHI, Presidio — and ask how Cribl actually shows up from their side: what's the rep on the street, which vendors are easiest to co-sell, where Cribl comes up, what makes an AE their favorite, and whether any local accounts are making noise about data costs or SIEM migrations. Then I open the Kat call with it: 'I called a couple of friends at Ahead and SHI this weekend to hear how Cribl shows up for them — want to hear what they said?' Nobody else interviewing will have done that.",
    },
  ],
};

export const M9: CourseModule = {
  id: "m9",
  period: 3,
  number: 9,
  title: "The Cam Module",
  tagline: "The AE↔SE partnership — prove his team's hours will be safe with you",
  minutes: 16,
  audience: "Built for Tuesday — Cam Borgl",
  cards: [
    {
      id: "m9c1",
      title: "Who Cam is and what he's evaluating",
      paragraphs: [
        "Cam Borgl leads Sales Engineering for the region — Patrick's words: 'the SE leader.' His SEs are the scarce resource in every deal: Ami called them 'the technical gurus... they're salesy too' and said the AE-SE relationship is 'vital' and 'super important to them.' Patrick's mid-Atlantic coverage: two SEs in the Philly area, one in Pittsburgh, three in the DMV.",
        "What Cam's deciding: if my SE spends ten hours on this guy's deals, do those hours convert? Can he carry the business sale so my people only have to carry the technical one? Will he qualify before asking, brief before calls, and be honest about what he doesn't know?",
      ],
      sayThis:
        "I think of SE hours as the scarcest resource in the territory — my job is to make sure every hour Cam's team gives my deals is an hour that converts.",
      source: "ami",
    },
    {
      id: "m9c2",
      title: "What SEs actually do in a Cribl deal",
      paragraphs: [
        "Technical discovery (mapping the customer's data sources, tools, volumes, pain). Tailored demos — never generic, always built on the customer's actual world. The POV — proof of value: a time-boxed hands-on evaluation in the customer's environment, run against agreed success criteria. Architecture design and sizing. Technical objection handling. And at QBRs: introducing new capabilities (Search, Lake) to expand accounts.",
        "The POV is the crown jewel and the biggest time sink — which is why disciplined AEs treat it as something a deal EARNS, not a step that happens automatically.",
      ],
      sayThis:
        "A POV isn't a demo — it's an engineering engagement. My rule: no POV until there's agreed success criteria, an exec sponsor, and a defined timeline. Otherwise we're doing free consulting.",
      source: "craft",
    },
    {
      id: "m9c3",
      title: "Division of labor",
      paragraphs: [
        "The AE owns: why change (the business case), who cares (the committee and champion), the money (metrics, budget, economic buyer), and the process (decision steps, paper, close plan). The SE owns: how it works, the proof, and technical trust. Both share discovery — the AE finds the business pain, the SE finds the technical pain, and they compare notes.",
        "The cleanest way to say it — and Patrick set this up perfectly by telling you to discuss 'the tradeoffs of how he and I work together': you sell the gap, the SE proves the bridge.",
      ],
      sayThis:
        "I own the why, the who, the money, and the process. The SE owns the how and the proof. We share discovery — I bring the business pain, they bring the technical truth.",
      source: "craft",
    },
    {
      id: "m9c4",
      title: "The cardinal sins (he's seen them all)",
      paragraphs: [
        "Dragging an SE into an unqualified deal — no pain, no power, no process, just 'can you demo for these guys?' Surprise calls with zero brief, where the SE discovers the audience live. Overpromising — committing features or roadmap the product doesn't have, leaving the SE to walk it back. Demo-monkey treatment — 'just show up and demo, I'll take it from there.' Going dark after the POV — the SE invests two weeks, then never hears the outcome. Letting a POV start with no success criteria, so it can never officially succeed.",
        "When Cam asks how you'd work with his team, naming these sins unprompted — and their antidotes — shows him you've thought about his world, not just yours.",
      ],
      sayThis:
        "The fastest way to lose an SE team: unqualified demos, zero briefs, and overpromising they have to walk back. I plan to be the opposite — and I'd rather hear it from your team if I ever slip.",
      source: "craft",
    },
    {
      id: "m9c5",
      title: "The good-AE contract",
      paragraphs: [
        "Before any call: a brief — who's in the room (names, roles, what each cares about), what we already know, what we need to learn, what next step we're driving to. A quick joint call plan: who opens, who handles what, what 'good' looks like. After: a debrief and shared notes — the MEDDPICC state lives where the SE can see it.",
        "Before any POV: qualification gate passed (real pain, engaged power, defined process), written success criteria the customer agreed to, a timebox, and a champion committed to driving it internally. After the POV: the SE hears the outcome — every time, win or lose.",
      ],
      sayThis:
        "Every call gets a brief — who's in the room, what they care about, what we're driving to. Every POV gets success criteria and a timebox before it starts. And the SE always hears how it ended.",
      source: "craft",
    },
    {
      id: "m9c6",
      title: "The whiteboard you should be able to draw",
      paragraphs: [
        "Before: spaghetti. Dozens of sources, each hard-wired to specific tools, five agents per server, every new tool means re-plumbing everything, the SIEM bill eating the budget. After: sources flow through one control layer (Edge collects, Stream shapes and routes) into tiers — high-value to the SIEM (~90 days), the rest to low-cost storage (Lake/S3) — with Search asking questions across all of it, and governed, masked feeds going to the AI systems. One picture, told left to right.",
        "Practice it once on paper tonight. If Cam asks 'so what does Cribl do?' — and some version of that question is guaranteed — talk while drawing the picture in words. It's the difference between reciting and understanding.",
      ],
      sayThis:
        "Picture it left to right: everything flows into one control layer, gets cleaned and masked in flight, lands in the tier it deserves — expensive tools get only what's worth it, storage you own gets the rest — and search plus AI feed off all of it, governed.",
      source: "patrick",
    },
    {
      id: "m9c7",
      title: "Likely questions, strong answers",
      paragraphs: [
        "'How technical are you?' — Don't inflate, don't shrink: six years as a founder sitting between business and engineering; you speak the language, you don't write the code; you're three weeks into this space and here's the system you built to close the gap (you're literally inside it). 'What does Cribl do?' — your Module 1 thirty-second pitch, possibly with the whiteboard picture. 'When do you bring an SE in?' — after qualification: real pain, engaged power, a defined process — with a brief; their hours should land on deals that can close.",
        "'How would you run a POV?' — success criteria agreed in writing, timebox, exec sponsor, champion driving internally, debrief at the end regardless of outcome. If he pushes into territory you don't know — that's the honest-gap move from Module 7, and with Cam it's almost certainly the real test.",
      ],
      sayThis:
        "I sat between business and engineering for six years — I speak the language but I don't pretend to write the code. I qualify hard before I spend your team's hours, and I never promise what the product can't do.",
      source: "chris",
    },
    {
      id: "m9c8",
      title: "Five sharp questions to ask Cam",
      paragraphs: [
        "(1) What separates your best AE partnership from the average one? (2) Where do deals most often stall technically here — and what could the AE have done earlier? (3) How does your team like to get briefed — what format actually gets read? (4) What does a typical POV look like at Cribl — length, criteria, who drives? (5) How is SE coverage shared across the team in the mid-Atlantic — and how do I make sure my deals deserve the hours?",
        "Question 5 quietly demonstrates you already know his scarcity problem. If there's time, ask what he wishes AEs understood about the first call with a new prospect — then shut up and take notes.",
      ],
      sayThis:
        "Where do deals stall technically here — and what do you wish the AE had done two calls earlier?",
      source: "craft",
    },
  ],
  quiz: [
    {
      id: "m9q1",
      prompt: "In the AE↔SE division of labor, the AE owns:",
      options: [
        { text: "The demo, the architecture, and the POV execution" },
        {
          text: "Why change, who cares, the money, and the process — the SE owns how it works and the proof",
          correct: true,
        },
        { text: "Everything customer-facing; the SE works behind the scenes" },
      ],
      explain:
        "You sell the gap; the SE proves the bridge. Discovery is shared — business pain (you) and technical pain (them). Saying this cleanly is the single most important answer in the Cam call.",
    },
    {
      id: "m9q2",
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
        "A POV without success criteria can never officially succeed — it just consumes SE weeks and goes quiet. Criteria + timebox + sponsor + champion is the discipline that makes Cam's team trust you with their hours.",
    },
    {
      id: "m9q3",
      prompt: "An AE asks an SE to 'just demo for these guys' — no background, no agenda. Which sin is this?",
      options: [
        { text: "Going dark after the POV" },
        { text: "Demo-monkey treatment plus the no-brief surprise", correct: true },
        { text: "Overpromising the roadmap" },
      ],
      explain:
        "Treating the SE as a demo vending machine — no context on who's in the room or what 'good' looks like — is the most common way AEs burn SE trust. The antidote is a two-minute written brief. Every time.",
    },
    {
      id: "m9q4",
      prompt: "A prospect asks for a feature Cribl doesn't have. You:",
      options: [
        { text: "Say it's on the roadmap — keep momentum, sort details later" },
        {
          text: "Say you don't want to guess, capture it precisely, and bring your SE in for the real answer",
          correct: true,
        },
        { text: "Redirect to features Cribl does have and avoid the topic" },
      ],
      explain:
        "Overpromising is the sin SEs hate most, because they're the ones who walk it back. 'I'd rather get you the real answer than guess' builds trust in the room AND with your SE — it's the honest-gap move in deal form.",
    },
    {
      id: "m9q5",
      prompt: "A pre-call brief for your SE contains:",
      options: [
        {
          text: "Who's in the room and what each cares about, what we know, what we need to learn, and the next step we're driving to",
          correct: true,
        },
        { text: "The full account history since the territory was created" },
        { text: "Just the meeting link and time — SEs prefer to form their own view" },
      ],
      explain:
        "Four lines, two minutes to write, and the SE walks in armed: audience, knowns, unknowns, target outcome. The format matters less than the habit — ask Cam how his team likes it (it's one of your five questions).",
    },
    {
      id: "m9q6",
      prompt: "When does a deal EARN an SE's hours?",
      options: [
        { text: "The moment a prospect agrees to any meeting" },
        {
          text: "After qualification — real pain, engaged power, a defined process — so the hours land on deals that can actually close",
          correct: true,
        },
        { text: "Only after procurement confirms budget in writing" },
      ],
      explain:
        "First meetings are usually yours to run solo with the business story. SE hours enter once there's qualified pain, the right people engaged, and a path to a decision — that's the conversion discipline Cam is hiring for.",
    },
    {
      id: "m9q7",
      prompt: "Cam asks: 'How technical are you, really?' Strongest answer:",
      options: [
        { text: "'Very — I founded a software company, so I can hold my own with any engineer.'" },
        {
          text: "'I sat between business and engineering for six years — I speak the language, I don't write the code, and I've built a system to close this industry's gap fast. I'll never bluff your team.'",
          correct: true,
        },
        { text: "'Not very — but that's what SEs are for, right?'" },
      ],
      explain:
        "Inflating gets found out in minutes by an SE leader; shrinking ('that's what SEs are for') signals demo-monkey treatment ahead. Calibrated honesty plus a visible learning system is the only answer that survives follow-up questions.",
    },
    {
      id: "m9q8",
      prompt: "After a two-week POV, the deal stalls. What does the SE get?",
      options: [
        {
          text: "A debrief — what happened, why, and what we'd do differently. Every time, win or lose.",
          correct: true,
        },
        { text: "Nothing — they'll see the outcome in the CRM eventually" },
        { text: "A new POV request at the next account to keep them busy" },
      ],
      explain:
        "Going dark after an SE invests weeks is how partnerships die quietly. The debrief habit costs ten minutes and tells Cam's team their work matters — they will fight to be on your deals.",
    },
    {
      id: "m9q9",
      prompt: "The 'after' picture on your whiteboard, left to right:",
      options: [
        {
          text: "Sources → one control layer (Edge collects, Stream shapes/masks/routes) → tiered destinations (SIEM ~90 days; rest to Lake/S3) → Search across everything, governed feeds to AI",
          correct: true,
        },
        { text: "Sources → SIEM → Cribl → storage → dashboards" },
        { text: "Agents → AI models → SIEM → archive" },
      ],
      explain:
        "Left to right: born → collected → controlled → tiered → searchable → AI-ready. Cribl sits BEFORE the destinations (that's the whole point — control what feeds them). Practice saying it while sketching; it's Patrick's three-level pitch in one picture.",
    },
    {
      id: "m9q10",
      prompt: "Mid-Atlantic SE coverage, per Patrick:",
      options: [
        { text: "One SE for the whole region, based in DC" },
        {
          text: "Two in the Philly area, one in Pittsburgh, three in the DMV",
          correct: true,
        },
        { text: "Six in Philadelphia alone" },
      ],
      explain:
        "Knowing his team's actual footprint — two Philly, one Pittsburgh, three DMV — lets you ask the grown-up version of the coverage question: 'how do I make sure my deals deserve the hours?'",
    },
  ],
  writeIn: [
    {
      id: "m9w1",
      prompt:
        "Cam asks how you'd work with his SE team. Lay out the AE↔SE division of labor.",
      keyPoints: [
        "The AE owns: why change (the business case), who cares (the committee and champion), the money (metrics, budget, economic buyer), and the process (decision steps, paper, close plan)",
        "The SE owns: how it works, the proof, and technical trust",
        "Discovery is shared — the AE finds the business pain, the SE finds the technical pain",
        "The one-liner: 'I sell the gap, the SE proves the bridge'",
      ],
      model:
        "Clean lines. I own the why — the business case — the who, meaning the committee and champion, the money, and the process: decision steps, paper, close plan. The SE owns the how and the proof, the technical trust. Discovery we share — I bring the business pain, they bring the technical truth, and we compare notes. The way I think about it: I sell the gap, the SE proves the bridge.",
    },
    {
      id: "m9w2",
      prompt:
        "What must be true BEFORE a POV starts — and why do you hold that line so hard?",
      keyPoints: [
        "Written success criteria the customer agreed to",
        "A timebox",
        "An exec sponsor",
        "A champion driving it internally",
        "Plus the qualification gate passed first — real pain, engaged power, a defined process",
        "A POV without criteria can never officially succeed — it just burns SE weeks ('free consulting')",
      ],
      model:
        "A POV isn't a demo — it's an engineering engagement, so it has to be earned. My rule: no POV until there's written success criteria the customer agreed to, a timebox, an exec sponsor, and a champion driving it internally — and qualification passed first, real pain and engaged power. I hold that line because a POV with no success criteria can never officially succeed; it just eats two weeks of an SE's time and goes quiet. That's free consulting, and it's how you lose an SE team's trust.",
    },
    {
      id: "m9w3",
      prompt:
        "Name a few of the \"cardinal sins\" that burn SE trust — and the antidote to each.",
      keyPoints: [
        "Dragging an SE into an unqualified deal ('just demo for these guys') → qualify first",
        "Surprise calls with no brief → a two-minute written brief every time",
        "Overpromising features or roadmap the SE has to walk back → never promise what the product can't do",
        "Demo-monkey treatment → bring them in as a partner, not a vending machine",
        "Going dark after a POV → always debrief, win or lose",
      ],
      model:
        "The fastest ways to lose an SE team: unqualified demos — 'just show up and demo for these guys' — surprise calls with zero brief, overpromising features they have to walk back, treating them like a demo vending machine, and going dark after they invest two weeks in a POV. I plan to be the opposite: qualify before I ask, a two-minute brief before every call, never promise what the product can't do, and always debrief them on the outcome — win or lose. And I'd want to hear it from your team if I ever slip.",
    },
    {
      id: "m9w4",
      prompt:
        "A prospect asks for a feature Cribl doesn't have. What do you say in the room?",
      keyPoints: [
        "Don't say 'it's on the roadmap' just to keep momentum — overpromising is the sin SEs hate most",
        "Don't guess",
        "Capture the request precisely",
        "Bring the SE in for the real answer",
        "'I'd rather get you the real answer than guess' builds trust in the room and with the SE",
      ],
      model:
        "I don't reach for 'it's on the roadmap' to keep the momentum going — overpromising is the thing SEs hate most, because they're the ones who have to walk it back. I'd say, 'I don't want to guess on that — let me get you the real answer,' write the request down precisely, and bring my SE in. That builds trust in the room and with my SE at the same time. It's the honest-gap move in deal form.",
    },
  ],
};

export const M10: CourseModule = {
  id: "m10",
  period: 3,
  number: 10,
  title: "The Rep Call",
  tagline: "Tim's 30 minutes — the would-I-want-this-guy-in-the-trenches test",
  minutes: 8,
  bonus: true,
  audience: "Built for Tuesday — right after Cam",
  cards: [
    {
      id: "m10c1",
      title: "What a peer interview is for",
      paragraphs: [
        "Tim isn't scoring your Cribl knowledge — Kat and Cam cover that. He's answering one question for Patrick: would I want this guy next to me? Culture, work ethic, coachability, and whether your story holds up rep-to-rep, without the interview polish.",
        "Red flags peers smell instantly: arrogance, vagueness about how you'd actually spend a week, bad-mouthing past situations, and zero curiosity about their experience. The simplest win: be genuinely curious about Tim's world and consistent about yours.",
      ],
      sayThis:
        "Honestly, I'm as interested in what your weeks actually look like as you are in my story — I want the unfiltered version.",
      source: "craft",
    },
    {
      id: "m10c2",
      title: "Your story in 90 seconds",
      paragraphs: [
        "Eight years of B2B sales (employee benefits — broker-as-channel, consensus buys), then six years as a founder: bootstrapped, sold the first company in early '25, started the second. Family reasons brought you home to Philly, and the startup risk stopped fitting a four-kid life. You're not retreating — you're choosing: from generalist running the whole army to specialist sniper on a bigger one, doing the one thing you love most.",
        "Then the honest beat that makes the rest credible: no, you haven't sold in this industry — and here's the learning machine you built about it (you're studying inside it right now), plus the partner calls you made this weekend. Quick learner isn't a claim, it's a demonstration.",
      ],
      sayThis:
        "I ran the whole army for six years. Now I want to be a sniper on a bigger one — pick the one thing I'm best at and go deep. The industry knowledge is the gap, and I've built a system that's closing it fast.",
      source: "chris",
    },
    {
      id: "m10c3",
      title: "Your process, the consistent version",
      paragraphs: [
        "They WILL compare notes with Patrick, so tell the same story: four layers (live pipeline → top-20 with account plans → Philly network → creative cold), MEDDPICC as the diagnostic, Force Management's gap language for the message, and Patrick's cadence as the floor — 10-10-10 daily, two partner meetings a week, four field events a month, as much in person as possible.",
        "With a peer, add the texture: ten in-person meetings a month is your personal bar; video prospecting and pattern interrupts are your signature move (it's literally how you got this interview loop — tell that story if it fits).",
      ],
      sayThis:
        "Same thing I told Patrick: live pipeline first, a real plan per top-20 account, my network, then creative cold — with the 10-10-10 floor under all of it. The video thing is my signature; it's how I got Patrick to take my call.",
      source: "chris",
    },
    {
      id: "m10c4",
      title: "Questions that make Tim like you",
      paragraphs: [
        "(1) What does a good week actually look like — calendar-wise? (2) What surprised you most after joining? (3) Where does pipeline really come from here — your own PG, SDRs, partners — what's the honest mix? (4) Knowing what you know now, what would you do differently in your first 90 days? (5) How real is the 10-10-10 in practice?",
        "That last one, asked with a grin, does double duty: shows you know the system AND invites the unvarnished truth. Take notes visibly. Peers remember being listened to.",
      ],
      sayThis:
        "Knowing what you know now — what would you do differently in your first 90 days here?",
      source: "craft",
    },
  ],
  quiz: [
    {
      id: "m10q1",
      prompt: "Tim's real assignment from Patrick is to assess:",
      options: [
        { text: "Your Cribl product knowledge in depth" },
        {
          text: "Whether he'd want you in the trenches — culture, work ethic, and if your story holds up without the polish",
          correct: true,
        },
        { text: "Your negotiation skills under pressure" },
      ],
      explain:
        "Kat owns the channel test, Cam owns the technical test — Tim owns the 'is this guy real?' test. Curiosity and consistency win it; polish without substance loses it.",
    },
    {
      id: "m10q2",
      prompt: "Why must your process answer match what you told Patrick?",
      options: [
        {
          text: "They compare notes — inconsistency reads as telling each audience what it wants to hear",
          correct: true,
        },
        { text: "Patrick records the interviews and replays them side by side" },
        { text: "It doesn't — tailoring the story per interviewer shows adaptability" },
      ],
      explain:
        "Same four layers, same MEDDPICC discipline, same cadence numbers. Consistency across interviewers is itself the signal: this is actually how he operates, not interview theater.",
    },
    {
      id: "m10q3",
      prompt: "Best use of your founder background with a peer rep:",
      options: [
        { text: "Establish seniority — you've run companies, this role should be easy" },
        {
          text: "Grit evidence plus the honest pivot: ran the whole army, now choosing to be a sniper on a bigger one — with a visible system closing the industry gap",
          correct: true,
        },
        { text: "Downplay it entirely — founders threaten salespeople" },
      ],
      explain:
        "'This should be easy' is the arrogance red flag in one sentence. The winning frame is humble-confident: the grit transfers, the industry knowledge is being earned in public, fast.",
    },
    {
      id: "m10q4",
      prompt: "The sharpest pipeline question for Tim:",
      options: [
        { text: "'What's your quota and are you hitting it?'" },
        {
          text: "'Where does pipeline really come from here — your own PG, SDRs, partners? What's the honest mix?'",
          correct: true,
        },
        { text: "'Does marketing give you enough leads?'" },
      ],
      explain:
        "It's the question a working seller asks — operational, honest, and it tells you exactly what your first six months will feel like. Quota-prying gets guarded answers; lead-complaining sounds like a demand servicer.",
    },
    {
      id: "m10q5",
      prompt: "Tim vents about something annoying internally. You:",
      options: [
        {
          text: "Listen, ask what he'd change, stay positive without dismissing it — peers test whether you take the bait",
          correct: true,
        },
        { text: "Match his energy with complaints about your own past roles" },
        { text: "Defend Cribl — loyalty needs to start before day one" },
      ],
      explain:
        "Sometimes it's a vent, sometimes it's a test. Curious-and-grounded is the only response that wins both versions. Joining the complaining fails the test; lecturing him fails the vibe.",
    },
    {
      id: "m10q6",
      prompt: "Your video-prospecting story belongs in this call because:",
      options: [
        {
          text: "It's proof of the creative, pattern-interrupt PG you preach — and it literally got you this interview loop",
          correct: true,
        },
        { text: "It fills time if the conversation stalls" },
        { text: "It doesn't — never reveal prospecting tactics to a future teammate" },
      ],
      explain:
        "'I do creative outreach' is a claim; 'here's the video play that got Patrick to take my call' is a receipt. Peers respect receipts — and Patrick already told you that move stood out.",
    },
  ],
  writeIn: [
    {
      id: "m10w1",
      prompt:
        "Tim's the peer interview. What's he really evaluating — and how do you win it?",
      keyPoints: [
        "He's not scoring Cribl knowledge — Kat and Cam cover that",
        "He's answering for Patrick: would I want this guy next to me in the trenches?",
        "Culture, work ethic, coachability, and whether your story holds up rep-to-rep without the polish",
        "Red flags peers smell: arrogance, vagueness, bad-mouthing, zero curiosity",
        "Win it by being genuinely curious about his world and consistent about yours",
      ],
      model:
        "Tim isn't testing my Cribl knowledge — Kat and Cam own that. He's answering one question for Patrick: would I want this guy next to me? Culture, work ethic, coachability, and whether my story holds up rep-to-rep without the interview polish. Peers smell arrogance, vagueness, and bad-mouthing instantly. So I win it by being genuinely curious about what his weeks actually look like and dead consistent about how I operate.",
    },
    {
      id: "m10w2",
      prompt:
        "Give your 90-second story for a peer rep — the founder background and the pivot to Cribl.",
      keyPoints: [
        "8 years B2B sales (employee benefits — broker-as-channel, consensus buys)",
        "6 years as a founder — bootstrapped, sold the first company early 2025, started a second",
        "Family brought you home to Philly; startup risk stopped fitting a four-kid life",
        "Not retreating — choosing: 'ran the whole army, now want to be a sniper on a bigger one'",
        "Honest beat: haven't sold in this industry — but built a learning system that's closing the gap fast, and made partner calls this weekend",
      ],
      model:
        "Eight years in B2B sales — employee benefits, where the broker was the channel and everything was a consensus buy — then six years as a founder. Bootstrapped, sold the first company early last year, started a second. Family brought us home to Philly, and honestly the startup risk stopped fitting a four-kid life. I'm not retreating from founding — I'm choosing: I ran the whole army for six years, now I want to be a sniper on a bigger one and go deep on the one thing I'm best at. The gap is industry knowledge, and I built a system that's closing it fast — I'm literally studying inside it.",
    },
    {
      id: "m10w3",
      prompt:
        "Why must your \"how I run my process\" answer match exactly what you told Patrick?",
      keyPoints: [
        "They compare notes",
        "Inconsistency reads as telling each audience what it wants to hear",
        "Same four layers, same MEDDPICC discipline, same cadence numbers",
        "Consistency across interviewers is itself the signal — it's how he really operates, not interview theater",
      ],
      model:
        "Because they compare notes. If I tell Patrick one thing and Tim another, it reads as telling each person what they want to hear — and that's the fastest way to lose a peer's trust. So it's the same story everywhere: the four layers, MEDDPICC as a diagnostic, Force Management's gap language, and the 10-10-10 cadence as the floor. The consistency is itself the signal — this is actually how I operate, not interview theater.",
    },
  ],
};

export const PERIOD3 = [M8, M9, M10];
