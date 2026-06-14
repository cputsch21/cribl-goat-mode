import { notFound } from "next/navigation";
import { MODULES, MODULES_BY_ID } from "@/lib/content";
import { QuizModeSwitcher } from "@/components/quiz-mode-switcher";

export function generateStaticParams() {
  return MODULES.map((m) => ({ id: m.id }));
}

export default async function ModuleQuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const m = MODULES_BY_ID.get(id);
  if (!m) notFound();

  return (
    <main className="mx-auto w-full max-w-xl lg:max-w-2xl">
      <QuizModeSwitcher
        kicker={`Module ${m.number} — ${m.title}`}
        moduleId={m.id}
        mc={m.quiz}
        writeIn={m.writeIn}
        backHref={`/module/${m.id}`}
        backLabel="Back to the module"
      />
    </main>
  );
}
