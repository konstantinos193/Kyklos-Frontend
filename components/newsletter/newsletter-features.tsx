"use client";

import { NewsletterFeature } from "./types";

interface NewsletterFeaturesProps {
  features: NewsletterFeature[];
}

export function NewsletterFeatures({ features }: NewsletterFeaturesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {features.map((feature, index) => (
        <div 
          key={feature.id}
          className="group flex items-start gap-4 p-6 bg-white/50 backdrop-blur-sm rounded-2xl hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          style={{
            animationDelay: `${index * 100}ms`,
            animationFillMode: 'both'
          }}
        >
          {/* Icon */}
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#E7B109] to-[#D97706] rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
            {feature.icon}
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#E7B109] transition-colors duration-300">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
