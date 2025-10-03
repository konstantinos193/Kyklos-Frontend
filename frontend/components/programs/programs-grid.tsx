"use client";

import { ProgramLevel } from "./types";
import { ProgramLevelCard } from "./program-level-card";

interface ProgramsGridProps {
  levels: ProgramLevel[];
}

export function ProgramsGrid({ levels }: ProgramsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
      {levels.map((level) => (
        <ProgramLevelCard key={level.id} level={level} />
      ))}
    </div>
  );
}