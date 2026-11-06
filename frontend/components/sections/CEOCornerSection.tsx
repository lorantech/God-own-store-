'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CEOCorner } from '@/types'
import { api } from '@/lib/api'
import { FaQuoteLeft } from 'react-icons/fa'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, imageReveal } from '@/lib/animations'
import GoldButton from '@/components/ui/GoldButton'

export default function CEOCornerSection() {
  const [ceoCorner, setCEOCorner] = useState<CEOCorner | null>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    api.get('/api/ceo-corner').then(setCEOCorner).catch(() => {})
  }, [])

  if (!ceoCorner) return null
  const name = ceoCorner.fullName || ceoCorner.title
  const excerpt = (ceoCorner.introduction || ceoCorner.content || '').slice(0, 220)

  return (
    <section className="py-20 px-4 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={prefersReduced ? {} : { visible: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {ceoCorner.image && (
            <motion.div variants={prefersReduced ? {} : imageReveal} className="relative h-[400px] overflow-hidden">
              <Image src={ceoCorner.image} alt={name} fill className="object-cover" />
            </motion.div>
          )}
          <motion.div variants={prefersReduced ? {} : fadeUp}>
            <p className="font-cinzel text-xs tracking-widest uppercase text-gold mb-4">CEO Corner</p>
            <h2 className="font-cormorant text-4xl text-textPrimary mb-2">{name}</h2>
            {ceoCorner.position && <p className="font-cinzel text-[10px] tracking-widest uppercase text-textSecondary mb-6">{ceoCorner.position}</p>}
            {(ceoCorner.welcomeMessage || ceoCorner.quote) && (
              <div className="flex gap-4 mb-6">
                <FaQuoteLeft className="text-gold text-2xl flex-shrink-0" />
                <p className="font-cormorant text-xl italic text-gold">{ceoCorner.welcomeMessage || ceoCorner.quote}</p>
              </div>
            )}
            <p className="text-textSecondary leading-relaxed mb-8">{excerpt}{excerpt.length >= 220 ? '…' : ''}</p>
            <GoldButton href="/ceo-corner">Meet Our CEO</GoldButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
