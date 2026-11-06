export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

export const imageReveal = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export const slideInLeft = {
  hidden: { x: '-100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } },
  exit: { x: '-100%', opacity: 0, transition: { duration: 0.35 } },
}

export const slideInRight = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
  exit: { x: '100%', transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] } },
}

export const reduced = (prefersReduced: boolean | null) =>
  prefersReduced ? { hidden: {}, visible: {}, exit: {} } : null
