import type { StatisticsHeader as StatisticsHeaderType } from "./types";

interface StatisticsHeaderProps {
  header: StatisticsHeaderType;
}

export function StatisticsHeader({ header }: StatisticsHeaderProps) {
  return (
    <div className="text-center mb-20">
      {/* Professional Badge */}
      <div className="inline-flex items-center px-4 py-2 mb-6 bg-blue-500/10 border border-blue-500/20 rounded-full">
        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
        <span className="text-blue-300 text-sm font-medium tracking-wide uppercase">
          Enterprise Platform
        </span>
      </div>
      
      {/* Main Title */}
      <h2 className="h2 text-white mb-8 text-balance leading-tight">
        {header.title}
      </h2>
      
      {/* Professional Description */}
      <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8 font-light">
        {header.description}
      </p>
      
      {/* Trust Indicators */}
      <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-green-400 rounded-full"></div>
          <span>ISO 27001 Certified</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-green-400 rounded-full"></div>
          <span>SOC 2 Type II</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-green-400 rounded-full"></div>
          <span>GDPR Compliant</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-green-400 rounded-full"></div>
          <span>Enterprise Ready</span>
        </div>
      </div>
    </div>
  );
}
