"use client";
import { useState } from "react";
import { curriculumSections } from "@/components/curriculum/data";
import { CurriculumSectionView } from "@/components/curriculum/section";

export function SectionsTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Αναλυτικό Πρόγραμμα</h2>
        <span className="text-[11px] sm:text-xs text-slate-500">ώρες/εβδομάδα</span>
      </div>

      <div className="mt-4 overflow-x-auto">
        <div className="inline-flex min-w-full gap-2 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
          {curriculumSections.map((s, idx) => (
            <button
              key={s.title}
              onClick={() => setActiveIndex(idx)}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                activeIndex === idx
                  ? "bg-gradient-to-r from-[#CE3B49] to-[#FF6B6B] text-white"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <CurriculumSectionView section={curriculumSections[activeIndex]} />
      </div>
    </section>
  );
}

