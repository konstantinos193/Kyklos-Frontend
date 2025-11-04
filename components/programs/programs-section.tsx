"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ProgramsFeatures } from "./programs-features";
import { ProgramsGrid } from "./programs-grid";
import { ProgramsFilter } from "./programs-filter";
import { programsData } from "./data";
import { ProgramLevel } from "./types";
import { Search, X, Filter } from "lucide-react";

export function ProgramsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [selectedDuration, setSelectedDuration] = useState<string>("all");
  const [minHours, setMinHours] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique values for filters
  const uniqueDurations = useMemo(() => {
    const durations = new Set(programsData.levels.map(level => level.duration));
    return Array.from(durations);
  }, []);

  const maxHours = useMemo(() => {
    return Math.max(...programsData.levels.map(level => level.totalHours), 0);
  }, []);

  // Filter programs
  const filteredPrograms = useMemo(() => {
    return programsData.levels.filter((level: ProgramLevel) => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesName = level.name.toLowerCase().includes(searchLower);
        const matchesDescription = level.description.toLowerCase().includes(searchLower);
        const matchesSubjects = level.subjects.some(subj => 
          subj.name.toLowerCase().includes(searchLower) || 
          subj.description.toLowerCase().includes(searchLower)
        );
        if (!matchesName && !matchesDescription && !matchesSubjects) {
          return false;
        }
      }

      // Color filter
      if (selectedColor !== "all" && level.color !== selectedColor) {
        return false;
      }

      // Duration filter
      if (selectedDuration !== "all" && level.duration !== selectedDuration) {
        return false;
      }

      // Hours filter
      if (level.totalHours < minHours) {
        return false;
      }

      return true;
    });
  }, [searchTerm, selectedColor, selectedDuration, minHours]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedColor("all");
    setSelectedDuration("all");
    setMinHours(0);
  };

  const activeFiltersCount = [
    searchTerm,
    selectedColor !== "all",
    selectedDuration !== "all",
    minHours > 0
  ].filter(Boolean).length;

  return (
    <section id="programs" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            {programsData.title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {programsData.subtitle}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 sm:mb-12">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Αναζήτηση προγραμμάτων..."
                className="w-full pl-12 pr-10 py-3 sm:py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E7B109] focus:border-transparent shadow-sm text-base"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Toggle */}
          <div className="flex justify-center items-center gap-4 mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                showFilters
                  ? "bg-[#E7B109] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Filter className="w-4 h-4" />
              Φίλτρα
              {activeFiltersCount > 0 && (
                <span className="bg-white text-[#E7B109] px-2 py-0.5 rounded-full text-xs font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>
            
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                <X className="w-4 h-4" />
                Καθαρισμός
              </button>
            )}
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6 max-w-4xl mx-auto">
              <ProgramsFilter
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedDuration={selectedDuration}
                setSelectedDuration={setSelectedDuration}
                minHours={minHours}
                setMinHours={setMinHours}
                maxHours={maxHours}
                uniqueDurations={uniqueDurations}
              />
            </div>
          )}

          {/* Results Count */}
          <div className="text-center text-gray-600 mb-4">
            {filteredPrograms.length === programsData.levels.length ? (
              <span>Εμφάνιση όλων των προγραμμάτων ({filteredPrograms.length})</span>
            ) : (
              <span>
                Βρέθηκαν <strong>{filteredPrograms.length}</strong> από <strong>{programsData.levels.length}</strong> προγράμματα
              </span>
            )}
          </div>
        </div>

        {/* Programs Grid */}
        {filteredPrograms.length > 0 ? (
          <ProgramsGrid levels={filteredPrograms} />
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-gray-600 text-lg mb-4">Δεν βρέθηκαν προγράμματα με τα επιλεγμένα κριτήρια.</p>
            <button
              onClick={clearFilters}
              className="text-[#E7B109] hover:text-[#D97706] font-semibold underline"
            >
              Καθαρίστε τα φίλτρα
            </button>
          </div>
        )}

        {/* Features */}
        <div className="mt-12 sm:mt-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            Γιατί να Επιλέξετε το ΚΥΚΛΟΣ;
          </h3>
          <ProgramsFeatures features={programsData.features} />
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 text-center bg-gradient-to-r from-[#E7B109] via-[#CE3B49] to-[#D97706] rounded-2xl p-8 sm:p-12 text-white">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Έτοιμοι να Ξεκινήσετε;
          </h3>
          <p className="text-lg sm:text-xl mb-6 text-white/90">
            {programsData.cta.description}
          </p>
          <Link
            href={programsData.cta.href}
            className="inline-flex items-center px-8 py-4 bg-white text-[#CE3B49] font-semibold rounded-lg hover:bg-gray-100 hover:text-[#CE3B49] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {programsData.cta.label}
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
