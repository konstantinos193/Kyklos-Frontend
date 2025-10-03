"use client";

import { useState, useEffect } from "react";
import { StudentImagesSlider } from "./student-images-slider";
import { TestimonialsContentSlider } from "./testimonials-content-slider";
import { testimonialsContent } from "./data";

export function TestimonialsSection() {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prevIndex) => 
        (prevIndex + 1) % testimonialsContent.testimonials.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleImageClick = (index: number) => {
    setCurrentTestimonialIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-40 sm:w-80 h-40 sm:h-80 bg-[#E7B109]/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-48 sm:w-96 h-48 sm:h-96 bg-blue-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 sm:w-64 h-32 sm:h-64 bg-purple-500/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-4 gap-8 lg:gap-12 items-center">
          {/* Title Section */}
          <div className="lg:col-span-1 order-1">
            <div className="animate-fadeInUp text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                {testimonialsContent.title}
              </h2>
              <div className="w-16 sm:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-[#E7B109] to-[#D97706] mb-4 sm:mb-6 rounded-full mx-auto lg:mx-0"></div>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {testimonialsContent.subtitle}
              </p>
            </div>
          </div>

          {/* Testimonials Content */}
          <div className="lg:col-span-3 order-2">
            <div className="relative">
              {/* Decorative Shapes */}
              <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-12 sm:w-24 h-12 sm:h-24 bg-[#E7B109]/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 w-16 sm:w-32 h-16 sm:h-32 bg-blue-500/10 rounded-full blur-xl"></div>
              <div className="absolute top-1/2 right-1/4 w-8 sm:w-16 h-8 sm:h-16 bg-purple-500/10 rounded-full blur-lg"></div>

              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 left-0 w-20 sm:w-40 h-20 sm:h-40 bg-[#E7B109] rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 right-0 w-16 sm:w-32 h-16 sm:h-32 bg-blue-500 rounded-full blur-2xl"></div>
                </div>

                <div className="relative z-10">
                  <div className="grid sm:grid-cols-12 gap-6 sm:gap-8 items-center">
                    {/* Student Images */}
                    <div className="sm:col-span-1 order-2 sm:order-1">
                      <div className="animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                        <StudentImagesSlider
                          images={testimonialsContent.studentImages}
                          currentTestimonialIndex={currentTestimonialIndex}
                          onImageClick={handleImageClick}
                        />
                      </div>
                    </div>

                    {/* Testimonials Content */}
                    <div className="sm:col-span-11 order-1 sm:order-2">
                      <div className="animate-fadeInUp" style={{ animationDelay: '400ms' }}>
                        <TestimonialsContentSlider
                          testimonials={testimonialsContent.testimonials}
                          currentIndex={currentTestimonialIndex}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Play/Pause Button */}
                  <div className="flex justify-center mt-6 sm:mt-8">
                    <button
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      className="bg-[#E7B109] hover:bg-[#D97706] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      {isAutoPlaying ? 'Pause' : 'Play'} Testimonials
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-16 sm:h-20 text-white" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>
    </section>
  );
}
