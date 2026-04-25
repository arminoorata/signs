/**
 * Question definitions for Modes 1, 2, 3 per brief Sections 11, 12, 13.
 * Storage keys are snake_case; display labels are Title Case.
 *
 * Question IDs map to keys in SessionPayload.answers (Modes 1/2) or to
 * fields on DecisionEntry.inputs (Mode 3).
 */

export type QuestionType =
  | "enum" // single-select from options
  | "scalar" // single-select from low/medium/high (or similar 3-level)
  | "open"; // free-text textarea

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  /** Section heading shown above the question (e.g., "Story", "Intent"). */
  section: string;
  /** Required structured input feeding the engine, or "deepen" open-text. */
  required: boolean;
  prompt: string;
  /** Optional helper or microcopy before the prompt. */
  preamble?: string;
  /** Mapping to DecisionInputs key when this writes to the engine. */
  inputKey?: string;
  /** Available for enum/scalar. Order is display order. */
  options?: QuestionOption[];
  /** Placeholder for open-text. */
  placeholder?: string;
}

// ── Shared option sets ──────────────────────────────────────

const DECISION_TYPE_OPTIONS: QuestionOption[] = [
  { value: "raise", label: "Raise" },
  { value: "bonus", label: "Bonus" },
  { value: "promotion", label: "Promotion" },
  { value: "title_change", label: "Title change" },
  { value: "equity_refresh", label: "Equity refresh" },
  { value: "market_correction", label: "Market correction" },
  { value: "other", label: "Other" },
];

const INTENT_OPTIONS: QuestionOption[] = [
  { value: "recognition", label: "Recognition" },
  { value: "retention", label: "Retention" },
  { value: "promotion_readiness", label: "Promotion readiness" },
  { value: "correction", label: "Correction" },
  { value: "growth", label: "Growth" },
  { value: "other", label: "Other" },
];

const INTENT_CLARITY_OPTIONS: QuestionOption[] = [
  { value: "one", label: "One thing" },
  { value: "two", label: "Two things" },
  { value: "several_or_unclear", label: "Several things, or unclear" },
];

const GAP_SIZE_OPTIONS: QuestionOption[] = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
];

const NORM_CONSISTENCY_OPTIONS: QuestionOption[] = [
  { value: "consistent", label: "Consistent" },
  { value: "inconsistent", label: "Inconsistent" },
  { value: "unclear", label: "Unclear" },
];

const LOW_MED_HIGH: QuestionOption[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const JUSTIFICATION_OPTIONS: QuestionOption[] = [
  { value: "minimal", label: "Minimal" },
  { value: "moderate", label: "Moderate" },
  { value: "extensive", label: "Extensive" },
];

const SPANS_MANAGERS_OPTIONS: QuestionOption[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "mixed", label: "Mixed" },
];

// ── Mode 1: Diagnose a Decision (Section 11) ────────────────

