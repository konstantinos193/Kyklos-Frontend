import { HeaderData } from "./types";

export const headerData: HeaderData = {
  logo: {
    symbol: "Κ",
    text: "ΚΥΚΛΟΣ Εκπαίδευση",
    href: "/",
    image: "/placeholder-logo.png"
  },
  navigation: [
    { label: "Αρχική", href: "/" },
    { 
      label: "Προγράμματα", 
      href: "javascript:void(0)",
      isDropdown: true,
      dropdownItems: [
        { label: "Γυμνάσιο", href: "#programs", description: "Προγράμματα για μαθητές Γυμνασίου" },
        { label: "Λύκειο", href: "#programs", description: "Προγράμματα για μαθητές Λυκείου" },
        { label: "Ελληνική Γλώσσα", href: "#programs", description: "Εξειδικευμένα μαθήματα γλώσσας" },
        { label: "Λογοτεχνία", href: "#programs", description: "Μαθήματα λογοτεχνίας και ανάλυσης" }
      ]
    },
    { label: "Σχετικά", href: "#about" },
    { 
      label: "Υπηρεσίες", 
      href: "javascript:void(0)",
      isDropdown: true,
      dropdownItems: [
        { label: "Εξατομικευμένη Διδασκαλία", href: "#about", description: "Προσωποποιημένη εκπαίδευση" },
        { label: "Προετοιμασία Πανελληνίων", href: "#about", description: "Εξειδικευμένη προετοιμασία" },
        { label: "Θεματολόγια", href: "#about", description: "Πλήρη θεματολόγια εξετάσεων" },
        { label: "Online Μαθήματα", href: "#about", description: "Διαδικτυακά μαθήματα" }
      ]
    },
    { label: "Επιτυχόντες", href: "#testimonials" },
    { label: "Επικοινωνία", href: "#contact" }
  ],
  buttons: [],
  mobileMenuTitle: "Μενού"
};
