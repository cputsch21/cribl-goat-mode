import { generateObject, jsonSchema } from "ai";
import { MODULES_BY_ID } from "@/lib/content";
import { KNOWLEDGE } from "@/lib/interview-brain";

export const maxDuration = 60;

const gradeSchema = jsonSchema<{
  score: number;
  verdict: "nailed" | "partial" | "missed";
  hit: string[];
  missed: string[];
  feedback: string;
}>({
  type: "object",
  additionalProperties: false,
  required: ["score", "verdict", "hit", "missed", "feedback"],
  properties: {
    score: {
      type: "number",
      description:
        "0-100. How fully the answer captured the key points, judged on substance not wording. 100 = every key point landed; ~50 = some captured, some missed; low = mostly missing or wrong.",
    },
    verdict: {
      type: "string",
      enum: ["nailed", "partial", "missed"],
      description:
        "nailed = captured the core of (almost) all key points; partial = got some but left real gaps; missed = mostly absent or off.",
    },
    hit: {
      type: "array",
      items: { type: "string" },
      description:
        "The key points the answer DID capture, each phrased to Chris as 'You ...' (e.g. 'You nailed the rip-and-replace point'). Empty array if none.",
    },
    missed: {
      type: "array",
      items: { type: "string" },
      description:
        "Key points the answer missed or got wrong — what to add next time. Empty array if nothing was missed.",
    },
    feedback: {
      type: "string",
      description:
        "One or two sentences of coaching, in plain, direct language to Chris ('you'). Encouraging but honest.",
    },
  },
});

export async function POST(req: Request) {
  try {
    const { moduleId, questionId, answer } = (await req.json()) as {
      moduleId?: string;
      questionId?: string;
      answer?: string;
    };

    const mod = moduleId ? MODULES_BY_ID.get(moduleId) : undefined;
    const question = mod?.writeIn.find((q) => q.id === questionId);

    if (!question || typeof answer !== "string") {
      return Response.json({ error: "Bad request." }, { status: 400 });
    }

    if (answer.trim().length < 4) {
      return Response.json({
        score: 0,
        verdict: "missed",
        hit: [],
        missed: question.keyPoints,
        feedback:
          "Give it a real shot — type the answer the way you'd actually say it in the room, then I'll score it.",
      });
    }

    const system = `You are a fair, sharp interview coach grading Chris's written answer to a Cribl interview-prep question. Chris is preparing for an Enterprise AE role at Cribl.

GRADE LIKE A FAIR COACH, NOT A PEDANT:
- Reward the CORE IDEA even when the wording is different from the key points. Synonyms, paraphrase, and his own phrasing all count.
- Give partial credit generously — a point that's mostly there counts as hit.
- Judge substance against the key points below. Do NOT require exact phrases or buzzwords.
- Penalize only real gaps: a key point genuinely absent, or a claim that contradicts the reference facts.
- Be encouraging but honest. Write everything TO Chris as "you".

THE QUESTION:
${question.prompt}

KEY POINTS A STRONG ANSWER HITS (this is the grading key):
${question.keyPoints.map((p, i) => `${i + 1}. ${p}`).join("\n")}

REFERENCE FACTS (only for catching a Cribl claim that's actually wrong — do not require these, and do not invent beyond them):
${KNOWLEDGE}

Score 0-100 on how fully the answer captured the key points. List what he hit and what he missed, and give one or two sentences of direct coaching.`;

    const { object } = await generateObject({
      model: process.env.PRACTICE_MODEL ?? "anthropic/claude-haiku-4-5",
      schema: gradeSchema,
      system,
      prompt: `CHRIS'S ANSWER:\n${answer.trim()}`,
      maxOutputTokens: 600,
    });

    return Response.json(object);
  } catch {
    return Response.json(
      { error: "The coach couldn't score that one — try again in a moment." },
      { status: 500 }
    );
  }
}
