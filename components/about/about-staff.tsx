"use client";

interface StaffMember {
  name: string;
  role: string;
  qualifications: string[];
  experience: string;
  specialization?: string;
}

const staffMembers: StaffMember[] = [
  {
    name: "placeholder_name1",
    role: "Διευθύντρια & Καθηγήτρια Ελληνικής Γλώσσας",
    qualifications: [
      "Πτυχίο Φιλολογίας ΑΠΘ",
      "Μεταπτυχιακό στην Εκπαιδευτική Μεθοδολογία",
      "25+ έτη εμπειρίας"
    ],
    experience: "25+ χρόνια",
    specialization: "Πανελλαδικές Εξετάσεις - Γυμνάσιο & Λύκειο"
  },
  {
    name: "placeholder_name2",
    role: "Καθηγητής Ελληνικής Γλώσσας",
    qualifications: [
      "Πτυχίο Φιλολογίας Πανεπιστημίου Αθηνών",
      "Ειδικότητα στη Λογοτεχνία",
      "20+ έτη εμπειρίας"
    ],
    experience: "20+ χρόνια",
    specialization: "Λυκειακή Εκπαίδευση & Πανελλαδικές"
  },
  {
    name: "placeholder_name3",
    role: "Καθηγήτρια Ελληνικής Γλώσσας",
    qualifications: [
      "Πτυχίο Φιλολογίας ΑΠΘ",
      "Ειδικότητα στη Γλώσσα",
      "15+ έτη εμπειρίας"
    ],
    experience: "15+ χρόνια",
    specialization: "Γυμνασιακή Εκπαίδευση"
  }
];

export function AboutStaff() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
              Το <span className="text-[#E7B109]">Εκπαιδευτικό</span> μας{" "}
              <span className="text-[#CE3B49]">Προσωπικό</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#E7B109] via-[#CE3B49] to-[#D97706] rounded-full mx-auto mb-6"></div>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Οι καθηγητές μας είναι εξειδικευμένοι επαγγελματίες με αποδεδειγμένη εμπειρία 
              και βαθιά γνώση της εκπαιδευτικής διαδικασίας.
            </p>
          </div>

          {/* Staff Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {staffMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-[#E7B109]/50 group"
              >
                {/* Avatar */}
                <div className="mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#E7B109] via-[#CE3B49] to-[#D97706] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg mx-auto group-hover:scale-110 transition-transform duration-300">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>

                {/* Info */}
                <div className="text-center space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-sm font-semibold text-[#CE3B49] mb-1">
                      {member.role}
                    </p>
                    {member.specialization && (
                      <p className="text-xs text-slate-600 italic">
                        {member.specialization}
                      </p>
                    )}
                  </div>

                  {/* Qualifications */}
                  <div className="space-y-2 pt-4 border-t border-slate-200">
                    <p className="text-sm font-semibold text-slate-700 mb-3">
                      Προσόντα:
                    </p>
                    <ul className="space-y-2 text-left">
                      {member.qualifications.map((qual, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="text-[#E7B109] mt-1">✓</span>
                          <span>{qual}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Experience Badge */}
                  <div className="pt-4">
                    <span className="inline-block bg-gradient-to-r from-[#E7B109] to-[#D97706] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                      {member.experience} εμπειρία
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-12 lg:mt-16 bg-white rounded-2xl p-8 lg:p-10 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-[#E7B109] mb-2">25+</div>
                <p className="text-slate-600">Έτη Συλλογικής Εμπειρίας</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#CE3B49] mb-2">95%</div>
                <p className="text-slate-600">Επιτυχία στις Πανελλαδικές</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#D97706] mb-2">500+</div>
                <p className="text-slate-600">Επιτυχημένοι Μαθητές</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

