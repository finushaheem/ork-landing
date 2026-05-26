"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  id?: string;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  id,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Restrained magnetic follow — damped enough to feel deliberate, not frantic
  const positionSpring = { damping: 20, stiffness: 200, mass: 0.15 };
  const springX = useSpring(x, positionSpring);
  const springY = useSpring(y, positionSpring);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Crisp scale spring — press and release feels tactile
  const scale = useMotionValue(1);
  const scaleSpring = useSpring(scale, { damping: 25, stiffness: 350, mass: 0.1 });

  return (
    <motion.div
      ref={ref}
      className={`magnetic-wrap ${className}`}
      style={{ x: springX, y: springY, scale: scaleSpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        handleMouseLeave();
        scale.set(1);
      }}
      onMouseEnter={() => scale.set(1.03)}
      onMouseDown={() => scale.set(0.97)}
      onMouseUp={() => scale.set(1.03)}
      onClick={onClick}
      id={id}
    >
      {children}
    </motion.div>
  );
}
