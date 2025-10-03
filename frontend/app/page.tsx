import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { StatisticsSection } from "@/components/statistics-section"
import { ProgramsSection } from "@/components/programs"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CampusGallerySection } from "@/components/campus-gallery-section"
import { TestimonialsSection as NewTestimonialsSection } from "@/components/testimonials"
import { BlogSection } from "@/components/blog"
import { SpecialtySection } from "@/components/specialty"
import { NewsletterSection } from "@/components/newsletter-section"
import { BlogProvider } from "@/components/blog/blog-provider"

export default function Home() {

  return (
    <main className="min-h-screen relative">
      <div>
        <HeroSection />
        <AboutSection />
        <StatisticsSection />
        <ProgramsSection />
        <TestimonialsSection />
        <SpecialtySection />
        <CampusGallerySection />
        <NewTestimonialsSection />
        <BlogProvider>
          <BlogSection />
        </BlogProvider>
        <NewsletterSection />
      </div>
    </main>
  )
}
