import Link from 'next/link';
import successStories from '@/data/success-stories';

export const metadata = {
  title: 'Επιτυχόντες - ΚΥΚΛΟΣ Φροντιστήριο',
  description: 'Επιτυχόντες προηγούμενων ετών',
};

export default function Page() {
  return (
    <main className="min-h-screen">
      {/* Banner */}
      <section className="relative isolate">
        <div className="relative h-48 md:h-56 w-full overflow-hidden">
          {/* Smart generated banner: gradient + subtle grid pattern */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0ea5e9]" />
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: '24px 24px, 24px 24px',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="relative z-10 mx-auto flex h-full max-w-6xl items-end px-4 pb-6">
            <div>
              <p className="text-xs md:text-sm text-white/80">Αρχική / Επιτυχόντες</p>
              <h1 className="mt-1 text-2xl md:text-4xl font-bold text-white tracking-tight">Επιτυχόντες</h1>
              <p className="mt-1 text-white/90 text-sm md:text-base">Ιστορικό επιτυχιών ανά σχολικό έτος</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-10 md:py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {successStories.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-gray-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                    {item.title}
                  </h3>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-100 transition-colors group-hover:bg-blue-100">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </div>
                <div className="mt-4 text-sm text-blue-600 group-hover:underline">Περισσότερα</div>
                <div className="pointer-events-none absolute inset-0 -z-10 rounded-xl bg-gradient-to-tr from-blue-50/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}


