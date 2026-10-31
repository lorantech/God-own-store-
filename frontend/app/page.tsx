import HeroSection from '@/components/sections/HeroSection'
import MarqueeStrip from '@/components/sections/MarqueeStrip'
import CategorySection from '@/components/sections/CategorySection'
import FeaturedProducts from '@/components/sections/FeaturedProducts'
import CEOCornerSection from '@/components/sections/CEOCornerSection'
import ReviewsSection from '@/components/sections/ReviewsSection'
import WhatsAppCTA from '@/components/sections/WhatsAppCTA'

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <CategorySection />
      <FeaturedProducts />
      <CEOCornerSection />
      <ReviewsSection />
      <WhatsAppCTA />
    </>
  )
}
