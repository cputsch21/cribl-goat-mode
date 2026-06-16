import React, { useState, useEffect, useRef } from "react";
import {
  Plus, Trash2, Check, Target, Users, AlertTriangle, Gauge,
  ListChecks, Layers, Circle
} from "lucide-react";

/* ------------------------------------------------------------------ *
 *  DATA MODEL — the "spec" of a deal lives here.
 *  MEDDPICC = qualification / gap-detection layer.
 *  VALUE_FIELDS = Command of the Message (Force Management) value
 *  framework that FEEDS the hard MEDDPICC elements.
 * ------------------------------------------------------------------ */

const STAGES = ["Discover", "Validate", "Business Case", "Negotiate", "Closed"];
const PRODUCTS = ["Stream", "Edge", "Search", "Lake"];
const STATUSES = ["Missing", "Weak", "Strong"];

const MEDDPICC = [
  { key: "metrics", letter: "M", name: "Metrics",
    prompt: "What measurable business value will the customer get? Use THEIR numbers (% SIEM ingest reduced, $ saved, analyst hours back) — not your features.",
    fields: [{ key: "metric", label: "Headline metric / ROI", type: "text" }] },
  { key: "eb", letter: "E", name: "Economic Buyer",
    prompt: "Who controls the budget and can ultimately say yes? Do you have direct access, or are you stuck a layer down?",
    fields: [
      { key: "name", label: "Name / title", type: "text" },
      { key: "access", label: "Access", type: "select", options: ["No access", "Identified, no access", "Met once", "Actively engaged"] }
    ] },
  { key: "dcriteria", letter: "D", name: "Decision Criteria",
    prompt: "What technical, business, and vendor criteria will they judge on? Are YOUR differentiators on the list, or a competitor's?",
    fields: [] },
  { key: "dprocess", letter: "D", name: "Decision Process",
    prompt: "What are the exact steps to a decision — POV, technical validation, business case, approvals — who owns each, and by when?",
    fields: [] },
  { key: "paper", letter: "P", name: "Paper Process",
    prompt: "What does procurement, legal, and security review require to get from 'yes' to signature? This is where deals slip — map it early.",
    fields: [] },
  { key: "pain", letter: "I", name: "Identify Pain",
    prompt: "What's the compelling business pain — AND the compelling event that forces action by a date (renewal, audit, migration, budget cycle)?",
    fields: [{ key: "event", label: "Compelling event", type: "text" }] },
  { key: "champion", letter: "C", name: "Champion",
    prompt: "Who sells for you when you're not in the room, has real influence, and a personal win? Have they PROVEN it with an action?",
    fields: [
      { key: "name", label: "Name / title", type: "text" },
      { key: "validated", label: "Status", type: "select", options: ["Suspected", "Coach (info only)", "Champion (has taken action)"] }
    ] },
  { key: "competition", letter: "C", name: "Competition",
    prompt: "Who/what are you up against — including 'do nothing' and 'build it ourselves'? What's your real position?",
    fields: [
      { key: "primary", label: "Primary alternative", type: "text" },
      { key: "position", label: "Our position", type: "select", options: ["Behind", "Even", "Ahead", "Sole option"] }
    ] },
];

const VALUE_FIELDS = [
  { key: "pbo", label: "Positive Business Outcomes", help: "The strategic results the buyer's business is chasing — cost, risk, speed, growth." },
  { key: "capabilities", label: "Required Capabilities", help: "Frame as 'the ability to ___' — what they must be able to DO to hit those outcomes." },
  { key: "before", label: "Before", help: "How it works today and what the status quo is costing them." },
  { key: "after", label: "After", help: "The future state with Cribl and the improved outcome." },
  { key: "metrics", label: "Metrics", help: "Quantify the gap between Before and After." },
  { key: "differentiators", label: "Differentiators (Why Us)", help: "Proof Cribl delivers the required capability in a way alternatives can't." },
  { key: "whyChange", label: "Why Change", help: "Cost of inaction — why standing still is the riskiest option." },
  { key: "whyNow", label: "Why Now", help: "What makes this urgent — tie it to the compelling event." },
  { key: "whyYou", label: "Why Cribl", help: "Your unique, defensible value versus every alternative." },
];

const ROLES = ["Economic Buyer", "Champion", "Coach", "Technical Buyer", "Influencer", "Blocker"];
const SENTIMENTS = ["Positive", "Neutral", "Negative"];
const STORAGE_KEY = "deal-command-v1";

