"use client";

import { ProgramFeature } from "./types";

interface ProgramsFeaturesProps {
  features: ProgramFeature[];
}

export function ProgramsFeatures({ features }: ProgramsFeaturesProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <div 
          key={index}
          className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <div className="text-4xl mb-4">{feature.icon}</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
