import { CurriculumSection } from "./data";
import { formatHours } from "@/utils/format-hours";

export function CurriculumSectionView({ section }: { section: CurriculumSection }) {
  return (
    <section className="mb-10 sm:mb-12">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{section.title}</h2>
        <span className="hidden sm:inline-block h-1 w-16 rounded-full bg-gradient-to-r from-[#CE3B49] to-[#FF6B6B]" />
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {section.groups.map((group, idx) => (
          <div key={idx} className="relative rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="absolute inset-x-0 -top-0.5 h-1 bg-gradient-to-r from-[#CE3B49] via-[#FF6B6B] to-[#CE3B49]" />
            <div className="p-5 sm:p-6">
              {group.title && (
                <div className="mb-3 inline-flex items-center rounded-lg bg-[#CE3B49]/10 px-2.5 py-1 text-xs font-semibold text-[#B91C1C]">
                  {group.title}
                </div>
              )}
              <ul className="divide-y divide-slate-100">
                {group.subjects.map((s, i) => (
                  <li key={i} className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
                    <span className="text-sm sm:text-base text-slate-800">{s.name}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#CE3B49]/10 px-2.5 py-1 text-[11px] sm:text-xs font-medium text-[#B91C1C]">
                      {formatHours(s.hours)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


