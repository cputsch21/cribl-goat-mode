// One-time GOAT Mode Gauntlet setup:
//   ELEVEN_LABS_API_KEY=... node scripts/elevenlabs-setup.mjs
// - casts 4 stock voices (no cloning real people)
// - creates (or reuses) the "goat-gauntlet" agent with sensible defaults
// - prints the env vars to set
const API = "https://api.elevenlabs.io/v1";
const KEY = process.env.ELEVEN_LABS_API_KEY ?? process.env.ELEVENLABS_API_KEY;
if (!KEY) {
  console.error("Set ELEVEN_LABS_API_KEY first.");
  process.exit(1);
}

const H = { "xi-api-key": KEY, "Content-Type": "application/json" };

async function api(path, init = {}) {
  const res = await fetch(`${API}${path}`, { ...init, headers: { ...H, ...(init.headers ?? {}) } });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = text; }
  if (!res.ok) throw new Error(`${init.method ?? "GET"} ${path} → ${res.status}: ${text.slice(0, 300)}`);
  return json;
}

// ── 1. Cast voices ───────────────────────────────────────────────────
const { voices } = await api("/voices");
const byName = new Map(voices.map((v) => [v.name?.toLowerCase(), v.voice_id]));

function pick(prefs, labelFilter) {
  for (const n of prefs) {
    const id = byName.get(n.toLowerCase());
    if (id) return { id, name: n };
  }
  const fallback = voices.find(labelFilter);
  return fallback
    ? { id: fallback.voice_id, name: fallback.name }
    : { id: voices[0]?.voice_id, name: voices[0]?.name };
}

const cast = {
  // Patrick: confident, casual mid-career American male with some warmth.
  patrick: pick(["Brian", "Eric", "Adam", "Mark"], (v) => /male/i.test(v.labels?.gender ?? "") && /middle/i.test(v.labels?.age ?? "")),
  // Kat: warm, professional American female.
  kat: pick(["Matilda", "Sarah", "Laura", "Hope"], (v) => /female/i.test(v.labels?.gender ?? "")),
  // Cam: calm, thoughtful male — the engineer-adjacent voice.
  cam: pick(["Will", "Roger", "Chris", "George"], (v) => /male/i.test(v.labels?.gender ?? "")),
  // Tim: younger, energetic male peer.
  tim: pick(["Liam", "Callum", "Charlie", "Eric"], (v) => /male/i.test(v.labels?.gender ?? "") && /young/i.test(v.labels?.age ?? "")),
  // Shootout drill machine: punchy, upbeat.
  shootout: pick(["Jessica", "Laura", "Brian"], () => true),
};

// Avoid double-casting the same voice for different people where possible.
const used = new Set();
for (const k of Object.keys(cast)) {
  if (used.has(cast[k].id)) {
    const alt = voices.find((v) => !used.has(v.voice_id));
    if (alt) cast[k] = { id: alt.voice_id, name: alt.name };
  }
  used.add(cast[k].id);
}

console.log("Voice cast:");
for (const [k, v] of Object.entries(cast)) console.log(`  ${k.padEnd(9)} → ${v.name} (${v.id})`);

// ── 2. Create or reuse the agent ─────────────────────────────────────
const AGENT_NAME = "goat-gauntlet";
let agentId = process.env.ELEVENLABS_AGENT_ID ?? "";

if (!agentId) {
  try {
    const list = await api("/convai/agents?page_size=30");
    const existing = (list.agents ?? []).find((a) => a.name === AGENT_NAME);
    if (existing) agentId = existing.agent_id;
  } catch {
    // list endpoint shape changed — fall through to create
  }
}

const agentConfig = {
  name: AGENT_NAME,
  conversation_config: {
    agent: {
      prompt: {
        prompt:
          "You are a friendly, professional mock interviewer warming up. The app will configure your real persona per session — if it hasn't, run a short, generic but realistic screening interview for an enterprise sales role and keep turns under three sentences.",
        llm: "claude-sonnet-4-5",
      },
      first_message: "Hey Chris — ready when you are.",
      language: "en",
    },
    tts: { voice_id: cast.shootout.id },
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

if (!agentId) {
  const created = await api("/convai/agents/create", {
    method: "POST",
    body: JSON.stringify(agentConfig),
  });
  agentId = created.agent_id;
  console.log(`\nAgent created: ${agentId}`);
} else {
  await api(`/convai/agents/${agentId}`, {
    method: "PATCH",
    body: JSON.stringify({
      conversation_config: agentConfig.conversation_config,
      platform_settings: agentConfig.platform_settings,
    }),
  });
  console.log(`\nAgent reused + updated: ${agentId}`);
}

// ── 3. Verify overrides stuck ────────────────────────────────────────
try {
  const agent = await api(`/convai/agents/${agentId}`);
  const ov = agent?.platform_settings?.overrides?.conversation_config_override;
  console.log("Override security:", JSON.stringify(ov ?? "not visible — PATCH-per-session fallback covers it"));
} catch {
  console.log("Could not read agent back; PATCH-per-session fallback covers personas regardless.");
}

// ── 4. Print env vars ────────────────────────────────────────────────
const voicesJson = JSON.stringify(
  Object.fromEntries(Object.entries(cast).map(([k, v]) => [k, v.id]))
);
console.log(`\nSet these (local .env.local AND Vercel):`);
console.log(`ELEVENLABS_AGENT_ID=${agentId}`);
console.log(`ELEVENLABS_VOICES=${voicesJson}`);
