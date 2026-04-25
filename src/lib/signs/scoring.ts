/**
 * Scoring per brief Sections 7.3 and 13.7. The brief is the source of
 * truth — if a formula here disagrees with the brief, the brief wins.
 */

import {
  CLARITY_LABELS,
  CONSISTENCY_LABELS,
  SCS_NAMES,
} from "./copy";
import { evaluateScenarios } from "./scenarios";
import type {
  DecisionInputs,
  DecisionResult,
  GapSize,
  NormConsistency,
} from "./types";

type Scs = 1 | 2 | 3 | 4 | 5;

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function asScs(n: number): Scs {
  return clamp(Math.round(n), 1, 5) as Scs;
}

/**
 * Single-decision SCS computation per brief Section 7.3.
 * Base 4. Scenario 8 fires → 5. Severity ≥ 3 firing scenarios subtract 1.
 * gap_size=large not already penalized → -1. high visibility + low signal → -1.
 * Floor 1, ceil 5.
 */
export function computeScs(inputs: DecisionInputs): {
  scs: Scs;
  scsName: string;
  primaryScenarioId: number | null;
  secondaryScenarioIds: number[];
  isHealthy: boolean;
} {
  const fired = evaluateScenarios(inputs);
  const fired8 = fired.find((s) => s.id === 8);

  let scs = 4;
  if (fired8) scs = 5;

  const seriousFires = fired.filter((s) => s.severity >= 3);
  scs -= seriousFires.length;

  // gap_size=large penalty if not already captured by a serious scenario.
  // Scenario 4 (severity 5) covers large+confidence=high. Scenarios 1, 3, 6
  // already trigger on medium-or-large gap. So this catches the rare
  // standalone large-gap case the others miss.
  const largeGapAlreadyPenalized = fired.some(
    (s) =>
      s.severity >= 3 &&
      (s.id === 1 || s.id === 3 || s.id === 4 || s.id === 6),
  );
  if (inputs.gap_size === "large" && !largeGapAlreadyPenalized) {
    scs -= 1;
  }

  // High visibility + low signal amplification (Section 7.3 step 5).
  // Applies even if Scenario 7 also fires — the amplification is structural.
  if (inputs.visibility === "high" && inputs.signal_strength === "low") {
    scs -= 1;
  }

  const finalScs = asScs(scs);
  const primary = fired[0] ?? null;
  const secondary = fired.slice(1).map((s) => s.id);

  return {
    scs: finalScs,
    scsName: SCS_NAMES[finalScs],
    primaryScenarioId: primary?.id ?? null,
    secondaryScenarioIds: secondary,
    isHealthy: fired.length === 0,
  };
}

// ── Mode 3 aggregations (Section 13.7) ──────────────────────

function fractionOf<T extends string>(
  values: (T | undefined)[],
  match: T,
): number {
  const defined = values.filter((v): v is T => v !== undefined);
  if (defined.length === 0) return 0;
  return defined.filter((v) => v === match).length / defined.length;
}

/** Consistency = 5 × f_consistent + 3 × f_unclear + 1 × f_inconsistent. */
export function consistencyScore(
  values: (NormConsistency | undefined)[],
): { score: Scs; label: string } {
  const fc = fractionOf<NormConsistency>(values, "consistent");
  const fu = fractionOf<NormConsistency>(values, "unclear");
  const fi = fractionOf<NormConsistency>(values, "inconsistent");
  const raw = 5 * fc + 3 * fu + 1 * fi;
  const score = asScs(raw);
  return { score, label: CONSISTENCY_LABELS[score] };
}

/** Clarity = 5 × f_small + 3 × f_medium + 1 × f_large (gap-size based). */
export function clarityScore(
  values: (GapSize | undefined)[],
): { score: Scs; label: string } {
  const fs = fractionOf<GapSize>(values, "small");
  const fm = fractionOf<GapSize>(values, "medium");
  const fl = fractionOf<GapSize>(values, "large");
  const raw = 5 * fs + 3 * fm + 1 * fl;
  const score = asScs(raw);
  return { score, label: CLARITY_LABELS[score] };
}

/**
 * Aggregate SCS = max(1, round(mean) - spread_penalty).
 * Spread penalty = 1 if (max-min) >= 2 across per-decision SCSes.
 */
export function aggregateScs(perDecisionScs: Scs[]): {
  score: Scs;
  label: string;
  spread: number;
} {
  if (perDecisionScs.length === 0) {
    return { score: 4, label: SCS_NAMES[4], spread: 0 };
  }
  const sum = perDecisionScs.reduce((a, b) => a + b, 0);
  const mean = sum / perDecisionScs.length;
  const max = Math.max(...perDecisionScs);
  const min = Math.min(...perDecisionScs);
  const spread = max - min;
  const penalty = spread >= 2 ? 1 : 0;
  const score = asScs(Math.round(mean) - penalty);
  return { score, label: SCS_NAMES[score], spread };
}

// ── Helper: per-decision result composer ────────────────────

export function decisionResult(
  inputs: DecisionInputs,
  mode: DecisionResult["mode"],
): DecisionResult {
  const scored = computeScs(inputs);
  const fired = evaluateScenarios(inputs);
  const primary = fired[0];

  // Determine recommendation
  let recommendation: DecisionResult["recommendation"] = "proceed";
  if (primary) {
    recommendation = primary.recommendation(
      mode === "spot_pattern" ? "diagnose" : mode,
      inputs,
    );
  }

  return {
    mode,
    scs: scored.scs,
    scsName: scored.scsName,
    primaryScenarioId: scored.primaryScenarioId as DecisionResult["primaryScenarioId"],
    secondaryScenarioIds: scored.secondaryScenarioIds as DecisionResult["secondaryScenarioIds"],
    recommendation,
    isHealthy: scored.isHealthy,
  };
}
