"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import SessionGate from "@/components/signs/SessionGate";
import WhatsNext from "@/components/signs/WhatsNext";
import { ARCHETYPES } from "@/lib/signs/archetypes";
import {
  CLARITY_LABELS,
  CONSISTENCY_LABELS,
  DECISION_TYPE_LABEL,
  INTENT_LABEL,
  SCS_NAMES,
} from "@/lib/signs/copy";
import { computePattern, isCompletePattern } from "@/lib/signs/logic";
import { getScenario } from "@/lib/signs/scenarios";
import { loadSession } from "@/lib/signs/storage";
import type {
  DecisionType,
  Intent,
  PatternResult,
  SessionPayload,
} from "@/lib/signs/types";

export default function SpotPatternResults() {
  const params = useParams<{ sessionId: string }>();
  const sessionId = params.sessionId;

  const [session, setSession] = useState<SessionPayload | null | undefined>(
    undefined,
  );

  useEffect(() => {
    setSession(loadSession(sessionId));
  }, [sessionId]);

  const result = useMemo(() => {
    if (!session || session.mode !== "spot_pattern") return null;
    if (!isCompletePattern(session)) return null;
    return computePattern(session);
  }, [session]);

  if (session === undefined) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <p className="text-[14px] text-muted">Loading…</p>
      </main>
    );
  }
  if (!session) return <SessionGate />;
  if (!result) {
    return (
      <SessionGate message="This pattern session is not complete yet. Open it from the landing page to keep going." />
    );
  }

  if (result.isWorkingHypothesis) {
    return <WorkingHypothesisView result={result} session={session} />;
  }

  if (result.isMixedPattern || !result.archetypeId) {
    return <MixedPatternView result={result} session={session} />;
  }

  const archetype = ARCHETYPES[result.archetypeId];
  const shareSubject = `SIGNS · Spot the Pattern · ${archetype.name}`;
  const shareBody = buildPatternShare(archetype.name, result);

  return (
    <main className="flex-1">
      <section className="max-w-3xl mx-auto px-6 md:px-10 pt-16 md:pt-20 pb-24">
        <span className="block text-[11px] tracking-[0.25em] uppercase text-accent mb-4">
          Spot the Pattern · Result
        </span>
        <h1 className="font-medium text-4xl md:text-5xl leading-[1.1] tracking-tight text-foreground mb-4">
          {archetype.name}.
        </h1>
        <p className="text-[18px] md:text-[20px] leading-relaxed text-foreground mb-12 max-w-2xl">
          {archetype.takeaway}
        </p>

        <ScoreBand result={result} />

        <ArchetypeBlock archetype={archetype} />

        <RisksAndActions result={result} />

        <PerDecisionStrip session={session} result={result} />

        <CoachingThemes archetypeId={archetype.id} />

        <WhatsNext shareSubject={shareSubject} shareBody={shareBody} />
      </section>
    </main>
  );
}

function ScoreBand({ result }: { result: PatternResult }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
      <div className="rounded-xl border border-hairline bg-surface/40 p-5">
        <p className="text-[11px] uppercase tracking-[0.15em] text-muted mb-1.5">
          Aggregate Signal Credibility
        </p>
        <p className="font-medium text-3xl text-foreground mb-1 tabular-nums">
          {result.aggregateScs}
        </p>
        <p className="text-[14px] text-accent">
          {SCS_NAMES[result.aggregateScs]}
        </p>
      </div>
      <div className="rounded-xl border border-hairline bg-surface/40 p-5">
        <p className="text-[11px] uppercase tracking-[0.15em] text-muted mb-1.5">
          Consistency
        </p>
        <p className="font-medium text-3xl text-foreground mb-1 tabular-nums">
          {result.consistencyScore}
        </p>
        <p className="text-[14px] text-accent">
          {CONSISTENCY_LABELS[result.consistencyScore]}
        </p>
      </div>
      <div className="rounded-xl border border-hairline bg-surface/40 p-5">
        <p className="text-[11px] uppercase tracking-[0.15em] text-muted mb-1.5">
          Clarity
        </p>
        <p className="font-medium text-3xl text-foreground mb-1 tabular-nums">
          {result.clarityScore}
        </p>
        <p className="text-[14px] text-accent">
          {CLARITY_LABELS[result.clarityScore]}
        </p>
      </div>
    </section>
  );
}

