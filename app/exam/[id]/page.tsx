import { notFound } from "next/navigation";
import { EXAMS, EXAMS_BY_ID } from "@/lib/content";
import { ExamView } from "@/components/exam-view";

export function generateStaticParams() {
  return EXAMS.map((e) => ({ id: e.id }));
}

export default async function ExamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exam = EXAMS_BY_ID.get(id);
  if (!exam) notFound();

  return <ExamView exam={exam} />;
}
