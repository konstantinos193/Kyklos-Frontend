"use client";

import { Button } from "@/components/ui/button";
import { AboutContent } from "./types";

interface AboutContentProps {
  content: AboutContent;
}

export function AboutContentComponent({ content }: AboutContentProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Title Section */}
      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-tight">
          {content.title}{" "}
          <span className="text-[#CF3B49] relative">
            {content.titleAccent}
            <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-[#CF3B49] to-[#E7B109] rounded-full"></div>
          </span>
        </h2>
      </div>

      {/* Description */}
      <div className="space-y-4 sm:space-y-6">
        {content.description.map((paragraph, index) => (
          <p 
            key={index}
            className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-light"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* CTA Button */}
      <div className="pt-2 sm:pt-4">
        <a
          href={content.cta.href}
          className="group relative overflow-hidden bg-gradient-to-r from-[#E7B109] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl w-full sm:w-auto inline-flex items-center justify-center"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {content.cta.label}
            <svg 
              className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </a>
      </div>
    </div>
  );
}
