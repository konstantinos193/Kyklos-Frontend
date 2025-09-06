import { FooterData } from "./types";

export const footerData: FooterData = {
  logo: {
    text: "Φροντιστήριο Κύκλος",
    symbol: "Φ",
    description: "Προσφέρουμε ποιοτική εκπαίδευση εδώ και 25+ χρόνια. Η επιτυχία των μαθητών μας είναι η δική μας επιτυχία."
  },
  quickLinks: [
    { label: "Αρχική", href: "#home" },
    { label: "Προγράμματα", href: "#courses" },
    { label: "Σχετικά", href: "#about" },
    { label: "Στατιστικά", href: "#statistics" },
    { label: "Μαρτυρίες", href: "#testimonials" },
    { label: "Γκαλερί", href: "#gallery" },
    { label: "Blog", href: "#blog" },
    { label: "Επικοινωνία", href: "#contact" }
  ],
  contact: {
    phone: "Phone Number",
    email: "Email Address",
    address: {
      street: "Street Address",
      city: "City, Postal Code"
    }
  },
  socialLinks: [
    { name: "Facebook", href: "https://facebook.com", icon: null },
    { name: "Instagram", href: "https://instagram.com", icon: null },
    { name: "Twitter", href: "https://twitter.com", icon: null },
    { name: "LinkedIn", href: "https://linkedin.com", icon: null }
  ],
  legal: {
    copyright: "© 2025 adinfiinity. All rights reserved.",
    termsHref: "/terms",
    privacyHref: "/privacy"
  }
};
