// GOAT Mode content types.
// Every lesson card carries a source tag so Chris never quotes something
// that can't be traced to cribl.io or his own interview transcripts.

export type Source = "cribl.io" | "patrick" | "ami" | "chris" | "craft";

export const SOURCE_LABELS: Record<Source, string> = {
  "cribl.io": "Verified on cribl.io",
  patrick: "Patrick — your interviews",
  ami: "Ami — your interviews",
  chris: "Your own words — interviews",
  craft: "Sales craft",
};

export interface LessonCard {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  /** A line Chris can literally say in the room. */
  sayThis?: string;
  source: Source;
}

export interface QuizOption {
  text: string;
  correct?: boolean;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
  /** Shown after answering — this is where the teaching happens. */
  explain: string;
}

export interface WriteInQuestion {
  id: string;
  /** Open-ended / scenario prompt — the user types a free-text answer. */
  prompt: string;
  /** The ideas a strong answer must hit. The AI grades against these. */
  keyPoints: string[];
  /** A strong spoken answer in Chris's voice, revealed after scoring. */
  model: string;
}

export interface CourseModule {
  id: string; // m1..m10
  period: 1 | 2 | 3;
  number: number;
  title: string;
  tagline: string;
  minutes: number;
  /** e.g. "Built for the Kat call" */
  audience?: string;
  bonus?: boolean;
  cards: LessonCard[];
  quiz: QuizQuestion[];
  /** Harder, free-text version of the quiz — typed answers, AI-scored. */
  writeIn: WriteInQuestion[];
}

export interface Exam {
  id: "kat" | "cam";
  title: string;
  subtitle: string;
  questions: QuizQuestion[];
}

export type FlashCategory = "data" | "security" | "sales" | "channel";

export interface Flashcard {
  id: string;
  term: string;
  category: FlashCategory;
  /** Plain-English meaning. */
  plain: string;
  /** How it shows up in a real sentence. */
  sentence: string;
}

export interface CramSheet {
  id: "kat" | "cam";
  name: string;
  role: string;
  /** Who they are + what they're listening for. */
  intel: string[];
  land: string[]; // 5 things to land
  stats: string[]; // numbers to have cold
  traps: string[]; // 3 traps
  ask: string[]; // 5 questions to ask them
}

export interface PlanItem {
  id: string;
  day: string;
  label: string;
  href?: string;
}

export interface InterviewSlot {
  id: "kat" | "cam" | "rep";
  name: string;
  role: string;
  /** ISO local datetime default — editable in the app. */
  defaultAt: string;
}
