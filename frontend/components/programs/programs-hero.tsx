"use client";

import { useState, useEffect } from 'react';
import { ChevronDown, Play, Star, Users, Award, BookOpen } from 'lucide-react';

export function ProgramsHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#E7B109] via-[#D97706] to-[#B45309]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-white rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Εκπαιδευτικά
            <span className="block text-yellow-200">Προγράμματα</span>
            <span className="block text-3xl md:text-4xl lg:text-5xl font-normal mt-2">
              Αριστείας
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-yellow-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Ανακαλύψτε τα εξειδικευμένα εκπαιδευτικά μας προγράμματα που σας οδηγούν στην αριστεία
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <Users className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-yellow-100 text-sm">Μαθητές</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <Award className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">95%</div>
              <div className="text-yellow-100 text-sm">Επιτυχία</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <BookOpen className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">15+</div>
              <div className="text-yellow-100 text-sm">Μαθήματα</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <Star className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">4.9</div>
              <div className="text-yellow-100 text-sm">Αξιολόγηση</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="bg-white text-[#E7B109] px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Δείτε τα Προγράμματα
            </button>
            <button className="flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-[#E7B109] transition-all duration-300 transform hover:scale-105">
              <Play className="w-5 h-5" />
              Δείτε το Video
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-white/70" />
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-white/30 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-16 w-6 h-6 bg-white/20 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-white/40 rounded-full animate-pulse delay-2000"></div>
      <div className="absolute bottom-1/3 right-1/4 w-5 h-5 bg-white/25 rounded-full animate-pulse delay-500"></div>
    </section>
  );
}

export default ProgramsHero;
