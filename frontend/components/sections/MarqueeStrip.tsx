'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const messages = [
  'Welcome to GODS OWN STORE',
  'Dealer in All Kind of Jewelries',
  '📞 07032835379 / 08163126896',
  '📍 1, Obanikoro Street, Lagos Island',
  'Jewelry · Xuping · Stainless Steel · Customised Jewelry',
]

export default function MarqueeStrip() {
  const prefersReduced = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (prefersReduced) return
    const t = setInterval(() => setIndex((i) => (i + 1) % messages.length), 2500)
    return () => clearInterval(t)
  }, [prefersReduced])

  return (
    <div className="bg-gold/10 border-y border-gold/20 py-2 overflow-hidden">
      <div className="relative h-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={prefersReduced ? false : { y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { y: '-100%', opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute text-center px-4 font-cinzel text-[11px] tracking-widest uppercase text-gold"
          >
            {messages[index]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
