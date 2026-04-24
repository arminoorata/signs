# SIGNS Toolkit Website Build Spec

## Project goal
Build an interactive **SIGNS Toolkit** experience for my website.

SIGNS stands for:
- **Story**
- **Intent**
- **Gap**
- **Norms**
- **Signal Strength**

This tool should help users answer two different but connected questions:

1. **Before a decision**
   - What is this likely to signal?
   - Where could this land differently than intended?

2. **After a decision**
   - What did this actually communicate?
   - Why did it not land the way leadership expected?

This is intentionally both:
- **predictive / decision-making**
- **diagnostic / reflective**

But the product should not label these modes that way. That language is too academic.

Instead, frame the user journey as:
- **Pressure test a decision**
- **Understand what happened**
- **Spot patterns across decisions**

## Audience
Mixed audience:
- HR leaders
- Total Rewards leaders
- people managers
- executives
- founders

## Brand and tone
The tone should feel:
- direct
- sharp
- slightly provocative
- modern
- credible
- strategic
- clear
- premium
- not fluffy
- not generic HR tech

The experience should make users feel:
**"Oh. That did not land the way I thought it would."**

and

**"We are not just making isolated decisions. We are sending signals."**

## Core positioning copy

### Hero
**SIGNS Toolkit**  
Every reward decision sends a signal.  
Most leaders only think about the intent.

### Supporting copy
A raise.  
A bonus.  
A title change.  
An equity refresh.

You think you are sending one message.  
Employees often receive another.

That gap is where trust is built or broken.

SIGNS helps you see that gap clearly, before or after it happens.

### Why this exists
Use this copy block:

> Most leaders focus on making the right decision.  
> Employees focus on what that decision means.  
>  
> Those are not always the same thing.

### Core idea
Use this idea throughout the experience:

> People do not experience intent. They experience patterns.

## Product strategy
The tool should be built as a **behavior tool disguised as a thinking tool**.

That means:
- it should feel insightful
- but it must also tell users what to do next
- and what to say

Do not let this become just an interesting framework demo.

The most important output is not just diagnosis.  
It is:
- action guidance
- coaching language
- decision clarity

## Deliverables
Build all of the following:

1. SIGNS landing page
2. Framework explainer
3. Tool mode selector
4. Interactive guided assessment flows
5. Signal interpretation engine
6. Results page
7. Strategic summary output
8. Manager coaching output
9. Downloadable summary
10. Extensible architecture for later pattern analysis and FAIR integration

## Information architecture
Build the page in this order:

### 1. Hero section
Include:
- headline
- subheadline
- short explanation
- CTA: **Start the SIGNS Assessment**
- secondary CTA: **See How SIGNS Works**

### 2. Why this exists
Use the copy block above.

### 3. Framework explainer
Create 5 premium cards:

#### Story
What actually happened

Examples:
- a raise was approved
- an equity refresh was denied
- a title change happened without cash movement

Sharp diagnostic question:
**What happened, without interpretation?**

#### Intent
What leadership meant to signal

Examples:
- recognition
- retention
- promotion readiness
- market correction

Sharp diagnostic question:
**What did you want this to communicate?**

#### Gap
Where perception diverges from intent

Examples:
- the employee expected more
- the message felt weaker than intended
- the action created confusion instead of clarity

Sharp diagnostic question:
**How might this be interpreted differently?**

#### Norms
What people compare the decision to

Examples:
- prior cases
- peer treatment
- timing of other decisions
- unwritten cultural rules

Sharp diagnostic question:
**What are people comparing this to?**

#### Signal Strength
How strong or credible the signal really is

Examples:
- symbolic
- noticeable
- meaningful
- reinforced vs isolated

Sharp diagnostic question:
**Is this strong enough to be believed?**

### 4. Tool mode selector
Do not label these as diagnostic vs predictive. Use user-friendly language.

#### Mode 1: Pressure Test a Decision
Purpose:
Use before a decision to stress test likely interpretation.

