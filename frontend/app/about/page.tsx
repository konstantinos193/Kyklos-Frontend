import { AboutBanner } from "@/components/about/about-banner";
import { AboutGoals } from "@/components/about/about-goals";
import { AboutHighlight } from "@/components/about/about-highlight";
import { AboutFeatures } from "@/components/about/about-features";
import { AboutHistory } from "@/components/about/about-history";
import { AboutFacilities } from "@/components/about/about-facilities";
import { AboutSection } from "@/components/about-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Σχετικά με εμάς | ΚΥΚΛΟΣ Φροντιστήριο Άρτα",
  description: "Γνωρίστε το ΚΥΚΛΟΣ Φροντιστήριο στην Άρτα! 25+ χρόνια εμπειρίας στην εκπαίδευση, 95% επιτυχία στις Πανελλαδικές εξετάσεις. Εξειδικευμένοι καθηγητές, σύγχρονες εγκαταστάσεις και προσωποποιημένη προετοιμασία για Γυμνάσιο & Λύκειο.",
  keywords: [
    "σχετικά με εμάς",
    "φροντιστήριο άρτα ιστορία",
    "φροντιστήριο κύκλος άρτα",
    "εμπειρία φροντιστηρίου",
    "καθηγητές φροντιστηρίου άρτα",
    "εγκαταστάσεις φροντιστηρίου",
    "μαθησιακό κέντρο άρτα",
    "εκπαιδευτική φιλοσοφία",
    "στόχοι φροντιστηρίου",
    "ιστορία φροντιστηρίου άρτα"
  ],
  openGraph: {
    title: "Σχετικά με εμάς | ΚΥΚΛΟΣ Φροντιστήριο Άρτα",
    description: "Γνωρίστε το ΚΥΚΛΟΣ Φροντιστήριο στην Άρτα! 25+ χρόνια εμπειρίας, 95% επιτυχία στις Πανελλαδικές εξετάσεις.",
    images: ["/logo.png"],
  },
};

export default function AboutPage() {
  return (
    <main>
      <AboutBanner 
        title="Ποιοί Είμαστε" 
        backgroundImage="/building/0-02-05-478c0937fdff63e4ab45201a399a1b1c3dad0c2a14c4cf8b65738dd77edfc916_acfb2c2f26f11734.jpg" 
      />
      <AboutSection />
      <AboutGoals />
      <AboutHighlight />
      <AboutFeatures />
      <AboutHistory />
      <AboutFacilities />
    </main>
  );
}


