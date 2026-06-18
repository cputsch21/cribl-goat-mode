import { KNOWLEDGE } from "@/lib/interview-brain";
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

interface Buyer {
  name?: string;
  title?: string;
  role?: string;
  sentiment?: string;
}

function dispositionLine(sentiment?: string) {
  if (sentiment === "Positive")
    return "You're warm to Cribl and quietly an internal advocate — but you still do your diligence and won't rubber-stamp anything.";
  if (sentiment === "Negative")
    return "You're skeptical and lean toward the status quo or the cheaper / build-it-yourself alternative. The rep has to genuinely change your mind.";
  return "You're professionally skeptical — open to a strong case, but the rep has to earn every step.";
}

function buildPersona(opts: {
  account: string;
  meetingType: string;
  buyer: Buyer | null;
  context: string;
  meeting: string;
}) {
  const { account, meetingType, buyer, context, meeting } = opts;
  const who = buyer?.name
    ? `${buyer.name}${buyer.title ? `, ${buyer.title}` : ""}`
    : `a senior stakeholder in a ${meetingType.toLowerCase()}`;
  const role = buyer?.role ? ` Your role in this decision: ${buyer.role}.` : "";

  return `You are role-playing a BUYER in a live sales meeting so a Cribl rep can rehearse out loud. Stay fully in character as the buyer at ALL times — never coach the rep, never break character, and never say or imply you are an AI, a model, or a simulation.

WHO YOU ARE: ${who} at ${account || "the customer"}.${role} ${dispositionLine(buyer?.sentiment)}

THE MEETING: a ${meetingType}.

HOW YOU BEHAVE:
- Talk like a real person on a real call: short turns, usually 1–3 sentences. Let the rep lead. Answer what you're asked; don't dump everything at once.
- Be realistic — not a pushover, not a cartoon villain. Make the rep earn it: ask pointed questions, push back where someone in your seat really would, and raise your objections naturally when they fit.
- You CAN be genuinely moved by good selling — sharp discovery, a clear before/after, quantified value in your own numbers, real differentiation, and handling your objections well should soften you. Weak, generic, or pushy selling should not.
- The deal context below is YOUR company's reality — embody it as the customer. Don't recite it; reveal it only as a real buyer would, when the rep earns it by asking. If asked something you wouldn't plausibly know, say so like a real buyer.
- When the rep wraps up, or you're satisfied (or out of patience), give a natural, in-character goodbye.

YOUR LIKELY PUSHBACK (use what fits, in your own words): "we could just do nothing / renew what we already have", "we could build this ourselves", the cost, risk, and disruption of changing, and whatever competition and concerns appear in the deal context.

YOUR WORLD — the deal as it really is (you live this; the rep is trying to understand it):
${context}

THIS MEETING:
${meeting}

TECHNICAL REALITY (so your pushback is credible — but you are the BUYER, you never pitch Cribl):
${KNOWLEDGE}`;
}

function firstMessage(buyer: Buyer | null) {
  if (buyer?.sentiment === "Negative")
    return "Thanks for making the time — though I'll be honest, I'm not sure we need to change anything right now. What did you want to cover?";
  if (buyer?.sentiment === "Positive")
    return "Good to see you — I've been looking forward to this. I've got a hard stop in a bit, so where do you want to start?";
  return "Thanks for making the time. I've got about half an hour — so what did you want to get out of today?";
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

  let body: {
    context?: string;
    meeting?: string;
    buyer?: Buyer | null;
    account?: string;
    meetingType?: string;
  };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }

  try {
    // Reuses the Gauntlet's self-bootstrapped agent + voice cast.
    const { agentId, voices } = await getAgentContext();

    const prompt = buildPersona({
      account: body.account ?? "",
      meetingType: body.meetingType ?? "meeting",
      buyer: body.buyer ?? null,
      context: body.context ?? "(no deal data)",
      meeting: body.meeting ?? "(no meeting data)",
    });
    const first = firstMessage(body.buyer ?? null);
    const voiceId = voices.cam ?? voices.shootout ?? Object.values(voices)[0];

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
      meta: {
        buyer: body.buyer?.name || "the buyer",
        title: body.buyer?.title || "",
        role: body.buyer?.role || "",
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
