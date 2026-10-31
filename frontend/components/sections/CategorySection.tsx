'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import CategoryCard from '@/components/ui/CategoryCard';
import { categories } from '@/lib/utils';

export default function CategorySection() {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <SectionHeading title="Our Collections" subtitle="Browse by Category" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <CategoryCard key={category} name={category} index={index} />
        ))}
      </div>
    </section>
  );
}
