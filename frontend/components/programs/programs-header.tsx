"use client";

interface ProgramsHeaderProps {
  title: string;
  subtitle: string;
}

export function ProgramsHeader({ title, subtitle }: ProgramsHeaderProps) {
  return (
    <div className="text-center mb-12 sm:mb-16">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
        {title}
      </h2>
      <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-[#E7B109] to-[#D97706] rounded-full mx-auto mb-4 sm:mb-6"></div>
      <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
}