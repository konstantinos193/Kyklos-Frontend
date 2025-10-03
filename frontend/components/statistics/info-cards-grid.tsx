import { InfoCard } from "./info-card";
import type { InfoCard as InfoCardType } from "./types";

interface InfoCardsGridProps {
  infoCards: InfoCardType[];
}

export function InfoCardsGrid({ infoCards }: InfoCardsGridProps) {
  return (
    <div className="grid md:grid-cols-3 gap-8 mb-12">
      {infoCards.map((card, index) => (
        <InfoCard key={index} card={card} index={index} />
      ))}
    </div>
  );
}
