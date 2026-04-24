# FAIR + SIGNS Combined Product Architecture Brief

## Project goal
Build a unified website product architecture that brings together two connected tools:

1. **FAIR Toolkit**
2. **SIGNS Toolkit**

These should feel like two parts of one strategic system, not two disconnected framework demos.

The relationship is:

- **FAIR** diagnoses the quality of the rewards system
- **SIGNS** diagnoses what individual decisions inside that system are actually communicating

Simple shorthand:
- FAIR = **the system**
- SIGNS = **the signal**

The website and product architecture should make that relationship obvious.

## Core product thesis
Most organizations do not have a fairness problem in isolated moments.  
They have a system design problem, and that system creates signals people interpret every day.

FAIR helps users ask:
**Is the system sound?**

SIGNS helps users ask:
**What is this decision actually saying?**

Together they help users move from:
- intuition
- inconsistency
- manager improvisation

toward:
- structured thinking
- better decisions
- clearer communication
- more credible rewards practices

## Audience
Mixed audience:
- HR leaders
- Total Rewards leaders
- people managers
- executives
- founders

The product must work for people with different levels of compensation sophistication.

It should feel accessible without being watered down.

## Brand and tone
Tone should feel:
- direct
- sharp
- slightly provocative
- premium
- modern
- strategic
- clear
- thoughtful
- credible
- not fluffy
- not generic HR SaaS

This should sound like:
**a smart operator diagnosing avoidable system weakness**

Not:
- consulting sludge
- generic HR software
- soft leadership platitudes
- buzzword soup

## Positioning language

### Combined umbrella positioning
**Signals and systems shape trust.**  
If the system is weak, decisions feel arbitrary.  
If the signals are weak, even good decisions get misread.

### FAIR positioning
**Fair pay is not about being nice.**  
It is about building a system that does not break under pressure.

### SIGNS positioning
**Every reward decision sends a signal.**  
Most leaders only think about the intent.

### Combined summary
FAIR helps you diagnose whether the rewards system holds up.  
SIGNS helps you diagnose what your decisions inside that system are actually saying.

## Product strategy
Build this as one integrated product with two primary tool paths.

Do not make the user feel like they are entering two unrelated microsites.

The user should feel:
- there is one product
- there are two lenses
- they can start from either side
- the tools reinforce each other

## Recommended architecture
Build a parent hub experience with:
- a shared landing page
- two tool entries
- shared design system
- shared components where appropriate
- separate logic engines for FAIR and SIGNS
- a future combined report state

## Main product structure

### Top-level product
Name suggestion:
**Signals & Systems Lab**
or
**FAIR + SIGNS Toolkit**
or
**Rewards Signal Lab**

If naming remains undecided, architect for easy copy replacement later.

### Primary entry points
1. **Start with FAIR**
   - for users trying to assess whether the system itself is sound

2. **Start with SIGNS**
   - for users trying to understand or pressure test a specific decision

3. **Use Both**
   - for users who want a combined system + decision view

## Best user journeys

### Journey 1: System-first
User starts with FAIR because they suspect structural issues.  
After results, offer:
**Want to see how those system issues show up in individual decisions? Try SIGNS.**

### Journey 2: Decision-first
User starts with SIGNS because a raise, bonus, title, or equity decision did not land well.  
After results, offer:
**This may not be a one-off. Want to test whether the broader system is creating this pattern? Try FAIR.**

### Journey 3: Combined path
User completes one tool, then is offered a pre-filled second tool with context carried forward where possible.

Example:
- low FAIR alignment score can inform SIGNS interpretation
- repeated SIGNS norm conflicts can suggest FAIR friction or alignment issues

## Product hierarchy
The product should be structured like this:

### 1. Shared hub page
Explains:
- the problem
- the two frameworks
- when to use which tool
- why they work better together

### 2. FAIR toolkit page
System diagnosis tool

### 3. SIGNS toolkit page
Decision diagnosis tool

### 4. Combined insight state
Not necessarily a full page at first.  
Could be a combined results card or prompt.

Later this can become:
- a combined report
- a higher-value premium feature
- a workshop lead-in

## Shared hub page requirements

### Hero
Suggested headline:
**Signals and systems shape trust**  

Suggested supporting copy:
If your rewards system is unclear, managers improvise.  
If your signals are weak, employees interpret.  
Either way, trust gets expensive.

Suggested CTAs:
- **Start with FAIR**
- **Start with SIGNS**
- **See the Difference**

### Section: Which tool should I use?
Create a comparison section with two strong cards.

#### FAIR card
Use FAIR when:
- you are auditing how rewards decisions get made
- managers rely on exceptions
- fairness complaints are recurring
- the logic exists in leadership’s head, not in practice
- you want to assess system health

