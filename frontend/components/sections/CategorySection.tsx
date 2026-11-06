'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import CategoryCard from '@/components/ui/CategoryCard'
import { categories } from '@/lib/utils'
import { fadeUp, staggerContainer } from '@/lib/animations'

export default function CategorySection() {
  const prefersReduced = useReducedMotion()
  return (
    <motion.section
      variants={prefersReduced ? {} : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="py-20 px-4 max-w-7xl mx-auto"
    >
      <SectionHeading title="Our Collections" subtitle="Browse by Category" />
      <motion.div
        variants={prefersReduced ? {} : staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {categories.map((category, index) => (
          <CategoryCard key={category} name={category} index={index} />
        ))}
      </motion.div>
    </motion.section>
  )
}
