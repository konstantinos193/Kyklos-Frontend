"use client";

import { useState, useEffect } from "react";
import type { Stat } from "./types";
import { 
  StudentsIcon, 
  BuildingIcon, 
  GraduationCapIcon, 
  TrophyIcon,
  ClockIcon,
  AwardIcon
} from "@/components/icons";

interface StatCardProps {
  stat: Stat;
  index: number;
}

const iconMap = {
  StudentsIcon,
  BuildingIcon,
  GraduationCapIcon,
  TrophyIcon,
  ClockIcon,
  AwardIcon,
};

export function StatCard({ stat, index }: StatCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);

    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    if (!isVisible) return;

    const targetNumber = parseInt(stat.number.replace(/\D/g, ""));
    if (isNaN(targetNumber)) return;

    const duration = 2000;
    const increment = targetNumber / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNumber) {
        setCount(targetNumber);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, stat.number]);

  const IconComponent = iconMap[stat.icon as keyof typeof iconMap] || TrophyIcon;

  return (
    <div 
      className={`text-center group transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="flex items-center justify-center mb-4">
        <IconComponent
          className={`w-12 h-12 ${stat.color} group-hover:scale-110 transition-transform duration-300`}
        />
      </div>
      <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}>
        {stat.number.includes("%") ? `${count}%` : 
         stat.number.includes("+") ? `${count}+` : 
         count}
      </div>
      <div className="text-white text-lg">{stat.label}</div>
    </div>
  );
}
