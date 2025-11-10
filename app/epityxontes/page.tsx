import Link from 'next/link';
import successStories from '@/data/success-stories';
import { EpityxontesBanner } from '@/components/epityxontes/epityxontes-banner';

export const metadata = {
  title: 'Επιτυχόντες - ΚΥΚΛΟΣ Φροντιστήριο',
  description: 'Επιτυχόντες προηγούμενων ετών',
};

export default function Page() {
  return (
    <main className="min-h-screen">
      <EpityxontesBanner 
        title="Επιτυχόντες"
        description="Ιστορικό επιτυχιών ανά σχολικό έτος. Οι επιτυχίες των μαθητών μας αποτελούν την καλύτερη απόδειξη της ποιότητας της εκπαίδευσης που προσφέρουμε."
      />

      {/* Grid */}
      <section className="py-10 md:py-12 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {successStories.map((item, index) => {
              // Center the last item if it's alone in the row
              const isLastItem = index === successStories.length - 1;
              const itemsInLastRow = successStories.length % 3;
              const shouldCenter = isLastItem && itemsInLastRow === 1;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-gray-300 ${
                    shouldCenter ? 'sm:col-start-1 sm:col-end-3 lg:col-start-2 lg:col-end-3' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                      {item.title}
                    </h3>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#CE3B49]/10 text-[#CE3B49] ring-1 ring-inset ring-[#CE3B49]/20 transition-colors group-hover:bg-[#CE3B49]/20 flex-shrink-0">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-4 text-sm text-[#CE3B49] group-hover:underline">Περισσότερα</div>
                  <div className="pointer-events-none absolute inset-0 -z-10 rounded-xl bg-gradient-to-tr from-[#CE3B49]/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}


