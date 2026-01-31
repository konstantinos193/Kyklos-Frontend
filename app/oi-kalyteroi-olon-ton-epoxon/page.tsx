import { Metadata } from "next";
import { AboutBanner } from "@/components/about/about-banner";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generateSEOMetadata({
  title: "Οι Καλύτεροι Όλων των Εποχών | ΚΥΚΛΟΣ Φροντιστήριο Άρτα",
  description: "Οι καλύτεροι μαθητές όλων των εποχών του ΚΥΚΛΟΣ Φροντιστήριο Άρτα. Διακρίσεις και επιτυχίες.",
  path: "/oi-kalyteroi-olon-ton-epoxon",
  keywords: ["καλύτεροι μαθητές", "διακρίσεις", "φροντιστήριο άρτα", "κύκλος"],
});

export default function BestOfAllTimePage() {
  return (
    <main>
      <AboutBanner
        title="Οι Καλύτεροι Όλων των Εποχών"
        backgroundImage={
          "https://placehold.co/1600x500/E7B109/FFFFFF?text=%CE%9F%CE%B9+%CE%9A%CE%B1%CE%BB%CF%8D%CF%84%CE%B5%CF%81%CE%BF%CE%B9"
        }
        overlayOpacity={0.35}
      />

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Οι Καλύτεροι Όλων των Εποχών</h2>
          
          <div className="space-y-6 text-gray-700">
            <p className="text-lg">
              Σε αυτή τη σελίδα παρουσιάζουμε τους καλύτερους μαθητές μας όλων των εποχών, 
              οι οποίοι έχουν διακριθεί για τις εξαιρετικές τους επιδόσεις.
            </p>

            <div className="mt-8">
              <p className="text-sm text-gray-600 mb-4">
                Για περισσότερες πληροφορίες σχετικά με τους επιτυχόντες μας, 
                επισκεφτείτε τη σελίδα:
              </p>
              <Link
                href="/epityxontes"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E7B109] to-[#D97706] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Δείτε τους Επιτυχόντες
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Η λίστα των καλύτερων όλων των εποχών ενημερώνεται τακτικά με βάση 
                τις επιδόσεις των μαθητών μας.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

