"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "@/components/icons";
import type { ProgramsSectionData } from "./types";

interface ProgramsCTAProps {
  cta: ProgramsSectionData["cta"];
}

export function ProgramsCTA({ cta }: ProgramsCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const element = document.querySelector(cta.href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <Button
        size="lg"
        onClick={handleClick}
        className="bg-gradient-to-r from-[#CF3B49] to-[#E7B109] text-white hover:from-[#B91C1C] hover:to-[#D97706] px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
      >
        {cta.label}
        <ChevronRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </Button>
    </div>
  );
}
