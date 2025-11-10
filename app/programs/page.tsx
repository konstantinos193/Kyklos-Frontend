import { ProgramsHero } from "@/components/programs";
import { generateMetadata as generateSEOMetadata, generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo-utils";
import { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: "Προγράμματα Σπουδών | ΚΥΚΛΟΣ Φροντιστήριο Άρτα",
  description: "Εξατομικευμένα προγράμματα σπουδών για Γυμνάσιο, Λύκειο και ΕΠΑΛ. Προετοιμασία για Πανελλαδικές εξετάσεις με σύγχρονες μεθόδους διδασκαλίας και προσωποποιημένη υποστήριξη.",
  keywords: [
    "προγράμματα σπουδών",
    "φροντιστήριο άρτα",
    "γυμνάσιο άρτα",
    "λύκειο άρτα",
    "επαλ άρτα",
    "πανελλαδικές εξετάσεις",
    "προετοιμασία πανελλαδικών",
    "μαθησιακό πρόγραμμα",
    "εκπαιδευτικά προγράμματα",
    "φροντιστήριο κύκλος",
  ],
  path: "/programs",
  type: "website",
});

export default function ProgramsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Αρχική", url: "/" },
    { name: "Προγράμματα Σπουδών", url: "/programs" },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Προγράμματα Σπουδών | ΚΥΚΛΟΣ Φροντιστήριο Άρτα",
    description: "Εξατομικευμένα προγράμματα σπουδών για Γυμνάσιο, Λύκειο και ΕΠΑΛ. Προετοιμασία για Πανελλαδικές εξετάσεις.",
    url: "/programs",
    breadcrumb: [
      { name: "Αρχική", url: "/" },
      { name: "Προγράμματα Σπουδών", url: "/programs" },
    ],
  });

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
      <main>
        <ProgramsHero />
      </main>
    </>
  );
}


