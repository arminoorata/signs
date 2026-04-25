/**
 * SIGNS engine types. The brief is the source of truth — see
 * /srv/projects/signs/Docs/SIGNS-BRIEF.md sections 7, 8, 9, 14.
 */

// ── Input model (Section 8) ─────────────────────────────────

export type Intent =
  | "recognition"
  | "retention"
  | "promotion_readiness"
  | "correction"
  | "growth"
  | "other";

export type IntentClarity = "one" | "two" | "several_or_unclear";

export type GapSize = "small" | "medium" | "large";

export type SignalStrength = "low" | "medium" | "high";

export type NormConsistency = "consistent" | "inconsistent" | "unclear";

export type Visibility = "low" | "medium" | "high";

export type JustificationIntensity = "minimal" | "moderate" | "extensive";

export type Confidence = "low" | "medium" | "high";

export type DecisionType =
  | "raise"
  | "bonus"
  | "promotion"
  | "title_change"
  | "equity_refresh"
  | "market_correction"
  | "other";

export type SpansMultipleManagers = "yes" | "no" | "mixed";

/** Structured inputs the engine uses. All optional-by-storage but required at scoring time. */
export interface DecisionInputs {
  decision_type?: DecisionType;
  intent?: Intent;
  intent_clarity?: IntentClarity;
  gap_size?: GapSize;
  signal_strength?: SignalStrength;
  norm_consistency?: NormConsistency;
  visibility?: Visibility;
  justification_intensity?: JustificationIntensity;
  confidence?: Confidence;
}

// ── Modes ───────────────────────────────────────────────────

export type Mode = "diagnose" | "understand" | "spot_pattern";

// ── Scenario engine (Section 9) ─────────────────────────────

export type ScenarioId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type Recommendation =
  | "proceed"
  | "proceed_with_clarification"
  | "strengthen_signal"
  | "rethink";

export interface Scenario {
  id: ScenarioId;
  name: string;
  severity: number; // 1 (lowest risk) to 5 (highest)
  diagnosis: string;
  risk: string;
  likelyReceived: string;
  sentenceCompletion: string; // "You intend to signal [intent], but..."
  whatToDo: string[];
  coaching: {
    howToExplain: string;
    whatToAcknowledge: string;
    whatNotToImply: string;
    whatToSayNext: string;
    suggestedScript: string;
  };
  doNotSay: string[];
  takeaway: string;
  /** Returns true if this scenario fires for the given inputs. */
  fires: (inputs: DecisionInputs) => boolean;
  /** Computes recommendation for a given mode + inputs. Deterministic per brief Section 9.1. */
  recommendation: (
    mode: Mode | "diagnose" | "understand",
    inputs: DecisionInputs,
  ) => Recommendation;
}

// ── Archetypes (Section 14) ─────────────────────────────────

export type ArchetypeId =
  | "symbolic_signaler"
  | "silent_eroder"
  | "inconsistent_narrator"
  | "over_explainer"
  | "improviser"
  | "misread_performer"
  | "credible_builder";

export interface Archetype {
  id: ArchetypeId;
  name: string;
  signature: string; // one-line subtitle
  takeaway: string; // hero takeaway sentence
  whatItLooksLike: string;
  whyItPersists: string;
  fixFirst: string;
  doNot: string;
  topRisks: [string, string, string];
  priorityActions: [string, string, string];
}

// ── Per-decision result (single-decision modes) ─────────────

export interface DecisionResult {
  mode: Mode; // diagnose or understand
  scs: 1 | 2 | 3 | 4 | 5;
  scsName: string; // "Credible & Coherent" etc.
  primaryScenarioId: ScenarioId | null; // null when Baseline Healthy
  secondaryScenarioIds: ScenarioId[];
  recommendation: Recommendation;
  isHealthy: boolean;
}

// ── Pattern result (Mode 3) ─────────────────────────────────

export interface PatternResult {
  decisionCount: number;
  isWorkingHypothesis: boolean; // < 5 decisions
  archetypeId: ArchetypeId | null; // null when working hypothesis or mixed
  isMixedPattern: boolean;
  perDecisionResults: DecisionResult[];
  aggregateScs: 1 | 2 | 3 | 4 | 5;
  aggregateScsName: string;
  consistencyScore: 1 | 2 | 3 | 4 | 5;
  consistencyLabel: string;
  clarityScore: 1 | 2 | 3 | 4 | 5;
  clarityLabel: string;
  spread: number; // max(scs) - min(scs) across decisions
  topRisks: string[];
  priorityActions: string[];
}

// ── Session payload (Section 19.7 storage envelope) ─────────

export interface SessionAnswers {
  // Per-mode storage of structured inputs and open-text content keyed by question id.
  [questionId: string]: string | string[] | undefined;
}

export interface DecisionEntry {
  inputs: DecisionInputs;
  openText?: { story?: string; reaction?: string };
}

export interface SessionPayload {
  schemaVersion: 1;
  sessionId: string;
  mode: Mode;
  createdAt: string; // ISO8601
  updatedAt: string;
  completedAt: string | null;
  // For Mode 1 + Mode 2: a single answers map.
  answers?: SessionAnswers;
  // For Mode 3: a meta question + an array of decision entries.
  spansMultipleManagers?: SpansMultipleManagers;
  decisions?: DecisionEntry[];
  // Computed on submit (cached for results page reload).
  result?: DecisionResult | PatternResult | null;
}

export interface SessionIndexEntry {
  sessionId: string;
  mode: Mode;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  // Headline for the recent-results list (e.g., scenario name or archetype).
  headline?: string;
}
