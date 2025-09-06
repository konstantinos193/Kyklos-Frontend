"use client";

import { StatCard } from "./types";

interface StatisticsCardsProps {
  stats: StatCard[];
}

export function StatisticsCards({ stats }: StatisticsCardsProps) {
  return (
    <div className="space-y-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-[#E7B109]/50 transition-all duration-300 hover:bg-slate-800"
        >
          <div className="text-4xl font-bold text-white mb-2">
            {stat.value}
          </div>
          <div className="text-lg text-gray-300">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
