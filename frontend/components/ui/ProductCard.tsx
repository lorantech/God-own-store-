'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import GoldButton from './GoldButton';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div
      className="bg-surface border border-gold/20 group"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={/product/}>
        <div className="relative h-80 overflow-hidden">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-secondary flex items-center justify-center">
              <span className="text-gold text-4xl font-cormorant">GO</span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-6">
        <p className="font-cinzel text-[11px] tracking-widest uppercase text-gold mb-2">
          {product.category}
        </p>
        <Link href={/product/}>
          <h3 className="font-cormorant text-xl text-textPrimary mb-2 hover:text-gold transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-textPrimary text-lg mb-4">{formatPrice(product.price)}</p>
        <GoldButton onClick={() => addToCart(product)} className="w-full">
          Add to Cart
        </GoldButton>
      </div>
    </motion.div>
  );
}
