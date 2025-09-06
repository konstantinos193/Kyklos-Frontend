"use client";

import { useState, useEffect } from "react";
import { HeroStat } from "./types";

interface HeroStatsProps {
  stats: HeroStat[];
}

export function HeroStats({ stats }: HeroStatsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const animateNumbers = () => {
      stats.forEach((stat, index) => {
        const targetValue = parseInt(stat.value.replace(/\D/g, ''));
        if (isNaN(targetValue)) return;

        let currentValue = 0;
        const increment = targetValue / 50;
        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
          }
          setAnimatedStats(prev => {
            const newStats = [...prev];
            newStats[index] = Math.floor(currentValue);
            return newStats;
          });
        }, 30);
      });
    };

    const timer = setTimeout(animateNumbers, 200);
    return () => clearTimeout(timer);
  }, [isVisible, stats]);

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        const displayValue = stat.value.includes('%') 
          ? `${animatedStats[index] || 0}%`
          : `${animatedStats[index] || 0}+`;

        return (
          <div 
            key={index}
            className="text-center group hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center justify-center mb-2">
              <div className={`p-3 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300`}>
                <IconComponent className={`w-8 h-8 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
              </div>
            </div>
            <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-1 transition-all duration-300`}>
              {displayValue}
            </div>
            <div className="text-slate-600 text-sm group-hover:text-slate-800 transition-colors duration-300">
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
