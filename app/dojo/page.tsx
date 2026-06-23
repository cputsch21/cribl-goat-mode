"use client";

import Link from "next/link";
import { ShieldCheck, Activity, Scale, Swords, type LucideIcon } from "lucide-react";
import { useDojo, useHydrated } from "@/lib/dojo";
import {
  PERSONA_GROUPS,
  personasByCluster,
  type Persona,
  type PersonaCluster,
} from "@/lib/content/personas";
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

function scoreTone(n: number) {
  return n >= 80 ? "text-good-deep" : n >= 60 ? "text-ink" : "text-warn-deep";
}

export default function DojoListPage() {
  const { byPersona } = useDojo();
  const hydrated = useHydrated();

  return (
    <main className="mx-auto w-full max-w-xl lg:max-w-3xl">
      <header className="mb-7">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-faint">
          Buyer Persona Dojo
        </p>
        <h1 className="mt-1.5 flex items-center gap-2.5 font-display text-3xl font-bold leading-tight">
          <Swords size={26} className="text-violet" /> Know the room
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">
          Prep for every seat on the buying committee — study what they care about and
          what they&apos;ll throw at you, then rehearse out loud and get scored.
        </p>
      </header>

      <div className="space-y-8">
        {PERSONA_GROUPS.map((group) => {
          const Icon = CLUSTER_ICON[group.key];
          const people = personasByCluster(group.key);
          return (
            <section key={group.key}>
              <div className="mb-3 flex items-baseline gap-2">
                <h2 className="font-display text-lg font-bold text-ink">{group.label}</h2>
                <p className="text-[13px] text-faint">{group.sub}</p>
              </div>
              <div className="space-y-3">
                {people.map((p) => (
                  <PersonaCard
                    key={p.id}
                    persona={p}
                    Icon={CLUSTER_ICON[p.cluster] ?? Icon}
                    lastScore={hydrated ? byPersona[p.id]?.lastScore ?? null : null}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <p className="mt-9 flex items-start gap-2 text-[12px] leading-relaxed text-faint">
        <ShieldCheck size={15} className="mt-0.5 shrink-0" />
        Each dossier is drafted from your course + Coach knowledge (Patrick · Ami ·
        cribl.io). Bracketed lines are gaps to fill from your notes — never invented.
      </p>
    </main>
  );
}

function PersonaCard({
  persona: p,
  Icon,
  lastScore,
}: {
  persona: Persona;
  Icon: LucideIcon;
  lastScore: number | null;
}) {
  return (
    <Link
      href={`/dojo/${p.id}`}
      className={cn(
        "block rounded-2.5xl bg-surface p-5 shadow-card transition-shadow duration-150 hover:shadow-lift",
        !p.ready && "opacity-75"
      )}
    >
      <div className="flex items-start gap-3.5">
        <span
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
            CLUSTER_TINT[p.cluster]
          )}
        >
          <Icon size={20} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-bold leading-snug text-ink">
              {p.name}
            </h3>
            <span className="rounded-full bg-mist px-2.5 py-0.5 text-[11px] font-semibold text-muted">
              {p.committeeRole}
            </span>
          </div>
          <p className="mt-0.5 text-sm text-muted">{p.title}</p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-faint">{p.blurb}</p>
        </div>
        <div className="shrink-0 text-right">
          {!p.ready ? (
            <span className="rounded-full bg-mist px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-faint">
              Soon
            </span>
          ) : lastScore !== null ? (
            <p className={cn("font-display text-2xl font-bold tabular-nums", scoreTone(lastScore))}>
              {lastScore}
              <span className="text-xs font-semibold text-faint">/100</span>
            </p>
          ) : (
            <span className="rounded-full bg-gold-soft px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-violet">
              Ready
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
