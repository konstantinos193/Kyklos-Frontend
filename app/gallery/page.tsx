import { CampusGallerySection } from "@/components/campus-gallery-section";
import { generateMetadata as generateSEOMetadata, generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo-utils";
import { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: "Φωτογραφίες | ΚΥΚΛΟΣ Φροντιστήριο Άρτα",
  description: "Δείτε τις εγκαταστάσεις και τις δραστηριότητες του ΚΥΚΛΟΣ Φροντιστήριου στην Άρτα. Σύγχρονες αίθουσες, εργαστήρια και χώροι διδασκαλίας.",
  keywords: [
    "φωτογραφίες φροντιστηρίου",
    "εγκαταστάσεις φροντιστηρίου άρτα",
    "αίθουσες φροντιστηρίου",
    "εργαστήρια φροντιστηρίου",
    "φροντιστήριο κύκλος εγκαταστάσεις",
    "φωτογραφίες αίθουσες",
  ],
  path: "/gallery",
  type: "website",
});

export default function GalleryPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Αρχική", url: "/" },
    { name: "Φωτογραφίες", url: "/gallery" },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Φωτογραφίες | ΚΥΚΛΟΣ Φροντιστήριο Άρτα",
    description: "Δείτε τις εγκαταστάσεις και τις δραστηριότητες του ΚΥΚΛΟΣ Φροντιστήριου στην Άρτα.",
    url: "/gallery",
    breadcrumb: [
      { name: "Αρχική", url: "/" },
      { name: "Φωτογραφίες", url: "/gallery" },
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
        <CampusGallerySection />
      </main>
    </>
  );
}


