// Server-side ElevenLabs helper. The API key lives only in Vercel env
// (stored as sensitive), so the app self-bootstraps on first use:
// find-or-create the "goat-gauntlet" agent and cast the stock voices,
// then cache for the life of the instance.

const API = "https://api.elevenlabs.io/v1";
const AGENT_NAME = "goat-gauntlet";

export function elevenKey(): string {
  return (
    process.env.ELEVEN_LABS_API_KEY ?? process.env.ELEVENLABS_API_KEY ?? ""
  );
}

async function api<T = Record<string, unknown>>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      "xi-api-key": elevenKey(),
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${init.method ?? "GET"} ${path} → ${res.status}: ${text.slice(0, 200)}`);
  }
  return (await res.json()) as T;
}

interface VoiceEntry {
  voice_id: string;
  name?: string;
  labels?: Record<string, string>;
}

// Stock-voice casting (no cloning real people): preferred premade names
// with label-based fallbacks.
const VOICE_PREFS: Record<string, string[]> = {
  patrick: ["Brian", "Eric", "Adam", "Mark"],
  kat: ["Matilda", "Sarah", "Laura", "Hope"],
  cam: ["Will", "Roger", "Chris", "George"],
  tim: ["Liam", "Callum", "Charlie", "Eric"],
  shootout: ["Jessica", "Laura", "Brian"],
};

function castVoices(voices: VoiceEntry[]): Record<string, string> {
  const byName = new Map(
    voices.map((v) => [v.name?.toLowerCase() ?? "", v.voice_id])
  );
  const cast: Record<string, string> = {};
  const used = new Set<string>();

  for (const [person, prefs] of Object.entries(VOICE_PREFS)) {
    let id = "";
    for (const n of prefs) {
      const candidate = byName.get(n.toLowerCase());
      if (candidate && !used.has(candidate)) {
        id = candidate;
        break;
      }
    }
    if (!id) {
      const wantFemale = person === "kat";
      const fallback = voices.find((v) => {
        const g = v.labels?.gender ?? "";
        return (
          !used.has(v.voice_id) &&
          (wantFemale ? /female/i.test(g) : /^male/i.test(g) || !/female/i.test(g))
        );
      });
      id = fallback?.voice_id ?? voices[0]?.voice_id ?? "";
    }
    if (id) {
      cast[person] = id;
      used.add(id);
    }
  }
  return cast;
}

function agentConfig(defaultVoiceId: string) {
  return {
    name: AGENT_NAME,
    conversation_config: {
      agent: {
        prompt: {
          prompt:
            "You are a friendly, professional mock interviewer warming up. The app configures your real persona per session — if it hasn't, run a short, realistic screening interview for an enterprise sales role and keep turns under three sentences.",
          llm: "claude-sonnet-4-5",
        },
        first_message: "Hey Chris — ready when you are.",
        language: "en",
      },
      ...(defaultVoiceId ? { tts: { voice_id: defaultVoiceId } } : {}),
      conversation: { max_duration_seconds: 1500 },
    },
    platform_settings: {
      overrides: {
        conversation_config_override: {
          agent: { prompt: { prompt: true }, first_message: true, language: true },
          tts: { voice_id: true },
        },
      },
    },
  };
}

let cached: { agentId: string; voices: Record<string, string> } | null = null;

export async function getAgentContext(): Promise<{
  agentId: string;
  voices: Record<string, string>;
}> {
  if (cached) return cached;
  if (!elevenKey()) throw new Error("missing-key");

  let agentId =
    process.env.ELEVENLABS_AGENT_ID ?? process.env.ELEVEN_LABS_AGENT_ID ?? "";
  let voices: Record<string, string> = {};
  try {
    voices = JSON.parse(
      process.env.ELEVENLABS_VOICES ?? process.env.ELEVEN_LABS_VOICES ?? "{}"
    );
  } catch {
    voices = {};
  }

  if (Object.keys(voices).length === 0) {
    const data = await api<{ voices: VoiceEntry[] }>("/voices");
    voices = castVoices(data.voices ?? []);
  }

  if (!agentId) {
    try {
      const list = await api<{ agents?: { agent_id: string; name: string }[] }>(
        "/convai/agents?page_size=30"
      );
      agentId = list.agents?.find((a) => a.name === AGENT_NAME)?.agent_id ?? "";
    } catch {
      // listing failed — fall through to create
    }
    if (!agentId) {
      const created = await api<{ agent_id: string }>("/convai/agents/create", {
        method: "POST",
        body: JSON.stringify(agentConfig(voices.shootout ?? "")),
      });
      agentId = created.agent_id;
    }
  }

  cached = { agentId, voices };
  return cached;
}

/** Write the persona onto the agent (single-user app — sessions are sequential). */
export async function patchAgentPersona(
  agentId: string,
  prompt: string,
  firstMessage: string,
  voiceId?: string
) {
  await api(`/convai/agents/${agentId}`, {
    method: "PATCH",
    body: JSON.stringify({
      conversation_config: {
        agent: {
          prompt: { prompt, llm: "claude-sonnet-4-5" },
          first_message: firstMessage,
          language: "en",
        },
        ...(voiceId ? { tts: { voice_id: voiceId } } : {}),
      },
    }),
  });
}

export async function mintSignedUrl(agentId: string): Promise<string> {
  const data = await api<{ signed_url: string }>(
    `/convai/conversation/get-signed-url?agent_id=${encodeURIComponent(agentId)}`
  );
  return data.signed_url;
}
