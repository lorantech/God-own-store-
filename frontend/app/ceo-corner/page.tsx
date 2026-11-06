'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/lib/api';
import { CEOCorner } from '@/types';
import { FaQuoteLeft } from 'react-icons/fa';
import GoldButton from '@/components/ui/GoldButton';
import { temporaryCeoCorner } from '@/lib/temporaryContent';

export default function CEOCornerPage() {
  const [data, setData] = useState<CEOCorner>(temporaryCeoCorner);
  const [loading, setLoading] = useState(true);
  const [usingTemporary, setUsingTemporary] = useState(true);

  useEffect(() => {
    api
      .get('/api/ceo-corner')
      .then((d) => {
        if (d && d.title) {
          setData(d);
          setUsingTemporary(false);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const name = data.fullName || data.title || "CEO, GOD'S OWN STORE";
  const message = data.personalMessage || data.quote || '';

  return (
    <div className="min-h-screen bg-primary">
      <section className="relative py-24 px-4 border-b border-gold/20 bg-gradient-to-b from-secondary to-primary">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-cinzel text-xs tracking-widest uppercase text-gold mb-4">Leadership</p>
          <h1 className="font-cormorant text-5xl md:text-6xl text-textPrimary mb-4">CEO Corner</h1>
          <p className="text-textSecondary">Meet the vision behind GOD&apos;s Own Store.</p>
          {usingTemporary && !loading && (
            <p className="font-cinzel text-[10px] tracking-widest uppercase text-gold/70 mt-6">
              Temporary content — admin-published CEO Corner content will replace this automatically
            </p>
          )}
        </div>
      </section>

      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="relative min-h-[420px] bg-surface border border-gold/20 overflow-hidden">
            {data.image ? (
              <Image src={data.image} alt={name} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-primary to-secondary">
                <div className="text-center px-6">
                  <div className="w-28 h-28 mx-auto mb-4 rounded-full border border-gold/40 bg-surface flex items-center justify-center">
                    <span className="font-cormorant text-5xl text-gold">GO</span>
                  </div>
                  <p className="font-cormorant text-2xl text-textPrimary">{name}</p>
                  <p className="font-cinzel text-[10px] tracking-widest uppercase text-gold/70 mt-2">Portrait coming soon</p>
                </div>
              </div>
            )}
          </div>
          <div>
            <p className="font-cinzel text-xs tracking-widest uppercase text-gold mb-3">{data.position || 'Founder & CEO'}</p>
            <h2 className="font-cormorant text-4xl text-textPrimary mb-4">{name}</h2>
            {data.welcomeMessage && <p className="text-gold/90 font-cormorant text-2xl italic mb-6">{data.welcomeMessage}</p>}
            {message && (
              <div className="flex gap-4 mb-6 bg-surface border border-gold/20 p-5">
                <FaQuoteLeft className="text-gold text-xl shrink-0 mt-1" />
                <p className="text-textPrimary italic leading-relaxed">{message}</p>
              </div>
            )}
            {(data.introduction || data.content) && <Block title="Introduction" text={data.introduction || data.content} />}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {data.story && <Block title="Our Story" text={data.story} card />}
          {data.vision && <Block title="Vision" text={data.vision} card />}
          {data.mission && <Block title="Mission" text={data.mission} card />}
          {data.content && data.introduction && data.content !== data.introduction && <Block title="Message" text={data.content} card />}
        </div>

        <div className="mt-12 text-center">
          <GoldButton href="/shop">Explore Collection</GoldButton>
          <Link href="/testimonials" className="ml-6 text-gold font-cinzel text-xs tracking-widest uppercase hover:underline">Read Testimonials</Link>
        </div>
      </section>
    </div>
  );
}

function Block({ title, text, card }: { title: string; text: string; card?: boolean }) {
  return (
    <div className={card ? 'bg-surface border border-gold/20 p-6' : 'mb-6'}>
      <h3 className="font-cinzel text-xs tracking-widest uppercase text-gold mb-3">{title}</h3>
      <p className="text-textSecondary leading-relaxed whitespace-pre-wrap">{text}</p>
    </div>
  );
}