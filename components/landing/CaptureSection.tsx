"use client";

import FadeUp from "@/components/animations/FadeUp";
import TypewriterText from "@/components/animations/TypewriterText";

export default function CaptureSection() {
  return (
    <section id="capture" className="py-24 md:py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side — text */}
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
                Catch it.
              </h2>
            </FadeUp>

            <FadeUp y={30} delay={0.2}>
              <p className="font-sans text-lg text-[var(--color-ink-soft)] leading-relaxed">
                No titles. No folders. No friction. Just open ork and write.
                Your thoughts find their place.
              </p>
            </FadeUp>
          </div>

          {/* Right side — demo card */}
          <FadeUp y={30} delay={0.3}>
            <div className="bg-[var(--color-surface-elevated)] rounded-2xl shadow-[var(--shadow-lg)] p-6 md:p-8 border border-[var(--color-border-soft)]">
              {/* Window chrome dots */}
              <div className="flex gap-1.5 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-red-300/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-300/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-300/50" />
              </div>

              {/* Typewriter content */}
              <div className="font-sans text-[var(--color-ink)] text-base leading-relaxed min-h-[3.5em]">
                <TypewriterText
                  text="Had a breakthrough idea for the rebrand — the logo should feel like a deep breath"
                  speed={35}
                  delay={800}
                />
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
