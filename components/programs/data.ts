import { BookIcon, StarIcon, GlobeIcon, ZapIcon } from "@/components/icons";
import { ProgramsSectionData } from "./types";

export const programsData: ProgramsSectionData = {
  header: {
    title: "Τα Προγράμματά μας",
    subtitle: "Εξειδικευμένη Εκπαίδευση",
    description: "Επιλέξτε από τα εξειδικευμένα εκπαιδευτικά προγράμματά μας που σχεδιάστηκαν για να καλύψουν κάθε εκπαιδευτική ανάγκη."
  },
  programs: [
    {
      id: "lykeio",
      title: "Λύκειο",
      description: "Προετοιμασία για Πανελλήνιες εξετάσεις με εξειδικευμένους καθηγητές και σύγχρονα μεθόδους διδασκαλίας.",
      icon: BookIcon,
      gradient: "from-blue-600 to-blue-700",
      features: [
        { name: "Μαθηματικά", description: "Άλγεβρα, Γεωμετρία, Μαθηματική Ανάλυση" },
        { name: "Φυσική", description: "Μηχανική, Ηλεκτρομαγνητισμός, Κβαντική" },
        { name: "Χημεία", description: "Οργανική, Ανόργανη, Φυσικοχημεία" },
        { name: "Βιολογία", description: "Ανθρώπινη Βιολογία, Γενετική, Οικολογία" }
      ],
      price: {
        amount: "€120",
        period: "μήνα"
      },
      duration: "10 μήνες",
      level: "advanced",
      isPopular: true
    },
    {
      id: "gymnasio",
      title: "Γυμνάσιο",
      description: "Ολοκληρωμένη εκπαιδευτική υποστήριξη για όλα τα μαθήματα με προσωποποιημένη προσέγγιση.",
      icon: StarIcon,
      gradient: "from-emerald-600 to-emerald-700",
      features: [
        { name: "Μαθηματικά", description: "Αλγεβρικές εξισώσεις και γεωμετρία" },
        { name: "Φυσικές Επιστήμες", description: "Φυσική, Χημεία, Βιολογία" },
        { name: "Γλώσσα", description: "Ελληνική γλώσσα και λογοτεχνία" },
        { name: "Ιστορία", description: "Ελληνική και παγκόσμια ιστορία" }
      ],
      price: {
        amount: "€90",
        period: "μήνα"
      },
      duration: "9 μήνες",
      level: "intermediate"
    },
    {
      id: "foreign-languages",
      title: "Ξένες Γλώσσες",
      description: "Αγγλικά, Γερμανικά, Γαλλικά με πιστοποιημένους εκπαιδευτές και σύγχρονα εργαλεία.",
      icon: GlobeIcon,
      gradient: "from-purple-600 to-purple-700",
      features: [
        { name: "Αγγλικά", description: "Cambridge, IELTS, TOEFL προετοιμασία" },
        { name: "Γερμανικά", description: "Goethe-Zertifikat προετοιμασία" },
        { name: "Γαλλικά", description: "DELF, DALF προετοιμασία" },
        { name: "Πιστοποιήσεις", description: "Διεθνείς πιστοποιήσεις γλωσσομάθειας" }
      ],
      price: {
        amount: "€80",
        period: "μήνα"
      },
      duration: "6-12 μήνες",
      level: "all"
    },
    {
      id: "special-programs",
      title: "Ειδικά Προγράμματα",
      description: "Εντατικά προγράμματα και ιδιαίτερα μαθήματα προσαρμοσμένα στις ανάγκες κάθε μαθητή.",
      icon: ZapIcon,
      gradient: "from-amber-600 to-amber-700",
      features: [
        { name: "Εντατικά", description: "Συμπυκνωμένα προγράμματα" },
        { name: "Ιδιαίτερα", description: "Προσωποποιημένη διδασκαλία" },
        { name: "Ομαδικά", description: "Μικρές ομάδες 3-5 ατόμων" },
        { name: "Online", description: "Διαδικτυακά μαθήματα" }
      ],
      price: {
        amount: "€150",
        period: "μήνα"
      },
      duration: "Προσαρμοζόμενη",
      level: "all",
      isPopular: false
    }
  ],
  cta: {
    label: "Δείτε Όλα τα Προγράμματα",
    href: "#all-programs"
  },
  background: {
    gradient: "bg-gradient-to-b from-slate-50 to-white"
  }
};
