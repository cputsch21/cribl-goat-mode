import { generateObject, jsonSchema } from "ai";
import { CANON, KNOWLEDGE } from "@/lib/interview-brain";
import { INTERVIEWERS, type PersonId } from "@/lib/content/interviews";

export const maxDuration = 30;

const helperSchema = jsonSchema<{ perfect: string; beats: string[] }>({
  type: "object",
  additionalProperties: false,
  required: ["perfect", "beats"],
  properties: {
    perfect: {
      type: "string",
      description:
        "The perfect spoken answer, first person as Chris, under 110 words, no markdown",
    },
    beats: {
      type: "array",
      items: { type: "string" },
      description: "Exactly 3 short beat reminders (5-8 words each)",
    },
  },
});

const EMPHASIS: Record<PersonId, string> = {
  patrick:
    "Patrick rewards ownership, grit receipts (not adjectives), his own playbook language (10-10-10, builder not renter, the 4 layers), and zero interview theater.",
  kat: "Kat rewards partner-first instincts (deal reg sacred), channel mechanics fluency, the friendships-under-her-game-plan framing, and two-way generosity with partners.",
  cam: "Cam rewards the honest-gap reflex (never bluff, name the SE handoff), clean AE/SE division of labor, POV discipline, and pitch-altitude control.",
  tim: "Tim rewards peer authenticity, consistency with what Chris told Patrick, humility about the grind with a visible system, and zero arrogance.",
};

export async function POST(req: Request) {
  try {
    const { question, person } = (await req.json()) as {
      question: string;
      person: PersonId;
    };
    if (!question || !(person in INTERVIEWERS)) {
      return Response.json({ error: "Bad request." }, { status: 400 });
    }

    const { object } = await generateObject({
      model: process.env.PRACTICE_MODEL ?? "anthropic/claude-haiku-4-5",
      schema: helperSchema,
      system: `You write the PERFECT interview answer for Chris, a candidate for an Enterprise AE role at Cribl. The answer must be speakable out loud in under 45 seconds (≤110 words), first person, confident, specific, zero corporate fluff, no markdown.

Ground every claim in these facts and his established story — never invent:
${KNOWLEDGE}
${CANON}

AUDIENCE NOTE: ${EMPHASIS[person]}`,
      prompt: `The interviewer just asked Chris:\n"${question}"\n\nWrite the perfect answer and 3 beat reminders.`,
      maxOutputTokens: 400,
    });

    return Response.json(object);
  } catch {
    return Response.json(
      { error: "Helper unavailable right now." },
      { status: 500 }
    );
  }
}
