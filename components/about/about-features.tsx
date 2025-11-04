"use client";

import Image from "next/image";

interface FeatureItem {
  icon: string;
  text: string;
}

interface AboutFeaturesProps {
  imageUrl?: string;
  features?: FeatureItem[];
}

const defaultFeatures: FeatureItem[] = [
  { icon: "📚", text: "Οργανωμένη και συστηματική αφομοίωση της γνώσης σε κλειστά ομοιογενή τμήματα" },
  { icon: "⏰", text: "Έμφαση στη κάλυψη των μαθησιακών κενών με πρόσθετες διδακτικές ώρες" },
  { icon: "📊", text: "Άμεση εποπτεία του μαθητή και αυστηρός έλεγχος της επίδοσης" },
  { icon: "💻", text: "Στήριξη της διδακτικής με σύγχρονα εποπτικά μέσα (Η/Υ, Projector)" },
  { icon: "🏢", text: "Παραμονή του μαθητή σε υπερσύγχρονο, ευχάριστο φιλικό περιβάλλον" },
  { icon: "🎯", text: "Ενημέρωση και καθοδήγηση για θέματα επαγγελματικού προσανατολισμού" }
];

export function AboutFeatures({
  imageUrl = "/building/0-02-05-478c0937fdff63e4ab45201a399a1b1c3dad0c2a14c4cf8b65738dd77edfc916_acfb2c2f26f11734.jpg",
  features = defaultFeatures
}: AboutFeaturesProps) {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-slate-200 to-slate-100">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left image */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src={imageUrl} 
                  alt="ΚΥΚΛΟΣ Κτίριο" 
                  fill
                  className="object-cover" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  quality={90}
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#E7B109] to-[#D97706] rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-10"></div>
            </div>
          </div>

          {/* Features content */}
          <div className="lg:col-span-7">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                  Γιατί να Επιλέξετε το <span className="text-[#CE3B49]">ΚΥΚΛΟΣ</span>;
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-[#E7B109] via-[#CE3B49] to-[#D97706] rounded-full"></div>
                <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                  Η προσέγγισή μας βασίζεται σε αποδεδειγμένες μεθόδους και σύγχρονα εργαλεία 
                  για να εξασφαλίσουμε την επιτυχία κάθε μαθητή.
                </p>
              </div>

              {/* Features grid */}
              <div className="grid sm:grid-cols-2 gap-6">
                {features.map((item, idx) => (
                  <div key={idx} className="group">
                    <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-[#CE3B49]/20">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E7B109] via-[#CE3B49] to-[#D97706] flex items-center justify-center text-white text-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                          {item.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-700 leading-relaxed text-sm group-hover:text-slate-900 transition-colors duration-300">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-4">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E7B109] via-[#CE3B49] to-[#D97706] hover:from-[#D97706] hover:via-[#B45309] hover:to-[#CE3B49] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Μάθετε Περισσότερα
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


