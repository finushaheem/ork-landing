"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import FadeUp from "@/components/animations/FadeUp";
import TypewriterText, { type TypewriterStep } from "@/components/animations/TypewriterText";
import { motion, useInView } from "framer-motion";

/* ── Easing tokens ────────────────────────────────────────────────────────── */

const CINEMATIC: [number, number, number, number] = [0.16, 1, 0.3, 1];
const ORGANIC:   [number, number, number, number] = [0.34, 1.36, 0.64, 1];
const SETTLE:    [number, number, number, number] = [0.25, 0.1, 0.25, 1];

/* ── Typewriter script ─────────────────────────────────────────────────────
   Types "homepgae" (transposing 'a' and 'g'), pauses, corrects to "homepage"
   This human moment is the most memorable frame in the entire site.
─────────────────────────────────────────────────────────────────────────── */

const MAGIC_STEPS: TypewriterStep[] = [
  { type: "type",   text: "Need to call Emma tomorrow about the design review for the new homep" },
  { type: "type",   text: "gae",    speed: 30 },    // typo: "homepgae"
  { type: "pause",  ms: 280 },                       // user notices the mistake
  { type: "delete", count: 3,       speed: 55 },     // delete "gae"
  { type: "type",   text: "age.",   speed: 22 },     // correct: "homepage."
];

/* ── Phase type ───────────────────────────────────────────────────────────── */

type Phase = "idle" | "typing" | "highlighting" | "extracting" | "complete";

/* ── Highlighted text with three underline styles ────────────────────────────
   Solid  → person/action ("call Emma")
   Dashed → temporal       ("tomorrow")
   Dotted → category/topic ("homepage")
─────────────────────────────────────────────────────────────────────────── */

function HighlightedText({ show }: { show: boolean }) {
  return (
    <span className="font-sans text-[var(--color-ink)] text-lg leading-relaxed">
      Need to{" "}
      {/* Solid underline — person/action */}
      <span className="relative inline">
        call Emma tomorrow
        {show && (
          <motion.span
            className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-accent)] rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.38, ease: CINEMATIC, delay: 0.7 }}
            style={{ transformOrigin: "left" }}
          />
        )}
      </span>{" "}
      about the design review for the new{" "}
      {/* Dotted underline — category/topic */}
      <span className="relative inline">
        homepage
        {show && (
          <motion.span
            className="absolute bottom-0 left-0 w-full h-[1.5px] rounded-full"
            style={{
              background: `repeating-linear-gradient(to right, var(--color-accent) 0, var(--color-accent) 2px, transparent 2px, transparent 5px)`,
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.38, ease: CINEMATIC, delay: 0.9 }}
          />
        )}
      </span>
      .
    </span>
  );
}

/* ── Task card ────────────────────────────────────────────────────────────── */

interface TagDef { label: string; accent: boolean }
interface TaskDef { id: string; title: string; tags: TagDef[] }

const TASKS: TaskDef[] = [
  {
    id: "magic-task-1",
    title: "Call Emma about design review",
    tags: [
      { label: "Tomorrow",               accent: true  },
      { label: "#homepage",              accent: false },
      { label: "↗ Design review note",  accent: false },
    ],
  },
];

