"use client";

import { useState, useEffect } from "react";
import { StudentImage } from "./types";

interface StudentImagesSliderProps {
  images: StudentImage[];
  currentTestimonialIndex: number;
  onImageClick: (index: number) => void;
}

export function StudentImagesSlider({ images, currentTestimonialIndex, onImageClick }: StudentImagesSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sync with testimonial changes
  useEffect(() => {
    setCurrentImageIndex(currentTestimonialIndex);
  }, [currentTestimonialIndex]);

  const goToNext = () => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextIndex);
    onImageClick(nextIndex);
  };

  return (
    <div className="relative">
      {/* Student Images Container */}
      <div className="relative w-16 h-16 mx-auto overflow-hidden rounded-full">
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={image.id} className="w-16 h-16 flex-shrink-0">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover rounded-full cursor-pointer hover:scale-110 transition-transform duration-300"
                onClick={() => {
                  setCurrentImageIndex(index);
                  onImageClick(index);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-[#E7B109] hover:bg-[#D97706] text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label="Next student"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
