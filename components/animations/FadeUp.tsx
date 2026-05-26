"use client";

import { motion, useInView, type Transition } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  once?: boolean;
  ease?: Transition["ease"];
}

export default function FadeUp({
  children,
  delay = 0,
  duration = 0.55,
  y = 24,
  className = "",
  once = true,
  // CINEMATIC ease: explosive start, extended graceful deceleration
  ease = [0.16, 1, 0.3, 1],
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y, scale: 0.98 }}
      transition={{ duration, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
