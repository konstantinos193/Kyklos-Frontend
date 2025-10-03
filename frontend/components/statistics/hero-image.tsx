"use client";

import Image from "next/image";
import { StatisticsContent } from "./types";

interface HeroImageProps {
  content: StatisticsContent;
}

export function HeroImage({ content }: HeroImageProps) {
  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-xl shadow-lg">
        <Image
          src={content.image.src}
          alt={content.image.alt}
          width={800}
          height={600}
          className="w-full h-64 object-cover"
          quality={75}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      
      {/* Text Banners */}
      <div className="space-y-3">
        {content.banners.map((banner, index) => {
          const getBannerColor = () => {
            switch (banner.color) {
              case 'blue':
                return 'bg-blue-500';
              case 'magenta':
                return 'bg-pink-500';
              case 'green':
                return 'bg-green-500';
              default:
                return 'bg-blue-500';
            }
          };
          
          return (
            <div
              key={index}
              className={`${getBannerColor()} px-4 py-3 rounded-lg shadow-md`}
            >
              <p className="text-white font-medium text-center">
                {banner.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