function ArchetypeBlock({
  archetype,
}: {
  archetype: (typeof ARCHETYPES)[keyof typeof ARCHETYPES];
}) {
  const items: Array<{ label: string; body: string }> = [
    { label: "What it looks like", body: archetype.whatItLooksLike },
    { label: "Why it persists", body: archetype.whyItPersists },
    { label: "Fix first", body: archetype.fixFirst },
    { label: "Do not", body: archetype.doNot },
  ];
  return (
    <section className="border-t border-hairline pt-10 mb-12">
      <span className="block text-[11px] tracking-[0.25em] uppercase text-accent mb-4">
        The archetype, unpacked
      </span>
      <dl className="space-y-5">
        {items.map((it) => (
          <div key={it.label}>
            <dt className="text-[13px] uppercase tracking-[0.12em] text-accent mb-1">
              {it.label}
            </dt>
            <dd className="text-[15px] leading-relaxed text-foreground">
              {it.body}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function RisksAndActions({ result }: { result: PatternResult }) {
  return (
    <section className="border-t border-hairline pt-10 mb-12">
      <span className="block text-[11px] tracking-[0.25em] uppercase text-accent mb-4">
        Top 3 risks
      </span>
      <ol className="space-y-2 mb-10">
        {result.topRisks.map((r, i) => (
          <li
            key={r}
            className="text-[15px] leading-relaxed text-foreground flex gap-3"
          >
            <span className="text-muted tabular-nums shrink-0">{i + 1}.</span>
            <span>{r}</span>
          </li>
        ))}
      </ol>
      <span className="block text-[11px] tracking-[0.25em] uppercase text-accent mb-4">
        Priority actions
      </span>
      <ol className="space-y-2">
        {result.priorityActions.map((a, i) => (
          <li
            key={a}
            className="text-[15px] leading-relaxed text-foreground flex gap-3"
          >
            <span className="text-muted tabular-nums shrink-0">{i + 1}.</span>
            <span>{a}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function PerDecisionStrip({
  session,
  result,
}: {
  session: SessionPayload;
  result: PatternResult;
}) {
  const decisions = session.decisions ?? [];
  return (
    <section className="border-t border-hairline pt-10 mb-12">
      <span className="block text-[11px] tracking-[0.25em] uppercase text-accent mb-4">
        Each decision in the set
      </span>
      <ul className="grid gap-3 grid-cols-1 sm:grid-cols-2">
        {decisions.map((d, i) => {
          const r = result.perDecisionResults[i];
          const dt = d.inputs.decision_type as DecisionType | undefined;
          const intent = d.inputs.intent as Intent | undefined;
          const primary = r.primaryScenarioId
            ? getScenario(r.primaryScenarioId).name
            : r.isHealthy
              ? "Baseline Healthy"
              : "—";
          return (
            <li
              key={i}
              className="rounded-lg border border-hairline bg-surface/40 p-4"
            >
              <p className="text-[11px] uppercase tracking-[0.15em] text-muted mb-1">
                Decision {i + 1}
              </p>
              <p className="text-[14px] text-foreground mb-1">
                {dt ? DECISION_TYPE_LABEL[dt] : "—"}
                {intent ? ` · ${INTENT_LABEL[intent]}` : ""}
              </p>
              <p className="text-[13px] text-muted mb-2">{primary}</p>
              <p className="text-[12px] text-accent">
                SCS {r.scs} — {SCS_NAMES[r.scs]}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function CoachingThemes({
  archetypeId,
}: {
  archetypeId: keyof typeof ARCHETYPES;
}) {
  const a = ARCHETYPES[archetypeId];
  return (
    <section className="border-t border-hairline pt-10 mb-12">
      <span className="block text-[11px] tracking-[0.25em] uppercase text-accent mb-4">
        Coaching themes
      </span>
      <p className="text-[15px] leading-relaxed text-foreground mb-3">
        For leaders: {a.fixFirst}
      </p>
      <p className="text-[15px] leading-relaxed text-foreground">
        For managers: do not {a.doNot.toLowerCase().replace(/\.$/, "")}.
      </p>
    </section>
  );
}

function WorkingHypothesisView({
  result,
  session,
}: {
  result: PatternResult;
  session: SessionPayload;
}) {
  const subject = "SIGNS · Spot the Pattern · Working Hypothesis";
  const body = buildHypothesisShare(result);
  return (
    <main className="flex-1">
      <section className="max-w-3xl mx-auto px-6 md:px-10 pt-16 md:pt-20 pb-24">
        <span className="block text-[11px] tracking-[0.25em] uppercase text-accent mb-4">
          Spot the Pattern · Working Hypothesis
        </span>
        <h1 className="font-medium text-3xl md:text-4xl leading-[1.1] tracking-tight text-foreground mb-4">
          You&apos;ve entered {result.decisionCount} decisions. That&apos;s
          enough to see tendencies, not enough to name a pattern.
        </h1>
        <p className="text-[15px] leading-relaxed text-muted mb-10 max-w-2xl">
          Add 2–3 more decisions to sharpen the pattern, or treat these as a
          starting read and run individual decisions through Mode 1.
        </p>
        <ScoreBand result={result} />
        <PerDecisionStrip session={session} result={result} />
        <WhatsNext shareSubject={subject} shareBody={body} />
      </section>
    </main>
  );
}

function MixedPatternView({
  result,
  session,
}: {
  result: PatternResult;
  session: SessionPayload;
}) {
  const subject = "SIGNS · Spot the Pattern · Mixed Pattern";
  const body = buildMixedShare(result);
  return (
    <main className="flex-1">
      <section className="max-w-3xl mx-auto px-6 md:px-10 pt-16 md:pt-20 pb-24">
        <span className="block text-[11px] tracking-[0.25em] uppercase text-accent mb-4">
          Spot the Pattern · Mixed Pattern
        </span>
        <h1 className="font-medium text-3xl md:text-4xl leading-[1.1] tracking-tight text-foreground mb-4">
          No single archetype clearly fits this set.
        </h1>
        <p className="text-[15px] leading-relaxed text-muted mb-10 max-w-2xl">
          The aggregate scores still tell a useful story, but the dominant
          tendency is not strong enough to name an archetype. Look at each
          decision below for the specific scenario that fired.
        </p>
        <ScoreBand result={result} />
        <PerDecisionStrip session={session} result={result} />
        <WhatsNext shareSubject={subject} shareBody={body} />
      </section>
    </main>
  );
}

function buildPatternShare(archetypeName: string, result: PatternResult): string {
  return [
    `SIGNS · Spot the Pattern result`,
    ``,
    `Archetype: ${archetypeName}`,
    `Aggregate SCS: ${result.aggregateScs} — ${result.aggregateScsName}`,
    `Consistency: ${result.consistencyScore} — ${result.consistencyLabel}`,
    `Clarity: ${result.clarityScore} — ${result.clarityLabel}`,
    `Decisions: ${result.decisionCount}`,
    ``,
    `Top risks:`,
    ...result.topRisks.map((r, i) => `${i + 1}. ${r}`),
    ``,
    `Priority actions:`,
    ...result.priorityActions.map((a, i) => `${i + 1}. ${a}`),
    ``,
    `— signs.arminoorata.com`,
  ].join("\n");
}

function buildHypothesisShare(result: PatternResult): string {
  return [
    `SIGNS · Spot the Pattern · Working Hypothesis`,
    ``,
    `Decisions in set: ${result.decisionCount}`,
    `Aggregate SCS: ${result.aggregateScs} — ${result.aggregateScsName}`,
    `Consistency: ${result.consistencyScore} — ${result.consistencyLabel}`,
    `Clarity: ${result.clarityScore} — ${result.clarityLabel}`,
    ``,
    `Not enough evidence yet for a named archetype. Add 2-3 more decisions.`,
    ``,
    `— signs.arminoorata.com`,
  ].join("\n");
}

function buildMixedShare(result: PatternResult): string {
  return [
    `SIGNS · Spot the Pattern · Mixed Pattern`,
    ``,
    `Decisions in set: ${result.decisionCount}`,
    `Aggregate SCS: ${result.aggregateScs} — ${result.aggregateScsName}`,
    `Consistency: ${result.consistencyScore} — ${result.consistencyLabel}`,
    `Clarity: ${result.clarityScore} — ${result.clarityLabel}`,
    ``,
    `No single archetype dominated. Look at each decision's specific scenario.`,
    ``,
    `— signs.arminoorata.com`,
  ].join("\n");
}
