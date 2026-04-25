"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SessionGate from "@/components/signs/SessionGate";
import {
  DECISION_TYPE_LABEL,
  GAP_SIZE_LABEL,
  INTENT_LABEL,
} from "@/lib/signs/copy";
import { isCompletePattern } from "@/lib/signs/logic";
import { loadSession, saveSession } from "@/lib/signs/storage";
import type {
  DecisionEntry,
  DecisionType,
  GapSize,
  Intent,
  SessionPayload,
} from "@/lib/signs/types";

const MIN_DECISIONS = 3;
const MAX_DECISIONS = 10;

export default function DecisionsList() {
  const router = useRouter();
  const params = useParams<{ sessionId: string }>();
  const sessionId = params.sessionId;

  const [session, setSession] = useState<SessionPayload | null | undefined>(
    undefined,
  );

  useEffect(() => {
    const s = loadSession(sessionId);
    if (!s || s.mode !== "spot_pattern") {
      setSession(null);
      return;
    }
    setSession(s);
  }, [sessionId]);

  if (session === undefined) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <p className="text-[14px] text-muted">Loading…</p>
      </main>
    );
  }
  if (!session) return <SessionGate />;

  const decisions = session.decisions ?? [];
  const canAdd = decisions.length < MAX_DECISIONS;
  const ready = isCompletePattern(session);

  function addDecision() {
    if (!canAdd) return;
    const updated: SessionPayload = {
      ...session!,
      updatedAt: new Date().toISOString(),
      decisions: [...decisions, { inputs: {} }],
    };
    saveSession(updated);
    setSession(updated);
    router.replace(
      `/spot-pattern/flow/${sessionId}/decisions/${decisions.length}`,
    );
  }

  function removeDecision(index: number) {
    const next = decisions.filter((_, i) => i !== index);
    const updated: SessionPayload = {
      ...session!,
      updatedAt: new Date().toISOString(),
      decisions: next,
    };
    setSession(updated);
    saveSession(updated);
  }

  function submit() {
    const updated: SessionPayload = {
      ...session!,
      updatedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    };
    saveSession(updated);
    router.replace(`/spot-pattern/results/${sessionId}`);
  }

  return (
    <main className="flex-1">
      <section className="max-w-3xl mx-auto px-6 md:px-10 pt-16 md:pt-20 pb-20">
        <span className="block text-[11px] tracking-[0.25em] uppercase text-accent mb-4">
          Spot the Pattern · Decisions
        </span>
        <h1 className="font-medium text-3xl md:text-4xl leading-tight tracking-tight text-foreground mb-3">
          Add the decisions you want to read together.
        </h1>
        <p className="text-[15px] leading-relaxed text-muted mb-2">
          Three to ten decisions. Five or more for a named archetype. Three or
          four lands as a Working Hypothesis instead.
        </p>
        <p className="text-[13px] leading-relaxed text-muted mb-10">
          You currently have {decisions.length} decision
          {decisions.length === 1 ? "" : "s"}.
        </p>

        <ul className="space-y-3 mb-8">
          {decisions.map((d, i) => (
            <li
              key={i}
              className="rounded-xl border border-hairline bg-surface/40 p-5 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="text-[12px] uppercase tracking-[0.15em] text-muted mb-0.5">
                  Decision {i + 1}
                </p>
                <p className="text-[15px] text-foreground truncate">
                  {summary(d)}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href={`/spot-pattern/flow/${sessionId}/decisions/${i}`}
                  className="text-[13px] text-accent hover:text-accent-strong transition-colors"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => removeDecision(i)}
                  className="text-[13px] text-muted hover:text-foreground transition-colors"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={addDecision}
          disabled={!canAdd}
          className="w-full rounded-xl border border-dashed border-hairline bg-surface/20 px-5 py-6 text-[14px] text-foreground hover:border-accent/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors mb-8"
        >
          + Add decision
        </button>

        <div className="flex items-center justify-between">
          <Link
            href={`/spot-pattern/flow/${sessionId}/meta`}
            className="text-[13px] text-muted hover:text-foreground transition-colors"
          >
            ← Back
          </Link>
          <button
            type="button"
            onClick={submit}
            disabled={!ready}
            className="btn btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
          >
            See the pattern
          </button>
        </div>
        {!ready && decisions.length >= MIN_DECISIONS && (
          <p className="text-[13px] text-muted mt-4 text-right">
            Some decisions are missing required structured inputs.
          </p>
        )}
        {decisions.length < MIN_DECISIONS && (
          <p className="text-[13px] text-muted mt-4 text-right">
            Add at least {MIN_DECISIONS} decisions to continue.
          </p>
        )}
      </section>
    </main>
  );
}

function summary(d: DecisionEntry): string {
  const dt = d.inputs.decision_type as DecisionType | undefined;
  const intent = d.inputs.intent as Intent | undefined;
  const gap = d.inputs.gap_size as GapSize | undefined;
  if (!dt && !intent) return "Not yet started.";
  const parts: string[] = [];
  if (dt) parts.push(DECISION_TYPE_LABEL[dt]);
  if (intent) parts.push(`Intent: ${INTENT_LABEL[intent]}`);
  if (gap) parts.push(`Gap: ${GAP_SIZE_LABEL[gap]}`);
  return parts.join(" · ");
}
