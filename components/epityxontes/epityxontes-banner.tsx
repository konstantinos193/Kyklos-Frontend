"use client";

interface EpityxontesBannerProps {
  title: string;
  description?: string;
}

export function EpityxontesBanner({ 
  title, 
  description = "Ιστορικό επιτυχιών ανά σχολικό έτος. Οι επιτυχίες των μαθητών μας αποτελούν την καλύτερη απόδειξη της ποιότητας της εκπαίδευσης που προσφέρουμε."
}: EpityxontesBannerProps) {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Graphic Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Animated gradient overlay - success theme colors */}
        <div 
          className="absolute inset-0 animate-gradient-x"
          style={{
            backgroundImage: 'linear-gradient(90deg, rgba(206, 59, 73, 0.15) 0%, rgba(34, 197, 94, 0.15) 50%, rgba(206, 59, 73, 0.15) 100%)',
          }}
        />
        
        {/* Geometric Pattern - star/achievement pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, rgba(255,255,255,0.08) 1px, transparent 0),
              radial-gradient(circle at 2px 2px, rgba(255,255,255,0.08) 1px, transparent 0)
            `,
            backgroundSize: '40px 40px, 80px 80px',
            backgroundPosition: '0 0, 20px 20px'
          }} />
        </div>

        {/* Decorative Circles - success theme */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#22C55E]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#CE3B49]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#22C55E]/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-left">
            <p className="text-xs md:text-sm text-white/80 mb-2">Αρχική / Επιτυχόντες</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white mb-6">
              {title}
            </h1>
            <div className="mt-4 h-1 w-20 bg-gradient-to-r from-[#CF3B49] to-[#22C55E] rounded-full" />
            <p className="mt-6 text-base sm:text-lg text-white/90 max-w-3xl leading-relaxed">
              {description}
            </p>
            
            {/* Stats */}
            <div className="mt-8 flex flex-wrap gap-6 sm:gap-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
                <span className="text-sm sm:text-base text-white/80">
                  Πολυετής Εμπειρία
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#CE3B49] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                <span className="text-sm sm:text-base text-white/80">
                  Αποδεδειγμένες Επιτυχίες
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                <span className="text-sm sm:text-base text-white/80">
                  Ιστορικό Επιτυχιών
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom accent */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-1 w-full bg-gradient-to-r from-[#CF3B49] via-[#22C55E] to-[#CF3B49]" />
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          className="relative block w-full h-12 sm:h-16 lg:h-20" 
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M0,60 C240,100 480,20 720,50 C960,80 1200,40 1440,60 L1440,120 L0,120 Z" 
            fill="rgb(226, 232, 240)"
            className="opacity-100"
          />
        </svg>
      </div>
    </div>
  );
}

