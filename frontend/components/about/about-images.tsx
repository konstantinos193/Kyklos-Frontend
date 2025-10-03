"use client";

import Image from "next/image";
import { AboutImage } from "./types";

interface AboutImagesProps {
  images: AboutImage[];
}

export function AboutImages({ images }: AboutImagesProps) {
  const getImagePosition = (position: AboutImage['position']) => {
    switch (position) {
      case 'top-left':
        return 'col-start-1 row-start-1';
      case 'top-right':
        return 'col-start-2 row-start-1 mt-8';
      case 'bottom-left':
        return 'col-start-1 row-start-2 -mt-6';
      case 'bottom-right':
        return 'col-start-2 row-start-2 mt-6';
      default:
        return '';
    }
  };

  return (
    <div className="relative">
      {/* Images Grid */}
      <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative group ${getImagePosition(image.position)}`}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-105">
              <div className="relative h-64">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={60}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              {/* Hover Content */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <button 
                  onClick={() => window.open(image.src, '_blank')}
                  className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300 hover:bg-white hover:shadow-lg cursor-pointer"
                  title="View full size image"
                >
                  <svg className="w-8 h-8 text-[#E7B109]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-[#E7B109]/20 to-[#D97706]/20 rounded-full blur-xl"></div>
      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
    </div>
  );
}
