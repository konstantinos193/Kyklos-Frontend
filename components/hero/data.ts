import { ChevronRightIcon, StudentsIcon, BuildingIcon, AwardIcon, BookOpenIcon } from "@/components/icons";
import { HeroData } from "./types";

export const heroData: HeroData = {
  slides: [
    {
      title: "ΚΥΚΛΟΣ Εκπαίδευση",
      subtitle: "Ελληνική Γλώσσα & Λογοτεχνία - Αριστεία στην Εκπαίδευση",
      backgroundImage: "https://placehold.co/1920x1080/E7B109/FFFFFF",
      cta: {
        label: "Επικοινωνία",
        href: "#contact"
      }
    },
    {
      title: "Εξειδικευμένη Εκπαίδευση",
      subtitle: "Προγράμματα για όλα τα επίπεδα - Από Δημοτικό έως Λύκειο",
      backgroundImage: "https://placehold.co/1920x1080/1F2937/F3F4F6",
      cta: {
        label: "Δείτε τα Προγράμματα",
        href: "#programs"
      }
    },
    {
      title: "95% Επιτυχία",
      subtitle: "Με πάνω από 25 χρόνια εμπειρίας στην εκπαίδευση",
      backgroundImage: "https://placehold.co/1920x1080/374151/E7B109",
      cta: {
        label: "Μάθετε Περισσότερα",
        href: "#about"
      }
    }
  ],
  title: {
    main: "ΚΥΚΛΟΣ Εκπαίδευση",
    subtitle: "Ελληνική Γλώσσα & Λογοτεχνία - Αριστεία στην Εκπαίδευση"
  },
  description: {
    text: "Εξειδικευόμαστε στην {programs} με {expertise} και {success} για την ακαδημαϊκή σας επιτυχία.",
    highlights: [
      { text: "Ελληνική Γλώσσα & Λογοτεχνία", color: "text-[#E7B109]", weight: "font-semibold" },
      { text: "εξειδικευμένοι καθηγητές", color: "text-[#E7B109]", weight: "font-semibold" },
      { text: "95% επιτυχία", color: "text-[#E7B109]", weight: "font-semibold" }
    ]
  },
  ctas: [
    {
      label: "Δείτε τα Προγράμματα",
      variant: "primary",
      href: "#programs",
      icon: ChevronRightIcon
    },
    {
      label: "Επικοινωνία",
      variant: "secondary",
      href: "#contact"
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
      color: "text-[#E7B109]"
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
      color: "text-[#E7B109]"
    }
  ],
  background: {
    gradient: "bg-gradient-to-br from-slate-50 via-white to-blue-50",
    overlay: "bg-gradient-to-t from-white/80 via-transparent to-transparent"
  }
};
