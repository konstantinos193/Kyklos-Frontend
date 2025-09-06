"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HeroCTA } from "./types";

interface HeroCTAsProps {
  ctas: HeroCTA[];
}

export function HeroCTAs({ ctas }: HeroCTAsProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleCTAClick = (cta: HeroCTA) => {
    if (cta.onClick) {
      cta.onClick();
    } else if (cta.href) {
      const element = document.querySelector(cta.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {ctas.map((cta, index) => {
        const IconComponent = cta.icon;
        
        if (cta.variant === "primary") {
          return (
            <Button
              key={index}
              size="lg"
              onClick={() => handleCTAClick(cta)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 px-10 py-4 text-lg shadow-professional-lg hover:shadow-professional-xl transition-all duration-300 hover:scale-105 group font-semibold rounded-xl"
            >
              {cta.label}
              {IconComponent && (
                <IconComponent className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              )}
            </Button>
          );
        }

        return (
          <Button
            key={index}
            size="lg"
            variant="outline"
            onClick={() => handleCTAClick(cta)}
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-10 py-4 text-lg bg-transparent hover:shadow-professional-lg transition-all duration-300 hover:scale-105 font-semibold rounded-xl"
          >
            {cta.label}
          </Button>
        );
      })}
    </div>
  );
}
