"use client";

import { useState, useEffect } from "react";
import { NavigationItem } from "./types";
import { HeaderDropdown } from "./header-dropdown";

interface HeaderNavigationProps {
  navigation: NavigationItem[];
  isScrolled: boolean;
  isMobile?: boolean;
}

export function HeaderNavigation({ navigation, isScrolled, isMobile = false }: HeaderNavigationProps) {
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
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navigation]);

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    // For external links, let the browser handle navigation
  };

  if (isMobile) {
    return (
      <div className="space-y-2">
        {navigation.map((item) => {
          if (item.isDropdown && item.dropdownItems) {
            return (
              <HeaderDropdown
                key={item.label}
                label={item.label}
                items={item.dropdownItems}
                isMobile={true}
              />
            );
          }

          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                if (item.href.startsWith('#')) {
                  e.preventDefault();
                  handleNavClick(item.href);
                }
              }}
              className={`block px-4 py-4 text-lg font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 touch-manipulation ${
                activeSection === item.href ? "font-semibold bg-yellow-50 border-l-4 border-[#E7B109]" : "border-l-4 border-transparent"
              }`}
              style={{
                color: activeSection === item.href ? '#E7B109' : '#374151',
              }}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-8">
      {navigation.map((item) => {
        if (item.isDropdown && item.dropdownItems) {
          return (
            <HeaderDropdown
              key={item.label}
              label={item.label}
              items={item.dropdownItems}
              isMobile={false}
            />
          );
        }

        return (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => {
              if (item.href.startsWith('#')) {
                e.preventDefault();
                handleNavClick(item.href);
              }
            }}
            className={`text-sm font-medium text-gray-700 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-50 ${
              activeSection === item.href ? "font-semibold" : ""
            }`}
            style={{
              color: activeSection === item.href ? '#E7B109' : '#374151',
              backgroundColor: activeSection === item.href ? '#FEF3C7' : 'transparent'
            }}
            onMouseEnter={(e) => {
              if (activeSection !== item.href) {
                e.currentTarget.style.color = '#E7B109';
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== item.href) {
                e.currentTarget.style.color = '#374151';
              }
            }}
          >
            {item.label}
          </a>
        );
      })}
    </div>
  );
}