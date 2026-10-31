'use client';

import { useCart } from '@/context/CartContext';
import { FaTimes, FaWhatsapp } from 'react-icons/fa';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import CartItem from './CartItem';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, total, clearCart } = useCart();

  if (!isOpen) return null;

  const handleCheckout = () => {
    const message = items.map(item => 
      ${item.product.name} x - 
    ).join('%0A');
    const totalMsg = %0A%0ATotal: ;
    window.open(https://wa.me/2347032835379?text=, '_blank');
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-50" onClick={() => setIsOpen(false)} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-primary border-l border-gold/20 z-50 flex flex-col">
        <div className="p-6 border-b border-gold/20 flex items-center justify-between">
          <h2 className="font-cormorant text-2xl text-textPrimary">Shopping Cart</h2>
          <button onClick={() => setIsOpen(false)} className="text-textPrimary hover:text-gold">
            <FaTimes size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <p className="text-textSecondary text-center mt-8">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.product._id} item={item} />
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="p-6 border-t border-gold/20">
            <div className="flex justify-between mb-4">
              <span className="font-cinzel text-xs tracking-widest uppercase text-textSecondary">Total</span>
              <span className="text-textPrimary text-xl">{formatPrice(total)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-[#25D366] text-white py-3 font-cinzel text-xs tracking-widest uppercase hover:bg-[#20BA5A] transition-colors flex items-center justify-center gap-2"
            >
              <FaWhatsapp size={18} />
              Checkout via WhatsApp
            </button>
            <button
              onClick={clearCart}
              className="w-full mt-2 text-textSecondary text-sm hover:text-gold transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
