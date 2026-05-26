"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import FadeUp from "@/components/animations/FadeUp";
import FloatingCard from "@/components/animations/FloatingCard";
import MagneticButton from "@/components/animations/MagneticButton";
import TypewriterText, { type TypewriterStep } from "@/components/animations/TypewriterText";

/* ── Constants ────────────────────────────────────────────────────────────── */

// Typo sequence: types "homepgae" then corrects to "homepage"
const HERO_STEPS: TypewriterStep[] = [
  { type: "type",   text: "Need to call Maya tomorrow about the new homep" },
  { type: "type",   text: "gae",    speed: 30 },   // wrong: "homepgae"
  { type: "pause",  ms: 260 },                      // user notices
  { type: "delete", count: 3,       speed: 55 },    // delete "gae"
  { type: "type",   text: "age design.", speed: 22 }, // correct: "homepage design."
];

type Phase = "idle" | "typing" | "highlighting" | "extracting" | "complete";
const CINEMATIC: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Highlighted text renderer ────────────────────────────────────────────── */

function HighlightedHeroText({ show }: { show: boolean }) {
  return (
    <span className="font-sans text-[var(--color-ink)] text-lg leading-relaxed">
      Need to{" "}
      <span className="relative inline">
        call Maya tomorrow
        {show && (
          <motion.span
            className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-accent)] rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.38, ease: CINEMATIC }}
            style={{ transformOrigin: "left" }}
          />
        )}
      </span>{" "}
      about the new{" "}
      <span className="relative inline">
        homepage design
        {show && (
          <motion.span
            className="absolute bottom-0 left-0 w-full h-[1.5px] rounded-full"
            style={{
              background: `repeating-linear-gradient(to right, var(--color-accent) 0, var(--color-accent) 3px, transparent 3px, transparent 6px)`,
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.38, ease: CINEMATIC, delay: 0.18 }}
          />
        )}
      </span>
      .
    </span>
  );
}

/* ── Scroll indicator ─────────────────────────────────────────────────────── */

