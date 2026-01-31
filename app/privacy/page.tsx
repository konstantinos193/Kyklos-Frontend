import { Metadata } from "next";
import { AboutBanner } from "@/components/about/about-banner";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generateSEOMetadata({
  title: "Πολιτική Απορρήτου | ΚΥΚΛΟΣ Φροντιστήριο Άρτα",
  description: "Πολιτική απορρήτου και προστασίας προσωπικών δεδομένων του ΚΥΚΛΟΣ Φροντιστήριο Άρτα.",
  path: "/privacy",
  keywords: ["πολιτική απορρήτου", "προστασία δεδομένων", "κύκλος φροντιστήριο"],
});

export default function PrivacyPage() {
  return (
    <main>
      <AboutBanner
        title="Πολιτική Απορρήτου"
        backgroundImage={
          "https://placehold.co/1600x500/E7B109/FFFFFF?text=%CE%A0%CE%BF%CE%BB%CE%B9%CF%84%CE%B9%CE%BA%CE%AE+%CE%91%CF%80%CE%BF%CF%81%CF%81%CE%AE%CF%84%CE%BF%CF%85"
        }
        overlayOpacity={0.35}
      />

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Πολιτική Προστασίας Προσωπικών Δεδομένων</h2>
          
          <div className="space-y-6 text-gray-700">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Γενικές Διατάξεις</h3>
              <p>
                Το ΚΥΚΛΟΣ Φροντιστήριο σέβεται την ιδιωτικότητά σας και δεσμεύεται να προστατεύει 
                τα προσωπικά σας δεδομένα σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων (GDPR).
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Συλλογή Δεδομένων</h3>
              <p>
                Συλλέγουμε προσωπικά δεδομένα μόνο όταν είναι απαραίτητα για την παροχή των υπηρεσιών μας, 
                όπως όνομα, email, τηλέφωνο, και άλλα στοιχεία που παρέχετε εθελοντικά.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Χρήση Δεδομένων</h3>
              <p>
                Τα προσωπικά σας δεδομένα χρησιμοποιούνται αποκλειστικά για:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Την παροχή των εκπαιδευτικών υπηρεσιών μας</li>
                <li>Την επικοινωνία μαζί σας</li>
                <li>Την αποστολή ενημερώσεων και ανακοινώσεων</li>
                <li>Την βελτίωση των υπηρεσιών μας</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Προστασία Δεδομένων</h3>
              <p>
                Εφαρμόζουμε κατάλληλα τεχνικά και οργανωτικά μέτρα για την προστασία των προσωπικών σας 
                δεδομένων από μη εξουσιοδοτημένη πρόσβαση, απώλεια ή καταστροφή.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Δικαιώματα Χρήστη</h3>
              <p>
                Έχετε το δικαίωμα να:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Ζητήσετε πρόσβαση στα προσωπικά σας δεδομένα</li>
                <li>Ζητήσετε διόρθωση ή διαγραφή δεδομένων</li>
                <li>Αντιταχθείτε στην επεξεργασία δεδομένων</li>
                <li>Ζητήσετε περιορισμό της επεξεργασίας</li>
                <li>Ζητήσετε φορητότητα δεδομένων</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">6. Cookies</h3>
              <p>
                Ο ιστότοπος χρησιμοποιεί cookies για τη βελτίωση της εμπειρίας χρήσης. 
                Μπορείτε να διαχειριστείτε τις προτιμήσεις cookies στις ρυθμίσεις του browser σας.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">7. Επικοινωνία</h3>
              <p>
                Για οποιαδήποτε ερώτηση σχετικά με την προστασία των προσωπικών σας δεδομένων, 
                επικοινωνήστε μαζί μας στο: grkyklos-@hotmail.gr ή +30 26810 26671
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