Estimated time:
5 to 10 minutes

Focus:
single decision

#### Mode 2: Understand What Happened
Purpose:
Use after a decision to analyze why it did or did not land as intended.

Estimated time:
20 to 30 minutes

Focus:
single decision with deeper context and coaching output

#### Mode 3: Spot the Pattern
Purpose:
Use across multiple decisions to identify repeated signaling issues.

Estimated time:
45 to 60+ minutes

Focus:
multi-decision analysis, pattern detection, consistency themes

## Product behavior rules
The primary path should always be:
1. single decision
2. then optional prompt to expand into patterns

Do not make pattern analysis the default.

Think of it like this:
- single decision = review one poker hand
- pattern analysis = understand how someone plays the table

## UX requirements
The experience should feel:
- premium
- intentional
- calm
- modern
- strategic
- not like a cheap quiz
- not like HR software

Use:
- Next.js
- TypeScript
- Tailwind CSS
- component-based architecture
- strong typography
- Scandinavian-light visual direction
- lots of whitespace
- subtle motion only
- cards
- progress indicators
- expandable helper text
- mobile responsiveness

Do not use:
- cheesy HR illustrations
- clutter
- buzzwords
- hype language
- generic SaaS filler
- emojis
- aggressive gimmicks

## Suggested page structure
- hero
- why this exists
- framework cards
- mode selector
- assessment flow
- results
- download / print summary
- CTA section

### CTA section ideas
Include future-facing CTA options like:
- book a workshop
- request advisory support
- join the waitlist
- get the toolkit

# Assessment design

## Shared logic across all modes
For all modes:
- show progress
- allow back and next navigation
- save responses locally
- keep state resilient
- allow users to review answers before final output
- use clean, readable language
- keep helper text optional
- make results feel tailored, not generic

## Mode 1: Pressure Test a Decision
Purpose:
Fast, predictive, single-decision use.

### Questions

#### Story
1. What decision are you considering?
   - raise
   - bonus
   - promotion
   - title change
   - equity refresh
   - market correction
   - other

2. Describe the decision in one or two sentences.

#### Intent
3. What are you trying to signal?
   - recognition
   - retention
   - promotion readiness
   - correction
   - growth
   - other

4. What do you want the employee to feel or understand?

#### Gap
5. What could be misread about this decision?
6. What part of the message feels vulnerable to misinterpretation?

#### Norms
7. What will they compare this to?
8. Does this feel consistent with similar situations?

#### Signal Strength
9. How meaningful is the change?
   - low
   - medium
   - high

10. How visible is this to others?
   - low
   - medium
   - high

### Pressure Test output
Generate:
- likely intended signal
- likely received signal
- risk level
- primary scenario classification
- short diagnosis
- one-line takeaway
- what to clarify before moving forward
- manager coaching language

Sentence completion format:
**You intend to signal ___, but this may be received as ___ because ___**

Recommendation:
- proceed
- proceed with clarification
- strengthen the signal
- rethink the decision

## Mode 2: Understand What Happened
Purpose:
Diagnostic, reflective, single-decision analysis.

### Questions

#### Story
1. What happened?
2. What type of decision was it?
3. What context matters here?
4. What else was happening around the same time?

#### Intent
5. What was leadership trying to communicate?
6. Why was this decision made now?
7. What behavior or outcome was this meant to reinforce?

#### Gap
8. What reaction occurred?
9. What felt off?
10. What assumption might the employee have made?

Prompt:
**If they explained this to a friend, what would they probably say?**

#### Norms
11. What are they likely comparing this to?
12. Are there similar cases that make this look inconsistent?
13. What pattern has the organization taught people to expect?

Prompt:
**From their perspective, is this fair, or just different?**

#### Signal Strength
14. Was the decision meaningful enough to support the message?
15. Was it reinforced elsewhere, or did it stand alone?
16. Did the strength of the action match the strength of the message?

