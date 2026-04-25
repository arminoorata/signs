interface ResultsHeroProps {
  eyebrow: string;
  takeaway: string;
  scsLabel: string; // "4 — Mostly Credible"
}

/** Big takeaway + SCS at the top of every results page. */
export default function ResultsHero({
  eyebrow,
  takeaway,
  scsLabel,
}: ResultsHeroProps) {
  return (
    <header className="max-w-3xl mb-14">
      <span className="block text-[11px] tracking-[0.25em] uppercase text-accent mb-4">
        {eyebrow}
      </span>
      <h1 className="font-medium text-3xl md:text-5xl leading-[1.1] tracking-tight text-foreground mb-8">
        {takeaway}
      </h1>
      <div className="inline-flex items-center gap-3 rounded-full border border-hairline bg-surface/60 px-5 py-2.5">
        <span className="text-[11px] tracking-[0.2em] uppercase text-muted">
          Signal Credibility
        </span>
        <span className="text-[14px] text-foreground">{scsLabel}</span>
      </div>
    </header>
  );
}
