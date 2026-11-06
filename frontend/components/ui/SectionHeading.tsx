'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'

interface SectionHeadingProps {
  title: string
  subtitle?: string
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      variants={prefersReduced ? {} : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="text-center mb-12"
    >
      <h2 className="font-cormorant text-4xl md:text-5xl text-textPrimary mb-4">{title}</h2>
      {subtitle && <p className="font-cinzel text-xs tracking-widest uppercase text-gold">{subtitle}</p>}
      <motion.div
        className="w-16 h-px bg-gold mx-auto mt-6 origin-center"
        initial={prefersReduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
      />
    </motion.div>
  )
}
