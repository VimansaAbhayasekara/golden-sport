import { Navbar } from "@/components/navbar"
import { Hero3D } from "@/components/3d-hero"
import { VideoBanner } from "@/components/video-banner"
import { FeaturedProducts } from "@/components/featured-products"
import { TrendingProducts } from "@/components/trending-products"
import { CategoryShowcase } from "@/components/category-showcase"
import { FeaturedCollection } from "@/components/featured-collection"
import { ProductShowcase } from "@/components/3d/product-showcase"
import { CustomerReviews } from "@/components/customer-reviews"
import { InstagramFeed } from "@/components/instagram-feed"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero3D />
      <FeaturedProducts />
      <VideoBanner />
      <TrendingProducts />
      <ProductShowcase />
      <CategoryShowcase />
      <FeaturedCollection />
      <CustomerReviews />
      <InstagramFeed />
      <Newsletter />
      <Footer />
    </main>
  )
}
