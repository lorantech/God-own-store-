'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { api } from '@/lib/api';
import { CEOCorner } from '@/types';
import { FaQuoteLeft } from 'react-icons/fa';
import GoldButton from '@/components/ui/GoldButton';
import { temporaryCeoCorner } from '@/lib/temporaryContent';

export default function CEOCornerPage() {
  const [data, setData] = useState<CEOCorner>(temporaryCeoCorner);
  const [loading, setLoading] = useState(true);
  const [usingTemporary, setUsingTemporary] = useState(true);
  const [heroIndex, setHeroIndex] = useState(0);
  const prefersReduced = useReducedMotion();

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
  const heroSlides = [data.image, '/hero-images/hero-background.jpeg', '/hero-images/hero background.png'].filter(
    (src): src is string => !!src
  );

  useEffect(() => {
    setHeroIndex(0);
  }, [data.image]);

  useEffect(() => {
    if (prefersReduced || heroSlides.length < 2) return;
    const t = setInterval(() => setHeroIndex((i) => (i + 1) % heroSlides.length), 5200);
    return () => clearInterval(t);
  }, [prefersReduced, heroSlides.length]);

  return (
    <div className="min-h-screen bg-primary">
      <section className="relative min-h-[62vh] flex items-center justify-center overflow-hidden border-b border-gold/20">
        <div className="absolute inset-0">
          <AnimatePresence initial={false} mode="sync">
            {heroSlides[heroIndex] ? (
              <motion.div
                key={heroSlides[heroIndex]}
                initial={prefersReduced ? false : { opacity: 0, scale: 1.07, x: 26 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 1.03, x: -26 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image src={heroSlides[heroIndex]} alt={name} fill priority sizes="100vw" className="object-cover object-center" />
              </motion.div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-primary" />
            )}
          </AnimatePresence>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/55 to-primary/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.08),transparent_55%)]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 py-24">
          <p className="font-cinzel text-xs tracking-widest uppercase text-gold mb-4">Leadership</p>
          <h1 className="font-cormorant text-5xl md:text-6xl text-textPrimary mb-3">CEO Corner</h1>
          <p className="font-cormorant text-2xl md:text-3xl text-gold/90 italic mb-3">{name}</p>
          <p className="font-cinzel text-[11px] tracking-widest uppercase text-textSecondary mb-6">{data.position || 'Founder & CEO'}</p>
          <p className="text-textSecondary max-w-2xl mx-auto leading-relaxed">Meet the vision behind GOD&apos;s Own Store.</p>
          {usingTemporary && !loading && (
            <p className="font-cinzel text-[10px] tracking-widest uppercase text-gold/70 mt-6">
              Temporary content — admin-published CEO Corner content will replace this automatically
            </p>
          )}
        </div>
      </section>

      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-12 items-start">
          <div className="bg-surface border border-gold/20 p-6">
            <p className="font-cinzel text-xs tracking-widest uppercase text-gold mb-3">A Personal Note</p>
            {data.welcomeMessage && <p className="text-gold/90 font-cormorant text-2xl italic mb-6">{data.welcomeMessage}</p>}
            {message && (
              <div className="flex gap-4">
                <FaQuoteLeft className="text-gold text-xl shrink-0 mt-1" />
                <p className="text-textPrimary italic leading-relaxed">{message}</p>
              </div>
            )}
          </div>
          <div>
            {(data.introduction || data.content) && <Block title="Introduction" text={data.introduction || data.content} />}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {data.story && <Block title="Our Story" text={data.story} card />}
              {data.vision && <Block title="Vision" text={data.vision} card />}
              {data.mission && <Block title="Mission" text={data.mission} card />}
              {data.content && data.introduction && data.content !== data.introduction && <Block title="Message" text={data.content} card />}
            </div>
          </div>
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