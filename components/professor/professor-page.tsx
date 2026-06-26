"use client";

import { useState } from "react";
import { MessageSquare, Mic } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { moduleOptions, professorDefaultModuleId } from "@/lib/professor-context";
import { cn } from "@/lib/utils";
import { ProfessorChat } from "./professor-chat";
import { ProfessorVoice } from "./professor-voice";

type Mode = "text" | "voice";

export function ProfessorPage() {
  const progress = useProgress();
  const options = moduleOptions();

  const [mode, setMode] = useState<Mode>("text");
  // `undefined` = he hasn't touched the picker yet, so fall back to his
  // current/next module (recomputed as progress hydrates). Once he picks
  // something — including "Anything" (null) — that choice sticks.
  const [picked, setPicked] = useState<string | null | undefined>(undefined);
  const moduleId =
    picked === undefined ? professorDefaultModuleId(progress) : picked;

  return (
    <main className="mx-auto w-full max-w-xl lg:max-w-3xl">
      <header>
        <h1 className="font-display text-3xl font-bold">Professor</h1>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          Office hours. The modules are the lecture — this is where you ask the
          dumb question, chase the rabbit hole, and actually get it. Text or
          voice, your call.
        </p>
      </header>

      {/* Mode toggle */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => setMode("text")}
          className={cn(
            "flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-colors duration-150 ease-out",
            mode === "text" ? "bg-ink text-white" : "bg-mist text-muted hover:text-ink"
          )}
        >
          <MessageSquare size={16} strokeWidth={2.2} /> Text
        </button>
        <button
          onClick={() => setMode("voice")}
          className={cn(
            "flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-colors duration-150 ease-out",
            mode === "voice" ? "bg-ink text-white" : "bg-mist text-muted hover:text-ink"
          )}
        >
          <Mic size={16} strokeWidth={2.2} /> Voice
        </button>
      </div>

      {/* Lesson focus picker — feeds both text context and the voice session */}
      <label className="mt-3 block">
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-faint">
          Anchor on
        </span>
        <select
          value={moduleId ?? ""}
          onChange={(e) => setPicked(e.target.value || null)}
          className="mt-1.5 w-full rounded-xl bg-surface px-4 py-3 text-[15px] font-medium text-ink shadow-card outline-none transition-shadow duration-150 focus:ring-2 focus:ring-teal"
        >
          <option value="">Anything in the course</option>
          {options.map((m) => (
            <option key={m.id} value={m.id}>
              Module {m.number} — {m.title}
            </option>
          ))}
        </select>
      </label>

      {mode === "text" ? (
        <ProfessorChat moduleId={moduleId} />
      ) : (
        <ProfessorVoice moduleId={moduleId} />
      )}
    </main>
  );
}
