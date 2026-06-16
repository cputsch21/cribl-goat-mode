"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Trash2,
  Plus,
  Check,
  Gauge,
  Target,
  Layers,
  Users,
  ListChecks,
  AlertTriangle,
  Sparkles,
  CalendarDays,
} from "lucide-react";
import { Coach } from "@/components/deal/coach";
import { Meetings } from "@/components/deal/meetings";
import {
  useDeal,
  useHydrated,
  patchDeal,
  deleteDeal,
  healthScore,
  guidance,
  uid,
  MEDDPICC,
  VALUE_FIELDS,
  STAGES,
  PRODUCTS,
  STATUSES,
  ROLES,
  SENTIMENTS,
  type Deal,
  type Status,
} from "@/lib/deals";

/* ── shared field styling: fill, not bordered boxes ── */
const inp =
  "w-full rounded-xl bg-mist px-3 py-2.5 text-sm text-ink placeholder-faint outline-none transition focus:bg-white focus:ring-2 focus:ring-teal/30";
const lbl = "mb-1 block text-[11px] font-semibold uppercase tracking-wide text-faint";

function statusBtn(s: Status, active: boolean) {
  if (!active) return "bg-mist text-faint hover:text-muted";
  if (s === "Strong") return "bg-good text-white";
  if (s === "Weak") return "bg-warn text-white";
  return "bg-danger text-white";
}
function chip(s: Status) {
  if (s === "Strong") return "bg-good-soft text-good-deep";
  if (s === "Weak") return "bg-warn-soft text-warn-deep";
  return "bg-danger-tint text-danger";
}
function priClass(p: 1 | 2 | 3) {
  return p === 1
    ? "bg-danger-tint text-danger"
    : p === 2
    ? "bg-warn-soft text-warn-deep"
    : "bg-mist text-muted";
}
function priLabel(p: 1 | 2 | 3) {
  return p === 1 ? "Now" : p === 2 ? "Next" : "Later";
}
function healthFill(h: number) {
  return h >= 67 ? "bg-good" : h >= 34 ? "bg-warn" : "bg-danger";
}

type SectionId =
  | "scorecard"
  | "meddpicc"
  | "value"
  | "stakeholders"
  | "actions"
  | "meetings"
  | "coach";
const SECTIONS: { id: SectionId; label: string; icon: typeof Gauge }[] = [
  { id: "scorecard", label: "Scorecard", icon: Gauge },
  { id: "meddpicc", label: "MEDDPICC", icon: Target },
  { id: "value", label: "Value Framework", icon: Layers },
  { id: "stakeholders", label: "Stakeholders", icon: Users },
  { id: "actions", label: "Action Plan", icon: ListChecks },
  { id: "meetings", label: "Meetings", icon: CalendarDays },
  { id: "coach", label: "Coach", icon: Sparkles },
];

