'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import { Review } from '@/types'
import { api } from '@/lib/api'
import StarRating from '@/components/ui/StarRating'
import { FaQuoteLeft } from 'react-icons/fa'
import { fadeUp, scaleIn, staggerContainer } from '@/lib/animations'
import GoldButton from '@/components/ui/GoldButton'
import { temporaryReviews } from '@/lib/temporaryContent'

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(temporaryReviews)
  const [usingTemporary, setUsingTemporary] = useState(true)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    api
      .get('/api/reviews')
      .then((d) => {
        if (Array.isArray(d) && d.length) {
          setReviews(d)
          setUsingTemporary(false)
        }
      })
      .catch(() => {})
  }, [])

  if (reviews.length === 0) return null

  return (
    <motion.section
      variants={prefersReduced ? {} : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="py-20 px-4 max-w-7xl mx-auto"
    >
      <SectionHeading title="Testimonials" subtitle="What Our Customers Say" />
      {usingTemporary && (
        <p className="text-center font-cinzel text-[10px] tracking-widest uppercase text-gold/70 -mt-8 mb-10">
          Featured sample testimonials
        </p>
      )}
      <motion.div
        variants={prefersReduced ? {} : staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
      >
        {reviews.slice(0, 6).map((review) => (
          <motion.div key={review._id} variants={prefersReduced ? {} : scaleIn} className="bg-surface border border-gold/20 p-6 flex flex-col">
            <FaQuoteLeft className="text-gold text-2xl mb-4" />
            {review.type === 'video' && review.mediaUrl ? (
              <video src={review.mediaUrl} controls className="w-full mb-4 max-h-44 border border-gold/10 bg-black" />
            ) : null}
            <div className="flex items-center gap-3 mb-3">
              {review.image ? (
                <img src={review.image} alt={review.name} className="w-11 h-11 object-cover border border-gold/20" />
              ) : (
                <div className="w-11 h-11 border border-gold/20 bg-primary flex items-center justify-center text-gold font-cormorant text-lg">
                  {review.name?.[0] || 'G'}
                </div>
              )}
              <div>
                <p className="font-cinzel text-xs tracking-widest uppercase text-gold">{review.name}</p>
                {review.handle && <p className="text-textSecondary text-xs">{review.handle}</p>}
              </div>
            </div>
            {review.title && <p className="text-textPrimary text-sm mb-2">{review.title}</p>}
            <StarRating rating={review.rating} />
            {review.comment && <p className="text-textSecondary mt-3 italic flex-1">{review.comment}</p>}
          </motion.div>
        ))}
      </motion.div>
      <div className="text-center mt-10">
        <GoldButton href="/testimonials">View All Testimonials</GoldButton>
      </div>
    </motion.section>
  )
}
