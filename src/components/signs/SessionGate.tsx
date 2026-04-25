"use client";

import Link from "next/link";

interface SessionGateProps {
  message?: string;
}

/**
 * Empty state when a sessionId in the URL does not match localStorage on
 * this device (per brief Section 19.3). Offers a friendly path back home.
 */
export default function SessionGate({ message }: SessionGateProps) {
  return (
    <main className="flex-1">
      <section className="max-w-2xl mx-auto px-6 md:px-10 pt-24 md:pt-32 pb-20">
        <span className="block text-[11px] tracking-[0.25em] uppercase text-accent mb-4">
          Not on this device
        </span>
        <h1 className="font-medium text-3xl md:text-4xl leading-tight tracking-tight text-foreground mb-5">
          {message ??
            "This SIGNS session is not on this device."}
        </h1>
        <p className="text-[15px] leading-relaxed text-muted mb-8">
          SIGNS keeps your work locally in your browser. A copied or shared
          link cannot pull it across devices. Start a new assessment from the
          landing page, or open this link on the device where you started the
          session.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[14px] text-accent hover:gap-2.5 transition-all"
        >
          Back to SIGNS home
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}
