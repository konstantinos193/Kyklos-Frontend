"use client";

import { useState, useEffect } from "react";
import { HeaderTop } from "./header/header-top";
import { HeaderLogo } from "./header/header-logo";
import { HeaderNavigation } from "./header/header-navigation";
import { ScrollProgress } from "./header/scroll-progress";
import { AnnouncementBar } from "./header/announcement-bar";
import { headerData } from "./header/data";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <header className="relative z-50">
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      {/* Header Top - More subtle design */}
      <HeaderTop />
      
      {/* Main Navigation - Mobile-First Responsive Design */}
      <div 
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200" 
            : "bg-white border-b-2 border-gray-200"
        }`}
      >
        <div className="px-3 sm:px-4 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center gap-4">
            {/* Mobile menu button - Left side for mobile */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
 
             {/* Logo - Always left */}
            <div className="flex items-center justify-start">
              <HeaderLogo logo={headerData.logo} isScrolled={isScrolled} />
            </div>
 
            {/* Desktop Navigation - Immediately after logo */}
            <div className="hidden lg:flex lg:items-center">
              <HeaderNavigation 
                navigation={headerData.navigation} 
                isScrolled={isScrolled} 
              />
            </div>
          </div>
        </div>

        {/* Mobile menu - Full screen overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mobile-menu-container">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-xl z-50 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <div className="px-4 pt-4 pb-6 space-y-1">
                {/* Navigation Links */}
                <HeaderNavigation 
                  navigation={headerData.navigation} 
                  isScrolled={isScrolled}
                  isMobile={true}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
