export default function Footer() {
  return (
    <footer
      id="footer"
      className="py-12 md:py-16"
      style={{
        backgroundColor: "var(--color-ink)",
        borderTop: "1px solid hsl(34, 8%, 16%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">

        {/* Left — Logo & Copyright */}
        <div>
          <span
            className="font-serif text-xl"
            style={{ color: "hsl(40, 20%, 88%)" }}
          >
            ork.
          </span>
          <p
            className="text-xs mt-1"
            style={{ color: "hsl(38, 8%, 36%)" }}
          >
            © 2026 ork.so
          </p>
        </div>

        {/* Center — Links */}
        <nav className="flex flex-wrap gap-x-8 gap-y-2">
          {[
            { id: "footer-about",   label: "About"   },
            { id: "footer-blog",    label: "Blog"    },
            { id: "footer-privacy", label: "Privacy" },
            { id: "footer-terms",   label: "Terms"   },
            { id: "footer-twitter", label: "Twitter" },
            { id: "footer-contact", label: "Contact" },
          ].map(({ id, label }) => (
            <a
              key={id}
              id={id}
              href="#"
              className="text-sm link-dark"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right — Tagline */}
        <span
          className="font-serif text-sm italic"
          style={{ color: "hsl(38, 8%, 32%)" }}
        >
          For those who think
        </span>

      </div>
    </footer>
  );
}
