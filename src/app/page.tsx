import Link from "next/link";
import Reveal from "@/components/Reveal";

const framework = [
  {
    letter: "S",
    word: "Story",
    description: "What actually happened, without interpretation.",
    examples: [
      "A raise was approved.",
      "An equity refresh was denied.",
      "A title change happened without cash movement.",
    ],
    question: "What happened, without interpretation?",
  },
  {
    letter: "I",
    word: "Intent",
    description: "What leadership meant to signal.",
    examples: ["Recognition", "Retention", "Promotion readiness", "Market correction"],
    question: "What did you want this to communicate?",
  },
  {
    letter: "G",
    word: "Gap",
    description: "Where perception diverges from intent.",
    examples: [
      "The employee expected more.",
      "The message felt weaker than intended.",
      "The action created confusion instead of clarity.",
    ],
    question: "How might this be interpreted differently?",
  },
  {
    letter: "N",
    word: "Norms",
    description: "What people compare the decision to.",
    examples: [
      "Prior cases",
      "Peer treatment",
      "Timing of other decisions",
      "Unwritten cultural rules",
    ],
    question: "What are people comparing this to?",
  },
  {
    letter: "S",
    word: "Signal Strength",
    description: "How strong or credible the signal really is.",
    examples: [
      "Symbolic",
      "Noticeable",
      "Meaningful",
      "Matched in size to the message",
    ],
    question: "Is this strong enough to be believed?",
  },
];

