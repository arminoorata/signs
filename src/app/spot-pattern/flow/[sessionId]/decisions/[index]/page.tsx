"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import QuestionCard from "@/components/signs/QuestionCard";
import SessionGate from "@/components/signs/SessionGate";
import { MODE_3_PER_DECISION_QUESTIONS } from "@/lib/signs/questions";
import { loadSession, saveSession } from "@/lib/signs/storage";
import type { DecisionEntry, SessionPayload } from "@/lib/signs/types";

/**
 * Edit a single decision in a Mode 3 set. Renders the per-decision
 * question list inline (no multi-step pagination — these are short, and
 * pagination would feel heavy for 11 fields per decision).
 */
export default function EditDecision() {
  const router = useRouter();
  const params = useParams<{ sessionId: string; index: string }>();
  const sessionId = params.sessionId;
  const idx = parseInt(params.index, 10);

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
  const decision = decisions[idx];
  if (!decision) {
    return (
      <SessionGate message="That decision is no longer in this set. Return to the list." />
    );
  }

  function setValue(qid: string, val: string) {
    const q = MODE_3_PER_DECISION_QUESTIONS.find((x) => x.id === qid);
    if (!q) return;
    const key = q.inputKey ?? qid;
    let updatedDecision: DecisionEntry;
    if (q.type === "open") {
      updatedDecision = {
        ...decision!,
        openText: { ...decision!.openText, [qid]: val },
      };
    } else {
      updatedDecision = {
        ...decision!,
        inputs: { ...decision!.inputs, [key]: val } as DecisionEntry["inputs"],
      };
    }
    const next = [...decisions];
    next[idx] = updatedDecision;
    const updated: SessionPayload = {
      ...session!,
      updatedAt: new Date().toISOString(),
      decisions: next,
    };
    setSession(updated);
    saveSession(updated);
  }

  function getValue(qid: string): string | undefined {
    const q = MODE_3_PER_DECISION_QUESTIONS.find((x) => x.id === qid);
    if (!q) return undefined;
    if (q.type === "open") {
      const v = decision!.openText?.[qid as keyof DecisionEntry["openText"]];
      return typeof v === "string" ? v : undefined;
    }
    const key = q.inputKey ?? qid;
    const v = (decision!.inputs as Record<string, string | undefined>)[key];
    return typeof v === "string" ? v : undefined;
  }

  const required = MODE_3_PER_DECISION_QUESTIONS.filter((q) => q.required);
  const complete = required.every((q) => {
    const v = getValue(q.id);
    return typeof v === "string" && v.length > 0;
  });

  return (
    <main className="flex-1">
      <section className="max-w-3xl mx-auto px-6 md:px-10 pt-16 md:pt-20 pb-20">
        <span className="block text-[11px] tracking-[0.25em] uppercase text-accent mb-4">
          Decision {idx + 1}
        </span>
        <h1 className="font-medium text-3xl md:text-4xl leading-tight tracking-tight text-foreground mb-3">
          Tell me about this decision.
        </h1>
        <p className="text-[15px] leading-relaxed text-muted mb-10">
          Required fields drive the engine. Optional notes sharpen the pattern
          read.
        </p>

        <div className="space-y-5">
          {MODE_3_PER_DECISION_QUESTIONS.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              value={getValue(q.id)}
              onChange={(v) => setValue(q.id, v)}
            />
          ))}
        </div>

        <div className="flex items-center justify-between mt-8">
          <Link
            href={`/spot-pattern/flow/${sessionId}/decisions`}
            className="text-[13px] text-muted hover:text-foreground transition-colors"
          >
            ← Back to set
          </Link>
          <button
            type="button"
            onClick={() =>
              router.replace(`/spot-pattern/flow/${sessionId}/decisions`)
            }
            disabled={!complete}
            className="btn btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Save & continue
          </button>
        </div>
      </section>
    </main>
  );
}
