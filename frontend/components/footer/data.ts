import { FooterData } from "./types";

export const footerData: FooterData = {
  logo: {
    text: "ΚΥΚΛΟΣ",
    symbol: "Φ",
    description: "Προσφέρουμε ποιοτική εκπαίδευση εδώ και 25+ χρόνια. Η επιτυχία των μαθητών μας είναι η δική μας επιτυχία.",
    image: "/logo.png"
  },
  quickLinks: [
    { label: "Ποιοί Είμαστε", href: "/about" },
    { label: "Πρόγραμμα Σπουδών", href: "/curriculum" },
    { label: "Επικαιρότητα", href: "/current-affairs" },
    { label: "Επιτυχόντες", href: "/epityxontes" },
    { label: "Θέματα Πανελληνίων", href: "/panhellenic" },
    { label: "Νέα - Εκδηλώσεις", href: "/news" },
    { label: "Blog", href: "/blog" },
    { label: "Επικοινωνία", href: "/contact" }
  ],
  contact: {
    phone: "2681026671",
    email: "Email Address",
    address: {
      street: "Βασιλέως Κωνσταντίνου 42",
      city: "Αρτα",
      postalCode: "47100"
    }
  },
  socialLinks: [
    { name: "Facebook", href: "https://www.facebook.com/share/1AiwsWnW15/?mibextid=wwXIfr", icon: null },
    { name: "Instagram", href: "https://www.instagram.com/frontistirio_kyklos?igsh=MWg0cms4NXRleWJudA==", icon: null },
    { name: "TikTok", href: "https://www.tiktok.com/@frontistirio_kyklos_1990?_t=ZN-8zYFeNjMcNi&_r=1", icon: null }
  ],
  legal: {
    copyright: "© 2025 adinfiinity. All rights reserved.",
    termsHref: "/terms",
    privacyHref: "/privacy"
  }
};
