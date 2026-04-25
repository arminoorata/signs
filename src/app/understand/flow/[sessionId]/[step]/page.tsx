"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProgressBar from "@/components/signs/ProgressBar";
import QuestionCard from "@/components/signs/QuestionCard";
import SessionGate from "@/components/signs/SessionGate";
import { isCompleteSingle } from "@/lib/signs/logic";
import { MODE_2_QUESTIONS } from "@/lib/signs/questions";
import { loadSession, saveSession } from "@/lib/signs/storage";
import type { SessionPayload } from "@/lib/signs/types";

export default function UnderstandFlow() {
  const router = useRouter();
  const params = useParams<{ sessionId: string; step: string }>();
  const sessionId = params.sessionId;
  const stepIndex = Math.max(1, parseInt(params.step, 10) || 1);

  const [session, setSession] = useState<SessionPayload | null | undefined>(
    undefined,
  );

  useEffect(() => {
    const s = loadSession(sessionId);
    if (!s || s.mode !== "understand") {
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
  if (session === null) return <SessionGate />;

  const total = MODE_2_QUESTIONS.length;
  if (stepIndex > total) {
    return (
      <ReviewStep
        session={session}
        onSubmit={() => {
          const updated: SessionPayload = {
            ...session,
            updatedAt: new Date().toISOString(),
            completedAt: new Date().toISOString(),
          };
          saveSession(updated);
          router.replace(`/understand/results/${sessionId}`);
        }}
        onJumpTo={(i) => router.replace(`/understand/flow/${sessionId}/${i + 1}`)}
      />
    );
  }

  const question = MODE_2_QUESTIONS[stepIndex - 1];
  const value =
    typeof session.answers?.[question.id] === "string"
      ? (session.answers?.[question.id] as string)
      : undefined;

  function setValue(next: string) {
    const updated: SessionPayload = {
      ...session!,
      updatedAt: new Date().toISOString(),
      answers: { ...session!.answers, [question.id]: next },
    };
    setSession(updated);
    saveSession(updated);
  }

  function next() {
    if (question.required && !value) return;
    router.replace(`/understand/flow/${sessionId}/${stepIndex + 1}`);
  }

  function back() {
    if (stepIndex <= 1) return;
    router.replace(`/understand/flow/${sessionId}/${stepIndex - 1}`);
  }

  return (
    <main className="flex-1">
      <section className="max-w-3xl mx-auto px-6 md:px-10 pt-16 md:pt-20 pb-20">
        <ProgressBar
          current={stepIndex}
          total={total}
          label="Understand What Happened"
        />
        <QuestionCard
          question={question}
          value={value}
          onChange={setValue}
        />
        <div className="flex items-center justify-between mt-8">
          <button
            type="button"
            onClick={back}
            disabled={stepIndex <= 1}
            className="text-[13px] text-muted hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ← Back
          </button>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-[13px] text-muted hover:text-foreground transition-colors"
            >
              Save & exit
            </Link>
            <button
              type="button"
              onClick={next}
              disabled={question.required && !value}
              className="btn btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {stepIndex === total ? "Review" : "Next"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

interface ReviewStepProps {
  session: SessionPayload;
  onSubmit: () => void;
  onJumpTo: (questionIndex: number) => void;
}

function ReviewStep({ session, onSubmit, onJumpTo }: ReviewStepProps) {
  const complete = isCompleteSingle(session);
  return (
    <main className="flex-1">
      <section className="max-w-3xl mx-auto px-6 md:px-10 pt-16 md:pt-20 pb-20">
        <span className="block text-[11px] tracking-[0.25em] uppercase text-accent mb-4">
          Review
        </span>
        <h1 className="font-medium text-3xl md:text-4xl leading-tight tracking-tight text-foreground mb-3">
          Take one last look before you see your results.
        </h1>
        <p className="text-[15px] leading-relaxed text-muted mb-10">
          Click any answer to jump back. Required questions are marked.
        </p>
        <ol className="space-y-4 mb-12">
          {MODE_2_QUESTIONS.map((q, i) => {
            const v = session.answers?.[q.id];
            const display =
              typeof v === "string"
                ? v.length > 80
                  ? v.slice(0, 80) + "…"
                  : v
                : "—";
            const labelOption =
              q.options?.find((o) => o.value === v)?.label ?? display;
            return (
              <li key={q.id}>
                <button
                  type="button"
                  onClick={() => onJumpTo(i)}
                  className="w-full text-left rounded-lg border border-hairline bg-surface/40 px-5 py-4 hover:border-accent/40 transition-colors"
                >
                  <p className="text-[12px] uppercase tracking-[0.15em] text-muted mb-1">
                    {q.section} · {q.required ? "Required" : "Optional"}
                  </p>
                  <p className="text-[14px] leading-snug text-foreground/80 mb-1.5">
                    {q.prompt}
                  </p>
                  <p className="text-[15px] text-foreground">
                    {q.type === "open" ? display : labelOption}
                  </p>
                </button>
              </li>
            );
          })}
        </ol>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => onJumpTo(MODE_2_QUESTIONS.length - 1)}
            className="text-[13px] text-muted hover:text-foreground transition-colors"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={!complete}
            className="btn btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
          >
            See my results
          </button>
        </div>
        {!complete && (
          <p className="text-[13px] text-muted mt-4 text-right">
            Some required questions are still empty.
          </p>
        )}
      </section>
    </main>
  );
}
