import { StatCard } from "./stat-card";
import type { Stat } from "./types";

interface StatisticsGridProps {
  mainStats: Stat[];
}

export function StatisticsGrid({ mainStats }: StatisticsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
      {mainStats.map((stat, index) => (
        <StatCard key={index} stat={stat} index={index} />
      ))}
    </div>
  );
}
