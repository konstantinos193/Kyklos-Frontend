"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HeaderTop } from "./header/header-top";
import { HeaderLogo } from "./header/header-logo";
import { HeaderNavigation } from "./header/header-navigation";
import { ScrollProgress } from "./header/scroll-progress";
import { AnnouncementBar } from "./header/announcement-bar";
import { headerData } from "./header/data";
import { HeaderButtons } from "./header/header-buttons";
import { HeaderMobileMenu } from "./header/header-mobile-menu";

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
            {/* Mobile Menu (button + panel) */}
            <div className="lg:hidden">
              <HeaderMobileMenu
                navigation={headerData.navigation}
                buttons={headerData.buttons}
                isScrolled={isScrolled}
                isOpen={isMobileMenuOpen}
                onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
 
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

            {/* Right side actions */}
            <div className="ml-auto hidden lg:flex items-center">
              <HeaderButtons buttons={headerData.buttons} isScrolled={isScrolled} />
            </div>
          </div>
        </div>

        {/* Mobile menu handled by HeaderMobileMenu above */}
      </div>
    </header>
  );
}
