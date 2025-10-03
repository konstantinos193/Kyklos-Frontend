"use client";

import { useState, useEffect } from "react";

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener("scroll", updateScrollProgress);
    updateScrollProgress(); // Set initial value
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 transform origin-left transition-transform duration-150 ease-out"
         style={{ 
           transform: `scaleX(${scrollProgress / 100})`,
           background: 'linear-gradient(to right, #CE3B49, #D97706, #B45309)'
         }}
    />
  );
}
