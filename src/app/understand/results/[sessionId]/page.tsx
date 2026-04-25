"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import CoachingBlock from "@/components/signs/CoachingBlock";
import DimensionsBreakdown from "@/components/signs/DimensionsBreakdown";
import ResultsHero from "@/components/signs/ResultsHero";
import ScenarioBlock from "@/components/signs/ScenarioBlock";
import SessionGate from "@/components/signs/SessionGate";
import WhatsNext from "@/components/signs/WhatsNext";
import { BASELINE_HEALTHY, INTENT_LABEL, RECOMMENDATION_LABEL } from "@/lib/signs/copy";
import {
  computeSingle,
  inputsForSingle,
  isCompleteSingle,
} from "@/lib/signs/logic";
import { getScenario } from "@/lib/signs/scenarios";
import { loadSession } from "@/lib/signs/storage";
import type { DecisionResult, SessionPayload } from "@/lib/signs/types";

export default function UnderstandResults() {
  const params = useParams<{ sessionId: string }>();
  const sessionId = params.sessionId;

  const [session, setSession] = useState<SessionPayload | null | undefined>(
    undefined,
  );

  useEffect(() => {
    setSession(loadSession(sessionId));
  }, [sessionId]);

  const computed = useMemo(() => {
    if (!session || session.mode !== "understand") return null;
    if (!isCompleteSingle(session)) return null;
    return {
      result: computeSingle(session),
      inputs: inputsForSingle(session),
    };
  }, [session]);

  if (session === undefined) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <p className="text-[14px] text-muted">Loading…</p>
      </main>
    );
  }
  if (!session) return <SessionGate />;
  if (!computed) {
    return (
      <SessionGate message="This session is not complete yet. Open it from the landing page to keep going." />
    );
  }

  const { result, inputs } = computed;
  const intentLabel = inputs.intent ? INTENT_LABEL[inputs.intent] : "your intent";

  if (result.isHealthy) {
    return <HealthyResults result={result} intentLabel={intentLabel} />;
  }

  const primaryId = result.primaryScenarioId!;
  const primary = getScenario(primaryId);
  const sentence = primary.sentenceCompletion.replace(
    /{intent}/g,
    intentLabel,
  );
  const shareSubject = `SIGNS Toolkit · ${primary.name}`;
  const shareBody = buildShareBody(intentLabel, primary, result, sentence);

  return (
    <main className="flex-1">
      <section className="max-w-3xl mx-auto px-6 md:px-10 pt-16 md:pt-20 pb-24">
        <ResultsHero
          eyebrow="Understand What Happened · Result"
          takeaway={primary.takeaway}
          scsLabel={`${result.scs} — ${result.scsName}`}
        />

        <div className="rounded-xl border border-hairline bg-surface/40 p-6 md:p-7 mb-12">
          <p className="text-[12px] uppercase tracking-[0.15em] text-accent mb-2">
            Sentence completion
          </p>
          <p className="text-[16px] md:text-[17px] leading-relaxed text-foreground">
            {sentence}
          </p>
        </div>

        <ScenarioBlock
          primaryId={primaryId}
          secondaryIds={result.secondaryScenarioIds}
          recommendation={result.recommendation}
        />

        <DimensionsBreakdown inputs={inputs} />

        <CoachingBlock scenarioId={primaryId} />

        <WhatsNext shareSubject={shareSubject} shareBody={shareBody} />
      </section>
    </main>
  );
}

function HealthyResults({
  result,
  intentLabel,
}: {
  result: DecisionResult;
  intentLabel: string;
}) {
  const sentence = `You intend to signal ${intentLabel}, and this will likely be received as intended because no risk flags triggered in the engine.`;
  const shareSubject = "SIGNS Toolkit · Baseline Healthy Signal";
  const shareBody = `Understand What Happened result\n\n${BASELINE_HEALTHY.hero}\n\nSCS: ${result.scs} — ${result.scsName}\n\n${sentence}\n\n${BASELINE_HEALTHY.reinforcement}\n\n— signs.arminoorata.com`;
  return (
    <main className="flex-1">
      <section className="max-w-3xl mx-auto px-6 md:px-10 pt-16 md:pt-20 pb-24">
        <ResultsHero
          eyebrow="Understand What Happened · Result"
          takeaway={BASELINE_HEALTHY.hero}
          scsLabel={`${result.scs} — ${result.scsName}`}
        />
        <div className="rounded-xl border border-hairline bg-surface/40 p-6 md:p-7 mb-8">
          <p className="text-[12px] uppercase tracking-[0.15em] text-accent mb-2">
            Sentence completion
          </p>
          <p className="text-[16px] md:text-[17px] leading-relaxed text-foreground">
            {sentence}
          </p>
        </div>
        <div className="rounded-xl border border-accent/40 bg-accent-soft p-6 md:p-7">
          <p className="text-[12px] uppercase tracking-[0.15em] text-accent mb-2">
            Reinforcement
          </p>
          <p className="text-[15px] md:text-[16px] leading-relaxed text-foreground">
            {BASELINE_HEALTHY.reinforcement}
          </p>
        </div>
        <WhatsNext shareSubject={shareSubject} shareBody={shareBody} />
      </section>
    </main>
  );
}

function buildShareBody(
  intentLabel: string,
  primary: ReturnType<typeof getScenario>,
  result: DecisionResult,
  sentence: string,
): string {
  return [
    `Understand What Happened result`,
    ``,
    `Takeaway: ${primary.takeaway}`,
    `SCS: ${result.scs} — ${result.scsName}`,
    `Primary scenario: ${primary.name}`,
    ``,
    sentence,
    ``,
    `Recommendation: ${RECOMMENDATION_LABEL[result.recommendation]}`,
    ``,
    `— signs.arminoorata.com`,
  ].join("\n");
}
