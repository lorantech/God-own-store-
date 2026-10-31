'use client';

import { useEffect, useState } from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { api } from '@/lib/api';
import { Review } from '@/types';
import GoldButton from '@/components/ui/GoldButton';
import StarRating from '@/components/ui/StarRating';
import { FaCheck, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function AdminReviews() {
  const { token } = useAdminAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending'>('all');

  const fetchReviews = () => {
    const endpoint = filter === 'pending' ? '/api/reviews?approved=false' : '/api/reviews';
    api.get(endpoint).then(setReviews).catch(console.error);
  };

  useEffect(() => {
    fetchReviews();
  }, [filter]);

  const handleApprove = async (id: string) => {
    try {
      await api.put(/api/reviews//approve, {}, token || '');
      toast.success('Review approved');
      fetchReviews();
    } catch (error) {
      toast.error('Error approving review');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this review?')) return;
    try {
      await api.delete(/api/reviews/, token || '');
      toast.success('Review deleted');
      fetchReviews();
    } catch (error) {
      toast.error('Error deleting review');
    }
  };

  return (
    <div>
      <h1 className="font-cormorant text-4xl text-textPrimary mb-8">Reviews</h1>
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={ont-cinzel text-xs tracking-widest uppercase px-6 py-2 border transition-colors }
        >
          All
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={ont-cinzel text-xs tracking-widest uppercase px-6 py-2 border transition-colors }
        >
          Pending
        </button>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="bg-surface border border-gold/20 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-cormorant text-xl text-textPrimary mb-2">{review.name}</h3>
                <StarRating rating={review.rating} />
              </div>
              <div className="flex gap-2">
                {!review.approved && (
                  <button
                    onClick={() => handleApprove(review._id)}
                    className="text-green-400 hover:text-green-300"
                    title="Approve"
                  >
                    <FaCheck />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(review._id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            {review.comment && <p className="text-textSecondary mb-4">{review.comment}</p>}
            {review.mediaUrl && review.type === 'video' && (
              <video src={review.mediaUrl} controls className="max-w-xs" />
            )}
            <p className="text-textSecondary text-sm mt-4">
              Status: {review.approved ? 'Approved' : 'Pending'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
