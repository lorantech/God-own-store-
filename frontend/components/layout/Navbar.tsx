'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '@/images/logo.png';
import { useEffect, useRef, useState } from 'react';
import { FaShoppingBag, FaTimes } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import CartDrawer from '@/components/cart/CartDrawer';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { slideInLeft } from '@/lib/animations';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { items, setIsOpen: setCartOpen } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const prefersReduced = useReducedMotion();
  const prevCount = useRef(itemCount);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (itemCount > prevCount.current && !prefersReduced) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 300);
      prevCount.current = itemCount;
      return () => clearTimeout(t);
    }
    prevCount.current = itemCount;
  }, [itemCount, prefersReduced]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'CEO Corner', href: '/ceo-corner' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Admin', href: '/admin/login' },
  ];

  return (
    <>
      <nav
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled ? 'bg-primary/95 backdrop-blur-md border-gold/20' : 'bg-primary/80 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center">
              <Image
                src={logo}
                alt="Gods Own Store logo"
                width={40}
                height={40}
                className="w-12 h-12 rounded-full object-cover border border-gold/30"
              />
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
                  className="group relative font-cinzel text-xs tracking-widest uppercase text-textPrimary hover:text-gold transition-colors duration-300"
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-1 h-px w-full bg-gold origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => setCartOpen(true)}
                className="relative text-textPrimary hover:text-gold transition-colors"
                animate={bump ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15, duration: 0.3 }}
                aria-label="Open cart"
              >
                <FaShoppingBag size={20} />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      key={itemCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 bg-gold text-buttonText text-xs w-5 h-5 rounded-full flex items-center justify-center font-cinzel"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-textPrimary p-1"
                aria-label="Toggle menu"
              >
                <span className="block w-6 h-5 relative">
                  <span className={`absolute left-0 h-0.5 w-6 bg-current transition-all duration-300 ${isOpen ? 'top-2 rotate-45' : 'top-0'}`} />
                  <span className={`absolute left-0 top-2 h-0.5 w-6 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                  <span className={`absolute left-0 h-0.5 w-6 bg-current transition-all duration-300 ${isOpen ? 'top-2 -rotate-45' : 'top-4'}`} />
                </span>
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-40 md:hidden"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                variants={prefersReduced ? {} : slideInLeft}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed left-0 top-0 h-full w-72 bg-secondary border-r border-gold/20 z-50 md:hidden"
              >
                <div className="p-6 border-b border-gold/20 flex items-center justify-between">
                  <span className="font-cormorant text-xl text-textPrimary">Menu</span>
                  <button onClick={() => setIsOpen(false)} className="text-textPrimary hover:text-gold" aria-label="Close menu">
                    <FaTimes size={20} />
                  </button>
                </div>
                <motion.div
                  className="px-4 pt-4 space-y-1"
                  variants={prefersReduced ? {} : { visible: { transition: { staggerChildren: 0.06 } } }}
                  initial="hidden"
                  animate="visible"
                >
                  {navLinks.map((link) => (
                    <motion.div
                      key={link.name}
                      variants={prefersReduced ? {} : { hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
                    >
                      <Link
                        href={link.href}
                        className="block py-3 font-cinzel text-xs tracking-widest uppercase text-textPrimary hover:text-gold"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
      <CartDrawer />
    </>
  );
}
