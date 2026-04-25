"use client";

import type { Question } from "@/lib/signs/questions";

interface QuestionCardProps {
  question: Question;
  value: string | undefined;
  onChange: (next: string) => void;
}

/**
 * Renders a single question. Enum/scalar → radio-like cards.
 * Open → textarea. The "deepen" optional prompts surface a small
 * "Optional — sharpens your results" hint per Section 11.3.
 */
export default function QuestionCard({
  question,
  value,
  onChange,
}: QuestionCardProps) {
  return (
    <div className="rounded-xl border border-hairline bg-surface/40 p-7 md:p-9">
      <span className="block text-[11px] tracking-[0.25em] uppercase text-accent mb-3">
        {question.section}
      </span>
      {question.preamble && (
        <p className="text-[13px] leading-relaxed text-muted mb-3">
          {question.preamble}
        </p>
      )}
      <h2 className="font-medium text-2xl md:text-3xl leading-snug tracking-tight text-foreground mb-2">
        {question.prompt}
      </h2>
      <p className="text-[12px] tracking-[0.15em] uppercase text-muted mb-6">
        {question.required ? "Required" : "Optional — sharpens your results"}
      </p>

      {(question.type === "enum" || question.type === "scalar") && (
        <div
          role="radiogroup"
          aria-label={question.prompt}
          className="grid gap-2.5 grid-cols-1 sm:grid-cols-2"
        >
          {question.options?.map((opt) => {
            const selected = value === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onChange(opt.value)}
                className={[
                  "text-left rounded-lg border px-4 py-3.5 transition-colors",
                  selected
                    ? "border-accent bg-accent-soft text-foreground"
                    : "border-hairline bg-surface/60 text-foreground hover:border-accent/40",
                ].join(" ")}
              >
                <span className="text-[14px]">{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {question.type === "open" && (
        <textarea
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder ?? "Your answer."}
          rows={4}
          className="w-full rounded-lg border border-hairline bg-surface/60 px-4 py-3 text-[15px] leading-relaxed text-foreground placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      )}
    </div>
  );
}
