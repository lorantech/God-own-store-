import type { Metadata } from 'next'
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:wght@400;500;600;700&family=Jost:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
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