function TaskCard({ task, delay }: { task: TaskDef; delay: number }) {
  return (
    <motion.div
      id={task.id}
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: ORGANIC, delay }}
      className="bg-[var(--color-surface-elevated)] rounded-xl p-5 border border-[var(--color-border-soft)] shadow-[var(--shadow-md)] text-left border-l-2 border-l-[var(--color-accent)]"
    >
      <div className="flex items-start gap-3">
        <span
          className="w-5 h-5 rounded border-2 border-[var(--color-border)] flex-shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <span className="font-sans font-medium text-[var(--color-ink)] text-base">
          {task.title}
        </span>
      </div>
      <div className="mt-3 ml-8 flex gap-2 flex-wrap">
        {task.tags.map((tag, i) => (
          <motion.span
            key={tag.label}
            initial={{ opacity: 0, x: -8, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.25, ease: ORGANIC, delay: delay + 0.15 + i * 0.08 }}
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              tag.accent
                ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                : "bg-[var(--color-surface-alt)] text-[var(--color-ink-muted)]"
            }`}
          >
            {tag.label}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Replay button ────────────────────────────────────────────────────────── */

function ReplayButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      whileHover={{ opacity: 1, rotate: -360 }}
      transition={{ opacity: { duration: 0.5, delay: 0.8 }, rotate: { duration: 1.0, ease: CINEMATIC } }}
      className="absolute bottom-0 right-0 w-8 h-8 flex items-center justify-center text-[var(--color-ink-muted)] cursor-pointer"
      aria-label="Replay animation"
      title="See it again"
    >
      <svg viewBox="0 0 20 20" fill="none" width={18} height={18} aria-hidden="true">
        <path
          d="M16 10a6 6 0 1 1-2-4.47"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <path
          d="M14 3v4h-4"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
}

/* ── Main component ───────────────────────────────────────────────────────── */

export default function MagicSection() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [replayCount, setReplayCount] = useState(0);
  const demoRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(demoRef, { once: true, margin: "-100px" });
  const hasTriggered = useRef(false);

  const handleTypingComplete = useCallback(() => {
    setPhase("highlighting");
  }, []);

  // Auto-trigger on viewport enter
  useEffect(() => {
    if (isInView && !hasTriggered.current) {
      hasTriggered.current = true;
      setPhase("typing");
    }
  }, [isInView]);

  // Phase machine
  useEffect(() => {
    if (phase === "highlighting") {
      // 2200ms: enough time for the warm glow + all three underline draws + viewing pause
      const t = setTimeout(() => setPhase("extracting"), 2200);
      return () => clearTimeout(t);
    }
    if (phase === "extracting") {
      // 1600ms: task card + tags settle
      const t = setTimeout(() => setPhase("complete"), 1600);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const resetAndReplay = useCallback(() => {
    setPhase("idle");
    setTimeout(() => {
      setReplayCount((c) => c + 1);
      setPhase("typing");
    }, 350);
  }, []);

  const showHighlights = phase === "highlighting" || phase === "extracting" || phase === "complete";
  const showTasks      = phase === "extracting"   || phase === "complete";

  return (
    <section
      id="magic"
      className="py-32 md:py-40 lg:py-48"
      style={{ backgroundColor: "hsl(35, 18%, 93%)" }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">

        {/* Header */}
        <FadeUp>
          <span className="text-xs tracking-[0.15em] font-sans font-semibold text-[var(--color-accent)] mb-6 block">
            THE MOMENT
          </span>
        </FadeUp>

        <FadeUp delay={0.15}>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-[52px] leading-[1.1] tracking-[-0.025em] text-[var(--color-ink)] mb-6">
            Write naturally.
            <br />
            ork reads between the lines.
          </h2>
        </FadeUp>

        <FadeUp delay={0.25}>
          <p className="font-sans text-lg text-[var(--color-ink-soft)] max-w-xl mx-auto mb-16 leading-relaxed">
            Every intention in your writing becomes a task.
            Every task carries the thought that created it.
          </p>
        </FadeUp>

        {/* Demo */}
        <div ref={demoRef} className="max-w-2xl mx-auto">

          {/* Wrapper that holds journal card + connector + task cards */}
          <div className="relative flex flex-col">

            {/* Journal card */}
            <div className="relative">
              {/* Growing left accent border — activates in highlighting phase */}
              {showHighlights && (
                <motion.div
                  className="absolute left-[-1px] top-0 bottom-0 w-[3px] rounded-l-2xl z-10"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.4, delay: 0.5, ease: CINEMATIC }}
                  style={{ transformOrigin: "top", backgroundColor: "var(--color-accent)" }}
                />
              )}

              <div className="bg-[var(--color-surface-elevated)] rounded-2xl shadow-[var(--shadow-float)] p-8 md:p-10 border border-[var(--color-border-soft)] text-left">
                <p className="text-xs text-[var(--color-ink-muted)] font-medium mb-4 font-sans">
                  May 26, 2026 · Evening
                </p>

                <div className="min-h-[3.5em]">
                  {phase === "idle" && (
                    <span className="font-sans text-[var(--color-ink)] text-lg leading-relaxed">
                      &nbsp;
                    </span>
                  )}
                  {phase === "typing" && (
                    <TypewriterText
                      key={`magic-typewriter-${replayCount}`}
                      steps={MAGIC_STEPS}
                      speed={30}
                      humanize
                      onComplete={handleTypingComplete}
                      className="font-sans text-[var(--color-ink)] text-lg leading-relaxed"
                      showCursor
                    />
                  )}
                  {showHighlights && <HighlightedText show />}
                </div>
              </div>
            </div>

            {/* Connector line between journal card and task card */}
            {showTasks && (
              <motion.div
                className="self-start w-[3px]"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.3, ease: CINEMATIC }}
                style={{ transformOrigin: "top", height: "24px", backgroundColor: "var(--color-accent)", marginLeft: "-1px" }}
              />
            )}

            {/* Task cards */}
            {showTasks && (
              <div className="flex flex-col gap-3">
                {TASKS.map((task, i) => (
                  <TaskCard key={`${task.id}-${replayCount}`} task={task} delay={i * 0.15} />
                ))}
              </div>
            )}

            {/* Replay button */}
            {phase === "complete" && (
              <ReplayButton onClick={resetAndReplay} />
            )}
          </div>

          {/* Caption */}
          {phase === "complete" && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3, ease: CINEMATIC }}
              className="text-sm text-[var(--color-ink-muted)] font-sans mt-8 text-center"
            >
              Extracted automatically. The context stays with the task.
            </motion.p>
          )}
        </div>

        {/* Closing line */}
        <FadeUp className="mt-20">
          <p className="font-serif text-xl md:text-2xl text-[var(--color-ink-soft)] text-center max-w-lg mx-auto italic">
            &ldquo;What used to take a system, now takes a sentence.&rdquo;
          </p>
        </FadeUp>

      </div>
    </section>
  );
}
