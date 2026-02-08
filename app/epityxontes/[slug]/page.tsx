import { notFound } from 'next/navigation';
import Link from 'next/link';
import { StudentsList } from '@/components/epityxontes/students-list';
import {
  Student,
  students1992,
  students1993,
  students1994,
  students1995,
  students1996,
  students1997,
  students1998,
  students1999,
  students2000,
  students2002,
  students2003,
  students2004,
  students2005,
  students2006,
  students2011,
  students2012,
  students2013,
  students2014,
  students2015,
  students2016,
  students2023,
  students2024,
  students2025,
} from '@/components/epityxontes/students-data';

interface YearPageConfig {
  startYear: number;
  students: Student[];
}

const yearConfigs: YearPageConfig[] = [
  { startYear: 2025, students: students2025 },
  { startYear: 2024, students: students2024 },
  { startYear: 2023, students: students2023 },
  { startYear: 2016, students: students2016 },
  { startYear: 2015, students: students2015 },
  { startYear: 2014, students: students2014 },
  { startYear: 2013, students: students2013 },
  { startYear: 2012, students: students2012 },
  { startYear: 2011, students: students2011 },
  { startYear: 2006, students: students2006 },
  { startYear: 2005, students: students2005 },
  { startYear: 2004, students: students2004 },
  { startYear: 2003, students: students2003 },
  { startYear: 2002, students: students2002 },
  { startYear: 2000, students: students2000 },
  { startYear: 1999, students: students1999 },
  { startYear: 1998, students: students1998 },
  { startYear: 1997, students: students1997 },
  { startYear: 1996, students: students1996 },
  { startYear: 1995, students: students1995 },
  { startYear: 1994, students: students1994 },
  { startYear: 1993, students: students1993 },
  { startYear: 1992, students: students1992 },
];

const pageConfigs = yearConfigs.map(({ startYear, students }) => {
  const endYear = startYear + 1;
  return {
    slug: `epityxontes-etos-${startYear}-${endYear}`,
    title: `Επιτυχόντες Έτος ${startYear}-${endYear}`,
    students,
  };
});

type PageConfig = (typeof pageConfigs)[number];

const pageConfigBySlug: Record<string, PageConfig> = Object.fromEntries(
  pageConfigs.map((config) => [config.slug, config]),
);

const categories = pageConfigs.map((config) => ({
  label: config.title,
  href: `/epityxontes/${config.slug}`,
}));

export function generateStaticParams() {
  return pageConfigs.map(({ slug }) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pageConfig = pageConfigBySlug[slug];

  if (!pageConfig) return notFound();

  return (
    <section className="blog-details-page py-10 md:py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="blog-details-content">
              <div className="details-content mt-6">
                <h3 className="title text-2xl md:text-3xl font-semibold text-gray-900">
                  {pageConfig.title}
                </h3>
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:p-7 shadow-sm">
                  {pageConfig.students.length > 0 ? (
                    <StudentsList students={pageConfig.students} />
                  ) : (
                    <p className="text-gray-600">Δεν υπάρχουν διαθέσιμα δεδομένα για αυτό το έτος.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="blog-sidebar right-sidebar pt-4 lg:pt-5">
              <div className="blog-sidebar-category mt-6">
                <div className="sidebar-title">
                  <h4 className="title text-lg font-semibold text-gray-900">Επιτυχόντες</h4>
                </div>
                <ul className="category-items mt-3 space-y-2">
                  {categories.map((cat) => (
                    <li key={cat.href}>
                      <div className="form-radio">
                        <label>
                          <Link href={cat.href} className="text-slate-700 hover:text-[#CE3B49] hover:underline">
                            {cat.label}
                          </Link>
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
