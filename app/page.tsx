import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { StatisticsSection } from "@/components/statistics-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CampusGallerySection } from "@/components/campus-gallery-section"
import { TestimonialsSection as NewTestimonialsSection } from "@/components/testimonials"
import { BlogSection } from "@/components/blog"
import { NewsletterSection } from "@/components/newsletter-section"
import { FAQSection } from "@/components/contact/faq-section"
import { BlogProvider } from "@/components/blog/blog-provider"
import {
  generateWebSiteSchema,
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateFAQSchema,
  generateMetadata as generateSEOMetadata,
} from "@/lib/seo-utils"
import { stringifySchema } from "@/lib/schema-utils"
import type { Metadata } from "next"

// Generate schemas at module level to avoid runtime issues
const webSiteSchema = generateWebSiteSchema();
const organizationSchema = generateOrganizationSchema();
const localBusinessSchema = generateLocalBusinessSchema();
const homepageFAQSchema = generateFAQSchema([
  {
    question: "Ποιο είναι το φροντιστήριο ΚΥΚΛΟΣ στην Άρτα;",
    answer:
      "Το ΚΥΚΛΟΣ είναι φροντιστήριο μέσης εκπαίδευσης στην Άρτα για Γυμνάσιο, Λύκειο και ΕΠΑΛ, με εξειδίκευση στην προετοιμασία για τις Πανελλαδικές εξετάσεις.",
  },
  {
    question: "Για ποιες τάξεις και σχολεία προσφέρει μαθήματα το φροντιστήριο;",
    answer:
      "Προσφέρουμε τμήματα για όλες τις τάξεις Γυμνασίου, Λυκείου και ΕΠΑΛ, με προγράμματα προσαρμοσμένα στις ανάγκες κάθε μαθητή.",
  },
  {
    question: "Ποιες είναι οι επιτυχίες του φροντιστηρίου στις Πανελλαδικές;",
    answer:
      "Το φροντιστήριο ΚΥΚΛΟΣ στην Άρτα έχει σταθερά υψηλά ποσοστά επιτυχίας στις Πανελλαδικές, με πολλούς επιτυχόντες σε σχολές υψηλής ζήτησης.",
  },
  {
    question: "Πώς μπορώ να μάθω περισσότερα για τα προγράμματα σπουδών;",
    answer:
      "Μπορείτε να δείτε τα προγράμματα στην ιστοσελίδα μας ή να επικοινωνήσετε μαζί μας για αναλυτική ενημέρωση και προσωπικό ραντεβού.",
  },
]);

const webSiteSchemaJson = stringifySchema(webSiteSchema);
const organizationSchemaJson = stringifySchema(organizationSchema);
const localBusinessSchemaJson = stringifySchema(localBusinessSchema);

export const metadata: Metadata = generateSEOMetadata({
  title: "Φροντιστήριο στην Άρτα για Γυμνάσιο, Λύκειο & ΕΠΑΛ",
  description:
    "ΚΥΚΛΟΣ Φροντιστήριο στην Άρτα με ολοκληρωμένη προετοιμασία για Γυμνάσιο, Λύκειο & ΕΠΑΛ. Εξειδικευμένοι καθηγητές, σύγχρονα προγράμματα και υψηλά ποσοστά επιτυχίας στις Πανελλαδικές εξετάσεις.",
  keywords: [
    "φροντιστήριο",
    "φροντιστήριο άρτα",
    "φροντιστηρια αρτα",
    "φροντιστήρια άρτα",
    "φροντιστηριο κυκλος",
    "κυκλος φροντιστηριο",
    "κυκλοσ φροντιστηριο",
    "κύκλος φροντιστήριο",
    "φροντιστήρια",
    "γυμνάσιο άρτα",
    "λύκειο άρτα",
    "επαλ άρτα",
    "πανελλήνιες εξετάσεις άρτα",
  ],
  path: "/",
  type: "website",
});

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifySchema(homepageFAQSchema),
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
          <FAQSection />
        </div>
      </main>
    </>
  )
}
