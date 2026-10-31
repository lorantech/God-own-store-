'use client';

import { useEffect, useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import { Review } from '@/types';
import { api } from '@/lib/api';
import StarRating from '@/components/ui/StarRating';
import { FaQuoteLeft } from 'react-icons/fa';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    api.get('/api/reviews').then(setReviews).catch(console.error);
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <SectionHeading title="Customer Reviews" subtitle="What They Say" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.slice(0, 6).map((review) => (
          <div key={review._id} className="bg-surface border border-gold/20 p-6">
            <FaQuoteLeft className="text-gold text-2xl mb-4" />
            {review.comment && <p className="text-textSecondary mb-4 italic">{review.comment}</p>}
            <StarRating rating={review.rating} />
            <p className="font-cinzel text-xs tracking-widest uppercase text-gold mt-4">{review.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
