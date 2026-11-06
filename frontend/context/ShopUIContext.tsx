'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Product } from '@/types'

type VariantAnchor = { top: number; left: number; width: number; height: number }

type ShopUIContextType = {
  wishlist: Product[]
  toggleWishlist: (p: Product) => void
  isWishlisted: (id: string) => boolean
  compare: Product[]
  toggleCompare: (p: Product) => void
  isCompared: (id: string) => boolean
  clearCompare: () => void
  quickView: Product | null
  openQuickView: (p: Product) => void
  closeQuickView: () => void
  variantPicker: { product: Product; variants: Product[]; anchor?: VariantAnchor | null } | null
  openVariantPicker: (product: Product, variants: Product[], anchor?: VariantAnchor | null) => void
  closeVariantPicker: () => void
}

const ShopUIContext = createContext<ShopUIContextType | undefined>(undefined)

const read = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function ShopUIProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([])
  const [compare, setCompare] = useState<Product[]>([])
  const [quickView, setQuickView] = useState<Product | null>(null)
  const [variantPicker, setVariantPicker] = useState<{ product: Product; variants: Product[]; anchor?: VariantAnchor | null } | null>(null)

  useEffect(() => {
    setWishlist(read<Product[]>('gos_wishlist', []))
    setCompare(read<Product[]>('gos_compare', []))
  }, [])

  useEffect(() => {
    localStorage.setItem('gos_wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    localStorage.setItem('gos_compare', JSON.stringify(compare))
  }, [compare])

  const toggleWishlist = (p: Product) => {
    setWishlist((prev) => (prev.some((x) => x._id === p._id) ? prev.filter((x) => x._id !== p._id) : [...prev, p]))
  }
  const isWishlisted = (id: string) => wishlist.some((x) => x._id === id)
  const toggleCompare = (p: Product) => {
    setCompare((prev) => {
      if (prev.some((x) => x._id === p._id)) return prev.filter((x) => x._id !== p._id)
      if (prev.length >= 3) return [...prev.slice(1), p]
      return [...prev, p]
    })
  }
  const isCompared = (id: string) => compare.some((x) => x._id === id)

  const value = useMemo(
    () => ({
      wishlist,
      toggleWishlist,
      isWishlisted,
      compare,
      toggleCompare,
      isCompared,
      clearCompare: () => setCompare([]),
      quickView,
      openQuickView: setQuickView,
      closeQuickView: () => setQuickView(null),
      variantPicker,
      openVariantPicker: (product: Product, variants: Product[], anchor?: VariantAnchor | null) => setVariantPicker({ product, variants, anchor: anchor || null }),
      closeVariantPicker: () => setVariantPicker(null),
    }),
    [wishlist, compare, quickView, variantPicker]
  )

  return <ShopUIContext.Provider value={value}>{children}</ShopUIContext.Provider>
}

export function useShopUI() {
  const ctx = useContext(ShopUIContext)
  if (!ctx) throw new Error('useShopUI must be used within ShopUIProvider')
  return ctx
}
