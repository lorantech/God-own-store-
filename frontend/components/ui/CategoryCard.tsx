'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  name: string;
  index: number;
}

export default function CategoryCard({ name, index }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link href={/shop?category=}>
        <div className="bg-surface border border-gold/20 p-8 text-center hover:border-gold transition-colors duration-300 group">
          <h3 className="font-cormorant text-2xl text-textPrimary group-hover:text-gold transition-colors">
            {name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}
