import type { Metadata } from "next";
import { ProfessorPage } from "@/components/professor/professor-page";

export const metadata: Metadata = {
  title: "Professor — GOAT Mode",
  description:
    "Office hours — ask anything, chase the rabbit hole, learn in the open. Text or voice.",
};

export default function Page() {
  return <ProfessorPage />;
}
