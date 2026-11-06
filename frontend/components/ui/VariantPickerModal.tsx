'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { Product } from '@/types'
import { api } from '@/lib/api'
import { formatPrice } from '@/lib/utils'
import { demoProducts } from '@/lib/categoryCatalog'
import { useCart } from '@/context/CartContext'
import { useShopUI } from '@/context/ShopUIContext'

function normalizeGroup(p: Product) {
  return p.variantGroup || `${p.category}::${p.name.replace(/\s*\([^)]*\)\s*$/, '').trim()}`
}

function localVariants(product: Product) {
  const group = normalizeGroup(product)
  return demoProducts.filter((x) => x.category === product.category && normalizeGroup(x) === group)
}

export default function VariantPickerModal() {
  const { variantPicker, closeVariantPicker } = useShopUI()
  const { addToCart } = useCart()
  const prefersReduced = useReducedMotion()
  const [variants, setVariants] = useState<Product[]>([])
  const [selectedId, setSelectedId] = useState<string>('')
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(false)

  const product = variantPicker?.product
  const open = !!variantPicker

  useEffect(() => {
    if (!open || !product) return
    let alive = true
    setQty(1)
    setSelectedId(product._id)

    const seed = variantPicker.variants?.length ? variantPicker.variants : [product]
    const local = localVariants(product)
    setVariants(local.length > 1 ? local : seed)

    const load = async () => {
      if (product._id.startsWith('demo-')) return
      setLoading(true)
      try {
        const group = product.variantGroup || ''
        const qs = new URLSearchParams({ category: product.category })
        if (group) qs.set('group', group)
        const data = await api.get(`/api/products?${qs.toString()}`)
        if (!alive) return
        if (Array.isArray(data) && data.length) {
          const scoped = group ? data : data.filter((x: Product) => normalizeGroup(x) === normalizeGroup(product))
          if (scoped.length) setVariants(scoped)
        }
      } catch {
        // keep local/seed variants
      } finally {
        if (alive) setLoading(false)
      }
    }
    load()
    return () => {
      alive = false
    }
  }, [open, product?._id])

  const selected = useMemo(() => variants.find((v) => v._id === selectedId) || variants[0] || product, [variants, selectedId, product])
  const price = selected ? (selected.discountPrice ?? selected.price) : 0
  const hasRealVariants = variants.length > 1

  const add = () => {
    if (!selected) return
    addToCart(selected, qty)
    toast.success(`${selected.color || selected.name} added to cart`)
    closeVariantPicker()
  }

  return (
    <AnimatePresence>
      {open && product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/65 z-[70]"
            onClick={closeVariantPicker}
          />
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.985 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[71] left-1/2 -translate-x-1/2 bottom-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 w-full md:w-[min(560px,calc(100%-2rem))] bg-[#F8F4EC] text-[#1A1A1A] border border-[#C9A84C]/25 shadow-[0_20px_60px_rgba(0,0,0,0.35)] rounded-t-2xl md:rounded-2xl max-h-[88vh] overflow-hidden"
            role="dialog"
            aria-modal="true"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-[#C9A84C]/15">
              <div className="min-w-0">
                <p className="font-cinzel text-[10px] tracking-[0.22em] uppercase text-[#8B6914]">Select Options</p>
                <h3 className="font-cormorant text-2xl text-[#1A1A1A] truncate">{product.name.replace(/\s*\([^)]*\)\s*$/, '')}</h3>
              </div>
              <button onClick={closeVariantPicker} className="text-[#6B6254] hover:text-[#8B6914] p-1" aria-label="Close">
                <FaTimes size={16} />
              </button>
            </div>

            <div className="p-5 overflow-y-auto max-h-[calc(88vh-150px)]">
              {hasRealVariants ? (
                <>
                  <div className="grid grid-cols-2 gap-3 mb-5 max-h-[320px] overflow-y-auto pr-1">
                    {variants.map((v) => {
                      const active = v._id === selectedId
                      return (
                        <button
                          key={v._id}
                          type="button"
                          onClick={() => setSelectedId(v._id)}
                          className={`text-left border rounded-xl overflow-hidden transition-all ${active ? 'border-[#C9A84C] ring-1 ring-[#C9A84C]/40 bg-white shadow-sm' : 'border-[#D8CDB8] bg-white/70 hover:border-[#C9A84C]/70 hover:bg-white'}`}
                        >
                          <div className="relative aspect-square bg-[#EFE7D8]">
                            {v.images?.[0] ? (
                              <Image src={v.images[0]} alt={v.color || v.name} fill className="object-cover" sizes="220px" />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center font-cormorant text-3xl text-[#C9A84C]">GO</div>
                            )}
                          </div>
                          <div className="px-3 py-2.5">
                            <p className={`font-jost text-sm ${active ? 'text-[#1A1A1A]' : 'text-[#3D372F]'}`}>{v.color || 'Variant'}</p>
                            <p className="font-jost text-xs text-[#8B6914] mt-0.5">{formatPrice(v.discountPrice ?? v.price)}</p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                  {loading && <p className="text-xs text-[#8B6914]/80 mb-3 font-jost">Checking available variants…</p>}
                </>
              ) : (
                <div className="flex gap-4 items-center mb-5 bg-white/70 border border-[#D8CDB8] rounded-xl p-3">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#EFE7D8] shrink-0">
                    {product.images?.[0] ? <Image src={product.images[0]} alt={product.name} fill className="object-cover" /> : null}
                  </div>
                  <div>
                    <p className="font-cormorant text-xl">{product.name}</p>
                    <p className="font-jost text-sm text-[#6B6254]">No colour variants available.</p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <p className="font-cinzel text-[10px] tracking-[0.18em] uppercase text-[#8B6914]">Price</p>
                  <p className="font-cormorant text-3xl text-[#1A1A1A]">{formatPrice(price)}</p>
                </div>
                <div className="flex items-center border border-[#C9A84C]/30 rounded-lg bg-white">
                  <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 text-[#6B6254] hover:text-[#8B6914]" aria-label="Decrease quantity"><FaMinus size={11} /></button>
                  <span className="px-3 font-jost text-sm min-w-[2rem] text-center">{qty}</span>
                  <button type="button" onClick={() => setQty((q) => Math.min(99, q + 1))} className="px-3 py-2 text-[#6B6254] hover:text-[#8B6914]" aria-label="Increase quantity"><FaPlus size={11} /></button>
                </div>
              </div>

              <button
                type="button"
                onClick={add}
                className="w-full bg-[#C9A84C] hover:bg-[#D4B85A] text-[#1A1A1A] font-cinzel text-xs tracking-[0.22em] uppercase py-3.5 rounded-lg transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}