'use client';

import { FaWhatsapp } from 'react-icons/fa';
import GoldButton from '@/components/ui/GoldButton';

export default function WhatsAppCTA() {
  return (
    <section className="py-20 px-4 bg-secondary">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-cormorant text-4xl md:text-5xl text-textPrimary mb-6">
          Have a Custom Design in Mind?
        </h2>
        <p className="text-textSecondary mb-8">
          We specialize in custom jewelry. Let us bring your vision to life.
        </p>
        <a
          href="https://wa.me/2347032835379"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3 font-cinzel text-xs tracking-widest uppercase hover:bg-[#20BA5A] transition-colors"
        >
          <FaWhatsapp size={18} />
          Chat on WhatsApp
        </a>
      </div>
    </section>
  );
}
