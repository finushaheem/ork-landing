export default function Footer() {
  return (
    <footer
      id="footer"
      className="border-t border-[var(--color-border-soft)] py-12 md:py-16"
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        {/* Left — Logo & Copyright */}
        <div>
          <span className="font-serif text-xl text-[var(--color-ink)]">
            ork.
          </span>
          <p className="text-xs text-[var(--color-ink-muted)] mt-1">
            © 2026 ork.so
          </p>
        </div>

        {/* Center — Links */}
        <nav className="flex flex-wrap gap-x-8 gap-y-2">
          <a
            id="footer-about"
            href="#"
            className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
          >
            About
          </a>
          <a
            id="footer-blog"
            href="#"
            className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
          >
            Blog
          </a>
          <a
            id="footer-privacy"
            href="#"
            className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
          >
            Privacy
          </a>
          <a
            id="footer-terms"
            href="#"
            className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
          >
            Terms
          </a>
          <a
            id="footer-twitter"
            href="#"
            className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
          >
            Twitter
          </a>
          <a
            id="footer-contact"
            href="#"
            className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Right — Tagline */}
        <span className="font-serif text-sm text-[var(--color-ink-muted)] italic">
          For those who think
        </span>
      </div>
    </footer>
  );
}
