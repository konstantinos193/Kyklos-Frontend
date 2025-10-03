"use client";

import { useState, useEffect } from "react";
import type { HeroDescription as HeroDescriptionType } from "./types";

interface HeroDescriptionProps {
  description: HeroDescriptionType;
}

export function HeroDescription({ description }: HeroDescriptionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const renderDescription = () => {
    let text = description.text;
    let highlightIndex = 0;

    // Replace placeholders with actual highlight text
    text = text.replace("{programs}", description.highlights[0].text);
    text = text.replace("{expertise}", description.highlights[1].text);
    text = text.replace("{success}", description.highlights[2].text);

    // Split by highlight text and create elements
    const parts = text.split(/(15\+ προγράμματα σπουδών|εξειδικευμένοι καθηγητές|95% επιτυχία)/);
    
    return parts.map((part, index) => {
      const highlight = description.highlights.find(h => h.text === part);
      if (highlight) {
        return (
          <span key={index} className={`${highlight.color} ${highlight.weight} transition-all duration-500 hover:scale-105 inline-block`}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-4xl mx-auto font-light">
        {renderDescription()}
      </p>
    </div>
  );
}
