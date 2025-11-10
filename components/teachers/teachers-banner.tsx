"use client";

interface TeachersBannerProps {
  title: string;
  description?: string;
}

export function TeachersBanner({ 
  title, 
  description = "Εξειδικευμένοι καθηγητές με αποδεδειγμένη εμπειρία σε όλα τα μαθήματα. Προσωπική προσέγγιση, σύγχρονες μεθόδους διδασκαλίας και αφοσίωση στην επιτυχία κάθε μαθητή."
}: TeachersBannerProps) {
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white mb-6">
              {title}
            </h1>
            <div className="mt-4 h-1 w-20 bg-gradient-to-r from-[#CF3B49] to-[#E7B109] rounded-full" />
            <p className="mt-6 text-base sm:text-lg text-white/90 max-w-3xl leading-relaxed">
              {description}
            </p>
            
            {/* Stats */}
            <div className="mt-8 flex flex-wrap gap-6 sm:gap-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#E7B109] rounded-full animate-pulse" />
                <span className="text-sm sm:text-base text-white/80">
                  Εξειδικευμένοι Καθηγητές
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#CE3B49] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                <span className="text-sm sm:text-base text-white/80">
                  Σύγχρονες Μέθοδοι
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#E7B109] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                <span className="text-sm sm:text-base text-white/80">
                  Προσωπική Προσέγγιση
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom accent */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-1 w-full bg-gradient-to-r from-[#CF3B49] via-[#E7B109] to-[#CF3B49]" />
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

