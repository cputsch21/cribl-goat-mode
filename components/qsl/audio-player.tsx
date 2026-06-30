"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  MessagesSquare,
  Mic,
  X,
  Loader2,
  Send,
  Volume2,
} from "lucide-react";
import { QSL_CHAPTERS } from "@/lib/content/qsl-audio";
import { cn } from "@/lib/utils";

/* ── Minimal Web Speech API typings (SpeechRecognition isn't in lib.dom) ── */
type SpeechRecognitionResultLike = ArrayLike<{ transcript: string }> & {
  isFinal: boolean;
};
type SpeechRecognitionEventLike = {
  results: ArrayLike<SpeechRecognitionResultLike>;
};
type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};
type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

type Msg = { role: "user" | "assistant"; content: string };

const WORDS_PER_SEC = 2.6; // ~156 wpm, for estimating skip distances

export function QslAudioPlayer() {
  /* ── feature support (resolved on the client) ── */
  const [ttsOK, setTtsOK] = useState(false);
  const [sttOK, setSttOK] = useState(false);
  const recCtorRef = useRef<SpeechRecognitionCtor | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  /* ── position (state for render + refs for the speech callbacks) ── */
  const [pos, setPosState] = useState({ ci: 0, si: 0 });
  const posRef = useRef(pos);
  const setPos = useCallback((ci: number, si: number) => {
    posRef.current = { ci, si };
    setPosState({ ci, si });
  }, []);

  const [playing, setPlayingState] = useState(false);
  const playingRef = useRef(false);
  const setPlaying = useCallback((v: boolean) => {
    playingRef.current = v;
    setPlayingState(v);
  }, []);

  const [mode, setModeState] = useState<"listen" | "discuss">("listen");
  const modeRef = useRef<"listen" | "discuss">("listen");
  const setMode = useCallback((m: "listen" | "discuss") => {
    modeRef.current = m;
    setModeState(m);
  }, []);

  /* ── discussion state ── */
  const [messages, setMessages] = useState<Msg[]>([]);
  const messagesRef = useRef<Msg[]>([]);
  messagesRef.current = messages;
  const [recording, setRecording] = useState(false);
  const [partial, setPartial] = useState("");
  const [thinking, setThinking] = useState(false);
  const [liveAnswer, setLiveAnswer] = useState("");
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [typed, setTyped] = useState("");
  const [error, setError] = useState("");
  const recRef = useRef<SpeechRecognitionLike | null>(null);

  /* ── flat timeline (for 30s skips that can cross chapter lines) ── */
  const flat = useMemo(() => {
    const arr: { ci: number; si: number; sec: number }[] = [];
    QSL_CHAPTERS.forEach((ch, ci) =>
      ch.segments.forEach((s, si) => {
        const words = s.split(/\s+/).filter(Boolean).length;
        arr.push({ ci, si, sec: Math.max(1, words / WORDS_PER_SEC) });
      })
    );
    return arr;
  }, []);
  const flatIndex = useCallback(
    (ci: number, si: number) => flat.findIndex((f) => f.ci === ci && f.si === si),
    [flat]
  );

  /* ── detect support + pick a voice ── */
  useEffect(() => {
    if (typeof window === "undefined") return;
    setTtsOK("speechSynthesis" in window);
    const w = window as unknown as {
      SpeechRecognition?: SpeechRecognitionCtor;
      webkitSpeechRecognition?: SpeechRecognitionCtor;
    };
    const ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
    recCtorRef.current = ctor;
    setSttOK(Boolean(ctor));

    if ("speechSynthesis" in window) {
      const pick = () => {
        const vs = window.speechSynthesis.getVoices();
        voiceRef.current =
          vs.find(
            (v) =>
              /^en/i.test(v.lang) &&
              /(samantha|google us english|jenny|aria|natural)/i.test(v.name)
          ) ??
          vs.find((v) => /^en/i.test(v.lang)) ??
          vs[0] ??
          null;
      };
      pick();
      window.speechSynthesis.onvoiceschanged = pick;
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.onvoiceschanged = null;
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  /* ── core narration: speak the current segment, auto-advance on end ── */
  const speakCourse = useCallback(() => {
    if (!("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const { ci, si } = posRef.current;
    const ch = QSL_CHAPTERS[ci];
    if (!ch) {
      setPlaying(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(ch.segments[si]);
    u.rate = 1.02;
    if (voiceRef.current) u.voice = voiceRef.current;
    u.onend = () => {
      if (!playingRef.current || modeRef.current !== "listen") return;
      const cur = posRef.current;
      const chap = QSL_CHAPTERS[cur.ci];
      if (cur.si + 1 < chap.segments.length) {
        setPos(cur.ci, cur.si + 1);
        speakCourse();
      } else if (cur.ci + 1 < QSL_CHAPTERS.length) {
        setPos(cur.ci + 1, 0);
        speakCourse();
      } else {
        setPlaying(false);
      }
    };
    synth.speak(u);
  }, [setPlaying, setPos]);

  const play = useCallback(() => {
    if (!ttsOK) return;
    setPlaying(true);
    speakCourse();
  }, [ttsOK, setPlaying, speakCourse]);

  const pause = useCallback(() => {
    setPlaying(false);
    if (typeof window !== "undefined" && "speechSynthesis" in window)
      window.speechSynthesis.cancel();
  }, [setPlaying]);

  const togglePlay = useCallback(() => {
    if (playingRef.current) pause();
    else play();
  }, [pause, play]);

  /* ── skip ~N seconds (negative = back), can cross chapters ── */
  const skip = useCallback(
    (seconds: number) => {
      const { ci, si } = posRef.current;
      let idx = flatIndex(ci, si);
      if (idx < 0) idx = 0;
      let acc = 0;
      if (seconds < 0) {
        while (idx > 0 && acc < -seconds) {
          idx -= 1;
          acc += flat[idx].sec;
        }
      } else {
        while (idx < flat.length - 1 && acc < seconds) {
          acc += flat[idx].sec;
          idx += 1;
        }
      }
      const t = flat[idx];
      setPos(t.ci, t.si);
      if (playingRef.current && modeRef.current === "listen") speakCourse();
    },
    [flat, flatIndex, setPos, speakCourse]
  );

  const jumpChapter = useCallback(
    (ci: number) => {
      setPos(ci, 0);
      if (playingRef.current && modeRef.current === "listen") speakCourse();
    },
    [setPos, speakCourse]
  );

  /* ── discussion mode ── */
  const enterDiscuss = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window)
      window.speechSynthesis.cancel();
    setPlaying(false); // hold the course right here
    setError("");
    setMode("discuss");
  }, [setPlaying, setMode]);

  const resumeCourse = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window)
      window.speechSynthesis.cancel();
    setAiSpeaking(false);
    setMode("listen");
    play(); // pick up exactly where we left off
  }, [setMode, play]);

  const describePlace = useCallback(() => {
    const { ci, si } = posRef.current;
    const ch = QSL_CHAPTERS[ci];
    if (!ch) return "";
    const around = ch.segments.slice(Math.max(0, si - 2), si + 1).join(" ");
    return `He is on ${ch.label}: ${ch.title}. The narration had just reached: "${around}"`;
  }, []);

  const speakAnswer = useCallback((text: string) => {
    if (!text || typeof window === "undefined" || !("speechSynthesis" in window))
      return;
    const synth = window.speechSynthesis;
    synth.cancel();
    setAiSpeaking(true);
    // Speak sentence by sentence so it starts fast and feels natural.
    const parts = text
      .replace(/\s+/g, " ")
      .split(/(?<=[.!?])\s+/)
      .filter(Boolean);
    parts.forEach((p, i) => {
      const u = new SpeechSynthesisUtterance(p);
      u.rate = 1.02;
      if (voiceRef.current) u.voice = voiceRef.current;
      if (i === parts.length - 1) u.onend = () => setAiSpeaking(false);
      synth.speak(u);
    });
  }, []);

  const stopAnswer = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window)
      window.speechSynthesis.cancel();
    setAiSpeaking(false);
  }, []);

  const sendToAI = useCallback(
    async (text: string) => {
      const q = text.trim();
      if (!q) return;
      stopAnswer();
      setError("");
      const history: Msg[] = [...messagesRef.current, { role: "user", content: q }];
      setMessages(history);
      setThinking(true);
      setLiveAnswer("");
      try {
        const res = await fetch("/api/qsl-discuss", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history, place: describePlace() }),
        });
        if (!res.ok || !res.body) throw new Error("bad response");
        const reader = res.body.getReader();
        const dec = new TextDecoder();
        let acc = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += dec.decode(value, { stream: true });
          setLiveAnswer(acc);
        }
        const answer = acc.trim();
        setThinking(false);
        setLiveAnswer("");
        if (answer) {
          setMessages([...history, { role: "assistant", content: answer }]);
          speakAnswer(answer);
        }
      } catch {
        setThinking(false);
        setLiveAnswer("");
        setError("Couldn't reach the companion. Try again.");
      }
    },
    [describePlace, speakAnswer, stopAnswer]
  );

  /* ── push-to-talk ── */
  const startRec = useCallback(() => {
    const Ctor = recCtorRef.current;
    if (!Ctor || recording) return;
    stopAnswer();
    const rec = new Ctor();
    rec.lang = "en-US";
    rec.interimResults = true;
    rec.continuous = false;
    let finalText = "";
    rec.onresult = (e) => {
      let t = "";
      for (let i = 0; i < e.results.length; i += 1) {
        t += e.results[i][0]?.transcript ?? "";
      }
      finalText = t;
      setPartial(t);
    };
    rec.onerror = () => {};
    rec.onend = () => {
      setRecording(false);
      setPartial("");
      const t = finalText.trim();
      if (t) void sendToAI(t);
    };
    recRef.current = rec;
    setRecording(true);
    try {
      rec.start();
    } catch {
      setRecording(false);
    }
  }, [recording, sendToAI, stopAnswer]);

  const stopRec = useCallback(() => {
    try {
      recRef.current?.stop();
    } catch {
      /* no-op */
    }
  }, []);

  /* ── cleanup on unmount ── */
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window)
        window.speechSynthesis.cancel();
      try {
        recRef.current?.abort();
      } catch {
        /* no-op */
      }
    };
  }, []);

  /* ── derived render values ── */
  const ch = QSL_CHAPTERS[pos.ci];
  const nowText = ch?.segments[pos.si] ?? "";
  const totalSec = useMemo(() => flat.reduce((a, f) => a + f.sec, 0), [flat]);
  const doneSec = useMemo(() => {
    const idx = flatIndex(pos.ci, pos.si);
    return flat.slice(0, Math.max(0, idx)).reduce((a, f) => a + f.sec, 0);
  }, [flat, flatIndex, pos]);
  const pct = totalSec ? Math.min(100, (doneSec / totalSec) * 100) : 0;

  return (
    <section className="rounded-2xl border border-line bg-surface p-4 shadow-card sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-faint">
            <Volume2 size={13} strokeWidth={2.4} />
            Audio course · {pos.ci + 1} of {QSL_CHAPTERS.length}
          </p>
          <p className="truncate font-display text-[17px] font-bold text-ink">
            {ch?.label} — {ch?.title}
          </p>
        </div>
        {(aiSpeaking || playing) && (
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-teal-tint px-2 py-0.5 text-[11px] font-bold text-teal-dark">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-deep" />
            {aiSpeaking ? "Answering" : "Playing"}
          </span>
        )}
      </div>

      {/* now-reading line */}
      <p className="mb-3 line-clamp-2 min-h-[2.5rem] text-[13.5px] leading-snug text-muted">
        {nowText}
      </p>

      {/* progress bar */}
      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-mist">
        <div
          className="h-full rounded-full bg-teal-deep transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* transport controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => skip(-30)}
          disabled={!ttsOK}
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-mist disabled:opacity-40"
          aria-label="Rewind 30 seconds"
        >
          <RotateCcw size={20} strokeWidth={2.2} />
        </button>
        <button
          onClick={togglePlay}
          disabled={!ttsOK}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-gold shadow-lift transition-transform hover:scale-105 disabled:opacity-40"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <Pause size={24} strokeWidth={2.4} />
          ) : (
            <Play size={24} strokeWidth={2.4} className="ml-0.5" />
          )}
        </button>
        <button
          onClick={() => skip(30)}
          disabled={!ttsOK}
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-mist disabled:opacity-40"
          aria-label="Fast-forward 30 seconds"
        >
          <RotateCw size={20} strokeWidth={2.2} />
        </button>
      </div>

      {/* chapter scrubber */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
        {QSL_CHAPTERS.map((c, i) => (
          <button
            key={c.id}
            onClick={() => jumpChapter(i)}
            title={`${c.label} — ${c.title}`}
            className={cn(
              "h-6 min-w-6 rounded-md px-1.5 text-[11px] font-bold transition-colors",
              i === pos.ci
                ? "bg-ink text-gold"
                : "bg-mist text-faint hover:bg-line hover:text-ink"
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {!ttsOK && (
        <p className="mt-3 text-center text-[12px] text-muted">
          This browser can&apos;t read the course aloud. Try Chrome or Edge for the
          audio player.
        </p>
      )}

      {/* discussion toggle */}
      <div className="mt-4 border-t border-line pt-4">
        {mode === "listen" ? (
          <button
            onClick={enterDiscuss}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold-soft py-2.5 text-[14px] font-bold text-gold-deep transition-colors hover:brightness-95"
          >
            <MessagesSquare size={17} strokeWidth={2.3} />
            Discuss this with the AI
          </button>
        ) : (
          <DiscussionPanel
            sttOK={sttOK}
            recording={recording}
            partial={partial}
            thinking={thinking}
            liveAnswer={liveAnswer}
            aiSpeaking={aiSpeaking}
            messages={messages}
            typed={typed}
            error={error}
            chapterTitle={ch?.label ?? ""}
            onTyped={setTyped}
            onStartRec={startRec}
            onStopRec={stopRec}
            onSendTyped={() => {
              const t = typed;
              setTyped("");
              void sendToAI(t);
            }}
            onStopAnswer={stopAnswer}
            onResume={resumeCourse}
          />
        )}
      </div>
    </section>
  );
}

/* ── Discussion panel (push-to-talk + transcript) ───────────────────────── */

function DiscussionPanel(props: {
  sttOK: boolean;
  recording: boolean;
  partial: string;
  thinking: boolean;
  liveAnswer: string;
  aiSpeaking: boolean;
  messages: Msg[];
  typed: string;
  error: string;
  chapterTitle: string;
  onTyped: (v: string) => void;
  onStartRec: () => void;
  onStopRec: () => void;
  onSendTyped: () => void;
  onStopAnswer: () => void;
  onResume: () => void;
}) {
  const {
    sttOK,
    recording,
    partial,
    thinking,
    liveAnswer,
    aiSpeaking,
    messages,
    typed,
    error,
    chapterTitle,
    onTyped,
    onStartRec,
    onStopRec,
    onSendTyped,
    onStopAnswer,
    onResume,
  } = props;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-violet-deep">
          <MessagesSquare size={13} strokeWidth={2.4} />
          Discussion · paused at {chapterTitle}
        </p>
        <button
          onClick={onResume}
          className="flex items-center gap-1 rounded-full bg-ink px-2.5 py-1 text-[11px] font-bold text-gold transition-transform hover:scale-105"
        >
          <Play size={11} strokeWidth={2.6} className="ml-0.5" />
          Resume course
        </button>
      </div>

      {/* conversation */}
      {(messages.length > 0 || thinking || liveAnswer) && (
        <div className="max-h-56 space-y-2 overflow-y-auto rounded-xl bg-mist/60 p-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "max-w-[88%] rounded-2xl px-3 py-1.5 text-[13.5px] leading-snug",
                m.role === "user"
                  ? "ml-auto bg-ink text-white"
                  : "bg-surface text-ink shadow-card"
              )}
            >
              {m.content}
            </div>
          ))}
          {thinking && !liveAnswer && (
            <div className="flex items-center gap-1.5 text-[13px] text-muted">
              <Loader2 size={14} className="animate-spin" />
              thinking…
            </div>
          )}
          {liveAnswer && (
            <div className="max-w-[88%] rounded-2xl bg-surface px-3 py-1.5 text-[13.5px] leading-snug text-ink shadow-card">
              {liveAnswer}
            </div>
          )}
        </div>
      )}

      {/* live transcript while holding */}
      {recording && (
        <p className="rounded-lg bg-violet-soft px-3 py-2 text-[13.5px] italic text-violet-dark">
          {partial || "Listening…"}
        </p>
      )}

      {/* push-to-talk */}
      {sttOK ? (
        <button
          onPointerDown={(e) => {
            e.preventDefault();
            onStartRec();
          }}
          onPointerUp={onStopRec}
          onPointerLeave={() => recording && onStopRec()}
          onContextMenu={(e) => e.preventDefault()}
          className={cn(
            "flex w-full select-none items-center justify-center gap-2 rounded-xl py-3.5 text-[15px] font-bold transition-colors",
            recording
              ? "bg-danger text-white"
              : "bg-violet text-white hover:brightness-105"
          )}
          style={{ touchAction: "none" }}
        >
          <Mic size={18} strokeWidth={2.4} />
          {recording ? "Listening — release to send" : "Press & hold to talk"}
        </button>
      ) : (
        <p className="text-center text-[12px] text-muted">
          Voice input isn&apos;t available in this browser — type your question
          below instead.
        </p>
      )}

      {/* typed fallback (always available) */}
      <div className="flex items-center gap-2">
        <input
          value={typed}
          onChange={(e) => onTyped(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && typed.trim()) onSendTyped();
          }}
          placeholder="…or type a question"
          className="min-w-0 flex-1 rounded-xl border border-line bg-surface px-3 py-2 text-[14px] text-ink outline-none placeholder:text-faint focus:border-violet"
        />
        <button
          onClick={() => typed.trim() && onSendTyped()}
          disabled={!typed.trim()}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet text-white transition-colors hover:brightness-105 disabled:opacity-40"
          aria-label="Send question"
        >
          <Send size={16} strokeWidth={2.3} />
        </button>
      </div>

      {aiSpeaking && (
        <button
          onClick={onStopAnswer}
          className="flex w-full items-center justify-center gap-1.5 text-[12px] font-semibold text-muted hover:text-ink"
        >
          <X size={13} strokeWidth={2.4} />
          Stop the answer
        </button>
      )}

      {error && <p className="text-center text-[12px] text-danger">{error}</p>}
    </div>
  );
}