#### SIGNS card
Use SIGNS when:
- a raise, bonus, title, or equity decision did not land well
- you want to pressure test a decision before delivering it
- you need better manager language
- you suspect a trust gap between intent and interpretation
- you want to analyze patterns across decisions

### Section: Why both matter
Use copy like:
> A fair system can still send weak signals.  
> A clear signal can still sit inside a broken system.  
>  
> You need both.

### Section: Framework relationship visual
Create a simple visual or diagram showing:

FAIR:
- Friction
- Alignment
- Impact
- Return

SIGNS:
- Story
- Intent
- Gap
- Norms
- Signal Strength

And a bridge statement:
**FAIR diagnoses the system. SIGNS diagnoses the signal.**

## Shared design system requirements
Create a shared visual language across both tools.

Use:
- light Scandinavian-inspired palette
- strong typography
- subtle contrast
- generous whitespace
- premium cards
- calm transitions
- progress indicators
- print-friendly result layouts

Avoid:
- dashboards that feel overly technical
- toy-like interactions
- quiz aesthetics
- generic illustration packs
- trendy UI for the sake of it

## Shared technical architecture
Preferred stack:
- Next.js
- TypeScript
- Tailwind CSS
- component-based architecture
- reusable shared layout components
- logic engines isolated by framework
- local state first
- localStorage persistence
- easy migration later to database-backed persistence

## Suggested app structure
- `/app/rewards-lab/page.tsx`
- `/app/fair-toolkit/page.tsx`
- `/app/signs-toolkit/page.tsx`
- `/components/shared/AppShell.tsx`
- `/components/shared/Hero.tsx`
- `/components/shared/FrameworkComparison.tsx`
- `/components/shared/CTASection.tsx`
- `/components/shared/ProgressBar.tsx`
- `/components/shared/PrintLayout.tsx`
- `/components/fair/...`
- `/components/signs/...`
- `/lib/shared/types.ts`
- `/lib/shared/storage.ts`
- `/lib/shared/recommendations.ts`
- `/lib/fair/...`
- `/lib/signs/...`

## Shared UX principles
Every part of the product should:
- feel guided
- feel intelligent
- avoid cognitive overload
- give useful output quickly
- allow deeper exploration when desired

The product should feel like:
- a strategy tool
- a practical operator tool
- a thought leadership product that could become a business

## FAIR overview for shared product context
FAIR stands for:
- Friction
- Alignment
- Impact
- Return

Purpose:
Diagnose how strong the rewards system is.

Key idea:
Most pay problems are system problems.

Primary user questions:
- Where is our system leaking?
- Are we actually aligned to our philosophy?
- What behavior is the system creating?
- Is the system delivering business value?

### FAIR modes
1. **Quick Check**
2. **Working Session**
3. **Full Diagnostic**

### FAIR outputs
- score by dimension
- strategic summary
- top system risks
- top priorities
- recommendation on what to fix first

## SIGNS overview for shared product context
SIGNS stands for:
- Story
- Intent
- Gap
- Norms
- Signal Strength

Purpose:
Diagnose what a decision is likely signaling or has already signaled.

Key idea:
People do not experience intent. They experience patterns.

Primary user questions:
- What did this decision actually communicate?
- What might be misread?
- What comparison frame is shaping interpretation?
- Is the signal strong enough to be believed?

### SIGNS modes
1. **Pressure Test a Decision**
2. **Understand What Happened**
3. **Spot the Pattern**

### SIGNS outputs
- likely received signal
- trust risk
- scenario classification
- strategic summary
- coaching guidance
- what not to say

## Cross-framework logic
This is the most important part of the combined architecture.

The product should create meaningful bridges between FAIR and SIGNS.

## Mapping examples

### FAIR Friction -> SIGNS Norms / Signal Strength
If FAIR shows high friction:
- managers may improvise
- employees see inconsistency
- SIGNS is more likely to detect norm conflict and weak credibility

### FAIR Alignment -> SIGNS Intent / Gap
If FAIR shows weak alignment:
- leadership intent may sound coherent internally
- but decisions may land inconsistently
- SIGNS is more likely to detect large gap and mixed signals

### FAIR Impact -> SIGNS Gap
If FAIR impact is weak:
- decisions may technically follow process
- but still not land in a motivating or trust-building way
- SIGNS gap risk rises

### FAIR Return -> SIGNS Action Guidance
If FAIR return is weak:
- the system may be spending money without sending useful signals
- SIGNS can help clarify whether the decision is strategically pointless, even if operationally clean

## Combined insight examples
When both tools are used, generate layered combined insights like:

