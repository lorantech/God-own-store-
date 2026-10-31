import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A0F0A',
        secondary: '#0E1A0E',
        surface: '#111D11',
        emerald: {
          DEFAULT: '#2D6A4F',
          hover: '#40916C',
          glow: '#52B788',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E2C27D',
          muted: '#8B6914',
        },
        textPrimary: '#F5F0E8',
        textSecondary: '#A89F8C',
        buttonText: '#0A0F0A',
        footer: '#060C06',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'serif'],
        cinzel: ['var(--font-cinzel)', 'serif'],
        jost: ['var(--font-jost)', 'sans-serif'],
      },
      borderRadius: {
        none: '0',
      },
    },
  },
  plugins: [],
}
export default config
