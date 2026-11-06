'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import ProductCard from '@/components/ui/ProductCard'
import { Product } from '@/types'
import { api } from '@/lib/api'
import { demoProducts } from '@/lib/categoryCatalog'
import { fadeUp, staggerContainer } from '@/lib/animations'

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    api
      .get('/api/products?featured=true')
      .then((data) => setProducts(Array.isArray(data) && data.length > 0 ? data : demoProducts.filter((p) => p.featured)))
      .catch(() => setProducts(demoProducts.filter((p) => p.featured)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return null
  if (products.length === 0) return null

  return (
    <motion.section
      variants={prefersReduced ? {} : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="py-20 px-4 max-w-7xl mx-auto"
    >
      <SectionHeading title="Featured Pieces" subtitle="Curated Selection" />
      <motion.div
        variants={prefersReduced ? {} : staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {products.slice(0, 6).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </motion.div>
    </motion.section>
  )
}
