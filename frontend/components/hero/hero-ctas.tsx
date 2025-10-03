"use client";

import Link from "next/link";
import { HeroCTA } from "./types";

interface HeroCTAsProps {
  ctas: HeroCTA[];
}

export function HeroCTAs({ ctas }: HeroCTAsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
      {ctas.map((cta, index) => {
        const IconComponent = cta.icon;
        
        if (cta.variant === "primary") {
          return (
            <Link
              key={index}
              href={cta.href}
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#E7B109] to-[#D97706] text-white text-lg font-semibold rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 transform"
            >
              {cta.label}
              {IconComponent && (
                <IconComponent className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              )}
            </Link>
          );
        }
        
        return (
          <Link
            key={index}
            href={cta.href}
            className="group inline-flex items-center px-8 py-4 border-2 border-[#CF3B49] text-[#CF3B49] text-lg font-semibold rounded-full hover:bg-[#CF3B49] hover:text-white transition-all duration-300 hover:scale-105"
          >
            {cta.label}
            {IconComponent && (
              <IconComponent className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            )}
          </Link>
        );
      })}
    </div>
  );
}