"use client";

import { GraduationCap, Handshake, TrendingUp, Star, Heart, FlaskConical } from "lucide-react";

interface Value {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const values: Value[] = [
  {
    icon: GraduationCap,
    title: "Ποιότητα",
    description: "Προσφέρουμε την καλύτερη δυνατή εκπαιδευτική ποιότητα με σύγχρονες μεθόδους και εξειδικευμένο προσωπικό."
  },
  {
    icon: Handshake,
    title: "Εμπιστοσύνη",
    description: "Καλλιεργούμε μακροχρόνιες σχέσεις εμπιστοσύνης με τους μαθητές και τις οικογένειές τους."
  },
  {
    icon: TrendingUp,
    title: "Αποτελεσματικότητα",
    description: "Εστιάζουμε στην απόκτηση αξιόπιστων αποτελεσμάτων που βοηθούν τους μαθητές να πετύχουν τους στόχους τους."
  },
  {
    icon: Star,
    title: "Αριστεία",
    description: "Παρακινούμε την προσπάθεια για αριστεία και συνεχή βελτίωση σε κάθε επίπεδο."
  },
  {
    icon: Heart,
    title: "Φροντίδα",
    description: "Προσφέρουμε προσωπική φροντίδα και υποστήριξη σε κάθε μαθητή, σέβοντας την ατομικότητά του."
  },
  {
    icon: FlaskConical,
    title: "Καινοτομία",
    description: "Χρησιμοποιούμε σύγχρονα εργαλεία και μεθόδους διδασκαλίας για να ενισχύσουμε την εκπαιδευτική εμπειρία."
  }
];

export function AboutValues() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-slate-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
              Οι <span className="text-[#E7B109]">Αξίες</span> και{" "}
              <span className="text-[#CE3B49]">Αρχές</span> μας
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#E7B109] via-[#CE3B49] to-[#D97706] rounded-full mx-auto mb-6"></div>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Οι αξίες μας οδηγούν κάθε απόφασή μας και καθορίζουν τον τρόπο που 
              προσεγγίζουμε την εκπαίδευση και την υποστήριξη των μαθητών μας.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-[#E7B109]/50 group"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Icon */}
                  <div className="w-20 h-20 bg-gradient-to-br from-[#E7B109] via-[#CE3B49] to-[#D97706] rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-10 h-10" />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-900">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Commitment Statement */}
          <div className="mt-12 lg:mt-16 bg-gradient-to-r from-[#E7B109] via-[#CE3B49] to-[#D97706] rounded-3xl p-8 lg:p-12 text-white shadow-xl">
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6">
                Η Δέσμευσή μας
              </h3>
              <p className="text-lg sm:text-xl leading-relaxed text-white/95">
                Δεσμευόμαστε να παραμείνουμε πιστοί στις αξίες μας και να 
                συνεχίσουμε να προσφέρουμε εκπαιδευτική υπηρεσία υψηλής 
                ποιότητας που βοηθά τους μαθητές να πετύχουν τους στόχους τους 
                και να αναπτύξουν το πλήρες δυναμικό τους.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

