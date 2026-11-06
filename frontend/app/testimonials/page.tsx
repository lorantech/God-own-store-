'use client';

import { useEffect, useState } from 'react';
import { Review } from '@/types';
import { api } from '@/lib/api';
import StarRating from '@/components/ui/StarRating';
import { FaQuoteLeft } from 'react-icons/fa';
import { temporaryReviews } from '@/lib/temporaryContent';

export default function TestimonialsPage() {
  const [reviews, setReviews] = useState<Review[]>(temporaryReviews);
  const [loading, setLoading] = useState(true);
  const [usingTemporary, setUsingTemporary] = useState(true);

  useEffect(() => {
    api
      .get('/api/reviews')
      .then((d) => {
        if (Array.isArray(d) && d.length) {
          setReviews(d);
          setUsingTemporary(false);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-primary">
      <section className="relative py-24 px-4 border-b border-gold/20 bg-gradient-to-b from-secondary to-primary">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-cinzel text-xs tracking-widest uppercase text-gold mb-4">Customer Stories</p>
          <h1 className="font-cormorant text-5xl md:text-6xl text-textPrimary mb-6">Testimonials</h1>
          <p className="text-textSecondary max-w-2xl mx-auto leading-relaxed">
            Real experiences from customers who chose GOD&apos;s Own Store for fine jewelry, custom pieces, and timeless gifts.
          </p>
          {usingTemporary && !loading && (
            <p className="font-cinzel text-[10px] tracking-widest uppercase text-gold/70 mt-6">
              Featured sample testimonials — published admin testimonials will appear here automatically
            </p>
          )}
        </div>
      </section>

      <section className="py-20 px-4 max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {temporaryReviews.map((r) => (
              <TestimonialCard key={r._id} r={r} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {reviews.map((r) => (
              <TestimonialCard key={r._id} r={r} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function TestimonialCard({ r }: { r: Review }) {
  return (
    <article className="bg-surface border border-gold/20 p-6 flex flex-col">
      <FaQuoteLeft className="text-gold text-2xl mb-4" />
      {r.type === 'video' && r.mediaUrl ? (
        <video src={r.mediaUrl} controls className="w-full mb-4 border border-gold/10 max-h-64 bg-black" />
      ) : null}
      <div className="flex items-center gap-4 mb-4">
        {r.image ? (
          <img src={r.image} alt={r.name} className="w-14 h-14 object-cover border border-gold/20" />
        ) : (
          <div className="w-14 h-14 bg-primary border border-gold/20 flex items-center justify-center text-gold font-cormorant">
            {r.name?.[0] || 'G'}
          </div>
        )}
        <div>
          <p className="font-cormorant text-xl text-textPrimary">{r.name}</p>
          {r.handle && <p className="text-textSecondary text-sm">{r.handle}</p>}
        </div>
      </div>
      {r.title && <h2 className="font-cinzel text-xs tracking-widest uppercase text-gold mb-2">{r.title}</h2>}
      <StarRating rating={r.rating} />
      {r.comment && <p className="text-textSecondary mt-4 italic leading-relaxed flex-1">{r.comment}</p>}
    </article>
  );
}