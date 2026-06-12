import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MODULES, MODULES_BY_ID, SOURCE_LABELS } from "@/lib/content";

export function generateStaticParams() {
  return MODULES.map((m) => ({ id: m.id }));
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const m = MODULES_BY_ID.get(id);
  if (!m) notFound();

  const next = MODULES.find((x) => x.number === m.number + 1);

  return (
    <main className="mx-auto w-full max-w-xl lg:max-w-3xl">
      <header className="mb-6">
        <Link
          href="/"
          className="flex w-fit items-center gap-1.5 text-sm font-medium text-muted transition-colors duration-150 hover:text-ink"
        >
          <ArrowLeft size={16} /> Course
        </Link>
        <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-faint">
          Period {m.period} · Module {m.number} · {m.minutes} min
          {m.bonus ? " · bonus" : ""}
        </p>
        <h1 className="mt-1.5 font-display text-3xl font-bold leading-tight">
          {m.title}
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{m.tagline}</p>
        {m.audience ? (
          <span className="mt-3 inline-block rounded-full bg-gold-soft px-3 py-1 text-xs font-bold text-gold-deep">
            {m.audience}
          </span>
        ) : null}
      </header>

      <div className="space-y-4">
        {m.cards.map((card, i) => (
          <article
            key={card.id}
            className="rounded-2.5xl bg-surface p-5 shadow-card"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal-dark">
              {i + 1} / {m.cards.length}
            </p>
            <h2 className="mt-1 font-display text-lg font-bold leading-snug">
              {card.title}
            </h2>
            <div className="mt-2.5 space-y-2.5">
              {card.paragraphs.map((p, j) => (
                <p key={j} className="text-[15px] leading-relaxed text-ink/90">
                  {p}
                </p>
              ))}
            </div>
            {card.bullets ? (
              <ul className="mt-2.5 space-y-1.5">
                {card.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="flex gap-2 text-[15px] leading-relaxed text-ink/90"
                  >
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                    {b}
                  </li>
                ))}
              </ul>
            ) : null}
            {card.sayThis ? (
              <div className="mt-4 rounded-xl bg-ink p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
                  Say this
                </p>
                <p className="mt-1.5 text-[15px] font-medium leading-relaxed text-white">
                  “{card.sayThis}”
                </p>
              </div>
            ) : null}
            <p className="mt-3.5 text-[11px] font-medium text-faint">
              {SOURCE_LABELS[card.source]}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-2">
        <Link
          href={`/module/${m.id}/quiz`}
          className="w-full rounded-xl bg-ink py-4 text-center font-semibold text-white transition-transform duration-150 ease-out active:scale-[0.99]"
        >
          Take the quiz — {m.quiz.length} questions
        </Link>
        {next ? (
          <Link
            href={`/module/${next.id}`}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-mist py-3.5 text-center text-sm font-semibold text-muted transition-colors duration-150 hover:text-ink"
          >
            Next: Module {next.number} — {next.title} <ArrowRight size={15} />
          </Link>
        ) : null}
      </div>
    </main>
  );
}
