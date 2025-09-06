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
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center text-white">
                {/* Title */}
                <h2 
                  className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                  data-animation="fadeInLeft"
                  data-delay="0.2s"
                  style={{ animationDelay: '0.2s' }}
                >
                  {slide.title}
                </h2>
                
                {/* Subtitle */}
                {slide.subtitle && (
                  <p 
                    className="text-xl md:text-2xl mb-8 text-gray-200 font-light"
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
                    className="inline-flex items-center px-8 py-4 bg-[#E7B109] text-white text-lg font-semibold rounded-lg hover:bg-[#D97706] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    {slide.cta.label}
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
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
