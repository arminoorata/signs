/**
 * Orchestration: turn a SessionPayload into a result.
 *
 * For Modes 1 and 2: extract DecisionInputs from answers, run the engine,
 * produce a DecisionResult.
 *
 * For Mode 3: per-decision DecisionResults + aggregate scores + archetype.
 */

import { matchArchetype, ARCHETYPES } from "./archetypes";
import {
  aggregateScs,
  clarityScore,
  consistencyScore,
  decisionResult,
} from "./scoring";
import { evaluateScenarios } from "./scenarios";
import {
  MODE_1_QUESTIONS,
  MODE_2_QUESTIONS,
  MODE_3_PER_DECISION_QUESTIONS,
} from "./questions";
import type {
  DecisionEntry,
  DecisionInputs,
  DecisionResult,
  Mode,
  PatternResult,
  SessionAnswers,
  SessionPayload,
} from "./types";

/** Read a structured input value from answers, scoped by question id. */
function inputsFromAnswers(
  mode: Mode,
  answers: SessionAnswers | undefined,
): DecisionInputs {
  if (!answers) return {};
  const questions = mode === "diagnose" ? MODE_1_QUESTIONS : MODE_2_QUESTIONS;
  const out: Record<string, string> = {};
  for (const q of questions) {
    if (!q.inputKey) continue;
    const v = answers[q.id];
    if (typeof v === "string" && v.length > 0) {
      out[q.inputKey] = v;
    }
  }
  return out as DecisionInputs;
}

/** Validate a Mode 1/2 session has all required structured inputs. */
export function isCompleteSingle(session: SessionPayload): boolean {
  if (session.mode === "spot_pattern") return false;
  const questions =
    session.mode === "diagnose" ? MODE_1_QUESTIONS : MODE_2_QUESTIONS;
  const required = questions.filter((q) => q.required);
  return required.every((q) => {
    const v = session.answers?.[q.id];
    return typeof v === "string" && v.length > 0;
  });
}

/** Validate a Mode 3 session has the meta question + at least 3 complete decisions. */
export function isCompletePattern(session: SessionPayload): boolean {
  if (session.mode !== "spot_pattern") return false;
  if (!session.spansMultipleManagers) return false;
  if (!session.decisions || session.decisions.length < 3) return false;
  const requiredKeys = MODE_3_PER_DECISION_QUESTIONS.filter(
    (q) => q.required,
  ).map((q) => q.inputKey ?? q.id);
  return session.decisions.every((d) =>
    requiredKeys.every(
      (k) => typeof (d.inputs as Record<string, unknown>)[k] === "string",
    ),
  );
}

/** Compute (and return) result for a single-decision session. */
export function computeSingle(session: SessionPayload): DecisionResult {
  const inputs = inputsFromAnswers(session.mode, session.answers);
  return decisionResult(inputs, session.mode);
}

/** Compute pattern result for a Mode 3 session. */
export function computePattern(session: SessionPayload): PatternResult {
  const decisions = (session.decisions ?? []) as DecisionEntry[];
  const perDecision = decisions.map((d) =>
    decisionResult(d.inputs, "spot_pattern"),
  );

  const consistencyValues = decisions.map((d) => d.inputs.norm_consistency);
  const claritySource = decisions.map((d) => d.inputs.gap_size);
  const cs = consistencyScore(consistencyValues);
  const cl = clarityScore(claritySource);
  const ag = aggregateScs(perDecision.map((r) => r.scs));

  const matched = matchArchetype(
    decisions,
    perDecision,
    session.spansMultipleManagers,
  );

  const { topRisks, priorityActions } = riskAndActionsFor(matched.archetypeId);

  return {
    decisionCount: decisions.length,
    isWorkingHypothesis: matched.isWorkingHypothesis,
    isMixedPattern: matched.isMixedPattern,
    archetypeId: matched.archetypeId,
    perDecisionResults: perDecision,
    aggregateScs: ag.score,
    aggregateScsName: ag.label,
    consistencyScore: cs.score,
    consistencyLabel: cs.label,
    clarityScore: cl.score,
    clarityLabel: cl.label,
    spread: ag.spread,
    topRisks,
    priorityActions,
  };
}

function riskAndActionsFor(
  id: PatternResult["archetypeId"],
): {
  topRisks: string[];
  priorityActions: string[];
} {
  if (!id) {
    return { topRisks: [], priorityActions: [] };
  }
  const a = ARCHETYPES[id];
  return {
    topRisks: [...a.topRisks],
    priorityActions: [...a.priorityActions],
  };
}

// ── Helpers exposed for results pages ───────────────────────

export function inputsForSingle(session: SessionPayload): DecisionInputs {
  return inputsFromAnswers(session.mode, session.answers);
}

export function firingScenarios(inputs: DecisionInputs) {
  return evaluateScenarios(inputs);
}
