"use client";

interface AboutGoalsProps {
  title?: string;
}

export function AboutGoals({ title = "Βασικός Μας Στόχος" }: AboutGoalsProps) {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 about-area">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <div className="mt-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 about-title">
              {title}
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
      </div>
    </section>
  );
}


