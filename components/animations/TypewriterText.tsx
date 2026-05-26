"use client";

import { useState, useEffect, useRef } from "react";

/* ── Types ────────────────────────────────────────────────────────────────── */

export type TypewriterStep =
  | { type: "type";   text: string; speed?: number }
  | { type: "pause";  ms: number }
  | { type: "delete"; count: number; speed?: number };

interface TypewriterTextProps {
  /** Simple text input. Used when steps is not provided. */
  text?: string;
  /**
   * Advanced scripted sequence supporting typing, pauses, and deletes.
   * Use this for typo-and-correction sequences.
   */
  steps?: TypewriterStep[];
  /** Base character speed in ms. Default: 35. */
  speed?: number;
  /** Initial delay before typing starts, in ms. Default: 0. */
  delay?: number;
  onComplete?: () => void;
  className?: string;
  showCursor?: boolean;
  /**
   * Adds organic variation to simple `text` typing:
   * - ±10ms random speed variation per character
   * - +80ms pause after commas
   * - +160ms pause after sentence-ending punctuation
   */
  humanize?: boolean;
}

/* ── Component ────────────────────────────────────────────────────────────── */

export default function TypewriterText({
  text,
  steps,
  speed = 35,
  delay = 0,
  onComplete,
  className = "",
  showCursor = true,
  humanize = false,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isDone, setIsDone] = useState(false);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        if (cancelled) { resolve(); return; }
        const t = setTimeout(resolve, Math.max(ms, 0));
        timers.push(t);
      });

    const run = async () => {
      // Initial delay
      if (delay > 0) await sleep(delay);
      if (cancelled) return;

      // Resolve steps: either the explicit `steps` array, or a single type step from `text`
      const execSteps: TypewriterStep[] = steps ?? [
        { type: "type", text: text ?? "" },
      ];

      let current = "";

      for (const step of execSteps) {
        if (cancelled) return;

        if (step.type === "type") {
          for (const char of step.text) {
            if (cancelled) return;

            let charDelay = step.speed ?? speed;

            // Organic variation for simple text mode
            if (humanize && step.speed === undefined) {
              charDelay += Math.round((Math.random() * 20) - 10);
              // Punctuation pauses based on the character just added
              const tail = current.slice(-1);
              if (tail === ",") charDelay += 80;
              else if (tail === "." || tail === "!" || tail === "?") charDelay += 160;
            }

            await sleep(charDelay);
            if (cancelled) return;

            current += char;
            setDisplayText(current);
          }
        } else if (step.type === "delete") {
          for (let i = 0; i < step.count; i++) {
            if (cancelled) return;
            await sleep(step.speed ?? 55);
            if (cancelled) return;
            current = current.slice(0, -1);
            setDisplayText(current);
          }
        } else if (step.type === "pause") {
          await sleep(step.ms);
          if (cancelled) return;
        }
      }

      if (!cancelled) {
        setIsDone(true);
        onComplete?.();
      }
    };

    const startTimer = setTimeout(() => { run(); }, 0);
    timers.push(startTimer);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span className={className}>
      {displayText}
      {showCursor && !isDone && (
        <span
          className="inline-block w-[2px] h-[1em] ml-[1px] align-text-bottom bg-[var(--color-accent)]"
          style={{
            animation: "cursor-breathe 1.4s cubic-bezier(0.45, 0, 0.55, 1) infinite",
          }}
        />
      )}
    </span>
  );
}
