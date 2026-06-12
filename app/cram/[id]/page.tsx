import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CRAM_SHEETS } from "@/lib/content";

export function generateStaticParams() {
  return CRAM_SHEETS.map((c) => ({ id: c.id }));
}

export default async function CramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sheet = CRAM_SHEETS.find((c) => c.id === id);
  if (!sheet) notFound();

  const moduleHref = sheet.id === "kat" ? "/module/m8" : "/module/m9";

  return (
    <main>
      <header className="mb-6">
        <Link
          href="/"
          className="flex w-fit items-center gap-1.5 text-sm font-medium text-muted transition-colors duration-150 hover:text-ink"
        >
          <ArrowLeft size={16} /> Course
        </Link>
        <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-gold-deep">
          Cram sheet · the last 30 minutes
        </p>
        <h1 className="mt-1.5 font-display text-3xl font-bold leading-tight">
          {sheet.name}
        </h1>
        <p className="mt-1 text-sm font-medium text-muted">{sheet.role}</p>
      </header>

      <div className="space-y-5">
        <section className="rounded-2.5xl bg-surface p-5 shadow-card">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal-dark">
            Who you&apos;re talking to
          </h2>
          <ul className="mt-2.5 space-y-2.5">
            {sheet.intel.map((line, i) => (
              <li
                key={i}
                className="flex gap-2 text-[15px] leading-relaxed text-ink/90"
              >
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                {line}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2.5xl bg-surface p-5 shadow-card">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal-dark">
            Land these five
          </h2>
          <ol className="mt-2.5 space-y-3">
            {sheet.land.map((line, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-ink font-display text-xs font-bold text-gold">
                  {i + 1}
                </span>
                <span className="text-[15px] leading-relaxed text-ink/90">
                  {line}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-2.5xl bg-ink p-5 text-white">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
            Numbers to have cold
          </h2>
          <ul className="mt-2.5 space-y-2.5">
            {sheet.stats.map((line, i) => (
              <li
                key={i}
                className="flex gap-2 text-[15px] leading-relaxed text-white/90"
              >
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {line}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2.5xl bg-danger-tint p-5">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-danger">
            Three traps
          </h2>
          <ul className="mt-2.5 space-y-2.5">
            {sheet.traps.map((line, i) => (
              <li
                key={i}
                className="flex gap-2 text-[15px] leading-relaxed text-ink/90"
              >
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-danger" />
                {line}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2.5xl bg-surface p-5 shadow-card">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal-dark">
            Questions to ask
          </h2>
          <ol className="mt-2.5 space-y-3">
            {sheet.ask.map((line, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-teal-tint font-display text-xs font-bold text-teal-dark">
                  {i + 1}
                </span>
                <span className="text-[15px] leading-relaxed text-ink/90">
                  {line}
                </span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <div className="mt-6 grid gap-2">
        <Link
          href={`/exam/${sheet.id}`}
          className="w-full rounded-xl bg-ink py-4 text-center font-semibold text-white transition-transform duration-150 ease-out active:scale-[0.99]"
        >
          Run the {sheet.id === "kat" ? "Kat" : "Cam"} Simulation
        </Link>
        <Link
          href={moduleHref}
          className="w-full rounded-xl bg-mist py-3.5 text-center text-sm font-semibold text-muted transition-colors duration-150 hover:text-ink"
        >
          Re-read the full module
        </Link>
      </div>
    </main>
  );
}
