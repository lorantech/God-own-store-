'use client'

import { useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { FaTimes, FaWhatsapp } from 'react-icons/fa'
import { formatPrice } from '@/lib/utils'
import CartItem from './CartItem'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { slideInRight } from '@/lib/animations'

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, total, clearCart } = useCart()
  const prefersReduced = useReducedMotion()
  const totalMotion = useMotionValue(total)
  const totalSpring = useSpring(totalMotion, { stiffness: 120, damping: 20 })
  const totalDisplay = useTransform(totalSpring, (v: number) => formatPrice(Math.round(v)))

  useEffect(() => {
    totalMotion.set(total)
  }, [total, totalMotion])

  const handleCheckout = () => {
    const message = items.map((item) => `${item.product.name} x${item.quantity}`).join('%0A')
    const totalMsg = `%0A%0ATotal: ${formatPrice(total)}`
    window.open(
      `https://wa.me/2347032835379?text=${encodeURIComponent(`Order from GODS OWN STORE:%0A%0A${message}${totalMsg}`)}`,
      '_blank'
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={() => setIsOpen(false)}
          />
          <motion.aside
            variants={prefersReduced ? {} : slideInRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 h-full w-full max-w-md bg-secondary border-l border-gold/20 z-50 flex flex-col"
          >
            <div className="p-6 border-b border-gold/20 flex items-center justify-between">
              <h2 className="font-cormorant text-2xl text-textPrimary">Shopping Cart</h2>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="text-textPrimary hover:text-gold"
                whileHover={prefersReduced ? {} : { rotate: 90 }}
                transition={{ duration: 0.2 }}
                aria-label="Close cart"
              >
                <FaTimes size={24} />
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <p className="text-textSecondary text-center mt-8">Your cart is empty</p>
              ) : (
                <motion.div
                  className="space-y-4"
                  variants={prefersReduced ? {} : { visible: { transition: { staggerChildren: 0.06 } } }}
                  initial="hidden"
                  animate="visible"
                >
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <CartItem key={item.product._id} item={item} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-gold/20">
                <div className="flex justify-between mb-4">
                  <span className="font-cinzel text-xs tracking-widest uppercase text-textSecondary">Total</span>
                  <motion.span className="text-textPrimary text-xl">{totalDisplay}</motion.span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="relative overflow-hidden w-full bg-[#25D366] text-white py-3 font-cinzel text-xs tracking-widest uppercase hover:bg-[#20BA5A] transition-colors flex items-center justify-center gap-2"
                >
                  <FaWhatsapp size={18} />
                  Checkout via WhatsApp
                </button>
                <button onClick={clearCart} className="w-full mt-2 text-textSecondary text-sm hover:text-gold transition-colors">
                  Clear Cart
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
