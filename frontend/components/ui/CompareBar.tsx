'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { FaTimes } from 'react-icons/fa'
import { useShopUI } from '@/context/ShopUIContext'
import { formatPrice } from '@/lib/utils'

export default function CompareBar() {
  const { compare, toggleCompare, clearCompare } = useShopUI()
  return (
    <AnimatePresence>
      {compare.length > 0 && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-primary/95 backdrop-blur-md border-t border-gold/20 px-4 py-3"
        >
          <div className="max-w-7xl mx-auto flex items-center gap-4 overflow-x-auto">
            <span className="font-cinzel text-[10px] tracking-widest uppercase text-gold shrink-0">Compare ({compare.length}/3)</span>
            {compare.map((p) => (
              <div key={p._id} className="flex items-center gap-2 bg-surface border border-gold/10 px-2 py-1 shrink-0">
                <div className="relative w-8 h-8 bg-secondary">
                  {p.images?.[0] && <Image src={p.images[0]} alt="" fill className="object-cover" />}
                </div>
                <div className="text-xs">
                  <div className="text-textPrimary font-cormorant truncate max-w-[120px]">{p.name}</div>
                  <div className="text-gold">{formatPrice(p.price)}</div>
                </div>
                <button onClick={() => toggleCompare(p)} className="text-textSecondary hover:text-gold" aria-label="Remove"><FaTimes size={12} /></button>
              </div>
            ))}
            <button onClick={clearCompare} className="ml-auto text-textSecondary hover:text-gold text-xs font-cinzel tracking-widest uppercase shrink-0">Clear</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