export default function DealPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const deal = useDeal(id);
  const hydrated = useHydrated();
  const [section, setSection] = useState<SectionId>("scorecard");
  const [saved, setSaved] = useState(false);
  const firstUpdate = useRef(true);

  // Flash "Saved" briefly after each edit settles (writes are instant).
  useEffect(() => {
    if (!deal) return;
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setSaved(true);
    const t = setTimeout(() => setSaved(false), 1400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deal?.updatedAt]);

  if (!hydrated) return null;

  if (!deal) {
    return (
      <main className="mx-auto w-full max-w-xl py-16 text-center">
        <p className="font-display text-xl font-bold text-ink">Deal not found</p>
        <p className="mt-2 text-sm text-muted">
          It may have been deleted on this device.
        </p>
        <Link
          href="/deal"
          className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-mist px-4 py-2.5 text-sm font-semibold text-muted hover:text-ink"
        >
          <ArrowLeft size={16} /> Back to deals
        </Link>
      </main>
    );
  }

  /* ── mutators (current value comes from the live store snapshot) ── */
  const setMedd = (key: string, sub: Partial<Deal["meddpicc"][string]>) =>
    patchDeal(id, {
      meddpicc: {
        ...deal.meddpicc,
        [key]: { ...deal.meddpicc[key], ...sub },
      },
    });
  const setMeddField = (key: string, fk: string, val: string) =>
    setMedd(key, { fields: { ...deal.meddpicc[key].fields, [fk]: val } });
  const setValue = (key: string, val: string) =>
    patchDeal(id, { value: { ...deal.value, [key]: val } });
  const toggleProduct = (p: Deal["products"][number]) =>
    patchDeal(id, {
      products: deal.products.includes(p)
        ? deal.products.filter((x) => x !== p)
        : [...deal.products, p],
    });
  const addStakeholder = () =>
    patchDeal(id, {
      stakeholders: [
        ...deal.stakeholders,
        { id: uid("s_"), name: "", title: "", role: "Influencer", sentiment: "Neutral" },
      ],
    });
  const setStakeholder = (sid: string, patch: Partial<Deal["stakeholders"][number]>) =>
    patchDeal(id, {
      stakeholders: deal.stakeholders.map((s) =>
        s.id === sid ? { ...s, ...patch } : s
      ),
    });
  const delStakeholder = (sid: string) =>
    patchDeal(id, {
      stakeholders: deal.stakeholders.filter((s) => s.id !== sid),
    });
  const addAction = () =>
    patchDeal(id, {
      actions: [
        ...deal.actions,
        { id: uid("a_"), text: "", owner: "", due: "", done: false },
      ],
    });
  const setAction = (aid: string, patch: Partial<Deal["actions"][number]>) =>
    patchDeal(id, {
      actions: deal.actions.map((a) => (a.id === aid ? { ...a, ...patch } : a)),
    });
  const delAction = (aid: string) =>
    patchDeal(id, { actions: deal.actions.filter((a) => a.id !== aid) });

  function handleDelete() {
    deleteDeal(id);
    router.push("/deal");
  }

  return (
    <main className="mx-auto w-full max-w-xl lg:max-w-3xl">
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/deal"
          className="flex w-fit items-center gap-1.5 text-sm font-medium text-muted transition-colors duration-150 hover:text-ink"
        >
          <ArrowLeft size={16} /> Deals
        </Link>
        <div className="flex items-center gap-3">
          <span
            className={`text-xs font-medium transition-opacity duration-150 ${
              saved ? "text-good-deep opacity-100" : "opacity-0"
            }`}
          >
            Saved ✓
          </span>
          <button
            onClick={handleDelete}
            title="Delete deal"
            className="rounded-lg p-1.5 text-faint transition-colors hover:bg-danger-tint hover:text-danger"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Header */}
      <header>
        <input
          value={deal.account}
          onChange={(e) => patchDeal(id, { account: e.target.value })}
          placeholder="Account name"
          className="w-full bg-transparent font-display text-2xl font-bold tracking-tight text-ink placeholder-faint/60 outline-none"
        />
        <input
          value={deal.oppName}
          onChange={(e) => patchDeal(id, { oppName: e.target.value })}
          placeholder="Opportunity name"
          className="mt-0.5 w-full bg-transparent text-sm text-muted placeholder-faint/60 outline-none"
        />

        <div className="mt-4 flex flex-wrap items-end gap-3">
          <div>
            <label className={lbl}>Stage</label>
            <select
              value={deal.stage}
              onChange={(e) => patchDeal(id, { stage: e.target.value as Deal["stage"] })}
              className={inp + " w-40"}
            >
              {STAGES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          {deal.stage === "Closed" ? (
            <div>
              <label className={lbl}>Result</label>
              <select
                value={deal.result}
                onChange={(e) => patchDeal(id, { result: e.target.value })}
                className={inp + " w-28"}
              >
                <option value="">—</option>
                <option>Won</option>
                <option>Lost</option>
              </select>
            </div>
          ) : null}
          <div>
            <label className={lbl}>ARR / deal size</label>
            <input
              value={deal.arr}
              onChange={(e) => patchDeal(id, { arr: e.target.value })}
              placeholder="$"
              className={inp + " w-32"}
            />
          </div>
          <div>
            <label className={lbl}>Target close</label>
            <input
              type="date"
              value={deal.closeDate}
              onChange={(e) => patchDeal(id, { closeDate: e.target.value })}
              className={inp + " w-40"}
            />
          </div>
          <div>
            <label className={lbl}>Products</label>
            <div className="flex gap-1.5">
              {PRODUCTS.map((p) => {
                const on = deal.products.includes(p);
                return (
                  <button
                    key={p}
                    onClick={() => toggleProduct(p)}
                    className={`rounded-lg px-2.5 py-2 text-xs font-semibold transition-colors ${
                      on
                        ? "bg-teal/15 text-teal-dark ring-1 ring-teal/40"
                        : "bg-mist text-muted hover:text-ink"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section pills */}
        <nav className="no-scrollbar -mx-4 mt-5 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {SECTIONS.map((t) => {
            const Icon = t.icon;
            const on = section === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSection(t.id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                  on ? "bg-ink text-white" : "bg-mist text-muted hover:text-ink"
                }`}
              >
                <Icon size={15} /> {t.label}
              </button>
            );
          })}
        </nav>
      </header>

      {/* Body */}
      <div className="mt-5">
        {section === "scorecard" && <Scorecard deal={deal} goTo={setSection} />}
        {section === "meddpicc" && (
          <Meddpicc deal={deal} setMedd={setMedd} setMeddField={setMeddField} />
        )}
        {section === "value" && <ValueFramework deal={deal} setValue={setValue} />}
        {section === "stakeholders" && (
          <Stakeholders
            deal={deal}
            add={addStakeholder}
            set={setStakeholder}
            del={delStakeholder}
          />
        )}
        {section === "actions" && (
          <ActionPlan deal={deal} add={addAction} set={setAction} del={delAction} />
        )}
        {/* Coach + Meetings stay mounted so an open chat or an in-progress
            prep generation survives switching sections. */}
        <div className={section === "meetings" ? "" : "hidden"}>
          <Meetings deal={deal} />
        </div>
        <div className={section === "coach" ? "" : "hidden"}>
          <Coach deal={deal} />
        </div>
      </div>
    </main>
  );
}

