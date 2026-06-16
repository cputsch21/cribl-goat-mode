# Cribl Deal Command — Migration Brief v2 (corrected for local-first)

**Read this first.** v1 of this brief assumed a Supabase backend with user accounts and RLS. The repo is **local-first** — "Progress: saved on-device, no sign-in." That assumption is wrong, so this v2 **supersedes v1's persistence, AI-call, and voice sections.** Everything else from v1 still stands: the phased order, the five features, the methodology content, the coach system prompt, and the per-deal data model in `deal-command.jsx`.

---

## 1. The correction that changes the plan: no backend assumptions

- **Data is on-device.** No Supabase, no accounts, no RLS, no SQL migrations. Delete all of that from your plan.
- **Persist deals using the app's existing on-device mechanism** — whatever the course-progress / tutor state already uses (IndexedDB, a localStorage wrapper, Dexie, etc.). **Find it and match it exactly.** Do not introduce a new storage layer.
- The per-deal data model is unchanged: account/opp header, MEDDPICC ×8 (status + notes + fields), Value Framework ×9, stakeholders, action plan, and a `meetings` collection per deal. Just store it locally instead of in Postgres.

## 2. MEDDPICC source — resolved (this is your open question)

Pick **option 1: port from the actual prototype.** `deal-command.jsx` is attached to this message — use it as the source of truth for MEDDPICC element copy, the Value Framework fields, the Missing/Weak/Strong scoring model, and the deterministic `guidance()` rules. Faithful port, refactored to this app's conventions. Don't reconstruct from prose if you have the file.

## 3. How the AI features call Claude with no backend

This is the real architecture question, and **the app already answers it** — it has a working AI tutor, which means a working Claude-call pattern already exists in this repo. **Locate how the tutor calls the model and reuse that exact pattern for every new AI feature (coach, meeting prep, pitch deck, sim debrief). Do not invent a second mechanism.**

For reference, the two legitimate patterns for a local-first app:

1. **Thin serverless proxy** — if the app is deployed on Vercel/Netlify and the tutor already routes through a function, the Anthropic key stays server-side and never reaches the client. **Preferred if it already exists.**
2. **Bring-your-own-key (BYO-key) on-device** — the user pastes their own Anthropic key, stored locally; the app calls `api.anthropic.com` directly from the browser using the header `anthropic-dangerous-direct-browser-access: true` (SDK: `dangerouslyAllowBrowser: true`). This is a documented, legitimate pattern for internal/personal tools and is consistent with a no-backend local-first app. The key is the user's own and lives only on their device.

**Hard rule, either pattern:** never embed *your* Anthropic key in client-shipped code — anyone can extract it and spend it. With BYO-key, the key is stored on-device and sent only to Anthropic, never to any server you run.

Context injection is the same as v1: each call builds a context block from the deal's structured fields + any free text, so the more the rep fills in, the sharper the output.

## 4. Voice simulation — use ElevenLabs Agents (you already have ElevenLabs)

v1 floated a vendor decision (ElevenLabs turn-based vs. a realtime platform like Vapi). **Resolved:** ElevenLabs Agents (formerly "Conversational AI") *is* the realtime platform, it handles STT + turn-taking + barge-in + TTS, and **it supports Claude (Anthropic) as the agent's model directly** — or a custom-LLM endpoint if you want full control. Since this app already uses ElevenLabs, this is the path: no new vendor, no audio plumbing to build.

Build it like this:
- Create an ElevenLabs Agent for the sim. Set its LLM to **Claude**, or point it at a custom-LLM endpoint (OpenAI-compatible) if routing through your own logic.
- The **buyer persona is the agent's system prompt**, generated from the deal + meeting context (who the buyer is, their pressures, likely objections, personality). Inject the deal context via the system prompt and/or the agent's knowledge base.
- Choose a voice; embed the agent with ElevenLabs' web SDK/widget. Follow ElevenLabs' current Agents + custom-LLM docs (they publish an `/llms.txt` index for agent docs — use it).
- **Reuse/extend the app's existing ElevenLabs integration** rather than standing up a parallel one.
- After the session, run the transcript through Claude (Sonnet) for the **methodology-graded debrief** (MEDDPICC + Force Management execution) — using the same Claude-call pattern from section 3.
- Still build this **last**, after Phases 1–4 are stable. Do a one-turn spike (speak → Claude reply → spoken response) before wiring the full loop.

## 5. What still stands from v1 — do not re-derive

- **Phased order:** (1) workspace + on-device persistence + Deal tab, (2) AI coach, (3) meeting prep generator, (4) pitch deck builder, (5) voice sim + debrief.
- The five feature specs and the **coach system prompt** verbatim.
- **Model split:** current Sonnet for quality-sensitive generation (coach, prep, deck, debrief), current Haiku for low-latency turns. Verify exact model strings at docs.claude.com before wiring.
- **Pitch deck:** Claude returns structured slide JSON → render in-app → export PDF, with `pptxgenjs` (client-side, no key) for `.pptx` as a fast-follow. The deck is built from the Value Framework, so it *is* the Command of the Message story as slides.
- Additive only; don't break the existing course/interview-prep features; match existing styling and conventions; explain non-obvious choices in plain English as you go.

## 6. Updated acceptance checklist

- [ ] No Supabase / accounts / RLS introduced — deals persist via the app's existing on-device storage
- [ ] No Anthropic or ElevenLabs key embedded in client-shipped code (existing proxy, or BYO-key stored on-device)
- [ ] All new AI features reuse the existing AI-tutor's Claude-call pattern
- [ ] Voice sim runs on ElevenLabs Agents with Claude as the model, reusing the existing ElevenLabs setup
- [ ] MEDDPICC copy, scoring, and guidance ported faithfully from `deal-command.jsx`
- [ ] Existing course / interview-prep features untouched and working

---

*Sources consulted for the two architecture calls: ElevenLabs Agents documentation (model selection including Anthropic; custom-LLM integration) and the Anthropic API docs plus the original write-up on `anthropic-dangerous-direct-browser-access`. Confirm current specifics in each vendor's live docs at build time.*
