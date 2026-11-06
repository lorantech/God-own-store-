'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FaHeart, FaTimes } from 'react-icons/fa'
import { FiShuffle } from 'react-icons/fi'
import { useShopUI } from '@/context/ShopUIContext'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function QuickViewModal() {
  const { quickView, closeQuickView, toggleWishlist, isWishlisted, toggleCompare, isCompared } = useShopUI()
  const { addToCart } = useCart()
  const prefersReduced = useReducedMotion()
  const p = quickView

  return (
    <AnimatePresence>
      {p && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-[60]"
            onClick={closeQuickView}
          />
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed left-1/2 top-1/2 z-[61] w-[min(960px,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 bg-surface border border-gold/20 max-h-[90vh] overflow-auto"
            role="dialog"
            aria-modal="true"
          >
            <button onClick={closeQuickView} className="absolute right-4 top-4 text-textSecondary hover:text-gold z-10" aria-label="Close quick view">
              <FaTimes size={18} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative min-h-[320px] bg-secondary">
                {p.images?.[0] ? (
                  <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full min-h-[320px] flex items-center justify-center text-gold font-cormorant text-5xl">GO</div>
                )}
              </div>
              <div className="p-6 md:p-8">
                <p className="font-cinzel text-[10px] tracking-widest uppercase text-gold mb-2">{p.category}</p>
                <h3 className="font-cormorant text-3xl text-textPrimary mb-3">{p.name}</h3>
                {p.color && <p className="font-jost text-sm text-textSecondary mb-2">Color: {p.color}</p>}
                <p className="font-jost text-gold text-xl mb-4">{formatPrice(p.price)}</p>
                <p className="text-textSecondary text-sm leading-relaxed mb-6 line-clamp-5">{p.description}</p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <button
                    onClick={() => { addToCart(p); toast.success('Added to cart') }}
                    className="bg-gold text-buttonText px-6 py-3 font-cinzel text-xs tracking-widest uppercase hover:bg-gold-light transition-colors"
                  >
                    Add to Cart
                  </button>
                  <Link href={`/product/${p._id}`} onClick={closeQuickView} className="border border-gold/40 text-textPrimary px-6 py-3 font-cinzel text-xs tracking-widest uppercase hover:border-gold hover:text-gold transition-colors">
                    View Details
                  </Link>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <button
                    onClick={() => { toggleWishlist(p); toast.success(isWishlisted(p._id) ? 'Removed from wishlist' : 'Added to wishlist') }}
                    className={`inline-flex items-center gap-2 ${isWishlisted(p._id) ? 'text-gold' : 'text-textSecondary hover:text-gold'} transition-colors`}
                  >
                    <FaHeart /> Wishlist
                  </button>
                  <button
                    onClick={() => { toggleCompare(p); toast.success(isCompared(p._id) ? 'Removed from compare' : 'Added to compare') }}
                    className={`inline-flex items-center gap-2 ${isCompared(p._id) ? 'text-gold' : 'text-textSecondary hover:text-gold'} transition-colors`}
                  >
                    <FiShuffle /> Compare
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
