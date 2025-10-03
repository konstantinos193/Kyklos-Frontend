import { ProgramData, ProgramLevel, Subject } from "./types";

export const programsData: ProgramData = {
  title: "Τι προσφέρουμε",
  subtitle: "Οργανωμένα τμήματα Γυμνασίου, Λυκείου & ΕΠΑΛ - Στοχευμένη προετοιμασία για Πανελλαδικές εξετάσεις - Έμπειρο και εξειδικευμένο διδακτικό προσωπικό",
  levels: [
    {
      id: "gymnasium-greek",
      name: "Ελληνική Γλώσσα - Γυμνάσιο",
      description: "Βασικές αρχές ελληνικής γλώσσας και λογοτεχνίας",
      duration: "3 έτη",
      subjects: [
        {
          name: "Α' Γυμνασίου",
          hours: 2,
          description: "Βασική γραμματική και ανάγνωση",
          icon: "📚"
        },
        {
          name: "Β' Γυμνασίου", 
          hours: 3,
          description: "Σύνταξη και λογοτεχνική ανάλυση",
          icon: "📖"
        },
        {
          name: "Γ' Γυμνασίου",
          hours: 3,
          description: "Σύνθεση και προετοιμασία για Λύκειο",
          icon: "✍️"
        }
      ],
      totalHours: 8,
      color: "blue"
    },
    {
      id: "lyceum-greek",
      name: "Ελληνική Γλώσσα - Λύκειο",
      description: "Εξειδικευμένη εκπαίδευση για πανελλήνιες εξετάσεις",
      duration: "3 έτη",
      subjects: [
        {
          name: "Α' Λυκείου",
          hours: 2,
          description: "Έκθεση και λογοτεχνία",
          icon: "✍️"
        },
        {
          name: "Β' Λυκείου",
          hours: 2,
          description: "Αρχαία ελληνική γλώσσα",
          icon: "🏛️"
        },
        {
          name: "Γ' Λυκείου",
          hours: 2,
          description: "Προετοιμασία πανελληνίων",
          icon: "🎓"
        }
      ],
      totalHours: 6,
      color: "yellow"
    },
    {
      id: "mathematics",
      name: "Μαθηματικά",
      description: "Συστηματική εκπαίδευση μαθηματικών",
      duration: "6 έτη",
      subjects: [
        {
          name: "Γυμνάσιο",
          hours: 3,
          description: "Βασικά μαθηματικά και γεωμετρία",
          icon: "📐"
        },
        {
          name: "Α' Λυκείου",
          hours: 3,
          description: "Άλγεβρα και γεωμετρία",
          icon: "🔢"
        },
        {
          name: "Β' Λυκείου",
          hours: 4,
          description: "Μαθηματικά κατεύθυνσης",
          icon: "📊"
        }
      ],
      totalHours: 10,
      color: "green"
    },
    {
      id: "sciences",
      name: "Θετικές Επιστήμες",
      description: "Φυσική, Χημεία, Βιολογία",
      duration: "6 έτη",
      subjects: [
        {
          name: "Φυσική",
          hours: 2,
          description: "Βασικές αρχές και πειράματα",
          icon: "⚡"
        },
        {
          name: "Χημεία",
          hours: 1,
          description: "Οργανική και ανόργανη χημεία",
          icon: "🧪"
        },
        {
          name: "Βιολογία",
          hours: 1,
          description: "Επιστήμες υγείας",
          icon: "🧬"
        }
      ],
      totalHours: 4,
      color: "purple"
    }
  ],
  features: [
    {
      title: "Παρουσία και εμπειρία 30+ χρόνων στην Άρτα",
      description: "Μεγάλη εμπειρία και γνώση του τοπικού εκπαιδευτικού περιβάλλοντος",
      icon: "🏛️"
    },
    {
      title: "Μικρά τμήματα – Μεγάλη υποστήριξη",
      description: "Προσωπική προσοχή σε κάθε μαθητή με μικρά τμήματα",
      icon: "👥"
    },
    {
      title: "Υψηλά ποσοστά επιτυχίας στις Πανελλαδικές",
      description: "Αποδεδειγμένα αποτελέσματα στις πανελλήνιες εξετάσεις",
      icon: "🏆"
    },
    {
      title: "Ζεστό και αξιόπιστο μαθησιακό περιβάλλον",
      description: "Σημειώσεις & υλικό προσαρμοσμένο στις ανάγκες των μαθημάτων - Προσωπική καθοδήγηση και συνεχής ενημέρωση γονέων",
      icon: "🤝"
    }
  ],
  cta: {
    label: "Επικοινωνήστε μαζί μας και γίνετε κι εσείς μέρος της επιτυχημένης μας πορείας!",
    href: "/contact",
    description: "Για περισσότερα από 30 χρόνια στην Άρτα, το φροντιστήριό μας στέκεται δίπλα στους μαθητές"
  }
};