### Understand What Happened output
Generate:
- diagnosis
- likely received signal
- size of the gap
- risk framing
- what probably drove the misread
- strategic summary
- what to do next
- manager coaching language
- what not to say
- one sharp takeaway

## Mode 3: Spot the Pattern
Purpose:
Multi-decision pattern analysis and organizational insight.

### Input design
Allow users to enter 3 to 10 decisions.

For each decision collect:
- decision type
- short story
- intended signal
- observed or expected reaction
- signal strength
- visibility
- norm consistency

### Pattern analysis goals
Detect:
- repeated gaps
- repeated weak signals
- inconsistency across similar cases
- overreliance on explanation
- strong intent with weak credibility
- public decisions with poor coherence
- one-off logic that has quietly become the norm

### Spot the Pattern output
Generate:
- dominant signal pattern
- top 3 risks
- consistency score
- clarity score
- likely trust risk
- strategic summary
- recommended priority actions
- optional coaching themes for leaders and managers

Example output patterns:
- You are signaling inconsistency across similar decisions.
- Your intent is strong, but your signals are too weak to be believed.
- Employees are likely interpreting flexibility as unpredictability.
- The logic may exist in leadership’s head, but not in the employee experience.

# SIGNS Output Engine v1
This is the core logic layer of the product.

The site should not just ask questions and summarize responses.  
It should classify the situation and generate smart output.

## Input model
Normalize each scenario into these variables:

- **intent**
  - recognition
  - retention
  - promotion_readiness
  - correction
  - growth
  - other

- **gap_size**
  - small
  - medium
  - large

- **signal_strength**
  - low
  - medium
  - high

- **norm_consistency**
  - consistent
  - inconsistent
  - unclear

- **visibility**
  - low
  - medium
  - high

- **decision_type**
  - raise
  - bonus
  - promotion
  - title_change
  - equity_refresh
  - market_correction
  - other

## Output structure
Every result should generate all of these:

1. diagnosis
2. risk
3. what_to_do
4. manager_script
5. do_not_say
6. one_line_takeaway
7. strategic_summary

## Core scenario mapping

### Scenario 1: Weak Signal, Strong Intent
#### Input pattern
- signal_strength = low
- gap_size = medium or large

#### Diagnosis
You intended to send a strong message, but the signal is too small to be credible.

#### Risk
This is likely to be interpreted as symbolic, not meaningful. It can feel like acknowledgment without commitment.

#### What to do
- increase the signal
- or reset expectations explicitly

#### Manager script
“I want to be clear about what this reflects and what it doesn’t. This is recognition for your contribution, but it’s not meant to signal a step change yet. Here’s what would need to happen for that next step.”

#### Do not say
- This is a big step, if it is not
- This shows how much we value you, without substance

#### Takeaway
**A weak signal creates its own narrative.**

### Scenario 2: Strong Signal, Misread Intent
#### Input pattern
- signal_strength = high
- gap_size = medium or large

#### Diagnosis
The signal is strong, but it is being interpreted differently than intended.

#### Risk
You may be accidentally signaling promotion, favoritism, or long-term commitment.

#### What to do
- clarify intent immediately
- anchor expectations before assumptions spread

#### Manager script
“I want to clarify how to interpret this. This reflects [specific reason], not a broader shift in role or expectations. Let’s talk about what the next step would actually look like.”

#### Do not say
- nothing, silence makes this worse

#### Takeaway
**A strong signal without context gets over-interpreted.**

### Scenario 3: Norm Conflict
#### Input pattern
- norm_consistency = inconsistent
- gap_size = medium or large

#### Diagnosis
This decision may be reasonable in isolation, but it conflicts with existing patterns.

#### Risk
Employees interpret fairness through comparison. This can trigger perceptions of inconsistency or favoritism.

#### What to do
- acknowledge the inconsistency
- explain the difference explicitly
- or correct the broader pattern

