"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface FloatingCardProps {
  children: ReactNode;
  /** Vertical travel distance in px. Default: 4 (subtle, not dramatic). */
  amplitude?: number;
  /** Full cycle duration in seconds. Default: 6. */
  duration?: number;
  delay?: number;
  className?: string;
  /** Disable continuous float — entrance only (use on mobile). */
  disableFloat?: boolean;
}

export default function FloatingCard({
  children,
  amplitude = 4,
  duration = 6,
  delay = 0,
  className = "",
  disableFloat = false,
}: FloatingCardProps) {
  if (disableFloat) {
    return <div className={className}>{children}</div>;
  }

  // Rotation coupled to y-movement: card tilts slightly as it rises/falls.
  // ±0.4deg is sub-perceptual consciously but registers as "organic" vs "mechanical".
  const rotation = 0.4;

  return (
    <motion.div
      animate={{
        y:      [0, -amplitude, 0,  amplitude, 0],
        rotate: [0, -rotation,  0,  rotation,  0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
