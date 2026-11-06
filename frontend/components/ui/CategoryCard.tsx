'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { scaleIn } from '@/lib/animations'

interface CategoryCardProps {
  name: string
  index: number
}

export default function CategoryCard({ name, index }: CategoryCardProps) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      variants={prefersReduced ? {} : scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover="hover"
      className="group relative overflow-hidden cursor-pointer"
    >
      <Link href={`/shop?category=${encodeURIComponent(name)}`}>
        <div className="relative bg-surface border border-gold/20 p-10 text-center overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-emerald/10 to-transparent"
            variants={{ rest: { opacity: 0.35, scale: 1 }, hover: { opacity: 0.6, scale: 1.07 } }}
            initial="rest"
            animate="rest"
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <div className="relative z-10 flex flex-col items-center justify-end">
            <motion.h3
              className="font-cormorant text-2xl text-textPrimary"
              variants={{ rest: { y: 0 }, hover: { y: -6 } }}
              initial="rest"
              transition={{ duration: 0.3 }}
            >
              {name}
            </motion.h3>
            <motion.span
              className="font-jost text-gold text-xs tracking-[0.2em] uppercase mt-3"
              variants={{ rest: { opacity: 0, y: 10 }, hover: { opacity: 1, y: 0 } }}
              initial="rest"
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              Shop Now →
            </motion.span>
          </div>
          <div className="absolute inset-0 border border-transparent group-hover:border-gold/40 transition-colors duration-300 pointer-events-none" />
        </div>
      </Link>
    </motion.div>
  )
}
