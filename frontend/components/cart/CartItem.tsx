'use client';

import Image from 'next/image';
import { FaTrash } from 'react-icons/fa';
import { CartItem as CartItemType } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 pb-4 border-b border-gold/20">
      <div className="relative w-20 h-20 flex-shrink-0">
        {item.product.images[0] ? (
          <Image
            src={item.product.images[0]}
            alt={item.product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-secondary flex items-center justify-center">
            <span className="text-gold text-sm font-cormorant">GO</span>
          </div>
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-cormorant text-textPrimary mb-1">{item.product.name}</h3>
        <p className="text-gold text-sm mb-2">{formatPrice(item.product.price)}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
              className="w-6 h-6 bg-surface border border-gold/20 text-textPrimary"
            >
              -
            </button>
            <span className="text-textPrimary w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
              className="w-6 h-6 bg-surface border border-gold/20 text-textPrimary"
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeFromCart(item.product._id)}
            className="text-textSecondary hover:text-red-400 transition-colors"
          >
            <FaTrash size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
