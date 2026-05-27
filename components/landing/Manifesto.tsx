"use client";

import { motion } from "framer-motion";
import StaggerChildren, {
  staggerItem,
} from "@/components/animations/StaggerChildren";

const phrases = [
  "Thinking doesn’t happen in bullet points. ",
  "It happens in glimpses — ",
  "half-formed at 2am, ",
  "connecting mid-sentence, ",
  "arriving before you’re ready.",
];

export default function Manifesto() {
  return (
    <section id="philosophy" className="py-32 md:py-48">
      <div className="max-w-3xl mx-auto px-6 text-center">
        {/* Decorative line */}
        <div className="w-12 h-px bg-[var(--color-border)] mx-auto mb-16" />

        {/* Main text block */}
        <StaggerChildren stagger={0.12}>
          <p className="font-serif text-3xl md:text-4xl lg:text-[40px] leading-[1.3] tracking-[-0.02em] text-[var(--color-ink)]">
            {phrases.map((phrase, i) => (
              <motion.span
                key={i}
                variants={staggerItem}
                className="inline"
              >
                {phrase}
              </motion.span>
            ))}
          </p>
        </StaggerChildren>

        {/* Attribution */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.25, 0.1, 0.25, 1.0] as const }}
          className="mt-12 text-sm text-[var(--color-ink-muted)] italic font-sans"
        >
          — What ork was built for
        </motion.p>
      </div>
    </section>
  );
}
