"use client";

import { useState, useEffect } from "react";
import { HeroSlider } from "./hero/hero-slider";
import { heroData } from "./hero/data";

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroData.slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Hero Slider */}
      <HeroSlider 
        slides={heroData.slides}
        currentSlide={currentSlide}
        onSlideChange={setCurrentSlide}
      />
    </section>
  );
}