/* ----------------------------- helpers ----------------------------- */

const uid = (p) => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

const freshMeddpicc = () => {
  const o = {};
  MEDDPICC.forEach((el) => (o[el.key] = { status: "Missing", notes: "", fields: {} }));
  return o;
};
const freshValue = () => {
  const o = {};
  VALUE_FIELDS.forEach((f) => (o[f.key] = ""));
  return o;
};
const newDeal = () => {
  const now = Date.now();
  return {
    id: uid("d_"), account: "", oppName: "New opportunity", products: [],
    arr: "", closeDate: "", stage: "Discover", result: "",
    meddpicc: freshMeddpicc(), value: freshValue(),
    stakeholders: [], actions: [], createdAt: now, updatedAt: now,
  };
};

async function loadAll() {
  try {
    if (typeof window !== "undefined" && window.storage) {
      const r = await window.storage.get(STORAGE_KEY);
      if (r && r.value) return JSON.parse(r.value);
    }
  } catch (e) { /* key not found on first run — fine */ }
  return null;
}
async function saveAll(data) {
  try {
    if (typeof window !== "undefined" && window.storage) {
      await window.storage.set(STORAGE_KEY, JSON.stringify(data));
      return true;
    }
  } catch (e) { console.error("save failed", e); }
  return false;
}

const healthScore = (deal) => {
  const sum = MEDDPICC.reduce(
    (a, el) => a + STATUSES.indexOf(deal.meddpicc[el.key]?.status || "Missing"), 0
  );
  return Math.round((sum / (MEDDPICC.length * 2)) * 100);
};

/* The guidance engine: reads deal state, returns prioritized next moves.
   p:1 = Now, p:2 = Next, p:3 = Later. */
function guidance(deal) {
  const g = [];
  const m = deal.meddpicc;
  const stageIdx = STAGES.indexOf(deal.stage);
  const st = (k) => m[k]?.status || "Missing";
  const fld = (k, fk) => m[k]?.fields?.[fk] || "";

  if (st("pain") !== "Strong")
    g.push({ p: 1, t: "Sharpen the pain: name the business problem AND the compelling event that forces a decision by a date." });

  const access = fld("eb", "access");
  if (st("eb") === "Missing" || access === "No access" || access === "Identified, no access" || access === "")
    g.push({ p: 1, t: "Get to the Economic Buyer — confirm who signs, what they care about, and earn direct access." });

  if (st("metrics") !== "Strong" || !deal.value.metrics)
    g.push({ p: 1, t: "Quantify value in the customer's own numbers — this feeds MEDDPICC Metrics AND your business case." });

  if (fld("champion", "validated") !== "Champion (has taken action)")
    g.push({ p: 2, t: "Develop and TEST your Champion — have they taken a concrete action for you (intro to EB, shared intel, sold internally)?" });

  if (stageIdx >= 1 && st("dprocess") !== "Strong")
    g.push({ p: 2, t: "Map the decision process: every step, owner, and date from here to signature." });

  if (stageIdx >= 2 && st("paper") !== "Strong")
    g.push({ p: 1, t: "Map the paper process NOW — security review, legal, procurement — or your close date will slip." });

  if (st("dcriteria") !== "Strong")
    g.push({ p: 3, t: "Document the decision criteria and get YOUR differentiators written into them." });

  if (!fld("competition", "primary"))
    g.push({ p: 3, t: "Name the competition — including 'do nothing' and 'build it' — and set your traps." });

  const vFilled = VALUE_FIELDS.filter((x) => deal.value[x.key]).length;
  if (vFilled < VALUE_FIELDS.length)
    g.push({ p: 2, t: `Complete the Value Framework (${vFilled}/${VALUE_FIELDS.length}) — Before → Required Capability → After, anchored to a differentiator.` });

  const positives = deal.stakeholders.filter((s) => s.sentiment === "Positive").length;
  if (deal.stakeholders.length <= 1 || positives === 0)
    g.push({ p: 2, t: "Multi-thread: build more than one relationship so the deal doesn't hinge on a single contact." });

  return g.sort((a, b) => a.p - b.p).slice(0, 6);
}

/* ----------------------------- style tokens ----------------------------- */

const inp = "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-300";
const lbl = "block text-xs font-medium text-slate-500 mb-1";

