"use client";

import { SpecialtyItem } from "./types";
import { BookIcon, DocumentIcon, TrophyIcon } from "./icons";

interface SpecialtyCardProps {
  item: SpecialtyItem;
  index: number;
}

export function SpecialtyCard({ item, index }: SpecialtyCardProps) {
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'book':
        return <BookIcon className="w-10 h-10" />;
      case 'document':
        return <DocumentIcon className="w-10 h-10" />;
      case 'trophy':
        return <TrophyIcon className="w-10 h-10" />;
      default:
        return <BookIcon className="w-10 h-10" />;
    }
  };

  return (
    <div 
      className="group animate-fadeInUp"
      style={{
        animationDelay: `${index * 200}ms`,
        animationFillMode: 'both'
      }}
    >
      <div className={`single-specialty ${item.isActive ? 'active' : ''}`}>
        <div className="specialty-box group-hover:scale-105 transition-all duration-500">
          <a 
            href={item.href} 
            target={item.target}
            className="block p-10 text-center bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-[#E7B109] relative overflow-hidden group-hover:-translate-y-2"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 group-hover:opacity-15 transition-opacity duration-500">
              <div className="absolute top-0 left-0 w-40 h-40 bg-[#E7B109] rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-purple-500 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500"></div>
            </div>

            {/* Active State Overlay */}
            {item.isActive && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#E7B109]/15 to-[#D97706]/15 rounded-3xl"></div>
            )}

            {/* Content */}
            <div className="relative z-10">
              {/* Icon */}
              <div className="box-icon mb-8">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#E7B109] to-[#D97706] rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <div className="text-white group-hover:scale-110 transition-transform duration-500">
                    {getIcon(item.icon)}
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="box-content">
                <p className="text-xl font-bold text-gray-900 group-hover:text-[#E7B109] transition-colors duration-500 leading-tight">
                  {item.title}
                </p>
              </div>

              {/* Hover Arrow */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#E7B109]/10 rounded-full">
                  <svg className="w-6 h-6 text-[#E7B109]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Active State Indicator */}
            {item.isActive && (
              <div className="absolute top-6 right-6">
                <div className="w-4 h-4 bg-[#E7B109] rounded-full shadow-lg animate-pulse"></div>
              </div>
            )}

            {/* Hover Effect Border */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#E7B109]/30 transition-colors duration-500"></div>
          </a>
        </div>
      </div>
    </div>
  );
}
