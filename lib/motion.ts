/**
 * ork.so Motion Design Tokens
 * Single source of truth for all animation values.
 * Governing metaphor: "A thought settling into clarity."
 */

// ── Easing curves ─────────────────────────────────────────────────────────────
export const EASE = {
  /** Explosive start, extended graceful deceleration. Primary ease — all entrances. */
  cinematic: [0.16, 1, 0.3, 1] as const,
  /** Balanced, graceful. Used for exits and background transitions. */
  settle: [0.25, 0.1, 0.25, 1] as const,
  /** Fast and confident. Used for hover states and micro-interactions. */
  micro: [0.4, 0, 0.2, 1] as const,
  /** Slight spring overshoot (1.36). Used for extracted task cards and intelligent elements. */
  organic: [0.34, 1.36, 0.64, 1] as const,
} as const;

// ── Duration scale (seconds) ──────────────────────────────────────────────────
export const DURATION = {
  instant:   0,
  micro:     0.12,
  fast:      0.20,
  medium:    0.35,
  standard:  0.55,
  slow:      0.75,
  cinematic: 1.00,
  epic:      1.40,
} as const;

// ── Stagger timing (seconds between children) ─────────────────────────────────
export const STAGGER = {
  dense:    0.08,
  standard: 0.15,
  dramatic: 0.20,
  max:      0.25,
} as const;

// ── Floating card behavior ─────────────────────────────────────────────────────
export const FLOAT = {
  amplitude: 4,    // px — vertical travel distance
  duration:  6,    // seconds per full cycle
  rotation:  0.4,  // degrees — coupled tilt with y movement
} as const;

// ── Spring physics configs ─────────────────────────────────────────────────────
export const SPRING = {
  /** Magnetic button position tracking — restrained follow */
  magnetic: { damping: 20, stiffness: 200, mass: 0.15 },
  /** Scale feedback (button press / hover) — crisp response */
  scale:    { damping: 25, stiffness: 350, mass: 0.10 },
  /** Organic emergence (task cards, intelligence extractions) — alive feel */
  organic:  { damping: 18, stiffness: 280, mass: 0.12 },
} as const;
