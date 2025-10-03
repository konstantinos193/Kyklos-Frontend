import type { HeaderButton } from "./types";

export interface NavigationItem {
  label: string;
  href: string;
  isDropdown?: boolean;
  dropdownItems?: NavigationItem[];
}

export interface HeaderData {
  logo: {
    symbol: string;
    text: string;
    href: string;
    image?: string;
  };
  navigation: NavigationItem[];
  buttons: HeaderButton[];
  mobileTitle?: string;
}

export const headerData: HeaderData = {
  logo: {
    symbol: "🎓",
    text: "ΚΥΚΛΟΣ Εκπαίδευση",
    href: "/",
    image: "/logo.png",
  },
  navigation: [
    { 
      label: "Ποιοί Είμαστε", 
      href: "/about"
    },
    { 
      label: "Επικαιρότητα", 
      href: "/current-affairs",
      isDropdown: true,
      dropdownItems: [
        { label: "Εκπαιδευτικά Νέα", href: "/current-affairs/education" },
        { label: "Πανεπιστήμια", href: "/current-affairs/universities" }
      ]
    },
    { label: "Επιτυχόντες", href: "/success-stories" },
    { 
      label: "Πρόγραμμα Σπουδών", 
      href: "/curriculum",
      isDropdown: true,
      dropdownItems: [
        { label: "Μαθηματικά", href: "/curriculum/mathematics" },
        { label: "Φυσική", href: "/curriculum/physics" },
        { label: "Χημεία", href: "/curriculum/chemistry" },
        { label: "Βιολογία", href: "/curriculum/biology" },
        { label: "Άλγεβρα", href: "/curriculum/algebra" },
        { label: "Γεωμετρία", href: "/curriculum/geometry" },
        { label: "Αρχαία", href: "/curriculum/ancient-greek" },
        { label: "Έκθεση - Λογοτεχνία", href: "/curriculum/greek-literature" },
        { label: "Ιστορία", href: "/curriculum/history" },
        { label: "Λατινικά", href: "/curriculum/latin" },
        { label: "ΑΟΘ / Οικονομικά", href: "/curriculum/economics" },
        { label: "Πληροφορική", href: "/curriculum/informatics" }
      ]
    },
    { 
      label: "Θέματα Πανελληνίων", 
      href: "/panhellenic",
      isDropdown: true,
      dropdownItems: [
        { label: "Θέματα 2024", href: "/panhellenic/2024" },
        { label: "Θέματα 2023", href: "/panhellenic/2023" },
        { label: "Αρχείο Θεμάτων", href: "/panhellenic/archive" }
      ]
    },
    { 
      label: "Νέα - Εκδηλώσεις", 
      href: "/news",
      isDropdown: true,
      dropdownItems: [
        { label: "Ανακοινώσεις", href: "/news/announcements" },
        { label: "Εκδηλώσεις", href: "/news/events" },
        { label: "Σεμινάρια", href: "/news/seminars" }
      ]
    },
    { label: "Επικοινωνία", href: "/contact" }
  ],
  buttons: [
    { label: "Σύνδεση Μαθητών", variant: "default", href: "/login" }
  ]
};

// Configuration for responsive behavior
export const headerConfig = {
  pinnedLabels: ["Ποιοί Είμαστε", "Πρόγραμμα Σπουδών", "Επικοινωνία"],
  maxVisibleByBreakpoint: {
    lg: 5,
    xl: 7,
    "2xl": 8
  }
};