const modes = [
  {
    number: "01",
    title: "Diagnose a Decision",
    purpose:
      "Use before a decision to check what it is likely to communicate.",
    time: "7–12 minutes",
    focus: "Single decision.",
    href: "/diagnose",
  },
  {
    number: "02",
    title: "Understand What Happened",
    purpose:
      "Use after a decision to analyze why it did or did not land as intended.",
    time: "40–55 minutes",
    focus: "Single decision with deeper context and coaching output.",
    href: "/understand",
  },
  {
    number: "03",
    title: "Spot the Pattern",
    purpose:
      "Use across multiple decisions to surface repeated signaling issues and an organization-level archetype.",
    time: "45–60+ minutes",
    focus: "Multi-decision analysis.",
    href: "/spot-pattern",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-16">
        <span className="block text-[11px] tracking-[0.25em] uppercase text-accent mb-4">
          SIGNS Toolkit
        </span>
        <h1 className="font-medium text-4xl md:text-6xl leading-[1.05] tracking-tight text-foreground mb-6 max-w-3xl">
          Every reward decision sends a signal.{" "}
          <span className="text-accent">
            Most leaders only think about the intent.
          </span>
        </h1>
        <div className="max-w-2xl space-y-4 text-[15px] leading-relaxed text-muted">
          <p>
            A raise, a bonus, a title change, an equity refresh. You think you
            are sending one message. Employees often receive another.
          </p>
          <p>That gap is where trust is built or broken.</p>
          <p className="text-foreground">
            SIGNS helps you see that gap clearly, before or after it happens.
          </p>
        </div>
      </section>

      {/* Why this exists */}
      <section className="border-t border-hairline">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <Reveal>
            <div className="max-w-2xl">
              <span className="block text-[11px] tracking-[0.25em] uppercase text-accent mb-5">
                Why this exists
              </span>
              <p className="font-medium text-2xl md:text-3xl leading-snug tracking-tight text-foreground mb-4">
                Most leaders focus on making the right decision. Employees focus
                on what that decision means.
              </p>
              <p className="text-[15px] leading-relaxed text-muted">
                Those are not always the same thing.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Credibility anchor — first-person Armi voice (locked) */}
      <section className="border-t border-hairline bg-surface/30">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <Reveal>
            <div className="max-w-2xl">
              <span className="block text-[11px] tracking-[0.25em] uppercase text-accent mb-5">
                Why I built SIGNS
              </span>
              <div className="space-y-5 text-[16px] leading-relaxed text-foreground">
                <p>
                  I&apos;ve spent 20 years in HR and Total Rewards. The hardest
                  part is never the decision itself. It&apos;s what the decision
                  ends up meaning to the person on the receiving end.
                </p>
                <p>
                  A raise can land as recognition or as a retention play. An
                  equity refresh can read as &ldquo;we&apos;re building a future
                  with you&rdquo; or &ldquo;we&apos;re buying another year.&rdquo;
                  A title change without cash can feel like an upgrade or an
                  insult. Same action. Different signal.
                </p>
                <p>
                  Researchers have studied this for decades. Signaling theory,
                  psychological contracts, attribution research. Good work, but
                  most of it sitting in journals nobody opens in an HR meeting.
                  SIGNS was built to help take that work and turn it into
                  something you can actually use in a comp conversation. This
                  was built because I wanted it for myself.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core idea */}
      <section className="border-t border-hairline">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-14 md:py-16">
          <Reveal>
            <p className="max-w-3xl font-medium text-xl md:text-2xl leading-snug tracking-tight text-foreground">
              <span className="text-accent">People do not experience intent.</span>{" "}
              They experience patterns.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Framework explainer — 5 cards */}
      <section className="border-t border-hairline">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <Reveal>
            <header className="mb-10 max-w-2xl">
              <span className="block text-[11px] tracking-[0.25em] uppercase text-accent mb-4">
                The framework
              </span>
              <h2 className="font-medium text-3xl md:text-4xl leading-tight tracking-tight text-foreground mb-4">
                Five things to check when a decision isn&apos;t landing the way
                you thought it would.
              </h2>
            </header>
          </Reveal>
          <Reveal>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {framework.map((item, index) => (
                <article
                  key={`${item.word}-${index}`}
                  className="rounded-xl border border-hairline bg-surface/40 p-7"
                >
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="font-semibold text-4xl text-accent leading-none">
                      {item.letter}
                    </span>
                    <h3 className="font-medium text-lg text-foreground">
                      {item.word}
                    </h3>
                  </div>
                  <p className="text-[14px] leading-relaxed text-foreground mb-4">
                    {item.description}
                  </p>
                  <ul className="mb-5 space-y-1 text-[13px] leading-relaxed text-muted">
                    {item.examples.map((ex) => (
                      <li key={ex}>— {ex}</li>
                    ))}
                  </ul>
                  <p className="text-[13px] leading-relaxed text-foreground/80 italic">
                    {item.question}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mode selector — interactive tool coming soon */}
      <section className="border-t border-hairline bg-surface/20">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <Reveal>
            <header className="mb-10 max-w-2xl">
              <span className="block text-[11px] tracking-[0.25em] uppercase text-accent mb-4">
                Three modes
              </span>
              <h2 className="font-medium text-3xl md:text-4xl leading-tight tracking-tight text-foreground mb-4">
                Diagnose a decision, understand what happened, or spot the
                pattern across many.
              </h2>
              <p className="text-[15px] leading-relaxed text-muted">
                Pick the mode that fits the question you are trying to answer.
              </p>
            </header>
          </Reveal>
          <Reveal>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
              {modes.map((mode) => (
                <Link
                  key={mode.number}
                  href={mode.href}
                  className="group rounded-xl border border-hairline bg-surface/40 p-7 flex flex-col transition-colors hover:border-accent/60"
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-[13px] tracking-[0.2em] text-accent">
                      {mode.number}
                    </span>
                  </div>
                  <h3 className="font-medium text-xl text-foreground mb-3">
                    {mode.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-muted mb-5 flex-1">
                    {mode.purpose}
                  </p>
                  <div className="pt-4 border-t border-hairline space-y-1 text-[12px] text-muted mb-4">
                    <p>
                      <span className="text-foreground">Time:</span> {mode.time}
                    </p>
                    <p>
                      <span className="text-foreground">Focus:</span>{" "}
                      {mode.focus}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[13px] text-accent transition-all group-hover:gap-2.5">
                    Start
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Companion tool — FAIR */}
      <section className="border-t border-hairline">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <Reveal>
            <div className="max-w-2xl">
              <span className="block text-[11px] tracking-[0.25em] uppercase text-accent mb-4">
                Companion framework
              </span>
              <h2 className="font-medium text-2xl md:text-3xl leading-tight tracking-tight text-foreground mb-4">
                SIGNS looks at what a single decision is saying. FAIR looks at
                whether the system behind it holds up.
              </h2>
              <p className="text-[15px] leading-relaxed text-muted mb-6">
                A weak system puts out weak signals. And over time, those weak
                signals wear down the system that produced them. That&apos;s
                why I use both.
              </p>
              <a
                href="https://fair.arminoorata.com"
                className="inline-flex items-center gap-1.5 text-[14px] text-accent hover:gap-2.5 transition-all"
              >
                Try FAIR at fair.arminoorata.com
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
