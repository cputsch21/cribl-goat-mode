import { KNOWLEDGE } from "@/lib/interview-brain";
import { getPersona, type Persona } from "@/lib/content/personas";
import {
  elevenKey,
  getAgentContext,
  mintSignedUrl,
  patchAgentPersona,
} from "@/lib/elevenlabs";

export const maxDuration = 30;

/** Readiness probe for the rehearsal UI (is the voice engine wired up?). */
export async function GET() {
  return Response.json({ ready: Boolean(elevenKey()) });
}

/** A different ElevenLabs voice per committee cluster, for variety. */
function pickVoice(cluster: string, voices: Record<string, string>) {
  const byCluster: Record<string, string | undefined> = {
    security: voices.cam,
    ops: voices.patrick,
    swing: voices.tim ?? voices.kat,
  };
  return byCluster[cluster] ?? voices.cam ?? voices.shootout ?? Object.values(voices)[0];
}

function buildPersonaBuyer(p: Persona) {
  // Only sourced lines reach the buyer's mouth — never the "[fill from notes]" gaps.
  const cares = (p.measuredOn ?? []).filter((x) => !x.gap).map((x) => x.text);
  const pains = (p.pains ?? []).filter((x) => !x.gap).map((x) => x.text);
  const pushback = (p.objections ?? []).filter((o) => !o.gap).map((o) => o.objection);

  return `You are role-playing a BUYER in a live sales meeting so a Cribl rep can rehearse out loud. Stay fully in character as the buyer at ALL times — never coach the rep, never break character, and never say or imply you are an AI, a model, or a simulation.

WHO YOU ARE: ${p.title} at a mid-size enterprise that is evaluating Cribl. Your seat on the buying committee: ${p.committeeRole}. ${p.disposition ?? "You're professionally skeptical — open to a strong case, but the rep has to earn every step."}

WHAT YOU ACTUALLY CARE ABOUT (your real priorities, revealed only as the rep earns them):
${cares.map((c) => `- ${c}`).join("\n") || "- (use your judgment for this role)"}

WHAT'S BROKEN FOR YOU TODAY:
${pains.map((c) => `- ${c}`).join("\n") || "- (use your judgment for this role)"}

HOW YOU BEHAVE:
- Talk like a real person on a real call: short turns, usually 1-3 sentences. Let the rep lead. Answer what you're asked; don't dump everything at once.
- Be realistic — not a pushover, not a cartoon villain. Make the rep earn it: ask pointed questions, push back where someone in your seat really would, and raise your concerns naturally when they fit.
- You CAN be genuinely moved by good selling — sharp discovery, a clear before/after, quantified value in your own numbers, real differentiation, and handling your objections well should soften you. Weak, generic, or pushy selling should not.
- Reveal your reality only as a real buyer would, when the rep earns it by asking. If asked something you wouldn't plausibly know, say so like a real buyer.
- When the rep wraps up, or you're satisfied (or out of patience), give a natural, in-character goodbye.

YOUR LIKELY PUSHBACK (use what fits, in your own words):
${pushback.map((c) => `- "${c}"`).join("\n") || "- do nothing / renew what we already have, build it ourselves, the cost and disruption of changing"}

TECHNICAL REALITY (so your pushback is credible — but you are the BUYER, you never pitch Cribl):
${KNOWLEDGE}`;
}

function firstMessage(p: Persona) {
  return `Thanks for making the time. I've got about half an hour — as ${p.title.toLowerCase()}, I'll be straight with you: I'm not sure we need to change anything right now. So what did you want to cover?`;
}

export async function POST(req: Request) {
  if (!elevenKey()) {
    return Response.json(
      {
        error:
          "Rehearsal isn't wired up yet — the voice engine key is missing on the server.",
      },
      { status: 503 }
    );
  }

  let body: { personaId?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }

  const persona = body.personaId ? getPersona(body.personaId) : undefined;
  if (!persona || !persona.ready) {
    return Response.json(
      { error: "That persona isn't ready to rehearse yet." },
      { status: 404 }
    );
  }

  try {
    // Reuses the Gauntlet's self-bootstrapped agent + voice cast.
    const { agentId, voices } = await getAgentContext();

    const prompt = buildPersonaBuyer(persona);
    const first = firstMessage(persona);
    const voiceId = pickVoice(persona.cluster, voices);

    // Belt and braces (single-user, sequential sessions): write the persona
    // onto the agent AND pass client-side overrides.
    await patchAgentPersona(agentId, prompt, first, voiceId).catch(() => {});
    const signedUrl = await mintSignedUrl(agentId);

    const overrides = {
      agent: { prompt: { prompt }, firstMessage: first, language: "en" },
      ...(voiceId ? { tts: { voiceId } } : {}),
    };

    return Response.json({
      signedUrl,
      overrides,
      maxSeconds: 12 * 60,
      meta: { persona: persona.name, title: persona.title },
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
