"use client";

import { useState } from "react";
import {
  Presentation,
  Sparkles,
  Download,
  RefreshCw,
  Plus,
  Trash2,
} from "lucide-react";
import {
  patchMeeting,
  type Deal,
  type Meeting,
  type Deck,
  type Slide,
} from "@/lib/deals";
import { buildDealContext, buildMeetingContext } from "@/lib/deal-context";

const KIND_META: Record<string, { label: string; chip: string }> = {
  before: { label: "Before — their world", chip: "bg-danger-tint text-danger" },
  whyChange: { label: "Why change · why now", chip: "bg-warn-soft text-warn-deep" },
  capability: { label: "Required capability", chip: "bg-violet-soft text-violet-dark" },
  after: { label: "After — with Cribl", chip: "bg-good-soft text-good-deep" },
  proof: { label: "Proof & metrics", chip: "bg-teal-tint text-teal-dark" },
  cta: { label: "Recommended next step", chip: "bg-mist text-ink" },
};
function kindMeta(kind: string) {
  return KIND_META[kind] ?? { label: kind || "Slide", chip: "bg-mist text-muted" };
}

export function DeckPanel({ deal, meeting }: { deal: Deal; meeting: Meeting }) {
  const [building, setBuilding] = useState(false);
  const [err, setErr] = useState(false);
  const deck = meeting.deck ?? null;

  async function build() {
    setBuilding(true);
    setErr(false);
    try {
      const res = await fetch("/api/pitch-deck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          context: buildDealContext(deal),
          meeting: buildMeetingContext(deal, meeting),
        }),
      });
      if (!res.ok) throw new Error("bad");
      const d = (await res.json()) as Deck;
      if (!d?.slides?.length) throw new Error("empty");
      patchMeeting(deal.id, meeting.id, { deck: d, deckAt: Date.now() });
    } catch {
      setErr(true);
    } finally {
      setBuilding(false);
    }
  }

  if (!deck) {
    return (
      <div className="mt-4 rounded-2.5xl bg-surface p-5 shadow-card">
        <div className="flex items-center gap-2">
          <Presentation size={18} className="text-violet" />
          <h3 className="font-display text-lg font-bold text-ink">Pitch deck</h3>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          Turn this deal&apos;s value story into slides for the meeting — the
          Command of the Message arc, tailored to who&apos;s in the room.
        </p>
        <button
          onClick={build}
          disabled={building}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-teal py-3.5 font-semibold text-ink transition-transform duration-150 ease-out active:scale-[0.99] disabled:opacity-60"
        >
          {building ? (
            <>
              <span className="flex gap-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink/60" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink/60 [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink/60 [animation-delay:300ms]" />
              </span>
              Building your deck…
            </>
          ) : (
            <>
              <Sparkles size={16} /> Build pitch deck
            </>
          )}
        </button>
        {err ? (
          <p className="mt-2 text-center text-xs text-danger">
            Couldn&apos;t build the deck. On the live site this works; locally it
            needs a fresh Vercel AI token.
          </p>
        ) : null}
      </div>
    );
  }

  return <DeckView deal={deal} meeting={meeting} deck={deck} onRebuild={build} rebuilding={building} />;
}