export const MODE_1_QUESTIONS: Question[] = [
  {
    id: "story_decision_type",
    type: "enum",
    section: "Story",
    required: true,
    prompt: "What decision are you considering?",
    inputKey: "decision_type",
    options: DECISION_TYPE_OPTIONS,
  },
  {
    id: "story_description",
    type: "open",
    section: "Story",
    required: false,
    prompt: "Describe the decision in one or two sentences.",
    placeholder:
      "What is the action? Who is it for? What context matters?",
  },
  {
    id: "intent_signal",
    type: "enum",
    section: "Intent",
    required: true,
    prompt: "What are you trying to signal?",
    inputKey: "intent",
    options: INTENT_OPTIONS,
  },
  {
    id: "intent_clarity",
    type: "enum",
    section: "Intent",
    required: true,
    prompt:
      "Is this decision trying to signal one thing, or several things at once?",
    inputKey: "intent_clarity",
    options: INTENT_CLARITY_OPTIONS,
  },
  {
    id: "intent_feeling",
    type: "open",
    section: "Intent",
    required: false,
    prompt: "What do you want the employee to feel or understand?",
    placeholder: "In their own words, what should they take away?",
  },
  {
    id: "gap_misread",
    type: "open",
    section: "Gap",
    required: false,
    prompt: "What could be misread about this decision?",
  },
  {
    id: "gap_vulnerable",
    type: "open",
    section: "Gap",
    required: false,
    prompt:
      "What part of the message feels vulnerable to misinterpretation?",
  },
  {
    id: "gap_size",
    type: "scalar",
    section: "Gap",
    required: true,
    prompt:
      "How large is the gap between your intent and how this is likely to be received?",
    inputKey: "gap_size",
    options: GAP_SIZE_OPTIONS,
  },
  {
    id: "norms_compare",
    type: "open",
    section: "Norms",
    required: false,
    prompt: "What will they compare this to?",
  },
  {
    id: "norms_consistency",
    type: "scalar",
    section: "Norms",
    required: true,
    prompt: "Does this feel consistent with similar situations?",
    inputKey: "norm_consistency",
    options: NORM_CONSISTENCY_OPTIONS,
  },
  {
    id: "signal_strength",
    type: "scalar",
    section: "Signal Strength",
    required: true,
    prompt: "How meaningful is the change?",
    inputKey: "signal_strength",
    options: LOW_MED_HIGH,
  },
  {
    id: "visibility",
    type: "scalar",
    section: "Signal Strength",
    required: true,
    prompt: "How visible is this to others?",
    inputKey: "visibility",
    options: LOW_MED_HIGH,
  },
  {
    id: "justification_intensity",
    type: "scalar",
    section: "Signal Strength",
    required: true,
    prompt: "How much justifying does this decision require to feel fair?",
    inputKey: "justification_intensity",
    options: JUSTIFICATION_OPTIONS,
  },
  {
    id: "confidence",
    type: "scalar",
    section: "Confidence check",
    required: true,
    prompt: "How confident are you that this will land the way you intend?",
    preamble:
      "Last question. Be honest. Confidence on a high-gap decision is itself a signal.",
    inputKey: "confidence",
    options: LOW_MED_HIGH,
  },
];

// ── Mode 2: Understand What Happened (Section 12) ───────────

export const MODE_2_QUESTIONS: Question[] = [
  {
    id: "story_what_happened",
    type: "open",
    section: "Story",
    required: false,
    prompt: "What happened?",
  },
  {
    id: "story_decision_type",
    type: "enum",
    section: "Story",
    required: true,
    prompt: "What type of decision was it?",
    inputKey: "decision_type",
    options: DECISION_TYPE_OPTIONS,
  },
  {
    id: "story_context",
    type: "open",
    section: "Story",
    required: false,
    prompt: "What context matters here?",
  },
  {
    id: "story_around_same_time",
    type: "open",
    section: "Story",
    required: false,
    prompt: "What else was happening around the same time?",
  },
  {
    id: "intent_communicate",
    type: "open",
    section: "Intent",
    required: false,
    prompt: "What was leadership trying to communicate?",
  },
  {
    id: "intent_signal",
    type: "enum",
    section: "Intent",
    required: true,
    prompt:
      "Which of these best describes what leadership was trying to signal?",
    inputKey: "intent",
    options: INTENT_OPTIONS,
  },
  {
    id: "intent_clarity",
    type: "enum",
    section: "Intent",
    required: true,
    prompt:
      "Was the decision trying to signal one thing, or several things at once?",
    inputKey: "intent_clarity",
    options: INTENT_CLARITY_OPTIONS,
  },
  {
    id: "intent_why_now",
    type: "open",
    section: "Intent",
    required: false,
    prompt: "Why was this decision made now?",
  },
  {
    id: "intent_reinforce",
    type: "open",
    section: "Intent",
    required: false,
    prompt: "What behavior or outcome was this meant to reinforce?",
  },
  {
    id: "gap_reaction",
    type: "open",
    section: "Gap",
    required: false,
    prompt: "What reaction occurred?",
  },
  {
    id: "gap_off",
    type: "open",
    section: "Gap",
    required: false,
    prompt: "What felt off?",
  },
  {
    id: "gap_assumption",
    type: "open",
    section: "Gap",
    required: false,
    prompt: "What assumption might the employee have made?",
    preamble:
      "Prompt: If they explained this to a friend, what would they probably say?",
  },
  {
    id: "gap_size",
    type: "scalar",
    section: "Gap",
    required: true,
    prompt:
      "Looking back, how large was the gap between the intent and how it was received?",
    inputKey: "gap_size",
    options: GAP_SIZE_OPTIONS,
  },
  {
    id: "norms_comparing",
    type: "open",
    section: "Norms",
    required: false,
    prompt: "What are they likely comparing this to?",
  },
  {
    id: "norms_consistency",
    type: "scalar",
    section: "Norms",
    required: true,
    prompt:
      "Are there similar cases that make this look inconsistent?",
    inputKey: "norm_consistency",
    options: NORM_CONSISTENCY_OPTIONS,
  },
  {
    id: "norms_pattern_taught",
    type: "open",
    section: "Norms",
    required: false,
    prompt:
      "What pattern has the organization taught people to expect?",
    preamble:
      "Prompt: From their perspective, is this fair, or just different?",
  },
  {
    id: "signal_strength",
    type: "scalar",
    section: "Signal Strength",
    required: true,
    prompt: "Was the decision meaningful enough to support the message?",
    inputKey: "signal_strength",
    options: LOW_MED_HIGH,
  },
  {
    id: "visibility",
    type: "scalar",
    section: "Signal Strength",
    required: true,
    prompt: "How visible is this to others in the organization?",
    inputKey: "visibility",
    options: LOW_MED_HIGH,
  },
  {
    id: "justification_intensity",
    type: "scalar",
    section: "Signal Strength",
    required: true,
    prompt:
      "How much justifying did this decision require to feel fair when delivered?",
    inputKey: "justification_intensity",
    options: JUSTIFICATION_OPTIONS,
  },
  {
    id: "confidence",
    type: "scalar",
    section: "Confidence check",
    required: true,
    prompt:
      "At the time, how confident was leadership that this would land the way intended?",
    preamble:
      "Asked retrospectively. High confidence on a now-large-gap decision is the Scenario 4 trap.",
    inputKey: "confidence",
    options: LOW_MED_HIGH,
  },
];

