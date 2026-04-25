/**
 * Display labels and microcopy. Per brief Section 8: storage keys never
 * leak into UI; this file holds the display version.
 */

import type {
  Confidence,
  DecisionType,
  GapSize,
  Intent,
  IntentClarity,
  JustificationIntensity,
  Mode,
  NormConsistency,
  Recommendation,
  SignalStrength,
  SpansMultipleManagers,
  Visibility,
} from "./types";

// ── SCS scale (Section 7.2) ─────────────────────────────────

export const SCS_NAMES = {
  5: "Credible & Coherent",
  4: "Mostly Credible",
  3: "Mixed Signal",
  2: "Weak Signal",
  1: "Broken Signal",
} as const;

export const CONSISTENCY_LABELS = {
  5: "Aligned",
  4: "Mostly Aligned",
  3: "Mixed",
  2: "Inconsistent",
  1: "Broken",
} as const;

export const CLARITY_LABELS = {
  5: "Clear",
  4: "Mostly Clear",
  3: "Mixed",
  2: "Weak",
  1: "Broken",
} as const;

// ── Display labels for enums (Section 8 — display ≠ storage) ───

export const DECISION_TYPE_LABEL: Record<DecisionType, string> = {
  raise: "Raise",
  bonus: "Bonus",
  promotion: "Promotion",
  title_change: "Title change",
  equity_refresh: "Equity refresh",
  market_correction: "Market correction",
  other: "Other",
};

export const INTENT_LABEL: Record<Intent, string> = {
  recognition: "Recognition",
  retention: "Retention",
  promotion_readiness: "Promotion readiness",
  correction: "Correction",
  growth: "Growth",
  other: "Other",
};

export const INTENT_CLARITY_LABEL: Record<IntentClarity, string> = {
  one: "One thing",
  two: "Two things",
  several_or_unclear: "Several things, or unclear",
};

export const GAP_SIZE_LABEL: Record<GapSize, string> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
};

export const SIGNAL_STRENGTH_LABEL: Record<SignalStrength, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export const NORM_CONSISTENCY_LABEL: Record<NormConsistency, string> = {
  consistent: "Consistent",
  inconsistent: "Inconsistent",
  unclear: "Unclear",
};

export const VISIBILITY_LABEL: Record<Visibility, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export const JUSTIFICATION_LABEL: Record<JustificationIntensity, string> = {
  minimal: "Minimal",
  moderate: "Moderate",
  extensive: "Extensive",
};

export const CONFIDENCE_LABEL: Record<Confidence, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export const SPANS_MULTIPLE_LABEL: Record<SpansMultipleManagers, string> = {
  yes: "Yes",
  no: "No",
  mixed: "Mixed",
};

// ── Recommendation copy ──────────────────────────────────────

export const RECOMMENDATION_LABEL: Record<Recommendation, string> = {
  proceed: "Proceed",
  proceed_with_clarification: "Proceed with clarification",
  strengthen_signal: "Strengthen the signal",
  rethink: "Rethink",
};

export const RECOMMENDATION_DETAIL: Record<Recommendation, string> = {
  proceed: "No change needed.",
  proceed_with_clarification:
    "Deliver the decision, but explicitly address the interpretation risk.",
  strengthen_signal:
    "The action is too small to carry the intended message. Increase the signal before delivery, or accept the message will not land.",
  rethink:
    "The decision in its current form creates more trust risk than it resolves. Stop and redesign before delivering.",
};

// ── Mode display ─────────────────────────────────────────────

export const MODE_LABEL: Record<Mode, string> = {
  diagnose: "Diagnose a Decision",
  understand: "Understand What Happened",
  spot_pattern: "Spot the Pattern",
};

export const MODE_PATH: Record<Mode, string> = {
  diagnose: "/diagnose",
  understand: "/understand",
  spot_pattern: "/spot-pattern",
};

// ── Microcopy bank (Section 21) ──────────────────────────────

export const MICROCOPY = {
  coreIdea: "People do not experience intent. They experience patterns.",
  weakSignalNarrative: "A weak signal creates its own narrative.",
  needsExplaining:
    "If this needs explaining, the signal may not be strong enough.",
  consistency: "Consistency is what makes signals believable.",
  notScoringMeant:
    "You are not scoring what leadership meant. You are scoring what employees are likely to experience.",
  managersParagraph:
    "If managers need a paragraph to defend it, the signal may be doing too little work.",
  fairCanStillBeWeak: "A fair system can still send weak signals.",
  strongCanSitInsideBroken:
    "A strong signal can still sit inside a broken system.",
};

// ── Baseline Healthy (Section 9.4) ───────────────────────────

export const BASELINE_HEALTHY = {
  hero: "No risk flags triggered. The decision looks coherent with its intent.",
  reinforcement:
    "Reinforce the message. Connect it to what happens next. Then move on. Healthy signals need visibility, not defense.",
};
