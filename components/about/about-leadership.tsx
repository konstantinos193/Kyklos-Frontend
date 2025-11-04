"use client";

interface LeadershipMember {
  name: string;
  position: string;
  bio: string;
  achievements: string[];
}

const leadershipData: LeadershipMember = {
  name: "placeholder_name1",
  position: "Διευθύντρια & Ιδρύτρια",
  bio: "Η placeholder_name1 είναι η ιδρύτρια και διευθύντρια του ΚΥΚΛΟΣ Φροντιστηρίου, με πάνω από 25 χρόνια εμπειρίας στον χώρο της εκπαίδευσης. Με πτυχίο Φιλολογίας από το Αριστοτέλειο Πανεπιστήμιο Θεσσαλονίκης και μεταπτυχιακό στην Εκπαιδευτική Μεθοδολογία, έχει βοηθήσει εκατοντάδες μαθητές να πετύχουν τους στόχους τους.",
  achievements: [
    "Ιδρύτρια του ΚΥΚΛΟΣ Φροντιστηρίου (1998)",
    "95% επιτυχία στις Πανελλαδικές εξετάσεις",
    "500+ επιτυχημένοι μαθητές",
    "Συνεχής ανάπτυξη εκπαιδευτικών προγραμμάτων",
    "Συνεργασία με εκπαιδευτικά ιδρύματα"
  ]
};

export function AboutLeadership() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
              Η <span className="text-[#E7B109]">Ηγεσία</span> μας
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#E7B109] via-[#CE3B49] to-[#D97706] rounded-full mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Image Placeholder */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#E7B109] via-[#CE3B49] to-[#D97706] flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center text-white text-6xl font-bold mx-auto mb-4 backdrop-blur-sm">
                      {leadershipData.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <p className="text-white/90 text-sm font-medium">
                      Φωτογραφία προσεχώς
                    </p>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#E7B109] to-[#D97706] rounded-full opacity-20"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-10"></div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-7">
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
                    {leadershipData.name}
                  </h3>
                  <p className="text-xl font-semibold text-[#CE3B49] mb-6">
                    {leadershipData.position}
                  </p>
                  <div className="w-16 h-1 bg-gradient-to-r from-[#E7B109] to-[#D97706] rounded-full"></div>
                </div>

                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p className="text-lg">
                    {leadershipData.bio}
                  </p>
                </div>

                {/* Achievements */}
                <div className="pt-6">
                  <h4 className="text-xl font-bold text-slate-900 mb-4">
                    Σημαντικές Επιτεύξεις
                  </h4>
                  <ul className="space-y-3">
                    {leadershipData.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-[#E7B109] to-[#D97706] rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                          {idx + 1}
                        </div>
                        <span className="text-slate-700 leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Info */}
                <div className="pt-6 border-t border-slate-200">
                  <p className="text-slate-600 mb-2">
                    <strong>Για επικοινωνία με τη διεύθυνση:</strong>
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 text-[#CE3B49] hover:text-[#E7B109] transition-colors font-semibold"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Επικοινωνία
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

