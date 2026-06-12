"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

type Persona = "coach" | "kat" | "cam";

const PERSONAS: {
  id: Persona;
  label: string;
  emoji: string;
  blurb: string;
  starters: string[];
}[] = [
  {
    id: "coach",
    label: "Coach",
    emoji: "🥊",
    blurb:
      "Your corner man. Drills you on the course, scores every answer, tightens your phrasing.",
    starters: [
      "Warm me up — one question at a time",
      "Drill me on the 30-second pitch",
      "Quiz me on the numbers",
    ],
  },
  {
    id: "kat",
    label: "Kat",
    emoji: "🤝",
    blurb:
      "Plays the Partner Business Manager — warm, connected, listening for partner-first instincts.",
    starters: [
      "Start the interview — it's Monday 3:30",
      "Grill me on deal registration",
      "Ask how I'd use my partner friendships",
    ],
  },
  {
    id: "cam",
    label: "Cam",
    emoji: "🔧",
    blurb:
      "Plays the SE leader — friendly, technical, and absolutely hunting for bluffs.",
    starters: [
      "Start the interview — it's Tuesday morning",
      "Test my technical vocabulary",
      "Ask me when I'd pull in an SE",
    ],
  },
];

function Chat({ persona }: { persona: Persona }) {
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/practice",
        body: { persona },
      }),
    [persona]
  );

  const { messages, sendMessage, status, error } = useChat({ transport });
  const busy = status === "submitted" || status === "streaming";
  const meta = PERSONAS.find((p) => p.id === persona)!;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, busy]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    sendMessage({ text: trimmed });
    setInput("");
  }

  return (
    <div className="mt-4">
      {messages.length === 0 ? (
        <div className="rounded-2.5xl bg-surface p-5 shadow-card">
          <p className="text-sm leading-relaxed text-muted">{meta.blurb}</p>
          <div className="mt-3 grid gap-2">
            {meta.starters.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="w-full rounded-xl bg-mist px-4 py-3 text-left text-sm font-medium transition-colors duration-150 ease-out hover:bg-line active:scale-[0.99]"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-2.5">
          {messages.map((m) => {
            const text = m.parts
              .map((p) => (p.type === "text" ? p.text : ""))
              .join("");
            if (!text) return null;
            return (
              <div
                key={m.id}
                className={cn(
                  "max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed",
                  m.role === "user"
                    ? "ml-auto rounded-br-md bg-teal-tint text-ink"
                    : "rounded-bl-md bg-surface text-ink shadow-card"
                )}
              >
                {text}
              </div>
            );
          })}
          {status === "submitted" ? (
            <div className="w-fit rounded-2xl rounded-bl-md bg-surface px-4 py-3 shadow-card">
              <span className="flex gap-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-faint" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-faint [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-faint [animation-delay:300ms]" />
              </span>
            </div>
          ) : null}
          <div ref={endRef} />
        </div>
      )}

      {error ? (
        <div className="mt-3 rounded-xl bg-gold-soft p-4 text-sm leading-relaxed text-gold-deep">
          The Practice Room can&apos;t reach its brain right now — everything
          else (modules, quizzes, cram sheets) works without it. If this
          persists on the live site, add an <b>AI_GATEWAY_API_KEY</b> in the
          Vercel project settings.
        </div>
      ) : null}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="sticky bottom-24 z-20 mt-3 flex gap-2 bg-canvas py-1"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Answer ${meta.label}…`}
          className="min-w-0 flex-1 rounded-xl bg-mist px-4 py-3.5 text-[15px] outline-none transition-shadow duration-150 placeholder:text-faint focus:ring-2 focus:ring-teal"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className={cn(
            "flex w-12 shrink-0 items-center justify-center rounded-xl bg-ink text-white transition-all duration-150 ease-out active:scale-[0.97]",
            (busy || !input.trim()) && "opacity-40"
          )}
          aria-label="Send"
        >
          <ArrowUp size={18} strokeWidth={2.4} />
        </button>
      </form>
      <p className="mt-1 text-[11px] text-faint">
        Tip: type <b>feedback</b>
        {" anytime and they'll break character to coach you."}
      </p>
    </div>
  );
}

export default function PracticePage() {
  const [persona, setPersona] = useState<Persona>("coach");

  return (
    <main>
      <header>
        <h1 className="font-display text-3xl font-bold">Practice Room</h1>
        <p className="mt-1 text-sm text-muted">
          The text fallback for when you can&apos;t talk out loud.
        </p>
      </header>

      <Link
        href="/gauntlet"
        className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-ink p-4 text-white transition-shadow duration-150 ease-out hover:shadow-lift"
      >
        <p className="text-sm font-semibold">
          🎙 The real thing lives in <span className="text-gold">the Gauntlet</span> now —
          live voice interviews, five levels each.
        </p>
        <span className="shrink-0 text-gold">→</span>
      </Link>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {PERSONAS.map((p) => (
          <button
            key={p.id}
            onClick={() => setPersona(p.id)}
            className={cn(
              "rounded-xl px-2 py-3 text-center transition-colors duration-150 ease-out",
              persona === p.id ? "bg-ink text-white" : "bg-mist text-muted"
            )}
          >
            <span className="block text-lg">{p.emoji}</span>
            <span className="mt-0.5 block text-xs font-bold">{p.label}</span>
          </button>
        ))}
      </div>

      <Chat key={persona} persona={persona} />
    </main>
  );
}
