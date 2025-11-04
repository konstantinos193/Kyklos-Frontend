"use client";

import { ProgramLevel } from "./types";

interface ProgramsFilterProps {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedDuration: string;
  setSelectedDuration: (duration: string) => void;
  minHours: number;
  setMinHours: (hours: number) => void;
  maxHours: number;
  uniqueDurations: string[];
}

const colorOptions = [
  { value: "all", label: "Όλα", color: "bg-gray-500" },
  { value: "blue", label: "Μπλε", color: "bg-blue-500" },
  { value: "green", label: "Πράσινο", color: "bg-green-500" },
  { value: "purple", label: "Μωβ", color: "bg-purple-500" },
  { value: "yellow", label: "Κίτρινο", color: "bg-yellow-500" },
  { value: "red", label: "Κόκκινο", color: "bg-red-500" },
  { value: "indigo", label: "Ινδικό", color: "bg-indigo-500" }
];

export function ProgramsFilter({
  selectedColor,
  setSelectedColor,
  selectedDuration,
  setSelectedDuration,
  minHours,
  setMinHours,
  maxHours,
  uniqueDurations
}: ProgramsFilterProps) {
  // Filter component for programs
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Color Filter */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Χρώμα
        </label>
        <div className="space-y-2">
          {colorOptions.map((option) => (
            <label
              key={option.value}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                selectedColor === option.value
                  ? "bg-[#E7B109]/20 border-2 border-[#E7B109]"
                  : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
              }`}
            >
              <input
                type="radio"
                name="color"
                value={option.value}
                checked={selectedColor === option.value}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full ${option.color} ${selectedColor === option.value ? "ring-2 ring-offset-2 ring-[#E7B109]" : ""}`} />
              <span className="text-sm font-medium text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Duration Filter */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Διάρκεια
        </label>
        <select
          value={selectedDuration}
          onChange={(e) => setSelectedDuration(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent bg-white"
        >
          <option value="all">Όλες οι Διάρκειες</option>
          {uniqueDurations.map((duration) => (
            <option key={duration} value={duration}>
              {duration}
            </option>
          ))}
        </select>
      </div>

      {/* Hours Filter */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Ελάχιστες Ώρες/Εβδομάδα: <span className="text-[#E7B109] font-bold">{minHours}</span>
        </label>
        <input
          type="range"
          min="0"
          max={maxHours}
          value={minHours}
          onChange={(e) => setMinHours(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E7B109]"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0</span>
          <span>{maxHours}</span>
        </div>
      </div>
    </div>
  );
}

