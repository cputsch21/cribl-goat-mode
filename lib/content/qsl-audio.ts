// Turns the QSL course into a spoken script for the audio player: exactly one
// chapter per course module (13 total), each chapter reading that module's
// content word-for-word from the QSL page — its title, tagline, every lesson
// (title, tagline, lists, question banks, callouts), and the "Prove you
// understand it" checks. Text is only split into sentence-sized segments so the
// player can pause/resume and skip ~30s; no words are added or changed.

import { QSL_COURSE, type QSLNode } from "@/lib/content/qsl";

export type AudioChapter = {
  id: string;
  label: string; // "Chapter 3"
  title: string;
  segments: string[];
};

/** Split prose into speakable sentences (collapses whitespace only). */
function sentences(t: string): string[] {
  return t
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?<=[.!?])\s+(?=[A-Z0-9("'])/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Render one course node to spoken segments, verbatim. */
function nodeToSpeech(n: QSLNode): string[] {
  switch (n.k) {
    case "p":
      return sentences(n.t);
    case "list":
      return n.items.flatMap(sentences);
    case "q":
      return [`${n.title ?? "Questions to ask"}.`, ...n.items.flatMap(sentences)];
    case "note":
      return [`${n.label}.`, ...sentences(n.t)];
    case "sub":
      return [`${n.title}.`, ...n.nodes.flatMap(nodeToSpeech)];
  }
}

export const QSL_CHAPTERS: AudioChapter[] = QSL_COURSE.map((m) => {
  const n = parseInt(m.num, 10);
  return {
    id: m.id,
    label: `Chapter ${n}`,
    title: m.title,
    segments: [
      m.title,
      ...sentences(m.tag),
      ...m.lessons.flatMap((l) => [
        `${l.title}.`,
        ...sentences(l.tag),
        ...l.nodes.flatMap(nodeToSpeech),
      ]),
      ...(m.mastery && m.mastery.length
        ? ["Prove you understand it.", ...m.mastery.flatMap(sentences)]
        : []),
    ],
  };
});
