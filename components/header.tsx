"use client";

import { useState, useEffect } from "react";
import { HeaderTop } from "./header/header-top";
import { HeaderLogo } from "./header/header-logo";
import { HeaderNavigation } from "./header/header-navigation";
import { HeaderSearchForm } from "./header/header-search-form";
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
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
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

            {/* Logo - Centered on mobile, left on desktop */}
            <div className="flex items-center flex-1 lg:flex-none justify-center lg:justify-start">
              <HeaderLogo logo={headerData.logo} isScrolled={isScrolled} />
            </div>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              <HeaderNavigation 
                navigation={headerData.navigation} 
                isScrolled={isScrolled} 
              />
            </div>

            {/* Right side - Search and Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search - Hidden on small mobile, visible on larger screens */}
              <div className="hidden sm:block">
                <HeaderSearchForm />
              </div>
              
              {/* Right-side Logo - Only on desktop */}
              <div className="hidden xl:flex items-center">
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-md flex items-center justify-center shadow-sm">
                    <span className="text-white font-bold text-sm">Κ</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900 leading-tight">
                      ΚΥΚΛΟΣ
                    </span>
                    <span className="text-xs text-gray-600 leading-tight">
                      Εκπαίδευση
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Auth Buttons - Responsive sizing */}
              <div className="hidden sm:flex items-center space-x-2 lg:space-x-3">
                <a
                  href="/login"
                  className="text-xs sm:text-sm font-medium text-gray-700 transition-colors duration-200 px-2 sm:px-3 py-2 rounded-md hover:bg-gray-50"
                  onMouseEnter={(e) => e.currentTarget.style.color = '#E7B109'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#374151'}
                >
                  Σύνδεση
                </a>
                <a
                  href="/register"
                  className="text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                  style={{ backgroundColor: '#E7B109' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D97706'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E7B109'}
                >
                  Εγγραφή
                </a>
              </div>
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
                {/* Mobile Search */}
                <div className="sm:hidden mb-4">
                  <HeaderSearchForm />
                </div>
                
                {/* Navigation Links */}
                <HeaderNavigation 
                  navigation={headerData.navigation} 
                  isScrolled={isScrolled}
                  isMobile={true}
                />
                
                {/* Mobile Auth Buttons */}
                <div className="pt-6 border-t border-gray-200 mt-6">
                  <div className="space-y-3">
                    <a
                      href="/login"
                      className="block w-full text-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 border border-gray-200"
                      onMouseEnter={(e) => e.currentTarget.style.color = '#E7B109'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#374151'}
                    >
                      Σύνδεση
                    </a>
                    <a
                      href="/register"
                      className="block w-full text-center px-4 py-3 text-base font-medium text-white rounded-lg transition-colors duration-200 shadow-sm"
                      style={{ backgroundColor: '#E7B109' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D97706'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E7B109'}
                    >
                      Εγγραφή
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
