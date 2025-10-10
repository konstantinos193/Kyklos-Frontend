import { BiologySections } from '@/components/curriculum/biology-sections';
import { TeachersList } from '@/components/curriculum/teachers-list';
import { biologyTeachers } from '@/components/curriculum/biology-teachers-data';

export default function BiologyPage() {
  return (
    <main className="relative">
      <header className="border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Βιολογία</h1>
            <div className="mt-3 h-1 w-20 bg-gradient-to-r from-[#CF3B49] to-[#E7B109] rounded-full" />
            <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl">
              Κυτταρική βιολογία, Γενετική, Οικολογία — μεθοδική προετοιμασία και έμφαση στη λύση προβλημάτων.
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-8 space-y-8">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:p-7 shadow-sm">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Σύνοψη</h2>
                <div className="mt-2 h-1 w-12 bg-gradient-to-r from-[#CF3B49] to-[#E7B109] rounded-full" />
              </div>
              <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                Το μάθημα καλύπτει θεμελιώδεις έννοιες και αρχές της βιολογίας για όλες τις τάξεις. Δίνεται έμφαση στην κατανόηση των βιολογικών φαινομένων, στη μελέτη των οργανισμών και στην επίλυση προβλημάτων.
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:p-7 shadow-sm">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Πρόγραμμα Ωρών</h2>
                <div className="mt-2 h-1 w-12 bg-gradient-to-r from-[#CF3B49] to-[#E7B109] rounded-full" />
              </div>
              <div className="mt-5">
                <BiologySections />
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:p-7 shadow-sm">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Ενότητες</h2>
                <div className="mt-2 h-1 w-12 bg-gradient-to-r from-[#CF3B49] to-[#E7B109] rounded-full" />
              </div>
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 sm:p-5">
                  <h3 className="font-semibold text-blue-900 mb-3">Κυτταρική Βιολογία</h3>
                  <ul className="text-sm text-blue-800 space-y-1.5">
                    <li>• Δομή & λειτουργία κυττάρων</li>
                    <li>• Μέταβολισμός & ενέργεια</li>
                    <li>• Κυτταρικός κύκλος</li>
                    <li>• Αναπαραγωγή & ανάπτυξη</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-green-200 bg-green-50 p-4 sm:p-5">
                  <h3 className="font-semibold text-green-900 mb-3">Γενετική & Εξέλιξη</h3>
                  <ul className="text-sm text-green-800 space-y-1.5 leading-relaxed">
                    <li>• Κληρονομικότητα & γονίδια</li>
                    <li>• DNA & πρωτεΐνες</li>
                    <li>• Εξέλιξη & φυλογενετική</li>
                    <li>• Βιοποικιλότητα & διατήρηση</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-purple-200 bg-purple-50 p-4 sm:p-5">
                  <h3 className="font-semibold text-purple-900 mb-3">Οικολογία & Συστήματα</h3>
                  <ul className="text-sm text-purple-800 space-y-1.5">
                    <li>• Οικοσυστήματα & αλυσίδες</li>
                    <li>• Αναπαραγωγή & αναπαραγωγή</li>
                    <li>• Ανοσολογία & υγεία</li>
                    <li>• Βιοτεχνολογία</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:p-7 shadow-sm">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Στόχοι</h2>
                <div className="mt-2 h-1 w-12 bg-gradient-to-r from-[#CF3B49] to-[#E7B109] rounded-full" />
              </div>
              <ul className="mt-4 space-y-2 text-sm sm:text-base text-slate-700">
                <li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#CF3B49]" />Κατανόηση βιολογικών νόμων και αρχών</li>
                <li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#CF3B49]" />Επίλυση προβλημάτων με επιστημονικές μεθόδους</li>
                <li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#CF3B49]" />Εξοικείωση με πειραματικές τεχνικές</li>
              </ul>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-6 lg:space-y-7 lg:sticky lg:top-24 self-start">
            <TeachersList title="Διδάσκοντες" teachers={biologyTeachers} />
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:p-7 shadow-sm">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900">Υλικό & Πηγές</h3>
              <ul className="mt-3 list-disc list-inside text-slate-700 space-y-1 text-sm sm:text-base">
                <li>Σημειώσεις θεωρίας ανά ενότητα</li>
                <li>Φύλλα ασκήσεων με ενδεικτικές λύσεις</li>
                <li>Πειραματικές ασκήσεις</li>
                <li>Τεστ προσομοίωσης</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:p-7 shadow-sm">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900">Επικοινωνία</h3>
              <p className="mt-3 text-sm sm:text-base text-slate-700">
                Θέλεις να μάθεις περισσότερα ή να δηλώσεις συμμετοχή; Επικοινώνησε μαζί μας.
              </p>
              <div className="mt-4">
                <a href="#contact" className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#CE3B49] to-[#FF6B6B] hover:from-[#B91C1C] hover:to-[#CE3B49]">
                  Επικοινωνία
                </a>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}