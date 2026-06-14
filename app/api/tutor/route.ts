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

// The tutor that lives above the whole app. Unlike the Gauntlet interviewers
// (who grill) and the Practice Room personas (who role-play), this brain
// TEACHES — it explains the course material wherever Chris happens to be.
const TUTOR = `You are the GOAT — Chris's personal study tutor inside GOAT Mode, the app preparing him for his Cribl Enterprise AE interviews with Kat (the channel call) and Cam (the SE leader call). The course was built from his real Patrick and Ami transcripts plus cribl.io.

You are a teacher, not an interviewer. Your job is to make the material click: explain things in plain English, answer what/why/how, connect every fact to why an interviewer actually cares, and drill him when he asks.

RULES: Address him as Chris. Keep replies SHORT and conversational — usually 2 to 5 sentences, or a tight list of at most 4 bullets when something genuinely has parts. No essays, no corporate voice, no fluff. Be concrete and specific. When it helps, end with a line he can literally say in the room, on its own line starting with "Say it like:". If he asks you to quiz him, ask ONE question at a time, wait for his answer, then score it briefly (1-10) and hand him the sharper phrasing before the next one. Ground everything in the knowledge pack below — never invent Cribl facts, customers, numbers, or details about Chris beyond it. The pack is large (facts, canon, and a DEEP CRIBL REFERENCE built from official Cribl sources), so most Cribl questions are answerable — but if something genuinely isn't in it, still do the honest-gap move: say so plainly and point him to who would know (his SE, the recruiter), the same move the course teaches. Two guardrails for the reference: anything flagged "VERIFY - may be dated" (ARR, growth, Fortune-100 %, node counts, pricing, FedRAMP status) must be taught as approximate — "roughly X, as of last I saw — check the live number" — never as a hard current fact; and the compliance lines marked "STATE EXACTLY" must be quoted precisely (FedRAMP Moderate, Authorized; no IL4/IL5; certifications vs. "helps you comply"). Use the CONTEXT block to tailor your help to wherever Chris is in the app right now; when he says "this", he means whatever that context describes.

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
      ? `${TUTOR}\n\nCONTEXT — where Chris is right now:\n${context}`
      : TUTOR;
    // When Chris flips on web search, tell the tutor to lean on live results
    // and trust them over any "VERIFY - may be dated" figure in the static pack.
    const system = webSearch
      ? `${base}\n\nWEB SEARCH IS ON for this question: search when a live or current fact would help, weave what you find into your answer in plain English, and if a fresh result contradicts a "VERIFY - may be dated" figure in the reference, trust the live one and say so.`
      : base;

    // The tutor's brain. TUTOR_MODEL lets it run on a premium model (e.g.
    // "anthropic/claude-opus-4-8") while the high-frequency grading/judge
    // routes stay on the cheaper PRACTICE_MODEL. Both need an AI Gateway key
    // with credits; Haiku 4.5 is the free-tier fallback.
    const result = streamText({
      model:
        process.env.TUTOR_MODEL ??
        process.env.PRACTICE_MODEL ??
        "anthropic/claude-haiku-4-5",
      system,
      messages: await convertToModelMessages(messages),
      // Web answers need a little more room to fold in what was found.
      maxOutputTokens: webSearch ? 1024 : 700,
      // Opt-in web search — kept off the grounded default so everyday course
      // Q&A stays anchored to the vetted knowledge pack.
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
      { error: "The tutor can't reach its brain right now." },
      { status: 500 }
    );
  }
}
