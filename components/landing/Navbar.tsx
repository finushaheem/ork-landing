"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";

/* -------------------------------------------------- */
/*  Constants                                         */
/* -------------------------------------------------- */

const NAV_LINKS = [
  { id: "nav-features", label: "Features", href: "#features" },
  { id: "nav-philosophy", label: "Philosophy", href: "#philosophy" },
  { id: "nav-journal", label: "Journal", href: "#journal" },
] as const;

const SCROLL_THRESHOLD = 16; // px before background kicks in

/* -------------------------------------------------- */
/*  Easing & animation tokens                         */
/* -------------------------------------------------- */

const smooth = [0.25, 0.1, 0.25, 1.0] as const;

const mobileMenuVariants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: smooth },
  },
  open: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3, ease: smooth },
  },
};

const mobileLinkVariants = {
  closed: { opacity: 0, y: -8 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.3, ease: smooth },
  }),
};

/* -------------------------------------------------- */
/*  Hamburger line spring config                      */
/* -------------------------------------------------- */

const hamburgerTransition = { duration: 0.3, ease: smooth };

/* -------------------------------------------------- */
/*  Component                                         */
/* -------------------------------------------------- */

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useMotionValue(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  /* ---------- scroll listener ---------- */
  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > SCROLL_THRESHOLD;
    if (scrolled.get() !== isScrolled) {
      scrolled.set(isScrolled);
      setHasScrolled(isScrolled);
    }
  }, [scrolled]);

  useEffect(() => {
    handleScroll(); // initial check
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* ---------- lock body scroll when mobile menu open ---------- */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* ---------- close mobile menu on resize to desktop ---------- */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [mobileOpen]);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 h-16"
      initial={false}
    >
      {/* Background layer — separate element so we can animate its opacity */}
      <motion.div
        className="absolute inset-0 nav-blur border-b"
        initial={{ opacity: 0 }}
        animate={{ opacity: hasScrolled ? 1 : 0 }}
        transition={{ duration: 0.3, ease: smooth }}
        style={{
          backgroundColor: "color-mix(in srgb, var(--color-surface) 80%, transparent)",
          borderColor: hasScrolled
            ? "var(--color-border-soft)"
            : "transparent",
        }}
        aria-hidden
      />

      {/* Inner container */}
      <nav
        className="relative mx-auto flex h-full max-w-6xl items-center justify-between px-6"
        aria-label="Main navigation"
      >
        {/* ---- Logo ---- */}
        <a
          href="#"
          className="font-serif text-[22px] leading-none tracking-tight"
          style={{ color: "var(--color-ink)" }}
          aria-label="ork home"
        >
          ork.
        </a>

        {/* ---- Desktop links ---- */}
        <ul className="hidden items-center gap-8 md:flex" role="list">
          {NAV_LINKS.map(({ id, label, href }) => (
            <li key={id}>
              <a
                id={id}
                href={href}
                className="text-sm font-medium tracking-wide transition-colors"
                style={{
                  color: "var(--color-ink-muted)",
                  transitionDuration: "0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-ink)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-ink-muted)")
                }
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* ---- Right side ---- */}
        <div className="flex items-center gap-4">
          {/* CTA — visible desktop */}
          <a
            id="nav-begin"
            href="#begin"
            className="hidden rounded-full px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 md:inline-flex"
            style={{
              backgroundColor: "var(--color-ink)",
              transitionDuration: "0.3s",
            }}
          >
            Begin
          </a>

          {/* Hamburger — mobile only */}
          <button
            id="nav-toggle"
            type="button"
            className="relative z-10 flex h-10 w-10 items-center justify-center md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative h-5 w-6">
              {/* Top line */}
              <motion.span
                className="absolute left-0 top-0 block h-[1.5px] w-6 rounded-full"
                style={{ backgroundColor: "var(--color-ink)" }}
                animate={
                  mobileOpen
                    ? { rotate: 45, y: 9.5 }
                    : { rotate: 0, y: 0 }
                }
                transition={hamburgerTransition}
              />
              {/* Middle line */}
              <motion.span
                className="absolute left-0 top-[9.5px] block h-[1.5px] w-6 rounded-full"
                style={{ backgroundColor: "var(--color-ink)" }}
                animate={
                  mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
                }
                transition={hamburgerTransition}
              />
              {/* Bottom line */}
              <motion.span
                className="absolute bottom-0 left-0 block h-[1.5px] w-6 rounded-full"
                style={{ backgroundColor: "var(--color-ink)" }}
                animate={
                  mobileOpen
                    ? { rotate: -45, y: -9.5 }
                    : { rotate: 0, y: 0 }
                }
                transition={hamburgerTransition}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* ---- Mobile menu ---- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            className="nav-blur overflow-hidden border-b md:hidden"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--color-surface) 92%, transparent)",
              borderColor: "var(--color-border-soft)",
            }}
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 pb-6 pt-4">
              {NAV_LINKS.map(({ id, label, href }, i) => (
                <motion.a
                  key={id}
                  id={`${id}-mobile`}
                  href={href}
                  className="block rounded-lg px-4 py-3 text-base font-medium tracking-wide transition-colors"
                  style={{
                    color: "var(--color-ink-muted)",
                  }}
                  whileHover={{
                    backgroundColor: "var(--color-surface-alt)",
                    color: "var(--color-ink)",
                  }}
                  variants={mobileLinkVariants}
                  custom={i}
                  initial="closed"
                  animate="open"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </motion.a>
              ))}

              {/* Mobile CTA */}
              <motion.a
                id="nav-begin-mobile"
                href="#begin"
                className="mt-3 block rounded-full px-6 py-3 text-center text-sm font-medium text-white"
                style={{ backgroundColor: "var(--color-ink)" }}
                variants={mobileLinkVariants}
                custom={NAV_LINKS.length}
                initial="closed"
                animate="open"
                onClick={() => setMobileOpen(false)}
              >
                Begin
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
