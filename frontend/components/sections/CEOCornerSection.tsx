'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CEOCorner } from '@/types'
import { api } from '@/lib/api'
import { FaQuoteLeft } from 'react-icons/fa'
import { fadeUp } from '@/lib/animations'
import GoldButton from '@/components/ui/GoldButton'
import { temporaryCeoCorner } from '@/lib/temporaryContent'

export default function CEOCornerSection() {
  const [ceoCorner, setCEOCorner] = useState<CEOCorner>(temporaryCeoCorner)
  const [usingTemporary, setUsingTemporary] = useState(true)
  const [heroIndex, setHeroIndex] = useState(0)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    api
      .get('/api/ceo-corner')
      .then((data) => {
        if (data && data.title) {
          setCEOCorner(data)
          setUsingTemporary(false)
        }
      })
      .catch(() => {})
  }, [])

  const name = ceoCorner.fullName || ceoCorner.title
  const excerpt = (ceoCorner.introduction || ceoCorner.content || '').slice(0, 220)
  const heroSlides = [ceoCorner.image, '/hero-images/hero-background.jpeg', '/hero-images/hero background.png'].filter(
    (src): src is string => !!src
  )

  useEffect(() => {
    setHeroIndex(0)
  }, [ceoCorner.image])

  useEffect(() => {
    if (prefersReduced || heroSlides.length < 2) return
    const t = setInterval(() => setHeroIndex((i) => (i + 1) % heroSlides.length), 5200)
    return () => clearInterval(t)
  }, [prefersReduced, heroSlides.length])

  return (
    <section className="relative py-24 px-4 overflow-hidden border-y border-gold/20">
      <div className="absolute inset-0">
        <AnimatePresence initial={false} mode="sync">
          {heroSlides[heroIndex] ? (
            <motion.div
              key={heroSlides[heroIndex]}
              initial={prefersReduced ? false : { opacity: 0, scale: 1.06, x: 24 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 1.03, x: -24 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image src={heroSlides[heroIndex]} alt={name} fill sizes="100vw" className="object-cover object-center" />
            </motion.div>
          ) : (
            <div className="absolute inset-0 bg-secondary" />
          )}
        </AnimatePresence>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/92 via-primary/78 to-primary/88" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(201,168,76,0.08),transparent_55%)]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="max-w-3xl"
          variants={prefersReduced ? {} : { visible: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={prefersReduced ? {} : fadeUp}>
            <p className="font-cinzel text-xs tracking-widest uppercase text-gold mb-4">CEO Corner</p>
            {usingTemporary && <p className="font-cinzel text-[10px] tracking-widest uppercase text-gold/60 mb-4">Temporary content</p>}
            <h2 className="font-cormorant text-4xl md:text-5xl text-textPrimary mb-2">{name}</h2>
            {ceoCorner.position && <p className="font-cinzel text-[10px] tracking-widest uppercase text-textSecondary mb-6">{ceoCorner.position}</p>}
            {(ceoCorner.welcomeMessage || ceoCorner.quote) && (
              <div className="flex gap-4 mb-6">
                <FaQuoteLeft className="text-gold text-2xl flex-shrink-0" />
                <p className="font-cormorant text-xl italic text-gold">{ceoCorner.welcomeMessage || ceoCorner.quote}</p>
              </div>
            )}
            <p className="text-textSecondary leading-relaxed mb-8 bg-primary/30 border border-gold/10 p-5 backdrop-blur-[1px]">
              {excerpt}
              {excerpt.length >= 220 ? '…' : ''}
            </p>
            <GoldButton href="/ceo-corner">Meet Our CEO</GoldButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
