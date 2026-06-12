import {
  buildFirstMessage,
  buildSystemPrompt,
  INTERVIEWERS,
  LEVELS_BY_N,
  SHOOTOUT_FIRST,
  SHOOTOUT_SYSTEM,
  type PersonId,
} from "@/lib/content/interviews";
import {
  elevenKey,
  getAgentContext,
  mintSignedUrl,
  patchAgentPersona,
} from "@/lib/elevenlabs";

export const maxDuration = 30;

/** Readiness probe for the hub UI. */
export async function GET() {
  return Response.json({ ready: Boolean(elevenKey()) });
}

export async function POST(req: Request) {
  if (!elevenKey()) {
    return Response.json(
      {
        error:
          "The Gauntlet isn't wired up yet — the voice engine key is missing on the server.",
      },
      { status: 503 }
    );
  }

  let body: { person?: string; level?: number };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }

  const person = body.person ?? "";
  const isShootout = person === "shootout";
  const level = (Number(body.level) || 1) as 1 | 2 | 3 | 4 | 5;

  if (!isShootout && !(person in INTERVIEWERS)) {
    return Response.json({ error: "Unknown interviewer." }, { status: 400 });
  }
  if (!isShootout && !LEVELS_BY_N.has(level)) {
    return Response.json({ error: "Unknown level." }, { status: 400 });
  }

  try {
    // Self-bootstraps the agent + voice cast on first use.
    const { agentId, voices } = await getAgentContext();

    const prompt = isShootout
      ? SHOOTOUT_SYSTEM
      : buildSystemPrompt(person as PersonId, level);
    const firstMessage = isShootout
      ? SHOOTOUT_FIRST
      : buildFirstMessage(person as PersonId, level);
    const voiceId = voices[isShootout ? "shootout" : person];

    // Belt and braces for a single-user app: write the persona onto the
    // agent itself (sessions are sequential, so no race), then ALSO pass
    // client-side overrides — whichever mechanism the platform honors,
    // the persona holds.
    await patchAgentPersona(agentId, prompt, firstMessage, voiceId).catch(
      () => {}
    );

    const signedUrl = await mintSignedUrl(agentId);

    const overrides = {
      agent: {
        prompt: { prompt },
        firstMessage,
        language: "en",
      },
      ...(voiceId ? { tts: { voiceId } } : {}),
    };

    if (isShootout) {
      return Response.json({
        signedUrl,
        overrides,
        maxSeconds: 20 * 60,
        meta: { name: "Shootout", title: "Rapid-fire drill" },
      });
    }

    const p = INTERVIEWERS[person as PersonId];
    const l = LEVELS_BY_N.get(level)!;
    return Response.json({
      signedUrl,
      overrides,
      // Level target + grace so a natural wrap-up isn't cut off mid-goodbye.
      maxSeconds: l.minutes * 60 + 120,
      meta: {
        name: p.name,
        title: p.title,
        levelName: l.name,
        passBar: l.passBar,
        minutes: l.minutes,
      },
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
