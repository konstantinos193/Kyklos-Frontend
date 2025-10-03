"use client";

import { useState, useRef, useEffect } from "react";
import { SearchIcon, CloseIcon } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeaderSearchProps {
  isScrolled: boolean;
}

export function HeaderSearch({ isScrolled }: HeaderSearchProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Here you would implement actual search functionality
      console.log("Searching for:", searchQuery);
      // For now, just close the search
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery("");
    }
  };

  if (isSearchOpen) {
    return (
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            ref={searchInputRef}
            type="text"
            placeholder="Αναζήτηση..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 w-64 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsSearchOpen(false)}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
          >
            <CloseIcon className="w-4 h-4" />
          </Button>
        </div>
        <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md">
          Αναζήτηση
        </Button>
      </form>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleSearch}
      className={`p-2 rounded-lg hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        isScrolled ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100" : "text-slate-200 hover:text-white hover:bg-white/10"
      }`}
      aria-label="Open search"
    >
      <SearchIcon className="w-5 h-5" />
    </Button>
  );
}
