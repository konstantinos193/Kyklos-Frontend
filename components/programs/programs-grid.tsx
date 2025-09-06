"use client";

import { useState, useEffect } from "react";
import { ProgramCard } from "./program-card";
import type { Program } from "./types";

interface ProgramsGridProps {
  programs: Program[];
}

export function ProgramsGrid({ programs }: ProgramsGridProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {programs.map((program, index) => (
        <ProgramCard 
          key={program.id} 
          program={program} 
          index={index}
        />
      ))}
    </div>
  );
}
