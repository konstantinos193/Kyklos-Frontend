"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

const faqData: FAQItem[] = [
  {
    question: "Ποια είναι τα ωράρια λειτουργίας του φροντιστηρίου;",
    answer: "Το φροντιστήριο λειτουργεί Δευτέρα έως Παρασκευή από τις 09:00 έως τις 21:00 και το Σάββατο από τις 10:00 έως τις 15:00. Κατά τη διάρκεια των εξετάσεων, τα ωράρια μπορεί να επεκταθούν.",
    category: "Γενικά"
  },
  {
    question: "Ποια τμήματα προσφέρονται;",
    answer: "Προσφέρουμε τμήματα για όλες τις τάξεις του Γυμνασίου και Λυκείου, καθώς και για ΕΠΑΛ. Εξειδικευόμαστε σε Ελληνική Γλώσσα & Λογοτεχνία, Μαθηματικά, Φυσική, Χημεία και Βιολογία.",
    category: "Προγράμματα"
  },
  {
    question: "Πόσα άτομα υπάρχουν ανά τμήμα;",
    answer: "Βασική αρχή μας είναι η προσωπική προσέγγιση. Τα τμήματα είναι μικρά (5-12 μαθητές) ώστε να εξασφαλίσουμε προσωπική φροντίδα για κάθε μαθητή.",
    category: "Προγράμματα"
  },
  {
    question: "Προετοιμάζετε για τις Πανελλαδικές εξετάσεις;",
    answer: "Ναι! Έχουμε ειδικά προγράμματα προετοιμασίας για τις Πανελλαδικές εξετάσεις με υψηλά ποσοστά επιτυχίας. Προσφέρουμε συστηματική προετοιμασία, σειρά προσομοιώσεων και υποστήριξη σε κάθε στάδιο.",
    category: "Πανελλαδικές"
  },
  {
    question: "Υπάρχουν δυνατότητες φοίτησης μόνο για συγκεκριμένα μαθήματα;",
    answer: "Ναι, μπορείτε να επιλέξετε να παρακολουθήσετε μόνο τα μαθήματα που σας ενδιαφέρουν. Υπάρχει ευελιξία στην οργάνωση των ωρών.",
    category: "Προγράμματα"
  },
  {
    question: "Πώς μπορώ να εγγραφώ;",
    answer: "Μπορείτε να επικοινωνήσετε μαζί μας τηλεφωνικά στο +30 26810 26671, μέσω email στο grkyklos-@hotmail.gr, ή να συμπληρώσετε τη φόρμα επικοινωνίας στην ιστοσελίδα μας. Θα κανονίσουμε συνάντηση για να συζητήσουμε τις ανάγκες σας.",
    category: "Εγγραφή"
  },
  {
    question: "Υπάρχουν επιπλέον υπηρεσίες;",
    answer: "Ναι, προσφέρουμε ψηφιακή βιβλιοθήκη, δανειστική βιβλιοθήκη, εποπτικά μέσα διδασκαλίας, επαγγελματικό προσανατολισμό και καθοδήγηση σε θέματα σπουδών και επαγγελμάτων.",
    category: "Υπηρεσίες"
  },
  {
    question: "Ενημερώνετε τους γονείς για την πρόοδο των μαθητών;",
    answer: "Ναι, θεωρούμε σημαντική τη συνεργασία με τους γονείς. Υπάρχει συνεχής ενημέρωση για την πρόοδο, τις επιδόσεις και τη συμμετοχή των μαθητών μέσω τακτικών αναφορών.",
    category: "Γονείς"
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["all", ...Array.from(new Set(faqData.map(faq => faq.category).filter((cat): cat is string => Boolean(cat))))];

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch = searchTerm === "" || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Συχνές <span className="text-[#E7B109]">Ερωτήσεις</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Βρείτε απαντήσεις σε συχνές ερωτήσεις σχετικά με το φροντιστήριο μας
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Αναζήτηση σε FAQ..."
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="mb-6 flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-[#E7B109] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category === "all" ? "Όλα" : category}
              </button>
            ))}
          </div>
        )}

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Δεν βρέθηκαν αποτελέσματα
            </div>
          ) : (
            filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-[#E7B109] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 py-4 bg-white border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Δεν βρήκατε την απάντηση που ψάχνετε;
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#E7B109] text-white rounded-lg font-semibold hover:bg-[#D97706] transition-colors"
          >
            Επικοινωνήστε μαζί μας
          </a>
        </div>
      </div>
    </section>
  );
}

