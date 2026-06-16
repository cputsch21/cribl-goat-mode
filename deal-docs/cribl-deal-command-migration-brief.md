# Cribl Deal Command — Claude Code Migration & Build Brief

**Goal:** Migrate the prototype `deal-command.jsx` into this existing app as a new **Deal** tab, then build it into a full sales-readiness engine: a deal you can *coach, prep, arm, and rehearse*, all grounded in **MEDDPICC** and **Force Management (Command of the Message)**.

**Reference implementation:** `deal-command.jsx` is in the repo (the working prototype). Use it as the source of truth for the data model, MEDDPICC element copy, the Value Framework fields, and the deterministic guidance rules. **Refactor it to this project's conventions — do not paste it in as-is.**

---

## 0. How to use this brief

- Build in the **phases** below, **in order**. Ship each phase working and committed before starting the next. Do not attempt all five at once.
- This is going into an existing, working app. **Be additive. Do not break the existing course / interview-prep features.**
- Match the existing project's conventions everywhere: routing, component structure, styling system, state management, Supabase access patterns, lint/format rules, commit style.

## 1. Before writing any code — discover & confirm

1. Explore the repo and report back to me:
   - Framework + build tool (Vite? Next? something else?)
   - How navigation / tabs / routes are defined (I want the new Deal tab to use the **existing** pattern, not a new one)
   - Backend + auth (confirm it's **Supabase**; identify the client setup and how the app currently reads/writes data and gets the current user)
   - Styling system (Tailwind config, design tokens, CSS vars, any component library) — the Deal tab must look native to this app
   - API route / serverless function convention (e.g. `/api/*` on Vercel) and how env vars are handled
2. Propose a short build plan **and the Supabase schema** for Phase 1. Wait for my OK before large/destructive changes.
3. Then proceed phase by phase.

## 2. Shared architecture (read once, applies to Phases 2–5)

Every AI feature here follows the **same pattern**, so build it once and reuse:

- A **serverless function** (match the app's convention, e.g. `/api/<name>`) receives the deal context + any user input, calls the **Anthropic Messages API**, and returns text or structured JSON.
- **SECURITY — non-negotiable:** the `ANTHROPIC_API_KEY` (and any voice vendor key) lives **only** in server-side env vars. It must **never** be imported, bundled, or referenced in client code. All model calls go through the serverless functions. No exceptions.
- **Models:** use the current **Sonnet** model for quality-sensitive generation (coach, meeting prep, pitch deck, debrief) and the current **Haiku** model for low-latency live simulation turns. As of now those are `claude-sonnet-4-6` and `claude-haiku-4-5` — **verify the exact current model strings at docs.claude.com before wiring them in**, since they rotate.
- **Context injection:** each function builds a context block from the deal's structured data (account, products, stage, ARR, close date, every MEDDPICC element's status + notes + fields, the full Value Framework, stakeholders, action plan) plus the relevant meeting/free-text input. The richer the deal, the better the output — this is the "more info = more accurate" mechanic.
- **Grounding rule for every prompt:** use the rep's actual deal details, never invent facts; if information is missing, say what to go find and why it matters, framed in the methodology.
- Add new env vars to `.env.example` and document them.

---

## PHASE 1 — Deal workspace as a new "Deal" tab (foundation)

**Port the prototype and make it persistent.**

- Add a top-level **Deal** tab/route using the app's existing nav pattern.
- Port the multi-deal workspace from `deal-command.jsx`: deal list + "New deal", deal header (account, opp name, products [Stream/Edge/Search/Lake], ARR, target close, stage, result), and the five sections: **Scorecard**, **MEDDPICC**, **Value Framework**, **Stakeholders**, **Action Plan**.
- **Data model** (faithful to the prototype):
  - Deal: `account`, `oppName`, `products[]`, `arr`, `closeDate`, `stage` (Discover/Validate/Business Case/Negotiate/Closed), `result`, `meddpicc` (8 elements, each `{status: Missing|Weak|Strong, notes, fields}`), `value` (9 Command-of-the-Message fields), `stakeholders[]`, `actions[]`, timestamps.
  - MEDDPICC keys: `metrics, eb, dcriteria, dprocess, paper, pain, champion, competition`. Value keys: `pbo, capabilities, before, after, metrics, differentiators, whyChange, whyNow, whyYou`. Pull the exact prompt/coaching copy and field options from the prototype.
- **Persistence — replace the prototype's `window.storage` with Supabase:**
  - Create a `deals` table scoped to the authenticated user (`user_id`), with **RLS** so users only ever see their own deals.
  - Store nested structures (`meddpicc`, `value`, `stakeholders`, `actions`) as **JSONB** columns for v1; scalar fields (account, stage, arr, close_date, result, products) as columns. (Normalize later only if the app's conventions demand it.)
  - Wire CRUD (create/list/update/delete) + **debounced autosave** on edit + optimistic UI, matching how the rest of the app talks to Supabase.
  - **Provide the SQL migration** using the app's existing migration tooling/convention.
- Keep the prototype's deterministic `guidance()` engine for the always-on Scorecard "next best actions."

**Hand back:** the schema, the new tab, and a working create→edit→reload→delete cycle persisting to Supabase.

---

## PHASE 2 — AI Sales Coach (per deal)

**Drop in deal info → Claude tells you how to sell it.**

- Function: `/api/coach`. Input: full deal context + optional free-text the rep adds + optional short conversation history (for follow-ups). Model: **Sonnet**.
- UI: a **Coach** panel inside an open deal. Auto-injects the deal context. A "Give me the play" button produces a full assessment; a chat box handles follow-up questions. Render markdown.
- **System prompt** (starter — refine as needed):

```
You are an elite enterprise sales coach embedded in a live deal workspace, coaching a Cribl rep. You run two methodologies rigorously and together.

MEDDPICC (qualification): Metrics, Economic Buyer, Decision Criteria, Decision Process, Paper Process, Identify Pain, Champion, Competition.

Force Management / Command of the Message (value): Positive Business Outcomes; Required Capabilities ("the ability to ___"); Before vs After scenarios; quantified Metrics; Differentiators (Why Us); and the Why Change / Why Now / Why Cribl narrative. The value framework FEEDS qualification — required capabilities become decision criteria, outcomes become metrics, pain plus a compelling event drives urgency.

Cribl context (observability/security data pipeline: Stream, Edge, Search, Lake). Typical pain: exploding SIEM/observability cost, license-renewal pressure, inability to onboard data, tool sprawl, retention/compliance. Typical competition: status quo / "do nothing", build-it-yourself (Kafka etc.), native SIEM tooling, other pipeline vendors.

You receive: (1) structured deal data, (2) optional raw notes from the rep.

Your job:
- Diagnose honestly. Name the single biggest risk and the weakest MEDDPICC elements.
- Prescribe specific, prioritized next actions — never generic — each tied to the methodology.
- Give the exact discovery questions to ask to close the biggest gaps.
- Coach the value story: the Before/After, the required capability to anchor on, how to position vs the competition, how to develop and TEST the champion, how to reach the economic buyer.
- State plainly what must be true to advance to the next stage.

Use the rep's actual details. Never invent facts about the deal; if something's missing, say what to find and why it matters. Tone: a sharp, experienced sales leader. Concise and actionable, no fluff.
```

**Hand back:** a working coach panel that gets sharper as more of the deal is filled in.

---

## PHASE 3 — Meeting Prep Generator (per deal)

**Add meeting info → get the script.**

- Add a **Meetings** section inside a deal. Create a meeting and capture: meeting type (discovery, technical validation, EB meeting, business-case review, negotiation…), attendees + their roles, stage, the rep's objective, and what's known/unknown.
- Function: `/api/meeting-prep` (Sonnet). Build the prep from the meeting context + the full deal.
- **Output (structured, rendered as a clean prep doc):**
  - Meeting objective(s) and the one outcome that defines success
  - Agenda / talking points
  - Relevant proof points + statistics (Cribl value, tied to this customer's pain)
  - The MEDDPICC gaps to close in this meeting + the exact discovery questions to ask
  - Likely objections + how to overcome each (Force Management framing)
  - The value framing to lead with (Before → required capability → After)
- Save the generated prep to the meeting record (Supabase).

**Hand back:** create a meeting, generate prep, see it saved and re-openable.

---

## PHASE 4 — Pitch Deck Builder (per meeting)

**Turn the value story into slides for this meeting.**

- Function: `/api/pitch-deck` (Sonnet). Returns **structured slide JSON**, e.g. `{ title, subtitle, slides: [{ heading, bullets[], speakerNotes, kind }] }`.
- The deck must follow the **Command of the Message arc**, built from this deal's Value Framework + meeting context: title → the customer's world & pain (Before) → Why Change / Why Now → the required capability → Cribl's differentiated approach (After) → proof & metrics → recommended next step / CTA. Tailor to the meeting type and audience.
- **Render in-app** as a lightweight slide view (React; reuse any existing UI primitives). Make slides lightly editable.
- **Export:** PDF (print-to-PDF is fine for v1). Add `.pptx` export via `pptxgenjs` (a client-side JS library — no new key, no server work) as a fast-follow if PDF lands cleanly.
- Save the deck JSON to the meeting record so it can be reopened and regenerated.

**Hand back:** generate a deck for a meeting, view it, export to PDF.

---

## PHASE 5 — Voice-to-Voice Meeting Simulation + Debrief (build LAST)

**Rehearse the meeting live, then get graded.** This phase has the most moving parts and a vendor decision — **do not start it until Phases 1–4 are stable, and confirm the vendor choice with me first.**

- **The brain:** Claude plays the buyer persona, built from the deal + meeting context (who they are, their pressures, their likely objections, personality). Function `/api/sim-turn`, model **Haiku** for low-latency turns.
- **Recommended audio stack (my opinion — confirm before building):**
  - **STT:** browser Web Speech API for v1 (free, zero infra); upgrade to Deepgram for accuracy later.
  - **TTS:** **ElevenLabs** for a natural, immersive voice (recommended — realism matters for practice); browser SpeechSynthesis as a free fallback. Requires `ELEVENLABS_API_KEY` server-side.
  - **Turn-taking:** turn-based push-to-talk to start, with a live transcript on screen.
  - **Alternative** (if we want fully realtime, interruptible conversation without building audio plumbing): a managed voice-agent platform (**Vapi / Retell / LiveKit Agents**) routing its LLM to our Claude endpoint or running our persona prompt. More natural; adds a vendor + per-minute cost. Flag the tradeoff and let me pick.
- **The debrief (this is the interview-prep DNA of the app):** after the sim, function `/api/sim-debrief` (Sonnet) grades the rep on MEDDPICC + Force Management execution — did they identify pain, uncover the economic buyer, differentiate, handle objections, and advance the deal? Specific, actionable feedback with what to do differently next time.
- Persist sim transcript + debrief to the meeting record.

**Hand back:** first propose the vendor choice + a thin end-to-end spike (one spoken turn, one Claude reply, one spoken response) before building the full loop.

---

## Acceptance checklist (every phase)

- [ ] No `ANTHROPIC_API_KEY` / vendor key anywhere in client-shipped code
- [ ] Existing course / interview-prep features still work, untouched
- [ ] New UI looks native to the app (existing styling system, not a clashing one)
- [ ] Data persists to Supabase with RLS scoping every user to their own data
- [ ] Lint/format/tests pass; commits follow the existing convention
- [ ] You explained, in plain English, what you built and any non-obvious technical choices
