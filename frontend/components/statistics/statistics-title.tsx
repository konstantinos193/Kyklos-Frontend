"use client";

interface StatisticsTitleProps {
  title: string;
  subtitle?: string;
}

export function StatisticsTitle({ title, subtitle }: StatisticsTitleProps) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl md:text-2xl text-gray-200 font-light max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
