"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowUp, Globe } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { describeFocus, professorStarters } from "@/lib/professor-context";
import { cn } from "@/lib/utils";

// Office-hours answers are long, so assistant turns render as markdown. Same
// element styling the deal coach uses, spelled out as one stable string so
// Tailwind can see the classes.
const MD =
  "space-y-2.5 text-[15px] leading-relaxed text-ink/90 " +
  "[&_h1]:mt-4 [&_h1]:font-display [&_h1]:text-base [&_h1]:font-bold [&_h1]:text-ink " +
  "[&_h2]:mt-4 [&_h2]:font-display [&_h2]:text-[11px] [&_h2]:font-bold [&_h2]:uppercase [&_h2]:tracking-[0.12em] [&_h2]:text-teal-dark " +
  "[&_h3]:mt-3 [&_h3]:font-bold [&_h3]:text-ink " +
  "[&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5 [&_li]:marker:text-faint " +
  "[&_strong]:font-bold [&_strong]:text-ink [&_em]:italic " +
  "[&_code]:rounded [&_code]:bg-mist [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[13px] " +
  "[&_a]:font-medium [&_a]:text-violet [&_a]:underline " +
  "[&_blockquote]:border-l-2 [&_blockquote]:border-line [&_blockquote]:pl-3 [&_blockquote]:text-muted " +
  "[&>*:first-child]:mt-0";

export function ProfessorChat({ moduleId }: { moduleId: string | null }) {
  const progress = useProgress();
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/professor" }),
    []
  );
  const { messages, sendMessage, status, error } = useChat({ transport });
  const busy = status === "submitted" || status === "streaming";

  const [input, setInput] = useState("");
  const [webSearch, setWebSearch] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, busy]);

  const starters = professorStarters(moduleId);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    // Freshest focus at send time — switching the module picker mid-chat
    // re-points the Professor without resetting the conversation.
    const context = describeFocus(moduleId, progress);
    sendMessage({ text: trimmed }, { body: { context, webSearch } });
    setInput("");
  }

  return (
    <div className="mt-4">
      {messages.length === 0 ? (
        <div className="rounded-2.5xl bg-surface p-5 shadow-card">
          <p className="text-sm leading-relaxed text-muted">
            This is office hours, Chris — no grade, no clock. Ask the dumb
            question, chase the tangent, go as deep as you want. Pick a lesson up
            top to anchor on, or just start anywhere.
          </p>
          <div className="mt-3 grid gap-2">
            {starters.map((s) => (
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
        <div className="space-y-3">
          {messages.map((m) => {
            const text = m.parts
              .map((p) => (p.type === "text" ? p.text : ""))
              .join("");
            if (!text) return null;
            if (m.role === "user") {
              return (
                <div
                  key={m.id}
                  className="ml-auto max-w-[88%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-teal-tint px-4 py-2.5 text-[15px] leading-relaxed text-ink"
                >
                  {text}
                </div>
              );
            }
            return (
              <div
                key={m.id}
                className="rounded-2.5xl bg-surface px-5 py-4 shadow-card"
              >
                <div className={MD}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
                </div>
              </div>
            );
          })}
          {status === "submitted" ? (
            <div className="w-fit rounded-2xl rounded-bl-md bg-surface px-4 py-3 shadow-card">
              {webSearch ? (
                <span className="flex items-center gap-2 text-xs font-medium text-muted">
                  <Globe size={14} className="animate-pulse text-violet-dark" />
                  Searching the web…
                </span>
              ) : (
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-faint" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-faint [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-faint [animation-delay:300ms]" />
                </span>
              )}
            </div>
          ) : null}
          <div ref={endRef} />
        </div>
      )}

      {error ? (
        <div className="mt-3 rounded-xl bg-gold-soft p-4 text-sm leading-relaxed text-gold-deep">
          The Professor can&apos;t reach its brain right now — everything else
          (modules, quizzes, cram sheets) works without it. If this persists on
          the live site, add an <b>AI_GATEWAY_API_KEY</b> in the Vercel project
          settings.
        </div>
      ) : null}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="sticky bottom-24 z-20 mt-3 flex gap-2 rounded-xl bg-white/75 py-1 backdrop-blur-sm lg:bottom-4"
      >
        <button
          type="button"
          onClick={() => setWebSearch((v) => !v)}
          aria-pressed={webSearch}
          aria-label={webSearch ? "Web search on" : "Turn on web search"}
          title={
            webSearch
              ? "Web search on — I can pull in live info"
              : "Web search off — answers come from your course pack"
          }
          className={cn(
            "flex shrink-0 items-center justify-center gap-1.5 rounded-xl text-xs font-bold transition-all duration-150 ease-out active:scale-[0.97]",
            webSearch
              ? "bg-violet px-3 text-white"
              : "w-12 bg-mist text-muted hover:text-ink"
          )}
        >
          <Globe size={18} strokeWidth={2.2} />
          {webSearch ? <span>Web</span> : null}
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the Professor anything…"
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
    </div>
  );
}
