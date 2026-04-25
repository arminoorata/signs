/**
 * 8 scenarios from brief Section 9. Each has:
 * - input pattern (fires() function)
 * - severity weight (Section 9.3)
 * - all output content (diagnosis, risk, likely received, sentence completion,
 *   recommendation, what to do, 5-section coaching, do not say, takeaway)
 *
 * All copy here is locked per the brief. Do not paraphrase.
 */

import type {
  DecisionInputs,
  Mode,
  Recommendation,
  Scenario,
  ScenarioId,
} from "./types";

const SCENARIOS: Record<ScenarioId, Scenario> = {
  1: {
    id: 1,
    name: "Weak Signal, Strong Intent",
    severity: 3,
    diagnosis:
      "You intended to send a strong message, but the signal is too small to be credible.",
    risk: "Likely interpreted as symbolic, not meaningful. Feels like acknowledgment without commitment.",
    likelyReceived:
      "Nice words. Small action. Probably not much behind it.",
    sentenceCompletion:
      "You intend to signal {intent}, but this may be received as a symbolic gesture because the action is smaller than the message.",
    whatToDo: ["Increase the signal", "Or reset expectations explicitly"],
    coaching: {
      howToExplain:
        "Name the action honestly. Do not inflate the language to match the intent.",
      whatToAcknowledge:
        "The size of this reflects specific constraints, not the level of the contribution.",
      whatNotToImply:
        "A step change, a guarantee, or a full acknowledgment the action cannot actually support.",
      whatToSayNext:
        "What would need to happen for a larger step to be in scope, and roughly when.",
      suggestedScript:
        "I want to be clear about what this reflects and what it doesn't. This is recognition for your contribution, but it's not meant to signal a step change yet. Here's what would need to happen for that next step.",
    },
    doNotSay: [
      "This is a big step (if it isn't).",
      "This shows how much we value you (without substance behind it).",
    ],
    takeaway: "A weak signal creates its own narrative.",
    fires: (i) =>
      i.signal_strength === "low" &&
      (i.gap_size === "medium" || i.gap_size === "large"),
    recommendation: (_mode, i) =>
      i.signal_strength === "low" && i.confidence === "low"
        ? "strengthen_signal"
        : "proceed_with_clarification",
  },
  2: {
    id: 2,
    name: "Strong Signal, Misread Intent",
    severity: 4,
    diagnosis:
      "The signal is strong, but it is being interpreted differently than intended.",
    risk: "You may be accidentally signaling promotion, favoritism, or long-term commitment.",
    likelyReceived:
      "This means more than they said. Probably a signal about what's coming next.",
    sentenceCompletion:
      "You intend to signal {intent}, but this may be received as a broader commitment because a strong action without framing gets over-read.",
    whatToDo: [
      "Clarify intent immediately",
      "Anchor expectations before assumptions spread",
    ],
    coaching: {
      howToExplain:
        "Anchor the specific reason this decision was made. Preempt the broader inference.",
      whatToAcknowledge:
        "The visibility and weight of this action will drive interpretation, so being explicit matters.",
      whatNotToImply: "Silence. Ambiguity. Anything open to over-read.",
      whatToSayNext:
        "Ground the conversation in what the next step actually requires.",
      suggestedScript:
        "I want to clarify how to interpret this. This reflects a specific reason, not a broader shift in role or expectations. Let's talk about what the next step would actually look like.",
    },
    doNotSay: ["Nothing. Silence makes this worse."],
    takeaway: "A strong signal without context gets over-interpreted.",
    fires: (i) =>
      i.signal_strength === "high" &&
      (i.gap_size === "medium" || i.gap_size === "large"),
    recommendation: () => "proceed_with_clarification",
  },
  3: {
    id: 3,
    name: "Norm Conflict",
    severity: 3,
    diagnosis:
      "This decision may be reasonable in isolation, but it conflicts with existing patterns.",
    risk: "Employees interpret fairness through comparison. This can trigger perceptions of inconsistency or favoritism.",
    likelyReceived:
      "This is different from how similar cases went. Why.",
    sentenceCompletion:
      "You intend to signal {intent}, but this may be received as inconsistency because similar cases have been handled differently.",
    whatToDo: [
      "Acknowledge the inconsistency",
      "Explain the difference explicitly",
      "Or correct the broader pattern",
    ],
    coaching: {
      howToExplain:
        "Name the comparable cases. Name what is different about this one.",
      whatToAcknowledge:
        "The comparison is legitimate, and you have considered it.",
      whatNotToImply:
        "Every situation is different, used as a deflection. It will read as evasion.",
      whatToSayNext:
        "What governing principle makes the distinction, and how it applies forward.",
      suggestedScript:
        "I know this may feel inconsistent compared to other situations. Here's what's different in this case, and why the decision reflects that difference.",
    },
    doNotSay: ["Every situation is different (without explanation)."],
    takeaway: "Consistency is what makes signals believable.",
    fires: (i) =>
      i.norm_consistency === "inconsistent" &&
      (i.gap_size === "medium" || i.gap_size === "large"),
    recommendation: (mode, i) =>
      mode === "diagnose" && i.justification_intensity === "extensive"
        ? "rethink"
        : "proceed_with_clarification",
  },
  4: {
    id: 4,
    name: "High Gap, Low Awareness",
    severity: 5,
    diagnosis:
      "There is a significant gap between intent and perception, and it is likely being underestimated.",
    risk: "Trust can erode without visible conflict. Silent disengagement is likely.",
    likelyReceived:
      "Something is off, and I am not sure they see it.",
    sentenceCompletion:
      "You intend to signal {intent}, but this may be received as something you have not yet seen coming because the perception gap is large and likely underestimated.",
    whatToDo: [
      "Surface the perception gap directly",
      "Invite feedback",
      "Correct or clarify quickly",
    ],
    coaching: {
      howToExplain:
        "Surface the gap yourself, before the employee has to raise it.",
      whatToAcknowledge:
        "The risk that your intent was not what came through.",
      whatNotToImply: "That you already know how this landed. You do not.",
      whatToSayNext:
        "Depends on what you hear. Listen first, commit second.",
      suggestedScript:
        "I want to check how this landed for you. My intent was specific, but I want to make sure that's how it was received.",
    },
    doNotSay: ["I thought this was clear."],
    takeaway: "Unseen gaps are the most dangerous.",
    fires: (i) => i.gap_size === "large" && i.confidence === "high",
    recommendation: (mode) =>
      mode === "diagnose" ? "rethink" : "proceed_with_clarification",
  },
  5: {
    id: 5,
    name: "Overreliance on Explanation",
    severity: 2,
    diagnosis: "The signal only makes sense if it is explained.",
    risk: "If something needs a long explanation, it often lacks credibility on its own.",
    likelyReceived: "They are working hard to make this sound fair.",
    sentenceCompletion:
      "You intend to signal {intent}, but this may be received as defensiveness because the explanation is doing more work than the signal.",
    whatToDo: ["Strengthen the signal", "Or simplify the message"],
    coaching: {
      howToExplain: "Say the one true thing. Stop.",
      whatToAcknowledge:
        "That if the signal does not speak for itself, the explanation will not fix it.",
      whatNotToImply: "That justification equals credibility. It does not.",
      whatToSayNext:
        "Name the constraint that made the signal small. Do not dress it up.",
      suggestedScript:
        "I want to explain this clearly, but also acknowledge that the signal itself may not feel strong enough. Let's talk about that directly.",
    },
    doNotSay: ["Long, defensive justifications."],
    takeaway: "If it needs explaining, it may not be strong enough.",
    fires: (i) =>
      (i.signal_strength === "low" || i.signal_strength === "medium") &&
      i.justification_intensity === "extensive",
    recommendation: (mode, i) =>
      mode === "diagnose" && i.signal_strength === "low"
        ? "strengthen_signal"
        : "proceed_with_clarification",
  },
  6: {
    id: 6,
    name: "Misaligned Intent",
    severity: 4,
    diagnosis: "The action and the intended message are not aligned.",
    risk: "You are sending mixed signals, which creates confusion and weakens trust.",
    likelyReceived: "Not sure what this is supposed to mean.",
    sentenceCompletion:
      "You intend to signal {intent}, but this may be received as ambiguity because the action carries more than one possible meaning.",
    whatToDo: [
      "Re-anchor the decision to a clear intent",
      "Align action with message",
    ],
    coaching: {
      howToExplain:
        "Pick one intent. Name it clearly. Everything else stays out of the conversation.",
      whatToAcknowledge:
        "That previous framing may have sent competing signals.",
      whatNotToImply:
        "That all of the intents were compatible. They usually are not.",
      whatToSayNext: "What this decision is, and what it is not.",
      suggestedScript:
        "I want to reset how this should be interpreted. The intention here is specific, and if that is not coming through clearly, that is on us to fix.",
    },
    doNotSay: ["Vague or hedged language."],
    takeaway: "Mixed signals weaken credibility fast.",
    fires: (i) =>
      (i.intent_clarity === "two" ||
        i.intent_clarity === "several_or_unclear") &&
      (i.gap_size === "medium" || i.gap_size === "large"),
    recommendation: (mode) =>
      mode === "diagnose" ? "rethink" : "proceed_with_clarification",
  },
  7: {
    id: 7,
    name: "High Visibility, Weak Signal",
    severity: 5,
    diagnosis: "A weak signal is being amplified by visibility.",
    risk: "Public inconsistency damages trust faster than private decisions.",
    likelyReceived: "Everyone sees this. Nobody is impressed.",
    sentenceCompletion:
      "You intend to signal {intent}, but this may be received as public evidence of what you cannot or will not do because a weak signal amplified by visibility reads as a statement.",
    whatToDo: [
      "Strengthen the signal",
      "Or contain and reframe the visibility",
    ],
    coaching: {
      howToExplain: "Name the visibility. Name what the action is and is not.",
      whatToAcknowledge:
        "That the public nature of this makes the scrutiny legitimate.",
      whatNotToImply: "That the visibility is incidental. It is not.",
      whatToSayNext:
        "Where the next reinforcement, if any, will come from.",
      suggestedScript:
        "I know this is visible, so I want to be clear about what it does and does not represent.",
    },
    doNotSay: [
      "Anything that implies the visibility is incidental. It isn't.",
    ],
    takeaway:
      "Visible signals carry more weight, whether you intend them to or not.",
    fires: (i) => i.visibility === "high" && i.signal_strength === "low",
    recommendation: (mode) =>
      mode === "diagnose" ? "strengthen_signal" : "proceed_with_clarification",
  },
  8: {
    id: 8,
    name: "Strong Signal, Strong Alignment",
    severity: 1,
    diagnosis:
      "The signal is clear, credible, and aligned with expectations.",
    risk: "Low. But still requires reinforcement.",
    likelyReceived:
      "This lands. Real recognition, clearly tied to what matters.",
    sentenceCompletion:
      "You intend to signal {intent}, and this will be received as {intent} because the action matches the message and the context reinforces it.",
    whatToDo: [
      "Reinforce the message",
      "Connect it to future expectations",
    ],
    coaching: {
      howToExplain:
        "Connect the action to the work, and to what comes next.",
      whatToAcknowledge: "The specific impact that earned this.",
      whatNotToImply: "That this is a finish line.",
      whatToSayNext: "Where the trajectory goes from here.",
      suggestedScript:
        "This reflects the impact you have had and how that aligns with what we value. Let's talk about how to build on this.",
    },
    doNotSay: ["Assume silence will reinforce it. It won't."],
    takeaway: "Strong, consistent signals build trust over time.",
    fires: (i) =>
      i.signal_strength === "high" &&
      i.gap_size === "small" &&
      i.norm_consistency === "consistent",
    recommendation: () => "proceed",
  },
};

export const SCENARIO_ORDER: ScenarioId[] = [1, 2, 3, 4, 5, 6, 7, 8];

export function getScenario(id: ScenarioId): Scenario {
  return SCENARIOS[id];
}

/**
 * Run all scenarios against inputs, return ones that fire ranked by severity desc.
 * Highest severity first; ties broken by id ascending (deterministic).
 */
export function evaluateScenarios(
  inputs: DecisionInputs,
): Scenario[] {
  const fired = SCENARIO_ORDER.map((id) => SCENARIOS[id]).filter((s) =>
    s.fires(inputs),
  );
  return fired.sort((a, b) => b.severity - a.severity || a.id - b.id);
}

/** Resolves a Recommendation given mode + scenario + inputs. */
export function recommendationFor(
  scenario: Scenario,
  mode: Mode,
  inputs: DecisionInputs,
): Recommendation {
  return scenario.recommendation(
    mode === "spot_pattern" ? "diagnose" : mode,
    inputs,
  );
}
