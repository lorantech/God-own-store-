'use client'

import { useEffect, useMemo, useState, Suspense } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import ProductCard from '@/components/ui/ProductCard'
import SectionHeading from '@/components/ui/SectionHeading'
import { Product, Category } from '@/types'
import { api } from '@/lib/api'
import { categories as defaultCategories } from '@/lib/utils'
import { demoByCategory, demoProducts } from '@/lib/categoryCatalog'
import { staggerContainer } from '@/lib/animations'

function ShopContent() {
  const searchParams = useSearchParams()
  const categoryFilter = searchParams.get('category')
  const [products, setProducts] = useState<Product[]>([])
  const [categoryNames, setCategoryNames] = useState<string[]>(defaultCategories)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter || 'all')
  const [heroIndex, setHeroIndex] = useState(0)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    api.get('/api/categories').then((d: Category[]) => {
      if (Array.isArray(d) && d.length) setCategoryNames(d.map((c) => c.name))
    }).catch(() => {})
  }, [])

  useEffect(() => {
    if (categoryFilter) setSelectedCategory(categoryFilter)
  }, [categoryFilter])

  useEffect(() => {
    setLoading(true)
    const endpoint =
      selectedCategory === 'all' ? '/api/products' : `/api/products?category=${encodeURIComponent(selectedCategory)}`
    api
      .get(endpoint)
      .then((data) => {
        const demo = demoByCategory(selectedCategory)
        setProducts(Array.isArray(data) && data.length > 0 ? data : demo)
      })
      .catch(() => setProducts(demoByCategory(selectedCategory)))
      .finally(() => setLoading(false))
  }, [selectedCategory])

  const heroImages = useMemo(() => {
    const fromProducts = products.map((p) => p.images?.[0]).filter((x): x is string => !!x)
    const fromDemo = demoProducts.map((p) => p.images?.[0]).filter((x): x is string => !!x)
    const merged = Array.from(new Set([...fromProducts, ...fromDemo]))
    return merged.slice(0, 8)
  }, [products])

  useEffect(() => {
    setHeroIndex(0)
  }, [selectedCategory, heroImages.length])

  useEffect(() => {
    if (prefersReduced || heroImages.length < 2) return
    const t = setInterval(() => setHeroIndex((i) => (i + 1) % heroImages.length), 4500)
    return () => clearInterval(t)
  }, [prefersReduced, heroImages.length])

  return (
    <div className="bg-primary">
      <section className="relative h-[42vh] min-h-[280px] max-h-[420px] flex items-center justify-center overflow-hidden border-b border-gold/20">
        <div className="absolute inset-0">
          <AnimatePresence initial={false} mode="sync">
            {heroImages[heroIndex] ? (
              <motion.div
                key={heroImages[heroIndex]}
                initial={prefersReduced ? false : { opacity: 0, scale: 1.08, x: 28 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 1.04, x: -28 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image src={heroImages[heroIndex]} alt="" fill priority={heroIndex === 0} sizes="100vw" className="object-cover object-center" />
              </motion.div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-primary" />
            )}
          </AnimatePresence>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/55 to-primary/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.08),transparent_55%)]" />
        <div className="relative z-10 text-center px-4">
          <p className="font-cinzel text-xs tracking-widest uppercase text-gold mb-3">GOD&apos;S OWN STORE</p>
          <h1 className="font-cormorant text-4xl md:text-6xl text-textPrimary mb-2">Our Collection</h1>
          <p className="font-cinzel text-[11px] tracking-widest uppercase text-textSecondary">
            {selectedCategory === 'all' ? 'All Pieces' : selectedCategory}
          </p>
        </div>
      </section>

      <div className="py-16 px-4 max-w-7xl mx-auto">
        <SectionHeading title="Shop" subtitle={selectedCategory === 'all' ? 'All Pieces' : selectedCategory} />

        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`font-cinzel text-xs tracking-widest uppercase px-6 py-2 border transition-colors ${selectedCategory === 'all' ? 'bg-gold text-buttonText border-gold' : 'border-gold/20 text-textSecondary hover:border-gold/50'}`}
          >
            All
          </button>
          {categoryNames.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`font-cinzel text-xs tracking-widest uppercase px-6 py-2 border transition-colors ${selectedCategory === cat ? 'bg-gold text-buttonText border-gold' : 'border-gold/20 text-textSecondary hover:border-gold/50'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-textSecondary">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-center text-textSecondary">No products found in this category yet.</div>
        ) : (
          <motion.div
            variants={prefersReduced ? {} : staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-textSecondary">Loading...</div>}>
      <ShopContent />
    </Suspense>
  )
}
