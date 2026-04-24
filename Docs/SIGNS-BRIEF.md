<!-- markdownlint-disable MD022 MD029 MD031 MD032 MD036 MD040 MD060 -->

# SIGNS Toolkit Brief

**Project:** SIGNS Toolkit
**Domain:** signs.arminoorata.com
**Status:** Source of truth. Self-contained.
**Date:** 2026-04-22
**Replaces:** All briefs in `./archive/`. Do not read those for build direction.

---

## 0. How to use this brief

This is the single source of truth for the SIGNS toolkit build. Any agent (Codex, Claude, or a human engineer) should be able to read this cold and execute.

**Read in order.** Sections 1–3 give context. Sections 4–18 are the product specification. Sections 19–21 are the technical and design specification. Section 22 is the build order.

**When a detail is missing, make the most premium, practical choice that supports (in priority order):**
1. Usefulness
2. Clarity
3. Output quality
4. Cohesion with FAIR
5. Premium feel
6. Extensibility

**Related projects.**
- FAIR toolkit (sibling): `/srv/projects/fair/` — deploys to `fair.arminoorata.com`.
- Main website (hub): `/srv/arminoorata.com/` — the `/frameworks` page is the hub that points to both tools.
- Voice and design tokens inherit from `/srv/arminoorata.com/References/Final_PersonalWebsite_Brief.md`.

**Review gate.** After any substantive change to this brief, to product copy, or to code, run `/srv/projects/signs/review.sh <file>`. That runs the project-standard Codex review.

---

## 1. Project goal

Build an interactive SIGNS toolkit for HR leaders, Total Rewards leaders, people managers, executives, and founders, deployed at `signs.arminoorata.com`.

SIGNS answers two connected questions about a rewards decision:

- **Before a decision:** What is this likely to signal? Where could this land differently than intended?
- **After a decision:** What did this actually communicate? Why did it not land the way leadership expected?

SIGNS stands for:
- **S**tory
- **I**ntent
- **G**ap
- **N**orms
- **S**ignal Strength

The tool is both predictive and diagnostic. It does not label modes that way (too academic). Instead, the user-facing framing is:
- **Pressure Test a Decision** (Mode 1)
- **Understand What Happened** (Mode 2)
- **Spot the Pattern** (Mode 3)

---

## 2. Success criteria

A leader opens SIGNS, completes a mode in under the estimated time, reads the results, and either:
- Adjusts the decision before delivery, or
- Understands why a past decision landed the way it did, and carries a coaching script into their next conversation.

They forward the results to a peer, or they book time with Armi. Every implementation decision should be evaluated against whether it makes that sequence more or less likely.

Leaders should feel:
- This is credible.
- This is differentiated.
- This is useful.
- This sounds like Armi.
- This could be a real product.

---

## 3. Relationship to FAIR

### Shorthand
- **FAIR = the system.** Diagnoses whether the rewards system holds up.
- **SIGNS = the signal.** Diagnoses what an individual decision inside that system is actually communicating.

### The causal link (this is what makes the pairing load-bearing)

Weak systems generate weak signals. Weak signals erode systems. It is a feedback loop.

FAIR asks: *Is the system sound?*
SIGNS asks: *What is this decision actually saying?*

Together, they move leaders from intuition and improvisation toward structured thinking and credible rewards practice.

### Combined memo (future-state north-star)

The eventual integration is a one-page artifact called the **Rewards Credibility Memo** that merges outputs from both tools into a single boardroom document. A CHRO forwards it. A founder reads it in comp-committee prep.

**This memo is future work.** Phase 5+. But today's architecture must preserve compatibility:
- Shared 1–5 scoring scale (Section 7).
- Shared archetype vocabulary at organization level.
- Shared print/PDF layout system.
- Compatible data schemas on both sides.

What today's architecture does *not* require:
- Cross-domain state between `fair.arminoorata.com` and `signs.arminoorata.com`. (They are separate origins. LocalStorage cannot bridge them without a shared backend.)
- A combined report page.
- User accounts or auth.

Cross-domain state is a v2 problem solved by one of: (a) shared backend, (b) user-initiated export/import, or (c) a shared third origin at `arminoorata.com/memo`. Do not pre-build any of them.

---

## 4. Audience

Mixed. The tool must work for:
- HR leaders
- Total Rewards leaders
- People managers
- Executives
- Founders

It should feel accessible without being watered down. Someone three years into HR and someone twenty years in should both feel the tool is sharp enough to trust.

---

## 5. Voice and tone

### Two voice contexts

**Inside the SIGNS tool (questions, results, coaching, microcopy): product-voice.**
- Declarative, not first-person. Matches FAIR's toolkit voice.
- Example: "A weak signal creates its own narrative." Not "I think weak signals create their own narratives."
- Rating-style questions use declarative statements the user agrees/disagrees with.
- Content-gathering questions use direct prompts ("What decision are you considering?") or imperatives ("Describe the decision in one or two sentences.").

**Exception: the credibility anchor block on the landing page is first-person Armi-voice.** See Section 6. This is her origin story; it has to be in her voice.

### Inherited rules (from `/srv/arminoorata.com/References/Final_PersonalWebsite_Brief.md`)

- No em dashes in site copy.
- No corporate language.
- No HR cliches.
- No consultant adjectives.
- Short sentences with rhythm.
- Active voice.
- Warm and a little dry.
- Direct, intelligent, unforced.

### Tone inside SIGNS should feel
- Direct
- Sharp
- Slightly provocative
- Modern
- Credible
- Strategic
- Clear
- Premium
- Not fluffy
- Not generic HR tech

### The experience should make users feel
> "Oh. That did not land the way I thought it would."

and

> "We are not just making isolated decisions. We are sending signals."

### Bad copy (never write this)
- "A seasoned leader with a proven track record of transformational impact."
- "Leveraging deep expertise to drive measurable outcomes."
- "Passionate advocate for equitable compensation practices."

### Good copy (this is the bar)
- "A weak signal creates its own narrative."
- "If this needs explaining, the signal may not be strong enough."
- "Consistency is what makes signals believable."

---

## 6. Landing page content (signs.arminoorata.com)

### 6.1 Hero

**SIGNS Toolkit**

*Every reward decision sends a signal.*
*Most leaders only think about the intent.*

**CTAs:**
No primary button in the hero. The three mode cards (Section 6.7) are visible immediately below the hero and act as the primary CTA. The sharp operator frame is: leaders aren't starting a quiz, they're picking a mode.

- Secondary link: **See how SIGNS works** (scrolls to framework explainer, Section 6.6)

### 6.2 Supporting copy (directly under hero)

> A raise.
> A bonus.
> A title change.
> An equity refresh.
>
> You think you are sending one message.
> Employees often receive another.
>
> That gap is where trust is built or broken.
>
> SIGNS helps you see that gap clearly, before or after it happens.

### 6.3 Why this exists (copy block)

> Most leaders focus on making the right decision.
> Employees focus on what that decision means.
>
> Those are not always the same thing.

### 6.4 Credibility anchor (first-person, Armi-voice — LOCKED COPY)

This is the only first-person block in the tool. It sits as its own section below "Why this exists," with its own visual weight.

> I've spent 20 years in HR and Total Rewards. The hardest part is never the decision itself. It's what the decision ends up meaning to the person on the receiving end.
>
> A raise can land as recognition or as a retention play. An equity refresh can read as "we're building a future with you" or "we're buying another year." A title change without cash can feel like an upgrade or an insult. Same action. Different signal.
>
> Researchers have studied this for decades. Signaling theory, psychological contracts, attribution research. Good work, but most of it sitting in journals nobody opens in an HR meeting. SIGNS was built to help take that work and turn it into something you can actually use in a comp conversation. This was built because I wanted it for myself.

