'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ui/ProductCard';
import SectionHeading from '@/components/ui/SectionHeading';
import { Product } from '@/types';
import { api } from '@/lib/api';
import { categories } from '@/lib/utils';

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter || 'all');

  useEffect(() => {
    setLoading(true);
    const endpoint = selectedCategory === 'all' 
      ? '/api/products' 
      : /api/products?category=;
    api.get(endpoint)
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <SectionHeading title="Our Collection" subtitle="All Pieces" />
      
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        <button
          onClick={() => setSelectedCategory('all')}
          className={ont-cinzel text-xs tracking-widest uppercase px-6 py-2 border transition-colors }
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={ont-cinzel text-xs tracking-widest uppercase px-6 py-2 border transition-colors }
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center text-textSecondary">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-textSecondary">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