/* ----------------------------- panels ----------------------------- */

function Scorecard({ deal, goTo }: { deal: Deal; goTo: (s: SectionId) => void }) {
  const h = healthScore(deal);
  const ht = h >= 67 ? "Healthy" : h >= 34 ? "At risk" : "Weak";
  const moves = guidance(deal);
  const vFilled = VALUE_FIELDS.filter((x) => deal.value[x.key]).length;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* Health */}
      <div className="rounded-2.5xl bg-surface p-5 shadow-card lg:col-span-1">
        <div className="flex items-baseline justify-between">
          <h3 className="text-sm font-bold text-ink">MEDDPICC health</h3>
          <span className="text-xs font-semibold text-muted">{ht}</span>
        </div>
        <div className="mt-3 flex items-end gap-1.5">
          <span className="font-display text-4xl font-bold tracking-tight text-ink">
            {h}
          </span>
          <span className="pb-1.5 text-sm text-faint">/ 100</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-mist">
          <div className={`h-full ${healthFill(h)}`} style={{ width: h + "%" }} />
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {MEDDPICC.map((el) => {
            const s = deal.meddpicc[el.key]?.status ?? "Missing";
            return (
              <button
                key={el.key}
                onClick={() => goTo("meddpicc")}
                title={`${el.name}: ${s}`}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${chip(s)}`}
              >
                {el.letter}
              </button>
            );
          })}
        </div>

        <div className="mt-5 border-t border-line pt-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-ink">Value Framework</h4>
            <span className="text-xs text-faint">
              {vFilled}/{VALUE_FIELDS.length} complete
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-mist">
            <div
              className="h-full bg-violet"
              style={{ width: (vFilled / VALUE_FIELDS.length) * 100 + "%" }}
            />
          </div>
          <button
            onClick={() => goTo("value")}
            className="mt-2 text-xs font-semibold text-violet hover:text-violet-dark"
          >
            Build the value story →
          </button>
        </div>
      </div>

      {/* Next best actions */}
      <div className="rounded-2.5xl bg-surface p-5 shadow-card lg:col-span-2">
        <div className="flex items-center gap-2">
          <AlertTriangle size={16} className="text-warn" />
          <h3 className="text-sm font-bold text-ink">Next best actions</h3>
        </div>
        <p className="mt-1 text-xs text-faint">
          Generated from this deal&apos;s gaps and current stage.
        </p>
        <div className="mt-3 space-y-2">
          {moves.length === 0 ? (
            <div className="flex items-center gap-2 rounded-xl bg-good-soft px-3 py-3 text-sm text-good-deep">
              <Check size={16} /> Solid coverage. Keep your champion and action plan
              current.
            </div>
          ) : (
            moves.map((m, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl bg-mist px-3 py-2.5"
              >
                <span
                  className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${priClass(m.p)}`}
                >
                  {priLabel(m.p)}
                </span>
                <span className="text-sm text-ink/90">{m.t}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function Meddpicc({
  deal,
  setMedd,
  setMeddField,
}: {
  deal: Deal;
  setMedd: (key: string, sub: Partial<Deal["meddpicc"][string]>) => void;
  setMeddField: (key: string, fk: string, val: string) => void;
}) {
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {MEDDPICC.map((el) => {
        const state = deal.meddpicc[el.key];
        return (
          <div key={el.key} className="rounded-2.5xl bg-surface p-4 shadow-card">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-sm font-bold text-white">
                  {el.letter}
                </span>
                <span className="text-sm font-bold text-ink">{el.name}</span>
              </div>
              <div className="flex gap-1">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setMedd(el.key, { status: s })}
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${statusBtn(
                      s,
                      state.status === s
                    )}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted">{el.prompt}</p>

            {el.fields.length > 0 ? (
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {el.fields.map((f) => (
                  <div key={f.key}>
                    <label className={lbl}>{f.label}</label>
                    {f.type === "select" ? (
                      <select
                        value={state.fields[f.key] || ""}
                        onChange={(e) => setMeddField(el.key, f.key, e.target.value)}
                        className={inp}
                      >
                        <option value="">—</option>
                        {f.options?.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        value={state.fields[f.key] || ""}
                        onChange={(e) => setMeddField(el.key, f.key, e.target.value)}
                        className={inp}
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-3">
              <label className={lbl}>Notes</label>
              <textarea
                rows={2}
                value={state.notes}
                onChange={(e) => setMedd(el.key, { notes: e.target.value })}
                placeholder="What you know, what you've confirmed, what's still open…"
                className={inp}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ValueFramework({
  deal,
  setValue,
}: {
  deal: Deal;
  setValue: (key: string, val: string) => void;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 rounded-xl bg-gold-soft px-4 py-3 text-xs leading-relaxed text-violet-dark">
        This is your Command of the Message story. Work it top to bottom — the
        outcomes and required capabilities here become your MEDDPICC Decision
        Criteria, Metrics, and Pain.
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {VALUE_FIELDS.map((f) => (
          <div key={f.key} className="rounded-2.5xl bg-surface p-4 shadow-card">
            <label className="block text-sm font-bold text-ink">{f.label}</label>
            <p className="mb-2 mt-0.5 text-xs text-faint">{f.help}</p>
            <textarea
              rows={3}
              value={deal.value[f.key]}
              onChange={(e) => setValue(f.key, e.target.value)}
              className={inp}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Stakeholders({
  deal,
  add,
  set,
  del,
}: {
  deal: Deal;
  add: () => void;
  set: (id: string, patch: Partial<Deal["stakeholders"][number]>) => void;
  del: (id: string) => void;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-ink">Buying committee</h3>
        <button
          onClick={add}
          className="flex items-center gap-1.5 rounded-lg bg-mist px-3 py-1.5 text-sm font-semibold text-muted hover:text-ink"
        >
          <Plus size={14} /> Add person
        </button>
      </div>
      {deal.stakeholders.length === 0 ? (
        <div className="rounded-2.5xl border border-dashed border-line px-4 py-8 text-center text-sm text-faint">
          No stakeholders mapped. Single-threaded deals are fragile — add the people
          who influence this decision.
        </div>
      ) : null}
      <div className="space-y-2">
        {deal.stakeholders.map((s) => (
          <div
            key={s.id}
            className="flex flex-wrap items-center gap-2 rounded-2.5xl bg-surface p-3 shadow-card"
          >
            <span
              className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                s.sentiment === "Positive"
                  ? "bg-good"
                  : s.sentiment === "Negative"
                  ? "bg-danger"
                  : "bg-faint"
              }`}
            />
            <input
              value={s.name}
              onChange={(e) => set(s.id, { name: e.target.value })}
              placeholder="Name"
              className={inp + " w-36 flex-none"}
            />
            <input
              value={s.title}
              onChange={(e) => set(s.id, { title: e.target.value })}
              placeholder="Title"
              className={inp + " w-40 flex-none"}
            />
            <select
              value={s.role}
              onChange={(e) => set(s.id, { role: e.target.value })}
              className={inp + " w-40 flex-none"}
            >
              {ROLES.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
            <select
              value={s.sentiment}
              onChange={(e) => set(s.id, { sentiment: e.target.value as Deal["stakeholders"][number]["sentiment"] })}
              className={inp + " w-32 flex-none"}
            >
              {SENTIMENTS.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
            <button
              onClick={() => del(s.id)}
              className="ml-auto rounded-lg p-1.5 text-faint transition-colors hover:bg-danger-tint hover:text-danger"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActionPlan({
  deal,
  add,
  set,
  del,
}: {
  deal: Deal;
  add: () => void;
  set: (id: string, patch: Partial<Deal["actions"][number]>) => void;
  del: (id: string) => void;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-ink">Mutual action plan</h3>
          <p className="text-xs text-faint">
            The dated path to signature — share it with your champion.
          </p>
        </div>
        <button
          onClick={add}
          className="flex items-center gap-1.5 rounded-lg bg-mist px-3 py-1.5 text-sm font-semibold text-muted hover:text-ink"
        >
          <Plus size={14} /> Add step
        </button>
      </div>
      {deal.actions.length === 0 ? (
        <div className="rounded-2.5xl border border-dashed border-line px-4 py-8 text-center text-sm text-faint">
          No steps yet. Map every milestone to close: POV, business case review,
          security review, procurement, signature.
        </div>
      ) : null}
      <div className="space-y-2">
        {deal.actions.map((a) => (
          <div
            key={a.id}
            className="flex flex-wrap items-center gap-2 rounded-2.5xl bg-surface p-3 shadow-card"
          >
            <button
              onClick={() => set(a.id, { done: !a.done })}
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                a.done ? "border-good bg-good text-white" : "border-faint/60"
              }`}
            >
              {a.done ? <Check size={13} /> : null}
            </button>
            <input
              value={a.text}
              onChange={(e) => set(a.id, { text: e.target.value })}
              placeholder="Next step / milestone"
              className={inp + ` flex-1 ${a.done ? "text-faint line-through" : ""}`}
            />
            <input
              value={a.owner}
              onChange={(e) => set(a.id, { owner: e.target.value })}
              placeholder="Owner"
              className={inp + " w-28 flex-none"}
            />
            <input
              type="date"
              value={a.due}
              onChange={(e) => set(a.id, { due: e.target.value })}
              className={inp + " w-40 flex-none"}
            />
            <button
              onClick={() => del(a.id)}
              className="rounded-lg p-1.5 text-faint transition-colors hover:bg-danger-tint hover:text-danger"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
