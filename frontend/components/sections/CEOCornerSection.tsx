'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { CEOCorner } from '@/types';
import { api } from '@/lib/api';
import { FaQuoteLeft } from 'react-icons/fa';

export default function CEOCornerSection() {
  const [ceoCorner, setCEOCorner] = useState<CEOCorner | null>(null);

  useEffect(() => {
    api.get('/api/ceo-corner').then(setCEOCorner).catch(console.error);
  }, []);

  if (!ceoCorner) return null;

  return (
    <section className="py-20 px-4 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {ceoCorner.image && (
            <div className="relative h-[400px]">
              <Image
                src={ceoCorner.image}
                alt="CEO"
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            <p className="font-cinzel text-xs tracking-widest uppercase text-gold mb-4">CEO Corner</p>
            <h2 className="font-cormorant text-4xl text-textPrimary mb-6">{ceoCorner.title}</h2>
            {ceoCorner.quote && (
              <div className="flex gap-4 mb-6">
                <FaQuoteLeft className="text-gold text-2xl flex-shrink-0" />
                <p className="font-cormorant text-xl italic text-gold">{ceoCorner.quote}</p>
              </div>
            )}
            <p className="text-textSecondary leading-relaxed whitespace-pre-wrap">{ceoCorner.content}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
