"use client";

import { useState } from "react";
import { ChevronRight, BookOpen, HelpCircle, Lightbulb, AlertTriangle, Target } from "lucide-react";
import {
  QSL_INTRO,
  QSL_COURSE,
  type QSLNode,
  type QSLModule,
} from "@/lib/content/qsl";
import { QslAudioPlayer } from "@/components/qsl/audio-player";
import { cn } from "@/lib/utils";

/* ── Node renderer (recursive) ─────────────────────────────────────────── */

function NoteCallout({ label, t }: { label: string; t: string }) {
  // Pick an accent by intent so "Trap" reads differently from "Use it".
  const lower = label.toLowerCase();
  const tone =
    lower === "trap"
      ? { box: "border-l-gold-deep bg-gold-soft", chip: "text-gold-deep", Icon: AlertTriangle }
      : lower === "use it"
        ? { box: "border-l-teal-deep bg-teal-tint", chip: "text-teal-dark", Icon: Lightbulb }
        : { box: "border-l-ink bg-mist", chip: "text-ink", Icon: Target };
  const Icon = tone.Icon;
  return (
    <div className={cn("rounded-r-lg border-l-[3px] px-3.5 py-2.5", tone.box)}>
      <p className={cn("mb-0.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide", tone.chip)}>
        <Icon size={13} strokeWidth={2.4} />
        {label}
      </p>
      <p className="text-[14px] leading-relaxed text-ink/85">{t}</p>
    </div>
  );
}

function Node({ node }: { node: QSLNode }) {
  switch (node.k) {
    case "p":
      return <p className="text-[14.5px] leading-relaxed text-ink/85">{node.t}</p>;
    case "list":
      return node.ordered ? (
        <ol className="list-decimal space-y-1.5 pl-5 text-[14.5px] leading-relaxed text-ink/85 marker:font-semibold marker:text-faint">
          {node.items.map((it, i) => (
            <li key={i} className="pl-1">{it}</li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc space-y-1.5 pl-5 text-[14.5px] leading-relaxed text-ink/85 marker:text-faint">
          {node.items.map((it, i) => (
            <li key={i} className="pl-1">{it}</li>
          ))}
        </ul>
      );
    case "q":
      return (
        <div className="rounded-xl border border-line bg-surface p-3.5">
          <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-violet-deep">
            <HelpCircle size={13} strokeWidth={2.4} />
            {node.title ?? "Question bank"}
          </p>
          <ul className="space-y-1.5">
            {node.items.map((it, i) => (
              <li key={i} className="flex gap-2 text-[14px] leading-relaxed text-ink/85">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet" />
                {it}
              </li>
            ))}
          </ul>
        </div>
      );
    case "note":
      return <NoteCallout label={node.label} t={node.t} />;
    case "sub":
      return (
        <div className="space-y-2">
          <p className="font-display text-[15px] font-bold text-ink">{node.title}</p>
          <div className="space-y-2.5 border-l border-line pl-3.5">
            {node.nodes.map((n, i) => (
              <Node key={i} node={n} />
            ))}
          </div>
        </div>
      );
  }
}

/* ── Lesson (level 3 drill-down) ───────────────────────────────────────── */

function Lesson({ lesson }: { lesson: QSLModule["lessons"][number] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl bg-surface shadow-card">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start gap-2.5 px-4 py-3 text-left"
      >
        <ChevronRight
          size={17}
          strokeWidth={2.4}
          className={cn(
            "mt-0.5 shrink-0 text-faint transition-transform duration-150 ease-out",
            open && "rotate-90 text-ink"
          )}
        />
        <span className="min-w-0 flex-1">
          <span className="block font-semibold leading-tight text-ink">{lesson.title}</span>
          <span className="mt-0.5 block text-[13px] leading-snug text-muted">{lesson.tag}</span>
        </span>
      </button>
      {open && (
        <div className="space-y-3.5 border-t border-line px-4 py-4 pl-[2.6rem]">
          {lesson.nodes.map((n, i) => (
            <Node key={i} node={n} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Module (level 2 drill-down) ───────────────────────────────────────── */

function Module({ module, defaultOpen }: { module: QSLModule; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="overflow-hidden rounded-2xl bg-mist/60 shadow-card">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3.5 px-4 py-3.5 text-left"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink font-display text-sm font-bold text-gold">
          {module.num}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-[17px] font-bold leading-tight text-ink">
            {module.title}
          </span>
          <span className="mt-0.5 block text-[13px] leading-snug text-muted">{module.tag}</span>
        </span>
        <span className="shrink-0 rounded-full bg-surface px-2 py-0.5 text-[11px] font-bold text-faint">
          {module.lessons.length}
        </span>
        <ChevronRight
          size={18}
          strokeWidth={2.4}
          className={cn(
            "shrink-0 text-faint transition-transform duration-150 ease-out",
            open && "rotate-90 text-ink"
          )}
        />
      </button>

      {open && (
        <div className="space-y-2.5 px-3 pb-3.5 sm:px-4">
          {module.lessons.map((l) => (
            <Lesson key={l.id} lesson={l} />
          ))}

          {module.mastery && module.mastery.length > 0 && (
            <div className="rounded-xl border border-dashed border-gold-deep/40 bg-gold-soft/60 p-4">
              <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-gold-deep">
                <Target size={13} strokeWidth={2.4} />
                Prove you understand it
              </p>
              <ul className="space-y-1.5">
                {module.mastery.map((m, i) => (
                  <li key={i} className="flex gap-2 text-[14px] leading-relaxed text-ink/85">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-deep" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function QslPage() {
  return (
    <main className="mx-auto w-full max-w-2xl space-y-6 lg:max-w-3xl">
      <header className="space-y-3">
        <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-faint">
          <BookOpen size={14} strokeWidth={2.4} />
          QSL · The Qualified Sales Leader — course
        </p>
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink">
          {QSL_INTRO.title}
        </h1>
        <p className="text-[14.5px] leading-relaxed text-ink/85">{QSL_INTRO.blurb}</p>
        <div className="rounded-xl border-l-[3px] border-l-teal-deep bg-cribl-soft px-3.5 py-2.5">
          <p className="text-[14px] leading-relaxed text-ink/85">{QSL_INTRO.spine}</p>
        </div>
        <ul className="space-y-1 text-[13px] leading-relaxed text-muted">
          {QSL_INTRO.how.map((h, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-faint" />
              {h}
            </li>
          ))}
        </ul>
      </header>

      <QslAudioPlayer />

      <div className="space-y-3">
        {QSL_COURSE.map((m, i) => (
          <Module key={m.id} module={m} defaultOpen={i === 0} />
        ))}
      </div>
    </main>
  );
}
