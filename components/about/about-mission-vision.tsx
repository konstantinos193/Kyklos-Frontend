"use client";

import { Target, Eye, Brain } from "lucide-react";

export function AboutMissionVision() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
              Η <span className="text-[#E7B109]">Αποστολή</span> και η{" "}
              <span className="text-[#CE3B49]">Όραμα</span> μας
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#E7B109] via-[#CE3B49] to-[#D97706] rounded-full mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#E7B109] to-[#D97706] rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Αποστολή</h3>
              </div>
              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p className="text-lg">
                  Η αποστολή μας είναι να προσφέρουμε εξαιρετική εκπαιδευτική ποιότητα που βασίζεται 
                  στην εμπειρία, την αποτελεσματικότητα και την προσωπική προσέγγιση κάθε μαθητή.
                </p>
                <p>
                  Στόχος μας είναι να καλλιεργήσουμε στους μαθητές μας κριτική σκέψη, αυτοπεποίθηση 
                  και όρεξη για συνεχή μάθηση, προετοιμάζοντάς τους για κάθε εκπαιδευτική και 
                  επαγγελματική πρόκληση.
                </p>
                <p>
                  Δεσμευόμαστε να δημιουργήσουμε ένα φιλικό και υποστηρικτικό περιβάλλον όπου κάθε 
                  μαθητής μπορεί να αναπτύξει το δυναμικό του και να πετύχει τους στόχους του.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <Eye className="w-8 h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Όραμα</h3>
              </div>
              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p className="text-lg">
                  Το όραμά μας είναι να είμαστε το προτιμώμενο φροντιστήριο στην περιοχή, αναγνωρισμένο 
                  για την εξαιρετική ποιότητα εκπαίδευσης και την υψηλή επιτυχία των μαθητών μας.
                </p>
                <p>
                  Επιδιώκουμε να αναπτύξουμε μια σύγχρονη εκπαιδευτική φιλοσοφία που συνδυάζει 
                  παραδοσιακές αξίες με καινοτόμες διδακτικές μεθόδους και τεχνολογικά εργαλεία.
                </p>
                <p>
                  Μας ενδιαφέρει να δημιουργήσουμε μια μακροχρόνια σχέση εμπιστοσύνης με τους 
                  μαθητές και τις οικογένειές τους, υποστηρίζοντάς τους σε κάθε στάδιο της 
                  εκπαιδευτικής τους διαδρομής.
                </p>
              </div>
            </div>
          </div>

          {/* Philosophy */}
          <div className="mt-12 lg:mt-16 bg-gradient-to-r from-[#E7B109] via-[#CE3B49] to-[#D97706] rounded-3xl p-8 lg:p-12 text-white shadow-xl">
            <div className="text-center max-w-4xl mx-auto">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6 mx-auto backdrop-blur">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-6">Εκπαιδευτική Φιλοσοφία</h3>
              <p className="text-lg sm:text-xl leading-relaxed text-white/95">
                Πιστεύουμε ότι η εκπαίδευση είναι μια συνεχής διαδικασία ανάπτυξης που 
                υπερβαίνει την απλή μετάδοση γνώσης. Εστιάζουμε στην ανάπτυξη των 
                δεξιοτήτων, της κριτικής σκέψης και της προσωπικότητας κάθε μαθητή, 
                δημιουργώντας ανεξάντλητους προγραμματιστές της επιτυχίας.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

