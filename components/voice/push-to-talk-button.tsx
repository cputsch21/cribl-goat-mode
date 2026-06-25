"use client";

import { useCallback, useEffect, useRef } from "react";
import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  /** Whether the mic is currently open (the caller's hold state). */
  talking: boolean;
  /** Called when the user presses/holds — open the mic for this turn. */
  onStart: () => void;
  /** Called when the user releases — close the mic and send the turn. */
  onStop: () => void;
  disabled?: boolean;
  className?: string;
};

/**
 * Hold-to-talk control. The mic is gated entirely by this button — the caller
 * keeps it muted unless `talking` is true — so the agent never tries to guess
 * (via voice-activity detection) when a turn starts or ends. Press and hold
 * (mouse, touch, or the Space/Enter key) to open the mic; release to close it
 * and send that turn to the agent.
 *
 * A release ANYWHERE ends the turn — off the button, on tab blur, or on
 * unmount — so a held turn can never get stuck with the mic open.
 */
export function PushToTalkButton({
  talking,
  onStart,
  onStop,
  disabled = false,
  className,
}: Props) {
  const heldRef = useRef(false);
  // Mirror the latest props into refs so the window listeners below can stay
  // stable (registered once) without the caller having to memoize callbacks.
  const onStartRef = useRef(onStart);
  const onStopRef = useRef(onStop);
  const disabledRef = useRef(disabled);
  onStartRef.current = onStart;
  onStopRef.current = onStop;
  disabledRef.current = disabled;

  const start = useCallback(() => {
    if (disabledRef.current || heldRef.current) return;
    heldRef.current = true;
    onStartRef.current();
  }, []);

  const stop = useCallback(() => {
    if (!heldRef.current) return;
    heldRef.current = false;
    onStopRef.current();
  }, []);

  // Catch the release no matter where it lands, and un-gate the mic on unmount.
  useEffect(() => {
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
    window.addEventListener("blur", stop);
    return () => {
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
      window.removeEventListener("blur", stop);
      stop();
    };
  }, [stop]);

  return (
    <button
      type="button"
      disabled={disabled}
      onPointerDown={(e) => {
        e.preventDefault();
        start();
      }}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          start();
        }
      }}
      onKeyUp={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          stop();
        }
      }}
      onContextMenu={(e) => e.preventDefault()}
      aria-pressed={talking}
      className={cn(
        "flex w-full touch-none select-none items-center justify-center gap-2 rounded-xl py-4 font-semibold transition-all duration-150 ease-out",
        talking
          ? "scale-[0.99] bg-danger text-white ring-4 ring-danger/25"
          : "bg-teal text-ink active:scale-[0.99]",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <Mic size={18} />
      {talking ? "Recording — release to send" : "Hold to talk"}
    </button>
  );
}
