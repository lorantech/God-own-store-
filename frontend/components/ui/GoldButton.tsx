'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GoldButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  href?: string;
}

export default function GoldButton({ children, onClick, type = 'button', className = '', href }: GoldButtonProps) {
  const buttonClasses = g-gold hover:bg-gold-light text-buttonText px-8 py-3 font-cinzel text-xs tracking-widest uppercase transition-colors duration-300 ease-in-out rounded-none ;
  
  if (href) {
    return (
      <motion.a
        href={href}
        className={buttonClasses}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={buttonClasses}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