function DeckView({
  deal,
  meeting,
  deck,
  onRebuild,
  rebuilding,
}: {
  deal: Deal;
  meeting: Meeting;
  deck: Deck;
  onRebuild: () => void;
  rebuilding: boolean;
}) {
  // Edits just update the deck; deckAt marks when it was generated, set on build.
  const save = (next: Deck) => patchMeeting(deal.id, meeting.id, { deck: next });
  const setField = (patch: Partial<Deck>) => save({ ...deck, ...patch });
  const setSlide = (i: number, patch: Partial<Slide>) =>
    save({
      ...deck,
      slides: deck.slides.map((s, idx) => (idx === i ? { ...s, ...patch } : s)),
    });
  const addSlide = () =>
    save({
      ...deck,
      slides: [
        ...deck.slides,
        { heading: "New slide", bullets: [""], speakerNotes: "", kind: "after" },
      ],
    });
  const delSlide = (i: number) =>
    save({ ...deck, slides: deck.slides.filter((_, idx) => idx !== i) });

  return (
    <div className="mt-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Presentation size={18} className="text-violet" />
          <h3 className="font-display text-lg font-bold text-ink">Pitch deck</h3>
          <span className="text-xs text-faint">{deck.slides.length + 1} slides</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => exportDeckPdf(deck)}
            className="flex items-center gap-1.5 rounded-lg bg-ink px-3 py-1.5 text-sm font-semibold text-white transition-transform active:scale-[0.97]"
          >
            <Download size={14} /> PDF
          </button>
          <button
            onClick={onRebuild}
            disabled={rebuilding}
            title="Rebuild from the latest deal"
            className="flex items-center gap-1.5 rounded-lg bg-mist px-3 py-1.5 text-sm font-semibold text-muted hover:text-ink disabled:opacity-60"
          >
            <RefreshCw size={14} className={rebuilding ? "animate-spin" : ""} />
            {rebuilding ? "" : "Rebuild"}
          </button>
        </div>
      </div>

      {/* Title slide */}
      <div className="overflow-hidden rounded-2.5xl bg-cribl p-6 shadow-card">
        <input
          value={deck.title}
          onChange={(e) => setField({ title: e.target.value })}
          placeholder="Deck title"
          className="w-full bg-transparent font-display text-2xl font-bold leading-tight tracking-tight text-ink outline-none placeholder:text-ink/40"
        />
        <input
          value={deck.subtitle}
          onChange={(e) => setField({ subtitle: e.target.value })}
          placeholder="Subtitle"
          className="mt-2 w-full bg-transparent text-sm font-medium text-ink-3 outline-none placeholder:text-ink/40"
        />
      </div>

      {/* Content slides */}
      <div className="mt-3 space-y-3">
        {deck.slides.map((s, i) => {
          const meta = kindMeta(s.kind);
          return (
            <div key={i} className="rounded-2.5xl bg-surface p-5 shadow-card">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${meta.chip}`}
                >
                  {meta.label}
                </span>
                <button
                  onClick={() => delSlide(i)}
                  title="Delete slide"
                  className="rounded-lg p-1.5 text-faint transition-colors hover:bg-danger-tint hover:text-danger"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <input
                value={s.heading}
                onChange={(e) => setSlide(i, { heading: e.target.value })}
                placeholder="Slide heading"
                className="w-full rounded-lg bg-transparent font-display text-lg font-bold leading-snug text-ink outline-none transition-colors focus:bg-mist focus:px-2"
              />
              <textarea
                value={s.bullets.join("\n")}
                onChange={(e) => setSlide(i, { bullets: e.target.value.split("\n") })}
                placeholder="One bullet per line…"
                rows={Math.max(3, s.bullets.length)}
                className="mt-2 w-full resize-none rounded-xl bg-mist px-3 py-2.5 text-[15px] leading-relaxed text-ink/90 outline-none transition focus:bg-white focus:ring-2 focus:ring-teal/30"
              />
              <div className="mt-2">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-faint">
                  What you say
                </p>
                <textarea
                  value={s.speakerNotes}
                  onChange={(e) => setSlide(i, { speakerNotes: e.target.value })}
                  placeholder="Speaker notes…"
                  rows={2}
                  className="w-full resize-none rounded-xl bg-mist/60 px-3 py-2 text-sm italic text-muted outline-none transition focus:bg-white focus:ring-2 focus:ring-teal/30"
                />
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={addSlide}
        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-2.5xl border border-dashed border-line py-3 text-sm font-semibold text-muted transition-colors hover:border-teal hover:text-ink"
      >
        <Plus size={15} /> Add slide
      </button>
    </div>
  );
}

/** Open a clean, self-contained print window (landscape slides) for Save-as-PDF. */
function exportDeckPdf(deck: Deck) {
  const esc = (s: string) =>
    String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const titleSlide = `<section class="slide title"><div><h1>${esc(
    deck.title
  )}</h1><p>${esc(deck.subtitle)}</p></div></section>`;

  const slides = deck.slides
    .map((s) => {
      const items = s.bullets
        .filter((b) => b.trim())
        .map((b) => `<li>${esc(b)}</li>`)
        .join("");
      return `<section class="slide"><span class="kind">${esc(
        kindMeta(s.kind).label
      )}</span><h2>${esc(s.heading)}</h2><ul>${items}</ul></section>`;
    })
    .join("");

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(
    deck.title || "Pitch deck"
  )}</title><style>
    @page { size: 1280px 720px; margin: 0; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; color: #0a2730; }
    .slide { width: 1280px; height: 720px; padding: 84px; page-break-after: always; display: flex; flex-direction: column; justify-content: center; position: relative; }
    .slide.title { background: linear-gradient(115deg,#5beeed 0%,#92c0f7 48%,#ab8bf4 100%); }
    .slide.title h1 { font-size: 72px; font-weight: 800; line-height: 1.05; margin: 0; letter-spacing: -0.02em; }
    .slide.title p { font-size: 28px; color: #10333e; margin-top: 22px; }
    .kind { position: absolute; top: 68px; left: 84px; font-size: 15px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: #077077; }
    .slide h2 { font-size: 52px; font-weight: 800; line-height: 1.1; margin: 0 0 34px; letter-spacing: -0.01em; }
    .slide ul { margin: 0; padding: 0; list-style: none; }
    .slide li { font-size: 27px; line-height: 1.5; margin-bottom: 18px; padding-left: 38px; position: relative; }
    .slide li::before { content: ""; position: absolute; left: 0; top: 15px; width: 14px; height: 14px; border-radius: 9999px; background: #0ce5e5; }
  </style></head><body>${titleSlide}${slides}<script>window.onload=function(){setTimeout(function(){window.print();},150);}</script></body></html>`;

  const w = window.open("", "_blank");
  if (!w) return;
  w.document.write(html);
  w.document.close();
}
