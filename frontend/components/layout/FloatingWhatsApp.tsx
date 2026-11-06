'use client'

import { FaWhatsapp, FaTiktok } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      <motion.a
        href="https://www.tiktok.com/@gods_own_store2"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-surface border border-gold/30 text-textPrimary p-3 rounded-full shadow-lg hover:border-gold hover:text-gold transition-colors duration-300"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.1 }}
        aria-label="TikTok"
        title="TikTok @gods_own_store2"
      >
        <FaTiktok size={22} />
      </motion.a>
      <motion.a
        href="https://wa.me/2347032835379"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={28} />
      </motion.a>
    </div>
  )
}
