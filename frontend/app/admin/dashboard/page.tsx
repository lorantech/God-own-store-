'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Product, Review, Category } from '@/types';
import { FaBox, FaComment, FaStar, FaTags, FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    Promise.allSettled([
      api.get('/api/products?admin=true'),
      api.get('/api/reviews?admin=true'),
      api.get('/api/categories'),
    ]).then(([p, r, c]) => {
      if (p.status === 'fulfilled' && Array.isArray(p.value)) setProducts(p.value);
      if (r.status === 'fulfilled' && Array.isArray(r.value)) setReviews(r.value);
      if (c.status === 'fulfilled' && Array.isArray(c.value)) setCategories(c.value);
      setLoading(false);
    });
  }, []);

  const publishedProducts = products.filter((p) => p.published !== false).length;
  const pendingReviews = reviews.filter((r) => !r.approved).length;
  const recentProducts = [...products].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 5);
  const recentReviews = [...reviews].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 5);

  const cards = [
    { label: 'Total Products', value: products.length, icon: FaBox, href: '/admin/products' },
    { label: 'Published Products', value: publishedProducts, icon: FaCheckCircle, href: '/admin/products' },
    { label: 'Total Categories', value: categories.length || '—', icon: FaTags, href: '/admin/categories' },
    { label: 'Total Testimonials', value: reviews.length, icon: FaComment, href: '/admin/reviews' },
    { label: 'Pending Testimonials', value: pendingReviews, icon: FaStar, href: '/admin/reviews' },
    { label: 'Orders', value: 'N/A', icon: FaBox, href: '/admin/orders' },
  ];

  return (
    <div>
      <h1 className="font-cormorant text-4xl text-textPrimary mb-2">Dashboard Overview</h1>
      <p className="font-cinzel text-xs tracking-widest uppercase text-gold mb-8">God&apos;s Own Store Administration</p>

      {loading ? (
        <p className="text-textSecondary">Loading dashboard...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
            {cards.map((c) => {
              const Icon = c.icon;
              return (
                <Link key={c.label} href={c.href} className="bg-surface border border-gold/20 p-6 hover:border-gold/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-cinzel text-[10px] tracking-widest uppercase text-gold mb-2">{c.label}</p>
                      <p className="text-textPrimary text-3xl font-cormorant">{c.value}</p>
                    </div>
                    <Icon size={28} className="text-gold/70" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-surface border border-gold/20 p-6">
              <h2 className="font-cinzel text-xs tracking-widest uppercase text-gold mb-4">Recently Uploaded Products</h2>
              {recentProducts.length ? (
                <ul className="space-y-3">
                  {recentProducts.map((p) => (
                    <li key={p._id} className="flex justify-between gap-4 border-b border-gold/10 pb-2">
                      <span className="text-textPrimary truncate">{p.name}</span>
                      <span className="text-textSecondary text-sm shrink-0">{p.category}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-textSecondary text-sm">No products found.</p>
              )}
            </div>
            <div className="bg-surface border border-gold/20 p-6">
              <h2 className="font-cinzel text-xs tracking-widest uppercase text-gold mb-4">Recently Submitted Testimonials</h2>
              {recentReviews.length ? (
                <ul className="space-y-3">
                  {recentReviews.map((r) => (
                    <li key={r._id} className="flex justify-between gap-4 border-b border-gold/10 pb-2">
                      <span className="text-textPrimary truncate">{r.name}</span>
                      <span className={`text-xs shrink-0 font-cinzel tracking-widest uppercase ${r.approved ? 'text-green-400' : 'text-gold'}`}>
                        {r.approved ? 'Published' : 'Pending'}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-textSecondary text-sm">No testimonials found.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
