import { Button } from "@/components/ui/button";
import type { StatisticsCTA } from "./types";

interface StatisticsCTAProps {
  cta: StatisticsCTA;
}

export function StatisticsCTA({ cta }: StatisticsCTAProps) {
  return (
    <div className="text-center">
      <Button
        size="lg"
        className="bg-gradient-to-r from-[#E7B109] to-[#FFD84D] text-white hover:from-[#B8860B] hover:to-[#E7B109] px-8 py-4 transition-all duration-300 hover:scale-105"
        asChild
      >
        <a href={cta.href}>{cta.text}</a>
      </Button>
    </div>
  );
}
