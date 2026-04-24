import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b border-hairline">
      <div className="max-w-5xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-medium text-[15px] tracking-tight text-foreground hover:text-accent transition-colors"
        >
          SIGNS
        </Link>
        <a
          href="https://arminoorata.com"
          className="text-[13px] text-muted hover:text-foreground transition-colors"
        >
          by Armi Noorata →
        </a>
      </div>
    </header>
  );
}
