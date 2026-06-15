import { generateObject, jsonSchema } from "ai";
import { CANON, KNOWLEDGE } from "@/lib/interview-brain";
import {
  INTERVIEWERS,
  LEVELS_BY_N,
  type PersonId,
} from "@/lib/content/interviews";

export const maxDuration = 60;

// Match the call screen: a round is judgeable once it's run this long.
const MIN_SECONDS = 30;

interface TranscriptLine {
  role: "user" | "interviewer";
  text: string;
}

const verdictSchema = jsonSchema<{
  score: number;
  summary: string;
  strengths: string[];
  fixes: { issue: string; sayThis: string }[];
  moments: string[];
  tripwiresHit: string[];
}>({
  type: "object",
  additionalProperties: false,
  required: ["score", "summary", "strengths", "fixes", "moments", "tripwiresHit"],
  properties: {
    score: {
      type: "number",
      description: "0-100 overall interview score per the rubric and calibration",
    },
    summary: {
      type: "string",
      description: "Two-sentence verdict in plain, direct language",
    },
    strengths: {
      type: "array",
      items: { type: "string" },
      description: "Exactly 3 specific strengths, each citing what Chris actually said",
    },
    fixes: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["issue", "sayThis"],
        properties: {
          issue: { type: "string", description: "The specific problem, tied to a moment" },
          sayThis: {
            type: "string",
            description: "The exact stronger line Chris should have said, in his voice",
          },
        },
      },
      description: "Exactly 3 fixes",
    },
    moments: {
      type: "array",
      items: { type: "string" },
      description:
        "2-3 key moments quoted or closely paraphrased from the transcript, each with a one-clause comment",
    },
    tripwiresHit: {
      type: "array",
      items: { type: "string" },
      description:
        "Tripwires from the list that Chris ACTUALLY hit, quoted with evidence. Empty array if none. Be strict about evidence — do not invent hits.",
    },
  },
});

export async function POST(req: Request) {
  try {
    const { person, level, transcript, seconds } = (await req.json()) as {
      person: PersonId;
      level: 1 | 2 | 3 | 4 | 5;
      transcript: TranscriptLine[];
      seconds?: number;
    };

    const p = INTERVIEWERS[person];
    const l = LEVELS_BY_N.get(level);
    if (!p || !l || !Array.isArray(transcript)) {
      return Response.json({ error: "Bad request." }, { status: 400 });
    }

    const userTurns = transcript.filter((t) => t.role === "user").length;
    const secs = seconds ?? 0;
    if (secs < MIN_SECONDS) {
      return Response.json({
        incomplete: true,
        reason: `That was too short to judge — the call ran ${secs} second${
          secs === 1 ? "" : "s"
        }, and a round needs at least ${MIN_SECONDS}. Run it back and go a little longer.`,
      });
    }

    const tripwiresArmed = level >= 3;
    const system = `You are the judge for a mock job interview. Chris is interviewing for an Enterprise AE role at Cribl. The interviewer persona was ${p.name} (${p.title}), difficulty level ${level} (${l.name}), pass bar ${l.passBar}/100.

WHAT ${p.name.toUpperCase()} IS EVALUATING: ${p.evaluating}

THE RUBRIC:
${p.rubric}

TRIPWIRES ${tripwiresArmed ? "(ARMED at this level — report any Chris actually hit, with quoted evidence)" : "(NOT armed at this level — report hits for awareness, they will not auto-fail him)"}:
${p.tripwires.map((t) => `- ${t}`).join("\n")}

CALIBRATION: 60 = pleasant but generic, would not advance. 70 = decent, some specifics, gaps visible. 80 = solid — specific, honest, consistent. 90 = exceptional — specific receipts, zero bluffing, persona-appropriate instincts, asked sharp questions. 95+ = flawless round. Judge ONLY what's in the transcript; do not give credit for things he didn't say. Short non-answers, rambling, and generic interview-speak cost points. Grade the SUBSTANCE against the rubric and the FORM (concise, confident, conversational).

CONSISTENCY CHECK — Chris's canon (his established story; contradictions are serious, and for Tim they are a tripwire):
${CANON}

REFERENCE FACTS (for checking accuracy of any Cribl claims Chris made):
${KNOWLEDGE}

Write feedback TO Chris ("you"), in plain, direct, coach-like language. The sayThis lines must be speakable, specific, and in his established voice.`;

    const lines = transcript
      .map((t) => `${t.role === "user" ? "CHRIS" : p.name.toUpperCase()}: ${t.text}`)
      .join("\n");

    const { object } = await generateObject({
      model: process.env.PRACTICE_MODEL ?? "anthropic/claude-haiku-4-5",
      schema: verdictSchema,
      system,
      prompt: `Interview duration: ~${Math.round((seconds ?? 0) / 60)} minutes, ${userTurns} answers from Chris.\n\nTRANSCRIPT:\n${lines}`,
      maxOutputTokens: 1200,
    });

    const tripped = tripwiresArmed && object.tripwiresHit.length > 0;
    const passed = !tripped && object.score >= l.passBar;

    return Response.json({
      ...object,
      passed,
      passBar: l.passBar,
      tripped,
    });
  } catch {
    return Response.json(
      { error: "The judge couldn't review the tape — try again in a moment." },
      { status: 500 }
    );
  }
}
