"use client";

import { useState, useRef, useEffect } from "react";
import { UserIcon, SettingsIcon, LogOutIcon, BellIcon, BookIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

interface UserMenuProps {
  isScrolled: boolean;
}

export function UserMenu({ isScrolled }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-slate-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-slate-700 hover:text-slate-900"
        aria-label="User menu"
      >
        <UserIcon className="w-5 h-5" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-xl border border-slate-200 py-3 z-50">
          <div className="px-4 py-3 border-b border-slate-200">
            <p className="text-sm font-medium text-slate-900">Welcome back</p>
            <p className="text-xs text-slate-500">admin@techflow.com</p>
          </div>
          
          <div className="py-2">
            <a
              href="#profile"
              className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 rounded-lg mx-2"
            >
              <UserIcon className="w-4 h-4 text-blue-600" />
              Profile
            </a>
            <a
              href="#dashboard"
              className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 rounded-lg mx-2"
            >
              <BookIcon className="w-4 h-4 text-blue-600" />
              Dashboard
            </a>
            <a
              href="#notifications"
              className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 rounded-lg mx-2"
            >
              <BellIcon className="w-4 h-4 text-blue-600" />
              Notifications
            </a>
            <a
              href="#settings"
              className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 rounded-lg mx-2"
            >
              <SettingsIcon className="w-4 h-4 text-blue-600" />
              Settings
            </a>
          </div>
          
          <div className="border-t border-slate-200 pt-2">
            <button className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 w-full text-left rounded-lg mx-2">
              <LogOutIcon className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