#### Manager script
“I know this may feel inconsistent compared to other situations. Here’s what’s different in this case, and why the decision reflects that difference.”

#### Do not say
- Every situation is different, without explanation

#### Takeaway
**Consistency is what makes signals believable.**

### Scenario 4: High Gap, Low Awareness
#### Input pattern
- gap_size = large
- user confidence high but response suggests blind spot

#### Diagnosis
There is a significant gap between intent and perception, and it is likely being underestimated.

#### Risk
Trust can erode without visible conflict. Silent disengagement is likely.

#### What to do
- surface the perception gap directly
- invite feedback
- correct or clarify quickly

#### Manager script
“I want to check how this landed for you. My intent was ___, but I want to make sure that’s how it was received.”

#### Do not say
- I thought this was clear

#### Takeaway
**Unseen gaps are the most dangerous.**

### Scenario 5: Overreliance on Explanation
#### Input pattern
- signal_strength = low or medium
- long justification required to make the decision sound fair

#### Diagnosis
The signal only makes sense if it is explained.

#### Risk
If something needs a long explanation, it often lacks credibility on its own.

#### What to do
- strengthen the signal
- or simplify the message

#### Manager script
“I want to explain this clearly, but also acknowledge that the signal itself may not feel strong enough. Let’s talk about that directly.”

#### Do not say
- long, defensive justifications

#### Takeaway
**If it needs explaining, it may not be strong enough.**

### Scenario 6: Misaligned Intent
#### Input pattern
- intent unclear, conflicting, or weakly supported by the action
- gap_size = medium or large

#### Diagnosis
The action and the intended message are not aligned.

#### Risk
You are sending mixed signals, which creates confusion and weakens trust.

#### What to do
- re-anchor the decision to a clear intent
- align action with message

#### Manager script
“I want to reset how this should be interpreted. The intention here is ___, and if that is not coming through clearly, that is on us to fix.”

#### Do not say
- vague or hedged language

#### Takeaway
**Mixed signals weaken credibility fast.**

### Scenario 7: High Visibility, Weak Signal
#### Input pattern
- visibility = high
- signal_strength = low

#### Diagnosis
A weak signal is being amplified by visibility.

#### Risk
Public inconsistency damages trust faster than private decisions.

#### What to do
- either strengthen the signal
- or contain and reframe the visibility

#### Manager script
“I know this is visible, so I want to be clear about what it does and does not represent.”

#### Takeaway
**Visible signals carry more weight, whether you intend them to or not.**

### Scenario 8: Strong Signal, Strong Alignment
#### Input pattern
- signal_strength = high
- gap_size = small
- norm_consistency = consistent

#### Diagnosis
The signal is clear, credible, and aligned with expectations.

#### Risk
Low risk, but still requires reinforcement.

#### What to do
- reinforce the message
- connect it to future expectations

#### Manager script
“This reflects the impact you have had and how that aligns with what we value. Let’s talk about how to build on this.”

#### Takeaway
**Strong, consistent signals build trust over time.**

## Scenario classification logic
Implement rules like:

- if signal_strength == "low" and gap_size in ["medium", "large"], classify Scenario 1
- if signal_strength == "high" and gap_size in ["medium", "large"], classify Scenario 2
- if norm_consistency == "inconsistent" and gap_size in ["medium", "large"], classify Scenario 3
- if visibility == "high" and signal_strength == "low", classify Scenario 7
- if signal_strength == "high" and gap_size == "small" and norm_consistency == "consistent", classify Scenario 8

Allow multiple flags, but always assign:
- primary_scenario
- secondary_flags

Primary scenario should be determined by highest trust risk / clearest fit.

## Interpretation guidance
The output should never feel generic.

It should combine:
- the base scenario template
- the selected intent
- the decision type
- the user’s own words where relevant

# Results page requirements
The results page should feel sharp, premium, and useful.

Include:
- primary scenario
- intended signal
- likely received signal
- gap summary
- risk level
- what this is likely signaling in practice
- what to do next
- manager coaching language
- what not to say
- one provocative takeaway line
- print / export option