const statusBtn = (s, active) => {
  if (!active) return "border-slate-200 text-slate-400 hover:border-slate-300";
  if (s === "Strong") return "bg-emerald-500 border-emerald-500 text-white";
  if (s === "Weak") return "bg-amber-500 border-amber-500 text-white";
  return "bg-rose-500 border-rose-500 text-white";
};
const chip = (s) => {
  if (s === "Strong") return "bg-emerald-100 text-emerald-700 border-emerald-200";
  if (s === "Weak") return "bg-amber-100 text-amber-700 border-amber-200";
  return "bg-rose-100 text-rose-600 border-rose-200";
};
const dot = (s) => (s === "Strong" ? "bg-emerald-500" : s === "Weak" ? "bg-amber-500" : "bg-rose-400");
const priClass = (p) => (p === 1 ? "bg-rose-100 text-rose-700" : p === 2 ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600");
const priLabel = (p) => (p === 1 ? "Now" : p === 2 ? "Next" : "Later");

/* ------------------------------------------------------------------ *
 *  APP
 * ------------------------------------------------------------------ */

export default function App() {
  const [data, setData] = useState({ deals: {}, order: [] });
  const [activeId, setActiveId] = useState(null);
  const [tab, setTab] = useState("scorecard");
  const [loaded, setLoaded] = useState(false);
  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved
  const saveTimer = useRef(null);
  const firstSave = useRef(true);

  // load once on mount
  useEffect(() => {
    (async () => {
      const d = await loadAll();
      if (d && d.deals) {
        setData(d);
        setActiveId(d.order?.[0] || Object.keys(d.deals)[0] || null);
      }
      setLoaded(true);
    })();
  }, []);

  // debounced autosave whenever data changes
  useEffect(() => {
    if (!loaded) return;
    if (firstSave.current) { firstSave.current = false; return; }
    setSaveState("saving");
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      await saveAll(data);
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 1200);
    }, 600);
  }, [data, loaded]);

  const active = activeId ? data.deals[activeId] : null;

  function addDeal() {
    const d = newDeal();
    setData((prev) => ({ deals: { ...prev.deals, [d.id]: d }, order: [d.id, ...prev.order] }));
    setActiveId(d.id);
    setTab("scorecard");
  }
  function removeDeal(id) {
    setData((prev) => {
      const deals = { ...prev.deals }; delete deals[id];
      return { deals, order: prev.order.filter((x) => x !== id) };
    });
    setActiveId((prev) => (prev === id ? null : prev));
  }
  function patchDeal(patch) {
    if (!active) return;
    setData((prev) => {
      const cur = prev.deals[activeId];
      return { ...prev, deals: { ...prev.deals, [activeId]: { ...cur, ...patch, updatedAt: Date.now() } } };
    });
  }
  // nested patchers
  const setMedd = (key, sub) => patchDeal({ meddpicc: { ...active.meddpicc, [key]: { ...active.meddpicc[key], ...sub } } });
  const setMeddField = (key, fk, val) => setMedd(key, { fields: { ...active.meddpicc[key].fields, [fk]: val } });
  const setValue = (key, val) => patchDeal({ value: { ...active.value, [key]: val } });
  const toggleProduct = (p) => {
    const has = active.products.includes(p);
    patchDeal({ products: has ? active.products.filter((x) => x !== p) : [...active.products, p] });
  };
  const addStakeholder = () => patchDeal({ stakeholders: [...active.stakeholders, { id: uid("s_"), name: "", title: "", role: "Influencer", sentiment: "Neutral" }] });
  const setStakeholder = (id, patch) => patchDeal({ stakeholders: active.stakeholders.map((s) => (s.id === id ? { ...s, ...patch } : s)) });
  const delStakeholder = (id) => patchDeal({ stakeholders: active.stakeholders.filter((s) => s.id !== id) });
  const addAction = () => patchDeal({ actions: [...active.actions, { id: uid("a_"), text: "", owner: "", due: "", done: false }] });
  const setAction = (id, patch) => patchDeal({ actions: active.actions.map((a) => (a.id === id ? { ...a, ...patch } : a)) });
  const delAction = (id) => patchDeal({ actions: active.actions.filter((a) => a.id !== id) });

  const TABS = [
    { id: "scorecard", label: "Scorecard", icon: Gauge },
    { id: "meddpicc", label: "MEDDPICC", icon: Target },
    { id: "value", label: "Value Framework", icon: Layers },
    { id: "stakeholders", label: "Stakeholders", icon: Users },
    { id: "actions", label: "Action Plan", icon: ListChecks },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 font-sans text-slate-800">
      {/* ----- Sidebar ----- */}
      <aside className="flex w-64 flex-shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
          <div>
            <div className="text-sm font-semibold tracking-tight text-slate-900">Deal Command</div>
            <div className="text-xs text-slate-400">MEDDPICC · Command of the Message</div>
          </div>
        </div>
        <button onClick={addDeal} className="mx-3 mt-3 flex items-center justify-center gap-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          <Plus size={15} /> New deal
        </button>
        <div className="mt-3 flex-1 overflow-y-auto px-2 pb-4">
          {data.order.length === 0 && (
            <div className="px-2 py-6 text-center text-xs text-slate-400">No deals yet. Start one above.</div>
          )}
          {data.order.map((id) => {
            const d = data.deals[id];
            if (!d) return null;
            const h = healthScore(d);
            const hc = h >= 67 ? "bg-emerald-500" : h >= 34 ? "bg-amber-500" : "bg-rose-400";
            const isActive = id === activeId;
            return (
              <button key={id} onClick={() => setActiveId(id)}
                className={`mb-1 w-full rounded-md px-3 py-2 text-left transition ${isActive ? "bg-indigo-50 ring-1 ring-indigo-200" : "hover:bg-slate-50"}`}>
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 flex-shrink-0 rounded-full ${hc}`} />
                  <span className="truncate text-sm font-medium text-slate-800">{d.account || "Untitled account"}</span>
                </div>
                <div className="ml-4 truncate text-xs text-slate-400">{d.oppName || "—"}</div>
                <div className="ml-4 mt-1 inline-block rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">{d.stage}</div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* ----- Main ----- */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {!active ? (
          <EmptyState onCreate={addDeal} hasDeals={data.order.length > 0} />
        ) : (
          <>
            {/* Header */}
            <header className="border-b border-slate-200 bg-white px-6 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <input value={active.account} onChange={(e) => patchDeal({ account: e.target.value })}
                    placeholder="Account name"
                    className="w-full bg-transparent text-xl font-semibold tracking-tight text-slate-900 placeholder-slate-300 focus:outline-none" />
                  <input value={active.oppName} onChange={(e) => patchDeal({ oppName: e.target.value })}
                    placeholder="Opportunity name"
                    className="mt-0.5 w-full bg-transparent text-sm text-slate-500 placeholder-slate-300 focus:outline-none" />
                </div>
                <div className="flex flex-shrink-0 items-center gap-3">
                  <span className={`text-xs ${saveState === "saved" ? "text-emerald-600" : "text-slate-400"}`}>
                    {saveState === "saving" ? "Saving…" : saveState === "saved" ? "Saved ✓" : ""}
                  </span>
                  <button onClick={() => removeDeal(active.id)} title="Delete deal"
                    className="rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* meta row */}
              <div className="mt-4 flex flex-wrap items-end gap-4">
                <div>
                  <label className={lbl}>Stage</label>
                  <select value={active.stage} onChange={(e) => patchDeal({ stage: e.target.value })}
                    className={inp + " w-40"}>
                    {STAGES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                {active.stage === "Closed" && (
                  <div>
                    <label className={lbl}>Result</label>
                    <select value={active.result} onChange={(e) => patchDeal({ result: e.target.value })}
                      className={inp + " w-32"}>
                      <option value="">—</option>
                      <option>Won</option>
                      <option>Lost</option>
                    </select>
                  </div>
                )}
                <div>
                  <label className={lbl}>ARR / deal size</label>
                  <input value={active.arr} onChange={(e) => patchDeal({ arr: e.target.value })} placeholder="$"
                    className={inp + " w-32"} />
                </div>
                <div>
                  <label className={lbl}>Target close</label>
                  <input type="date" value={active.closeDate} onChange={(e) => patchDeal({ closeDate: e.target.value })}
                    className={inp + " w-40"} />
                </div>
                <div>
                  <label className={lbl}>Products</label>
                  <div className="flex gap-1.5">
                    {PRODUCTS.map((p) => {
                      const on = active.products.includes(p);
                      return (
                        <button key={p} onClick={() => toggleProduct(p)}
                          className={`rounded-md border px-2.5 py-1.5 text-xs font-medium ${on ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-500 hover:border-slate-300"}`}>
                          {p}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* tabs */}
              <nav className="mt-4 flex gap-1">
                {TABS.map((t) => {
                  const Icon = t.icon;
                  const on = tab === t.id;
                  return (
                    <button key={t.id} onClick={() => setTab(t.id)}
                      className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium ${on ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100"}`}>
                      <Icon size={14} /> {t.label}
                    </button>
                  );
                })}
              </nav>
            </header>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {tab === "scorecard" && <Scorecard deal={active} goTo={setTab} />}
              {tab === "meddpicc" && <Meddpicc deal={active} setMedd={setMedd} setMeddField={setMeddField} />}
              {tab === "value" && <ValueFramework deal={active} setValue={setValue} />}
              {tab === "stakeholders" && <Stakeholders deal={active} add={addStakeholder} set={setStakeholder} del={delStakeholder} />}
              {tab === "actions" && <ActionPlan deal={active} add={addAction} set={setAction} del={delAction} />}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

/* ----------------------------- panels ----------------------------- */

function EmptyState({ onCreate, hasDeals }) {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
          <Target size={22} />
        </div>
        <h2 className="text-lg font-semibold text-slate-900">{hasDeals ? "Pick a deal" : "Start your first deal"}</h2>
        <p className="mt-1 text-sm text-slate-500">
          {hasDeals
            ? "Select a deal from the left, or spin up a new one."
            : "Each deal gets a fresh template that walks you through MEDDPICC and Command of the Message until it's closed."}
        </p>
        <button onClick={onCreate} className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          <Plus size={15} /> New deal
        </button>
      </div>
    </div>
  );
}

function Scorecard({ deal, goTo }) {
  const h = healthScore(deal);
  const hc = h >= 67 ? "bg-emerald-500" : h >= 34 ? "bg-amber-500" : "bg-rose-400";
  const ht = h >= 67 ? "Healthy" : h >= 34 ? "At risk" : "Weak";
  const moves = guidance(deal);
  const vFilled = VALUE_FIELDS.filter((x) => deal.value[x.key]).length;

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      {/* Health */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 lg:col-span-1">
        <div className="flex items-baseline justify-between">
          <h3 className="text-sm font-semibold text-slate-900">MEDDPICC health</h3>
          <span className="text-xs font-medium text-slate-400">{ht}</span>
        </div>
        <div className="mt-3 flex items-end gap-2">
          <span className="text-3xl font-bold tracking-tight text-slate-900">{h}</span>
          <span className="pb-1 text-sm text-slate-400">/ 100</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div className={`h-full ${hc}`} style={{ width: h + "%" }} />
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {MEDDPICC.map((el) => {
            const s = deal.meddpicc[el.key]?.status || "Missing";
            return (
              <button key={el.key} onClick={() => goTo("meddpicc")} title={`${el.name}: ${s}`}
                className={`flex h-8 w-8 items-center justify-center rounded-md border text-sm font-bold ${chip(s)}`}>
                {el.letter}
              </button>
            );
          })}
        </div>

        <div className="mt-5 border-t border-slate-100 pt-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold text-slate-900">Value Framework</h4>
            <span className="text-xs text-slate-400">{vFilled}/{VALUE_FIELDS.length} complete</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full bg-indigo-500" style={{ width: (vFilled / VALUE_FIELDS.length) * 100 + "%" }} />
          </div>
          <button onClick={() => goTo("value")} className="mt-2 text-xs font-medium text-indigo-600 hover:text-indigo-700">
            Build the value story →
          </button>
        </div>
      </div>

      {/* Next best actions */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 lg:col-span-2">
        <div className="flex items-center gap-2">
          <AlertTriangle size={16} className="text-amber-500" />
          <h3 className="text-sm font-semibold text-slate-900">Next best actions</h3>
        </div>
        <p className="mt-1 text-xs text-slate-400">Generated from this deal's gaps and current stage.</p>
        <div className="mt-3 space-y-2">
          {moves.length === 0 && (
            <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-3 text-sm text-emerald-700">
              <Check size={16} /> Solid coverage. Keep your champion and action plan current.
            </div>
          )}
          {moves.map((m, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-slate-100 px-3 py-2.5">
              <span className={`mt-0.5 flex-shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${priClass(m.p)}`}>
                {priLabel(m.p)}
              </span>
              <span className="text-sm text-slate-700">{m.t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Meddpicc({ deal, setMedd, setMeddField }) {
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {MEDDPICC.map((el) => {
        const state = deal.meddpicc[el.key];
        return (
          <div key={el.key} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-sm font-bold text-white">{el.letter}</span>
                <span className="text-sm font-semibold text-slate-900">{el.name}</span>
              </div>
              <div className="flex gap-1">
                {STATUSES.map((s) => (
                  <button key={s} onClick={() => setMedd(el.key, { status: s })}
                    className={`rounded-md border px-2.5 py-1 text-xs font-medium ${statusBtn(s, state.status === s)}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">{el.prompt}</p>

            {el.fields.length > 0 && (
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {el.fields.map((f) => (
                  <div key={f.key}>
                    <label className={lbl}>{f.label}</label>
                    {f.type === "select" ? (
                      <select value={state.fields[f.key] || ""} onChange={(e) => setMeddField(el.key, f.key, e.target.value)} className={inp}>
                        <option value="">—</option>
                        {f.options.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input value={state.fields[f.key] || ""} onChange={(e) => setMeddField(el.key, f.key, e.target.value)} className={inp} />
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-3">
              <label className={lbl}>Notes</label>
              <textarea rows={2} value={state.notes} onChange={(e) => setMedd(el.key, { notes: e.target.value })}
                placeholder="What you know, what you've confirmed, what's still open…" className={inp} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ValueFramework({ deal, setValue }) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 rounded-lg bg-indigo-50 px-4 py-3 text-xs leading-relaxed text-indigo-800">
        This is your Command of the Message story. Work it top to bottom — the outcomes and required
        capabilities here become your MEDDPICC Decision Criteria, Metrics, and Pain.
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {VALUE_FIELDS.map((f) => (
          <div key={f.key} className="rounded-xl border border-slate-200 bg-white p-4">
            <label className="block text-sm font-semibold text-slate-900">{f.label}</label>
            <p className="mb-2 mt-0.5 text-xs text-slate-400">{f.help}</p>
            <textarea rows={3} value={deal.value[f.key]} onChange={(e) => setValue(f.key, e.target.value)} className={inp} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Stakeholders({ deal, add, set, del }) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Buying committee</h3>
        <button onClick={add} className="flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
          <Plus size={14} /> Add person
        </button>
      </div>
      {deal.stakeholders.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-400">
          No stakeholders mapped. Single-threaded deals are fragile — add the people who influence this decision.
        </div>
      )}
      <div className="space-y-2">
        {deal.stakeholders.map((s) => (
          <div key={s.id} className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-3">
            <span className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ${s.sentiment === "Positive" ? "bg-emerald-500" : s.sentiment === "Negative" ? "bg-rose-400" : "bg-slate-300"}`} />
            <input value={s.name} onChange={(e) => set(s.id, { name: e.target.value })} placeholder="Name" className={inp + " w-40 flex-none"} />
            <input value={s.title} onChange={(e) => set(s.id, { title: e.target.value })} placeholder="Title" className={inp + " w-44 flex-none"} />
            <select value={s.role} onChange={(e) => set(s.id, { role: e.target.value })} className={inp + " w-40 flex-none"}>
              {ROLES.map((r) => <option key={r}>{r}</option>)}
            </select>
            <select value={s.sentiment} onChange={(e) => set(s.id, { sentiment: e.target.value })} className={inp + " w-32 flex-none"}>
              {SENTIMENTS.map((x) => <option key={x}>{x}</option>)}
            </select>
            <button onClick={() => del(s.id)} className="ml-auto rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-500">
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActionPlan({ deal, add, set, del }) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Mutual action plan</h3>
          <p className="text-xs text-slate-400">The dated path to signature — share it with your champion.</p>
        </div>
        <button onClick={add} className="flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
          <Plus size={14} /> Add step
        </button>
      </div>
      {deal.actions.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-400">
          No steps yet. Map every milestone to close: POV, business case review, security review, procurement, signature.
        </div>
      )}
      <div className="space-y-2">
        {deal.actions.map((a) => (
          <div key={a.id} className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-3">
            <button onClick={() => set(a.id, { done: !a.done })}
              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border ${a.done ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300"}`}>
              {a.done ? <Check size={13} /> : null}
            </button>
            <input value={a.text} onChange={(e) => set(a.id, { text: e.target.value })} placeholder="Next step / milestone"
              className={inp + ` flex-1 ${a.done ? "text-slate-400 line-through" : ""}`} />
            <input value={a.owner} onChange={(e) => set(a.id, { owner: e.target.value })} placeholder="Owner" className={inp + " w-32 flex-none"} />
            <input type="date" value={a.due} onChange={(e) => set(a.id, { due: e.target.value })} className={inp + " w-40 flex-none"} />
            <button onClick={() => del(a.id)} className="rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-500">
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
