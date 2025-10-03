import { ChevronRightIcon, StudentsIcon, BuildingIcon, AwardIcon, BookOpenIcon } from "@/components/icons";
import { HeroData } from "./types";

export const heroData: HeroData = {
  slides: [],
  title: {
    main: "ΚΥΚΛΟΣ Εκπαίδευση",
    subtitle: "Εξειδικευμένο Φροντιστήριο για Γυμνάσιο & Λύκειο"
  },
  description: {
    text: "Το ΚΥΚΛΟΣ Φροντιστήριο προσφέρει ποιοτική εκπαίδευση σε μαθητές Γυμνασίου και Λυκείου, με προετοιμασία για τις Πανελλαδικές εξετάσεις. Μαθήματα Ελληνικής Γλώσσας & Λογοτεχνίας με έμπειρους καθηγητές και σύγχρονες μεθόδους διδασκαλίας.",
    highlights: [
      { text: "Γυμνασίου και Λυκείου", color: "text-[#E7B109]", weight: "font-semibold" },
      { text: "Πανελλαδικές εξετάσεις", color: "text-[#CF3B49]", weight: "font-semibold" },
      { text: "Ελληνικής Γλώσσας & Λογοτεχνίας", color: "text-[#E7B109]", weight: "font-semibold" }
    ]
  },
  ctas: [
    {
      label: "Δείτε τα Προγράμματα",
      variant: "primary",
      href: "/curriculum",
      icon: ChevronRightIcon
    },
    {
      label: "Επικοινωνία",
      variant: "secondary",
      href: "/contact"
    }
  ],
  stats: [
    {
      icon: StudentsIcon,
      value: "500+",
      label: "Μαθητές",
      color: "text-[#E7B109]"
    },
    {
      icon: BuildingIcon,
      value: "25+",
      label: "Έτη Εμπειρίας",
      color: "text-[#CF3B49]"
    },
    {
      icon: AwardIcon,
      value: "95%",
      label: "Επιτυχία",
      color: "text-[#E7B109]"
    },
    {
      icon: BookOpenIcon,
      value: "8+",
      label: "Επίπεδα Σπουδών",
      color: "text-[#CF3B49]"
    }
  ],
  background: {
    gradient: "bg-gradient-to-br from-slate-50 via-white to-blue-50",
    overlay: "bg-gradient-to-t from-white/80 via-transparent to-transparent"
  }
};