- “This decision is being misread, but the deeper issue appears to be system inconsistency.”
- “The signal is weak, and the system behind it is also misaligned.”
- “This may look like a manager communication issue, but the FAIR results suggest the real problem sits in system design.”
- “The system is mostly sound, which means this likely is a decision-level signaling problem rather than a broader architecture issue.”

## Combined recommendation logic
If the user completes both tools, generate:
1. **Decision-level takeaway**
2. **System-level takeaway**
3. **What to fix now**
4. **What to redesign later**

Example:
- Fix now: clarify the current decision and reset expectations
- Redesign later: tighten manager guidance and reduce exceptions in the broader rewards system

## Combined report concept
Architect for a future “Combined Insight Report” that merges both tools.

Suggested sections:
1. Overview
2. FAIR system findings
3. SIGNS decision findings
4. Cross-framework insights
5. Recommended actions
6. Priority timeline
7. Coaching notes
8. Print / export

This can later become:
- a premium downloadable report
- a lead magnet
- a workshop artifact
- a paid product tier

## Shared component opportunities
Create reusable components where sensible:
- Hero
- CTA blocks
- progress bar
- section headers
- print summary shell
- results card layout
- callout panels
- interpretation badges

Do not force all components to be shared if it weakens clarity.

## Shared data model guidance
Create an extensible model for:
- frameworks
- modes
- sections
- question sets
- result objects
- interpretation objects
- cross-framework insights
- recommendations
- exportable summaries

Suggested shared types:
- `FrameworkType`
- `AssessmentMode`
- `AssessmentResult`
- `InsightCard`
- `RecommendationBlock`
- `ExportSummary`

## Routing and navigation recommendations
The hub should make it easy to:
- start a tool
- switch tools
- continue to the second tool after results
- preserve context when possible

Possible flows:
- start at `/rewards-lab`
- select `/fair-toolkit`
- select `/signs-toolkit`

After results:
- “Continue with SIGNS”
- “Continue with FAIR”

## State and storage recommendations
Use local storage first.

Store:
- in-progress answers
- completed summary states
- last completed framework
- optional cross-tool bridge data

Keep structure clean so later it can migrate to:
- user accounts
- saved dashboards
- admin reports
- team usage

## Results design strategy
Results should not feel like:
- a score dump
- a quiz result
- an HR maturity model cliche

Results should feel like:
- a strategic readout
- a practical operating memo
- something a smart person would actually use

Each results page should clearly answer:
- what this means
- why it matters
- what to do
- what to say, where relevant
- what not to do

## Download and export requirements
Support:
- clean print view
- PDF later if easy
- print CSS now

Exports should feel premium and presentable.

### FAIR export should include
- selected mode
- date completed
- scores
- top issues
- priorities
- summary

### SIGNS export should include
- selected mode
- date completed
- scenario
- diagnosis
- strategic summary
- coaching guidance
- next steps

### Combined export later should include
- both summaries
- cross-framework insight
- recommendations
- priority actions

## Monetization and future product logic
Architect so this can later support:
- lead capture
- waitlist
- workshop booking
- advisory upsell
- premium report downloads
- gated access
- paid team version
- org benchmarking
- saved admin dashboards
- CMS-managed content

Do not overbuild monetization now, but make future extension easy.

## CTA strategy
Use CTAs that feel credible and useful.

Examples:
- Book a workshop
- Request advisory support
- Join the waitlist
- Get the toolkit
- Use the other framework
- See your combined insight

## Copy guardrails
Do not use:
- empty inspiration language
- excessive exclamation points
- corporate jargon
- generic “optimize your people strategy” filler
- fake certainty
- thin thought leadership fluff

Do use:
- concise, high-judgment language
- sharp diagnostic phrasing
- specific contrasts
- practical next-step guidance

## Suggested microcopy
Use lines like:
- Most systems do not break loudly. They leak credibility quietly.
- People do not experience your philosophy deck. They experience your decisions.
- If managers need to improvise, the system is not finished.
- A weak signal creates room for interpretation.
- Consistency is what makes signals believable.
- A fair system can still send weak signals.
- A strong signal can still sit inside a broken system.

## Recommended build sequence
Do not try to perfect everything at once.

Recommended order:
1. shared hub page
2. FAIR tool
3. SIGNS tool
4. cross-tool CTA bridges
5. shared print layouts
6. combined insight layer

If only one thing can be excellent first, prioritize:
- output quality
- interpretation clarity
- premium feel

## Success criteria
I should open this and feel:
- this is one coherent product
- the relationship between FAIR and SIGNS is obvious
- this is differentiated
- this is useful
- this sounds like me
- this could become a real business

## Final instruction
Do not just create two adjacent tools.

Design this like:
**one integrated product with two strategic lenses**

Where a detail is missing, make the most premium, practical choice that supports:
1. usefulness
2. clarity
3. cohesion
4. output quality
5. extensibility
