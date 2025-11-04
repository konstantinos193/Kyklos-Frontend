"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@/components/icons";

interface DropdownItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  description?: string;
}

interface HeaderDropdownProps {
  label: string;
  items: DropdownItem[];
  isMobile?: boolean;
  className?: string;
  triggerClassName?: string;
  parentHref?: string;
}

export function HeaderDropdown({ label, items, isMobile = false, className = "", triggerClassName = "", parentHref }: HeaderDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150); // 150ms delay before closing
  };

  if (isMobile) {
    return (
      <div className={`relative ${className}`}>
        <div className="flex items-stretch gap-2">
          <a
            href={parentHref || '#'}
            className="flex-1 px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            onMouseEnter={(e) => (e.currentTarget.style.color = '#CE3B49')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#374151')}
          >
            {label}
          </a>
          <button
            onClick={handleToggle}
            aria-label="Toggle submenu"
            className="px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <ChevronDownIcon
              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
        
        {isOpen && (
          <div className="ml-4 mt-2 space-y-1 bg-gray-50 rounded-lg p-2 animate-in slide-in-from-top-2 duration-200">
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={handleItemClick}
                className="block px-3 py-2 text-sm text-gray-600 hover:bg-white hover:text-gray-900 rounded-md transition-colors duration-200"
                onMouseEnter={(e) => e.currentTarget.style.color = '#CE3B49'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      ref={dropdownRef}
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`flex items-center ${triggerClassName}`}>
        <a
          href={parentHref || '#'}
          className="text-sm font-medium text-gray-700 hover:text-[#CE3B49] transition-colors duration-200 rounded-md"
        >
          {label}
        </a>
        <button
          onClick={handleToggle}
          aria-label="Toggle submenu"
          className="ml-1 text-gray-700 hover:text-[#CE3B49] transition-colors duration-200"
        >
          <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-3 z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={handleItemClick}
                className="flex items-start px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 group"
                  onMouseEnter={(e) => e.currentTarget.style.color = '#CE3B49'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#374151'}
              >
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  {item.description && (
                    <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                  )}
                </div>
                {item.icon && (
                  <div className="ml-2 text-gray-400 group-hover:text-gray-600">
                    {item.icon}
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}