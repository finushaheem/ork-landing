"use client";

import FadeUp from "@/components/animations/FadeUp";
import MagneticButton from "@/components/animations/MagneticButton";

const cinematicEase = [0.16, 1, 0.3, 1] as const;

/* ——— Minimal platform icons (16×16, stroke-based) ——— */

function GlobeIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx={8} cy={8} r={6.5} />
      <ellipse cx={8} cy={8} rx={3} ry={6.5} />
      <line x1={1.5} y1={8} x2={14.5} y2={8} />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 1.5c-1.5 0-2 1.5-2 1.5s1.5-.2 2.5-1.2" />
      <path d="M5.5 5C3.5 5 2 7.5 2 10c0 2.8 1.8 4.5 3.5 4.5 .8 0 1.5-.4 2.5-.4s1.7.4 2.5.4C12.2 14.5 14 12.8 14 10c0-2.5-1.5-5-3.5-5-1 0-1.7.5-2.5.5S6.5 5 5.5 5z" />
    </svg>
  );
}

function PlayStoreIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 2.5v11l9.5-5.5L3 2.5z" />
    </svg>
  );
}

/* ——————————————————————————————————————————————————————— */

export default function ClosingCTA() {
  return (
    <section
      id="cta"
      className="min-h-svh flex items-center justify-center"
      style={{ backgroundColor: "var(--color-ink)" }}
    >
      <div className="max-w-3xl mx-auto px-6 text-center">

        {/* ── Decorative rule ── */}
        <FadeUp duration={0.6} ease={cinematicEase}>
          <div
            className="w-8 h-px mx-auto mb-16"
            style={{ backgroundColor: "hsl(38, 8%, 24%)" }}
            aria-hidden="true"
          />
        </FadeUp>

        {/* ── Headline ── */}
        <FadeUp duration={0.9} ease={cinematicEase} delay={0.05}>
          <h2
            className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-[-0.03em] mb-6"
            style={{ color: "hsl(40, 20%, 93%)" }}
          >
            Your mind deserves
            <br />
            a better home.
          </h2>
        </FadeUp>

        {/* ── Subhead ── */}
        <FadeUp delay={0.2}>
          <p
            className="font-sans text-lg md:text-xl mb-12 leading-relaxed"
            style={{ color: "hsl(38, 8%, 55%)" }}
          >
            Free to begin. No setup, no friction, no card required.
          </p>
        </FadeUp>

        {/* ── CTA Button — the one accent moment on the page ── */}
        <FadeUp delay={0.35}>
          <MagneticButton id="cta-button">
            <button
              className="cta-accent-btn cta-pulse rounded-full px-10 py-4 text-lg font-medium cursor-pointer"
            >
              Begin →
            </button>
          </MagneticButton>
        </FadeUp>

        {/* ── Platform info ── */}
        <FadeUp delay={0.5}>
          <p
            className="mt-8 text-sm flex items-center justify-center gap-2"
            style={{ color: "hsl(38, 8%, 38%)" }}
          >
            <GlobeIcon />
            <AppleIcon />
            <PlayStoreIcon />
            <span>Available on Web, iOS, and Android</span>
          </p>
        </FadeUp>

      </div>
    </section>
  );
}
