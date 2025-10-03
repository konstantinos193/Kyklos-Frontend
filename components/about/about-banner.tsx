"use client";

interface AboutBannerProps {
  title: string;
  backgroundImage?: string;
  overlayOpacity?: number;
}

export function AboutBanner({ title, backgroundImage = "/placeholder.jpg", overlayOpacity = 0.35 }: AboutBannerProps) {
  return (
    <div
      className="relative w-full"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "#0b1c2a", opacity: overlayOpacity }}
      />

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl">
          <div className="text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {title}
            </h1>
            <div className="mt-4 h-1 w-20 bg-gradient-to-r from-[#CF3B49] to-[#E7B109] rounded-full" />
            <p className="mt-4 text-sm sm:text-base text-white/80 max-w-2xl">
              Εξειδικευμένη εκπαίδευση στην Ελληνική Γλώσσα & Λογοτεχνία. 25+ έτη εμπειρίας,
              95% επιτυχία, προσωπική προσέγγιση για κάθε μαθητή.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative bottom accent */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-1 w-full bg-gradient-to-r from-[#CF3B49] to-[#E7B109]" />
      </div>
    </div>
  );
}