// ── Mode 3: Spot the Pattern (Section 13) ───────────────────

export const MODE_3_META_QUESTION: Question = {
  id: "spans_multiple_managers",
  type: "enum",
  section: "About this set",
  required: true,
  prompt:
    "Do these decisions span multiple managers or decision-makers?",
  options: SPANS_MANAGERS_OPTIONS,
};

export const MODE_3_PER_DECISION_QUESTIONS: Question[] = [
  {
    id: "decision_type",
    type: "enum",
    section: "Story",
    required: true,
    prompt: "Decision type",
    inputKey: "decision_type",
    options: DECISION_TYPE_OPTIONS,
  },
  {
    id: "story",
    type: "open",
    section: "Story",
    required: false,
    prompt: "Short story",
    placeholder: "One or two sentences on what happened.",
  },
  {
    id: "intent",
    type: "enum",
    section: "Intent",
    required: true,
    prompt: "Intended signal",
    inputKey: "intent",
    options: INTENT_OPTIONS,
  },
  {
    id: "intent_clarity",
    type: "enum",
    section: "Intent",
    required: true,
    prompt: "Intent clarity",
    inputKey: "intent_clarity",
    options: INTENT_CLARITY_OPTIONS,
  },
  {
    id: "reaction",
    type: "open",
    section: "Gap",
    required: false,
    prompt: "Observed or expected reaction",
  },
  {
    id: "gap_size",
    type: "scalar",
    section: "Gap",
    required: true,
    prompt: "Gap size",
    inputKey: "gap_size",
    options: GAP_SIZE_OPTIONS,
  },
  {
    id: "signal_strength",
    type: "scalar",
    section: "Signal Strength",
    required: true,
    prompt: "Signal strength",
    inputKey: "signal_strength",
    options: LOW_MED_HIGH,
  },
  {
    id: "visibility",
    type: "scalar",
    section: "Signal Strength",
    required: true,
    prompt: "Visibility",
    inputKey: "visibility",
    options: LOW_MED_HIGH,
  },
  {
    id: "norm_consistency",
    type: "scalar",
    section: "Norms",
    required: true,
    prompt: "Norm consistency",
    inputKey: "norm_consistency",
    options: NORM_CONSISTENCY_OPTIONS,
  },
  {
    id: "justification_intensity",
    type: "scalar",
    section: "Signal Strength",
    required: true,
    prompt: "Justification intensity",
    inputKey: "justification_intensity",
    options: JUSTIFICATION_OPTIONS,
  },
  {
    id: "confidence",
    type: "scalar",
    section: "Confidence",
    required: true,
    prompt: "Confidence at the time",
    inputKey: "confidence",
    options: LOW_MED_HIGH,
  },
];
