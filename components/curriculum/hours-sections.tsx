import { HoursCurriculum } from './hours-types';

export function HoursSections({ data }: { data: HoursCurriculum }) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {data.map((group) => (
        <section key={group.groupTitle} className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{group.groupTitle}</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {group.sections.map((sec) => (
              <div key={sec.title} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <h3 className="text-base sm:text-lg font-medium text-gray-800">{sec.title}</h3>
                <ul className="mt-3 text-sm sm:text-base text-gray-700 space-y-1">
                  {sec.items.map((it, idx) => (
                    <li key={idx} className="flex items-center justify-between">
                      <span>
                        {it.label}
                        {it.note ? ` — ${it.note}` : ''}
                      </span>
                      <span className="font-semibold tabular-nums">{it.hours} ώρες</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}


