"use client";

import { HeroTitle, HeroDescription } from "./types";

interface HeroContentProps {
  title: HeroTitle;
  description: HeroDescription;
}

export function HeroContent({ title, description }: HeroContentProps) {
  return (
    <div className="space-y-8">
      {/* Main Title */}
      <div className="space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-slate-900 leading-tight">
          <span className="block">{title.main}</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-700 font-medium max-w-4xl mx-auto leading-relaxed">
          {title.subtitle}
        </p>
      </div>

      {/* Description with highlights */}
      <div className="max-w-4xl mx-auto">
        <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed text-center">
          Για περισσότερα από 30 χρόνια, το Φροντιστήριο ΚΥΚΛΟΣ προσφέρει{" "}
          <span className={description.highlights[0].color + ' ' + description.highlights[0].weight}>
            {description.highlights[0].text}
          </span>{" "}
          με{" "}
          <span className={description.highlights[1].color + ' ' + description.highlights[1].weight}>
            {description.highlights[1].text}
          </span>{" "}
          και{" "}
          <span className={description.highlights[2].color + ' ' + description.highlights[2].weight}>
            {description.highlights[2].text}
          </span>{" "}
          για την ακαδημαϊκή σας επιτυχία.
        </p>
      </div>
    </div>
  );
}
