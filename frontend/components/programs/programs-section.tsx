"use client";

import Link from "next/link";
import { ProgramsFeatures } from "./programs-features";
import { programsData } from "./data";

export function ProgramsSection() {
  return (
    <section id="programs" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">


        {/* Features */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            Γιατί να Επιλέξετε το ΚΥΚΛΟΣ;
          </h3>
          <ProgramsFeatures features={programsData.features} />
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-[#E7B109] via-[#CE3B49] to-[#D97706] rounded-2xl p-8 sm:p-12 text-white">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Έτοιμοι να Ξεκινήσετε;
          </h3>
          <p className="text-lg sm:text-xl mb-6 text-white/90">
            {programsData.cta.description}
          </p>
          <Link
            href={programsData.cta.href}
            className="inline-flex items-center px-8 py-4 bg-white text-[#CE3B49] font-semibold rounded-lg hover:bg-gray-100 hover:text-[#CE3B49] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {programsData.cta.label}
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
