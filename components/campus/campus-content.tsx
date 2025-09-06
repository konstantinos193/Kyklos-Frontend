"use client";

interface CampusContentProps {
  title: string;
  buttonText: string;
  buttonHref: string;
}

export function CampusContentComponent({ title, buttonText, buttonHref }: CampusContentProps) {
  return (
    <div className="flex flex-col justify-center h-full p-8 md:p-12">
      <div className="max-w-md">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {title}
        </h2>
        
        <div className="w-20 h-1 bg-gradient-to-r from-[#E7B109] to-[#D97706] mb-8 rounded-full"></div>
        
        <a
          href={buttonHref}
          className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#E7B109] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <span>{buttonText}</span>
          <svg 
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}
