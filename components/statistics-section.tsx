"use client";

import { StatisticsCards, HeroImage, StatisticsTitle, statisticsContent } from "./statistics";

export function StatisticsSection() {
  return (
    <section id="statistics" className="py-16 sm:py-20 bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <StatisticsTitle 
          title={statisticsContent.title}
          subtitle={statisticsContent.subtitle}
        />
        
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left - Statistics Cards */}
          <div className="order-2 lg:order-1">
            <StatisticsCards stats={statisticsContent.stats} />
          </div>
          
          {/* Right - Hero Image with Banners */}
          <div className="order-1 lg:order-2">
            <HeroImage content={statisticsContent} />
          </div>
        </div>
      </div>
    </section>
  );
}
