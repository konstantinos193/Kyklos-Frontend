"use client";

import { useState, useEffect } from "react";
import { HeroSlide } from "./types";

interface HeroSliderProps {
  slides: HeroSlide[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

export function HeroSlider({ slides, currentSlide, onSlideChange }: HeroSliderProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      onSlideChange(index);
      setIsTransitioning(false);
    }, 300);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{
              backgroundImage: `url(${slide.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />
            
            {/* Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-4xl mx-auto text-center text-white">
                {/* Title */}
                <h2 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2"
                  data-animation="fadeInLeft"
                  data-delay="0.2s"
                  style={{ animationDelay: '0.2s' }}
                >
                  {slide.title}
                </h2>
                
                {/* Subtitle */}
                {slide.subtitle && (
                  <p 
                    className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-200 font-light px-4 leading-relaxed"
                    data-animation="fadeInUp"
                    data-delay="0.6s"
                    style={{ animationDelay: '0.6s' }}
                  >
                    {slide.subtitle}
                  </p>
                )}

                {/* CTA Button */}
                <div 
                  className="inline-block"
                  data-animation="fadeInUp"
                  data-delay="1s"
                  style={{ animationDelay: '1s' }}
                >
                  <a
                    href={slide.cta.href}
                    className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-[#E7B109] text-white text-base sm:text-lg font-semibold rounded-lg hover:bg-[#D97706] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    {slide.cta.label}
                    <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Hidden on mobile, visible on larger screens */}
      <button
        onClick={prevSlide}
        className="hidden sm:block absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="hidden sm:block absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator - Mobile-friendly */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 sm:space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 touch-manipulation ${
              index === currentSlide 
                ? 'bg-[#E7B109] scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
