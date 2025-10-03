"use client";

interface BlogHeaderProps {
  title: string;
  subtitle: string;
}

export function BlogHeader({ title, subtitle }: BlogHeaderProps) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
        {title}
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-[#E7B109] to-[#D97706] mx-auto mb-6 rounded-full"></div>
      <p className="text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}
