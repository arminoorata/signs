"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import QuestionCard from "@/components/signs/QuestionCard";
import SessionGate from "@/components/signs/SessionGate";
import { MODE_3_META_QUESTION } from "@/lib/signs/questions";
import { loadSession, saveSession } from "@/lib/signs/storage";
import type { SessionPayload, SpansMultipleManagers } from "@/lib/signs/types";

export default function SpotPatternMeta() {
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

  const value = session.spansMultipleManagers;

  function setValue(next: string) {
    const updated: SessionPayload = {
      ...session!,
      updatedAt: new Date().toISOString(),
      spansMultipleManagers: next as SpansMultipleManagers,
    };
    setSession(updated);
    saveSession(updated);
  }

  function next() {
    if (!value) return;
    router.replace(`/spot-pattern/flow/${sessionId}/decisions`);
  }

  return (
    <main className="flex-1">
      <section className="max-w-3xl mx-auto px-6 md:px-10 pt-16 md:pt-20 pb-20">
        <span className="block text-[11px] tracking-[0.25em] uppercase text-accent mb-4">
          Spot the Pattern · Setup
        </span>
        <h1 className="font-medium text-3xl md:text-4xl leading-tight tracking-tight text-foreground mb-3">
          One question before we get into the decisions.
        </h1>
        <p className="text-[15px] leading-relaxed text-muted mb-10">
          The answer shapes which organizational archetypes the engine can
          surface.
        </p>
        <QuestionCard
          question={MODE_3_META_QUESTION}
          value={value}
          onChange={setValue}
        />
        <div className="flex items-center justify-between mt-8">
          <Link
            href="/"
            className="text-[13px] text-muted hover:text-foreground transition-colors"
          >
            ← Cancel
          </Link>
          <button
            type="button"
            onClick={next}
            disabled={!value}
            className="btn btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Add decisions
          </button>
        </div>
      </section>
    </main>
  );
}
