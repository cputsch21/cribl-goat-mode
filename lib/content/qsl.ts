// QSL — "The Qualified Sales Leader" (John McMahon) rebuilt as a drill-down
// course. Organized by framework/process/list rather than chapter, so the
// playbook is learnable and usable. Original study material (frameworks,
// question banks, and lessons in our own words) — not the book's text.
// Rendered at /qsl by app/qsl/page.tsx.

export type QSLNode =
  | { k: "p"; t: string }
  | { k: "list"; ordered?: boolean; items: string[] }
  | { k: "q"; title?: string; items: string[] } // a question bank
  | { k: "note"; label: string; t: string } // callout (Remember / Use it / Trap)
  | { k: "sub"; title: string; nodes: QSLNode[] };

export type QSLLesson = {
  id: string;
  title: string;
  tag: string;
  nodes: QSLNode[];
};

export type QSLModule = {
  id: string;
  num: string;
  title: string;
  tag: string;
  lessons: QSLLesson[];
  mastery?: string[]; // "you should be able to explain…" checks
};

export const QSL_INTRO = {
  title: "The Qualified Sales Leader — Course",
  blurb:
    "A drill-down course built from John McMahon's The Qualified Sales Leader. It's organized by the frameworks, processes, and lists in the book — the sales process, MEDDICC, discovery/scoping questions, champion-building, the economic-buyer playbook, negotiation, and forecasting — so you can learn the lessons, prove you understand them, and actually run them in the field.",
  how: [
    "Drill down: open a module, then open each lesson. Frameworks, checklists, and question banks each have their own spot.",
    "“Use it” callouts tell you what to do in a real deal. “Trap” callouts are the mistakes to avoid.",
    "Each module ends with a “Prove you understand it” panel — questions you should be able to answer cold for your manager.",
  ],
  spine:
    "The spine of the whole book: find pain → pain finds champions → champions get you to the economic buyer → the economic buyer controls the money → you sell big deals on quantified value. Skip steps and the chain breaks — small deals, low win rates, churn, and forecasts you can't trust.",
};

