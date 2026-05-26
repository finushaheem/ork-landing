"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import FadeUp from "@/components/animations/FadeUp";
import TypewriterText from "@/components/animations/TypewriterText";

const CAPTURE_TEXT =
  "Had a breakthrough idea for the rebrand — the logo should feel like a deep breath";

const CINEMATIC: [number, number, number, number] = [0.16, 1, 0.3, 1];
const ORGANIC: [number, number, number, number] = [0.34, 1.36, 0.64, 1];

export default function CaptureSection() {
  const [started, setStarted] = useState(false);
  const [saved, setSaved] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });

  // Only start typing when the card is actually in the viewport
  useEffect(() => {
    if (isInView && !started) {
      const t = setTimeout(() => setStarted(true), 400);
      return () => clearTimeout(t);
    }
  }, [isInView, started]);

  return (
    <section id="capture" className="py-24 md:py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — text */}
          <div>
            <FadeUp y={30}>
              <span className="text-xs tracking-[0.15em] font-sans font-semibold text-[var(--color-accent)] mb-4 block">
                CAPTURE
              </span>
            </FadeUp>

            <FadeUp y={30} delay={0.1}>
              <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] tracking-[-0.025em] text-[var(--color-ink)] mb-6">
                A thought arrives.
                <br />
                Don&apos;t let it go.
              </h2>
            </FadeUp>

            <FadeUp y={30} delay={0.2}>
              <p className="font-sans text-lg text-[var(--color-ink-soft)] leading-relaxed">
                No titles. No folders. No friction. Just open ork and write.
                Your thoughts find their place.
              </p>
            </FadeUp>
          </div>

          {/* Right — demo card */}
          <FadeUp y={32} delay={0.15}>
            <div
              ref={cardRef}
              className="relative bg-[var(--color-surface-elevated)] rounded-2xl shadow-[var(--shadow-lg)] p-6 md:p-8 border border-[var(--color-border-soft)]"
            >
              {/* Window chrome dots */}
              <div className="flex gap-1.5 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-red-300/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-300/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-300/50" />
              </div>

              {/* Content */}
              <div className="font-sans text-[var(--color-ink)] text-base leading-relaxed min-h-[3.5em]">
                {started ? (
                  <TypewriterText
                    text={CAPTURE_TEXT}
                    speed={32}
                    humanize
                    onComplete={() => setSaved(true)}
                    showCursor
                  />
                ) : (
                  <span className="text-[var(--color-ink-muted)] opacity-50">
                    What&apos;s on your mind?
                  </span>
                )}
              </div>

              {/* Save dot — pulses once after typing completes */}
              {saved && (
                <motion.div
                  className="absolute bottom-4 right-4 w-2 h-2 rounded-full"
                  style={{ backgroundColor: "var(--color-accent)" }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.55] }}
                  transition={{ duration: 0.6, ease: ORGANIC }}
                  title="Saved"
                />
              )}

              {/* Saved caption */}
              {saved && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3, ease: CINEMATIC }}
                  className="mt-4 text-xs text-[var(--color-ink-muted)] text-right font-sans"
                >
                  Saved automatically.
                </motion.p>
              )}
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
