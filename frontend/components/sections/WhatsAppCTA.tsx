'use client'

import { FaWhatsapp } from 'react-icons/fa'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'

export default function WhatsAppCTA() {
  const prefersReduced = useReducedMotion()
  return (
    <section className="py-20 px-4 bg-secondary">
      <motion.div
        variants={prefersReduced ? {} : fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="font-cormorant text-4xl md:text-5xl text-textPrimary mb-6">
          Have a Custom Design in Mind?
        </h2>
        <p className="text-textSecondary mb-8">We specialize in custom jewelry. Let us bring your vision to life.</p>
        <a
          href="https://wa.me/2347032835379"
          target="_blank"
          rel="noopener noreferrer"
          className="relative overflow-hidden inline-flex items-center gap-2 border border-[#25D366] text-[#25D366] px-8 py-3 font-cinzel text-xs tracking-widest uppercase transition-colors duration-300 hover:text-white group"
        >
          <span className="absolute inset-0 bg-[#25D366] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          <span className="relative z-10 inline-flex items-center gap-2">
            <FaWhatsapp size={18} />
            Chat on WhatsApp
          </span>
        </a>
      </motion.div>
    </section>
  )
}
