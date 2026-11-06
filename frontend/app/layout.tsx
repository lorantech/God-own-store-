import type { Metadata } from 'next'
import { Cormorant_Garamond, Cinzel, Jost } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { ShopUIProvider } from '@/context/ShopUIContext'
import { AdminAuthProvider } from '@/context/AdminAuthContext'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp'
import PageTransition from '@/components/layout/PageTransition'
import QuickViewModal from '@/components/ui/QuickViewModal'
import VariantPickerModal from '@/components/ui/VariantPickerModal'
import CompareBar from '@/components/ui/CompareBar'
import { Toaster } from 'react-hot-toast'

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-cormorant'
})

const cinzel = Cinzel({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-cinzel'
})

const jost = Jost({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
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
    <html lang="en" className={cormorant.variable}>
      <body className={`${cinzel.variable} ${jost.variable}`}>
        <AdminAuthProvider>
          <CartProvider>
            <ShopUIProvider>
              <Navbar />
              <PageTransition>
                <main className="min-h-screen">{children}</main>
              </PageTransition>
              <Footer />
              <FloatingWhatsApp />
              <QuickViewModal />
              <VariantPickerModal />
              <CompareBar />
              <Toaster
                position="bottom-right"
                toastOptions={{
                  style: {
                    background: '#111D11',
                    color: '#F5F0E8',
                    border: '1px solid #C9A84C',
                    borderRadius: '0',
                    fontFamily: 'var(--font-jost)',
                    fontSize: '13px',
                    letterSpacing: '0.08em',
                  },
                  iconTheme: { primary: '#C9A84C', secondary: '#111D11' },
                  duration: 2500,
                }}
              />
            </ShopUIProvider>
          </CartProvider>
        </AdminAuthProvider>
      </body>
    </html>
  )
}
