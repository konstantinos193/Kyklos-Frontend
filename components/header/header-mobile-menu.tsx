"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MenuIcon, CloseIcon } from "@/components/icons";
import { NavigationItem, HeaderButton } from "./types";
import { HeaderDropdown } from "./header-dropdown";

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
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;
    
    const handleScroll = () => {
      const sections = navigation
        .filter((item) => item.href.startsWith('#'))
        .map((item) => item.href.replace('#', ''));

      let currentSection = "";
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = `#${sectionId}`;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navigation, isOpen]);

  const handleNavClick = (href: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (href.startsWith('#')) {
      // Handle anchor links
      const element = document.querySelector(href);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    } else {
      // Handle route navigation
      router.push(href);
    }
    // Close mobile menu after navigation with small delay for smooth transition
    setTimeout(() => {
      onToggle();
    }, 100);
  };

  const handleButtonClick = (button: HeaderButton, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (button.onClick) {
      button.onClick();
    }
    if (button.href) {
      if (button.href.startsWith('#')) {
        const element = document.querySelector(button.href);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      } else {
        router.push(button.href);
      }
    }
    // Close mobile menu after action with small delay
    setTimeout(() => {
      onToggle();
    }, 100);
  };

  const isItemActive = (item: NavigationItem) => {
    if (item.href.startsWith('#')) {
      return activeSection === item.href;
    }
    return item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden p-2 rounded-lg border border-gray-300 bg-white text-[#1F1F1F] shadow-sm hover:bg-gray-50 active:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#CE3B49] focus:ring-offset-2 z-50 relative touch-manipulation"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggle();
        }}
        onTouchStart={(e) => {
          e.currentTarget.style.opacity = '0.8';
        }}
        onTouchEnd={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label="Toggle mobile menu"
        type="button"
      >
        {isOpen ? (
          <CloseIcon className="w-6 h-6 text-[#1F1F1F]" />
        ) : (
          <MenuIcon className="w-6 h-6 text-[#1F1F1F]" />
        )}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-[1px] z-[45] touch-none"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggle();
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              onToggle();
            }}
            aria-hidden="true"
          />
          
          {/* Menu Panel */}
          <div 
            id="mobile-menu"
            className="lg:hidden fixed top-0 left-0 right-0 bottom-0 bg-white shadow-xl z-[50] overflow-y-auto overscroll-contain touch-pan-y"
            onClick={(e) => {
              // Prevent closing when clicking inside menu
              e.stopPropagation();
            }}
          >
            <div className="px-4 py-6">
              <nav className="flex flex-col gap-2" role="navigation" aria-label="Mobile navigation">
                {navigation.map((item) => {
                  if (item.isDropdown && item.dropdownItems) {
                    return (
                      <HeaderDropdown
                        key={item.label}
                        label={item.label}
                        items={item.dropdownItems.map(di => ({
                          label: di.label,
                          href: di.href,
                        }))}
                        isMobile={true}
                        parentHref={item.href}
                      />
                    );
                  }

                  const isActive = isItemActive(item);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        if (item.href.startsWith('#')) {
                          handleNavClick(item.href, e);
                        } else {
                          e.preventDefault();
                          handleNavClick(item.href, e);
                        }
                      }}
                      onTouchStart={(e) => {
                        // Windows touch optimization
                        e.currentTarget.style.opacity = '0.8';
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.opacity = '1';
                      }}
                      className={`font-medium py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#CE3B49] focus:ring-offset-2 touch-manipulation ${
                        isActive
                          ? "text-[#CE3B49] bg-[#FEF2F2]"
                          : "text-gray-700 hover:text-[#CE3B49] hover:bg-gray-50 active:bg-gray-100"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                
                {/* Mobile Buttons */}
                <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-gray-200">
                  {buttons.map((button, index) => (
                    <Button
                      key={index}
                      variant={button.variant}
                      onClick={(e) => handleButtonClick(button, e)}
                      onTouchStart={(e) => {
                        // Windows touch optimization
                        e.currentTarget.style.opacity = '0.9';
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.opacity = '1';
                      }}
                      className={`w-full touch-manipulation ${
                        button.variant === "outline"
                          ? "border-[#0047AB] text-[#0047AB] hover:bg-[#0047AB] hover:text-white active:bg-[#0047AB]/90"
                          : "bg-gradient-to-r from-[#CE3B49] to-[#FF6B6B] text-white hover:from-[#B91C1C] hover:to-[#CE3B49] active:opacity-90"
                      } transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#CE3B49] focus:ring-offset-2`}
                    >
                      {button.label}
                    </Button>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}
