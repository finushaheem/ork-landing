"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const CINEMATIC: [number, number, number, number] = [0.16, 1, 0.3, 1];
const SETTLE:    [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: CINEMATIC },
  },
} as const;

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function ReflectSection() {
  const textRef  = useRef<HTMLDivElement>(null);
  const cardRef  = useRef<HTMLDivElement>(null);
  const textInView = useInView(textRef, { once: true, margin: "-80px" });
  const cardInView = useInView(cardRef, { once: true, margin: "-80px" });

  // Show the pattern-recognition whisper after the card has been visible for 2s
  const [showWhisper, setShowWhisper] = useState(false);
  useEffect(() => {
    if (!cardInView) return;
    const t = setTimeout(() => setShowWhisper(true), 2200);
    return () => clearTimeout(t);
  }, [cardInView]);

  return (
    <section
      id="reflect"
      className="py-24 md:py-32 lg:py-40 bg-[var(--color-surface-alt)]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text — right on desktop */}
          <motion.div
            ref={textRef}
            className="lg:order-2"
            initial="hidden"
            animate={textInView ? "visible" : "hidden"}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.15em] font-sans font-semibold text-[var(--color-accent)] mb-4"
            >
              REFLECT
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="font-serif text-4xl md:text-5xl leading-[1.1] tracking-[-0.025em] text-[var(--color-ink)] mb-6"
            >
              Your journal.
              <br />
              Your mirror.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="font-sans text-lg text-[var(--color-ink-soft)] leading-relaxed"
            >
              Write without judgment. ork holds your words with care — and quietly
              helps you see patterns you didn&apos;t know were there.
            </motion.p>
          </motion.div>

          {/* Card stack — left on desktop */}
          <div className="lg:order-1 relative" ref={cardRef}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={cardInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.7, ease: CINEMATIC }}
            >
              {/* Depth card 2 — farthest back */}
              <div
                className="absolute inset-0 bg-[var(--color-surface-alt)] border border-[var(--color-border-soft)] rounded-2xl"
                style={{
                  transform: "scale(0.91) rotate(-2.4deg) translate(12px, 16px)",
                  opacity: 0.18,
                  zIndex: 0,
                }}
                aria-hidden="true"
              />

              {/* Depth card 1 — one level back */}
              <div
                className="absolute inset-0 bg-[var(--color-surface-elevated)] border border-[var(--color-border-soft)] rounded-2xl shadow-[var(--shadow-sm)]"
                style={{
                  transform: "scale(0.95) rotate(-1.2deg) translate(6px, 8px)",
                  opacity: 0.35,
                  zIndex: 1,
                }}
                aria-hidden="true"
              />

              {/* Main journal card */}
              <div
                className="relative bg-[var(--color-surface-elevated)] rounded-2xl shadow-[var(--shadow-lg)] p-6 md:p-8 border border-[var(--color-border-soft)]"
                style={{ zIndex: 2 }}
              >
                <p className="text-xs text-[var(--color-ink-muted)] font-medium mb-4 font-sans">
                  May 26, 2026
                </p>

                <p className="font-sans text-[var(--color-ink-soft)] text-base leading-[1.85]">
                  Today felt lighter. The morning walk cleared something I
                  couldn&apos;t name. Need to call Sarah tomorrow about the design
                  proposal. I think the project needs more breathing room —
                  like this journal.
                </p>

                {/* Blinking cursor — journal is "live" */}
                <span
                  className="inline-block w-[2px] h-[1em] ml-[1px] align-text-bottom bg-[var(--color-accent)] mt-1"
                  style={{
                    animation: "cursor-breathe 1.4s cubic-bezier(0.45, 0, 0.55, 1) infinite",
                  }}
                  aria-hidden="true"
                />

                {/* Pattern recognition whisper */}
                {showWhisper && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 0.45, y: 0 }}
                    transition={{ duration: 0.6, ease: CINEMATIC }}
                    className="mt-5 pt-4 border-t border-[var(--color-border-soft)] flex items-center gap-2"
                  >
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                      className="flex-shrink-0"
                    >
                      <circle cx={3}  cy={6} r={2} stroke="var(--color-accent)" strokeWidth={1.2} />
                      <circle cx={9}  cy={6} r={2} stroke="var(--color-accent)" strokeWidth={1.2} />
                      <line x1={5} y1={6} x2={7} y2={6} stroke="var(--color-accent)" strokeWidth={1.2} />
                    </svg>
                    <span className="text-xs font-sans text-[var(--color-ink-muted)]">
                      3 similar reflections &rarr;
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
