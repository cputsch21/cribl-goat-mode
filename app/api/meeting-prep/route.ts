import { generateObject, jsonSchema } from "ai";
import { KNOWLEDGE } from "@/lib/interview-brain";
import { REFERENCE } from "@/lib/content/reference";

export const maxDuration = 60;

// Meeting-prep generator. Same structured-output pattern as the Gauntlet judge
// (generateObject + jsonSchema), on Sonnet. Builds a walk-in-ready prep doc
// from the full deal + the specific meeting, grounded in the vetted Cribl pack.
const prepSchema = jsonSchema<{
  objective: string;
  successOutcome: string;
  agenda: string[];
  proofPoints: string[];
  gaps: { gap: string; questions: string[] }[];
  objections: { objection: string; response: string }[];
  valueFraming: { before: string; capability: string; after: string };
}>({
  type: "object",
  additionalProperties: false,
  required: [
    "objective",
    "successOutcome",
    "agenda",
    "proofPoints",
    "gaps",
    "objections",
    "valueFraming",
  ],
  properties: {
    objective: {
      type: "string",
      description: "The meeting's objective(s), one or two sentences.",
    },
    successOutcome: {
      type: "string",
      description: "The single outcome that would make this meeting a success.",
    },
    agenda: {
      type: "array",
      items: { type: "string" },
      description:
        "3-6 agenda items / talking points in the order to run them, fitted to the meeting TYPE.",
    },
    proofPoints: {
      type: "array",
      items: { type: "string" },
      description:
        "2-4 Cribl proof points or stats, each tied to THIS customer's specific pain. Prefer the customer's own numbers; never invent figures.",
    },
    gaps: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["gap", "questions"],
        properties: {
          gap: {
            type: "string",
            description: "A MEDDPICC gap to close in this meeting.",
          },
          questions: {
            type: "array",
            items: { type: "string" },
            description: "1-3 exact, askable discovery questions to close it, in the rep's voice.",
          },
        },
      },
      description: "The MEDDPICC gaps to close in this meeting, each with its discovery questions.",
    },
    objections: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["objection", "response"],
        properties: {
          objection: { type: "string", description: "A likely objection in this meeting." },
          response: {
            type: "string",
            description: "How to overcome it, in Command of the Message framing.",
          },
        },
      },
      description: "2-4 likely objections and how to overcome each.",
    },
    valueFraming: {
      type: "object",
      additionalProperties: false,
      required: ["before", "capability", "after"],
      properties: {
        before: { type: "string", description: "The customer's painful Before state." },
        capability: {
          type: "string",
          description: "The required capability to anchor on, framed as 'the ability to ___'.",
        },
        after: { type: "string", description: "The After state with Cribl." },
      },
      description: "The Before → required capability → After story to lead with.",
    },
  },
});

const SYSTEM = `You are an elite enterprise sales coach generating meeting prep for a Cribl rep (Chris), grounded rigorously in MEDDPICC and Force Management / Command of the Message.

You receive the full deal and the specific meeting to prepare for. Produce a tight, specific prep the rep can walk in with — never generic. Tie everything to THIS deal's actual details and THIS meeting's type, attendees, and objective.

Rules:
- Use the rep's real deal details. Never invent facts about the deal or the customer; where something's missing, prep around the gap (turn it into a discovery question) rather than inventing.
- Never invent Cribl facts, customers, numbers, or capabilities beyond the reference below. Anything flagged "VERIFY - may be dated" must be framed as approximate; any compliance line marked "STATE EXACTLY" must be quoted precisely. Prefer the customer's own numbers over Cribl marketing stats.
- The agenda, questions, and objections must fit the meeting TYPE — a discovery call is not an EB meeting is not a negotiation.
- Discovery questions must be exact and askable, in the rep's voice.
- Objection handling uses Command of the Message framing: reframe to the required capability and the business outcome.

CRIBL REFERENCE (ground every Cribl claim in this):
${KNOWLEDGE}
${REFERENCE}`;

export async function POST(req: Request) {
  try {
    const { context, meeting } = (await req.json()) as {
      context?: string;
      meeting?: string;
    };

    const { object } = await generateObject({
      model:
        process.env.PREP_MODEL ??
        process.env.PERSONA_MODEL ??
        "anthropic/claude-sonnet-4-6",
      schema: prepSchema,
      system: SYSTEM,
      prompt: `THE DEAL:\n${context ?? "(no deal data)"}\n\nTHE MEETING TO PREP FOR:\n${meeting ?? "(no meeting data)"}`,
      maxOutputTokens: 2000,
    });

    return Response.json(object);
  } catch {
    return Response.json(
      { error: "Couldn't generate the prep right now — try again in a moment." },
      { status: 500 }
    );
  }
}
