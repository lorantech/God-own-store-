'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'

interface GoldButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
  href?: string
  disabled?: boolean
  variant?: 'solid' | 'hero'
}

export default function GoldButton({
  children,
  onClick,
  type = 'button',
  className = '',
  href,
  disabled,
  variant = 'solid',
}: GoldButtonProps) {
  const prefersReduced = useReducedMotion()
  const base = 'relative overflow-hidden inline-flex items-center justify-center px-8 py-3 font-cinzel text-xs tracking-widest uppercase transition-colors duration-300 ease-in-out rounded-none'
  const solid = 'bg-gold hover:bg-gold-light text-buttonText'
  const hero = 'border border-gold text-gold hover:text-buttonText'
  const classes = `${base} ${variant === 'hero' ? hero : solid} ${disabled ? 'opacity-60 pointer-events-none' : ''} ${className}`

  const inner = (
    <>
      {variant === 'hero' && (
        <span className="absolute inset-0 bg-gold origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
      )}
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      {variant === 'hero' && !prefersReduced && (
        <motion.span
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-gold-light/30 to-transparent"
          initial={false}
          whileHover={{ x: ['0%', '400%'] }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        />
      )}
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={`group ${classes}`}
        whileHover={prefersReduced ? {} : { scale: 1.02 }}
        whileTap={prefersReduced ? {} : { scale: 0.98 }}
      >
        {inner}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group ${classes}`}
      whileHover={prefersReduced ? {} : { scale: 1.02 }}
      whileTap={prefersReduced ? {} : { scale: 0.98 }}
    >
      {inner}
    </motion.button>
  )
}
