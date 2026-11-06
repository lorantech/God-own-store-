'use client'

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import GoldButton from '@/components/ui/GoldButton'
import { FaChevronDown } from 'react-icons/fa'

const heroImages = [
  '/hero-images/hero-background.jpeg',
  '/hero-images/hero background.png',
  '/hero-images/hero backgroundo.png',
  '/hero-images/logo.png',
]

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const [index, setIndex] = useState(0)
  const headline = 'GODS OWN STORE'.split(' ')

  useEffect(() => {
    if (prefersReduced || heroImages.length < 2) return
    const t = setInterval(() => setIndex((i) => (i + 1) % heroImages.length), 5200)
    return () => clearInterval(t)
  }, [prefersReduced])

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={prefersReduced ? {} : { y }} className="absolute inset-0">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={heroImages[index]}
            initial={prefersReduced ? false : { opacity: 0, scale: 1.08, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 1.03, x: -24 }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[index]}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-primary/75 via-primary/55 to-primary/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.08),transparent_55%)]" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-cinzel text-xs tracking-widest uppercase text-gold mb-4"
        >
          Jewelry • Xuping • Stainless Steel • Customised Jewelry
        </motion.p>
        <h1 className="font-cormorant text-5xl md:text-7xl text-textPrimary mb-6">
          {headline.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={prefersReduced ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-cinzel text-sm tracking-widest uppercase text-textSecondary mb-8"
        >
          Dealer in All Kind of Jewelries
        </motion.p>
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <GoldButton href="/shop" variant="hero">
            Explore Collection
          </GoldButton>
        </motion.div>
      </div>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex gap-2" aria-hidden>
        {heroImages.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-[2px] transition-all duration-500 ${i === index ? 'w-8 bg-gold' : 'w-4 bg-gold/35 hover:bg-gold/60'}`}
          />
        ))}
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-gold/70"
        animate={prefersReduced ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >
        <FaChevronDown size={18} />
      </motion.div>
    </section>
  )
}
