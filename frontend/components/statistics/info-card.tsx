"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { InfoCard as InfoCardType } from "./types";
import { ClockIcon, TargetIcon, AwardIcon, BuildingIcon } from "@/components/icons";

interface InfoCardProps {
  card: InfoCardType;
  index: number;
}

const iconMap = {
  ClockIcon,
  TargetIcon,
  AwardIcon,
  BuildingIcon,
};

export function InfoCard({ card, index }: InfoCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 300 + 800); // Delay after main stats

    return () => clearTimeout(timer);
  }, [index]);

  const IconComponent = iconMap[card.icon as keyof typeof iconMap] || AwardIcon;

  return (
    <Card
      className={`bg-white/10 backdrop-blur-sm border-2 ${card.accent} hover:bg-white/20 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <CardHeader className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#E7B109] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-xl text-white mb-2">{card.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-300 text-center leading-relaxed">
          {card.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
