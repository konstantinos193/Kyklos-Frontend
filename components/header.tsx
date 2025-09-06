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

  return (
    <header className="relative z-50">
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      {/* Header Top - More subtle design */}
      <HeaderTop />
      
      {/* Main Navigation - Modern Schoolhouse.world Style */}
      <div 
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200" 
            : "bg-white border-b-2 border-gray-200"
        }`}
        style={{ height: '64px' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex h-full items-center justify-between">
            {/* Mobile menu button - Left side for mobile */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo */}
            <div className="flex items-center">
              <HeaderLogo logo={headerData.logo} isScrolled={isScrolled} />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <HeaderNavigation 
                navigation={headerData.navigation} 
                isScrolled={isScrolled} 
              />
            </div>

            {/* Right side - Search, Logo, and Actions */}
            <div className="flex items-center space-x-4">
              <HeaderSearchForm />
              
              {/* Right-side Logo */}
              <div className="hidden lg:flex items-center">
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
              
              {/* Auth Buttons - Desktop */}
              <div className="hidden md:flex items-center space-x-3">
                <a
                  href="/login"
                  className="text-sm font-medium text-gray-700 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-50"
                  onMouseEnter={(e) => e.currentTarget.style.color = '#E7B109'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#374151'}
                >
                  Σύνδεση
                </a>
                <a
                  href="/register"
                  className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
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

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
            <div className="px-4 pt-2 pb-3 space-y-1">
              <HeaderNavigation 
                navigation={headerData.navigation} 
                isScrolled={isScrolled}
                isMobile={true}
              />
              
              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-gray-200 mt-4">
                <div className="space-y-2">
                  <a
                    href="/login"
                    className="block w-full text-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200"
                    onMouseEnter={(e) => e.currentTarget.style.color = '#E7B109'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#374151'}
                  >
                    Σύνδεση
                  </a>
                  <a
                    href="/register"
                    className="block w-full text-center px-4 py-2 text-sm font-medium text-white rounded-md transition-colors duration-200"
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
        )}
      </div>
    </header>
  );
}
