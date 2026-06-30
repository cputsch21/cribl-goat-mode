import { streamText } from "ai";
import { QSL_KNOWLEDGE } from "@/lib/content/qsl-knowledge";

export const maxDuration = 60;

type Msg = { role: "user" | "assistant"; content: string };

// The brain behind the audio player's "discussion mode." The listener pauses
// the narration, holds the talk button, and asks a question; this answers it
// out loud, then they resume the course. Answers are SPOKEN, so they must be
// short and conversational. It teaches straight from the QSL playbook.
const SYSTEM = `You are the QSL Audio Companion — a warm, sharp study partner riding along inside an audio course of John McMahon's "The Qualified Sales Leader." The listener (Chris) is playing the course chapter by chapter; he paused the narration to ask you something, and right after you answer he'll resume listening.

HOW YOU TALK:
- Your reply is read ALOUD by a text-to-speech voice, so keep it short and conversational — usually 2 to 5 sentences. No headings, no bullet lists, no markdown, no emoji. Spell things out as you'd say them.
- Answer his actual question first and directly. If he asks you to go deeper, you can take a bit longer, but never lecture.
- You know where he is in the course (the WHERE block). Anchor your answer to that spot when it's relevant, and feel free to connect it to other parts of the playbook.
- Be plain-spoken and real. Address him as Chris. Don't say you're an AI or a model.
- Teach straight from the QSL playbook below — the frameworks, the question banks, the lessons. It's methodology, not company facts, so use it freely; just don't invent quotes, names, or numbers that aren't in it.

${QSL_KNOWLEDGE}`;

export async function POST(req: Request) {
  try {
    const { messages, place } = (await req.json()) as {
      messages: Msg[];
      place?: string;
    };

    const system = place
      ? `${SYSTEM}\n\nWHERE CHRIS IS PAUSED IN THE COURSE:\n${place}`
      : SYSTEM;

    const result = streamText({
      model:
        process.env.TUTOR_MODEL ??
        process.env.PRACTICE_MODEL ??
        "anthropic/claude-haiku-4-5",
      system,
      messages: (messages ?? []).filter(
        (m) => m && (m.role === "user" || m.role === "assistant") && m.content
      ),
      // Spoken answers stay tight.
      maxOutputTokens: 600,
    });

    return result.toTextStreamResponse();
  } catch {
    return new Response("The companion can't reach its brain right now.", {
      status: 500,
    });
  }
}
