/**
 * LocalStorage wrapper per brief Section 19.7 (storage envelope) and 19.4
 * (long-session UX). All writes are version-tagged. Reads tolerate corrupt
 * JSON and missing keys.
 */

"use client";

import type {
  Mode,
  SessionIndexEntry,
  SessionPayload,
} from "./types";

const SCHEMA_VERSION = 1;

const KEYS = {
  session: (id: string) => `signs:v1:session:${id}`,
  result: (id: string) => `signs:v1:result:${id}`,
  index: () => `signs:v1:index`,
} as const;

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readJson<T>(key: string): T | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    if (
      err instanceof DOMException &&
      (err.name === "QuotaExceededError" || err.code === 22)
    ) {
      // Re-throw so callers can show the quota modal (Section 19.7).
      throw err;
    }
  }
}

function removeKey(key: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* noop */
  }
}

// ── Session lifecycle ───────────────────────────────────────

export function createSessionId(): string {
  // sortable + unique enough for client-only use
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `s_${ts}${rand}`;
}

export function loadSession(id: string): SessionPayload | null {
  const session = readJson<SessionPayload>(KEYS.session(id));
  if (!session) return null;
  if (session.schemaVersion !== SCHEMA_VERSION) return null;
  return session;
}

export function saveSession(session: SessionPayload): void {
  writeJson(KEYS.session(session.sessionId), session);
  upsertIndex({
    sessionId: session.sessionId,
    mode: session.mode,
    createdAt: session.createdAt,
    updatedAt: session.updatedAt,
    completedAt: session.completedAt,
    headline: indexHeadline(session),
  });
}

export function clearSession(id: string): void {
  removeKey(KEYS.session(id));
  removeKey(KEYS.result(id));
  removeFromIndex(id);
}

export function clearAll(): void {
  if (!isBrowser()) return;
  const ix = loadIndex();
  for (const entry of ix) {
    removeKey(KEYS.session(entry.sessionId));
    removeKey(KEYS.result(entry.sessionId));
  }
  removeKey(KEYS.index());
}

// ── Index ───────────────────────────────────────────────────

export function loadIndex(): SessionIndexEntry[] {
  return readJson<SessionIndexEntry[]>(KEYS.index()) ?? [];
}

function upsertIndex(entry: SessionIndexEntry): void {
  const ix = loadIndex();
  const existing = ix.findIndex((e) => e.sessionId === entry.sessionId);
  if (existing >= 0) {
    ix[existing] = entry;
  } else {
    ix.push(entry);
  }
  writeJson(KEYS.index(), ix);
}

function removeFromIndex(id: string): void {
  const ix = loadIndex().filter((e) => e.sessionId !== id);
  writeJson(KEYS.index(), ix);
}

// ── Heuristic for landing-page recents ──────────────────────

function indexHeadline(session: SessionPayload): string | undefined {
  if (!session.completedAt) return "In progress";
  const result = session.result;
  if (!result) return undefined;
  if ("archetypeId" in result) {
    if (result.isWorkingHypothesis) return "Working Hypothesis";
    if (result.isMixedPattern) return "Mixed Pattern";
    if (result.archetypeId) return `Archetype identified`;
    return "Pattern result";
  }
  if (result.isHealthy) return "Baseline Healthy Signal";
  return result.scsName;
}

// ── Empty state helper ──────────────────────────────────────

export function isMissing(id: string): boolean {
  return isBrowser() && loadSession(id) === null;
}

// ── New session factory ─────────────────────────────────────

export function newSession(mode: Mode): SessionPayload {
  const now = new Date().toISOString();
  const session: SessionPayload = {
    schemaVersion: SCHEMA_VERSION,
    sessionId: createSessionId(),
    mode,
    createdAt: now,
    updatedAt: now,
    completedAt: null,
    answers: {},
    decisions: mode === "spot_pattern" ? [] : undefined,
    spansMultipleManagers: undefined,
    result: null,
  };
  saveSession(session);
  return session;
}
