import type { Metadata } from 'next'
import { Cormorant_Garamond, Cinzel, Jost } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { AdminAuthProvider } from '@/context/AdminAuthContext'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp'
import { Toaster } from 'react-hot-toast'

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['400', '400italic', '500', '600'],
  variable: '--font-cormorant'
})

const cinzel = Cinzel({ 
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-cinzel'
})

const jost = Jost({ 
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost'
})

export const metadata: Metadata = {
  title: 'GODS OWN STORE | Dealer in All Kind of Jewelries',
  description: 'Luxury jewelry store - Necklaces, Rings, Bracelets, Earrings, Watches & Customised Jewelry',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={${cormorant.variable}  }>
      <body>
        <AdminAuthProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <FloatingWhatsApp />
            <Toaster position="top-center" toastOptions={{
              style: {
                background: '#111D11',
                color: '#F5F0E8',
                border: '1px solid #C9A84C',
              },
            }} />
          </CartProvider>
        </AdminAuthProvider>
      </body>
    </html>
  )
}
