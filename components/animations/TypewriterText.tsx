"use client";

import { useState, useEffect, useRef } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
  showCursor?: boolean;
}

export default function TypewriterText({
  text,
  speed = 40,
  delay = 0,
  onComplete,
  className = "",
  showCursor = true,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      let i = 0;

      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          setIsDone(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && !isDone && (
        <span
          className={`inline-block w-[2px] h-[1em] ml-[1px] align-text-bottom ${
            isTyping ? "bg-[var(--color-accent)]" : ""
          }`}
          style={{
            animation: isTyping ? "none" : "blink 1s ease-in-out infinite",
            backgroundColor: "var(--color-accent)",
          }}
        />
      )}
    </span>
  );
}
