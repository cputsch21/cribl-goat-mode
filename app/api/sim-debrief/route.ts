import { generateObject, jsonSchema } from "ai";
import { KNOWLEDGE } from "@/lib/interview-brain";
import { REFERENCE } from "@/lib/content/reference";

export const maxDuration = 60;

// A rehearsal needs this much real conversation before it's worth grading.
const MIN_SECONDS = 30;

interface Line {
  role: "rep" | "buyer";
  text: string;
}

// Grades a practice meeting on MEDDPICC + Force Management EXECUTION. Same
// structured-output pattern as the Gauntlet judge and meeting-prep generator.
const debriefSchema = jsonSchema<{
  score: number;
  summary: string;
  advanced: boolean;
  advanceNote: string;
  meddpicc: { area: string; verdict: "Hit" | "Partial" | "Missed"; note: string }[];
  valueExecution: string[];
  strengths: string[];
  fixes: { issue: string; sayThis: string }[];
}>({
  type: "object",
  additionalProperties: false,
  required: [
    "score",
    "summary",
    "advanced",
    "advanceNote",
    "meddpicc",
    "valueExecution",
    "strengths",
    "fixes",
  ],
  properties: {
    score: {
      type: "number",
      description: "0-100 overall execution score per the calibration.",
    },
    summary: {
      type: "string",
      description: "Two-sentence verdict in plain, direct language.",
    },
    advanced: {
      type: "boolean",
      description: "Did the rep earn a concrete next step that actually advances the deal?",
    },
    advanceNote: {
      type: "string",
      description:
        "One line: the next step he earned, or the one he should have asked for and didn't.",
    },
    meddpicc: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["area", "verdict", "note"],
        properties: {
          area: {
            type: "string",
            description:
              "A MEDDPICC area that mattered in THIS meeting (e.g. Pain, Economic Buyer, Decision Process, Competition).",
          },
          verdict: { type: "string", enum: ["Hit", "Partial", "Missed"] },
          note: {
            type: "string",
            description: "One specific sentence citing what he did or didn't do, from the tape.",
          },
        },
      },
      description: "3-5 MEDDPICC areas relevant to this meeting, each graded with evidence.",
    },
    valueExecution: {
      type: "array",
      items: { type: "string" },
      description:
        "2-4 notes on Command of the Message execution: before/after, required capability, quantified value, differentiation, objection handling.",
    },
    strengths: {
      type: "array",
      items: { type: "string" },
      description: "2-3 things that genuinely landed, each citing a real moment.",
    },
    fixes: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["issue", "sayThis"],
        properties: {
          issue: { type: "string", description: "A specific problem, tied to a moment." },
          sayThis: {
            type: "string",
            description: "The exact stronger line he should have used, speakable and in his voice.",
          },
        },
      },
      description: "2-3 concrete fixes for next time.",
    },
  },
});

const SYSTEM = `You are an elite enterprise sales coach debriefing a Cribl rep (Chris) right after a LIVE practice meeting against an AI buyer. Grade rigorously on MEDDPICC and Force Management / Command of the Message EXECUTION.

You receive the deal, the meeting that was rehearsed, and the full call transcript (REP = Chris, BUYER = the AI customer).

Judge ONLY what's in the transcript. Did the rep, in this actual conversation:
- identify and sharpen the business pain and the compelling event;
- uncover or advance the economic buyer, decision criteria, and decision process;
- frame a clear Before → required capability → After with value in the customer's own numbers;
- differentiate Cribl versus the real alternatives (including "do nothing" and "build it");
- handle the buyer's objections; and
- earn a concrete next step that ADVANCES the deal?

Give credit only for what he actually said. Generic, vague, rambling, or pushy selling costs points. Be specific and cite real moments. The "sayThis" lines must be speakable, specific, and in his voice. Never invent Cribl facts beyond the reference; if he made an inaccurate Cribl claim, call it out in a fix.

CALIBRATION: 60 = pleasant but generic, didn't move it. 70 = some real discovery, gaps visible. 80 = solid — specific, advanced the deal. 90 = exceptional — sharp discovery, quantified value, clean differentiation, objections handled, a clear next step earned.

CRIBL REFERENCE (for checking the accuracy of any Cribl claim he made):
${KNOWLEDGE}
${REFERENCE}`;

export async function POST(req: Request) {
  try {
    const { context, meeting, transcript, seconds } = (await req.json()) as {
      context?: string;
      meeting?: string;
      transcript?: Line[];
      seconds?: number;
    };

    if (!Array.isArray(transcript)) {
      return Response.json({ error: "Bad request." }, { status: 400 });
    }
    const repTurns = transcript.filter((t) => t.role === "rep").length;
    const secs = seconds ?? 0;
    if (secs < MIN_SECONDS || repTurns < 2) {
      return Response.json({
        incomplete: true,
        reason: `That was too short to debrief — give the buyer a few real answers before wrapping up.`,
      });
    }

    const lines = transcript
      .map((t) => `${t.role === "rep" ? "REP" : "BUYER"}: ${t.text}`)
      .join("\n");

    const { object } = await generateObject({
      model:
        process.env.SIM_MODEL ??
        process.env.PERSONA_MODEL ??
        "anthropic/claude-sonnet-4-6",
      schema: debriefSchema,
      system: SYSTEM,
      prompt: `THE DEAL:\n${context ?? "(no deal data)"}\n\nTHE MEETING REHEARSED:\n${meeting ?? "(no meeting data)"}\n\nDURATION: ~${Math.round(secs / 60)} min, ${repTurns} turns from the rep.\n\nTRANSCRIPT:\n${lines}`,
      maxOutputTokens: 1600,
    });

    return Response.json(object);
  } catch {
    return Response.json(
      { error: "Couldn't review the rehearsal right now — try again in a moment." },
      { status: 500 }
    );
  }
}
