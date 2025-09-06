"use client";

import { useState, useEffect } from "react";
import type { ProgramsSectionData } from "./types";

interface ProgramsHeaderProps {
  header: ProgramsSectionData["header"];
}

export function ProgramsHeader({ header }: ProgramsHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="inline-block mb-6">
        <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-6 py-3 rounded-full shadow-professional inline-block">
          {header.subtitle}
        </span>
      </div>
      
      <h2 className="h2 text-slate-900 mb-8 text-balance bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
        {header.title}
      </h2>
      
      <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
        {header.description}
      </p>
    </div>
  );
}
