import {
  GAP_SIZE_LABEL,
  NORM_CONSISTENCY_LABEL,
  SIGNAL_STRENGTH_LABEL,
  VISIBILITY_LABEL,
} from "@/lib/signs/copy";
import type { DecisionInputs } from "@/lib/signs/types";

interface DimensionsBreakdownProps {
  inputs: DecisionInputs;
}

/**
 * Shows the four scalar dimensions that drove SCS, per brief Section 15.1.
 * Lets the leader see what triggered the score without scrolling back to
 * their answers.
 */
export default function DimensionsBreakdown({
  inputs,
}: DimensionsBreakdownProps) {
  const rows: Array<{ label: string; value: string | undefined }> = [
    {
      label: "Gap size",
      value: inputs.gap_size ? GAP_SIZE_LABEL[inputs.gap_size] : undefined,
    },
    {
      label: "Signal strength",
      value: inputs.signal_strength
        ? SIGNAL_STRENGTH_LABEL[inputs.signal_strength]
        : undefined,
    },
    {
      label: "Norm consistency",
      value: inputs.norm_consistency
        ? NORM_CONSISTENCY_LABEL[inputs.norm_consistency]
        : undefined,
    },
    {
      label: "Visibility",
      value: inputs.visibility ? VISIBILITY_LABEL[inputs.visibility] : undefined,
    },
  ];
  return (
    <section className="border-t border-hairline pt-10 mt-12">
      <h2 className="text-[11px] tracking-[0.25em] uppercase text-accent mb-5">
        What drove the score
      </h2>
      <dl className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {rows.map((r) => (
          <div
            key={r.label}
            className="rounded-lg border border-hairline bg-surface/40 p-4"
          >
            <dt className="text-[12px] uppercase tracking-[0.15em] text-muted mb-1.5">
              {r.label}
            </dt>
            <dd className="text-[15px] text-foreground">
              {r.value ?? "—"}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
