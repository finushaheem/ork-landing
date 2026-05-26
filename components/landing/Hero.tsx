"use client";

import FadeUp from "@/components/animations/FadeUp";
import FloatingCard from "@/components/animations/FloatingCard";
import MagneticButton from "@/components/animations/MagneticButton";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-svh flex flex-col items-center justify-center text-center bg-[var(--color-surface)]"
    >
      {/* Subtle radial gradient background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(38, 25%, 96%) 0%, transparent 70%)",
        }}
      />

      {/* Content container */}
      <div className="relative max-w-4xl mx-auto px-6">
        {/* 1. Tagline */}
        <FadeUp delay={0.2}>
          <p className="uppercase text-xs tracking-[0.15em] font-sans font-medium text-[var(--color-ink-muted)] mb-8">
            A space for your mind
          </p>
        </FadeUp>

        {/* 2. Headline — cinematic ease */}
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
            Capture thoughts. Write journals. Publish ideas. ork quietly turns
            your thinking into clarity, context, and action.
          </p>
        </FadeUp>

        {/* 4. CTA area */}
        <FadeUp delay={0.9}>
          <div className="mt-12">
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

        {/* 5. Floating journal card */}
        <FadeUp delay={1.1}>
          <div className="mt-16 md:mt-20 relative">
            <FloatingCard amplitude={6} duration={5}>
              <div className="bg-[var(--color-surface-elevated)] rounded-2xl shadow-[var(--shadow-float)] p-8 md:p-10 max-w-md mx-auto border border-[var(--color-border-soft)]">
                <p className="text-xs text-[var(--color-ink-muted)] font-medium mb-3 font-sans not-italic">
                  Today, 9:14 AM
                </p>
                <p className="font-sans text-[var(--color-ink-soft)] text-base leading-relaxed italic">
                  The morning light through the kitchen window reminded me —
                  some ideas need warmth, not urgency, to grow...
                </p>
              </div>
            </FloatingCard>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
