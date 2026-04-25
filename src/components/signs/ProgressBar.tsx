interface ProgressBarProps {
  current: number; // 1-indexed step
  total: number;
  label?: string;
}

/** Slim progress bar shown above the question card. */
export default function ProgressBar({
  current,
  total,
  label,
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (current / total) * 100));
  return (
    <div className="mb-10">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[11px] tracking-[0.25em] uppercase text-accent">
          {label ?? "Progress"}
        </span>
        <span className="text-[12px] text-muted tabular-nums">
          {current} of {total}
        </span>
      </div>
      <div
        className="h-[2px] w-full overflow-hidden rounded-full"
        style={{ background: "var(--line)" }}
      >
        <div
          className="h-full transition-all"
          style={{ width: `${pct}%`, background: "var(--accent)" }}
        />
      </div>
    </div>
  );
}
