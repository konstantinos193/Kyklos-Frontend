"use client";

interface AboutHighlightProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function AboutHighlight({
  title = "Γνωρίστε την Προσέγγισή μας",
  description = "Δεν διαθέτουμε video αυτή τη στιγμή. Δείτε συνοπτικά την εκπαιδευτική φιλοσοφία μας και επικοινωνήστε για μια προσωπική παρουσίαση.",
  imageUrl = "https://placehold.co/1200x675/0F172A/FFFFFF?text=ΚΥΚΛΟΣ+Εκπαίδευση",
  ctaLabel = "Κλείστε Παρουσίαση",
  ctaHref = "/contact",
}: AboutHighlightProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Visual placeholder with preserved aspect ratio */}
          <div className="lg:col-span-7">
            <div className="relative w-full overflow-hidden rounded-2xl shadow-xl">
              <div
                className="w-full"
                style={{
                  position: "relative",
                  paddingTop: "56.25%",
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-4 right-4">
                <span className="inline-flex items-center gap-2 bg-white/90 text-gray-900 px-3 py-1.5 rounded-full text-xs shadow">
                  <span className="w-2 h-2 rounded-full bg-[#E7B109]" />
                  Showcase Image
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-5">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">{title}</h3>
            <p className="mt-4 text-slate-600 leading-relaxed">{description}</p>
            <div className="mt-6">
              <a
                href={ctaHref}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E7B109] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-md"
              >
                {ctaLabel}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


