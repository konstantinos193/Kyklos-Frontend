"use client";

import { Button } from "@/components/ui/button";
import { AboutContent } from "./types";

interface AboutContentProps {
  content: AboutContent;
}

export function AboutContentComponent({ content }: AboutContentProps) {
  return (
    <div className="space-y-8">
      {/* Title Section */}
      <div className="space-y-6">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
          {content.title}{" "}
          <span className="text-[#E7B109] relative">
            {content.titleAccent}
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#E7B109] to-[#D97706] rounded-full"></div>
          </span>
        </h2>
      </div>

      {/* Description */}
      <div className="space-y-6">
        {content.description.map((paragraph, index) => (
          <p 
            key={index}
            className="text-lg md:text-xl text-slate-600 leading-relaxed font-light"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* CTA Button */}
      <div className="pt-4">
        <Button
          size="lg"
          className="group relative overflow-hidden bg-gradient-to-r from-[#E7B109] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white px-10 py-5 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl"
        >
          <span className="relative z-10 flex items-center gap-2">
            {content.cta.label}
            <svg 
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Button>
      </div>
    </div>
  );
}
