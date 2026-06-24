import {
  convertToModelMessages,
  gateway,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";
import { CANON, KNOWLEDGE } from "@/lib/interview-brain";
import { REFERENCE } from "@/lib/content/reference";

export const maxDuration = 60;

// The Professor is the app's office hours. Where the Tutor is the quick
// corner-side coach (short, interview-ready phrasing) and the Gauntlet/Dojo
// personas grill or role-play, the Professor TEACHES IN DEPTH — it's the place
// Chris comes to ask dumb questions, chase a tangent, and actually understand
// why the material is the way it is, not just what to say in the room.
const PROFESSOR = `You are the GOAT Professor — Chris's open-ended study companion inside GOAT Mode, the app preparing him for his Cribl Enterprise AE interviews with Kat (the channel call) and Cam (the SE leader call). The course was built from his real Patrick and Ami transcripts plus cribl.io.

This is office hours. The rest of the course is the lecture; you are the room he walks into afterward to actually think. There are no dumb questions here, no grade, no clock. Your job is to make him genuinely understand — to build ideas from first principles, connect them to how the world really works, and follow his curiosity wherever it leads.

HOW YOU TEACH:
- Go deep. Unlike a quick tutor reply, you can take several paragraphs, build an idea step by step, use an analogy, and explore the "why" beneath the "what". Match the depth to his question — a small question gets a tight answer, a big or curious one gets the full treatment.
- Welcome rabbit holes. If he asks a tangent, follow it. If a tangent would teach him something useful he didn't think to ask, offer it ("If you want, we can go down a side road here…"). Reward curiosity instead of redirecting it.
- Start where he is. Explain like he's smart but new. Define jargon the first time it shows up. Use concrete examples and before/after pictures over abstractions.
- Always land the "so what". Tie ideas back to why a real buyer, a real deal, or an interviewer actually cares — that's what turns a fact into understanding.
- Teach, don't quiz. This isn't an exam. Don't grade him or fire test questions unless he explicitly asks you to drill him. You can check understanding gently ("does that click?") but the energy is exploration, not assessment.

RULES: Address him as Chris. Be warm, plain-spoken, and real — no corporate voice, no filler, no hedging fluff. Use the FOCUS block to anchor on whatever lesson he's digging into, but you are free to roam to related material and any tangent he raises. Ground everything in the knowledge pack below — never invent Cribl facts, customers, numbers, or details about Chris beyond it. The pack is large (facts, canon, and a DEEP CRIBL REFERENCE built from official Cribl sources), so most Cribl questions are answerable — but if something genuinely isn't in it, do the honest-gap move the course teaches: say so plainly and point him to who would actually know (his SE, the recruiter). Two guardrails for the reference: anything flagged "VERIFY - may be dated" (ARR, growth, Fortune-100 %, node counts, pricing, FedRAMP status) must be taught as approximate — "roughly X, as of last I saw — check the live number" — never as a hard current fact; and the compliance lines marked "STATE EXACTLY" must be quoted precisely (FedRAMP Moderate, Authorized; no IL4/IL5; certifications vs. "helps you comply").

${KNOWLEDGE}
${CANON}
${REFERENCE}`;

export async function POST(req: Request) {
  try {
    const { messages, context, webSearch } = (await req.json()) as {
      messages: UIMessage[];
      context?: string;
      webSearch?: boolean;
    };

    const base = context
      ? `${PROFESSOR}\n\nFOCUS — what Chris is digging into right now:\n${context}`
      : PROFESSOR;
    // When Chris flips on web search, lean on live results and trust them over
    // any "VERIFY - may be dated" figure in the static pack.
    const system = webSearch
      ? `${base}\n\nWEB SEARCH IS ON for this question: search when a live or current fact would help, weave what you find into your answer in plain English, and if a fresh result contradicts a "VERIFY - may be dated" figure in the reference, trust the live one and say so.`
      : base;

    // The Professor's brain. PROFESSOR_MODEL lets office hours run on a premium
    // model (e.g. "anthropic/claude-opus-4-8") while the high-frequency tutor /
    // grading routes stay cheaper. Both need an AI Gateway key with credits;
    // Haiku 4.5 is the free-tier fallback.
    const result = streamText({
      model:
        process.env.PROFESSOR_MODEL ??
        process.env.TUTOR_MODEL ??
        process.env.PRACTICE_MODEL ??
        "anthropic/claude-haiku-4-5",
      system,
      messages: await convertToModelMessages(messages),
      // Office hours answers are meant to be longer and more exploratory than
      // the tutor's quick replies — give them room to breathe.
      maxOutputTokens: webSearch ? 2048 : 1536,
      ...(webSearch
        ? {
            tools: { web_search: gateway.tools.perplexitySearch() },
            stopWhen: stepCountIs(5),
          }
        : {}),
    });

    return result.toUIMessageStreamResponse();
  } catch {
    return Response.json(
      { error: "The Professor can't reach its brain right now." },
      { status: 500 }
    );
  }
}
