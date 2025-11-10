"use client";

import { ImageSlider } from "./image-slider";
import { CampusContentComponent } from "./campus-content";
import { campusContent } from "./data";

export function CampusGallerySection() {
  return (
    <section className="relative py-24 bg-slate-200 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-[#E7B109]/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Slider */}
          <div className="campus-image-col">
            <div className="animate-fadeInUp">
              <ImageSlider images={campusContent.images} />
            </div>
          </div>

          {/* Content */}
          <div className="campus-content-col">
            <div className="animate-fadeInUp" style={{ animationDelay: '200ms' }}>
              <CampusContentComponent
                title={campusContent.title}
                buttonText={campusContent.buttonText}
                buttonHref={campusContent.buttonHref}
              />
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
