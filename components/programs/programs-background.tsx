"use client";

import { useState, useEffect } from "react";

interface ProgramsBackgroundProps {
  gradient: string;
}

export function ProgramsBackground({ gradient }: ProgramsBackgroundProps) {
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
      
      {/* Interactive gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-slate-50/30 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)`
        }}
      />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>
    </div>
  );
}
