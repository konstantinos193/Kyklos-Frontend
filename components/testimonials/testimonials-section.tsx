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
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-[#E7B109]/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-4 gap-12 items-center">
          {/* Title Section */}
          <div className="lg:col-span-1">
            <div className="animate-fadeInUp">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {testimonialsContent.title}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#E7B109] to-[#D97706] mb-6 rounded-full"></div>
              <p className="text-lg text-gray-600 leading-relaxed">
                {testimonialsContent.subtitle}
              </p>
            </div>
          </div>

          {/* Testimonials Content */}
          <div className="lg:col-span-3">
            <div className="relative">
              {/* Decorative Shapes */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#E7B109]/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
              <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-purple-500/10 rounded-full blur-lg"></div>

              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 left-0 w-40 h-40 bg-[#E7B109] rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-2xl"></div>
                </div>

                <div className="relative z-10">
                  <div className="grid md:grid-cols-12 gap-8 items-center">
                    {/* Student Images */}
                    <div className="md:col-span-1">
                      <div className="animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                        <StudentImagesSlider
                          images={testimonialsContent.studentImages}
                          currentTestimonialIndex={currentTestimonialIndex}
                          onImageClick={handleImageClick}
                        />
                      </div>
                    </div>

                    {/* Testimonials Content */}
                    <div className="md:col-span-11">
                      <div className="animate-fadeInUp" style={{ animationDelay: '400ms' }}>
                        <TestimonialsContentSlider
                          testimonials={testimonialsContent.testimonials}
                          currentIndex={currentTestimonialIndex}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Play/Pause Button */}
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      className="bg-[#E7B109] hover:bg-[#D97706] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
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
        <svg className="w-full h-20 text-white" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>
    </section>
  );
}
