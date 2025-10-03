"use client";

import { useState } from "react";
import { SearchIcon } from "@/components/icons";

export function HeaderSearchForm() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Αναζήτηση..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-40 md:w-48 lg:w-56 xl:w-64 2xl:w-72 max-w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CE3B49] focus:border-[#CE3B49] bg-white hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    </form>
  );
}
