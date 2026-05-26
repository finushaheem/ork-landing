"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import FadeUp from "@/components/animations/FadeUp";
import FloatingCard from "@/components/animations/FloatingCard";
import MagneticButton from "@/components/animations/MagneticButton";
import TypewriterText from "@/components/animations/TypewriterText";

/* ─── Constants ─────────────────────────────────────────────── */

const HERO_JOURNAL_TEXT =
  "Need to call Maya tomorrow about the new homepage design.";

type Phase = "idle" | "typing" | "highlighting" | "extracting" | "complete";
const CINEMATIC_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── Highlighted Renderer ─────────────────────────────── */

function HighlightedHeroText({ showHighlights }: { showHighlights: boolean }) {
  return (
    <span className="font-sans text-[var(--color-ink)] text-lg leading-relaxed">
      Need to{" "}
      <span className="relative inline">
        call Maya tomorrow
        {showHighlights && (
          <motion.span
            className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-accent)] rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: CINEMATIC_EASE }}
            style={{ transformOrigin: "left" }}
          />
        )}
      </span>{" "}
      about the new{" "}
      <span className="relative inline">
        homepage design
        {showHighlights && (
          <motion.span
            className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-accent)] rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 0.5,
              ease: CINEMATIC_EASE,
              delay: 0.15,
            }}
            style={{ transformOrigin: "left" }}
          />
        )}
      </span>
      .
    </span>
  );
}

/* ─── Main Hero Component ───────────────────────────────────────── */

export default function Hero() {
  const [phase, setPhase] = useState<Phase>("idle");

  const handleTypingComplete = useCallback(() => {
    setPhase("highlighting");
  }, []);

  // Auto-start after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("typing");
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Phase transitions
  useEffect(() => {
    if (phase === "highlighting") {
      const timer = setTimeout(() => {
        setPhase("extracting");
      }, 600 + 400); // Wait for highlight + pause
      return () => clearTimeout(timer);
    }
    if (phase === "extracting") {
      const timer = setTimeout(() => {
        setPhase("complete");
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  return (
    <section
      id="hero"
      className="relative min-h-svh flex flex-col items-center justify-center text-center bg-[var(--color-surface)] pt-32 pb-16"
    >
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(38, 25%, 96%) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 flex flex-col items-center w-full">
        {/* 1. Tagline */}
        <FadeUp delay={0.2}>
          <p className="uppercase text-xs tracking-[0.15em] font-sans font-medium text-[var(--color-ink-muted)] mb-8">
            The space between thought and action
          </p>
        </FadeUp>

        {/* 2. Headline */}
        <FadeUp delay={0.4} duration={0.8} y={24} ease={[0.16, 1, 0.3, 1] as const}>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[80px] leading-[1.05] tracking-[-0.03em] text-[var(--color-ink)]">
            Think freely.
            <br />
            Everything follows.
          </h1>
        </FadeUp>

        {/* 3. Subhead */}
        <FadeUp delay={0.7}>
          <p className="font-sans text-lg md:text-xl text-[var(--color-ink-soft)] max-w-xl mx-auto mt-8">
            Capture thoughts instantly. ork quietly turns your writing into context, memory, and action.
          </p>
        </FadeUp>

        {/* 4. CTA */}
        <FadeUp delay={0.9}>
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

        {/* 5. The Signature Interaction */}
        <FadeUp delay={1.1} className="w-full max-w-lg mx-auto">
          <div className="relative w-full">
            <FloatingCard amplitude={4} duration={6}>
              <div className="bg-[var(--color-surface-elevated)] rounded-2xl shadow-[var(--shadow-float)] p-6 md:p-8 border border-[var(--color-border-soft)] text-left flex flex-col w-full mx-auto">
                <p className="text-xs text-[var(--color-ink-muted)] font-medium mb-3 font-sans not-italic">
                  Today, 9:14 AM
                </p>
                
                <div className="min-h-[3.5em]">
                  {phase === "idle" && (
                    <span className="font-sans text-[var(--color-ink)] text-lg leading-relaxed">&nbsp;</span>
                  )}
                  {phase === "typing" && (
                    <TypewriterText
                      text={HERO_JOURNAL_TEXT}
                      speed={35}
                      onComplete={handleTypingComplete}
                      className="font-sans text-[var(--color-ink)] text-lg leading-relaxed"
                      showCursor={true}
                    />
                  )}
                  {(phase === "highlighting" || phase === "extracting" || phase === "complete") && (
                    <HighlightedHeroText showHighlights={true} />
                  )}
                </div>

                {/* Extracted Task Card */}
                {(phase === "extracting" || phase === "complete") && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: CINEMATIC_EASE }}
                    className="mt-6 bg-[var(--color-surface-alt)] rounded-xl p-4 border border-[var(--color-border-soft)] shadow-[var(--shadow-sm)] flex flex-col gap-3 border-l-2 border-l-[var(--color-accent)] overflow-hidden"
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
          
          {/* Trust Elements */}
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
    </section>
  );
}
