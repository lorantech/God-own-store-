'use client';

import { motion } from 'framer-motion';
import GoldButton from '@/components/ui/GoldButton';

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-primary"></div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-cinzel text-xs tracking-widest uppercase text-gold mb-4"
        >
          Jewelry · Xuping · Stainless Steel · Customised Jewelry
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-cormorant text-5xl md:text-7xl text-textPrimary mb-6"
        >
          GODS OWN STORE
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-cinzel text-sm tracking-widest uppercase text-textSecondary mb-8"
        >
          Dealer in All Kind of Jewelries
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <GoldButton href="/shop">Explore Collection</GoldButton>
        </motion.div>
      </div>
    </section>
  );
}
