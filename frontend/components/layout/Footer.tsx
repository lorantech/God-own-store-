'use client'

import Link from 'next/link'
import { FaWhatsapp, FaTiktok, FaPhone } from 'react-icons/fa'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'

export default function Footer() {
  const prefersReduced = useReducedMotion()
  const col = (delay: number) => (prefersReduced ? {} : { ...fadeUp, visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay } } })
  return (
    <footer className="bg-footer border-t border-gold/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={col(0)}>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                <span className="text-buttonText font-cormorant text-xl font-semibold">GO</span>
              </div>
              <div className="ml-3">
                <h3 className="font-cormorant text-xl text-textPrimary">GODS OWN STORE</h3>
              </div>
            </div>
            <p className="font-cinzel text-[10px] tracking-widest uppercase text-gold mb-4">
              Dealer in All Kind of Jewelries
            </p>
            <p className="text-textSecondary text-sm">Jewelry • Xuping • Stainless Steel • Customised Jewelry</p>
          </motion.div>

          <motion.div variants={col(0.1)}>
            <h4 className="font-cinzel text-xs tracking-widest uppercase text-gold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/shop" className="text-textSecondary hover:text-gold transition-colors duration-300">Shop</Link></li>
                <li><Link href="/testimonials" className="text-textSecondary hover:text-gold transition-colors duration-300">Testimonials</Link></li>
                <li><Link href="/ceo-corner" className="text-textSecondary hover:text-gold transition-colors duration-300">CEO Corner</Link></li>
                <li><Link href="/about" className="text-textSecondary hover:text-gold transition-colors duration-300">About Us</Link></li>
                <li><Link href="/contact" className="text-textSecondary hover:text-gold transition-colors duration-300">Contact</Link></li>
              </ul>
          </motion.div>

          <motion.div variants={col(0.2)}>
            <h4 className="font-cinzel text-xs tracking-widest uppercase text-gold mb-4">Contact</h4>
            <div className="space-y-3">
              <p className="text-textSecondary text-sm">1, Obanikoro Street, Lagos Island</p>
              <a href="https://wa.me/2347032835379" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-textSecondary hover:text-gold transition-colors duration-300">
                <FaWhatsapp className="transition-transform duration-300 group-hover:scale-110" /> 07032835379
              </a>
              <a href="tel:07032835379" className="group flex items-center gap-2 text-textSecondary hover:text-gold transition-colors duration-300">
                <FaPhone className="transition-transform duration-300 group-hover:scale-110" /> 07032835379 / 08163126896
              </a>
              <a href="https://www.tiktok.com/@gods_own_store2" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-textSecondary hover:text-gold transition-colors duration-300">
                <FaTiktok className="transition-transform duration-300 group-hover:scale-110" /> @gods_own_store2
              </a>
            </div>
          </motion.div>
        </motion.div>
        <div className="border-t border-gold/20 mt-8 pt-8 text-center">
          <p className="text-textSecondary text-sm">&copy; 2026 GODS OWN STORE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
