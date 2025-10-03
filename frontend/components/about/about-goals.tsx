"use client";

interface AboutGoalsProps {
  title?: string;
}

export function AboutGoals({ title = "Βασικός Στόχος" }: AboutGoalsProps) {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 about-area">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Content */}
          <div className="lg:col-span-5">
            <div className="mt-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 about-title">
                {title} <span className="text-[#E7B109]">Κύκλος</span>
              </h2>
              <span className="block h-1 w-16 bg-gradient-to-r from-[#E7B109] to-[#D97706] rounded-full mt-4 line" />
              <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
                <p>
                  Η σταδιακή οικοδόμηση της γνώσης και ο εμπλουτισμός της ώστε να
                  επιτευχθεί η εύκολη αφομοίωση της ύλης στη Δευτεροβάθμια Εκπαίδευση
                  και η σίγουρη επιτυχία στις επιλεγμένες σχολές των ΑΕΙ.
                </p>
                <p>
                  Η ευρύτερη εγκυκλοπαιδική μόρφωση των μαθητών μέσα από σύγχρονες
                  διδακτικές πρακτικές, επιλεγμένα συγγράμματα και ψηφιακά εργαλεία
                  όπως η ηλεκτρονική και δανειστική βιβλιοθήκη μας.
                </p>
                <p>
                  Η ανάπτυξη παράπλευρων δραστηριοτήτων που αξιοποιούν δημιουργικά τον
                  ελεύθερο χρόνο, ενισχύοντας κριτική σκέψη, γλωσσική επάρκεια και
                  προσωπική αυτοπεποίθηση.
                </p>
                <p>
                  Η έγκαιρη και στοχευμένη υποστήριξη στον Επαγγελματικό
                  Προσανατολισμό με εξατομικευμένη συμβουλευτική και ενημερωτικές
                  δράσεις για σπουδές και επαγγέλματα.
                </p>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="lg:col-span-7">
            <div className="relative mt-8 lg:mt-0 about-image">
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4 sm:space-y-6">
                  <img src="https://placehold.co/800x500/E7B109/FFFFFF?text=ΚΥΚΛΟΣ+Τάξη" alt="Μαθητές στην τάξη" className="rounded-2xl shadow-lg object-cover w-full h-40 sm:h-48 lg:h-56 single-image image-1" />
                  <img src="https://placehold.co/800x500/0EA5E9/FFFFFF?text=Καθηγητές" alt="Καθηγητής" className="rounded-2xl shadow-lg object-cover w-full h-40 sm:h-48 lg:h-56 single-image image-3" />
                </div>
                <div className="space-y-4 sm:space-y-6 mt-6">
                  <img src="https://placehold.co/800x500/10B981/FFFFFF?text=Βιβλιοθήκη" alt="Βιβλιοθήκη" className="rounded-2xl shadow-lg object-cover w-full h-40 sm:h-48 lg:h-56 single-image image-2" />
                  <img src="https://placehold.co/800x500/374151/FFFFFF?text=ΚΥΚΛΟΣ+Edu" alt="ΚΥΚΛΟΣ" className="rounded-2xl shadow-lg object-cover w-full h-40 sm:h-48 lg:h-56 single-image image-4" />
                </div>
              </div>

              {/* Floating icons */}
              <div className="hidden md:block">
                <div className="about-icon icon-1 absolute -top-6 left-6 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-md">
                  <span className="text-xl">🎯</span>
                </div>
                <div className="about-icon icon-2 absolute top-1/3 -right-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-md">
                  <span className="text-xl">📚</span>
                </div>
                <div className="about-icon icon-3 absolute bottom-10 left-1/3 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-md">
                  <span className="text-xl">🧭</span>
                </div>
                <div className="about-icon icon-4 absolute -bottom-4 right-8 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-md">
                  <span className="text-xl">🧠</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


