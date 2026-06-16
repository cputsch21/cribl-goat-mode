import { generateObject, jsonSchema } from "ai";
import { KNOWLEDGE } from "@/lib/interview-brain";
import { REFERENCE } from "@/lib/content/reference";

export const maxDuration = 60;

// Pitch-deck builder. generateObject → structured slide JSON, on Sonnet.
// Built from the deal's Value Framework + the meeting context, following the
// Command of the Message arc. Grounded in the vetted Cribl pack.
const deckSchema = jsonSchema<{
  title: string;
  subtitle: string;
  slides: {
    heading: string;
    bullets: string[];
    speakerNotes: string;
    kind: string;
  }[];
}>({
  type: "object",
  additionalProperties: false,
  required: ["title", "subtitle", "slides"],
  properties: {
    title: { type: "string", description: "The deck's title slide headline — about this customer, not about Cribl." },
    subtitle: { type: "string", description: "A one-line subtitle for the title slide." },
    slides: {
      type: "array",
      description:
        "6-9 slides that follow the Command of the Message arc, in order: the customer's world & pain (Before) → Why Change / Why Now → the required capability → Cribl's differentiated approach (After) → proof & metrics → recommended next step (CTA). Tailor to the meeting type and audience.",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["heading", "bullets", "speakerNotes", "kind"],
        properties: {
          heading: { type: "string", description: "The slide headline." },
          bullets: {
            type: "array",
            items: { type: "string" },
            description: "3-5 tight bullets. Customer-specific, never generic. No invented numbers.",
          },
          speakerNotes: {
            type: "string",
            description: "What the rep actually says on this slide — 2-3 sentences, in their voice.",
          },
          kind: {
            type: "string",
            enum: ["before", "whyChange", "capability", "after", "proof", "cta"],
            description: "Which beat of the arc this slide is.",
          },
        },
      },
    },
  },
});

const SYSTEM = `You are an elite enterprise sales deck builder for a Cribl rep (Chris), building a meeting pitch deck that follows Force Management's Command of the Message arc, fed by the deal's Value Framework.

The arc, in order: title → the customer's world & current pain (Before) → Why Change / Why Now (cost of inaction + the compelling event) → the required capability they need ("the ability to ___") → Cribl's differentiated approach and the After state → proof & metrics → the recommended next step (CTA). Tailor depth and tone to the meeting TYPE and audience (an Economic Buyer deck is outcome/cost focused; a technical validation deck goes deeper on capability).

Rules:
- Build from THIS deal's actual Value Framework and details. Never invent facts about the customer; prefer the customer's own numbers. Where the value framework is thin, write a strong slide from what's there rather than inventing specifics.
- Never invent Cribl facts, customers, numbers, or capabilities beyond the reference below. Anything flagged "VERIFY - may be dated" must be framed as approximate; compliance lines marked "STATE EXACTLY" must be quoted precisely.
- Lead with the customer's world and pain, not Cribl. The title slide is about them.
- Bullets are tight and specific (3-5 per slide). Speaker notes say what the rep actually says.

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
        process.env.DECK_MODEL ??
        process.env.PERSONA_MODEL ??
        "anthropic/claude-sonnet-4-6",
      schema: deckSchema,
      system: SYSTEM,
      prompt: `THE DEAL (use the Value Framework as the spine):\n${context ?? "(no deal data)"}\n\nTHE MEETING THIS DECK IS FOR:\n${meeting ?? "(no meeting data)"}`,
      maxOutputTokens: 2600,
    });

    return Response.json(object);
  } catch {
    return Response.json(
      { error: "Couldn't build the deck right now — try again in a moment." },
      { status: 500 }
    );
  }
}
