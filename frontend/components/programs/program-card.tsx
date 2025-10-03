"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRightIcon, StarIcon } from "@/components/icons";
import type { Program } from "./types";

interface ProgramCardProps {
  program: Program;
  index: number;
}

export function ProgramCard({ program, index }: ProgramCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  const IconComponent = program.icon;

  const getLevelColor = (level: Program["level"]) => {
    switch (level) {
      case "beginner": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      case "all": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelText = (level: Program["level"]) => {
    switch (level) {
      case "beginner": return "Αρχάριος";
      case "intermediate": return "Μέσος";
      case "advanced": return "Προχωρημένος";
      case "all": return "Όλα τα επίπεδα";
      default: return level;
    }
  };

  return (
    <div 
      className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="group hover:shadow-professional-xl transition-all duration-500 border-0 overflow-hidden bg-white hover:bg-gradient-to-br hover:from-white hover:to-blue-50/30 h-full shadow-professional hover:-translate-y-2">
        {/* Popular Badge */}
        {program.isPopular && (
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0 shadow-lg">
              <StarIcon className="w-3 h-3 mr-1" />
              Δημοφιλές
            </Badge>
          </div>
        )}

        {/* Gradient Header */}
        <div className={`h-2 bg-gradient-to-r ${program.gradient} transition-all duration-300 ${isHovered ? 'h-3' : ''}`} />
        
        <CardHeader className="text-center pb-4 relative">
          {/* Icon */}
          <div
            className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${program.gradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
          >
            <IconComponent className="w-8 h-8 text-white" />
          </div>

          {/* Title */}
          <CardTitle className="h5 text-slate-900 mb-3 group-hover:text-blue-900 transition-colors duration-300">
            {program.title}
          </CardTitle>

          {/* Description */}
          <CardDescription className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300 text-base">
            {program.description}
          </CardDescription>

          {/* Level Badge */}
          <div className="mt-3">
            <Badge className={getLevelColor(program.level)}>
              {getLevelText(program.level)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Features */}
          <ul className="space-y-3 mb-6">
            {program.features.map((feature, featureIndex) => (
              <li 
                key={featureIndex} 
                className="flex items-start text-sm text-slate-600 group-hover:text-slate-700 transition-colors duration-300"
              >
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${program.gradient} mr-3 mt-2 flex-shrink-0`} />
                <div>
                  <div className="font-medium">{feature.name}</div>
                  {feature.description && (
                    <div className="text-xs text-slate-500 mt-1">{feature.description}</div>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Price and Duration */}
          <div className="border-t border-slate-100 pt-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-500">Τιμή:</span>
              <span className="text-lg font-bold text-slate-900">
                {program.price?.amount}
                <span className="text-sm font-normal text-slate-500">/{program.price?.period}</span>
              </span>
            </div>
            {program.duration && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Διάρκεια:</span>
                <span className="text-sm font-medium text-slate-700">{program.duration}</span>
              </div>
            )}
          </div>

          {/* CTA Button */}
          <Button
            className={`w-full bg-gradient-to-r ${program.gradient} text-white hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
            size="sm"
          >
            Μάθετε Περισσότερα
            <ChevronRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
