"use client";

import { motion } from "framer-motion";
import FadeUp from "@/components/animations/FadeUp";
import StaggerChildren, { staggerItem } from "@/components/animations/StaggerChildren";

/* ─── SVG Icons ──────────────────────────────────────────────────────── */

function IconMindMap() {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className="w-10 h-10 mb-6"
      aria-hidden="true"
    >
      {/* Connecting lines */}
      <line
        x1="12"
        y1="28"
        x2="20"
        y2="12"
        stroke="var(--color-accent)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <line
        x1="20"
        y1="12"
        x2="28"
        y2="28"
        stroke="var(--color-accent)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <line
        x1="28"
        y1="28"
        x2="12"
        y2="28"
        stroke="var(--color-accent)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* Dots */}
      <circle cx="20" cy="12" r="4" stroke="var(--color-accent)" strokeWidth={1.5} fill="none" />
      <circle cx="12" cy="28" r="4" stroke="var(--color-accent)" strokeWidth={1.5} fill="none" />
      <circle cx="28" cy="28" r="4" stroke="var(--color-accent)" strokeWidth={1.5} fill="none" />
    </svg>
  );
}

function IconPen() {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className="w-10 h-10 mb-6"
      aria-hidden="true"
    >
      {/* Diagonal pen line */}
      <line
        x1="10"
        y1="30"
        x2="30"
        y2="10"
        stroke="var(--color-accent)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* Dot at the tip */}
      <circle cx="30" cy="10" r="2.5" fill="var(--color-accent)" />
    </svg>
  );
}

function IconCheckbox() {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className="w-10 h-10 mb-6"
      aria-hidden="true"
    >
      {/* Rounded rectangle */}
      <rect
        x="8"
        y="8"
        width="24"
        height="24"
        rx="6"
        stroke="var(--color-accent)"
        strokeWidth={1.5}
        fill="none"
      />
      {/* Checkmark */}
      <path
        d="M14 20.5 L18.5 25 L26 15"
        stroke="var(--color-accent)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* ─── Card Data ──────────────────────────────────────────────────────── */

const features = [
  {
    id: "feature-think",
    icon: <IconMindMap />,
    title: "Connect ideas",
    description:
      "Thoughts link to each other. ork builds your web of thinking — automatically.",
  },
  {
    id: "feature-write",
    icon: <IconPen />,
    title: "Publish instantly",
    description:
      "Turn any thought into a micro-blog. Share your thinking with one tap.",
  },
  {
    id: "feature-do",
    icon: <IconCheckbox />,
    title: "Act with context",
    description:
      "Every task carries the thought that created it. Never lose the why.",
  },
] as const;

/* ─── Component ──────────────────────────────────────────────────────── */

export default function FeatureTriad() {
  return (
    <section id="features" className="py-24 md:py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Header ────────────────────────────────────────────────── */}
        <header className="text-center mb-16">
          <FadeUp>
            <p className="text-xs tracking-[0.15em] font-sans font-semibold text-[var(--color-ink-muted)] mb-4">
              THINK · WRITE · DO
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] tracking-[-0.025em] text-[var(--color-ink)]">
              Three modes. One flow.
            </h2>
          </FadeUp>
        </header>

        {/* ── Cards ─────────────────────────────────────────────────── */}
        <StaggerChildren
          stagger={0.15}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              id={feature.id}
              variants={staggerItem}
              className="bg-[var(--color-surface-elevated)] rounded-2xl p-8 md:p-10 border border-[var(--color-border-soft)] shadow-[var(--shadow-sm)] card-hover"
            >
              {feature.icon}
              <h3 className="font-serif text-2xl text-[var(--color-ink)] mb-3">
                {feature.title}
              </h3>
              <p className="font-sans text-base text-[var(--color-ink-soft)] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