function ScrollIndicator({ visible }: { visible: boolean }) {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div
        animate={{ opacity: [0.35, 0.65, 0.35], y: [0, 4, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width={14}
          height={9}
          viewBox="0 0 14 9"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1 1l6 6 6-6"
            stroke="var(--color-ink-muted)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Hero ────────────────────────────────────────────────────────────── */

export default function Hero() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [scrolled, setScrolled] = useState(false);
  const [replayCount, setReplayCount] = useState(0);

  const handleTypingComplete = useCallback(() => {
    setPhase("highlighting");
  }, []);

  // Auto-start after mount
  useEffect(() => {
    const t = setTimeout(() => setPhase("typing"), 1500);
    return () => clearTimeout(t);
  }, []);

  // Phase transitions
  useEffect(() => {
    if (phase === "highlighting") {
      const t = setTimeout(() => setPhase("extracting"), 1000);
      return () => clearTimeout(t);
    }
    if (phase === "extracting") {
      const t = setTimeout(() => setPhase("complete"), 800);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Scroll indicator
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 16) setScrolled(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-svh flex flex-col items-center justify-center text-center bg-[var(--color-surface)] pt-32 pb-16"
    >
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(38, 25%, 96%) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 flex flex-col items-center w-full">
        {/* Label */}
        <FadeUp delay={0.2} duration={0.5} y={12}>
          <p className="uppercase text-xs tracking-[0.15em] font-sans font-medium text-[var(--color-ink-muted)] mb-8">
            The space between thought and action
          </p>
        </FadeUp>

        {/* Headline line 1 */}
        <FadeUp delay={0.45} duration={0.7} y={28}>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[80px] leading-[1.05] tracking-[-0.03em] text-[var(--color-ink)]">
            Think freely.
          </h1>
        </FadeUp>

        {/* Headline line 2 */}
        <FadeUp delay={0.65} duration={0.7} y={28}>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[80px] leading-[1.05] tracking-[-0.03em] text-[var(--color-ink)] mb-0">
            Everything follows.
          </h1>
        </FadeUp>

        {/* Subhead */}
        <FadeUp delay={0.9} duration={0.6} y={20}>
          <p className="font-sans text-lg md:text-xl text-[var(--color-ink-soft)] max-w-xl mx-auto mt-8">
            Capture thoughts instantly. ork quietly turns your writing into context, memory, and action.
          </p>
        </FadeUp>

        {/* CTA */}
        <FadeUp delay={1.1} duration={0.5} y={16}>
          <div className="mt-12 mb-16 md:mb-20">
            <MagneticButton id="hero-cta">
              <button
                type="button"
                className="cta-pulse bg-[var(--color-ink)] text-white rounded-full px-8 py-4 text-base font-medium hover:bg-[var(--color-ink-soft)] transition-colors cursor-pointer"
              >
                Start thinking →
              </button>
            </MagneticButton>
            <p className="mt-4 text-sm text-[var(--color-ink-muted)]">
              Free to begin. No credit card.
            </p>
          </div>
        </FadeUp>

        {/* Demo card */}
        <FadeUp delay={1.35} duration={0.8} y={36} className="w-full max-w-lg mx-auto">
          <div className="relative w-full">
            <FloatingCard amplitude={4} duration={6}>
              <div className="bg-[var(--color-surface-elevated)] rounded-2xl shadow-[var(--shadow-float)] p-6 md:p-8 border border-[var(--color-border-soft)] text-left flex flex-col w-full mx-auto">
                <p className="text-xs text-[var(--color-ink-muted)] font-medium mb-3 font-sans">
                  Today, 9:14 AM
                </p>

                <div className="min-h-[3.5em]">
                  {phase === "idle" && (
                    <span className="font-sans text-[var(--color-ink)] text-lg leading-relaxed">
                      &nbsp;
                    </span>
                  )}
                  {phase === "typing" && (
                    <TypewriterText
                      key={`hero-typewriter-${replayCount}`}
                      steps={HERO_STEPS}
                      speed={32}
                      humanize
                      onComplete={handleTypingComplete}
                      className="font-sans text-[var(--color-ink)] text-lg leading-relaxed"
                      showCursor
                    />
                  )}
                  {(phase === "highlighting" || phase === "extracting" || phase === "complete") && (
                    <HighlightedHeroText show />
                  )}
                </div>

                {/* Extracted task */}
                {(phase === "extracting" || phase === "complete") && (
                  <motion.div
                    initial={{ opacity: 0, y: 16, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.34, 1.36, 0.64, 1] }}
                    className="mt-6 bg-[var(--color-surface-alt)] rounded-xl p-4 border border-[var(--color-border-soft)] shadow-[var(--shadow-sm)] flex flex-col gap-3 border-l-2 border-l-[var(--color-accent)]"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-4 h-4 rounded border-2 border-[var(--color-border)] flex-shrink-0 mt-0.5" />
                      <span className="font-sans font-medium text-[var(--color-ink)] text-[15px] leading-snug">
                        Call Maya about homepage design
                      </span>
                    </div>
                    <div className="ml-7 flex gap-2 flex-wrap">
                      <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                        Tomorrow
                      </span>
                      <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-white text-[var(--color-ink-muted)] border border-[var(--color-border-soft)] shadow-sm">
                        #homepage
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </FloatingCard>
          </div>

          {/* Trust line */}
          <div className="mt-12 text-center opacity-60 flex flex-col items-center">
            <p className="text-[10px] tracking-[0.25em] font-sans font-semibold text-[var(--color-ink-muted)] mb-4">
              TRUSTED BY FOUNDERS, WRITERS, AND CREATORS AT
            </p>
            <div className="flex items-center justify-center gap-8 text-[var(--color-ink-muted)] text-sm font-medium tracking-wide">
              <span>LINEAR</span>
              <span>VERCEL</span>
              <span>NOTION</span>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* Scroll indicator — appears after hero loads, hides on first scroll */}
      <ScrollIndicator visible={!scrolled} />
    </section>
  );
}
