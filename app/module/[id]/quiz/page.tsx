import { notFound } from "next/navigation";
import { MODULES, MODULES_BY_ID } from "@/lib/content";
import { QuizRunner } from "@/components/quiz-runner";

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
    <main>
      <QuizRunner
        kicker={`Module ${m.number} — ${m.title}`}
        questions={m.quiz}
        storageId={m.id}
        backHref={`/module/${m.id}`}
        backLabel="Back to the module"
      />
    </main>
  );
}