### 6.5 Core idea (use throughout the experience)

> People do not experience intent. They experience patterns.

### 6.6 Framework explainer — 5 cards

One card per letter. Each card has:
- The letter (visual anchor)
- The word
- What it diagnoses (one sentence)
- 2–4 concrete examples
- One sharp diagnostic question

#### S — Story
What actually happened, without interpretation.
- A raise was approved.
- An equity refresh was denied.
- A title change happened without cash movement.

**Diagnostic question:** *What happened, without interpretation?*

#### I — Intent
What leadership meant to signal.
- Recognition
- Retention
- Promotion readiness
- Market correction

**Diagnostic question:** *What did you want this to communicate?*

#### G — Gap
Where perception diverges from intent.
- The employee expected more.
- The message felt weaker than intended.
- The action created confusion instead of clarity.

**Diagnostic question:** *How might this be interpreted differently?*

#### N — Norms
What people compare the decision to.
- Prior cases
- Peer treatment
- Timing of other decisions
- Unwritten cultural rules

**Diagnostic question:** *What are people comparing this to?*

#### S — Signal Strength
How strong or credible the signal really is.
- Symbolic
- Noticeable
- Meaningful
- Matched in size to the message

**Diagnostic question:** *Is this strong enough to be believed?*

### 6.7 Mode selector — 3 cards

Do not label these as diagnostic vs. predictive.

#### Mode 1 — Pressure Test a Decision
Use before a decision, to stress test likely interpretation.
**Time:** 7–12 minutes
**Focus:** Single decision.

#### Mode 2 — Understand What Happened
Use after a decision, to analyze why it did or did not land as intended.
**Time:** 40–55 minutes
**Focus:** Single decision with deeper context and coaching output.

#### Mode 3 — Spot the Pattern
Use across multiple decisions, to identify repeated signaling issues and surface an organization-level archetype.
**Time:** 45–60+ minutes
**Focus:** Multi-decision analysis.

---

## 7. Scoring: the Signal Credibility Score (SCS)

### 7.1 The score

Every Mode 1 and Mode 2 result produces a single composite **Signal Credibility Score (SCS)** on a 1–5 scale. Mode 3 produces a per-decision SCS for each decision in the pattern, plus an aggregate SCS for the whole pattern.

This is the FAIR-parallel rollup. Leaders should be able to talk about it the same way they talk about a FAIR score.

### 7.2 Anchor definitions

| SCS | Name | Meaning |
|-----|------|---------|
| 5 | **Credible & Coherent** | Strong signal, small gap, consistent with past decisions. All positive criteria met. The message will land as intended. |
| 4 | **Mostly Credible** | No risk flags triggered, or strong fundamentals with one visible risk flag. Likely to land, worth reinforcing. |
| 3 | **Mixed Signal** | Viable but vulnerable. Will land for some people, not others. Interpretation will vary. |
| 2 | **Weak Signal** | Significant gap between intent and likely interpretation. Expect misreading. |
| 1 | **Broken Signal** | Multiple red flags. Trust damage is probable. |

### 7.3 Computation

SCS is computed from four of the nine input variables in Section 8: `gap_size`, `signal_strength`, `norm_consistency`, `visibility`. The other five (`intent`, `intent_clarity`, `justification_intensity`, `confidence`, `decision_type`) feed the scenario engine (Section 9), which feeds SCS via scenario firings.

**Scoring rule (v1):**

1. Start with SCS = 4 (the "no risk flags" default).
2. If Scenario 8 fires (`signal_strength = high` AND `gap_size = small` AND `norm_consistency = consistent`), set SCS = 5. This is how 5 is earned — only through positive confirmation.
3. For each firing scenario with severity weight ≥ 3 (Section 9.3), subtract 1 from SCS.
4. For `gap_size = large` without a scenario already penalizing it, subtract 1.
5. For `visibility = high` combined with `signal_strength = low` (the Scenario 7 amplification), subtract an additional 1. This applies even if Scenario 7 is already firing, because the amplification is structural.
6. Floor at 1, ceiling at 5.

This produces an integer. Results page displays the number and the name from Section 7.2.

**Default state explained.** A decision with no firing scenarios (Baseline Healthy Signal, Section 9.4) scores SCS = 4, not 5. The 5 anchor requires positive confirmation via Scenario 8; silence is not the same as strength. This keeps the score honest without making the tool alarmist.

**Why not just average the inputs?** Averaging hides compounding. A weak signal AND a norm conflict is worse than either alone; the score must reflect compounding, not averaging.

### 7.4 Results page display

- The SCS number and name, visually prominent.
- The four scalar dimensions shown underneath (`gap_size`, `signal_strength`, `norm_consistency`, `visibility`), so the leader can see what drove the score.
- The primary scenario name (Section 9).
- Secondary flags (other firing scenarios), if any.

---

## 8. Input model

Every scenario is normalized into these nine variables. All are collected as structured inputs (enums or scalars) so the engine runs fully deterministically in v1. No open-text interpretation.

**Display labels vs storage keys — locked rule.** User-facing copy never shows snake_case storage keys. Every enum has two layers: a display label (e.g., "Title change," "Promotion readiness") shown in the UI, and a storage key (e.g., `title_change`, `promotion_readiness`) used in logic, storage, and exports. In this brief, storage keys are shown in `backticks` in the table below; display labels are shown in Title Case in the mode question sections. The data model must enforce this separation at the type level.

