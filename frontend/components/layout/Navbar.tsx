'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaShoppingBag, FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import CartDrawer from '@/components/cart/CartDrawer';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, setIsOpen: setCartOpen } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav className="bg-primary border-b border-gold/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                <span className="text-buttonText font-cormorant text-xl font-semibold">GO</span>
              </div>
              <div className="ml-3">
                <h1 className="font-cormorant text-xl text-textPrimary">GODS OWN STORE</h1>
                <p className="font-cinzel text-[8px] tracking-widest uppercase text-gold">Dealer in All Kind of Jewelries</p>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-cinzel text-xs tracking-widest uppercase text-textPrimary hover:text-gold transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCartOpen(true)}
                className="relative text-textPrimary hover:text-gold transition-colors"
              >
                <FaShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-buttonText text-xs w-5 h-5 rounded-full flex items-center justify-center font-cinzel">
                    {itemCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-textPrimary"
              >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-secondary border-t border-gold/20">
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block py-2 font-cinzel text-xs tracking-widest uppercase text-textPrimary hover:text-gold"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      <CartDrawer />
    </>
  );
}
