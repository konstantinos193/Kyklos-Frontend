"use client";

import { StatCard } from "./types";

interface StatisticsCardsProps {
  stats: StatCard[];
}

export function StatisticsCards({ stats }: StatisticsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-700/50 hover:border-[#CF3B49]/50 transition-all duration-300 hover:bg-slate-800"
        >
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
            {stat.value}
          </div>
          <div className="text-sm sm:text-base lg:text-lg text-gray-300">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
