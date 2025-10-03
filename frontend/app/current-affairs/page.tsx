import Link from "next/link";
import { AboutBanner } from "@/components/about/about-banner";

export default function CurrentAffairsPage() {
  const categories = [
    { href: "/current-affairs/education", label: "Εκπαιδευτικά Νέα", description: "Νέα και ενημερώσεις από την εκπαίδευση" },
    { href: "/current-affairs/universities", label: "Πανεπιστήμια", description: "Ανακοινώσεις και πληροφορίες από ΑΕΙ" },
  ];

  return (
    <main>
      <AboutBanner
        title="Επικαιρότητα"
        backgroundImage={
          "https://placehold.co/1600x500/E7B109/FFFFFF?text=%CE%95%CF%80%CE%B9%CE%BA%CE%B1%CE%B9%CF%81%CF%8C%CF%84%CE%B7%CF%84%CE%B1"
        }
        overlayOpacity={0.35}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {categories.map((c) => (
            <Link key={c.href} href={c.href} className="group block">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition">
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-[#B91C1C]">{c.label}</h2>
                <p className="mt-1 text-sm text-gray-600">{c.description}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#B91C1C]">
                  Δείτε περισσότερα
                  <span aria-hidden>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}


