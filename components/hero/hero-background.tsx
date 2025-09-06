"use client";

import { useState, useEffect } from "react";

interface HeroBackgroundProps {
  gradient: string;
  overlay?: string;
}

export function HeroBackground({ gradient, overlay }: HeroBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient background */}
      <div className={`absolute inset-0 ${gradient}`} />
      
      {/* Professional overlay */}
      {overlay && (
        <div className={`absolute inset-0 ${overlay}`} />
      )}
      
      {/* Subtle interactive gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-blue-800/5 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.05) 0%, transparent 60%)`
        }}
      />
      
      {/* Professional geometric patterns */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200/20 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-300/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-blue-400/15 rounded-full blur-lg"></div>
      </div>
    </div>
  );
}
