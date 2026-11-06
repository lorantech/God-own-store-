'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Product } from '@/types'
import { api } from '@/lib/api'
import { formatPrice } from '@/lib/utils'
import GoldButton from '@/components/ui/GoldButton'
import { useCart } from '@/context/CartContext'
import { demoProducts } from '@/lib/categoryCatalog'
import { FaWhatsapp } from 'react-icons/fa'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { fadeUp, imageReveal } from '@/lib/animations'
import toast from 'react-hot-toast'

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [variants, setVariants] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addToCart } = useCart()
  const prefersReduced = useReducedMotion()
  const addRef = useRef<HTMLDivElement>(null)
  const addInView = useInView(addRef, { margin: '0px 0px -80px 0px' })

  useEffect(() => {
    if (!params.id) return
    let active = true
    const id = String(params.id)

    const apply = (p: Product, pool: Product[]) => {
      if (!active) return
      setProduct(p)
      const group = p.variantGroup || `${p.category}::${p.name.replace(/\s*\([^)]*\)\s*$/, '').trim()}`
      const same = pool.filter((x) => x.category === p.category && (x.variantGroup || `${x.category}::${x.name.replace(/\s*\([^)]*\)\s*$/, '').trim()}`) === group)
      setVariants(same.length ? same : [p])
      setSelectedImage(0)
    }

    const demo = demoProducts.find((p) => p._id === id)
    if (demo) {
      apply(demo, demoProducts)
      setLoading(false)
      return
    }

    api
      .get(`/api/products/${id}`)
      .then(async (p: Product) => {
        if (!p) {
          if (active) setProduct(null)
          return
        }
        let pool: Product[] = []
        try {
          const res = await api.get(`/api/products?category=${encodeURIComponent(p.category)}&group=${encodeURIComponent(p.variantGroup || '')}`)
          pool = Array.isArray(res) ? res : []
        } catch {
          pool = []
        }
        apply(p, pool.length ? pool : [p])
      })
      .catch(() => active && setProduct(null))
      .finally(() => active && setLoading(false))

    return () => {
      active = false
    }
  }, [params.id])

  const otherVariants = useMemo(() => variants.filter((v) => v._id !== product?._id), [variants, product?._id])

  if (loading) return <div className="py-20 text-center text-textSecondary">Loading...</div>
  if (!product) return <div className="py-20 text-center text-textSecondary">Product not found</div>

  const handleWhatsAppInquiry = () => {
    const message = encodeURIComponent(`Hi, I'm interested in ${product.name}${product.color ? ` (${product.color})` : ''} - ${formatPrice(product.price)}`)
    window.open(`https://wa.me/2347032835379?text=${message}`, '_blank')
  }

  const handleAdd = () => {
    addToCart(product)
    toast.success('Added to cart')
  }

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <motion.div
            variants={prefersReduced ? {} : imageReveal}
            initial="hidden"
            animate="visible"
            className="relative h-[500px] mb-4 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {product.images[selectedImage] ? (
                <motion.div
                  key={product.images[selectedImage]}
                  initial={prefersReduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={prefersReduced ? {} : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image src={product.images[selectedImage]} alt={product.name} fill className="object-cover" />
                </motion.div>
              ) : (
                <div className="w-full h-full bg-secondary flex items-center justify-center">
                  <span className="text-gold text-6xl font-cormorant">GO</span>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
          {product.images.length > 1 && (
            <div className="flex gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-20 border transition-all duration-300 ${selectedImage === idx ? 'border-gold scale-105' : 'border-gold/20 hover:border-gold/60'}`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <motion.div
          variants={prefersReduced ? {} : { visible: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={prefersReduced ? {} : fadeUp} className="font-cinzel text-xs tracking-widest uppercase text-gold mb-4">
            {product.category}
          </motion.p>
          <motion.h1 variants={prefersReduced ? {} : fadeUp} className="font-cormorant text-4xl md:text-5xl text-textPrimary mb-4">
            {product.name}
          </motion.h1>
          {product.color && (
            <motion.p variants={prefersReduced ? {} : fadeUp} className="font-jost text-sm text-textSecondary mb-2">
              Color: {product.color}
            </motion.p>
          )}
          <motion.p variants={prefersReduced ? {} : fadeUp} className="text-textPrimary text-2xl mb-6">
            {formatPrice(product.price)}
          </motion.p>
          <motion.div variants={prefersReduced ? {} : fadeUp} className="border-t border-gold/20 pt-6 mb-6">
            <p className="text-textSecondary leading-relaxed">{product.description}</p>
          </motion.div>
          {otherVariants.length > 0 && (
            <motion.div variants={prefersReduced ? {} : fadeUp} className="mt-8 border-t border-gold/20 pt-6">
              <p className="font-cinzel text-xs tracking-widest uppercase text-gold mb-4">Available Colors</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {otherVariants.map((v) => (
                  <Link
                    key={v._id}
                    href={`/product/${v._id}`}
                    className="group border border-gold/20 bg-secondary/40 hover:border-gold/60 transition-colors"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      {v.images[0] ? (
                        <Image
                          src={v.images[0]}
                          alt={v.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="160px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gold font-cormorant">GO</div>
                      )}
                    </div>
                    <div className="p-2">
                      <p className="text-[11px] font-cinzel tracking-wider uppercase text-textPrimary truncate">
                        {v.color || 'Variant'}
                      </p>
                      <p className="text-[11px] text-gold">{formatPrice(v.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div ref={addRef} variants={prefersReduced ? {} : fadeUp} className="space-y-4 mt-6">
            <GoldButton onClick={handleAdd} className="w-full md:w-auto">
              Add to Cart
            </GoldButton>
            <button
              onClick={handleWhatsAppInquiry}
              className="w-full md:w-auto md:ml-4 bg-[#25D366] text-white px-8 py-3 font-cinzel text-xs tracking-widest uppercase hover:bg-[#20BA5A] transition-colors inline-flex items-center justify-center gap-2"
            >
              <FaWhatsapp size={18} />
              Enquire via WhatsApp
            </button>
          </motion.div>
          <motion.p variants={prefersReduced ? {} : fadeUp} className="mt-6 text-textSecondary text-sm">
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </motion.p>
        </motion.div>
      </div>

      <AnimatePresence>
        {!addInView && (
          <motion.div
            initial={prefersReduced ? false : { y: '100%' }}
            animate={{ y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { y: '100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-primary/95 backdrop-blur-md border-t border-gold/20 px-4 py-3"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-cormorant text-textPrimary truncate">{product.name}</p>
                <p className="text-gold text-sm">{formatPrice(product.price)}</p>
              </div>
              <GoldButton onClick={handleAdd} className="shrink-0">
                Add to Cart
              </GoldButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
