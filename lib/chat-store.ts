"use client";

import { useSyncExternalStore } from "react";
import type { UIMessage } from "ai";

export type ChatMode = "claude" | "coach" | "kat" | "cam";

export interface ChatThread {
  id: string;
  mode: ChatMode;
  title: string;
  messages: UIMessage[];
  createdAt: number;
  updatedAt: number;
}

const KEY = "goat-chats-v1";

// Stable empty reference so useSyncExternalStore's snapshots stay cached.
const EMPTY: ChatThread[] = [];

let cacheRaw: string | null = null;
let cacheParsed: ChatThread[] = EMPTY;

function read(): ChatThread[] {
  if (typeof window === "undefined") return EMPTY;
  const raw = window.localStorage.getItem(KEY);
  if (raw === cacheRaw) return cacheParsed;
  cacheRaw = raw;
  try {
    cacheParsed = raw ? (JSON.parse(raw) as ChatThread[]) : [];
  } catch {
    cacheParsed = [];
  }
  return cacheParsed;
}

function write(next: ChatThread[]) {
  cacheRaw = JSON.stringify(next);
  cacheParsed = next;
  try {
    window.localStorage.setItem(KEY, cacheRaw);
  } catch {
    // Quota exceeded (e.g. a thread with large attachments) — keep it in memory.
  }
  window.dispatchEvent(new Event("goat-chats"));
}

function subscribe(cb: () => void) {
  window.addEventListener("goat-chats", cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener("goat-chats", cb);
    window.removeEventListener("storage", cb);
  };
}

/** All saved conversations, newest activity first. */
export function useChats(): ChatThread[] {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function newChatId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `c_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
  }
}

function deriveTitle(messages: UIMessage[]): string {
  const firstUser = messages.find((m) => m.role === "user");
  const text = firstUser
    ? firstUser.parts
        .map((p) => (p.type === "text" ? p.text : ""))
        .join(" ")
        .trim()
    : "";
  if (!text) return "New chat";
  return text.length > 48 ? `${text.slice(0, 48)}…` : text;
}

/** Insert or update a thread. Empty threads are never persisted. */
export function saveThread(id: string, mode: ChatMode, messages: UIMessage[]) {
  if (typeof window === "undefined" || messages.length === 0) return;
  const threads = read();
  const now = Date.now();
  const existing = threads.find((t) => t.id === id);
  const title = deriveTitle(messages);
  if (existing) {
    write(
      threads.map((t) =>
        t.id === id ? { ...t, mode, title, messages, updatedAt: now } : t
      )
    );
  } else {
    write([
      { id, mode, title, messages, createdAt: now, updatedAt: now },
      ...threads,
    ]);
  }
}

let lastDeleted: ChatThread | null = null;

export function deleteThread(id: string) {
  const threads = read();
  lastDeleted = threads.find((t) => t.id === id) ?? null;
  write(threads.filter((t) => t.id !== id));
}

/** Restore the most recently deleted thread (the undo safety net). */
export function undoDeleteThread() {
  if (!lastDeleted) return;
  write([lastDeleted, ...read()]);
  lastDeleted = null;
}

export function hasDeleted(): boolean {
  return lastDeleted !== null;
}
