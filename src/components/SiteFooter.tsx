export default function SiteFooter() {
  return (
    <footer className="border-t border-hairline">
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <p className="text-[13px] text-muted">
          SIGNS is a free tool. Built by Armi Noorata.
        </p>
        <div className="flex items-center gap-5 text-[13px] text-muted">
          <a
            href="https://arminoorata.com"
            className="hover:text-foreground transition-colors"
          >
            arminoorata.com
          </a>
          <a
            href="https://arminoorata.com/frameworks"
            className="hover:text-foreground transition-colors"
          >
            Frameworks
          </a>
          <a
            href="https://fair.arminoorata.com"
            className="hover:text-foreground transition-colors"
          >
            FAIR
          </a>
        </div>
      </div>
    </footer>
  );
}
