import { Metadata } from "next";
import { AboutBanner } from "@/components/about/about-banner";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generateSEOMetadata({
  title: "Όροι Χρήσης | ΚΥΚΛΟΣ Φροντιστήριο Άρτα",
  description: "Όροι και προϋποθέσεις χρήσης του ιστότοπου ΚΥΚΛΟΣ Φροντιστήριο Άρτα.",
  path: "/terms",
  keywords: ["όροι χρήσης", "κύκλος φροντιστήριο", "άρτα"],
});

export default function TermsPage() {
  return (
    <main>
      <AboutBanner
        title="Όροι Χρήσης"
        backgroundImage={
          "https://placehold.co/1600x500/E7B109/FFFFFF?text=%CE%8C%CF%81%CE%BF%CE%B9+%CE%A7%CF%81%CE%AE%CF%83%CE%B7%CF%83%CE%B7%CF%82"
        }
        overlayOpacity={0.35}
      />

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Όροι και Προϋποθέσεις Χρήσης</h2>
          
          <div className="space-y-6 text-gray-700">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Γενικές Διατάξεις</h3>
              <p>
                Ο παρών ιστότοπος ανήκει και διαχειρίζεται από το ΚΥΚΛΟΣ Φροντιστήριο. 
                Η χρήση του ιστότοπου συνεπάγεται την αποδοχή των παρόντων όρων χρήσης.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Χρήση του Ιστότοπου</h3>
              <p>
                Ο χρήστης δεσμεύεται να χρησιμοποιεί τον ιστότοπο σύμφωνα με τους νόμους και 
                τους κανόνες που ισχύουν. Απαγορεύεται η χρήση του ιστότοπου για παράνομους 
                ή αθέμιτους σκοπούς.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Δικαιώματα Πνευματικής Ιδιοκτησίας</h3>
              <p>
                Όλο το περιεχόμενο του ιστότοπου (κείμενα, εικόνες, λογότυπα, κ.λπ.) 
                προστατεύεται από το δίκαιο πνευματικής ιδιοκτησίας και ανήκει στο ΚΥΚΛΟΣ Φροντιστήριο.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Αποποίηση Ευθύνης</h3>
              <p>
                Το ΚΥΚΛΟΣ Φροντιστήριο δεν φέρει ευθύνη για τυχόν ζημίες που μπορεί να προκύψουν 
                από τη χρήση ή την αδυναμία χρήσης του ιστότοπου.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Επικοινωνία</h3>
              <p>
                Για οποιαδήποτε ερώτηση σχετικά με τους όρους χρήσης, μπορείτε να επικοινωνήσετε 
                μαζί μας μέσω της φόρμας επικοινωνίας ή στο τηλέφωνο: +30 26810 26671
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Τελευταία ενημέρωση: {new Date().toLocaleDateString('el-GR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

