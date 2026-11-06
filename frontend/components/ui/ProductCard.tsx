'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/context/CartContext'
import { useShopUI } from '@/context/ShopUIContext'
import { motion, useReducedMotion } from 'framer-motion'
import { scaleIn } from '@/lib/animations'
import toast from 'react-hot-toast'
import { FaEye, FaHeart } from 'react-icons/fa'
import { FiShuffle } from 'react-icons/fi'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { openQuickView, toggleWishlist, isWishlisted, toggleCompare, isCompared } = useShopUI()
  const prefersReduced = useReducedMotion()

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    toast.success('Added to cart')
  }
  const act = (e: React.MouseEvent, fn: () => void) => {
    e.preventDefault()
    e.stopPropagation()
    fn()
  }

  const wished = isWishlisted(product._id)
  const compared = isCompared(product._id)

  return (
    <motion.div
      variants={prefersReduced ? {} : scaleIn}
      whileHover={prefersReduced ? {} : { y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden bg-surface border border-gold/20"
    >
      <Link href={`/product/${product._id}`}>
        <div className="relative aspect-[3/4] overflow-hidden">
          {product.images[0] ? (
            <>
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-all duration-500 group-hover:opacity-0 group-hover:scale-105"
              />
              <Image
                src={product.images[1] || product.images[0]}
                alt={product.name}
                fill
                className={`object-cover absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100 ${product.images[1] ? 'scale-105 group-hover:scale-100' : 'scale-110 group-hover:scale-105'}`}
              />
            </>
          ) : (
            <div className="w-full h-full bg-secondary flex items-center justify-center">
              <span className="text-gold text-4xl font-cormorant">GO</span>
            </div>
          )}

          <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <button
              onClick={(e) => act(e, () => openQuickView(product))}
              className="w-9 h-9 bg-primary/90 border border-gold/20 text-textPrimary hover:text-gold hover:border-gold flex items-center justify-center transition-colors"
              aria-label="Quick view"
              title="Quick view"
            >
              <FaEye size={14} />
            </button>
            <button
              onClick={(e) => act(e, () => { toggleWishlist(product); toast.success(wished ? 'Removed from wishlist' : 'Added to wishlist') })}
              className={`w-9 h-9 bg-primary/90 border flex items-center justify-center transition-colors ${wished ? 'border-gold text-gold' : 'border-gold/20 text-textPrimary hover:text-gold hover:border-gold'}`}
              aria-label="Wishlist"
              title="Wishlist"
            >
              <FaHeart size={14} />
            </button>
            <button
              onClick={(e) => act(e, () => { toggleCompare(product); toast.success(compared ? 'Removed from compare' : 'Added to compare') })}
              className={`w-9 h-9 bg-primary/90 border flex items-center justify-center transition-colors ${compared ? 'border-gold text-gold' : 'border-gold/20 text-textPrimary hover:text-gold hover:border-gold'}`}
              aria-label="Compare"
              title="Compare"
            >
              <FiShuffle size={14} />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-primary/90 backdrop-blur-sm py-3 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleQuickAdd}
              className="text-gold text-xs tracking-[0.2em] uppercase font-jost hover:text-gold-light transition-colors"
            >
              Quick Add
            </button>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <p className="font-cinzel text-[10px] tracking-widest uppercase text-gold mb-2">{product.category}</p>
        <Link href={`/product/${product._id}`}>
          <h3 className="font-cormorant text-lg text-textPrimary mb-1 hover:text-gold transition-colors">{product.name}</h3>
        </Link>
        {product.color && <p className="font-jost text-xs text-textSecondary mb-1">Color: {product.color}</p>}
        <p className="font-jost text-gold text-sm">
          {formatPrice(product.discountPrice ?? product.price)}
          {product.discountPrice ? <span className="ml-2 text-textSecondary text-xs line-through">{formatPrice(product.price)}</span> : null}
        </p>
      </div>
    </motion.div>
  )
}
