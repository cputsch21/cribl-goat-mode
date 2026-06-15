"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowUp, Globe, GraduationCap, X } from "lucide-react";
import { useProgress } from "@/lib/progress";
import {
  describeLocation,
  describeProgress,
  locationLabel,
  tutorStarters,
} from "@/lib/tutor-context";
import { cn } from "@/lib/utils";

/**
 * Shared open/closed signal for the tutor. Lives in context so the page can
 * react to it — on desktop the page slides over to make room for the panel
 * instead of the panel floating on top of everything.
 */
type TutorState = { open: boolean; setOpen: (open: boolean) => void };
const TutorContext = createContext<TutorState | null>(null);

function useTutorState() {
  const ctx = useContext(TutorContext);
  if (!ctx) {
    throw new Error("Tutor pieces must be used inside <TutorProvider>.");
  }
  return ctx;
}

export function TutorProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open, setOpen }), [open]);
  return (
    <TutorContext.Provider value={value}>{children}</TutorContext.Provider>
  );
}

/**
 * Wraps the whole page. When the tutor is open on a wide screen, the page
 * gently slides left to make room for the panel docked on the right. On
 * phones there's no room to share, so the page stays put and the tutor opens
 * on top — handled by the panel itself.
 */
export function TutorShell({ children }: { children: React.ReactNode }) {
  const { open } = useTutorState();
  return (
    <div
      className={cn(
        "transition-[padding] duration-150 ease-out",
        open && "lg:pr-[28rem]"
      )}
    >
      {children}
    </div>
  );
}

/** True once the viewport is wide enough to show the page and tutor together. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  return isDesktop;
}

/**
 * The tutor that lives alongside the entire interface. A floating launcher on
 * every page opens the chat panel whose brain knows which module, quiz, or
 * cram sheet Chris is looking at right now. On desktop it docks beside the
 * page; on phones it slides in on top.
 */
export function Tutor() {
  const { open, setOpen } = useTutorState();
  const isDesktop = useIsDesktop();
  const pathname = usePathname();
  const progress = useProgress();

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/tutor" }),
    []
  );

  const { messages, sendMessage, status, error } = useChat({ transport });
  const busy = status === "submitted" || status === "streaming";

  const [input, setInput] = useState("");
  const [webSearch, setWebSearch] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, busy, open]);

  const starters = tutorStarters(pathname);
  const here = locationLabel(pathname);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    // Attach the freshest "where Chris is" snapshot at send time, so the tutor
    // follows him around the app without the conversation resetting.
    const context = `${describeLocation(pathname)}\n${describeProgress(
      progress
    )}`;
    sendMessage({ text: trimmed }, { body: { context, webSearch } });
    setInput("");
  }

  return (
    // Non-modal on desktop so the page stays fully usable beside the panel;
    // modal on phones so it behaves like the slide-in drawer it was before.
    <Dialog.Root open={open} onOpenChange={setOpen} modal={!isDesktop}>
      {/* Floating launcher — clears the mobile dock, sits bottom-right on lg.
          Fades away while the panel is open (the panel has its own close). */}
      <Dialog.Trigger asChild>
        <button
          aria-label="Open the GOAT tutor"
          className={cn(
            "fixed bottom-24 right-4 z-40 flex items-center gap-2 rounded-full bg-ink py-3 pl-3.5 pr-4 text-white shadow-lift transition-all duration-150 ease-out hover:shadow-card active:scale-[0.97] lg:bottom-6 lg:right-6",
            open && "pointer-events-none opacity-0"
          )}
        >
          <GraduationCap size={18} className="text-gold" strokeWidth={2.2} />
          <span className="text-sm font-bold">
            <span aria-hidden>🐐</span> Tutor
          </span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        {/* Dim the page only on phones; on desktop the page stays bright and
            interactive beside the panel. */}
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/50 duration-150 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 lg:hidden" />
        <Dialog.Content
          onInteractOutside={(event) => {
            // On desktop the panel sits beside the page, so tapping the page to
            // keep studying shouldn't close it — only the X (or Esc) does.
            if (isDesktop) event.preventDefault();
          }}
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-canvas shadow-lift outline-none duration-150 ease-out data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:animate-in data-[state=open]:slide-in-from-right lg:w-[28rem] lg:max-w-none lg:border-l lg:border-line"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 border-b border-line bg-surface px-5 pb-4 pt-[calc(env(safe-area-inset-top)+1rem)]">
            <div className="min-w-0">
              <Dialog.Title className="font-display text-lg font-bold">
                <span aria-hidden>🐐</span> GOAT Tutor
              </Dialog.Title>
              <Dialog.Description className="mt-0.5 text-xs text-muted">
                Helping with{" "}
                <span className="font-semibold text-teal-dark">{here}</span> —
                ask anything, or say “quiz me”.
              </Dialog.Description>
            </div>
            <Dialog.Close className="shrink-0 rounded-lg p-1.5 text-muted transition-colors duration-150 hover:bg-mist">
              <X size={18} />
            </Dialog.Close>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {messages.length === 0 ? (
              <div className="rounded-2.5xl bg-surface p-5 shadow-card">
                <p className="text-sm leading-relaxed text-muted">
                  I&apos;m your corner-side tutor, Chris. I follow you around the
                  app — I know what&apos;s on your screen right now, so just ask.
                </p>
                <div className="mt-3 grid gap-2">
                  {starters.map((startMsg) => (
                    <button
                      key={startMsg}
                      onClick={() => send(startMsg)}
                      className="w-full rounded-xl bg-mist px-4 py-3 text-left text-sm font-medium transition-colors duration-150 ease-out hover:bg-line active:scale-[0.99]"
                    >
                      {startMsg}
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
                    {webSearch ? (
                      <span className="flex items-center gap-2 text-xs font-medium text-muted">
                        <Globe
                          size={14}
                          className="animate-pulse text-violet-dark"
                        />
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
                The tutor can&apos;t reach its brain right now — everything else
                (modules, quizzes, cram sheets) works without it. If this
                persists on the live site, add an <b>AI_GATEWAY_API_KEY</b> in
                the Vercel project settings.
              </div>
            ) : null}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex gap-2 border-t border-line bg-surface px-5 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-3"
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
              placeholder="Ask your tutor…"
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
