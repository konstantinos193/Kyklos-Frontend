import { HoursSections } from '@/components/curriculum/hours-sections';
import { algebraHours } from '@/components/curriculum/algebra-hours-data';
import { TeachersList } from '@/components/curriculum/teachers-list';
import { mathematicsTeachers } from '@/components/curriculum/teachers-data';

export default function AlgebraPage() {
  return (
    <main className="relative">
      <header className="border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Άλγεβρα</h1>
            <div className="mt-3 h-1 w-20 bg-gradient-to-r from-[#CF3B49] to-[#E7B109] rounded-full" />
            <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl">Εξισώσεις, συναρτήσεις, ανισότητες, πρόοδοι.</p>
          </div>
        </div>
      </header>
      <div className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl space-y-8">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:p-7 shadow-sm">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Πρόγραμμα Ωρών</h2>
              <div className="mt-2 h-1 w-12 bg-gradient-to-r from-[#CF3B49] to-[#E7B109] rounded-full" />
            </div>
            <div className="mt-5">
              <HoursSections data={algebraHours} />
            </div>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:p-7 shadow-sm">
            <TeachersList title="Διδάσκοντες" teachers={mathematicsTeachers} />
          </section>
        </div>
      </div>
    </main>
  );
}


