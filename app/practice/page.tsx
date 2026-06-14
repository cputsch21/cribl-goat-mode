"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  ArrowUp,
  Clock,
  Globe,
  Paperclip,
  Plus,
  RotateCcw,
  Square,
  Trash2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Markdown } from "@/components/markdown";
import { Sheet } from "@/components/sheet";
import {
  deleteThread,
  newChatId,
  saveThread,
  undoDeleteThread,
  useChats,
  type ChatMode,
  type ChatThread,
} from "@/lib/chat-store";

const MODES: {
  id: ChatMode;
  label: string;
  emoji: string;
  blurb: string;
  starters: string[];
}[] = [
  {
    id: "claude",
    label: "Claude",
    emoji: "✦",
    blurb:
      "Open chat with Claude — draft a message, think through a deal, explain a concept, roleplay a tough moment. It knows your whole Cribl prep.",
    starters: [
      "Draft my opening line for the Kat call",
      "Explain platformization like I'm five",
      "Roleplay a skeptical CFO and let me practice",
    ],
  },
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

const MODE_LABEL: Record<ChatMode, string> = {
  claude: "Claude",
  coach: "Coach",
  kat: "Kat",
  cam: "Cam",
};

function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function relTime(ts: number, now: number): string {
  const s = Math.max(1, Math.floor((now - ts) / 1000));
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function PracticePage() {
  const [mode, setMode] = useState<ChatMode>("claude");
  const [threadId, setThreadId] = useState<string>(() => newChatId());
  const [input, setInput] = useState("");
  const [webSearch, setWebSearch] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [undoVisible, setUndoVisible] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({ api: "/api/practice", body: { persona: mode } }),
    [mode]
  );

  const { messages, sendMessage, setMessages, status, error, stop, regenerate } =
    useChat({ transport });
  const busy = status === "submitted" || status === "streaming";
  const meta = MODES.find((m) => m.id === mode)!;

  const allChats = useChats();
  const [now, setNow] = useState(0);
  const chats = useMemo(
    () => [...allChats].sort((a, b) => b.updatedAt - a.updatedAt),
    [allChats]
  );

  // Persist completed exchanges to history.
  useEffect(() => {
    if (status === "ready" && messages.length > 0) {
      saveThread(threadId, mode, messages);
    }
  }, [status, messages, threadId, mode]);

  // Autoscroll.
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, busy]);

  // Auto-grow the input.
  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  }, [input]);

  async function send() {
    const trimmed = input.trim();
    if ((!trimmed && files.length === 0) || busy) return;
    const fileParts = await Promise.all(
      files.map(async (file) => ({
        type: "file" as const,
        mediaType: file.type,
        filename: file.name,
        url: await readAsDataURL(file),
      }))
    );
    sendMessage(
      { text: trimmed, files: fileParts },
      { body: { webSearch: mode === "claude" && webSearch } }
    );
    setInput("");
    setFiles([]);
    setFileError(null);
  }

  function sendStarter(text: string) {
    if (busy) return;
    sendMessage(
      { text },
      { body: { webSearch: mode === "claude" && webSearch } }
    );
  }

  function selectMode(m: ChatMode) {
    if (m === mode) return;
    setMode(m);
    setThreadId(newChatId());
    setMessages([]);
    setInput("");
    setFiles([]);
    setWebSearch(false);
  }

  function newChat() {
    setThreadId(newChatId());
    setMessages([]);
    setInput("");
    setFiles([]);
    setFileError(null);
  }

  function openThread(t: ChatThread) {
    setMode(t.mode);
    setThreadId(t.id);
    setMessages(t.messages);
    setHistoryOpen(false);
    setInput("");
    setFiles([]);
  }

  function onPickFiles(list: FileList | null) {
    if (!list || list.length === 0) return;
    const picked = Array.from(list);
    if (picked.some((f) => f.size > 5 * 1024 * 1024)) {
      setFileError("Files need to be under 5 MB each.");
      return;
    }
    setFiles((prev) => [...prev, ...picked]);
    setFileError(null);
  }

  function removeThread(id: string) {
    deleteThread(id);
    setUndoVisible(true);
  }

  return (
    <main className="mx-auto w-full max-w-xl lg:max-w-3xl">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Practice Room</h1>
          <p className="mt-1 text-sm text-muted">
            Chat with Claude, or drill with Coach, Kat, and Cam.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            onClick={newChat}
            className="flex items-center gap-1.5 rounded-xl bg-mist px-3 py-2 text-sm font-semibold text-muted transition-colors duration-150 hover:text-ink"
          >
            <Plus size={16} /> <span className="hidden sm:inline">New</span>
          </button>
          <button
            onClick={() => {
              setNow(Date.now());
              setHistoryOpen(true);
            }}
            className="flex items-center gap-1.5 rounded-xl bg-mist px-3 py-2 text-sm font-semibold text-muted transition-colors duration-150 hover:text-ink"
          >
            <Clock size={16} /> <span className="hidden sm:inline">History</span>
          </button>
        </div>
      </header>

      <Link
        href="/gauntlet"
        className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-ink p-4 text-white transition-shadow duration-150 ease-out hover:shadow-lift"
      >
        <p className="text-sm font-semibold">
          🎙 The real thing lives in{" "}
          <span className="text-gold">the Gauntlet</span> now — live voice
          interviews, five levels each.
        </p>
        <span className="shrink-0 text-gold">→</span>
      </Link>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => selectMode(m.id)}
            className={cn(
              "rounded-xl px-2 py-3 text-center transition-colors duration-150 ease-out",
              mode === m.id ? "bg-ink text-white" : "bg-mist text-muted"
            )}
          >
            <span className="block text-lg">{m.emoji}</span>
            <span className="mt-0.5 block text-xs font-bold">{m.label}</span>
          </button>
        ))}
      </div>

      {/* ── Conversation ── */}
      <div className="mt-4">
        {messages.length === 0 ? (
          <div className="rounded-2.5xl bg-surface p-5 shadow-card">
            <p className="text-sm leading-relaxed text-muted">{meta.blurb}</p>
            <div className="mt-3 grid gap-2">
              {meta.starters.map((s) => (
                <button
                  key={s}
                  onClick={() => sendStarter(s)}
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
              const fileParts = m.parts.flatMap((p) =>
                p.type === "file"
                  ? [{ mediaType: p.mediaType, filename: p.filename, url: p.url }]
                  : []
              );
              const searching = m.parts.some((p) => p.type.startsWith("tool-"));
              if (!text && fileParts.length === 0 && !searching) return null;
              const isUser = m.role === "user";
              return (
                <div
                  key={m.id}
                  className={cn(
                    "flex flex-col gap-1.5",
                    isUser ? "items-end" : "items-start"
                  )}
                >
                  {fileParts.length > 0 ? (
                    <div
                      className={cn(
                        "flex flex-wrap gap-1.5",
                        isUser ? "justify-end" : ""
                      )}
                    >
                      {fileParts.map((p, i) =>
                        p.mediaType?.startsWith("image/") ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={i}
                            src={p.url}
                            alt={p.filename ?? "attachment"}
                            className="h-28 w-28 rounded-xl object-cover shadow-card"
                          />
                        ) : (
                          <span
                            key={i}
                            className="flex items-center gap-1.5 rounded-xl bg-mist px-3 py-2 text-xs font-medium text-muted"
                          >
                            <Paperclip size={13} /> {p.filename ?? "file"}
                          </span>
                        )
                      )}
                    </div>
                  ) : null}

                  {searching && !text ? (
                    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-surface px-4 py-2.5 text-sm text-muted shadow-card">
                      <Globe size={14} className="animate-pulse" /> Searching the
                      web…
                    </div>
                  ) : null}

                  {text ? (
                    <div
                      className={cn(
                        "max-w-[88%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed",
                        isUser
                          ? "whitespace-pre-wrap rounded-br-md bg-teal-tint text-ink"
                          : "rounded-bl-md bg-surface text-ink shadow-card"
                      )}
                    >
                      {isUser ? text : <Markdown>{text}</Markdown>}
                    </div>
                  ) : null}
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
            persists on the live site, add an <b>AI_GATEWAY_API_KEY</b> with
            credits in the Vercel project settings.
          </div>
        ) : null}

        {/* ── Composer ── */}
        <div className="sticky bottom-24 z-20 mt-3 lg:bottom-4">
          {files.length > 0 ? (
            <div className="mb-2 flex flex-wrap gap-1.5">
              {files.map((f, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 rounded-lg bg-mist px-2.5 py-1.5 text-xs font-medium text-muted"
                >
                  <Paperclip size={12} />
                  <span className="max-w-[140px] truncate">{f.name}</span>
                  <button
                    onClick={() => setFiles(files.filter((_, j) => j !== i))}
                    aria-label="Remove file"
                    className="text-faint transition-colors hover:text-danger"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          ) : null}
          {fileError ? (
            <p className="mb-2 text-xs text-danger">{fileError}</p>
          ) : null}

          {(mode === "claude" || (!busy && messages.length > 0)) && (
            <div className="mb-2 flex items-center gap-2">
              {mode === "claude" ? (
                <button
                  onClick={() => setWebSearch((v) => !v)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-150 ease-out",
                    webSearch
                      ? "bg-violet text-white"
                      : "bg-mist text-muted hover:text-ink"
                  )}
                >
                  <Globe size={13} /> Web search {webSearch ? "on" : "off"}
                </button>
              ) : null}
              {!busy && messages.length > 0 && status === "ready" ? (
                <button
                  onClick={() =>
                    regenerate({
                      body: { webSearch: mode === "claude" && webSearch },
                    })
                  }
                  className="flex items-center gap-1.5 rounded-full bg-mist px-3 py-1.5 text-xs font-semibold text-muted transition-colors duration-150 hover:text-ink"
                >
                  <RotateCcw size={13} /> Regenerate
                </button>
              ) : null}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-end gap-2 rounded-xl bg-white/75 py-1 backdrop-blur-sm"
          >
            {mode === "claude" ? (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,application/pdf"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    onPickFiles(e.target.files);
                    e.target.value = "";
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist text-muted transition-colors duration-150 hover:text-ink"
                  aria-label="Attach a file"
                >
                  <Paperclip size={18} />
                </button>
              </>
            ) : null}
            <textarea
              ref={taRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={1}
              placeholder={
                mode === "claude" ? "Ask Claude anything…" : `Answer ${meta.label}…`
              }
              className="max-h-40 min-w-0 flex-1 resize-none rounded-xl bg-mist px-4 py-3 text-[15px] leading-relaxed outline-none transition-shadow duration-150 placeholder:text-faint focus:ring-2 focus:ring-teal"
            />
            {busy ? (
              <button
                type="button"
                onClick={() => stop()}
                className="flex h-11 w-12 shrink-0 items-center justify-center rounded-xl bg-ink text-white transition-all duration-150 ease-out active:scale-[0.97]"
                aria-label="Stop"
              >
                <Square size={15} fill="currentColor" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim() && files.length === 0}
                className={cn(
                  "flex h-11 w-12 shrink-0 items-center justify-center rounded-xl bg-ink text-white transition-all duration-150 ease-out active:scale-[0.97]",
                  !input.trim() && files.length === 0 && "opacity-40"
                )}
                aria-label="Send"
              >
                <ArrowUp size={18} strokeWidth={2.4} />
              </button>
            )}
          </form>
          <p className="mt-1 text-[11px] text-faint">
            {mode === "claude"
              ? "Claude can draft, explain, and roleplay — attach a screenshot or flip on web search anytime."
              : "Tip: type feedback anytime and they'll break character to coach you."}
          </p>
        </div>
      </div>

      {/* ── History ── */}
      <Sheet
        open={historyOpen}
        onOpenChange={(o) => {
          setHistoryOpen(o);
          if (!o) setUndoVisible(false);
        }}
        title="Your chats"
        description="Saved on this device."
      >
        {undoVisible ? (
          <div className="flex items-center justify-between gap-3 rounded-xl bg-ink p-3 text-sm text-white">
            <span>Chat deleted.</span>
            <button
              onClick={() => {
                undoDeleteThread();
                setUndoVisible(false);
              }}
              className="font-semibold text-gold"
            >
              Undo
            </button>
          </div>
        ) : null}

        {chats.length === 0 ? (
          <p className="text-sm text-muted">
            No saved chats yet. Start talking and they&apos;ll show up here.
          </p>
        ) : (
          <div className="grid gap-2">
            {chats.map((t) => (
              <div
                key={t.id}
                className="flex items-center gap-2 rounded-xl bg-mist p-3"
              >
                <button
                  onClick={() => openThread(t)}
                  className="min-w-0 flex-1 text-left"
                >
                  <p className="truncate text-sm font-semibold text-ink">
                    {t.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    {MODE_LABEL[t.mode]} · {relTime(t.updatedAt, now)}
                  </p>
                </button>
                <button
                  onClick={() => removeThread(t.id)}
                  aria-label="Delete chat"
                  className="shrink-0 rounded-lg p-2 text-faint transition-colors hover:text-danger"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </Sheet>
    </main>
  );
}
