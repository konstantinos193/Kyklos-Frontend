"use client";

import { HeroContent } from "./hero/hero-content";
import { HeroStats } from "./hero/hero-stats";
import { HeroCTAs } from "./hero/hero-ctas";
import { heroData } from "./hero/data";

export function HeroSection() {
  return (
        <section className="relative min-h-screen overflow-hidden bg-slate-200">
          {/* Educational Pattern Background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E7B109' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zM30 30c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20z'/%3E%3C/g%3E%3Cg fill='%23CF3B49' fill-opacity='0.05'%3E%3Ccircle cx='15' cy='15' r='3'/%3E%3Ccircle cx='45' cy='15' r='2'/%3E%3Ccircle cx='15' cy='45' r='2'/%3E%3Ccircle cx='45' cy='45' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>

          {/* Floating Educational Elements */}
          <div className="absolute top-20 left-10 w-16 h-16 bg-[#E7B109]/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-12 h-12 bg-[#CF3B49]/10 rounded-full blur-lg animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 left-20 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-10 w-14 h-14 bg-purple-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '3s'}}></div>

          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(231, 177, 9, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(231, 177, 9, 0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-16">
            <HeroContent 
              title={heroData.title}
              description={heroData.description}
            />
            
            {/* CTAs */}
            <div className="mt-12">
              <HeroCTAs ctas={heroData.ctas} />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20">
            <HeroStats stats={heroData.stats} />
          </div>
        </div>
      </div>

          {/* Educational Icons Floating */}
          <div className="absolute top-32 left-1/4 w-8 h-8 text-[#E7B109]/20 animate-bounce" style={{animationDelay: '0.5s'}}>
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
            </svg>
          </div>
          <div className="absolute top-48 right-1/3 w-6 h-6 text-[#CF3B49]/20 animate-bounce" style={{animationDelay: '1.5s'}}>
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div className="absolute bottom-48 left-1/3 w-7 h-7 text-blue-500/20 animate-bounce" style={{animationDelay: '2.5s'}}>
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
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
