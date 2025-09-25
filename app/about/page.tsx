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
        backgroundImage="https://placehold.co/1600x500/E7B109/FFFFFF?text=%CE%A0%CE%BF%CE%B9%CE%BF%CE%AF+%CE%95%CE%AF%CE%BC%CE%B1%CF%83%CF%84%CE%B5" 
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


