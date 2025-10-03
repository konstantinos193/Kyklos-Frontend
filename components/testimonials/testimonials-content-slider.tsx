"use client";

import { useState, useEffect } from "react";
import { Testimonial } from "./types";

interface TestimonialsContentSliderProps {
  testimonials: Testimonial[];
  currentIndex: number;
}

export function TestimonialsContentSlider({ testimonials, currentIndex }: TestimonialsContentSliderProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const currentTestimonial = testimonials[currentIndex] || testimonials[0];

  return (
    <div className="relative">
      <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
        {/* Quote Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-[#E7B109] rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14,17h3l2-4V7h-6v6h3L14,17z M6,17h3l2-4V7H5v6h3L6,17z"/>
            </svg>
          </div>
        </div>

        {/* Testimonial Text */}
        <div className="text-center mb-8">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium italic">
            "{currentTestimonial.text}"
          </p>
        </div>

        {/* Author Info */}
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900 mb-1">
            {currentTestimonial.author}
          </p>
          {currentTestimonial.department && (
            <p className="text-sm text-[#E7B109] font-semibold">
              {currentTestimonial.department}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
