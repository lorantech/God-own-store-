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

function anchorStyle(anchor?: { top: number; left: number; width: number; height: number } | null) {
  if (typeof window === 'undefined' || !anchor) return null
  const pad = 8
  const minW = 260
  const maxW = 360
  const width = Math.min(maxW, Math.max(minW, Math.min(anchor.width - pad * 2, window.innerWidth - pad * 2)))
  let left = anchor.left + (anchor.width - width) / 2
  left = Math.max(pad, Math.min(left, window.innerWidth - width - pad))
  const maxH = Math.max(220, Math.min(anchor.height - pad * 2, window.innerHeight - pad * 2))
  let top = anchor.top + pad
  if (top + maxH > window.innerHeight - pad) top = Math.max(pad, window.innerHeight - maxH - pad)
  if (top < anchor.top) top = anchor.top + pad
  return { top, left, width, maxHeight: maxH }
}

export default function VariantPickerModal() {
  const { variantPicker, closeVariantPicker } = useShopUI()
  const { addToCart } = useCart()
  const prefersReduced = useReducedMotion()
  const [variants, setVariants] = useState<Product[]>([])
  const [selectedId, setSelectedId] = useState<string>('')
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(false)
  const [vp, setVp] = useState({ w: 0, h: 0 })

  const product = variantPicker?.product
  const open = !!variantPicker
  const anchored = anchorStyle(variantPicker?.anchor)

  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight })
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

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
  const compact = !!anchored

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
            className="fixed inset-0 bg-black/45 z-[70]"
            onClick={closeVariantPicker}
          />
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={anchored ? { top: anchored.top, left: anchored.left, width: anchored.width, maxHeight: anchored.maxHeight } : undefined}
            className={
              anchored
                ? 'fixed z-[71] bg-[#F8F4EC] text-[#1A1A1A] border border-[#C9A84C]/30 shadow-[0_14px_40px_rgba(0,0,0,0.35)] rounded-xl overflow-hidden flex flex-col'
                : 'fixed z-[71] left-1/2 -translate-x-1/2 bottom-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 w-full md:w-[min(560px,calc(100%-2rem))] bg-[#F8F4EC] text-[#1A1A1A] border border-[#C9A84C]/25 shadow-[0_20px_60px_rgba(0,0,0,0.35)] rounded-t-2xl md:rounded-2xl max-h-[88vh] overflow-hidden'
            }
            role="dialog"
            aria-modal="true"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className={`flex items-start justify-between gap-2 border-b border-[#C9A84C]/15 shrink-0 ${compact ? 'px-3 py-2' : 'px-5 py-4 gap-4'}`}>
              <div className="min-w-0">
                <p className={`font-cinzel tracking-[0.22em] uppercase text-[#8B6914] ${compact ? 'text-[8px]' : 'text-[10px]'}`}>Select Options</p>
                <h3 className={`font-cormorant text-[#1A1A1A] truncate ${compact ? 'text-base leading-tight' : 'text-2xl'}`}>{product.name.replace(/\s*\([^)]*\)\s*$/, '')}</h3>
              </div>
              <button onClick={closeVariantPicker} className="text-[#6B6254] hover:text-[#8B6914] p-1 shrink-0" aria-label="Close">
                <FaTimes size={compact ? 13 : 16} />
              </button>
            </div>

            <div className={`${compact ? 'p-2.5' : 'p-5'} overflow-y-auto min-h-0`}>
              {hasRealVariants ? (
                <>
                  <div className={`grid gap-2 mb-3 overflow-y-auto pr-0.5 ${compact ? 'grid-cols-3 max-h-[180px]' : 'grid-cols-2 mb-5 max-h-[320px] pr-1 gap-3'}`}>
                    {variants.map((v) => {
                      const active = v._id === selectedId
                      return (
                        <button
                          key={v._id}
                          type="button"
                          onClick={() => setSelectedId(v._id)}
                          className={`text-left border rounded-lg overflow-hidden transition-all ${active ? 'border-[#C9A84C] ring-1 ring-[#C9A84C]/40 bg-white shadow-sm' : 'border-[#D8CDB8] bg-white/70 hover:border-[#C9A84C]/70 hover:bg-white'}`}
                        >
                          <div className="relative aspect-square bg-[#EFE7D8]">
                            {v.images?.[0] ? (
                              <Image src={v.images[0]} alt={v.color || v.name} fill className="object-cover" sizes={compact ? '90px' : '220px'} />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center font-cormorant text-xl text-[#C9A84C]">GO</div>
                            )}
                          </div>
                          <div className={compact ? 'px-1.5 py-1' : 'px-3 py-2.5'}>
                            <p className={`font-jost truncate ${compact ? 'text-[10px] leading-tight' : 'text-sm'} ${active ? 'text-[#1A1A1A]' : 'text-[#3D372F]'}`}>{v.color || 'Variant'}</p>
                            {!compact && <p className="font-jost text-xs text-[#8B6914] mt-0.5">{formatPrice(v.discountPrice ?? v.price)}</p>}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                  {loading && !compact && <p className="text-xs text-[#8B6914]/80 mb-3 font-jost">Checking available variants…</p>}
                </>
              ) : (
                <div className={`flex items-center mb-3 bg-white/70 border border-[#D8CDB8] rounded-lg ${compact ? 'gap-2 p-2' : 'gap-4 mb-5 p-3 rounded-xl'}`}>
                  <div className={`relative rounded-lg overflow-hidden bg-[#EFE7D8] shrink-0 ${compact ? 'w-12 h-12' : 'w-20 h-20'}`}>
                    {product.images?.[0] ? <Image src={product.images[0]} alt={product.name} fill className="object-cover" /> : null}
                  </div>
                  <div className="min-w-0">
                    <p className={`font-cormorant truncate ${compact ? 'text-sm' : 'text-xl'}`}>{product.name}</p>
                    {!compact && <p className="font-jost text-sm text-[#6B6254]">No colour variants available.</p>}
                  </div>
                </div>
              )}

              <div className={`flex items-center justify-between gap-2 ${compact ? 'mb-2' : 'gap-4 mb-4'}`}>
                <div>
                  {!compact && <p className="font-cinzel text-[10px] tracking-[0.18em] uppercase text-[#8B6914]">Price</p>}
                  <p className={`font-cormorant text-[#1A1A1A] ${compact ? 'text-lg leading-none' : 'text-3xl'}`}>{formatPrice(price)}</p>
                </div>
                <div className="flex items-center border border-[#C9A84C]/30 rounded-md bg-white shrink-0">
                  <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className={`text-[#6B6254] hover:text-[#8B6914] ${compact ? 'px-2 py-1' : 'px-3 py-2'}`} aria-label="Decrease quantity"><FaMinus size={compact ? 9 : 11} /></button>
                  <span className={`font-jost text-center ${compact ? 'px-1 text-xs min-w-[1.25rem]' : 'px-3 text-sm min-w-[2rem]'}`}>{qty}</span>
                  <button type="button" onClick={() => setQty((q) => Math.min(99, q + 1))} className={`text-[#6B6254] hover:text-[#8B6914] ${compact ? 'px-2 py-1' : 'px-3 py-2'}`} aria-label="Increase quantity"><FaPlus size={compact ? 9 : 11} /></button>
                </div>
              </div>

              <button
                type="button"
                onClick={add}
                className={`w-full bg-[#C9A84C] hover:bg-[#D4B85A] text-[#1A1A1A] font-cinzel uppercase rounded-lg transition-colors ${compact ? 'text-[9px] tracking-[0.16em] py-2' : 'text-xs tracking-[0.22em] py-3.5'}`}
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