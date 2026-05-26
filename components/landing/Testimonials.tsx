"use client";

import FadeUp from "@/components/animations/FadeUp";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-[var(--color-surface-alt)] py-24 md:py-32 lg:py-40"
    >
      <div className="max-w-3xl mx-auto px-6 text-center">
        {/* ── First Testimonial ── */}

        {/* Decorative quotation mark */}
        <FadeUp>
          <span
            className="block font-serif text-7xl md:text-8xl text-[var(--color-border)] leading-none mb-4 select-none"
            aria-hidden="true"
          >
            &ldquo;
          </span>
        </FadeUp>

        {/* Main quote */}
        <FadeUp delay={0.15}>
          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.3] tracking-[-0.02em] text-[var(--color-ink)]">
            ork replaced four apps for me. Not because it does more — because it
            understands how I think.
          </blockquote>
        </FadeUp>

        {/* Attribution */}
        <FadeUp delay={0.3}>
          <div className="mt-8 flex flex-col items-center gap-2">
            <div
              className="w-12 h-12 rounded-full bg-[var(--color-surface)] border border-[var(--color-border-soft)] flex items-center justify-center"
              aria-hidden="true"
            >
              <span className="text-sm font-medium text-[var(--color-ink-muted)]">
                AK
              </span>
            </div>
            <span className="font-sans font-medium text-base text-[var(--color-ink)]">
              Arjun Kapoor
            </span>
            <span className="font-sans text-sm text-[var(--color-ink-muted)]">
              Product Designer
            </span>
          </div>
        </FadeUp>

        {/* ── Divider ── */}
        <div
          className="w-12 h-px bg-[var(--color-border)] mx-auto mt-16 mb-16"
          aria-hidden="true"
        />

        {/* ── Second Testimonial ── */}

        {/* Quote */}
        <FadeUp>
          <blockquote className="font-serif text-xl md:text-2xl leading-[1.3] text-[var(--color-ink-soft)] italic">
            I stopped taking notes. Now I just think out loud, and ork does the
            rest.
          </blockquote>
        </FadeUp>

        {/* Attribution */}
        <FadeUp delay={0.15}>
          <div className="mt-8 flex flex-col items-center gap-2">
            <div
              className="w-12 h-12 rounded-full bg-[var(--color-surface)] border border-[var(--color-border-soft)] flex items-center justify-center"
              aria-hidden="true"
            >
              <span className="text-sm font-medium text-[var(--color-ink-muted)]">
                MC
              </span>
            </div>
            <span className="font-sans font-medium text-sm text-[var(--color-ink)]">
              Maya Chen
            </span>
            <span className="font-sans text-sm text-[var(--color-ink-muted)]">
              Writer &amp; Essayist
            </span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
