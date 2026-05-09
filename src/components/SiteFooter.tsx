import Link from "next/link";

/**
 * Footer. Minimal: attribution + back-link to the main site. Mirrors
 * FAIR Toolkit's footer structure for sibling-surface consistency.
 */
export default function SiteFooter() {
  return (
    <footer
      className="mt-24 border-t"
      style={{ borderColor: "var(--line)" }}
    >
      <div
        className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm md:flex-row md:items-center md:justify-between md:px-10"
        style={{ color: "var(--muted)" }}
      >
        <div>
          <p>
            Built by{" "}
            <Link
              href="https://arminoorata.com"
              className="underline underline-offset-4"
              style={{ color: "var(--text)" }}
            >
              Armi Noorata
            </Link>
            .
          </p>
          <p className="mt-1.5 text-xs">
            Educational diagnostic. Not HR or legal advice.
          </p>
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <Link
            href="https://arminoorata.com/mark"
            aria-label="Why A to the n and A to the alpha?"
            className="text-xs hover:text-[var(--accent)] transition-colors"
            style={{ color: "var(--muted)" }}
          >
            Why A<sup>n</sup> and A<sup>α</sup>?
          </Link>
          <p className="text-xs uppercase tracking-[0.24em]">
            signs.arminoorata.com
          </p>
        </div>
      </div>
    </footer>
  );
}
