import { CANON, KNOWLEDGE } from "@/lib/interview-brain";
import { REFERENCE } from "@/lib/content/reference";
import { MODULES_BY_ID, type CourseModule } from "@/lib/content";
import {
  elevenKey,
  getAgentContext,
  mintSignedUrl,
  patchAgentPersona,
} from "@/lib/elevenlabs";

export const maxDuration = 30;

/** Readiness probe for the voice UI (is the voice engine wired up?). */
export async function GET() {
  return Response.json({ ready: Boolean(elevenKey()) });
}

// Spoken sibling of the text PROFESSOR prompt. Same office-hours spirit — deep,
// curious, tangent-friendly, teaching not quizzing — but tuned for the ear:
// shorter sentences, conversational, one thought at a time so it sounds like a
// real person on a call rather than a read-aloud essay.
function buildProfessorVoice(m: CourseModule | undefined) {
  const focus = m
    ? `Right now Chris wants to dig into Module ${m.number}: "${m.title}" — ${m.tagline}.${
        m.audience ? ` (${m.audience}.)` : ""
      } The pieces of that lesson: ${m.cards.map((c) => c.title).join("; ")}. Anchor there, but follow any tangent he raises.`
    : `Chris hasn't picked a specific lesson — let him steer, and help him with anything in the course.`;

  return `You are the GOAT Professor — Chris's open-ended study companion inside GOAT Mode, the app prepping him for his Cribl Enterprise AE interviews. This is a live voice office-hours call: the place he comes to ask dumb questions, chase a tangent, and actually understand the material, not get grilled.

${focus}

HOW YOU SOUND AND TEACH:
- Talk like a real person on a call: warm, plain, conversational. Keep most turns to a few sentences and one idea at a time — let him react and ask follow-ups instead of monologuing. When something genuinely needs unpacking, take a bit longer, but never lecture in a wall of words.
- There are no dumb questions and no grade here. Teach, don't quiz — only drill him if he explicitly asks. Encourage curiosity; if a tangent would teach him something useful, offer to go there.
- Build understanding from the ground up: define jargon the first time, use concrete examples and before/after pictures, and always land why a real buyer or interviewer actually cares.
- Address him as Chris. Never break character, and never say or imply you are an AI, a model, or a simulation.

GUARDRAILS: Ground everything in the knowledge below — never invent Cribl facts, customers, or numbers. If something genuinely isn't covered, say so plainly and point him to who'd know (his SE, the recruiter). Treat anything flagged "VERIFY - may be dated" as approximate ("roughly that, last I saw — check the live number"). Quote the "STATE EXACTLY" compliance lines precisely.

${KNOWLEDGE}
${CANON}
${REFERENCE}`;
}

function firstMessage(m: CourseModule | undefined) {
  return `Hey Chris — office hours. What's on your mind${
    m ? ` about ${m.title}` : ""
  }? Dumb questions encouraged.`;
}

export async function POST(req: Request) {
  if (!elevenKey()) {
    return Response.json(
      {
        error:
          "Office hours voice isn't wired up yet — the voice engine key is missing on the server.",
      },
      { status: 503 }
    );
  }

  let body: { moduleId?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }

  const mod = body.moduleId ? MODULES_BY_ID.get(body.moduleId) : undefined;

  try {
    // Reuses the Gauntlet's self-bootstrapped agent + voice cast.
    const { agentId, voices } = await getAgentContext();

    const prompt = buildProfessorVoice(mod);
    const first = firstMessage(mod);
    // A teacherly voice, kept distinct from the buyer personas in the Dojo.
    const voiceId =
      voices.patrick ?? voices.cam ?? voices.shootout ?? Object.values(voices)[0];

    // Belt and braces (single-user, sequential sessions): write the persona
    // onto the shared agent AND pass client-side overrides. The overrides win
    // per-session, so a leftover Dojo buyer prompt can't leak into office hours.
    await patchAgentPersona(agentId, prompt, first, voiceId).catch(() => {});
    const signedUrl = await mintSignedUrl(agentId);

    const overrides = {
      agent: { prompt: { prompt }, firstMessage: first, language: "en" },
      ...(voiceId ? { tts: { voiceId } } : {}),
    };

    return Response.json({
      signedUrl,
      overrides,
      maxSeconds: 20 * 60,
      meta: { module: mod?.title ?? null },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "";
    return Response.json(
      {
        error: `Couldn't reach the voice engine${
          msg ? ` (${msg.slice(0, 120)})` : ""
        }. Try again in a moment.`,
      },
      { status: 502 }
    );
  }
}
