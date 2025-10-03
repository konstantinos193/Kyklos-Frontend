"use client";

import { HeroStat } from "./types";

interface HeroStatsProps {
  stats: HeroStat[];
}

export function HeroStats({ stats }: HeroStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        
        return (
          <div
            key={index}
            className="group text-center p-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-[#E7B109]/20 hover:bg-white hover:shadow-xl hover:border-[#E7B109]/40 transition-all duration-300 hover:scale-105"
          >
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-gradient-to-br from-[#E7B109]/20 to-[#D97706]/20 group-hover:from-[#E7B109]/30 group-hover:to-[#D97706]/30 transition-all duration-300">
                <IconComponent className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
            
            <div className={`text-3xl lg:text-4xl font-bold ${stat.color} mb-2`}>
              {stat.value}
            </div>
            
            <div className="text-sm lg:text-base text-slate-600 font-medium">
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}