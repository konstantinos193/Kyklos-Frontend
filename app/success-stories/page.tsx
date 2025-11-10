import { generateMetadata as generateSEOMetadata, generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo-utils";
import { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: "Επιτυχόντες | ΚΥΚΛΟΣ Φροντιστήριο Άρτα",
  description: "Ιστορίες επιτυχίας από μαθητές μας που πέτυχαν τους στόχους τους. 95% επιτυχία στις Πανελλαδικές εξετάσεις. Δείτε τις μαρτυρίες και τα αποτελέσματα των μαθητών μας.",
  keywords: [
    "επιτυχόντες",
    "επιτυχίες φροντιστηρίου",
    "μαθητές επιτυχίας",
    "πανελλαδικές επιτυχίες",
    "μαρτυρίες μαθητών",
    "αποτελέσματα φροντιστηρίου",
    "φροντιστήριο άρτα επιτυχίες",
  ],
  path: "/success-stories",
  type: "website",
});

export default function SuccessStoriesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Αρχική", url: "/" },
    { name: "Επιτυχόντες", url: "/success-stories" },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Επιτυχόντες | ΚΥΚΛΟΣ Φροντιστήριο Άρτα",
    description: "Ιστορίες επιτυχίας από μαθητές μας που πέτυχαν τους στόχους τους. 95% επιτυχία στις Πανελλαδικές εξετάσεις.",
    url: "/success-stories",
    breadcrumb: [
      { name: "Αρχική", url: "/" },
      { name: "Επιτυχόντες", url: "/success-stories" },
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
      <main className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-semibold text-gray-900">Επιτυχόντες</h1>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600">
            Ιστορίες επιτυχίας από μαθητές μας που πέτυχαν τους στόχους τους.
          </p>

        <section className="mt-6 sm:mt-8 space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
            <h2 className="text-base sm:text-lg font-medium text-gray-900">Σύντομα διαθέσιμο</h2>
            <p className="mt-2 text-sm text-gray-600">Θα προστεθούν ονομαστικές επιτυχίες και μαρτυρίες.</p>
          </div>
        </section>
      </div>
    </main>
    </>
  );
}


