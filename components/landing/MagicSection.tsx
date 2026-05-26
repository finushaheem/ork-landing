"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import FadeUp from "@/components/animations/FadeUp";
import TypewriterText from "@/components/animations/TypewriterText";
import { motion, useInView } from "framer-motion";

/* ─── Constants ─────────────────────────────────────────────── */

const JOURNAL_TEXT =
  "Need to call Sarah tomorrow about the design proposal. Also should review the brand deck before Friday.";

type Phase = "idle" | "typing" | "highlighting" | "extracting" | "complete";

const CINEMATIC_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── Task data ─────────────────────────────────────────────── */

const tasks = [
  {
    id: "task-magic-1",
    title: "Call Sarah about design proposal",
    tags: [
      { label: "Tomorrow", accent: true },
      { label: "Design", accent: false },
      { label: "Linked to: May 26 journal", accent: false },
    ],
  },
  {
    id: "task-magic-2",
    title: "Review brand deck",
    tags: [
      { label: "Before Friday", accent: true },
      { label: "Brand", accent: false },
      { label: "Linked to: May 26 journal", accent: false },
    ],
  },
];

/* ─── Highlighted text renderer ─────────────────────────────── */

function HighlightedJournalText({
  showHighlights,
}: {
  showHighlights: boolean;
}) {
  return (
    <span className="font-sans text-[var(--color-ink)] text-lg leading-relaxed">
      Need to{" "}
      <span className="relative inline">
        call Sarah tomorrow
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
      about the design proposal. Also should{" "}
      <span className="relative inline">
        review the brand deck before Friday
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

/* ─── Task Card ─────────────────────────────────────────────── */

function TaskCard({
  task,
  delay,
}: {
  task: (typeof tasks)[0];
  delay: number;
}) {
  return (
    <motion.div
      id={task.id}
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: CINEMATIC_EASE, delay }}
      className="bg-[var(--color-surface-elevated)] rounded-xl p-5 border border-[var(--color-border-soft)] shadow-[var(--shadow-md)] text-left border-l-2 border-l-[var(--color-accent)]"
    >
      {/* Checkbox + title */}
      <div className="flex items-start gap-3">
        <span
          className="w-5 h-5 rounded border-2 border-[var(--color-border)] flex-shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <span className="font-sans font-medium text-[var(--color-ink)] text-base">
          {task.title}
        </span>
      </div>

      {/* Tags */}
      <div className="mt-2 ml-8 flex gap-2 flex-wrap">
        {task.tags.map((tag) => (
          <span
            key={tag.label}
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              tag.accent
                ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                : "bg-[var(--color-surface-alt)] text-[var(--color-ink-muted)]"
            }`}
          >
            {tag.label}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────────────────────── */

export default function MagicSection() {
  const [phase, setPhase] = useState<Phase>("idle");
  const demoRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(demoRef, { once: true, margin: "-100px" });
  const hasTriggered = useRef(false);

  /* Stabilize the onComplete callback so TypewriterText doesn't
     re-render endlessly when deps change */
  const handleTypingComplete = useCallback(() => {
    setPhase("highlighting");
  }, []);

  // Start typing when demo enters viewport
  useEffect(() => {
    if (isInView && !hasTriggered.current) {
      hasTriggered.current = true;
      setPhase("typing");
    }
  }, [isInView]);

  // Phase transitions after typing
  useEffect(() => {
    if (phase === "highlighting") {
      const timer = setTimeout(() => {
        setPhase("extracting");
      }, 600 + 500); // 600ms pause to see highlights, 500ms viewing time
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
      id="magic"
      className="bg-[var(--color-surface-alt)] py-32 md:py-40 lg:py-48"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* ── Header ────────────────────────────────── */}
        <FadeUp>
          <span className="text-xs tracking-[0.15em] font-sans font-semibold text-[var(--color-accent)] mb-6 block">
            THE MAGIC
          </span>
        </FadeUp>

        <FadeUp delay={0.15}>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.1] tracking-[-0.025em] text-[var(--color-ink)] mb-16">
            Write naturally.
            <br />
            ork reads between the lines.
          </h2>
        </FadeUp>

        {/* ── Demo area ─────────────────────────────── */}
        <div ref={demoRef} className="max-w-2xl mx-auto">
          {/* Journal card */}
          <div
            id="magic-journal-card"
            className="bg-[var(--color-surface-elevated)] rounded-2xl shadow-[var(--shadow-float)] p-8 md:p-10 border border-[var(--color-border-soft)] text-left"
          >
            {/* Date line */}
            <p className="text-xs text-[var(--color-ink-muted)] font-medium mb-4 font-sans">
              May 26, 2026 · Evening
            </p>

            {/* Journal content */}
            <div className="min-h-[3.5em]">
              {phase === "idle" && (
                /* Empty placeholder before animation starts */
                <span className="font-sans text-[var(--color-ink)] text-lg leading-relaxed">
                  &nbsp;
                </span>
              )}

              {phase === "typing" && (
                <TypewriterText
                  text={JOURNAL_TEXT}
                  speed={30}
                  onComplete={handleTypingComplete}
                  className="font-sans text-[var(--color-ink)] text-lg leading-relaxed"
                  showCursor={true}
                />
              )}

              {(phase === "highlighting" ||
                phase === "extracting" ||
                phase === "complete") && (
                <HighlightedJournalText
                  showHighlights={
                    phase === "highlighting" ||
                    phase === "extracting" ||
                    phase === "complete"
                  }
                />
              )}
            </div>
          </div>

          {/* Task cards – only show during/after extracting */}
          {(phase === "extracting" || phase === "complete") && (
            <div className="mt-6 flex flex-col gap-3">
              {tasks.map((task, i) => (
                <TaskCard key={task.id} task={task} delay={i * 0.15} />
              ))}
            </div>
          )}

          {/* Caption */}
          {phase === "complete" && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: CINEMATIC_EASE }}
              className="text-sm text-[var(--color-ink-muted)] font-sans mt-8 text-center"
            >
              Extracted automatically. No tagging. No organizing. Just writing.
            </motion.p>
          )}
        </div>

        {/* ── Closing line ──────────────────────────── */}
        <FadeUp className="mt-16">
          <p className="font-serif text-xl md:text-2xl text-[var(--color-ink-soft)] text-center max-w-lg mx-auto">
            Your thoughts become actions. Without losing their context.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
