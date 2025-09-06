import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { StatisticsSection } from "@/components/statistics-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CampusGallerySection } from "@/components/campus-gallery-section"
import { TestimonialsSection as NewTestimonialsSection } from "@/components/testimonials"
import { BlogSection } from "@/components/blog"
import { SpecialtySection } from "@/components/specialty"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Header />
      <div>
        <HeroSection />
        <AboutSection />
        <StatisticsSection />
        <TestimonialsSection />
        <SpecialtySection />
        <CampusGallerySection />
        <NewTestimonialsSection />
        <BlogSection />
        <NewsletterSection />
        <Footer />
      </div>
    </main>
  )
}
