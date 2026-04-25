"use client";

import { useState } from "react";

interface WhatsNextProps {
  /** Body text injected into the mailto. */
  shareBody: string;
  /** Subject line for the mailto. */
  shareSubject: string;
}

/**
 * Conversion path block per brief Section 15.3. Three options.
 * Forward this is mailto-only in v1 (privacy contract Section 19.8).
 */
export default function WhatsNext({ shareBody, shareSubject }: WhatsNextProps) {
  const [copied, setCopied] = useState(false);

  const mailto = `mailto:?subject=${encodeURIComponent(
    shareSubject,
  )}&body=${encodeURIComponent(shareBody)}`;

  function copyText() {
    navigator.clipboard
      ?.writeText(shareBody)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        /* noop */
      });
  }

  function printPage() {
    if (typeof window !== "undefined") window.print();
  }

  return (
    <section className="border-t border-hairline mt-16 pt-12 print:hidden">
      <div className="flex items-baseline justify-between mb-6">
        <p className="text-[15px] leading-relaxed text-foreground max-w-2xl">
          Got what you need? Send it to someone who needs to see it, check the
          system behind it, or get help using it in the next comp conversation.
        </p>
        <button
          type="button"
          onClick={printPage}
          className="text-[13px] text-muted hover:text-foreground transition-colors shrink-0"
        >
          Print →
        </button>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <a
          href={mailto}
          className="group rounded-xl border border-hairline bg-surface/40 p-5 transition-colors hover:border-accent/60"
        >
          <p className="text-[13px] tracking-[0.2em] uppercase text-accent mb-2">
            Forward this
          </p>
          <p className="text-[14px] text-foreground mb-1">
            Open in your email client.
          </p>
          <p className="text-[12px] text-muted">
            Pre-filled summary. Quoted notes stay local. You decide what to add.
          </p>
        </a>
        <a
          href="https://fair.arminoorata.com"
          className="group rounded-xl border border-hairline bg-surface/40 p-5 transition-colors hover:border-accent/60"
        >
          <p className="text-[13px] tracking-[0.2em] uppercase text-accent mb-2">
            Try the sibling
          </p>
          <p className="text-[14px] text-foreground mb-1">
            FAIR: the system.
          </p>
          <p className="text-[12px] text-muted">
            This decision sits inside a system. FAIR diagnoses whether the
            system holds up.
          </p>
        </a>
        <button
          type="button"
          onClick={copyText}
          className="group rounded-xl border border-hairline bg-surface/40 p-5 text-left transition-colors hover:border-accent/60"
        >
          <p className="text-[13px] tracking-[0.2em] uppercase text-accent mb-2">
            Copy the summary
          </p>
          <p className="text-[14px] text-foreground mb-1">
            {copied ? "Copied to clipboard." : "For meeting notes or Slack."}
          </p>
          <p className="text-[12px] text-muted">
            Plain text. Stays on your device until you paste it.
          </p>
        </button>
      </div>
    </section>
  );
}
