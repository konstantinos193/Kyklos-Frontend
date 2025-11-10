"use client";

import { AboutContentComponent, AboutImages, FloatingIcons, aboutContent, aboutImages, floatingIcons } from "./about";

export function AboutSection() {
  return (
    <section id="about" className="relative py-16 sm:py-20 lg:py-24 bg-slate-200 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8">
            <AboutContentComponent content={aboutContent} />
          </div>
        </div>
      </div>
    </section>
  );
}
