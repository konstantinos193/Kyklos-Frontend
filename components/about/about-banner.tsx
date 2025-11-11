"use client";

interface AboutBannerProps {
  title: string;
  backgroundImage?: string;
  overlayOpacity?: number;
}

export function AboutBanner({ title }: AboutBannerProps) {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Graphic Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Animated gradient overlay */}
        <div 
          className="absolute inset-0 animate-gradient-x"
          style={{
            backgroundImage: 'linear-gradient(90deg, rgba(206, 59, 73, 0.2) 0%, rgba(231, 177, 9, 0.2) 50%, rgba(206, 59, 73, 0.2) 100%)',
          }}
        />
        
        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(30deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%, transparent),
              linear-gradient(60deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 0 0, 0 0'
          }} />
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#E7B109]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#CE3B49]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#E7B109]/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {title}
            </h1>
            <div className="mt-4 h-1 w-20 bg-gradient-to-r from-[#CF3B49] to-[#E7B109] rounded-full" />
          </div>
        </div>
      </div>

      {/* Decorative bottom accent */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-1 w-full bg-gradient-to-r from-[#CF3B49] via-[#E7B109] to-[#CF3B49]" />
      </div>
    </div>
  );
}