export const QSL_COURSE: QSLModule[] = [
  // ───────────────────────────── 1. MINDSET ─────────────────────────────
  {
    id: "basics",
    num: "01",
    title: "Mindset & The Basics",
    tag: "The leadership and selling fundamentals everything else is built on.",
    mastery: [
      "Recite the 10 Basics and explain why a common vocabulary comes first.",
      "Explain the inspire → coach → inspect loop and why you inspect the why.",
      "Do the 61-selling-days math and say why time is the enemy.",
      "Explain the pleasure–pain dynamic and how a leader 'makes it rain.'",
    ],
    lessons: [
      {
        id: "ten-basics",
        title: "The 10 Basics",
        tag: "The foundational habits of a qualifying leader.",
        nodes: [
          {
            k: "p",
            t: "Before you can run a process or coach a skill, you simplify to the basics (the fox-and-hedgehog lesson: one mastered fundamental beats endless new tricks). These ten make you a better qualifier and leader immediately.",
          },
          {
            k: "list",
            ordered: true,
            items: [
              "Common vocabulary — shared definitions for every sales term (champion, economic buyer, coach…). Without it, reps and managers talk past each other.",
              "Listening — we comprehend ~250 wpm but speak ~150, so we get impatient. Listen to understand, not to reply.",
              "Be here — full presence; escape 'continuous partial attention.' Live in the rep's story / the account.",
              "Intuition — pair your gut with the facts to triangulate the truth; most people only use their head.",
              "Self-awareness — know how your own traits help or block your people engaging you.",
              "Transformational mindset — transform people, don't just transact. 'Bad news can't wait.'",
              "Don't be a glorified scorekeeper — inspect the why deals move, then coach the what.",
              "Intentional outcomes — every meeting starts with a desired win-win outcome.",
              "Keep it simple — make complex things easy for reps and customers.",
              "Urgent curiosity — genuine, never-offensive curiosity to understand now.",
            ],
          },
          {
            k: "note",
            label: "Use it",
            t: "Before any rep meeting, write your desired win-win outcome. In the meeting, silence the phone, listen to understand, and ask from genuine curiosity — not a cookie-cutter checklist.",
          },
        ],
      },
      {
        id: "inspire-loop",
        title: "Inspire → Coach → Inspect",
        tag: "The never-ending leadership loop (and why you earn the right to inspect).",
        nodes: [
          {
            k: "list",
            ordered: true,
            items: [
              "Inspire — be intimate with each person's strengths, weaknesses, goals, fears; that's what drives them.",
              "Coach & develop — build the knowledge (what to do) and skills (how to do it) to run the process.",
              "Inspect — only after inspiring and coaching have you earned the right. Inspect the why: why deals progress or stall.",
            ],
          },
          {
            k: "note",
            label: "Remember",
            t: "Glorified scorekeepers track activity (calls, emails, POCs) and make horrible forecasters. Inspect the why, then coach the what — what to change, what to know, the next logical step.",
          },
        ],
      },
      {
        id: "time-enemy",
        title: "Time Is the Enemy — 61 Selling Days",
        tag: "Why urgent curiosity matters: a quarter is shorter than you think.",
        nodes: [
          {
            k: "list",
            ordered: true,
            items: [
              "90 days in the quarter",
              "− 24 weekend days → 66",
              "− ~3 holidays → 63",
              "− ~2 vacation days → 61 selling days",
            ],
          },
          {
            k: "note",
            label: "Use it",
            t: "Like Carlo at Ferrari — get the answers today, not at a follow-up next week. Urgent curiosity compresses sales cycles because you only have ~61 days to build pipeline and move deals.",
          },
        ],
      },
      {
        id: "leader-truths",
        title: "Leadership Truths",
        tag: "The mental models for leading change and making calls.",
        nodes: [
          {
            k: "sub",
            title: "Pleasure–pain dynamic (Grayboy the cat)",
            nodes: [
              {
                k: "p",
                t: "People avoid pain and seek pleasure; they only change when staying becomes more painful than moving. 'Make it rain' by asking tough qualification questions early — so digging deeper becomes more pleasurable than facing you unprepared.",
              },
            ],
          },
          {
            k: "sub",
            title: "Be the mirror of reality",
            nodes: [
              {
                k: "p",
                t: "You're paid to see the cold truth of an account. Bore into the core with zero emotional bias and great probing questions; don't let opinions make the situation look like something it isn't.",
              },
            ],
          },
          {
            k: "sub",
            title: "Control vs. no-control buckets",
            nodes: [
              {
                k: "p",
                t: "Stop worrying about what you can't change (product gaps, marketing leads). Pour your energy into what you control — recruiting, onboarding, training, coaching, leading — and make those world-class.",
              },
            ],
          },
          {
            k: "sub",
            title: "Get comfortable being uncomfortable",
            nodes: [
              {
                k: "p",
                t: "Leadership means doing things you've never done. Make the best call with the data and your gut; if it's wrong, change it fast. Don't marry your ego to decisions. And don't rush a non-urgent call — wait until head and gut agree.",
              },
            ],
          },
          {
            k: "sub",
            title: "Caring = competence",
            nodes: [
              {
                k: "p",
                t: "A hug is temporary; competence is forever. You show you care by making people competent so they win. Pride (from winning) is what people want, and a culture where people win/learn/earn/grow is one nobody leaves.",
              },
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────── 2. SALES PROCESS ───────────────────────────
  {
    id: "process",
    num: "02",
    title: "The 6-Stage Sales Process",
    tag: "The B2B map — stages, gates, and the logic chain that runs through all of it.",
    mastery: [
      "Name the six stages in order and the gate (verifiable customer event) for each.",
      "Recite the pain → champion → EB → funds → big-deal chain and its inverse.",
      "Explain 'slow down to go fast' and why skipping steps causes small deals.",
    ],
    lessons: [
      {
        id: "six-stages",
        title: "The Six Stages",
        tag: "The chronological B2B enterprise sales process.",
        nodes: [
          {
            k: "list",
            ordered: true,
            items: [
              "Discovery — investigate and qualify the account in or out.",
              "Scoping — quantify and implicate the pain; build the cost justification.",
              "Economic Buyer meeting — the go/no-go wall: confirm priority + budget.",
              "Validation Event (POV) — prove quantified value against controlled criteria.",
              "Business Case & final proposal — value-realization doc in the buyer's terms.",
              "Negotiate & Close — survive procurement; close on justified value.",
            ],
          },
          {
            k: "note",
            label: "Remember",
            t: "Stages aren't fixed law — they adjust to the customer's buying process. But every stage needs a gate.",
          },
        ],
      },
      {
        id: "gates",
        title: "Gates & Exit Criteria",
        tag: "How you know a stage is actually done.",
        nodes: [
          {
            k: "p",
            t: "A gate is the exit criteria between stages, based on a verifiable customer event (not a rep's feeling). Gates can carry KPIs — % of deals that move stage-to-stage and how long it takes.",
          },
          {
            k: "note",
            label: "Trap",
            t: "If every rep on a team mis-stages just one $100K deal, that's a $500K forecast error — and it compounds into millions up the org. Stage discipline is a forecasting issue, not a CRM chore.",
          },
        ],
      },
      {
        id: "logic-chain",
        title: "The Logic Chain",
        tag: "The single idea the whole process serves.",
        nodes: [
          {
            k: "sub",
            title: "When you do it right",
            nodes: [
              {
                k: "list",
                ordered: true,
                items: [
                  "Discover pain → creates an opportunity",
                  "Quantify pain → drives a higher price point",
                  "Implicate pain → drives urgency",
                  "Pain finds champions → champions reach the economic buyer",
                  "Economic buyer → controls major funds",
                  "→ You sell big deals based on value",
                ],
              },
            ],
          },
          {
            k: "sub",
            title: "The inverse (why deals die)",
            nodes: [
              {
                k: "list",
                items: [
                  "No discovered pain → no opportunity",
                  "No quantified pain → no cost justification",
                  "No implicated pain → no urgency",
                  "No champion → no access to the economic buyer",
                  "No economic buyer → no major funds → small deals or no deals",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "slow-down",
        title: "Slow Down to Go Fast",
        tag: "Why the early stages are where deals are won.",
        nodes: [
          {
            k: "p",
            t: "Rushing to a POC skips discovery and scoping, creating a blind exchange — the customer blind to your value, the rep blind to the pain. Slowing down in stages 1–2 is how you find the biggest pain, quantify it, and gain control before the deal drifts into late stages where the customer stops sharing.",
          },
          {
            k: "note",
            label: "Trap",
            t: "Customers buy the benefit (the half-inch hole), not the product (the drill bit). Sell features and you get small deals and 'you get relegated to whom you sound like.'",
          },
        ],
      },
    ],
  },

  // ───────────────────────────── 3. DISCOVERY ─────────────────────────────
  {
    id: "discovery",
    num: "03",
    title: "Stage 1 — Discovery",
    tag: "Investigate, don't sell. Find pain above the noise and the player who owns it.",
    mastery: [
      "Explain why discovery is investigating, not selling.",
      "Run the immersion loop and list the knowledge you must know cold to do it.",
      "State the discovery gate (verifiable exit criteria).",
    ],
    lessons: [
      {
        id: "disc-what",
        title: "What Discovery Gathers",
        tag: "The information that qualifies an account in or out.",
        nodes: [
          {
            k: "list",
            items: [
              "Pain points, problems, or a corporate initiative",
              "How the customer does things today (current process, environment, results)",
              "Their expectations / desired business outcome",
              "The key players: coaches, champions, gatekeepers, technical users, enemies (the competition's champion)",
              "A potential champion — someone with influence who can reach the economic buyer",
            ],
          },
        ],
      },
      {
        id: "disc-questions",
        title: "Discovery Question Bank",
        tag: "Investigative questions to uncover and understand pain.",
        nodes: [
          {
            k: "q",
            title: "Ask to discover & understand the pain",
            items: [
              "Why do you think this is a problem?",
              "Why do you think this happens?",
              "Why do you have to remedy this now?",
              "When does this occur? How often?",
              "Have you tried to remedy this before? How?",
              "What company measure does this affect?",
              "Who is held personally accountable for that measure?",
              "How does this affect your people?",
              "Can you walk me through your current process?",
              "Who else is involved in the process?",
              "How does this affect other processes? Who else might it affect?",
              "How is this issue affecting the company?",
              "What else does it depend on?",
              "What is the company's desired business outcome?",
            ],
          },
        ],
      },
      {
        id: "disc-immersion",
        title: "The Immersion Loop + Required Knowledge",
        tag: "The art of the conversation — only possible if you're prepared.",
        nodes: [
          {
            k: "sub",
            title: "The 4-action loop",
            nodes: [
              {
                k: "list",
                ordered: true,
                items: [
                  "Questioning — ask open-ended questions",
                  "Listening — listen to understand",
                  "Confirming — verify your complete understanding",
                  "Feeling — sense the customer's response",
                ],
              },
            ],
          },
          {
            k: "sub",
            title: "Know these cold (so you can listen, not think)",
            nodes: [
              {
                k: "list",
                items: [
                  "The customer's use case",
                  "Typical pains in that use case",
                  "Your open-ended discovery questions",
                  "Your unique product differentiators",
                  "How those differentiators solve the customer's pains",
                  "Typical quantifiable value of your solution",
                  "Customer success stories with before/after scenarios",
                ],
              },
            ],
          },
          {
            k: "sub",
            title: "Give to get (what the customer wants back)",
            nodes: [
              {
                k: "list",
                items: [
                  "A summary of the conversation; confirm you understand their pain/environment",
                  "What you might be missing",
                  "How your capabilities align to their pain; why you're different",
                  "A success story or two — they're not the only company with this issue",
                ],
              },
            ],
          },
          {
            k: "note",
            label: "Use it",
            t: "Hockey's 'skate to open ice': take the time and space the customer gives you to gather info, but sense when to pass the conversation back with value.",
          },
        ],
      },
      {
        id: "disc-gate",
        title: "Discovery Gate",
        tag: "Verifiable exit criteria.",
        nodes: [
          {
            k: "p",
            t: "Send the customer a recap email that confirms the discovered pain, the players involved, and the desired business outcome — and books the next meeting. Share that email + the calendared meeting with your manager to mark discovery complete.",
          },
        ],
      },
    ],
  },

  // ──────────────────────── 4. SCOPING & VALUE ────────────────────────
  {
    id: "scoping",
    num: "04",
    title: "Stage 2 — Scoping & Value",
    tag: "Quantify and implicate the pain. Get above the noise. Build the cost justification.",
    mastery: [
      "Explain the difference between POC and POV and why it matters.",
      "Describe as-is vs. to-be and why gain must far exceed pain.",
      "Name the 5 common pain areas and tie pain to revenue, profit, or risk.",
    ],
    lessons: [
      {
        id: "scope-quantify",
        title: "Quantify + Implicate",
        tag: "The two moves that turn pain into urgency and price.",
        nodes: [
          {
            k: "list",
            items: [
              "Quantify — capture as-is metrics and define preliminary to-be metrics. Without this you can't justify price.",
              "Implicate — spell out the negative consequences of not solving it now: who suffers and what company measure suffers.",
            ],
          },
          {
            k: "note",
            label: "Remember",
            t: "Find pain → quantify pain → implicate pain → urgency. Few reps quantify; even fewer implicate — that's where the sale is created (the Tony 'box up' insurance call).",
          },
        ],
      },
      {
        id: "scope-poc-pov",
        title: "POC → POV",
        tag: "Stop proving the tech works; prove the value.",
        nodes: [
          {
            k: "p",
            t: "Your product works — so a 'proof of concept' is pointless. Shift to Proof of Value (POV): prove your product delivers quantifiable business value for the customer's specific use case. It changes the mindset from proving technology to proving value.",
          },
        ],
      },
      {
        id: "scope-journey",
        title: "The Scoping Journey & 3 Documents",
        tag: "What you run and what you produce.",
        nodes: [
          {
            k: "sub",
            title: "The journey (share it with the customer)",
            nodes: [
              {
                k: "list",
                ordered: true,
                items: [
                  "Scoping — understand & quantify the pain; outline a potential POV. Decides if there's alignment between product capability, pain, and customer value.",
                  "Go/no-go meeting — with the economic buyer, confirm the pain is a priority to solve.",
                  "POV — outline the criteria and timeframe.",
                ],
              },
            ],
          },
          {
            k: "sub",
            title: "The 3 documents it produces",
            nodes: [
              {
                k: "list",
                ordered: true,
                items: [
                  "A cost justification with as-is and to-be metrics",
                  "A POV plan that directly maps to that cost justification",
                  "A preliminary pricing proposal based on the cost justification",
                ],
              },
            ],
          },
          {
            k: "note",
            label: "Trap",
            t: "Gather this early. Once the customer thinks they've connected their problem to your solution, they get reluctant to share pain/process metrics and only want pricing.",
          },
        ],
      },
      {
        id: "scope-noise",
        title: "Get Above the Noise",
        tag: "Sell to the fires that threaten the business, not the ones they live with.",
        nodes: [
          {
            k: "p",
            t: "The CISO 'forest ranger, not firefighter' lesson: executives let small fires burn and only buy from vendors solving the biggest threats. All real business pain maps to revenue, profitability, or risk — that's how you get above the noise.",
          },
          {
            k: "sub",
            title: "5 common pain areas to hunt",
            nodes: [
              {
                k: "list",
                ordered: true,
                items: [
                  "Regulation / compliance (PCI, HIPAA, GDPR)",
                  "Competition (e.g., needing to move to the cloud to keep an edge)",
                  "Security (cloud, mobile, work-from-home, AI/ML open new attack surface)",
                  "Productivity, cost & quality (process/operational pain, labor, systems)",
                  "Reputation (unhappy customers / failures hitting the brand)",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "scope-gate",
        title: "Scoping Gate",
        tag: "Verifiable exit criteria.",
        nodes: [
          {
            k: "list",
            items: [
              "Full understanding of the customer's pains and how your capabilities align (they're buying what you're selling)",
              "The negative consequences of not solving the pain",
              "A quantification of pain in a preliminary cost justification (as-is / to-be)",
              "A confirmed champion — no champion, no reason to go further",
            ],
          },
        ],
      },
    ],
  },

  // ──────────────────────── 5. TARGETING & ICP ────────────────────────
  {
    id: "icp",
    num: "05",
    title: "Targeting & The ICP",
    tag: "Go where the money is. Build an Ideal Customer Profile and prioritize who to chase.",
    mastery: [
      "Walk the 8-step ICP flow from differentiators outward.",
      "Distinguish unique vs. defensible differentiators.",
      "Explain propensity-to-buy and sales-complexity filters and when to deprioritize a 'fit' account.",
    ],
    lessons: [
      {
        id: "icp-flow",
        title: "The 8-Step ICP Flow",
        tag: "Build the profile from your differentiators outward (Jesse James: go where the money is).",
        nodes: [
          {
            k: "list",
            ordered: true,
            items: [
              "List your unique, defensible product differentiators",
              "Target the pain points those differentiators solve",
              "Map those pains to specific use cases",
              "Quantify the business value of solving each use case",
              "List the negative consequences of not solving the pain",
              "Find the companies/industries that have those use cases",
              "Identify the personas who own those use cases",
              "Prioritize companies/industries by highest customer value",
            ],
          },
        ],
      },
      {
        id: "icp-elements",
        title: "ICP Building Blocks",
        tag: "The detail behind each step.",
        nodes: [
          {
            k: "list",
            items: [
              "Unique differentiators — capabilities only your product has.",
              "Defensible — provable in a head-to-head test vs. competitors.",
              "Pain points — what the customer does today to work around it (extra people / extra time).",
              "Quantifiable value — how solving it increases revenue, cuts cost, cuts risk, or boosts productivity.",
              "Negative consequences — who/what suffers if unsolved (quality, revenue, support load, churn).",
              "Use cases — how customers use the product; which drive the largest value.",
              "Buyers — title, boss, budget, job measures, priorities, power, language.",
              "Environment / infrastructure — prerequisites a company must have to buy.",
              "Industry & size — segments/sizes worth calling on.",
              "Company support — can YOUR company actually support that customer?",
            ],
          },
        ],
      },
      {
        id: "icp-propensity",
        title: "Propensity to Buy & Sales Complexity",
        tag: "Two filters that re-rank your 'perfect fit' list.",
        nodes: [
          {
            k: "sub",
            title: "Higher propensity to buy (examples)",
            nodes: [
              {
                k: "list",
                items: [
                  "Short product life cycles",
                  "All-in on the cloud",
                  "Hires the best developers / buys leading-edge tech",
                  "Must comply with new pending regulation",
                  "Has a critical impending event",
                ],
              },
            ],
          },
          {
            k: "sub",
            title: "Sales complexity (raises cost/length)",
            nodes: [
              {
                k: "list",
                items: [
                  "Multiple stakeholders / levels / departments / locations",
                  "Hard C-level access; long time to read the political landscape",
                  "Lengthy POV requirements & strong cost-justification hurdles",
                  "Regulatory/compliance requirements; long legal & procurement",
                ],
              },
            ],
          },
          {
            k: "note",
            label: "Use it",
            t: "A high-value but low-propensity, high-complexity account (big financial services, government) may get deprioritized — unless you find an agile pocket inside it (e.g., a wealth-management team building an app vs. fintech startups).",
          },
        ],
      },
      {
        id: "icp-lawyer",
        title: "Leading the Witness",
        tag: "Sell like a great lawyer.",
        nodes: [
          {
            k: "p",
            t: "Great sellers, like great lawyers, prepare precise questions for a witness whose answers they can anticipate, then listen and ask secondary/tertiary questions. Tony 'did his homework' (LinkedIn, the financial advisor) — preparation is what lets you immerse and lead the conversation to a quantified, implicated conclusion.",
          },
        ],
      },
    ],
  },

  // ───────────────────────────── 6. CHAMPIONS ─────────────────────────────
  {
    id: "champions",
    num: "06",
    title: "Champions",
    tag: "Find influence, earn trust, educate, and test the person who gets you to the money.",
    mastery: [
      "Draw the influence × authority 2×2 and place business champion, technical champion, and coach.",
      "Explain the difference between a coach and a champion (small eyes vs. large eyes; info vs. action).",
      "List how you know you truly have a champion.",
    ],
    lessons: [
      {
        id: "champ-powerchart",
        title: "Org Chart vs. Power Chart",
        tag: "Authority is on the org chart; influence is on the power chart.",
        nodes: [
          {
            k: "p",
            t: "An org chart shows positional authority. A power chart shows who has the influence to reach the economic buyer — independent of hierarchy. Plot people on influence (x) × authority (y):",
          },
          {
            k: "list",
            items: [
              "Influence + authority → potential business champion",
              "Influence + no authority → potential technical champion (deep domain expertise)",
              "No influence (either quadrant) → at best a coach, never a champion",
            ],
          },
          {
            k: "note",
            label: "Remember",
            t: "'Absence of evidence is not evidence of absence' (the Fujitsu story). If you haven't found the champion, keep looking.",
          },
        ],
      },
      {
        id: "champ-find",
        title: "Where to Find Champions",
        tag: "Questions that surface influence.",
        nodes: [
          {
            k: "q",
            title: "Who in the account…",
            items: [
              "Is working on critical projects?",
              "Was recently promoted?",
              "Has been assigned new initiatives?",
              "Is held personally accountable for key decisions?",
              "Made the last departmental purchase?",
              "Do C-level execs confer with on critical decisions?",
              "Is most influential when presenting to a group?",
              "Asks the most perceptive, probing questions in meetings?",
              "Do people say is most influential in these decisions?",
            ],
          },
          {
            k: "note",
            label: "Use it",
            t: "Ops people around a C-level (sales ops, enablement, finance ops) know the C-level's biggest unsolved issues and who influences those decisions — a goldmine for finding champions.",
          },
        ],
      },
      {
        id: "champ-why",
        title: "Why Someone Champions You",
        tag: "Answer 'what's in it for me?' — the personal win.",
        nodes: [
          {
            k: "list",
            items: [
              "Recognition — seen as a company problem-solver / cost-cutter",
              "Control — over the implemented solution and its users",
              "Productivity — lifting their whole department",
              "Promotion — rewarded for continued problem-solving",
              "Status — name tied to a valuable business solution",
            ],
          },
        ],
      },
      {
        id: "champ-trust",
        title: "Earning Trust",
        tag: "Be selfless; the window vs. the mirror.",
        nodes: [
          {
            k: "p",
            t: "Champions won't attach to small pains or unprepared reps who could tarnish their reputation. Trust is earned by genuine, selfless curiosity — when 'silver' (self-interest) gets between you and the customer, the window becomes a mirror and you only see yourself.",
          },
          {
            k: "sub",
            title: "The trust loop (repeat, never-ending)",
            nodes: [
              {
                k: "list",
                ordered: true,
                items: [
                  "Ask — prepared discovery/scoping questions",
                  "Message — align the potential solution to the pain and company fit",
                  "Confirm — get agreement, or realign by asking again",
                ],
              },
            ],
          },
          {
            k: "sub",
            title: "3 trust-value elements a champion weighs",
            nodes: [
              {
                k: "list",
                ordered: true,
                items: [
                  "Business value — does it solve the problem; does gain far outweigh pain (ROI)?",
                  "Performance value — will the company support/adopt/optimize it?",
                  "Experience value — is the salesperson a trustworthy business partner?",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "champ-educate",
        title: "Educating the Champion",
        tag: "Once you have one, selling becomes educating.",
        nodes: [
          {
            k: "p",
            t: "Arm your champion to be your internal salesperson so they're never caught flat-footed. Educate them on:",
          },
          {
            k: "list",
            items: [
              "The competition's product, competitive traps, and common objections",
              "How to justify your product internally",
              "Calls with champions in your install base",
              "Meetings with executives at your company",
            ],
          },
          {
            k: "note",
            label: "Use it",
            t: "Role-play the EB meeting with your champion (the UPS deal). It prepares them and tests whether they're real — and that deal closed at $1M+.",
          },
        ],
      },
      {
        id: "champ-test",
        title: "Testing the Champion",
        tag: "Confirm they're a champion, not just a good coach — at the right time.",
        nodes: [
          {
            k: "q",
            title: "Questions that test knowledge",
            items: [
              "How are items purchased here? What's the typical evaluation process?",
              "Who made the last few major purchases?",
              "Can you map out the as-is process with me?",
              "Why is this pain a major pain? What are the implications of not solving it?",
              "How do you know our solution provides business value?",
              "How does the competition's solution provide value? What happened in your meeting with them?",
            ],
          },
          {
            k: "q",
            title: "Actions that test commitment",
            items: [
              "Arrange a demo to a different department",
              "Introduce another stakeholder in the decision",
              "Share product evaluation documents",
              "Call a customer reference",
              "Sponsor a meeting with the economic buyer",
              "Help create the POV criteria",
              "Introduce you to legal and procurement",
              "Help craft the cost justification",
            ],
          },
          {
            k: "sub",
            title: "Three test plays",
            nodes: [
              {
                k: "list",
                items: [
                  "Good guy / bad guy — your boss makes the bigger ask (the Northwest Insurance director, $500K → $1M).",
                  "The boss test — 'My boss thinks I'm wasting time here. What should I tell him? Should I spend more time?'",
                  "Professional walk-away — to test a stealth champion (Scott's respectful withdrawal; the committee called back within two hours).",
                ],
              },
            ],
          },
          {
            k: "note",
            label: "Trap",
            t: "Test only after due diligence and earned trust. Premature tests burn potential champions. Be selfless, not selfish.",
          },
        ],
      },
      {
        id: "champ-know",
        title: "How You Know You Have One",
        tag: "Predictable, collaborative, proactive.",
        nodes: [
          {
            k: "list",
            items: [
              "Predictable — you're in control; account events happen exactly as you discussed; no surprises.",
              "Collaborative — information flows both ways; you co-create the decision criteria and process.",
              "Proactive actions — they introduce you to key players, share competitor intel, want your references, and request meetings with your execs.",
            ],
          },
        ],
      },
      {
        id: "champ-coach",
        title: "Coach vs. Champion",
        tag: "The #1 mistake in sales.",
        nodes: [
          {
            k: "list",
            items: [
              "Coach — small eyes of product fit; speaks technical; gives information but never takes action; no influence/access. A recommender, technical buyer, or gatekeeper.",
              "Champion — large eyes of business fit; speaks business; takes action; has influence and access to the EB.",
              "A coach can never be a champion (no influence). A champion can also be a coach (gives you inside info).",
            ],
          },
          {
            k: "note",
            label: "Remember",
            t: "Speak in business terms to reach high-level champions. Sound technical and 'you get relegated to whom you sound like.'",
          },
        ],
      },
      {
        id: "champ-implementation",
        title: "Implementation Champions & the Competitor's Champion",
        tag: "Even the EB needs a champion; always out-champion the competition.",
        nodes: [
          {
            k: "sub",
            title: "Why the EB needs an implementation champion (6)",
            nodes: [
              {
                k: "list",
                ordered: true,
                items: [
                  "Make the implementation successful",
                  "Minimize/remedy issues quietly",
                  "Be a great reference",
                  "Quantify value for renewals & upsells",
                  "Prevent competitors attacking the install base",
                  "Prevent churn",
                ],
              },
            ],
          },
          {
            k: "sub",
            title: "Out-champion the competition",
            nodes: [
              {
                k: "p",
                t: "Ask: is my champion stronger than the competitor's champion? If they clashed internally, who wins? Counter by educating your champion on traps/objections and by building multiple champions — wider and higher.",
              },
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────── 7. ECONOMIC BUYER ───────────────────────
  {
    id: "eb",
    num: "07",
    title: "Stage 3 — The Economic Buyer",
    tag: "The go/no-go wall. Confirm priority and budget with the person who controls the funds.",
    mastery: [
      "Define the economic buyer precisely and why the EB meeting is go/no-go.",
      "Run the 9-part EB agenda and the 4 prep steps.",
      "Explain the ABB 'larger lens' lesson and the muchness/soonness/sureness/easiness buckets.",
    ],
    lessons: [
      {
        id: "eb-define",
        title: "Definition & the Wall",
        tag: "Discretionary use of funds.",
        nodes: [
          {
            k: "p",
            t: "The economic buyer is the person with discretionary use of the funds — they can reallocate budget and make the final call; everyone else's signature is a rubber stamp. The EB meeting is the go/no-go wall: clear it (priority + budget confirmed) and you finish the process; fail it and the process is over.",
          },
        ],
      },
      {
        id: "eb-agenda",
        title: "The 9-Part EB Agenda",
        tag: "What you substantiate in the meeting.",
        nodes: [
          {
            k: "list",
            ordered: true,
            items: [
              "High-level summary of your discovery & scoping findings",
              "Current state — the as-is",
              "Negative consequences of that current state",
              "Proposed state — the to-be",
              "Benefits of that future state",
              "Required capabilities to achieve it",
              "Customer success stories with quantified before/after",
              "Your solution, mapped to the criteria",
              "Confirmation of the remaining decision-process steps",
            ],
          },
          {
            k: "note",
            label: "Remember",
            t: "With a champion's prep brief, most EB meetings are confirmatory — even ceremonial. Agree the deliverables and talk track with your champion first.",
          },
        ],
      },
      {
        id: "eb-prep",
        title: "4 Prep Steps + the Larger Lens",
        tag: "How to walk in confident.",
        nodes: [
          {
            k: "list",
            ordered: true,
            items: [
              "Do your homework — 8 of 10 execs say sales meetings waste their time because reps are unprepared.",
              "Be a business partner — tell them something about their business they hadn't considered.",
              "Position to their metrics — revenue, cost, risk at the corporate level; time-to-market, productivity, quality at the personal level.",
              "Speak in their business terms — the EB's lens may differ from your champion's.",
            ],
          },
          {
            k: "note",
            label: "Use it",
            t: "ABB Transformers: the champion justified $30.6M on engineering productivity; the corporate EB justified it on 20% production scrap (= two idle plants). The higher you go, the larger the lens.",
          },
        ],
      },
      {
        id: "eb-ask",
        title: "Questions to Ask the EB",
        tag: "What you confirm in the room.",
        nodes: [
          {
            k: "q",
            title: "Ask the economic buyer",
            items: [
              "Where in your priority list does this problem rank?",
              "What specific business measure does this issue most affect?",
              "When would you prefer to solve it?",
              "If we prove $X savings for a $Y investment in the POV, would you allocate $Y?",
              "Besides yourself, is anyone else required to approve a purchase this size?",
              "If the POV succeeds, what are the remaining steps in your decision process?",
            ],
          },
          {
            k: "sub",
            title: "The two conditions to call the EB back",
            nodes: [
              {
                k: "list",
                ordered: true,
                items: [
                  "If the final business case is materially different from the preliminary one after the POV",
                  "If anyone significantly changes the agreed validation criteria (a warning shot to the competitor's champion)",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "eb-asks-you",
        title: "What the EB Will Ask You",
        tag: "Four buckets — be ready.",
        nodes: [
          {
            k: "list",
            items: [
              "Muchness — How much does it cost / to implement? How much will we save?",
              "Soonness — How soon can it be implemented? How soon to ROI?",
              "Sureness — How sure are you it works here / of the cost justification? Which customer can I call?",
              "Easiness — How easy to implement? How easy for our people to learn?",
            ],
          },
        ],
      },
      {
        id: "eb-tree",
        title: "The Tree — Start High",
        tag: "Big money lives at the top.",
        nodes: [
          {
            k: "p",
            t: "An org is a tree: twigs and branches have some money, but big money lives at the top. Most reps start at the trunk, get stranded on low branches, and get blocked from climbing by enemies, insecure managers, or the competitor's champion. Start high — most competitors climb too late — and speak the business language up there or get relegated back down.",
          },
          {
            k: "note",
            label: "Trap",
            t: "Calling high LATE (via your CRO/CEO) almost never rescues a lost deal — the EB checks with the lower managers you educated and concludes 'you got outsold.' This is hardest in replacement sales, where the incumbent's champion fights to keep you low.",
          },
        ],
      },
    ],
  },

  // ─────────────────────── 8. VALIDATION EVENT ───────────────────────
  {
    id: "pov",
    num: "08",
    title: "Stage 4 — Validation Event (POV)",
    tag: "Prove quantified value against criteria you control. Win it and the order follows.",
    mastery: [
      "Explain why the rep who controls the criteria wins.",
      "List the POV prerequisites and what a POV is NOT.",
      "Describe what to do during and after the POV.",
    ],
    lessons: [
      {
        id: "pov-criteria",
        title: "Control the Criteria",
        tag: "The $1,000 high-school competition.",
        nodes: [
          {
            k: "p",
            t: "You'd never wager $1,000 on a contest without knowing the events and scoring. Same in selling: define the POV criteria so your differentiators are included, weight and score each element in your favor, and get it all agreed in writing before the event. It's a quid pro quo — the EB has agreed to buy if the test succeeds (subject to legal/pricing).",
          },
        ],
      },
      {
        id: "pov-prereqs",
        title: "Prerequisites Before a POV",
        tag: "Don't start until these are true.",
        nodes: [
          {
            k: "list",
            ordered: true,
            items: [
              "You have a confirmed champion",
              "Your champion helped frame the validation criteria & scoring from discovery/scoping",
              "You've built the cost justification where gain far exceeds pain",
              "You've verified priority, budget, authority, timing, and remaining steps with the EB",
            ],
          },
        ],
      },
      {
        id: "pov-not",
        title: "What a POV Is NOT",
        tag: "Late-stage event, not an early-stage shortcut.",
        nodes: [
          {
            k: "list",
            items: [
              "Not an early-stage event",
              "Not a time to educate the customer",
              "Not a chance to discover pain",
              "Not a time to find champions",
              "Not a time to make friends",
            ],
          },
        ],
      },
      {
        id: "pov-duringafter",
        title: "During & After the POV",
        tag: "Run it, then convert it.",
        nodes: [
          {
            k: "sub",
            title: "During",
            nodes: [
              {
                k: "list",
                items: [
                  "Reconfirm the as-is / to-be process metrics from the cost justification",
                  "Adjust as-is / to-be based on new information",
                  "Capture material evidence the solution solves the pain",
                  "Keep aligning the champion's personal win",
                ],
              },
            ],
          },
          {
            k: "sub",
            title: "After",
            nodes: [
              {
                k: "list",
                items: [
                  "Build a summary findings report",
                  "Share it face-to-face with your champion and get buy-in",
                  "If results materially change the justification, update it and bring it back to the EB to further justify price and drive urgency",
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────── 9. BUSINESS CASE ───────────────────────
  {
    id: "businesscase",
    num: "09",
    title: "Stage 5 — The Business Case",
    tag: "The value-realization document, written in the buyer's terms — and a plan that de-risks the buy.",
    mastery: [
      "Explain why the business case is written as the customer's internal document.",
      "List what it contains and how value must be expressed.",
      "Name the ways to overcome peak buyer risk after the POV.",
    ],
    lessons: [
      {
        id: "bc-contains",
        title: "What the Business Case Contains",
        tag: "Write it as if the customer wrote it.",
        nodes: [
          {
            k: "list",
            items: [
              "Their corporate objectives and strategic initiatives",
              "The business problem/opportunity and how it fits those initiatives",
              "Before/after use-case scenarios and how you uniquely solve the problem",
              "How you deliver the outcome — the people, processes, and timeframes",
              "A final cost justification translated into their business terms",
            ],
          },
          {
            k: "note",
            label: "Use it",
            t: "Express value in measured terms, never vague 'increase productivity': e.g., 'increase annual revenue $20M,' 'eliminate $50M in production scrap,' 'cut time-to-market 10% = $15M savings.' It becomes the post-implementation baseline for renewals and cross-sell.",
          },
        ],
      },
      {
        id: "bc-risk",
        title: "Overcoming Buyer Risk",
        tag: "Risk peaks right after the POV.",
        nodes: [
          {
            k: "p",
            t: "After the POV the buyer faces the real decision and fears making the wrong call / losing standing. Help them take the leap of faith:",
          },
          {
            k: "list",
            items: [
              "Remind them of the POV results (it works)",
              "Restate the consequences of not solving the pain",
              "Share results from other customers with the same pain",
              "Set up a reference call to a champion at another company",
              "Remind them of their personal win",
              "Present a well-thought-out implementation plan",
            ],
          },
        ],
      },
      {
        id: "bc-implplan",
        title: "Implementation Plan Template",
        tag: "Dates that drive prioritization and urgency.",
        nodes: [
          {
            k: "list",
            ordered: true,
            items: [
              "Start the project by date A",
              "Train the stakeholders by date B",
              "Reserve internal resources / services by date C",
              "Achieve the results (the EB's timeframe) by date D",
              "Finalize the contract by date Z so resources can be reserved and the deadline met",
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────── 10. NEGOTIATE & CLOSE ───────────────────────
  {
    id: "negotiate",
    num: "10",
    title: "Stage 6 — Negotiate & Close",
    tag: "Survive procurement. Your strength is the trust, criteria, and value you built earlier.",
    mastery: [
      "Explain how procurement tries to commoditize you and why skipping steps is fatal here.",
      "Name your sources of strength in a price negotiation.",
      "Explain why 'urgency is your friend; time is now the customer's enemy.'",
    ],
    lessons: [
      {
        id: "neg-procurement",
        title: "What Procurement Does",
        tag: "Their job is to cut your price.",
        nodes: [
          {
            k: "p",
            t: "Procurement separates business value from price to commoditize you, may gag-order your champion/EB, and invites competitor bids to create a bidding war. An incoming procurement call alerts a smart late competitor to swoop in with FUD and lowball pricing — which is exactly why you never skip steps.",
          },
        ],
      },
      {
        id: "neg-strength",
        title: "Your Sources of Strength",
        tag: "Why you hold the seat at the table.",
        nodes: [
          {
            k: "list",
            items: [
              "Decision criteria you created and control via your champion (any new competitor is judged by them)",
              "Proof of your unique differentiation solving their pain in the POV",
              "A price anchored to the cost justification, acknowledged by the EB",
              "Trust and relationship with the champion + EB that a latecomer can't replicate in a short window",
            ],
          },
        ],
      },
      {
        id: "neg-tactics",
        title: "11 Procurement Tactics",
        tag: "Recognize the play; stay calm.",
        nodes: [
          {
            k: "list",
            ordered: true,
            items: [
              "Pissed off for no apparent reason",
              "Take it or leave it",
              "You need us more than we need you",
              "The 'we love you' charade",
              "The no-budget bust",
              "Good guy / bad guy",
              "The disappearing friend",
              "The shame game",
              "The 'one more thing' strategy",
              "Have a heart",
              "The 'it's over' gambit",
            ],
          },
        ],
      },
      {
        id: "neg-urgency",
        title: "Urgency Is Your Friend",
        tag: "Time flips from your enemy to theirs.",
        nodes: [
          {
            k: "p",
            t: "You created urgency by implicating pain (scoping) and setting timeframes (EB meeting + implementation plan). Every day the customer faces the consequences of not solving it. You never have to decide on price immediately — but if you did your job, their business doesn't have time. Stay grounded in the quantified value in your business case.",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── 11. MEDDICC ───────────────────────────
  {
    id: "meddicc",
    num: "11",
    title: "MEDDICC — Qualification",
    tag: "The GPS for your sales process. Question banks to qualify every stage from both sides.",
    mastery: [
      "Explain that MEDDICC is a framework, not a process, and the map/GPS analogy.",
      "Recite the Three Whys and what each qualifies.",
      "Name the three parties who can control a deal and how control shifts.",
    ],
    lessons: [
      {
        id: "med-what",
        title: "What MEDDICC Is (and Isn't)",
        tag: "A framework, not a process.",
        nodes: [
          {
            k: "p",
            t: "MEDDICC = Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify the pain, Champion, Competition (with Paper Process). It's the GPS to your sales process's map: usable at any point to tell your exact location and next step.",
          },
          {
            k: "list",
            items: [
              "Rapidly identify an opportunity (are they buying what you're selling?)",
              "Acknowledge your location — did you enter early or late?",
              "See the gap between knowns and unknowns",
              "Build an action plan to get back on track",
              "Analyze rep knowledge & skill gaps",
            ],
          },
        ],
      },
      {
        id: "med-identify",
        title: "Identify — The Three Whys",
        tag: "Maps to Discovery. The deal dies here if a rep can't answer them.",
        nodes: [
          {
            k: "sub",
            title: "Why do they have to BUY?",
            nodes: [
              {
                k: "q",
                items: [
                  "How would they describe the level of pain?",
                  "What are the specific pain points?",
                  "Is the pain above the noise?",
                  "Is the pain described in technical terms, business terms, or both?",
                  "What is the customer's use case?",
                ],
              },
              {
                k: "note",
                label: "Remember",
                t: "This also surfaces WHO owns the pain (the CAD lesson: target the VP of Engineering who owns the pain, not the CAD director who has none).",
              },
            ],
          },
          {
            k: "sub",
            title: "Why do they have to buy from US?",
            nodes: [
              {
                k: "q",
                items: [
                  "Are your product differentiators tied to their pains?",
                  "Which of your capabilities is uniquely differentiated?",
                ],
              },
            ],
          },
          {
            k: "sub",
            title: "Why do they have to buy NOW?",
            nodes: [
              {
                k: "q",
                items: [
                  "What happens if they do nothing?",
                  "What company measure suffers?",
                  "Do they have another alternative to solve the pain?",
                  "Do you know their desired business outcome?",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "med-metrics",
        title: "Metrics",
        tag: "Maps to Scoping. Quantified pain + quantified value.",
        nodes: [
          {
            k: "q",
            title: "Quantifying questions",
            items: [
              "What is the use case? Who owns it?",
              "How much is the quantified pain?",
              "Have you outlined current as-is and desired to-be scenarios?",
              "What is the quantified business value? Does gain far outweigh pain?",
              "What is their desired business outcome and how is success measured? Any current KPIs?",
              "Have you built a preliminary cost justification?",
              "Have you shared it with your champion; do they agree with each element?",
              "Have you reconfirmed why they need your differentiators in the to-be solution?",
              "What price point would you set in the EB meeting?",
            ],
          },
        ],
      },
      {
        id: "med-criteria",
        title: "Decision Criteria",
        tag: "The buyer's shopping list — formed in discovery, finalized in scoping.",
        nodes: [
          {
            k: "p",
            t: "The required capabilities every vendor is judged against. If your differentiators are in the final criteria, they're buying what you're selling; if the competitor's are, you're losing. The rep who helps the champion write the criteria controls the deal.",
          },
          {
            k: "q",
            title: "Qualify control of the criteria",
            items: [
              "Do your capabilities align to the customer's pains? Can you describe the pain and how you alleviate it?",
              "Did you help your champion rank the criteria?",
              "Which of your unique differentiators are in the criteria?",
              "Have the criteria changed since the original agreement? If so, which competitor influenced them?",
              "Which competitor differentiators were inserted, and when?",
              "Who is the competition speaking with that can change the criteria?",
              "Are you in control or losing it? Why do you think you're in control?",
              "Are you ready to discuss with the EB how your capability solves the pain?",
            ],
          },
        ],
      },
      {
        id: "med-process",
        title: "Decision Process",
        tag: "The people, events, and timeframes to evaluate and select.",
        nodes: [
          {
            k: "q",
            title: "Qualify the process",
            items: [
              "What specific events will the company use to evaluate a solution?",
              "Besides your champion, who's involved in each event? Who have you met one-on-one?",
              "Have any new people entered since it was created?",
              "What timeframes attach to each event?",
              "Has the process changed since it was created? Who changed it? Were you/your champion involved?",
              "Is your champion helping you control the process? If not, which competitor's champion is?",
              "What is the title of the competition's champion?",
              "Does the POV have defined start/end dates? Which competitors are involved?",
              "Are you ready to confirm the process with the EB? Can you meet the EB after the POV?",
            ],
          },
        ],
      },
      {
        id: "med-champion",
        title: "Champion — Deal Control",
        tag: "Bus ride vs. Uber vs. driving yourself.",
        nodes: [
          {
            k: "sub",
            title: "Who controls the deal? (only three)",
            nodes: [
              {
                k: "list",
                items: [
                  "The customer — controls early; you need information from them.",
                  "The competition — if you were TOLD the criteria/process, they likely control it.",
                  "You — once discovery/scoping succeed, info flows from you to the champion and you take control (and don't relinquish it; spread wide and high).",
                ],
              },
            ],
          },
          {
            k: "q",
            title: "Qualify your champion",
            items: [
              "Were you told the criteria/process, or did you develop it?",
              "Did the champion help build the before/after, cost justification, criteria, process, and EB agenda?",
              "Where is your champion on the power chart? If influencer-with/without-authority, how do you know they have influence?",
              "Have you confirmed their influence with others?",
              "What is your champion's personal win?",
              "How have you educated, developed, and tested the champion — what did they do to prove it?",
              "Who does your champion say is the EB? Have they scheduled the EB meeting for you?",
            ],
          },
          {
            k: "note",
            label: "Use it",
            t: "Run a prep call with the manager + rep + champion before the EB meeting (like Jim supporting Kathleen at UPS).",
          },
        ],
      },
      {
        id: "med-eb",
        title: "Economic Buyer (Qualify)",
        tag: "Two question banks: before the meeting, and after.",
        nodes: [
          {
            k: "q",
            title: "Ask your champion BEFORE the EB meeting",
            items: [
              "Who does your champion say is the EB? Have you validated with multiple people?",
              "When is the EB meeting scheduled?",
              "What are you prepared to present?",
              "Has your champion briefed the EB beforehand?",
            ],
          },
          {
            k: "q",
            title: "Ask the rep AFTER they met the EB",
            items: [
              "Did you confirm discovery/scoping findings, the Three Whys, and before/after scenarios?",
              "What is the EB's desired business outcome? Which EB measure is most impacted? Why is it a priority?",
              "Did the EB agree all vendors test to the same criteria? Can we call the EB if someone changes them?",
              "Does the EB have authority for this size purchase?",
              "Did you review the preliminary cost justification? Will the EB allocate budget based on it?",
              "Can we meet the EB if test results materially differ? Did you agree on a follow-up EB meeting?",
              "In what timeframe does the EB want a solution, and why that timeframe?",
              "Did you confirm the remaining decision steps? What did the EB ask? What did your champion say after?",
            ],
          },
        ],
      },
      {
        id: "med-competition",
        title: "Competition",
        tag: "Be paranoid about movement and criteria changes.",
        nodes: [
          {
            k: "q",
            title: "Qualify the competition",
            items: [
              "Who is the competition? When did they enter — before us?",
              "Who is their champion and what influence do they have? Stronger than yours?",
              "Have you identified additional competitive champions? Who else are they speaking with? Have they met the EB?",
              "Was the criteria set when you entered? Did it change to include their differentiators — when?",
              "How is their champion differentiating and strategizing to win?",
              "Has the decision process changed since they entered?",
              "Have you armed your champion with FUD traps? Is your champion stronger than theirs?",
            ],
          },
        ],
      },
      {
        id: "med-paper",
        title: "Paper Process",
        tag: "The signature/approval path — you can't forecast without it.",
        nodes: [
          {
            k: "p",
            t: "The step-by-step path to a PO (e.g., PR → finance review (3d) → budgeting (4d) → legal (2wk) → procurement (2d)). If 4 weeks remain and the paper process is 6 weeks, you'll miss. A champion who can't map it may be a first-timer — find whoever made an equal/larger purchase.",
          },
          {
            k: "q",
            title: "Qualify the paper process",
            items: [
              "Does your champion know the approval process? Have they bought something larger than $X before?",
              "Walk me through each step, the stakeholders, and the timeframe for each.",
              "What is the legal contact's name? Have our documents been redlined by legal?",
              "Have you spoken to procurement?",
            ],
          },
          {
            k: "note",
            label: "Remember",
            t: "Process + MEDDICC is the science of the sale. The rep's style, curiosity, humor, and intuition are the art. Every sale is both.",
          },
        ],
      },
    ],
  },

  // ─────────────────── 12. RECRUITING & LEADERSHIP ───────────────────
  {
    id: "leadership",
    num: "12",
    title: "Recruiting, Coaching & Leadership",
    tag: "The manager track: hire A-players, coach one skill at a time, hold the line.",
    mastery: [
      "Explain bookings = people × productivity and the three productivity levers.",
      "List the top 5 character traits and why character is the difference maker.",
      "Diagnose a performance issue as competence (head) vs. commitment (heart).",
    ],
    lessons: [
      {
        id: "lead-productivity",
        title: "Bookings = People × Productivity",
        tag: "You control productivity; here are the three levers.",
        nodes: [
          {
            k: "list",
            ordered: true,
            items: [
              "Ramp time (~6 months) — beat it: recruit A-players, great onboarding, on-the-job coaching.",
              "Average sales productivity — raise it: ongoing training, match skills to accounts, keep a qualified pipeline, monitor deal advancement.",
              "Attrition (~20%) — lower it: recruit A-players, know each rep's strengths/weaknesses, coach them to grow and win, know when to manage vs. lead.",
            ],
          },
        ],
      },
      {
        id: "lead-recruit",
        title: "Recruiting A-Players",
        tag: "Your single biggest lever. A-leaders recruit A-reps.",
        nodes: [
          {
            k: "sub",
            title: "4 recruiting categories (build a position description)",
            nodes: [
              {
                k: "list",
                ordered: true,
                items: [
                  "Knowledge — the what-to-do for your specific process",
                  "Skills — the how-to-do-it",
                  "Characteristics — character traits",
                  "Execution experience — track record (partial evidence only)",
                ],
              },
            ],
          },
          {
            k: "sub",
            title: "Top 5 character traits",
            nodes: [
              {
                k: "list",
                ordered: true,
                items: [
                  "Intelligence — learns product/competition/process fast",
                  "PhD — Persistence, Heart, Desire",
                  "Coachability & adaptability",
                  "Integrity",
                  "Curiosity",
                ],
              },
              {
                k: "note",
                label: "Remember",
                t: "You can teach knowledge and skills; you can't change character. If their parents couldn't change it by age 20, you can't. Character is the difference maker.",
              },
            ],
          },
          {
            k: "sub",
            title: "Match skills to account complexity",
            nodes: [
              {
                k: "p",
                t: "Tom Brady is elite at QB and would fail at any other position. A single-threaded HR-software seller will fail on a multi-stakeholder, multi-department deal (the Puck disaster). Place reps where their skills fit the complexity.",
              },
            ],
          },
          {
            k: "sub",
            title: "Why a resume is only partial evidence (3)",
            nodes: [
              {
                k: "list",
                ordered: true,
                items: [
                  "It's not third-party certified — built by the candidate for the candidate",
                  "It shows a track record, not specific knowledge/skills (process, qualification, cost justification, cold calling…)",
                  "It never reveals core character (intelligence, drive, integrity, adaptability, curiosity)",
                ],
              },
            ],
          },
          {
            k: "sub",
            title: "When you lose a rep you hired — look in the mirror",
            nodes: [
              {
                k: "list",
                ordered: true,
                items: [
                  "Did you recruit the wrong person? What did you miss?",
                  "Couldn't you develop them (your own knowledge/skill gap)?",
                  "Can't you lead them (you don't know their strengths, motivations, goals)?",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "lead-coach",
        title: "Coach Like a Golf Coach",
        tag: "One skill at a time until it's in their DNA.",
        nodes: [
          {
            k: "p",
            t: "Give a beginner five swing changes at once and they quit. Give one (grip), reinforce it, praise progress, then add the next only after the first is consistent. Get out from behind the desk — make sales calls and observe; it's the only way to know their real skills and knowledge.",
          },
        ],
      },
      {
        id: "lead-standards",
        title: "Non-Negotiables & Accountability",
        tag: "Minimum operating standards — and actually enforcing them.",
        nodes: [
          {
            k: "sub",
            title: "Example non-negotiables",
            nodes: [
              {
                k: "list",
                items: [
                  "Show up on time; always be prepared",
                  "Respect teammates; give 100% effort",
                  "Update the forecast in CRM by Friday 5pm",
                  "Know cold: top competitor & differentiators, your differentiators, the buyer's top pains, 3 success stories with $ metrics, top 3 customer value drivers",
                  "Be able to deliver: corporate overview, 30-second elevator pitch, flawless whiteboard pitch, top-10 objections, top-10 discovery questions, top-10 scoping questions",
                ],
              },
            ],
          },
          {
            k: "note",
            label: "Trap",
            t: "Setting standards but never holding non-performers accountable penalizes your A-players every day. Reward overachievement and enforce accountability to build a meritocracy. And spend ~80% of your time on performers, not non-performers (the math favors it).",
          },
        ],
      },
      {
        id: "lead-perf",
        title: "Competence vs. Commitment",
        tag: "Diagnose before you coach: head vs. heart.",
        nodes: [
          {
            k: "q",
            title: "Competence issue — speak to the HEAD",
            items: [
              "At which specific step/stage are they failing, and why?",
              "What knowledge are they lacking — is there a class? Do they have the intelligence?",
              "Is it a skill gap? Can you / another manager / another rep coach it? Are you confident in that area?",
            ],
          },
          {
            k: "q",
            title: "Commitment issue — speak to the HEART",
            items: [
              "Why do they feel performance is low? If always committed, what changed?",
              "Anything change in their personal life? Are you motivating them? Do they need a new challenge?",
              "Are they adapting to the changing environment? Is someone/something demotivating them?",
              "Do they have the desire to learn, and are they coachable?",
            ],
          },
          {
            k: "note",
            label: "Remember",
            t: "Managers tell me to do things (speak to the head); leaders motivate me to do things (speak to the heart). Know when to manage and when to lead. Group integrity — 'one for all, all for one' — and emotional proprioception (awareness of your effect on others) round out the leader.",
          },
        ],
      },
    ],
  },

  // ─────────────────────── 13. FORECASTING ───────────────────────
  {
    id: "forecasting",
    num: "13",
    title: "Forecasting Strategy",
    tag: "Turn qualification into a forecast you can trust — quarter after quarter.",
    mastery: [
      "Explain why accuracy = intimacy and the point/line/trend idea.",
      "Contrast BANT and MEDDICC.",
      "Run the reconciliation math (4× the gap) and explain 'take me to your champion.'",
    ],
    lessons: [
      {
        id: "fc-accuracy",
        title: "Accuracy = Intimacy",
        tag: "Point, line, trend.",
        nodes: [
          {
            k: "p",
            t: "Consistent forecast accuracy is the gauge of how intimately you know your people and the deals. One accurate quarter is a point, two a line, three a trend — and trends are what let the business scale.",
          },
        ],
      },
      {
        id: "fc-bant",
        title: "BANT vs. MEDDICC",
        tag: "A moment vs. the whole journey.",
        nodes: [
          {
            k: "list",
            items: [
              "BANT (Budget, Authority, Need, Time) qualifies well at the EB level — a single moment.",
              "BANT doesn't mesh with the process, track deal advancement, or address champion / competition / criteria / process.",
              "MEDDICC links to the process like a GPS and qualifies from both the customer's and the rep's perspective.",
            ],
          },
        ],
      },
      {
        id: "fc-pushoff",
        title: "Push Deals Off the Forecast",
        tag: "The win-win move.",
        nodes: [
          {
            k: "p",
            t: "If a rep can't articulate a deal's exact status after you've exhausted qualification, push it off. It forces accurate information AND leaves a gap to reconcile. Win-win: if it was real, the rep re-finds it and your forecast grows; if it wasn't, the reconciliation deal covers it. The 'peas and carrots' lesson: don't let a rep believe they're done when they're not.",
          },
        ],
      },
      {
        id: "fc-reconcile",
        title: "Reconciliation Math",
        tag: "Cover the gap with 4× the pipeline, early.",
        nodes: [
          {
            k: "list",
            ordered: true,
            items: [
              "Quarterly quota: $300K",
              "Closed & committed: $200K",
              "Forecast shortfall (gap): $100K",
              "Reconciliation target = 4 × the gap = $400K (assuming ~25% close)",
            ],
          },
          {
            k: "note",
            label: "Use it",
            t: "It would have been far easier to build $1 of qualified pipeline early than to hunt $4 inside the quarter. Spread the burden across the team — don't shoulder the whole shortfall yourself.",
          },
        ],
      },
      {
        id: "fc-pipeline",
        title: "Pipeline Is Oxygen",
        tag: "A huge pipeline masks all problems.",
        nodes: [
          {
            k: "p",
            t: "Low forecasts trace to weak pipeline. Without it, reps clutch deals that won't close, invent deals, push customers to buy prematurely, and discount — a 'hot box' culture that steals from the future. 'The Ginger Prince' never missed a quarter because his qualified pipeline was so big it masked every other issue. Building pipeline is hard, weekly, disciplined work — 'discipline is doing what you hate to do, but doing it like you love it.'",
          },
        ],
      },
      {
        id: "fc-champion",
        title: "Take Me to Your Champion",
        tag: "Verify the forecast in the first month.",
        nodes: [
          {
            k: "p",
            t: "After the forecast session, meet the champion behind every committed deal in month one of the quarter. It's the surest way to verify your rep has a champion and is in control — and it leaves 11–12 weeks for new pipeline and reconciliation deals.",
          },
          {
            k: "note",
            label: "Recap (the closing playbook)",
            t: "Keep the basics → qualify with MEDDICC → push uncertain deals off → reconcile the gap (4×) → guard pipeline weekly → 'take me to your champion.' Simplicity is an enormous gift given to those who focus on the basics.",
          },
        ],
      },
    ],
  },
];
