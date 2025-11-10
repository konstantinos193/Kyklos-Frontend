import { notFound } from 'next/navigation';
import { slugToGrade, getAllGradeSlugs } from '@/utils/grade-slug';
import { Metadata } from 'next';

export function generateStaticParams() {
  const slugs = getAllGradeSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const grade = slugToGrade(slug);
  
  if (!grade) {
    return {
      title: 'Τάξη | ΚΥΚΛΟΣ Φροντιστήριο Άρτα',
    };
  }

  return {
    title: `${grade} | ΚΥΚΛΟΣ Φροντιστήριο Άρτα`,
    description: `Πρόγραμμα σπουδών για την ${grade}. Εξειδικευμένη προετοιμασία με έμπειρους καθηγητές και σύγχρονα εκπαιδευτικά υλικά.`,
    keywords: [
      grade.toLowerCase(),
      'φροντιστήριο άρτα',
      'πρόγραμμα σπουδών',
      'εκπαίδευση',
      'μαθήματα',
    ],
    openGraph: {
      title: `${grade} | ΚΥΚΛΟΣ Φροντιστήριο Άρτα`,
      description: `Πρόγραμμα σπουδών για την ${grade}. Εξειδικευμένη προετοιμασία με έμπειρους καθηγητές.`,
      images: ['/logo.png'],
    },
  };
}

export default async function ClassPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const grade = slugToGrade(slug);

  if (!grade) {
    notFound();
  }

  // Determine if it's Lykeio or Gymnasio
  const isLykeio = grade.includes('Λυκείου');
  const isGymnasio = grade.includes('Γυμνασίου');

  // Common subjects for all grades
  const commonSubjects = [
    'Ελληνική Γλώσσα',
    'Μαθηματικά',
    'Αγγλικά',
  ];

  // Subjects specific to Lykeio
  const lykeioSubjects = [
    'Άλγεβρα',
    'Γεωμετρία',
    'Φυσική',
    'Χημεία',
    'Βιολογία',
    'Ιστορία',
    'Φιλοσοφία',
    'Αρχαία Ελληνικά',
    'Λατινικά',
    'Οικονομικά',
    'Πληροφορική',
  ];

  // Subjects specific to Gymnasio
  const gymnasioSubjects = [
    'Γεωμετρία',
    'Φυσική',
    'Χημεία',
    'Βιολογία',
    'Ιστορία',
    'Αρχαία Ελληνικά',
    'Γεωγραφία',
    'Θρησκευτικά',
  ];

  const allSubjects = isLykeio 
    ? [...commonSubjects, ...lykeioSubjects]
    : isGymnasio
    ? [...commonSubjects, ...gymnasioSubjects]
    : commonSubjects;

  return (
    <main className="relative min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="border-b border-gray-200 bg-white">
        <div className="px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              {grade}
            </h1>
            <div className="mt-3 h-1 w-20 bg-gradient-to-r from-[#CF3B49] to-[#E7B109] rounded-full" />
            <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl">
              Εξειδικευμένο πρόγραμμα σπουδών για την {grade}. Προετοιμασία με έμπειρους καθηγητές και σύγχρονα εκπαιδευτικά υλικά.
            </p>
          </div>
        </div>
      </header>

      {/* Content Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Program Overview */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:p-7 shadow-sm">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Πρόγραμμα Σπουδών</h2>
                <div className="mt-2 h-1 w-12 bg-gradient-to-r from-[#CF3B49] to-[#E7B109] rounded-full" />
              </div>
              <div className="mt-5">
                <p className="text-sm sm:text-base text-slate-700 mb-4">
                  Το πρόγραμμα σπουδών για την {grade} περιλαμβάνει όλα τα απαιτούμενα μαθήματα με σύγχρονη μεθοδολογία και εξατομικευμένη προσέγγιση.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {allSubjects.map((subject, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-blue-200 bg-blue-50 p-4 hover:bg-blue-100 transition-colors"
                    >
                      <h3 className="font-semibold text-blue-900">{subject}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Goals Section */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:p-7 shadow-sm">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Στόχοι</h2>
                <div className="mt-2 h-1 w-12 bg-gradient-to-r from-[#CF3B49] to-[#E7B109] rounded-full" />
              </div>
              <ul className="mt-4 space-y-2 text-sm sm:text-base text-slate-700">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#CF3B49]" />
                  Στέρεη κατανόηση των βασικών εννοιών κάθε μαθήματος
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#CF3B49]" />
                  Ανάπτυξη κριτικής σκέψης και αναλυτικών δεξιοτήτων
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#CF3B49]" />
                  Εξοικείωση με τις εξεταστικές απαιτήσεις
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#CF3B49]" />
                  Προετοιμασία για τις Πανελλαδικές Εξετάσεις
                </li>
              </ul>
            </section>

            {/* Methodology Section */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:p-7 shadow-sm">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Μεθοδολογία</h2>
                <div className="mt-2 h-1 w-12 bg-gradient-to-r from-[#CF3B49] to-[#E7B109] rounded-full" />
              </div>
              <div className="mt-5 space-y-4 text-sm sm:text-base text-slate-700">
                <p>
                  Η μεθοδολογία μας βασίζεται σε σύγχρονες εκπαιδευτικές προσεγγίσεις που ενισχύουν την ενεργό συμμετοχή των μαθητών και την προσωποποιημένη μάθηση.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                    <h3 className="font-semibold text-green-900 mb-2">Σύγχρονα Υλικά</h3>
                    <p className="text-sm text-green-800">
                      Χρήση σύγχρονων εκπαιδευτικών υλικών και τεχνολογιών
                    </p>
                  </div>
                  <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
                    <h3 className="font-semibold text-purple-900 mb-2">Εξατομικευμένη Προσέγγιση</h3>
                    <p className="text-sm text-purple-800">
                      Προσαρμογή της διδασκαλίας στις ανάγκες κάθε μαθητή
                    </p>
                  </div>
                  <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
                    <h3 className="font-semibold text-orange-900 mb-2">Πρακτική Εφαρμογή</h3>
                    <p className="text-sm text-orange-800">
                      Έμφαση στην πρακτική εφαρμογή και επίλυση προβλημάτων
                    </p>
                  </div>
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                    <h3 className="font-semibold text-red-900 mb-2">Συνεχής Αξιολόγηση</h3>
                    <p className="text-sm text-red-800">
                      Κανονική αξιολόγηση και ανατροφοδότηση για την πρόοδο
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6 lg:space-y-7 lg:sticky lg:top-24 self-start">
            {/* Materials Section */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:p-7 shadow-sm">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900">Υλικό & Πηγές</h3>
              <ul className="mt-3 list-disc list-inside text-slate-700 space-y-1 text-sm sm:text-base">
                <li>Σημειώσεις θεωρίας ανά ενότητα</li>
                <li>Φύλλα ασκήσεων με ενδεικτικές λύσεις</li>
                <li>Τεστ προσομοίωσης</li>
                <li>Προηγούμενα θέματα εξετάσεων</li>
                <li>Ψηφιακά εκπαιδευτικά υλικά</li>
              </ul>
            </section>

            {/* Contact Section */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:p-7 shadow-sm">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900">Επικοινωνία</h3>
              <p className="mt-3 text-sm sm:text-base text-slate-700">
                Θέλεις να μάθεις περισσότερα για το πρόγραμμα σπουδών της {grade} ή να δηλώσεις συμμετοχή; Επικοινώνησε μαζί μας.
              </p>
              <div className="mt-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#CE3B49] to-[#FF6B6B] hover:from-[#B91C1C] hover:to-[#CE3B49] transition-all duration-200 w-full"
                >
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

