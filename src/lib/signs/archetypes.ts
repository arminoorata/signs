/**
 * 7 organizational archetypes from brief Section 14. Used by Mode 3
 * aggregation. Names locked. Body copy v1.
 *
 * Matching rules in Section 14.1:
 * - Min 5 decisions for a named archetype (otherwise → Working Hypothesis).
 * - "Dominant" means ≥50% of decisions match the attribute.
 * - Multiple matches → most-specific pattern (highest constraint count) wins.
 * - No match with 5+ decisions → Mixed Pattern.
 */

import type {
  Archetype,
  ArchetypeId,
  DecisionEntry,
  DecisionInputs,
  DecisionResult,
  SpansMultipleManagers,
} from "./types";

export const ARCHETYPES: Record<ArchetypeId, Archetype> = {
  symbolic_signaler: {
    id: "symbolic_signaler",
    name: "The Symbolic Signaler",
    signature: "Lots of intent, not enough substance.",
    takeaway: "Intent without investment is acknowledgment, not commitment.",
    whatItLooksLike:
      "Recognition language shows up in decisions, but the dollars or equity or scope change don't. Managers say the right things. Employees feel the space between the words and the action.",
    whyItPersists:
      "It feels generous. Leaders get credit for the intent internally. The gap only shows up months later, in attrition interviews.",
    fixFirst:
      "For the next 10 decisions, require that the action size match the intent. If you cannot fund the signal, change the signal.",
    doNot: "Assume explanation closes the gap. It doesn't.",
    topRisks: [
      "Top talent quietly updates their LinkedIn when the words stop matching the dollars.",
      "Recognition inflation: language escalates to compensate for action shrinkage, until nothing sounds real.",
      "Referrals dry up first; your own team stops recommending the place.",
    ],
    priorityActions: [
      "For the next 10 decisions, require action size to match the named intent. If you cannot fund it, change the intent.",
      "Audit recent recognition decisions and calculate the gap between words and dollars. Walk that number into the leadership meeting.",
      "Establish a do-not-overclaim rule: language in a decision cannot exceed what the action supports.",
    ],
  },
  silent_eroder: {
    id: "silent_eroder",
    name: "The Silent Eroder",
    signature: "Fair decisions, weak signals, trust leaks slowly.",
    takeaway: "Trust does not usually leave with a slam. It leaks.",
    whatItLooksLike:
      "Every individual decision survives scrutiny. No single moment is a scandal. But over 18 months, the organization's top people stop believing the rewards conversation carries real weight.",
    whyItPersists:
      "Nothing breaks loudly. Nobody complains. The erosion shows up in passive signals: quiet referral declines, shrinking internal mobility applications, exit interviews that say it just felt off.",
    fixFirst:
      "Audit the 10 highest-performing employees' comp history against stated philosophy. Look for the pattern of small misses that adds up.",
    doNot: "Wait for a visible fracture. By then, the top tier is halfway out.",
    topRisks: [
      "Silent disengagement in the top quartile, invisible until a cluster of regrets lands in one quarter.",
      "Passive signals (referral decline, internal mobility drop) go unread because there is no alarm.",
      "Replacing departed top performers at 1.5–2x current comp — the real cost of silent erosion shows up in the next hire cycle.",
    ],
    priorityActions: [
      "Audit the last year of comp actions for the top 10 performers. Compare to stated philosophy. Find the gap.",
      "Interview (not survey) five top performers on how the last comp cycle felt. Listen for it just felt off.",
      "Make one high-visibility reinforcement decision for a top performer in the next 90 days. Do it right.",
    ],
  },
  inconsistent_narrator: {
    id: "inconsistent_narrator",
    name: "The Inconsistent Narrator",
    signature: "Solid logic per decision, contradictions across.",
    takeaway:
      "Every decision makes sense by itself. Together, they do not add up.",
    whatItLooksLike:
      "Each decision has a clean rationale in isolation. Compared side-by-side, the rationales conflict. Two similar employees in similar situations get meaningfully different outcomes.",
    whyItPersists:
      "Decision-makers operate one-at-a-time. No one lines them up together. The inconsistency is only visible in aggregate.",
    fixFirst:
      "Pull the last 20 comparable decisions into one view. Write the reason next to each. Where the reasons contradict, pick a governing principle.",
    doNot: "Defend each decision individually. That is how you got here.",
    topRisks: [
      "Rationales leak sideways between employees; someone pieces together the contradiction.",
      "Fairness complaints cluster by team because different managers are applying different unwritten rules.",
      "Defensive internal communications consume leadership time instead of leadership focus.",
    ],
    priorityActions: [
      "Pull the last 20 comparable decisions into one view. Write the reason next to each. Surface the contradictions.",
      "Pick one governing principle. Communicate it to managers. Commit to it.",
      "Build a decision log. Every comp decision above a threshold gets its rationale recorded in the moment, before the next one pressures the logic.",
    ],
  },
  over_explainer: {
    id: "over_explainer",
    name: "The Over-Explainer",
    signature: "Every decision needs a paragraph of justification.",
    takeaway:
      "If it needs a paragraph to defend, the signal is doing too little work.",
    whatItLooksLike:
      "Every comp cycle produces long internal justification memos. Managers get briefed with talking points before conversations. The language is careful, lawyered, and defensive.",
    whyItPersists:
      "Leaders believe a good explanation can repair a weak decision. It cannot.",
    fixFirst:
      "For the next five decisions, strengthen the signal until it no longer needs explanation. If that is impossible, name the constraint honestly.",
    doNot: "Keep writing better talking points. The problem is not the talking points.",
    topRisks: [
      "Managers lose confidence in the decisions they have to deliver, and it shows in the conversation.",
      "The justification culture trains employees to demand explanations for every decision, which scales badly.",
      "Candidates get reference-checked by current employees and hear they had to explain it a lot.",
    ],
    priorityActions: [
      "Audit average length of comp justification memos across the last cycle. Cut 50%.",
      "For the next five decisions, practice stating the signal in one sentence. If it cannot fit, strengthen the signal.",
      "Retrain managers on decision language: name what it is, name what it isn't, stop.",
    ],
  },
  improviser: {
    id: "improviser",
    name: "The Improviser",
    signature: "No stable norms, managers invent fairness per case.",
    takeaway:
      "When managers improvise, employees interpret the manager, not the system.",
    whatItLooksLike:
      "No two managers handle similar decisions the same way. Each manager becomes their own fairness brand. Employees learn which manager to work for to get which outcome.",
    whyItPersists:
      "Empowered managers feel like a feature, not a bug. Until a high-performer quits because their peer on another team got more for less.",
    fixFirst:
      "Document the decision criteria managers are actually using. Where they conflict, pick one. Train to it. Enforce it.",
    doNot: "Publish more principles and assume managers will converge. They will cite whichever principle supports their decision.",
    topRisks: [
      "Top performers learn which managers get it and route themselves there, distorting team dynamics.",
      "Manager-driven unfairness is harder to fix than system-driven unfairness; it looks personal.",
      "When a generous manager leaves, their team experiences a credibility cliff.",
    ],
    priorityActions: [
      "Collect the implicit criteria managers are actually using. Publish them. Let the contradictions surface.",
      "Pick one compensation philosophy. Train to it. Enforce it, especially against well-liked managers.",
      "Centralize comp calibration across managers for at least one full cycle.",
    ],
  },
  misread_performer: {
    id: "misread_performer",
    name: "The Misread Performer",
    signature: "Strong signals regularly misinterpreted.",
    takeaway:
      "You are doing the work. Nobody is reading it the way you meant.",
    whatItLooksLike:
      "Real investment. Real raises. Real promotions. Employees come out of these decisions confused, underwhelmed, or certain they were slighted somehow.",
    whyItPersists:
      "Leaders assume a strong action carries a strong message. It does not, not automatically. Context and framing do most of the work.",
    fixFirst:
      "Before the next high-stakes decision, write two things: what you intend it to signal, and what an employee might reasonably think it signals. Close the gap before delivery.",
    doNot: "Assume the generosity will speak for itself.",
    topRisks: [
      "Real investment is consumed without the corresponding trust return.",
      "Employees leave citing feeling undervalued from inside your highest-investment decisions.",
      "Leadership burns out explaining decisions they feel should have spoken for themselves.",
    ],
    priorityActions: [
      "Before the next high-stakes decision, write both the intent and the likely misread. Close the gap before delivery.",
      "Audit the last three generous decisions that landed poorly. Find the common framing failure.",
      "Add a framing rehearsal to the decision process: every high-signal decision gets a two-sentence pre-delivery script.",
    ],
  },
  credible_builder: {
    id: "credible_builder",
    name: "The Credible Builder",
    signature: "Strong, consistent, aligned signals. Rare and aspirational.",
    takeaway:
      "Consistency is what makes signals believable. You have earned it. Keep earning it.",
    whatItLooksLike:
      "Decisions stack. Employees can predict roughly how leadership will think about a situation before it happens. Trust compounds.",
    whyItPersists: "Deliberate work. Not luck.",
    fixFirst:
      "Write the logic down explicitly. Onboard every new manager to it. This is the archetype most likely to regress with one bad hire or one reorg.",
    doNot: "Assume it is self-sustaining. One new CPO who does not inherit the discipline, and you are back in one of the others.",
    topRisks: [
      "One reorg, one new CPO, one growth spurt, and you regress into any of the other archetypes.",
      "The logic sits in one or two heads. If they leave, the discipline leaves with them.",
      "The pattern becomes invisible to the leaders who built it, which makes it easy to let slip.",
    ],
    priorityActions: [
      "Write the logic down. Every new manager gets onboarded to it in their first 30 days.",
      "Pick two peer leaders outside the function to test the discipline annually.",
      "Name the archetype explicitly in the next leadership review: We are a Credible Builder. The job is to stay there.",
    ],
  },
};

