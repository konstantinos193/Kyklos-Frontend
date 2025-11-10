import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { StatisticsSection } from "@/components/statistics-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CampusGallerySection } from "@/components/campus-gallery-section"
import { TestimonialsSection as NewTestimonialsSection } from "@/components/testimonials"
import { BlogSection } from "@/components/blog"
import { NewsletterSection } from "@/components/newsletter-section"
import { BlogProvider } from "@/components/blog/blog-provider"
import { generateWebSiteSchema, generateOrganizationSchema, generateLocalBusinessSchema } from "@/lib/seo-utils"
import { stringifySchema } from "@/lib/schema-utils"

// Generate schemas at module level to avoid runtime issues
const webSiteSchema = generateWebSiteSchema();
const organizationSchema = generateOrganizationSchema();
const localBusinessSchema = generateLocalBusinessSchema();

const webSiteSchemaJson = stringifySchema(webSiteSchema);
const organizationSchemaJson = stringifySchema(organizationSchema);
const localBusinessSchemaJson = stringifySchema(localBusinessSchema);

export default function Home() {

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: webSiteSchemaJson,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: organizationSchemaJson,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: localBusinessSchemaJson,
        }}
      />
      <main className="min-h-screen relative">
        <div>
          <HeroSection />
          <AboutSection />
          <StatisticsSection />
          <TestimonialsSection />
          <CampusGallerySection />
          <NewTestimonialsSection />
          <BlogProvider>
            <BlogSection />
          </BlogProvider>
          <NewsletterSection />
        </div>
      </main>
    </>
  )
}
