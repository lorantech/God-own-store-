'use client';

import { useEffect, useState } from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { api } from '@/lib/api';
import { FaBox, FaComment, FaStar } from 'react-icons/fa';

export default function AdminDashboard() {
  const { token } = useAdminAuth();
  const [stats, setStats] = useState({ products: 0, reviews: 0, pendingReviews: 0 });

  useEffect(() => {
    Promise.all([
      api.get('/api/products'),
      api.get('/api/reviews'),
      api.get('/api/reviews?approved=false'),
    ]).then(([products, reviews, pending]) => {
      setStats({
        products: products.length,
        reviews: reviews.length,
        pendingReviews: pending.length,
      });
    }).catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="font-cormorant text-4xl text-textPrimary mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface border border-gold/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-cinzel text-xs tracking-widest uppercase text-gold mb-2">Total Products</p>
              <p className="text-textPrimary text-3xl">{stats.products}</p>
            </div>
            <FaBox size={32} className="text-gold" />
          </div>
        </div>
        <div className="bg-surface border border-gold/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-cinzel text-xs tracking-widest uppercase text-gold mb-2">Total Reviews</p>
              <p className="text-textPrimary text-3xl">{stats.reviews}</p>
            </div>
            <FaComment size={32} className="text-gold" />
          </div>
        </div>
        <div className="bg-surface border border-gold/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-cinzel text-xs tracking-widest uppercase text-gold mb-2">Pending Reviews</p>
              <p className="text-textPrimary text-3xl">{stats.pendingReviews}</p>
            </div>
            <FaStar size={32} className="text-gold" />
          </div>
        </div>
      </div>
    </div>
  );
}
