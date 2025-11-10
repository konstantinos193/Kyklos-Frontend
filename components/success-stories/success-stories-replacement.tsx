"use client";

import SuccessStoryCard from './success-story-card';
import { successStories } from './success-stories-data';

export default function SuccessStoriesReplacement() {
  return (
    <div className="relative min-h-screen bg-slate-200">
      {/* Background with animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-40 sm:w-80 h-40 sm:h-80 bg-[#E7B109]/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-48 sm:w-96 h-48 sm:h-96 bg-blue-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 sm:w-64 h-32 sm:h-64 bg-purple-500/8 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Additional Success Story Themed Elements */}
        <div className="absolute top-1/4 right-1/4 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-[#E7B109]/10 to-orange-500/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-20 sm:w-28 h-20 sm:h-28 bg-gradient-to-tr from-blue-400/10 to-cyan-500/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        
        {/* Quote Mark Decorations */}
        <div className="absolute top-20 left-1/4 text-6xl sm:text-8xl text-[#E7B109]/5 font-bold animate-pulse" style={{animationDelay: '2.5s'}}>
          ""
        </div>
        <div className="absolute bottom-20 right-1/4 text-6xl sm:text-8xl text-[#E7B109]/5 font-bold animate-pulse" style={{animationDelay: '3s'}}>
          ""
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ιστορίες Επιτυχίας
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Διαβάστε τις εμπειρίες των μαθητών μας που πέτυχαν τα στόχους τους 
              και εισήλθαν στα πανεπιστήμια των ονείρων τους
            </p>
          </div>

          {/* Success Stories Carousel */}
          <SuccessStoryCard stories={successStories} />

        </div>
      </div>
    </div>
  );
}
