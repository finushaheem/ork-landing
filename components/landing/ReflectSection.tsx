'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
} as const

const stagger = {
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

export default function ReflectSection() {
  const textRef = useRef<HTMLDivElement>(null)
  const textInView = useInView(textRef, { once: true, margin: '-80px' })

  return (
    <section
      id="reflect"
      className="py-24 md:py-32 lg:py-40 bg-[var(--color-surface-alt)]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text side — first on mobile, right (order-2) on desktop */}
          <motion.div
            ref={textRef}
            className="lg:order-2"
            initial="hidden"
            animate={textInView ? 'visible' : 'hidden'}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.15em] font-sans font-semibold text-[var(--color-accent)] mb-4"
            >
              REFLECT
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="font-serif text-4xl md:text-5xl leading-[1.1] tracking-[-0.025em] text-[var(--color-ink)] mb-6"
            >
              Your journal. Your mirror.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="font-sans text-lg text-[var(--color-ink-soft)] leading-relaxed"
            >
              Write without judgment. ork holds your words gently — and quietly
              helps you see patterns you didn&apos;t know were there.
            </motion.p>
          </motion.div>

          {/* Demo side — second on mobile, left (order-1) on desktop */}
          <motion.div
            className="lg:order-1"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="bg-[var(--color-surface-elevated)] rounded-2xl shadow-[var(--shadow-lg)] p-6 md:p-8 border border-[var(--color-border-soft)]">
              <p className="text-xs text-[var(--color-ink-muted)] font-medium mb-4 font-sans">
                May 26, 2026
              </p>

              <p className="font-sans text-[var(--color-ink-soft)] text-base leading-[1.8]">
                Today felt lighter. The morning walk cleared something I
                couldn&apos;t name. Need to call Sarah tomorrow about the design
                proposal. I think the project needs more breathing room — like
                this journal.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
