"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowUp, Sparkles } from "lucide-react";
import { buildDealContext } from "@/lib/deal-context";
import { type Deal } from "@/lib/deals";
import { cn } from "@/lib/utils";

const STARTERS = [
  "What's my single biggest risk on this deal?",
  "Give me the exact questions to reach the economic buyer.",
  "Pressure-test my value story.",
  "How do I beat the competition here?",
];

const PLAY =
  "Give me the full play on this deal — your honest read, the single biggest risk, the weakest MEDDPICC elements, and my prioritized next moves with the exact questions to ask.";

// Tailwind can't see class strings it doesn't statically find, so the markdown
// element styling is spelled out here as one stable string.
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

export function Coach({ deal }: { deal: Deal }) {
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/coach" }),
    []
  );
  const { messages, sendMessage, status, error } = useChat({ transport });
  const busy = status === "submitted" || status === "streaming";
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, busy]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    // Freshest snapshot of the deal at send time — edits show up immediately.
    sendMessage({ text: trimmed }, { body: { context: buildDealContext(deal) } });
    setInput("");
  }

  return (
    <div className="mx-auto max-w-3xl">
      {messages.length === 0 ? (
        <div className="rounded-2.5xl bg-surface p-5 shadow-card">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-violet" />
            <h3 className="font-display text-lg font-bold text-ink">
              Coach this deal
            </h3>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            I read everything you&apos;ve filled in — qualification, the value
            story, your committee, your plan — and coach you on how to win it.
            The more you fill in, the sharper I get.
          </p>
          <button
            onClick={() => send(PLAY)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-teal py-3.5 font-semibold text-ink transition-transform duration-150 ease-out active:scale-[0.99]"
          >
            <Sparkles size={16} /> Give me the play
          </button>
          <div className="mt-3 grid gap-2">
            {STARTERS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="w-full rounded-xl bg-mist px-4 py-3 text-left text-sm font-medium transition-colors duration-150 hover:bg-line active:scale-[0.99]"
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
          The coach can&apos;t reach its brain right now — the rest of the deal
          works without it. If this keeps up on the live site, the AI Gateway
          needs paid credits.
        </div>
      ) : null}

      {messages.length > 0 ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="sticky bottom-4 mt-3 flex gap-2 lg:bottom-6"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a follow-up…"
            className="min-w-0 flex-1 rounded-xl bg-surface px-4 py-3.5 text-[15px] shadow-card outline-none transition-shadow duration-150 placeholder:text-faint focus:ring-2 focus:ring-teal"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className={cn(
              "flex w-12 shrink-0 items-center justify-center rounded-xl bg-ink text-white shadow-card transition-all duration-150 ease-out active:scale-[0.97]",
              (busy || !input.trim()) && "opacity-40"
            )}
            aria-label="Send"
          >
            <ArrowUp size={18} strokeWidth={2.4} />
          </button>
        </form>
      ) : null}
    </div>
  );
}
