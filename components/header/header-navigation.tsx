"use client";

import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { NavigationItem } from "./types";
import { HeaderDropdown } from "./header-dropdown";

interface HeaderNavigationProps {
  navigation: NavigationItem[];
  isScrolled: boolean;
  isMobile?: boolean;
}

export function HeaderNavigation({ navigation, isScrolled, isMobile = false }: HeaderNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();
  const [maxVisible, setMaxVisible] = useState<number>(9);

  useEffect(() => {
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
  }, [navigation]);

  useEffect(() => {
    const computeMaxVisible = () => {
      const width = window.innerWidth;
      // Even more conservative to ensure no overlap at lg
      if (width >= 1536) return setMaxVisible(8); // 2xl
      if (width >= 1280) return setMaxVisible(6); // xl
      if (width >= 1024) return setMaxVisible(4); // lg
      return setMaxVisible(navigation.length);
    };
    computeMaxVisible();
    window.addEventListener("resize", computeMaxVisible);
    return () => window.removeEventListener("resize", computeMaxVisible);
  }, [navigation.length]);

  const handleNavClick = (href: string) => {
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setActiveSection(href);
    }
  };

  const { visibleNav } = useMemo(() => {
    if (isMobile) {
      return { visibleNav: navigation } as { visibleNav: NavigationItem[] };
    }
    const pinnedLabels = ["Ποιοί Είμαστε", "Πρόγραμμα Σπουδών", "Επικοινωνία"];
    const pinned = navigation.filter((n) => pinnedLabels.includes(n.label));
    const others = navigation.filter((n) => !pinnedLabels.includes(n.label));

    const slotsLeft = Math.max(0, maxVisible - pinned.length);
    const vis = [...pinned, ...others.slice(0, slotsLeft)];

    return { visibleNav: vis };
  }, [navigation, maxVisible, isMobile]);

  const isItemActive = (item: NavigationItem) => {
    if (item.href.startsWith('#')) return activeSection === item.href;
    return item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
  };

  if (isMobile) {
    return (
      <div className="flex flex-col space-y-4">
        {navigation.map((item) => {
          if (item.isDropdown && item.dropdownItems) {
            return (
              <HeaderDropdown
                key={item.label}
                label={item.label}
                items={item.dropdownItems}
                isMobile={true}
                parentHref={item.href}
              />
            );
          }

          const isActive = isItemActive(item);

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
              className={`text-base font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive
                  ? 'text-[#CE3B49] bg-[#FEF2F2]'
                  : 'text-gray-700 hover:text-[#CE3B49] hover:bg-gray-50'
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5 xl:gap-3.5 2xl:gap-4 whitespace-nowrap">
      {visibleNav.map((item) => {
        if (item.isDropdown && item.dropdownItems) {
          return (
            <HeaderDropdown
              key={item.label}
              label={item.label}
              items={item.dropdownItems}
              isMobile={false}
              parentHref={item.href}
              triggerClassName="px-1.5 xl:px-2 py-1.5"
            />
          );
        }

        const isActive = isItemActive(item);

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
            className={`text-[13px] sm:text-sm font-medium px-1.5 xl:px-2 py-1.5 transition-colors duration-200 border-b-2 ${
              isActive
                ? 'text-[#CE3B49] border-[#CE3B49]'
                : 'text-gray-700 border-transparent hover:text-[#CE3B49] hover:border-[#FECACA]'
            }`}
          >
            {item.label}
          </a>
        );
      })}
    </div>
  );
}