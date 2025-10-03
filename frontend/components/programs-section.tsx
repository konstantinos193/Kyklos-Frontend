"use client";

import { ProgramsHeader } from "./programs/programs-header";
import { ProgramsGrid } from "./programs/programs-grid";
import { ProgramsCTA } from "./programs/programs-cta";
import { ProgramsBackground } from "./programs/programs-background";
import { programsData } from "./programs/data";

export function ProgramsSection() {
  return (
    <section id="programs" className="section-padding relative overflow-hidden bg-slate-200">
      {/* Background */}
      <ProgramsBackground gradient={programsData.background.gradient} />
      
      {/* Content */}
      <div className="container mx-auto container-padding relative z-10">
        {/* Header */}
        <ProgramsHeader header={programsData.header} />

        {/* Programs Grid */}
        <ProgramsGrid programs={programsData.programs} />

        {/* CTA */}
        <ProgramsCTA cta={programsData.cta} />
      </div>
    </section>
  );
}
