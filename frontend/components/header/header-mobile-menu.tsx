"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon, CloseIcon } from "@/components/icons";
import { NavigationItem, HeaderButton } from "./types";

interface HeaderMobileMenuProps {
  navigation: NavigationItem[];
  buttons: HeaderButton[];
  isScrolled: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

export function HeaderMobileMenu({ 
  navigation, 
  buttons, 
  isScrolled, 
  isOpen, 
  onToggle 
}: HeaderMobileMenuProps) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map(item => item.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(currentSection ? `#${currentSection}` : "");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navigation]);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    onToggle(); // Close mobile menu after navigation
  };

  const handleButtonClick = (button: HeaderButton) => {
    if (button.onClick) {
      button.onClick();
    }
    if (button.href) {
      const element = document.querySelector(button.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    onToggle(); // Close mobile menu after action
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden p-2 rounded-lg border border-gray-300 bg-white text-[#1F1F1F] shadow-sm hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label="Toggle mobile menu"
      >
        {isOpen ? (
          <CloseIcon className={`w-6 h-6 text-[#1F1F1F]`} />
        ) : (
          <MenuIcon className={`w-6 h-6 text-[#1F1F1F]`} />
        )}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div 
          id="mobile-menu"
          className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-4" role="navigation" aria-label="Mobile navigation">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`font-medium py-2 px-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#CE3B49] focus:ring-offset-2 ${
                    isScrolled 
                      ? "text-[#5A5A5A] hover:text-[#1F1F1F] hover:bg-gray-100" 
                      : "text-[#5A5A5A] hover:text-[#1F1F1F] hover:bg-gray-100"
                  } ${
                    activeSection === item.href ? "text-[#CE3B49] bg-[#CE3B49]/10" : ""
                  }`}
                  aria-current={activeSection === item.href ? "page" : undefined}
                >
                  {item.label}
                </a>
              ))}
              
              {/* Mobile Buttons */}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-200">
                {buttons.map((button, index) => (
                  <Button
                    key={index}
                    variant={button.variant}
                    onClick={() => handleButtonClick(button)}
                    className={`${
                      button.variant === "outline"
                        ? "border-[#0047AB] text-[#0047AB] hover:bg-[#0047AB] hover:text-white"
                        : "bg-gradient-to-r from-[#CE3B49] to-[#FF6B6B] text-white hover:from-[#B91C1C] hover:to-[#CE3B49]"
                    } transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#CE3B49] focus:ring-offset-2`}
                  >
                    {button.label}
                  </Button>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
