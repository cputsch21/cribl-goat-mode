"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Activity,
  Scale,
  MapPin,
  Pencil,
  Hammer,
  type LucideIcon,
} from "lucide-react";
import {
  getPersona,
  personaHasGaps,
  type Persona,
  type PersonaCluster,
  type PersonaPoint,
} from "@/lib/content/personas";
import { PersonaRehearsal } from "@/components/dojo/persona-rehearsal";
import { cn } from "@/lib/utils";

const CLUSTER_ICON: Record<PersonaCluster, LucideIcon> = {
  security: ShieldCheck,
  ops: Activity,
  swing: Scale,
};

const CLUSTER_TINT: Record<PersonaCluster, string> = {
  security: "bg-violet/10 text-violet",
  ops: "bg-teal-faint text-teal-dark",
  swing: "bg-warn-soft text-warn-deep",
};

export default function PersonaPage() {
  const { id } = useParams<{ id: string }>();
  const persona = getPersona(id);

  if (!persona) {
    return (
      <main className="mx-auto w-full max-w-xl lg:max-w-2xl">
        <BackLink />
        <div className="rounded-2.5xl bg-surface p-8 text-center shadow-card">
          <p className="font-display text-lg font-bold text-ink">Persona not found</p>
          <p className="mt-1 text-sm text-muted">
            Head back to the Dojo and pick a seat on the committee.
          </p>
        </div>
      </main>
    );
  }

  const Icon = CLUSTER_ICON[persona.cluster];

  return (
    <main className="mx-auto w-full max-w-xl lg:max-w-2xl">
      <BackLink />

      {/* Header */}
      <div className="rounded-2.5xl bg-surface p-6 shadow-card">
        <div className="flex items-start gap-3.5">
          <span
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
              CLUSTER_TINT[persona.cluster]
            )}
          >
            <Icon size={22} />
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-2xl font-bold leading-tight text-ink">
              {persona.name}
            </h1>
            <p className="mt-0.5 text-sm text-muted">{persona.title}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                {persona.committeeRole}
              </span>
              {personaHasGaps(persona) ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-warn-soft px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-warn-deep">
                  <Pencil size={11} /> Draft
                </span>
              ) : null}
            </div>
          </div>
        </div>
        {persona.whereTheySit ? (
          <p className="mt-4 flex gap-2 text-[13px] leading-relaxed text-muted">
            <MapPin size={15} className="mt-0.5 shrink-0 text-faint" />
            <span>
              <span className="font-semibold text-ink">Where they sit: </span>
              {persona.whereTheySit}
            </span>
          </p>
        ) : null}
      </div>

      {persona.ready ? (
        <ReadyDossier persona={persona} />
      ) : (
        <ComingSoon persona={persona} />
      )}
    </main>
  );
}

function ReadyDossier({ persona }: { persona: Persona }) {
  return (
    <div className="mt-3 space-y-3">
      {/* What they're measured on */}
      {persona.measuredOn?.length ? (
        <Section title="What they're measured on">
          <div className="flex flex-wrap gap-2">
            {persona.measuredOn.map((m, i) => (
              <span
                key={i}
                className={cn(
                  "rounded-full px-3 py-1 text-[13px]",
                  m.gap ? "bg-mist text-faint italic" : "bg-mist text-ink"
                )}
              >
                {m.text}
              </span>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Pains */}
      {persona.pains?.length ? (
        <Section title="What keeps them up at night">
          <BulletList items={persona.pains} dot="bg-danger" />
        </Section>
      ) : null}

      {/* What lands */}
      {persona.whatLands?.length ? (
        <Section title="What lands with them" note="ties to your value framework">
          <BulletList items={persona.whatLands} dot="bg-teal" />
        </Section>
      ) : null}

      {/* Objections */}
      {persona.objections?.length ? (
        <Section title="What they'll throw at you">
          <div className="space-y-3">
            {persona.objections.map((o, i) => (
              <div key={i}>
                <p className="text-sm font-medium leading-relaxed text-ink">
                  “{o.objection}”
                </p>
                <p
                  className={cn(
                    "mt-1 flex gap-1.5 text-sm leading-relaxed",
                    o.gap ? "text-faint italic" : "text-muted"
                  )}
                >
                  <ArrowRight size={15} className="mt-0.5 shrink-0 text-teal-dark" />
                  {o.reframe}
                </p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Discovery */}
      {persona.discovery?.length ? (
        <Section title="Your opening discovery questions">
          <div className="space-y-2.5">
            {persona.discovery.map((d, i) => (
              <div key={i}>
                <p className="text-sm leading-relaxed text-ink">“{d.q}”</p>
                <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wide text-faint">
                  {d.tag}
                </p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Rehearsal */}
      <div className="pt-1">
        <PersonaRehearsal persona={persona} />
      </div>

      {/* Sourcing footer */}
      <p className="flex items-start gap-2 px-1 pt-2 text-[12px] leading-relaxed text-faint">
        <ShieldCheck size={15} className="mt-0.5 shrink-0" />
        Drafted from your course + Coach knowledge (Patrick · Ami · cribl.io). The
        italic “[…]” lines are gaps to fill from your notes — never invented.
      </p>
    </div>
  );
}

function ComingSoon({ persona }: { persona: Persona }) {
  return (
    <div className="mt-3">
      <div className="rounded-2.5xl bg-surface p-8 text-center shadow-card">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-soft text-violet">
          <Hammer size={22} />
        </span>
        <p className="mt-4 font-display text-lg font-bold text-ink">
          Building this persona next
        </p>
        <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-muted">
          {persona.blurb}
        </p>
        <p className="mx-auto mt-3 max-w-sm text-[13px] leading-relaxed text-faint">
          Full study card + voice rehearsal coming once it&apos;s authored from your
          notes. The CISO is ready to rehearse now.
        </p>
        <Link
          href="/dojo/ciso"
          className="mx-auto mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 font-semibold text-white transition-transform duration-150 active:scale-[0.98]"
        >
          Rehearse the CISO <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

function Section({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2.5xl bg-surface p-5 shadow-card">
      <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal-dark">
        {title}
        {note ? <span className="ml-2 normal-case tracking-normal text-faint">· {note}</span> : null}
      </h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function BulletList({ items, dot }: { items: PersonaPoint[]; dot: string }) {
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li
          key={i}
          className={cn(
            "flex gap-2.5 text-sm leading-relaxed",
            it.gap ? "text-faint italic" : "text-ink/90"
          )}
        >
          <span className={cn("mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full", it.gap ? "bg-faint" : dot)} />
          {it.text}
        </li>
      ))}
    </ul>
  );
}

function BackLink() {
  return (
    <Link
      href="/dojo"
      className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
    >
      <ArrowLeft size={16} /> The Dojo
    </Link>
  );
}
