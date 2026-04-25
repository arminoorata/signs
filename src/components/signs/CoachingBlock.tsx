import { getScenario } from "@/lib/signs/scenarios";
import type { ScenarioId } from "@/lib/signs/types";

interface CoachingBlockProps {
  scenarioId: ScenarioId;
}

/**
 * 5-section coaching scaffold per brief Section 17. Plus what-not-to-say
 * and the takeaway. Per-scenario locked copy from scenarios.ts.
 */
export default function CoachingBlock({ scenarioId }: CoachingBlockProps) {
  const s = getScenario(scenarioId);
  const c = s.coaching;
  const items: Array<{ label: string; body: string }> = [
    { label: "How to explain this clearly", body: c.howToExplain },
    { label: "What to acknowledge upfront", body: c.whatToAcknowledge },
    { label: "What not to imply", body: c.whatNotToImply },
    { label: "What to say next about future progression", body: c.whatToSayNext },
  ];
  return (
    <section className="border-t border-hairline pt-10 mt-12">
      <span className="block text-[11px] tracking-[0.25em] uppercase text-accent mb-3">
        Manager coaching
      </span>
      <h2 className="font-medium text-2xl md:text-3xl leading-tight tracking-tight text-foreground mb-6">
        How to deliver this conversation.
      </h2>
      <dl className="space-y-5 mb-8">
        {items.map((it) => (
          <div key={it.label}>
            <dt className="text-[13px] uppercase tracking-[0.12em] text-accent mb-1">
              {it.label}
            </dt>
            <dd className="text-[15px] leading-relaxed text-foreground">
              {it.body}
            </dd>
          </div>
        ))}
      </dl>

      <div className="rounded-lg border border-hairline bg-surface/40 p-5 mb-6">
        <p className="text-[12px] uppercase tracking-[0.15em] text-accent mb-2">
          Suggested script
        </p>
        <blockquote className="text-[15px] leading-relaxed text-foreground italic">
          “{c.suggestedScript}”
        </blockquote>
      </div>

      <div>
        <p className="text-[12px] uppercase tracking-[0.15em] text-muted mb-2">
          Do not say
        </p>
        <ul className="space-y-1 text-[14px] leading-relaxed text-foreground/80">
          {s.doNotSay.map((line) => (
            <li key={line}>— {line}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
