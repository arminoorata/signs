import {
  RECOMMENDATION_DETAIL,
  RECOMMENDATION_LABEL,
} from "@/lib/signs/copy";
import { getScenario } from "@/lib/signs/scenarios";
import type { Recommendation, ScenarioId } from "@/lib/signs/types";

interface ScenarioBlockProps {
  primaryId: ScenarioId;
  secondaryIds: ScenarioId[];
  recommendation: Recommendation;
}

/**
 * Renders the primary scenario diagnosis + risk + secondary flags +
 * recommendation. The full coaching block lives separately.
 */
export default function ScenarioBlock({
  primaryId,
  secondaryIds,
  recommendation,
}: ScenarioBlockProps) {
  const primary = getScenario(primaryId);
  return (
    <section className="border-t border-hairline pt-10">
      <span className="block text-[11px] tracking-[0.25em] uppercase text-accent mb-3">
        Primary scenario
      </span>
      <h2 className="font-medium text-2xl md:text-3xl leading-tight tracking-tight text-foreground mb-3">
        {primary.name}
      </h2>
      <p className="text-[15px] leading-relaxed text-foreground mb-3">
        {primary.diagnosis}
      </p>
      <p className="text-[14px] leading-relaxed text-muted mb-6">
        Risk: {primary.risk}
      </p>

      <div className="rounded-lg border border-hairline bg-surface/40 p-5 mb-6">
        <p className="text-[12px] uppercase tracking-[0.15em] text-accent mb-2">
          Likely received signal
        </p>
        <p className="text-[15px] leading-relaxed text-foreground">
          {primary.likelyReceived}
        </p>
      </div>

      <div className="rounded-lg border border-accent/40 bg-accent-soft p-5 mb-6">
        <p className="text-[12px] uppercase tracking-[0.15em] text-accent mb-2">
          Recommendation
        </p>
        <p className="text-[15px] leading-relaxed text-foreground mb-1">
          {RECOMMENDATION_LABEL[recommendation]}
        </p>
        <p className="text-[13px] leading-relaxed text-muted">
          {RECOMMENDATION_DETAIL[recommendation]}
        </p>
      </div>

      {secondaryIds.length > 0 && (
        <div className="border-t border-hairline pt-5">
          <p className="text-[11px] tracking-[0.25em] uppercase text-muted mb-3">
            Secondary flags
          </p>
          <ul className="space-y-2">
            {secondaryIds.map((id) => {
              const s = getScenario(id);
              return (
                <li key={id} className="text-[14px] text-foreground">
                  <span className="text-foreground/80">{s.name}.</span>{" "}
                  <span className="text-muted">{s.takeaway}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