| Variable | Type | Values |
|----------|------|--------|
| `intent` | enum | `recognition`, `retention`, `promotion_readiness`, `correction`, `growth`, `other` |
| `intent_clarity` | enum | `one`, `two`, `several_or_unclear` |
| `gap_size` | scalar | `small`, `medium`, `large` |
| `signal_strength` | scalar | `low`, `medium`, `high` |
| `norm_consistency` | scalar | `consistent`, `inconsistent`, `unclear` |
| `visibility` | scalar | `low`, `medium`, `high` |
| `justification_intensity` | scalar | `minimal`, `moderate`, `extensive` |
| `confidence` | scalar | `low`, `medium`, `high` (user's self-rated confidence that the decision will land as intended) |
| `decision_type` | enum | `raise`, `bonus`, `promotion`, `title_change`, `equity_refresh`, `market_correction`, `other` |

---

## 9. Scenario engine

### 9.1 The 8 scenarios

Each scenario is a combination of inputs that represents a named signaling pattern. Each has:

- Input pattern (the trigger)
- Severity weight (for tiebreaking; Section 9.3)
- Diagnosis
- Risk
- Likely received signal (what an employee is most likely to hear)
- Recommendation (output enum; see below)
- What to do (short list of actions)
- Coaching (5 sections per Section 17: how to explain, what to acknowledge, what not to imply, what to say next, suggested script)
- Do not say
- Takeaway (one-line, used as the results hero)

**Recommendation enum:**

- `proceed` — no change needed.
- `proceed_with_clarification` — deliver the decision, but explicitly address the interpretation risk.
- `strengthen_signal` — the action is too small to carry the intended message; increase the signal before delivery, or accept the message will not land.
- `rethink` — the decision in its current form creates more trust risk than it resolves. Stop and redesign before delivering.

This enum is locked. Scenario-by-scenario mappings are specified in each scenario's block below.

#### Scenario 1 — Weak Signal, Strong Intent
**Pattern:** `signal_strength = low` and `gap_size ∈ {medium, large}`
**Severity:** 3

**Diagnosis:** You intended to send a strong message, but the signal is too small to be credible.

**Risk:** Likely interpreted as symbolic, not meaningful. Feels like acknowledgment without commitment.

**Likely received signal:** *Nice words. Small action. Probably not much behind it.*

**Recommendation (output enum):** `strengthen_signal` if `signal_strength = low` and `confidence = low`; otherwise `proceed_with_clarification`.

**What to do:**
- Increase the signal, or
- Reset expectations explicitly.

**Coaching (5 sections):**
- **How to explain this clearly:** Name the action honestly. Do not inflate the language to match the intent.
- **What to acknowledge upfront:** The size of this reflects specific constraints, not the level of the contribution.
- **What not to imply:** A step change, a guarantee, or a full acknowledgment the action cannot actually support.
- **What to say next about future progression:** What would need to happen for a larger step to be in scope, and roughly when.
- **Suggested script:**
> "I want to be clear about what this reflects and what it doesn't. This is recognition for your contribution, but it's not meant to signal a step change yet. Here's what would need to happen for that next step."

**Do not say:**
- "This is a big step" (if it isn't).
- "This shows how much we value you" (without substance behind it).

**Takeaway:** *A weak signal creates its own narrative.*

---

#### Scenario 2 — Strong Signal, Misread Intent
**Pattern:** `signal_strength = high` and `gap_size ∈ {medium, large}`
**Severity:** 4

**Diagnosis:** The signal is strong, but it is being interpreted differently than intended.

**Risk:** You may be accidentally signaling promotion, favoritism, or long-term commitment.

**Likely received signal:** *This means more than they said. Probably a signal about what's coming next.*

**Recommendation (output enum):** `proceed_with_clarification`.

**What to do:**
- Clarify intent immediately.
- Anchor expectations before assumptions spread.

**Coaching (5 sections):**
- **How to explain this clearly:** Anchor the specific reason this decision was made. Preempt the broader inference.
- **What to acknowledge upfront:** The visibility and weight of this action will drive interpretation, so being explicit matters.
- **What not to imply:** Silence. Ambiguity. Anything open to over-read.
- **What to say next about future progression:** Ground the conversation in what the next step actually requires.
- **Suggested script:**
> "I want to clarify how to interpret this. This reflects [specific reason], not a broader shift in role or expectations. Let's talk about what the next step would actually look like."

**Do not say:**
- Nothing. Silence makes this worse.

**Takeaway:** *A strong signal without context gets over-interpreted.*

---

#### Scenario 3 — Norm Conflict
**Pattern:** `norm_consistency = inconsistent` and `gap_size ∈ {medium, large}`
**Severity:** 3

**Diagnosis:** This decision may be reasonable in isolation, but it conflicts with existing patterns.

**Risk:** Employees interpret fairness through comparison. This can trigger perceptions of inconsistency or favoritism.

**Likely received signal:** *This is different from how similar cases went. Why.*

**Recommendation (output enum):** `proceed_with_clarification` if the difference is defensible; `rethink` if the broader pattern is what needs correcting.

**What to do:**
- Acknowledge the inconsistency.
- Explain the difference explicitly, or
- Correct the broader pattern.

**Coaching (5 sections):**
- **How to explain this clearly:** Name the comparable cases. Name what is different about this one.
- **What to acknowledge upfront:** The comparison is legitimate, and you have considered it.
- **What not to imply:** "Every situation is different" as a deflection. It will read as evasion.
- **What to say next about future progression:** What governing principle makes the distinction, and how it applies forward.
- **Suggested script:**
> "I know this may feel inconsistent compared to other situations. Here's what's different in this case, and why the decision reflects that difference."

**Do not say:**
- "Every situation is different" (without explanation).

**Takeaway:** *Consistency is what makes signals believable.*

---

#### Scenario 4 — High Gap, Low Awareness
**Pattern:** `gap_size = large` AND `confidence = high`.
**Severity:** 5

The combination is diagnostic on its own: a leader who rates themselves confident on a decision they also rate as large-gap is displaying the blindness the scenario names.

**Diagnosis:** There is a significant gap between intent and perception, and it is likely being underestimated.

**Risk:** Trust can erode without visible conflict. Silent disengagement is likely.

**Likely received signal:** *Something is off, and I am not sure they see it.*

**Recommendation (output enum):** `rethink` if the decision has not been delivered; `proceed_with_clarification` if delivered, with immediate perception check.

**What to do:**
- Surface the perception gap directly.
- Invite feedback.
- Correct or clarify quickly.

**Coaching (5 sections):**
- **How to explain this clearly:** Surface the gap yourself, before the employee has to raise it.
- **What to acknowledge upfront:** The risk that your intent was not what came through.
- **What not to imply:** That you already know how this landed. You do not.
- **What to say next about future progression:** Depends on what you hear. Listen first, commit second.
- **Suggested script:**
> "I want to check how this landed for you. My intent was [specific], but I want to make sure that's how it was received."

**Do not say:**
- "I thought this was clear."

**Takeaway:** *Unseen gaps are the most dangerous.*

---

#### Scenario 5 — Overreliance on Explanation
**Pattern:** `signal_strength ∈ {low, medium}` AND `justification_intensity = extensive`.
**Severity:** 2

**Diagnosis:** The signal only makes sense if it is explained.

**Risk:** If something needs a long explanation, it often lacks credibility on its own.

**Likely received signal:** *They are working hard to make this sound fair.*

**Recommendation (output enum):** `strengthen_signal` if possible; otherwise `proceed_with_clarification` with a pared-down message.

**What to do:**
- Strengthen the signal, or
- Simplify the message.

**Coaching (5 sections):**
- **How to explain this clearly:** Say the one true thing. Stop.
- **What to acknowledge upfront:** That if the signal does not speak for itself, the explanation will not fix it.
- **What not to imply:** That justification equals credibility. It does not.
- **What to say next about future progression:** Name the constraint that made the signal small. Do not dress it up.
- **Suggested script:**
> "I want to explain this clearly, but also acknowledge that the signal itself may not feel strong enough. Let's talk about that directly."

**Do not say:**
- Long, defensive justifications.

**Takeaway:** *If it needs explaining, it may not be strong enough.*

---

#### Scenario 6 — Misaligned Intent
**Pattern:** `intent_clarity ∈ {two, several_or_unclear}` AND `gap_size ∈ {medium, large}`.
**Severity:** 4

**Diagnosis:** The action and the intended message are not aligned.

**Risk:** You are sending mixed signals, which creates confusion and weakens trust.

**Likely received signal:** *Not sure what this is supposed to mean.*

**Recommendation (output enum):** `rethink` if the decision has not been delivered; `proceed_with_clarification` only if intent can be credibly re-anchored in delivery.

**What to do:**
- Re-anchor the decision to a clear intent.
- Align action with message.

**Coaching (5 sections):**
- **How to explain this clearly:** Pick one intent. Name it clearly. Everything else stays out of the conversation.
- **What to acknowledge upfront:** That previous framing may have sent competing signals.
- **What not to imply:** That all of the intents were compatible. They usually are not.
- **What to say next about future progression:** What this decision is, and what it is not.
- **Suggested script:**
> "I want to reset how this should be interpreted. The intention here is [specific], and if that is not coming through clearly, that is on us to fix."

**Do not say:**
- Vague or hedged language.

**Takeaway:** *Mixed signals weaken credibility fast.*

---

#### Scenario 7 — High Visibility, Weak Signal
**Pattern:** `visibility = high` AND `signal_strength = low`
**Severity:** 5

**Diagnosis:** A weak signal is being amplified by visibility.

**Risk:** Public inconsistency damages trust faster than private decisions.

**Likely received signal:** *Everyone sees this. Nobody is impressed.*

**Recommendation (output enum):** `strengthen_signal` if budget or scope allows; otherwise `proceed_with_clarification` with proactive reframing before assumptions set.

**What to do:**
- Strengthen the signal, or
- Contain and reframe the visibility.

**Coaching (5 sections):**
- **How to explain this clearly:** Name the visibility. Name what the action is and is not.
- **What to acknowledge upfront:** That the public nature of this makes the scrutiny legitimate.
- **What not to imply:** That the visibility is incidental. It is not.
- **What to say next about future progression:** Where the next reinforcement, if any, will come from.
- **Suggested script:**
> "I know this is visible, so I want to be clear about what it does and does not represent."

**Do not say:**
- Anything that implies the visibility is incidental. It isn't.

**Takeaway:** *Visible signals carry more weight, whether you intend them to or not.*

---

#### Scenario 8 — Strong Signal, Strong Alignment
**Pattern:** `signal_strength = high` AND `gap_size = small` AND `norm_consistency = consistent`
**Severity:** 1

**Diagnosis:** The signal is clear, credible, and aligned with expectations.

**Risk:** Low. But still requires reinforcement.

**Likely received signal:** *This lands. Real recognition, clearly tied to what matters.*

**Recommendation (output enum):** `proceed`.

**What to do:**
- Reinforce the message.
- Connect it to future expectations.

**Coaching (5 sections):**
- **How to explain this clearly:** Connect the action to the work, and to what comes next.
- **What to acknowledge upfront:** The specific impact that earned this.
- **What not to imply:** That this is a finish line.
- **What to say next about future progression:** Where the trajectory goes from here.
- **Suggested script:**
> "This reflects the impact you have had and how that aligns with what we value. Let's talk about how to build on this."

**Do not say:**
- Assume silence will reinforce it. It won't.

**Takeaway:** *Strong, consistent signals build trust over time.*

---

### 9.2 Classification order

For each completed decision:

1. Evaluate all 8 scenarios against the inputs.
2. Collect every scenario whose pattern fires.
3. If no scenarios fire, route to **Baseline Healthy Signal** (Section 9.4).
4. Otherwise, rank firing scenarios by severity weight (Section 9.3), highest first.
5. The highest-severity firing scenario is the **primary scenario**. All others are **secondary flags**.

### 9.3 Severity weights

| Scenario | Weight |
|----------|--------|
| 4 — High Gap, Low Awareness | 5 |
| 7 — High Visibility, Weak Signal | 5 |
| 2 — Strong Signal, Misread Intent | 4 |
| 6 — Misaligned Intent | 4 |
| 3 — Norm Conflict | 3 |
| 1 — Weak Signal, Strong Intent | 3 |
| 5 — Overreliance on Explanation | 2 |
| 8 — Strong Signal, Strong Alignment | 1 |

**Weights are editable.** Real-world usage may surface a different ranking. Treat these as v1.

### 9.4 Unclassified fallback — Baseline Healthy Signal

When no scenario fires:

> **Baseline Healthy Signal.** No risk flags triggered. The decision looks coherent with its intent. Reinforce the message, connect it to what happens next, and move on.

No coaching script. No "what not to say." The tool should be willing to say "this is fine." That willingness builds trust in the diagnostic.

---

## 10. Open-text question policy

### 10.1 v1 policy (LOCKED)

Open-text fields serve two jobs:
1. **Thinking aid.** Asking the user to articulate something often does the work of the diagnosis. The act of writing surfaces the issue.
2. **Verbatim echo.** The user's exact words are pulled into the strategic summary, quoted, and cross-referenced with the scenario classification.

Example output voice:
> "You wrote: *'I want them to feel like this promotion reflects two years of consistent delivery, not just a reaction to the competing offer.'* That intent is clear. But the inputs suggest a large gap between that message and how the employee will likely read the timing. See Scenario 2 below."

Open-text fields are NOT interpreted by any engine in v1. The enum inputs drive classification; open text personalizes the output.

**Design implication:** Every signal the engine needs must be captured as a structured input (Section 8). Where the original scenario patterns referenced inferred signals (confidence, intent clarity, justification weight), those signals now come from explicit questions answered on enums or scalars. The user is always asked directly. The engine never guesses.

### 10.2 Future (v2+)

An LLM pass may interpret open-text and refine classifications. Architect the data model to support this later without rework. Do not build it in v1.

---

## 11. Mode 1 — Pressure Test a Decision

### 11.1 Purpose
Fast, predictive, single-decision use. Before the decision is delivered.

### 11.2 Time estimate
7–12 minutes. (Grew slightly from the original 5–10 with the addition of the four structured inputs required by the engine.)

### 11.3 Questions

**Story**

1. What decision are you considering? *(options: Raise / Bonus / Promotion / Title change / Equity refresh / Market correction / Other)* → `decision_type` (storage keys: `raise`, `bonus`, `promotion`, `title_change`, `equity_refresh`, `market_correction`, `other`)
2. Describe the decision in one or two sentences. *(open text)*

**Intent**

3. What are you trying to signal? *(options: Recognition / Retention / Promotion readiness / Correction / Growth / Other)* → `intent` (storage keys: `recognition`, `retention`, `promotion_readiness`, `correction`, `growth`, `other`)
4. Is this decision trying to signal one thing, or several things at once? *(one / two / several or unclear)* → `intent_clarity`
5. What do you want the employee to feel or understand? *(open text)*

**Gap**

6. What could be misread about this decision? *(open text)*
7. What part of the message feels vulnerable to misinterpretation? *(open text)*
8. How large is the gap between your intent and how this is likely to be received? *(small / medium / large)* → `gap_size`

**Norms**

9. What will they compare this to? *(open text)*
10. Does this feel consistent with similar situations? *(consistent / inconsistent / unclear)* → `norm_consistency`

**Signal Strength**

11. How meaningful is the change? *(low / medium / high)* → `signal_strength`
12. How visible is this to others? *(low / medium / high)* → `visibility`
13. How much justifying does this decision require to feel fair? *(minimal / moderate / extensive)* → `justification_intensity`

**Confidence check (final question)**

14. How confident are you that this will land the way you intend? *(low / medium / high)* → `confidence`

This is the Scenario 4 trap. A user who rates themselves confident on a large-gap decision is displaying the blindness Scenario 4 diagnoses.

### 11.4 Outputs

- Primary scenario (Section 9)
- Secondary flags
- Signal Credibility Score (Section 7)
- Likely intended signal (derived from intent + decision_type)
- Likely received signal (derived from scenario classification)
- Short diagnosis (scenario-specific)
- Sentence-completion format: *"You intend to signal ___, but this may be received as ___ because ___."*
- One-line takeaway (scenario takeaway line)
- What to clarify before moving forward
- Manager coaching language
- Recommendation: *proceed / proceed with clarification / strengthen the signal / rethink the decision*

---

## 12. Mode 2 — Understand What Happened

### 12.1 Purpose
Diagnostic, reflective, single-decision analysis. After the decision has been delivered.

### 12.2 Time estimate
40–55 minutes. (Grew from the original 35–45 with the addition of the five structured inputs required by the engine.)

### 12.3 Questions

**Story**

1. What happened? *(open text)*
2. What type of decision was it? *(enum)* → `decision_type`
3. What context matters here? *(open text)*
4. What else was happening around the same time? *(open text)*

**Intent**

5. What was leadership trying to communicate? *(open text)*
6. Which of these best describes what leadership was trying to signal? *(options: Recognition / Retention / Promotion readiness / Correction / Growth / Other)* → `intent` (see Mode 1 Q3 for storage keys)
7. Was the decision trying to signal one thing, or several things at once? *(one / two / several or unclear)* → `intent_clarity`
8. Why was this decision made now? *(open text)*
9. What behavior or outcome was this meant to reinforce? *(open text)*

**Gap**

10. What reaction occurred? *(open text)*
11. What felt off? *(open text)*
12. What assumption might the employee have made? *(open text)*

Prompt the user with: *If they explained this to a friend, what would they probably say?*

13. Looking back, how large was the gap between the intent and how it was received? *(small / medium / large)* → `gap_size`

**Norms**

14. What are they likely comparing this to? *(open text)*
15. Are there similar cases that make this look inconsistent? *(consistent / inconsistent / unclear)* → `norm_consistency`
16. What pattern has the organization taught people to expect? *(open text)*

Prompt the user with: *From their perspective, is this fair, or just different?*

**Signal Strength**

17. Was the decision meaningful enough to support the message? *(low / medium / high)* → `signal_strength`
18. How visible is this to others in the organization? *(low / medium / high)* → `visibility`
19. How much justifying did this decision require to feel fair when delivered? *(minimal / moderate / extensive)* → `justification_intensity`

**Confidence check (final question)**

20. At the time, how confident was leadership that this would land the way intended? *(low / medium / high)* → `confidence`

The confidence question is asked retrospectively. A leader who rates original confidence as high on a decision now judged to have a large gap is revealing the exact pattern Scenario 4 (High Gap, Low Awareness) is built to catch.

### 12.4 Outputs

- Full diagnosis (scenario-based, with verbatim echoes from the user's open-text answers)
- Likely received signal
- Size of the gap
- Risk framing
- What probably drove the misread
- Strategic summary (Section 16)
- What to do next
- Manager coaching language (Section 17)
- What not to say
- One sharp takeaway
- Signal Credibility Score

---

## 13. Mode 3 — Spot the Pattern

### 13.1 Purpose
Multi-decision pattern analysis. Organization-level insight. Produces a named archetype.

### 13.2 Time estimate
45–60+ minutes.

### 13.3 Input design

Before collecting individual decisions, ask one meta-level question about the set:

- *"Do these decisions span multiple managers or decision-makers?"* (yes / no / mixed) → `spans_multiple_managers`

This single structured input is what The Improviser archetype (Section 14) needs. It does not require per-decision manager identifiers, which keeps the flow short.

Then the user enters 3 to 10 decisions. For each, collect:

- Decision type *(enum)* → `decision_type`
- Short story *(open text)*
- Intended signal *(enum)* → `intent`
- Intent clarity *(one / two / several or unclear)* → `intent_clarity`
- Observed or expected reaction *(open text)*
- Gap size *(small / medium / large)* → `gap_size`
- Signal strength *(low / medium / high)* → `signal_strength`
- Visibility *(low / medium / high)* → `visibility`
- Norm consistency *(consistent / inconsistent / unclear)* → `norm_consistency`
- Justification intensity *(minimal / moderate / extensive)* → `justification_intensity`
- Confidence at the time *(low / medium / high)* → `confidence`

Per-decision: 9 structured inputs + 2 open text. Enough to run the full scenario engine per decision, then aggregate to the archetype layer.

### 13.4 Pattern analysis goals

Detect across the decision set:
- Repeated gaps
- Repeated weak signals
- Inconsistency across similar cases
- Overreliance on explanation
- Strong intent with weak credibility
- Public decisions with poor coherence
- One-off logic that has quietly become the norm

### 13.5 Outputs

- **Organizational archetype** (Section 14) — the named pattern
- Dominant signal pattern (short description)
- Top 3 risks
- Consistency score (1–5, per formula in Section 13.7)
- Clarity score (1–5, per formula in Section 13.7)
- Aggregate Signal Credibility Score (1–5, per formula in Section 13.7)
- Likely trust risk
- Strategic summary
- Recommended priority actions (ordered)
- Coaching themes for leaders and managers

### 13.6 Example output patterns

- "You are signaling inconsistency across similar decisions."
- "Your intent is strong, but your signals are too weak to be believed."
- "Employees are likely interpreting flexibility as unpredictability."
- "The logic may exist in leadership's head, but not in the employee experience."

### 13.7 Mode 3 scoring formulas

All three scores are on a 1–5 scale. Only the Aggregate SCS uses the SCS name vocabulary from Section 7.2 ("Credible & Coherent," "Broken Signal," etc.). Consistency and Clarity have their own shorter labels, because saying "Consistency Score: Mostly Credible" or "Clarity Score: Broken Signal" does not read cleanly.

**Consistency labels:**

- 5: Aligned
- 4: Mostly Aligned
- 3: Mixed
- 2: Inconsistent
- 1: Broken

**Clarity labels:**

- 5: Clear
- 4: Mostly Clear
- 3: Mixed
- 2: Weak
- 1: Broken

Let `f_x` denote the fraction of decisions in the set with attribute `x`. `f_consistent + f_inconsistent + f_unclear = 1` for `norm_consistency`, and similarly for other categoricals.

**Consistency score (1–5).**

```
Consistency = round(5 × f_consistent + 3 × f_unclear + 1 × f_inconsistent)
```

- All decisions consistent → 5 (Aligned).
- All unclear → 3 (Mixed).
- All inconsistent → 1 (Broken).

**Clarity score (1–5).** Measures how small the intent-to-interpretation gap is across the decision set.

```
Clarity = round(5 × f_small + 3 × f_medium + 1 × f_large)
```

Where `f_small`, `f_medium`, `f_large` are fractions of decisions with `gap_size = small / medium / large`.

**Aggregate Signal Credibility Score (1–5).** Mean of per-decision SCS with a compounding penalty when spread is wide.

```
per_decision_scs  = SCS for each decision (Section 7.3)
mean_scs          = arithmetic mean of per-decision SCS values
spread            = max(per_decision_scs) - min(per_decision_scs)
spread_penalty    = 1 if spread >= 2, else 0

Aggregate SCS    = max(1, round(mean_scs) - spread_penalty)
```

The penalty captures the fact that inconsistent credibility across decisions is itself a trust signal. A set of five 4s is not the same as a set that averages to 4 but ranges from 1 to 5.

**Floor all scores at 1, ceiling at 5.**

---

## 14. Organizational archetypes (Mode 3 output)

Seven committed archetypes. Each maps to an input pattern across the decision set, a signature sentence, and supporting copy that mirrors FAIR's archetype treatment.

**Copy status:** Archetype names are LOCKED. Takeaway lines, "what this looks like," "fix first," and "do not" are v1 drafts subject to the next iteration round.

---

### 1. The Symbolic Signaler
**Input pattern:** Most decisions have `signal_strength = low` AND `gap_size ∈ {medium, large}`. Intent is frequently `recognition` or `retention`.

**Takeaway sentence:** *Intent without investment is acknowledgment, not commitment.*

**What it looks like:** Recognition language shows up in decisions, but the dollars or equity or scope change don't. Managers say the right things. Employees feel the space between the words and the action.

**Why it persists:** It feels generous. Leaders get credit for the intent internally. The gap only shows up months later, in attrition interviews.

**Fix first:** For the next 10 decisions, require that the action size match the intent. If you cannot fund the signal, change the signal.

**Do not:** Assume explanation closes the gap. It doesn't.

---

### 2. The Silent Eroder
**Input pattern:** `signal_strength = low` dominant across the set AND `visibility = low` dominant AND mean(per-decision SCS) ≥ 3. The per-decision floor captures "individual decisions look fair on their own" deterministically — each one passes the credibility threshold, but the pattern leaks.

**Takeaway sentence:** *Trust does not usually leave with a slam. It leaks.*

**What it looks like:** Every individual decision survives scrutiny. No single moment is a scandal. But over 18 months, the organization's top people stop believing the rewards conversation carries real weight.

**Why it persists:** Nothing breaks loudly. Nobody complains. The erosion shows up in passive signals: quiet referral declines, shrinking internal mobility applications, exit interviews that say "it just felt off."

**Fix first:** Audit the 10 highest-performing employees' comp history against stated philosophy. Look for the pattern of small misses that adds up.

**Do not:** Wait for a visible fracture. By then, the top tier is halfway out.

---

### 3. The Inconsistent Narrator
**Input pattern:** `norm_consistency = inconsistent` across most decisions, even when individual `gap_size` is small.

**Takeaway sentence:** *Every decision makes sense by itself. Together, they do not add up.*

**What it looks like:** Each decision has a clean rationale in isolation. Compared side-by-side, the rationales conflict. Two similar employees in similar situations get meaningfully different outcomes.

**Why it persists:** Decision-makers operate one-at-a-time. No one lines them up together. The inconsistency is only visible in aggregate.

**Fix first:** Pull the last 20 comparable decisions into one view. Write the reason next to each. Where the reasons contradict, pick a governing principle.

**Do not:** Defend each decision individually. That is how you got here.

---

### 4. The Over-Explainer
**Input pattern:** `justification_intensity = extensive` on ≥50% of decisions, OR Scenario 5 fires across ≥50% of decisions.

**Takeaway sentence:** *If it needs a paragraph to defend, the signal is doing too little work.*

**What it looks like:** Every comp cycle produces long internal justification memos. Managers get briefed with talking points before conversations. The language is careful, lawyered, and defensive.

**Why it persists:** Leaders believe a good explanation can repair a weak decision. It cannot.

**Fix first:** For the next five decisions, strengthen the signal until it no longer needs explanation. If that is impossible, name the constraint honestly.

**Do not:** Keep writing better talking points. The problem is not the talking points.

---

### 5. The Improviser
**Input pattern:** `spans_multiple_managers ∈ {yes, mixed}` AND `norm_consistency = unclear` dominant AND `justification_intensity` varies widely across decisions (at least one `minimal` and at least one `extensive` in the set).

**Takeaway sentence:** *When managers improvise, employees interpret the manager, not the system.*

**What it looks like:** No two managers handle similar decisions the same way. Each manager becomes their own fairness brand. Employees learn which manager to work for to get which outcome.

**Why it persists:** Empowered managers feel like a feature, not a bug. Until a high-performer quits because their peer on another team got more for less.

**Fix first:** Document the decision criteria managers are actually using. Where they conflict, pick one. Train to it. Enforce it.

**Do not:** Publish more principles and assume managers will converge. They will cite whichever principle supports their decision.

---

### 6. The Misread Performer
**Input pattern:** `signal_strength = high` but `gap_size ∈ {medium, large}` across most decisions.

**Takeaway sentence:** *You are doing the work. Nobody is reading it the way you meant.*

**What it looks like:** Real investment. Real raises. Real promotions. Employees come out of these decisions confused, underwhelmed, or certain they were slighted somehow.

**Why it persists:** Leaders assume a strong action carries a strong message. It does not, not automatically. Context and framing do most of the work.

**Fix first:** Before the next high-stakes decision, write two things: what you intend it to signal, and what an employee might reasonably think it signals. Close the gap before delivery.

**Do not:** Assume the generosity will speak for itself.

---

### 7. The Credible Builder
**Input pattern:** `signal_strength = high` AND `gap_size = small` AND `norm_consistency = consistent` across most decisions.

**Takeaway sentence:** *Consistency is what makes signals believable. You have earned it. Keep earning it.*

**What it looks like:** Decisions stack. Employees can predict roughly how leadership will think about a situation before it happens. Trust compounds.

**Why it persists:** Deliberate work. Not luck.

**Fix first:** Write the logic down explicitly. Onboard every new manager to it. This is the archetype most likely to regress with one bad hire or one reorg.

**Do not:** Assume it is self-sustaining. One new CPO who does not inherit the discipline, and you are back in one of the others.

---

### 14.1 Archetype matching logic

1. For each decision in the Mode 3 input set, run the scenario engine (Section 9).
2. Aggregate across the set: compute distributions of `signal_strength`, `gap_size`, `norm_consistency`, `visibility`, firing-scenario counts.
3. Test each archetype's input pattern against the aggregate. "Dominant" means ≥50% of decisions.
4. If multiple archetypes match, select the one with the most specific pattern (highest number of constraints satisfied).
5. If no archetype matches cleanly, surface a "Mixed Pattern" state that shows the dominant tendency without forcing a name.

---

## 15. Results page requirements

The results page should feel sharp, premium, and useful. Never a score dump.

Two distinct hierarchies: one for single-decision results (Modes 1 and 2), one for pattern results (Mode 3). Both end with the same What's Next conversion block (15.3).

### 15.1 Single-decision hierarchy (Modes 1 and 2)

Two variants. The full variant (for any firing scenario) and the healthy variant (for Baseline Healthy Signal from Section 9.4).

**Full variant — any firing scenario:**

1. **Hero line.** The one-line takeaway (scenario takeaway from Section 9). Visually dominant. The thing the leader screenshots.
2. **Signal Credibility Score.** Large. Centered. Named per Section 7.2.
3. **Sentence completion.** *"You intend to signal ___, but this may be received as ___ because ___."*
4. **Primary scenario.** Diagnosis + risk.
5. **Secondary flags** (if any). Scenario names with a one-line note each.
6. **Dimensions breakdown.** The four core scalars (`gap_size`, `signal_strength`, `norm_consistency`, `visibility`) visualized so the leader can see what drove the score.
7. **What to do next.** Ordered actions.
8. **Manager coaching block.** (Section 17.)
9. **What not to say.** Short. Blunt.
10. **Strategic summary.** (Section 16.)
11. **Print / export CTA.** (Section 18.)
12. **What's Next block.** (Section 15.3.)

**Healthy variant — Baseline Healthy Signal:**

1. **Hero line.** *"No risk flags triggered. The decision looks coherent with its intent."*
2. **Signal Credibility Score.** 4 — *Mostly Credible.* (Per Section 7.3, a 5 requires positive confirmation via Scenario 8; Baseline Healthy lacks that positive confirmation by definition.)
3. **Sentence completion.** *"You intend to signal ___, and this will likely be received as intended because ___."*
4. **Reinforcement prompt.** One short paragraph: *"Reinforce the message. Connect it to what happens next. Then move on. Healthy signals need visibility, not defense."*
5. **Dimensions breakdown.** The four core scalars shown, so the leader can see why the engine didn't flag.
6. **Print / export CTA.**
7. **What's Next block.** (Section 15.3.)

No manager script. No "what not to say." No separate strategic summary — the reinforcement prompt IS the healthy-path strategic summary. Confidently saying "this is fine" is the feature.

### 15.2 Pattern hierarchy (Mode 3)

1. **Archetype name + takeaway sentence.** Hero. Visually dominant. The thing the CHRO screenshots.
2. **Three-score band.** Aggregate Signal Credibility Score, Consistency Score, Clarity Score, side-by-side. Aggregate SCS uses the SCS name vocabulary from Section 7.2. Consistency uses the labels from Section 13.7 (Aligned / Mostly Aligned / Mixed / Inconsistent / Broken). Clarity uses the labels from Section 13.7 (Clear / Mostly Clear / Mixed / Weak / Broken). Three distinct label sets, side by side, by design.
3. **Archetype block.** *What it looks like / Why it persists / Fix first / Do not.* (Section 14 copy.)
4. **Top 3 risks.** Ranked. One line each.
5. **Priority actions.** Ordered list, 3–5 items.
6. **Per-decision strip.** Small summary cards for each decision in the set: decision type, primary scenario, per-decision SCS. Lets the leader see the pattern without reopening individual decisions.
7. **Coaching themes.** General guidance for leaders and managers. Not per-decision.
8. **Strategic summary.** (Section 16, pattern-level.)
9. **Print / export CTA.** (Section 18.)
10. **What's Next block.** (Section 15.3.)

Mode 3 does not include a sentence-completion, a single manager script, or a single "what not to say." Those are decision-level artifacts and do not survive aggregation.

### 15.3 What's Next block (conversion path, applies to all modes)

This is the business loop the success criteria (Section 2) implies. Every results page ends here.

One restrained row. Three options. Operator voice, not a sales panel.

Lead line:
> *Got what you need? Send it to someone who needs to see it, pressure-test the system behind it, or get help using it in the next comp conversation.*

Three options:

- **Forward this.** Opens a `mailto:` with the summary (takeaway, SCS, scenario, strategic summary) pre-filled in the email body. No network call. No encoded share URL in v1. The user controls what goes and to whom.
- **Try the sibling tool.** For Mode 1 and 2 results, links to `fair.arminoorata.com` with copy like *"This decision sits inside a system. FAIR diagnoses whether the system holds up."* For Mode 3 results, same link with copy like *"The pattern has roots. FAIR helps you find them."*
- **Work with Armi.** Links to `[BOOKING_URL — confirm with Armi before launch]`. Copy like *"Want to walk this into a leadership meeting with someone who's done it? Book time."*

Design guardrails for this block:
- No form fields. No email capture. No gated access in v1.
- Restrained visual weight. This should feel like a practical footer, not a CTA panel.
- Copy stays in product-voice. This is not where Armi suddenly speaks in first person.

### 15.4 Example takeaway patterns (single-decision)

- "Your intent is not the problem. Your signal is too weak."
- "This decision makes sense in isolation, but not in context."
- "You are being interpreted through past decisions, not this one."
- "The signal is technically right. It still leaves no impression."
- "The logic may be clear to leadership, but not credible to employees."

### 15.5 Visual direction

Inherits from `/srv/arminoorata.com` design system. Match FAIR's results page treatment (see `/srv/projects/fair/docs/fair-results-page.html` for the visual reference). Restrained motion. Premium cards. Strong typography. Generous whitespace. No dashboards-that-feel-technical. No quiz aesthetics.

---

## 16. Strategic summary output

Every mode with a firing scenario generates a short strategic summary (2–4 sentences). Not coaching language. Operator language.

It should:
- Synthesize the decision (or pattern) clearly.
- Name the main trust risk.
- Point to the likely interpretation issue.
- Give a concise recommendation.

Example:
> "This decision is aimed at recognition, but the signal is too weak to land as meaningful. Similar situations have been handled differently. The main risk is not disagreement with the decision itself. It is erosion of trust in the logic behind it."

**Healthy-path exception.** When Baseline Healthy Signal fires (Section 9.4), the reinforcement prompt from Section 15.1 replaces the strategic summary. There is no separate strategic summary for healthy decisions. Exports (Section 18) also use the reinforcement prompt in the summary slot.

---

## 17. Coaching output requirements

One of the highest-value parts of the product. Each firing-scenario result must generate manager-ready guidance with these sections:

1. **How to explain this clearly.**
2. **What to acknowledge upfront.**
3. **What not to imply.**
4. **What to say next about future progression.**
5. **Suggested script.**

Per-scenario coaching content is locked in Section 9 (each scenario block has its own 5-section coaching). Do not invent new coaching copy; use the locked copy. Weave in the verbatim echo (Section 10) where it makes the coaching sharper.

**Healthy-path exception.** Baseline Healthy Signal (Section 9.4) has no coaching block. The reinforcement prompt in Section 15.1 is the only guidance. Exports (Section 18) omit the coaching section entirely for healthy results.

**Mode 3 exception.** Mode 3 generates organization-level coaching themes, not decision-level coaching scripts. See Section 15.2.

---

## 18. Downloadable output

### 18.1 Approach
Match FAIR. Browser print-to-PDF. No Puppeteer, no Playwright, no server-side PDF generation in v1. Build clean print CSS.

### 18.2 Export contents

**Firing-scenario exports (most cases):**

- Mode selected
- Date completed
- Response summary
- Primary scenario (or archetype, for Mode 3)
- SCS (or Aggregate SCS + Consistency + Clarity, for Mode 3)
- Strategic summary
- Coaching output (decision-level for Modes 1 and 2; themes for Mode 3)
- Next-step recommendations

**Healthy-path exports (Baseline Healthy Signal):**

- Mode selected
- Date completed
- Response summary
- Baseline Healthy Signal label
- SCS = 4, Mostly Credible
- Reinforcement prompt (replaces strategic summary and coaching)
- Next-step recommendations (short)

Both shapes must be serializable to a common export schema for combined-memo compatibility (Section 18.3).

### 18.3 Combined-memo compatibility
Export data must be serializable to a schema that can later merge with a FAIR export into the Rewards Credibility Memo. Store exported results as a JSON blob alongside the print view. Schema TBD in Phase 5+; today, just don't lock the export into a format that can't be extended.

---

## 19. Technical specification

### 19.1 Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Component-based architecture
- Local state first
- LocalStorage persistence
- Easy to migrate later to backend persistence

### 19.2 Deployment
- Standalone Next.js app.
- Deploys to `signs.arminoorata.com` via Vercel.
- Parallel to FAIR at `fair.arminoorata.com`.

### 19.3 Project structure (suggested)

Routes use `[sessionId]` segments so in-progress flows and completed results are **locally reopenable** (not deep-linkable across devices — all state is in localStorage on the originating device). This is load-bearing for the long-session UX in Section 19.4 — without a session ID in the URL, the "resume-later" and "reopen a recent result" behaviors cannot work.

**Empty state required.** Any `/flow/[sessionId]/[step]` or `/results/[sessionId]` URL opened without matching localStorage data (e.g., a copied URL opened on another device, a session that was cleared, or a session older than the retention window) must render a small empty state: *"This session isn't on this device. SIGNS stores your work locally. Start a new assessment from the landing page."* With a link back to `/`. Do not 404; do not silently redirect.

```
/src
  /app
    page.tsx                                 # landing (also lists recent results + unfinished sessions)
    /pressure-test
      page.tsx                               # Mode 1 entry (creates sessionId, redirects to flow)
      flow/[sessionId]/[step]/page.tsx       # question flow
      results/[sessionId]/page.tsx
    /understand
      page.tsx                               # Mode 2 entry
      flow/[sessionId]/[step]/page.tsx
      results/[sessionId]/page.tsx
    /spot-pattern
      page.tsx                               # Mode 3 entry
      flow/[sessionId]/decisions/[index]/page.tsx
      results/[sessionId]/page.tsx
  /components
    /landing
    /shared
      Hero.tsx
      FrameworkCards.tsx
      ModeSelector.tsx
      ProgressBar.tsx
      ScenarioBadge.tsx
      ScoreDisplay.tsx
      ResultsSummary.tsx
      CoachingOutput.tsx
      PrintLayout.tsx
    /mode1
    /mode2
    /mode3
      ArchetypeSummary.tsx
      PatternSummary.tsx
  /lib
    /signs
      types.ts
      questions.ts
      scenarios.ts         # 8 scenarios + severity weights
      archetypes.ts        # 7 archetypes + matching
      scoring.ts           # SCS computation
      logic.ts             # orchestration
      copy.ts              # microcopy bank
      storage.ts           # localStorage wrapper
```

### 19.4 State and storage

Mode 2 runs 40–55 minutes. Mode 3 runs 45–60+ minutes. Neither can assume a single sitting. Long-session UX is mandatory in v1, not a nice-to-have.

**Required behaviors:**

- **Autosave every step.** Persist to localStorage on every answer change, not just on submit. A browser crash or a closed tab mid-flow must never lose work.
- **Keyed by mode + session ID.** Each in-progress session has a stable ID in the URL (e.g. `/understand/flow/s_abc123/step-7`). The URL is the resume point.
- **Resume-later surface.** On landing page load, check localStorage for any in-progress session. If one exists, surface a restrained banner: *"You have an unfinished [Mode name]. Resume or start fresh?"* Do not auto-redirect. The user decides.
- **Review-before-submit.** Before generating results in any mode, show a review screen that lists every answer with a "jump back to this question" affordance. User must confirm before scoring runs.
- **Back and next navigation.** Every step is navigable both directions. Going back does not wipe forward answers.
- **Completed results.** Persist locally until the user clears them. Surface a short "Your recent results" list on the landing page so a returning leader can reopen a prior assessment without redoing it.
- **No accounts. No auth. No email capture in v1.**
- **Export produces a JSON blob + print view.**
- **Session data stays local.** Nothing leaves the user's device in v1. Combined-memo compatibility (Section 3) preserves the option to add a sync layer later.

### 19.5 Compatibility with future combined memo
- Shared types that FAIR can consume (see Section 3).
- Export schema versioned (`schemaVersion: 1`).
- Archetype names namespaced (`signs.archetype`) so FAIR's archetypes don't collide.

### 19.6 Data model guidance
Create extensible models for:
- `Mode` (enum)
- `Section` (Story / Intent / Gap / Norms / Signal Strength)
- `Question` (enum, scalar, or open-text)
- `Decision` (the input unit)
- `ScenarioRule` (pattern + weight + outputs)
- `Archetype` (pattern + copy)
- `AssessmentResult` (SCS + primary + secondary + outputs)
- `ExportSummary` (serializable, combined-memo-compatible)

### 19.7 Privacy and data contract

Users will put sensitive organizational detail into this tool: names, comp numbers, the actual dynamics of how a specific decision went. The brief's privacy posture must match that.

**The v1 contract:**

- **All data stays on the user's device.** No network calls carry user input anywhere. No analytics events include question content or open-text. No third-party tags on pages where answers are entered.
- **Storage location.** `localStorage`, origin-scoped to `signs.arminoorata.com`. No cookies for session data. No IndexedDB.
- **Retention.** In-progress sessions and completed results persist until the user clears them. At 90 days, surface a prompt: *"This session is 90 days old. Keep it, export it, or clear it?"* If the user chooses "Keep," the 90-day clock restarts from that moment. There is no hard ceiling; the 90-day check is a recurring nudge. Never auto-clear silently.
- **Clear / delete controls.** Landing page must include a visible control: *"Clear all local SIGNS data."* One confirmation, then wiped. Individual results also have per-entry delete.
- **Forward this → `mailto:` only in v1.** The pre-filled email body contains: takeaway, SCS, scenario name, strategic summary, recommendation, and a link back to SIGNS. **It does NOT include verbatim quotes from the user's open-text answers by default.** Quoted notes (Section 10 verbatim echoes) stay on-screen only; the user can paste them into the email manually if they want. No encoded share URLs. No copy-link affordance. The user's email client is the transport, chosen by the user.
- **Printable export.** Browser print → PDF. No server-side PDF generation. No third-party print service.
- **Privacy notice on landing page.** One short, plain-English block: *"SIGNS runs entirely in your browser. Your answers, your notes, and your results stay on this device. Nothing is uploaded. When you forward, you choose what goes and to whom."* Link to a longer page if and when needed; not required for v1.
- **No error reporting includes user content.** If client-side error reporting is added later, scrub question responses and open text before sending.

**What is explicitly out of scope for v1:**

- Accounts, auth, sign-in.
- Server-side storage of any user content.
- Cross-device sync.
- Shareable public links.
- Analytics beyond anonymous page-view counts.
- Email capture for newsletter or updates.

**Combined-memo implication.** The Rewards Credibility Memo (Section 3) will eventually need cross-domain state between `fair.arminoorata.com` and `signs.arminoorata.com`. That requires either a user-controlled export/import flow or an opt-in backend. v1 does not need either. Do not build either now.

---

## 20. Design system

Inherits from `/srv/arminoorata.com`. Use the existing design tokens, not a new set.

**Keep from the site:**
- Color palette
- Typography system
- Spacing scale
- Border and surface treatments (`border-hairline`, `bg-surface/40`, etc.)
- Motion system (restrained reveal patterns; see FAIR's implementation)

**Mirror from FAIR:**
- Results page structure (takeaway sentence as hero, score band, "what this looks like / why it persists / fix first / do not" block layout)
- Print/PDF layout
- Archetype card treatment

**Do not:**
- Introduce new colors or typefaces.
- Use cheesy HR illustrations.
- Add emojis.
- Use dashboards that feel technical.
- Copy quiz aesthetics.

---

## 21. Microcopy bank

These lines are pre-approved for use anywhere in the tool.

- People do not experience intent. They experience patterns.
- A weak signal creates its own narrative.
- If this needs explaining, the signal may not be strong enough.
- Consistency is what makes signals believable.
- You are not scoring what leadership meant. You are scoring what employees are likely to experience.
- If managers need a paragraph to defend it, the signal may be doing too little work.
- A fair system can still send weak signals.
- A strong signal can still sit inside a broken system.

---

## 22. Build order

Mirrors FAIR's build sequence. Do not try to perfect everything at once.

### Phase A — Foundation
1. Repo, stack setup, Vercel link, domain config.
2. Design system import from arminoorata.com.
3. Landing page (Section 6).

### Phase B — Scenario engine (the core)
4. Input model (Section 8) as types.
5. 8 scenarios with severity weights (Section 9).
6. SCS computation (Section 7).
7. Unclassified fallback.
8. Unit tests for engine correctness.

### Phase C — Modes 1 and 2 (single-decision)
9. Mode 1 flow.
10. Mode 1 results page.
11. Mode 2 flow.
12. Mode 2 results page.
13. Print layout.

### Phase D — Mode 3 (pattern)
14. Multi-decision input UI.
15. Aggregation logic.
16. Archetype matching (Section 14).
17. Mode 3 results page.

### Phase E — Polish and export
18. Coaching output refinements.
19. Strategic summary tuning.
20. Export JSON + print CSS.
21. Mobile responsiveness.
22. End-to-end QA.

### Phase F — Hub integration (after the tool ships)
23. Update arminoorata.com/frameworks hub page to deep-link to signs.arminoorata.com.
24. Cross-link FAIR and SIGNS footers.

### Priority if only one thing can be excellent first
- Output quality.
- Interpretation clarity.
- Premium feel.

---

## 23. Copy guardrails

### Do
- Use sharp, diagnostic phrasing.
- Name problems directly before offering fixes.
- Use imperatives in "Fix first" and "Do not" sections.
- Let the tool say "this is fine" when it is.

### Do not
- Use empty inspiration language.
- Use generic HR SaaS filler ("optimize your people strategy").
- Use fake certainty.
- Use thin thought-leadership fluff.
- Write multi-paragraph docstrings or leadership homilies.
- Apologize or hedge.

---

## 24. Success criteria (repeated for emphasis)

A leader should open this and feel:
- This is credible.
- This is differentiated.
- This is useful.
- This sounds like Armi.
- This could become a real product.

If any of those fail, the implementation is wrong, regardless of how clean the code is.

---

## 25. Final instruction

Do not scaffold placeholders. Do not add features beyond what the brief specifies. Do not build for hypothetical future requirements (except the combined-memo compatibility named in Section 3).

Where a detail is missing, make the most premium, practical choice that fits the brand and the priority order in Section 0.

Run the review wrapper (`/srv/projects/signs/review.sh <file>`) at every phase gate.