// ── Matching logic per Section 14.1 ─────────────────────────

const DOMINANT_THRESHOLD = 0.5;

function fraction<T>(arr: T[], match: (x: T) => boolean): number {
  if (arr.length === 0) return 0;
  return arr.filter(match).length / arr.length;
}

interface ArchetypeMatch {
  id: ArchetypeId;
  constraintsSatisfied: number;
}

export function matchArchetype(
  decisions: DecisionEntry[],
  results: DecisionResult[],
  spansMultipleManagers: SpansMultipleManagers | undefined,
): {
  archetypeId: ArchetypeId | null;
  isMixedPattern: boolean;
  isWorkingHypothesis: boolean;
} {
  const isWorkingHypothesis = decisions.length < 5;
  if (isWorkingHypothesis) {
    return { archetypeId: null, isMixedPattern: false, isWorkingHypothesis: true };
  }

  const inputs: DecisionInputs[] = decisions.map((d) => d.inputs);

  const fSignalLow = fraction(inputs, (i) => i.signal_strength === "low");
  const fSignalHigh = fraction(inputs, (i) => i.signal_strength === "high");
  const fGapSmall = fraction(inputs, (i) => i.gap_size === "small");
  const fGapMediumOrLarge = fraction(
    inputs,
    (i) => i.gap_size === "medium" || i.gap_size === "large",
  );
  const fNormInconsistent = fraction(
    inputs,
    (i) => i.norm_consistency === "inconsistent",
  );
  const fNormUnclear = fraction(inputs, (i) => i.norm_consistency === "unclear");
  const fNormConsistent = fraction(
    inputs,
    (i) => i.norm_consistency === "consistent",
  );
  const fVisLow = fraction(inputs, (i) => i.visibility === "low");
  const fIntentRecognition = fraction<DecisionInputs>(
    inputs,
    (i) => i.intent === "recognition",
  );
  const fIntentRetention = fraction<DecisionInputs>(
    inputs,
    (i) => i.intent === "retention",
  );
  const fJustExtensive = fraction(
    inputs,
    (i) => i.justification_intensity === "extensive",
  );
  const fJustMinimal = fraction(
    inputs,
    (i) => i.justification_intensity === "minimal",
  );

  const meanScs =
    results.reduce((sum, r) => sum + r.scs, 0) / Math.max(1, results.length);
  const scenario5Fires = fraction(
    results,
    (r) =>
      r.primaryScenarioId === 5 || r.secondaryScenarioIds.includes(5),
  );

  const matches: ArchetypeMatch[] = [];

  // 1. Symbolic Signaler — signal_strength=low dominant + gap≥medium dominant +
  //    intent often recognition or retention.
  if (
    fSignalLow >= DOMINANT_THRESHOLD &&
    fGapMediumOrLarge >= DOMINANT_THRESHOLD
  ) {
    let constraints = 2;
    if (fIntentRecognition + fIntentRetention >= DOMINANT_THRESHOLD) constraints += 1;
    matches.push({ id: "symbolic_signaler", constraintsSatisfied: constraints });
  }

  // 2. Silent Eroder — signal_strength=low dominant + visibility=low dominant +
  //    mean per-decision SCS >= 3 (each decision looks fair on its own).
  if (
    fSignalLow >= DOMINANT_THRESHOLD &&
    fVisLow >= DOMINANT_THRESHOLD &&
    meanScs >= 3
  ) {
    matches.push({ id: "silent_eroder", constraintsSatisfied: 3 });
  }

  // 3. Inconsistent Narrator — norm_consistency=inconsistent dominant.
  if (fNormInconsistent >= DOMINANT_THRESHOLD) {
    matches.push({ id: "inconsistent_narrator", constraintsSatisfied: 1 });
  }

  // 4. Over-Explainer — justification_intensity=extensive on >=50% OR Scenario 5
  //    fires across >=50%.
  if (fJustExtensive >= DOMINANT_THRESHOLD || scenario5Fires >= DOMINANT_THRESHOLD) {
    matches.push({ id: "over_explainer", constraintsSatisfied: 1 });
  }

  // 5. Improviser — spans_multiple_managers ∈ {yes, mixed} +
  //    norm_consistency=unclear dominant + justification_intensity varies widely
  //    (at least one minimal AND at least one extensive in the set).
  if (
    (spansMultipleManagers === "yes" || spansMultipleManagers === "mixed") &&
    fNormUnclear >= DOMINANT_THRESHOLD &&
    fJustMinimal > 0 &&
    fJustExtensive > 0
  ) {
    matches.push({ id: "improviser", constraintsSatisfied: 4 });
  }

  // 6. Misread Performer — signal_strength=high dominant + gap≥medium dominant.
  if (
    fSignalHigh >= DOMINANT_THRESHOLD &&
    fGapMediumOrLarge >= DOMINANT_THRESHOLD
  ) {
    matches.push({ id: "misread_performer", constraintsSatisfied: 2 });
  }

  // 7. Credible Builder — signal_strength=high + gap=small + norm=consistent dominant.
  if (
    fSignalHigh >= DOMINANT_THRESHOLD &&
    fGapSmall >= DOMINANT_THRESHOLD &&
    fNormConsistent >= DOMINANT_THRESHOLD
  ) {
    matches.push({ id: "credible_builder", constraintsSatisfied: 3 });
  }

  if (matches.length === 0) {
    return { archetypeId: null, isMixedPattern: true, isWorkingHypothesis: false };
  }

  // Most specific (highest constraints) wins; tie -> first one.
  matches.sort((a, b) => b.constraintsSatisfied - a.constraintsSatisfied);
  return {
    archetypeId: matches[0].id,
    isMixedPattern: false,
    isWorkingHypothesis: false,
  };
}
