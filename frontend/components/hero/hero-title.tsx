"use client";

import { useState, useEffect } from "react";
import type { HeroTitle as HeroTitleType } from "./types";

interface HeroTitleProps {
  title: HeroTitleType;
}

export function HeroTitle({ title }: HeroTitleProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {/* Main Title */}
      <h1 className="h1 text-slate-900 mb-6 text-balance bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
        {title.main}
      </h1>

      {/* Subtitle */}
      <h2 className="h3 text-slate-600 mb-8 font-medium tracking-wide max-w-3xl mx-auto leading-relaxed">
        {title.subtitle}
      </h2>
    </div>
  );
}
