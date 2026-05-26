"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StickyMobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const check = () => {
      const heroHeight    = window.innerHeight;
      const ctaSection    = document.getElementById("cta");
      const ctaTop        = ctaSection?.getBoundingClientRect().top ?? Infinity;
      // Show after hero has scrolled past, hide when the main CTA section is in view
      setShow(window.scrollY > heroHeight && ctaTop > window.innerHeight * 0.6);
    };

    window.addEventListener("scroll", check, { passive: true });
    check(); // initial check
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#cta"
          initial={{ opacity: 0, scale: 0.9, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{   opacity: 0, scale: 0.9, y: 8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={[
            "fixed z-40 md:hidden",
            "flex items-center gap-1.5",
            "bg-[var(--color-ink)] text-white",
            "rounded-full font-medium shadow-[var(--shadow-float)]",
            // On very small screens: compact arrow icon
            "px-4 py-3 text-sm",
            "active:scale-95 transition-transform duration-75",
          ].join(" ")}
          style={{
            right: "20px",
            bottom: "max(24px, env(safe-area-inset-bottom, 24px))",
          }}
          aria-label="Start thinking — open ork"
        >
          {/* Short label on small screens, fuller text on wider mobile */}
          <span className="xs:hidden">→</span>
          <span className="hidden xs:inline">Start thinking →</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
