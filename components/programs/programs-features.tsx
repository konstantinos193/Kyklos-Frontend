"use client";

import Image from "next/image";
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
          className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
        >
          <div className="flex justify-center mb-4">
            {feature.icon === "🏛️" ? (
              <div className="w-16 h-16 bg-gradient-to-br from-[#E7B109] to-[#D97706] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Image
                  src="/svg's/institution.svg"
                  alt="Institution"
                  width={32}
                  height={32}
                  className="filter brightness-0 invert"
                  style={{ shapeRendering: 'geometricPrecision' }}
                  priority
                  quality={100}
                />
              </div>
            ) : feature.icon === "👥" ? (
              <div className="w-16 h-16 bg-gradient-to-br from-[#CF3B49] to-[#E7B109] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Image
                  src="/svg's/users.svg"
                  alt="Users"
                  width={32}
                  height={32}
                  className="filter brightness-0 invert"
                  style={{ shapeRendering: 'geometricPrecision' }}
                  priority
                  quality={100}
                />
              </div>
            ) : feature.icon === "🏆" ? (
              <div className="w-16 h-16 bg-gradient-to-br from-[#E7B109] to-[#D97706] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Image
                  src="/svg's/trophy.svg"
                  alt="Trophy"
                  width={32}
                  height={32}
                  className="filter brightness-0 invert"
                  style={{ shapeRendering: 'geometricPrecision' }}
                  priority
                  quality={100}
                />
              </div>
            ) : feature.icon === "🤝" ? (
              <div className="w-16 h-16 bg-gradient-to-br from-[#CF3B49] to-[#E7B109] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Image
                  src="/svg's/handshake.svg"
                  alt="Handshake"
                  width={32}
                  height={32}
                  className="filter brightness-0 invert"
                  style={{ shapeRendering: 'geometricPrecision' }}
                  priority
                  quality={100}
                />
              </div>
            ) : (
              <div className="text-4xl mb-4">{feature.icon}</div>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
