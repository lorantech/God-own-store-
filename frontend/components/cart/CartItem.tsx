'use client'

import Image from 'next/image'
import { FaTrash } from 'react-icons/fa'
import { CartItem as CartItemType } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/context/CartContext'
import { motion, useReducedMotion } from 'framer-motion'

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      layout
      initial={prefersReduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={prefersReduced ? { opacity: 0 } : { opacity: 0, x: -30 }}
      className="flex gap-4 pb-4 border-b border-gold/20"
    >
      <div className="relative w-20 h-20 flex-shrink-0">
        {item.product.images[0] ? (
          <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-secondary flex items-center justify-center">
            <span className="text-gold text-sm font-cormorant">GO</span>
          </div>
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-cormorant text-textPrimary mb-1">{item.product.name}</h3>
        <p className="text-gold text-sm mb-2">{formatPrice(item.product.price)}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={prefersReduced ? {} : { scale: 0.85 }}
              onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
              className="w-6 h-6 bg-surface border border-gold/20 text-textPrimary"
            >
              -
            </motion.button>
            <span className="text-textPrimary w-8 text-center">{item.quantity}</span>
            <motion.button
              whileTap={prefersReduced ? {} : { scale: 0.85 }}
              onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
              className="w-6 h-6 bg-surface border border-gold/20 text-textPrimary"
            >
              +
            </motion.button>
          </div>
          <motion.button
            whileHover={prefersReduced ? {} : { scale: 1.1 }}
            onClick={() => removeFromCart(item.product._id)}
            className="text-textSecondary hover:text-red-400 transition-colors"
            aria-label="Remove item"
          >
            <FaTrash size={14} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
