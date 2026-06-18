"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  ArrowLeft,
  CalendarDays,
  Sparkles,
  ChevronRight,
  FileText,
} from "lucide-react";
import {
  MEETING_TYPES,
  addMeeting,
  patchMeeting,
  deleteMeeting,
  type Deal,
  type Meeting,
  type PrepDoc,
} from "@/lib/deals";
import { buildDealContext, buildMeetingContext } from "@/lib/deal-context";
import { DeckPanel } from "@/components/deal/deck";
import { SimPanel } from "@/components/deal/sim";

const inp =
  "w-full rounded-xl bg-mist px-3 py-2.5 text-sm text-ink placeholder-faint outline-none transition focus:bg-white focus:ring-2 focus:ring-teal/30";
const lbl = "mb-1 block text-[11px] font-semibold uppercase tracking-wide text-faint";

export function Meetings({ deal }: { deal: Deal }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const meetings = deal.meetings ?? [];
  const selected = meetings.find((m) => m.id === selectedId) ?? null;

  if (selected) {
    return (
      <MeetingDetail
        deal={deal}
        meeting={selected}
        onBack={() => setSelectedId(null)}
        onDelete={() => {
          deleteMeeting(deal.id, selected.id);
          setSelectedId(null);
        }}
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-ink">Meetings</h3>
          <p className="text-xs text-faint">
            Set up a meeting, then let the coach write your prep.
          </p>
        </div>
        <button
          onClick={() => setSelectedId(addMeeting(deal.id))}
          className="flex items-center gap-1.5 rounded-lg bg-mist px-3 py-1.5 text-sm font-semibold text-muted hover:text-ink"
        >
          <Plus size={14} /> New meeting
        </button>
      </div>

      {meetings.length === 0 ? (
        <div className="rounded-2.5xl border border-dashed border-line px-4 py-10 text-center text-sm text-faint">
          No meetings yet. Add the next call or on-site, capture who&apos;s in the
          room and your objective, and get a walk-in-ready prep.
        </div>
      ) : (
        <div className="space-y-2">
          {meetings.map((m) => {
            const count =
              m.attendeeIds.length + (m.attendeesNote.trim() ? 1 : 0);
            return (
              <button
                key={m.id}
                onClick={() => setSelectedId(m.id)}
                className="flex w-full items-center gap-3 rounded-2.5xl bg-surface p-4 text-left shadow-card transition-shadow hover:shadow-lift"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold-soft text-violet">
                  <CalendarDays size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-display text-[15px] font-bold text-ink">
                      {m.type}
                    </span>
                    {m.prep ? (
                      <span className="shrink-0 rounded-full bg-good-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-good-deep">
                        Prep ready
                      </span>
                    ) : null}
                  </div>
                  <p className="truncate text-xs text-muted">
                    {m.date ? `${m.date} · ` : ""}
                    {m.objective || "No objective set"}
                    {count ? ` · ${count} attendee${count === 1 ? "" : "s"}` : ""}
                  </p>
                </div>
                <ChevronRight size={16} className="shrink-0 text-faint" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function MeetingDetail({
  deal,
  meeting,
  onBack,
  onDelete,
}: {
  deal: Deal;
  meeting: Meeting;
  onBack: () => void;
  onDelete: () => void;
}) {
  const [generating, setGenerating] = useState(false);
  const [err, setErr] = useState(false);

  const set = (patch: Partial<Meeting>) =>
    patchMeeting(deal.id, meeting.id, patch);

  const toggleAttendee = (id: string) =>
    set({
      attendeeIds: meeting.attendeeIds.includes(id)
        ? meeting.attendeeIds.filter((x) => x !== id)
        : [...meeting.attendeeIds, id],
    });

  async function generatePrep() {
    setGenerating(true);
    setErr(false);
    try {
      const res = await fetch("/api/meeting-prep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          context: buildDealContext(deal),
          meeting: buildMeetingContext(deal, meeting),
        }),
      });
      if (!res.ok) throw new Error("bad");
      const prep = (await res.json()) as PrepDoc;
      if (!prep?.objective) throw new Error("empty");
      patchMeeting(deal.id, meeting.id, { prep, prepAt: Date.now() });
    } catch {
      setErr(true);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={16} /> Meetings
        </button>
        <button
          onClick={onDelete}
          title="Delete meeting"
          className="rounded-lg p-1.5 text-faint transition-colors hover:bg-danger-tint hover:text-danger"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Setup */}
      <div className="rounded-2.5xl bg-surface p-5 shadow-card">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className={lbl}>Meeting type</label>
            <select
              value={meeting.type}
              onChange={(e) => set({ type: e.target.value })}
              className={inp}
            >
              {MEETING_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={lbl}>Date</label>
            <input
              type="date"
              value={meeting.date}
              onChange={(e) => set({ date: e.target.value })}
              className={inp}
            />
          </div>
        </div>

        <div className="mt-3">
          <label className={lbl}>Your objective for this meeting</label>
          <textarea
            rows={2}
            value={meeting.objective}
            onChange={(e) => set({ objective: e.target.value })}
            placeholder="What do you need to walk out with?"
            className={inp}
          />
        </div>

        <div className="mt-3">
          <label className={lbl}>Who&apos;s in the room</label>
          {deal.stakeholders.length > 0 ? (
            <div className="mb-2 flex flex-wrap gap-1.5">
              {deal.stakeholders.map((s) => {
                const on = meeting.attendeeIds.includes(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleAttendee(s.id)}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                      on
                        ? "bg-teal/15 text-teal-dark ring-1 ring-teal/40"
                        : "bg-mist text-muted hover:text-ink"
                    }`}
                  >
                    {s.name || "Unnamed"}
                    {s.role ? (
                      <span className="font-normal opacity-70"> · {s.role}</span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="mb-2 text-xs text-faint">
              Tip: add people in the Stakeholders section to pick them here.
            </p>
          )}
          <input
            value={meeting.attendeesNote}
            onChange={(e) => set({ attendeesNote: e.target.value })}
            placeholder="Anyone else (name + role)…"
            className={inp}
          />
        </div>

        <div className="mt-3">
          <label className={lbl}>What&apos;s known / unknown going in</label>
          <textarea
            rows={2}
            value={meeting.context}
            onChange={(e) => set({ context: e.target.value })}
            placeholder="Context, open questions, anything you're unsure about…"
            className={inp}
          />
        </div>

        <button
          onClick={generatePrep}
          disabled={generating}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-teal py-3.5 font-semibold text-ink transition-transform duration-150 ease-out active:scale-[0.99] disabled:opacity-60"
        >
          {generating ? (
            <>
              <span className="flex gap-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink/60" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink/60 [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink/60 [animation-delay:300ms]" />
              </span>
              Writing your prep…
            </>
          ) : (
            <>
              <Sparkles size={16} /> {meeting.prep ? "Regenerate prep" : "Generate prep"}
            </>
          )}
        </button>
        {err ? (
          <p className="mt-2 text-center text-xs text-danger">
            Couldn&apos;t reach the coach. On the live site this works; locally it
            needs a fresh Vercel AI token.
          </p>
        ) : null}
      </div>

      {meeting.prep ? <PrepView prep={meeting.prep} /> : null}

      <DeckPanel deal={deal} meeting={meeting} />

      <SimPanel deal={deal} meeting={meeting} />
    </div>
  );
}

function PrepCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2.5xl bg-surface p-5 shadow-card">
      <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal-dark">
        {title}
      </h4>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}

function PrepView({ prep }: { prep: PrepDoc }) {
  return (
    <div className="mt-4 space-y-3">
      <div className="rounded-2.5xl bg-ink p-5">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-gold" />
          <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
            Meeting objective
          </h4>
        </div>
        <p className="mt-1.5 text-[15px] leading-relaxed text-white">
          {prep.objective}
        </p>
        <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
          Success looks like
        </p>
        <p className="mt-1 text-[15px] font-medium leading-relaxed text-white">
          {prep.successOutcome}
        </p>
      </div>

      <PrepCard title="Agenda & talking points">
        <ol className="space-y-1.5">
          {prep.agenda.map((a, i) => (
            <li key={i} className="flex gap-2.5 text-[15px] leading-relaxed text-ink/90">
              <span className="font-display text-sm font-bold text-teal-dark">
                {i + 1}
              </span>
              {a}
            </li>
          ))}
        </ol>
      </PrepCard>

      <PrepCard title="Proof points to bring">
        <ul className="space-y-1.5">
          {prep.proofPoints.map((p, i) => (
            <li key={i} className="flex gap-2 text-[15px] leading-relaxed text-ink/90">
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
              {p}
            </li>
          ))}
        </ul>
      </PrepCard>

      <PrepCard title="Gaps to close — and exactly what to ask">
        <div className="space-y-3">
          {prep.gaps.map((g, i) => (
            <div key={i}>
              <p className="text-sm font-bold text-ink">{g.gap}</p>
              <ul className="mt-1 space-y-1">
                {g.questions.map((q, j) => (
                  <li
                    key={j}
                    className="flex gap-2 text-[15px] leading-relaxed text-ink/90"
                  >
                    <span className="text-violet">→</span>
                    <span className="italic">“{q}”</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </PrepCard>

      <PrepCard title="Likely objections">
        <div className="space-y-3">
          {prep.objections.map((o, i) => (
            <div key={i}>
              <p className="text-sm font-bold text-ink">{o.objection}</p>
              <p className="mt-0.5 text-[15px] leading-relaxed text-muted">
                {o.response}
              </p>
            </div>
          ))}
        </div>
      </PrepCard>

      <PrepCard title="Lead with this value story">
        <div className="space-y-2">
          {(
            [
              ["Before", prep.valueFraming.before, "text-danger"],
              ["The ability to…", prep.valueFraming.capability, "text-violet"],
              ["After (with Cribl)", prep.valueFraming.after, "text-good-deep"],
            ] as const
          ).map(([label, body, tone]) => (
            <div key={label} className="rounded-xl bg-mist px-4 py-3">
              <p
                className={`text-[11px] font-bold uppercase tracking-wide ${tone}`}
              >
                {label}
              </p>
              <p className="mt-0.5 text-[15px] leading-relaxed text-ink/90">
                {body}
              </p>
            </div>
          ))}
        </div>
      </PrepCard>
    </div>
  );
}
