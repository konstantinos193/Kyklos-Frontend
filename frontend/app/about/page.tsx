import { AboutBanner } from "@/components/about/about-banner";
import { AboutGoals } from "@/components/about/about-goals";
import { AboutHighlight } from "@/components/about/about-highlight";
import { AboutFeatures } from "@/components/about/about-features";
import { AboutHistory } from "@/components/about/about-history";
import { AboutFacilities } from "@/components/about/about-facilities";
import { AboutSection } from "@/components/about-section";

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


