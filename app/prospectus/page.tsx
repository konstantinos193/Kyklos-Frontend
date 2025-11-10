import { AboutBanner } from "@/components/about/about-banner";
import Link from "next/link";

export const metadata = {
  title: 'Prospectus - ΚΥΚΛΟΣ Φροντιστήριο',
  description: 'Κατεβάστε το Prospectus του ΚΥΚΛΟΣ Φροντιστήριο',
};

export default function ProspectusPage() {
  return (
    <main>
      <AboutBanner
        title="Prospectus"
        backgroundImage={
          "https://placehold.co/1600x500/E7B109/FFFFFF?text=Prospectus"
        }
        overlayOpacity={0.35}
      />

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Κατεβάστε το Prospectus</h2>
          
          <div className="space-y-6 text-gray-700">
            <p className="text-lg">
              Το Prospectus περιέχει πλήρεις πληροφορίες σχετικά με τα προγράμματα σπουδών, 
              τις υπηρεσίες και τις εγκαταστάσεις του ΚΥΚΛΟΣ Φροντιστήριο.
            </p>

            <div className="mt-8">
              <p className="text-sm text-gray-600 mb-4">
                Για να κατεβάσετε το Prospectus, παρακαλούμε επικοινωνήστε μαζί μας:
              </p>
              <div className="space-y-2">
                <p>
                  <strong>Τηλέφωνο:</strong>{" "}
                  <a href="tel:+302681026671" className="text-[#CE3B49] hover:underline">
                    +30 26810 26671
                  </a>
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:grkyklos-@hotmail.gr" className="text-[#CE3B49] hover:underline">
                    grkyklos-@hotmail.gr
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E7B109] to-[#D97706] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Επικοινωνήστε Μαζί Μας
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