### Example takeaway patterns
- Your intent is not the problem. Your signal is too weak.
- This decision makes sense in isolation, but not in context.
- You are being interpreted through past decisions, not this one.
- The signal is technically correct, but emotionally unconvincing.
- The logic may be clear to leadership, but not credible to employees.

# Strategic summary output
The tool must generate a strategic summary, not just coaching language.

The strategic summary should:
- synthesize the decision clearly
- explain the main trust risk
- point to the likely interpretation issue
- give a concise recommendation

Example:
“This decision appears to be aimed at recognition, but the signal is likely too weak to be experienced as meaningful. Because similar situations may have been handled differently, the main risk is not disagreement with the decision itself, but erosion of trust in the logic behind it.”

# Coaching output requirements
This is one of the highest-value parts of the product.

Each result should generate manager-ready guidance with these sections:

1. **How to explain this clearly**
2. **What to acknowledge upfront**
3. **What not to imply**
4. **What to say next about future progression**

Example structure:
- How to explain this clearly
- What to acknowledge upfront
- What not to say
- What to reinforce
- Suggested script

Do not make this robotic.  
It should sound practical and human.

# Downloadable output
Allow export to:
- print-friendly summary page
- PDF if easy
- otherwise build clean print CSS

Include:
- mode selected
- date completed
- responses summary
- scenario classification
- strategic summary
- coaching output
- next-step recommendations

# Suggested microcopy
Use lines like:
- People do not experience intent. They experience patterns.
- If this needs explaining, the signal may not be strong enough.
- Consistency is what makes signals believable.
- A weak signal creates room for interpretation.
- You are not scoring what leadership meant. You are scoring what employees are likely to experience.
- If managers need a paragraph to defend it, the signal may be doing too little work.

# Technical requirements
Preferred stack:
- Next.js
- TypeScript
- Tailwind CSS
- reusable components
- local state first
- localStorage persistence
- easy to migrate later to backend persistence

## Suggested structure
- `/app/signs-toolkit/page.tsx`
- `/components/signs/Hero.tsx`
- `/components/signs/FrameworkCards.tsx`
- `/components/signs/ModeSelector.tsx`
- `/components/signs/AssessmentFlow.tsx`
- `/components/signs/QuestionCard.tsx`
- `/components/signs/ScenarioBadge.tsx`
- `/components/signs/ScoreDisplay.tsx`
- `/components/signs/ResultsSummary.tsx`
- `/components/signs/CoachingOutput.tsx`
- `/components/signs/PatternSummary.tsx`
- `/lib/signs/questions.ts`
- `/lib/signs/scenarios.ts`
- `/lib/signs/logic.ts`
- `/lib/signs/types.ts`
- `/lib/signs/copy.ts`

## Data model guidance
Create a clean extensible model for:
- modes
- sections
- questions
- answer types
- decision records
- scenario rules
- output templates
- scoring
- interpretations
- coaching blocks

# Design guardrails
Do not make this feel like generic HR software.
Do not use buzzwords.
Do not over-polish the copy into bland corporate language.
Do not make it sound soft or apologetic.
Do not make it aggressive for effect either.

This should feel like:
**a sharp operator helping you see what you missed**

# Optional future extensibility
Architect this so I can later add:
- FAIR toolkit
- combined FAIR + SIGNS report
- comparison reports
- org-level dashboards
- benchmarking
- saved assessments
- email capture
- lead capture
- workshop upsell
- CMS-managed copy
- gated paid access

# Success criteria
I should open this and feel:
- this is credible
- this is differentiated
- this is useful
- this sounds like me
- this could become a real product

# Final instruction
Do not just scaffold placeholders.

Make strong choices.

Where a detail is missing, choose the most premium, practical option that fits this brand and goal.

Prioritize:
1. usefulness
2. clarity
3. output quality
4. premium feel
5. extensibility
