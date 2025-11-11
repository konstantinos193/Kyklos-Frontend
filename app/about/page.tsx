import { AboutBanner } from "@/components/about/about-banner";
import { AboutGoals } from "@/components/about/about-goals";
import { AboutHistory } from "@/components/about/about-history";
import { AboutMissionVision } from "@/components/about/about-mission-vision";
import { AboutStaff } from "@/components/about/about-staff";
import { AboutValues } from "@/components/about/about-values";
import { AboutSection } from "@/components/about-section";
import { generateMetadata as generateSEOMetadata, generateWebPageSchema, generateBreadcrumbSchema, generateOrganizationSchema } from "@/lib/seo-utils";

export const metadata = generateSEOMetadata({
  title: "Σχετικά με εμάς | ΚΥΚΛΟΣ Φροντιστήριο Άρτα",
  description: "Γνωρίστε το ΚΥΚΛΟΣ Φροντιστήριο στην Άρτα! 30+ χρόνια εμπειρίας στην εκπαίδευση, 95% επιτυχία στις Πανελλαδικές εξετάσεις. Εξειδικευμένοι καθηγητές, σύγχρονες εγκαταστάσεις και προσωποποιημένη προετοιμασία για Γυμνάσιο & Λύκειο.",
  keywords: [
    "σχετικά με εμάς",
    "φροντιστήριο άρτα ιστορία",
    "φροντιστήριο κύκλος άρτα",
    "εμπειρία φροντιστηρίου",
    "καθηγητές φροντιστηρίου άρτα",
    "εγκαταστάσεις φροντιστηρίου",
    "μαθησιακό κέντρο άρτα",
    "εκπαιδευτική φιλοσοφία",
    "στόχοι φροντιστηρίου",
    "ιστορία φροντιστηρίου άρτα",
    "φροντιστήριο άρτα",
    "μαθησιακό κέντρο",
    "εκπαίδευση άρτα"
  ],
  path: "/about",
  type: "website",
});

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Αρχική", url: "/" },
    { name: "Σχετικά με εμάς", url: "/about" },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Σχετικά με εμάς | ΚΥΚΛΟΣ Φροντιστήριο Άρτα",
    description: "Γνωρίστε το ΚΥΚΛΟΣ Φροντιστήριο στην Άρτα! 30+ χρόνια εμπειρίας στην εκπαίδευση, 95% επιτυχία στις Πανελλαδικές εξετάσεις.",
    url: "/about",
    breadcrumb: [
      { name: "Αρχική", url: "/" },
      { name: "Σχετικά με εμάς", url: "/about" },
    ],
  });

  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <main>
        <AboutBanner 
          title="Ποιοί Είμαστε" 
          backgroundImage="/building/0-02-05-478c0937fdff63e4ab45201a399a1b1c3dad0c2a14c4cf8b65738dd77edfc916_acfb2c2f26f11734.jpg" 
        />
        <AboutSection />
        <AboutMissionVision />
        <AboutGoals />
        <AboutStaff />
        <AboutValues />
        <AboutHistory />
      </main>
    </>
  );
}


