import Header from "@/components/header"
import HeroCarousel from "@/components/hero-carousel"
import CategorySection from "@/components/category-section"
import PromoCards from "@/components/promo-cards"
import Footer from "@/components/footer"
import FeaturedProducts from "@/components/featured-products"
import MinimalBanner from "@/components/minimal-banner"
import ModaSection from "@/components/moda-section"
import HogarSection from "@/components/hogar-section"
import ArtesaniasSection from "@/components/artesanias-section"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroCarousel />
        <div className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-muted/30 to-background">
          <FeaturedProducts />
        </div>
        <div className="py-12 md:py-16 lg:py-20">
          <ModaSection />
        </div>
        <div className="py-12 md:py-16 lg:py-20 bg-muted/20">
          <CategorySection />
        </div>
        <div className="py-12 md:py-16 lg:py-20">
          <HogarSection />
        </div>
        <div className="py-12 md:py-16 lg:py-20 bg-muted/20">
          <PromoCards />
        </div>
        <div className="py-12 md:py-16 lg:py-20">
          <ArtesaniasSection />
        </div>
        <div className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-muted/30 to-muted/50">
          <MinimalBanner />
        </div>
      </main>
      <Footer />
    </div>
  )
}
