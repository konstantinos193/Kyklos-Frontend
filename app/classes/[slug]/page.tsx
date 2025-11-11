import { notFound } from 'next/navigation';
import { slugToGrade, getAllGradeSlugs } from '@/utils/grade-slug';
import { Metadata } from 'next';
import { CurriculumSection } from '@/components/curriculum/curriculum-section';
import { coursesContent } from '@/components/courses/data';
import { filterCoursesByGrade } from '@/utils/filter-courses-by-grade';

export function generateStaticParams() {
  const slugs = getAllGradeSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const grade = slugToGrade(slug);
  
  if (!grade) {
    return {
      title: 'Τάξη | ΚΥΚΛΟΣ Φροντιστήριο Άρτα',
    };
  }

  return {
    title: `${grade} | ΚΥΚΛΟΣ Φροντιστήριο Άρτα`,
    description: `Πρόγραμμα σπουδών για την ${grade}. Εξειδικευμένη προετοιμασία με έμπειρους καθηγητές και σύγχρονα εκπαιδευτικά υλικά.`,
    keywords: [
      grade.toLowerCase(),
      'φροντιστήριο άρτα',
      'πρόγραμμα σπουδών',
      'εκπαίδευση',
      'μαθήματα',
    ],
    openGraph: {
      title: `${grade} | ΚΥΚΛΟΣ Φροντιστήριο Άρτα`,
      description: `Πρόγραμμα σπουδών για την ${grade}. Εξειδικευμένη προετοιμασία με έμπειρους καθηγητές.`,
      images: ['/logo.png'],
    },
  };
}

export default async function ClassPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const grade = slugToGrade(slug);

  if (!grade) {
    notFound();
  }

  // Filter courses to show only the ones matching the current grade
  const filteredCourses = filterCoursesByGrade(coursesContent.courses, grade);

  return (
    <main className="relative min-h-screen bg-gray-50 py-10 sm:py-14">
      <CurriculumSection courses={filteredCourses} />
    </main>
  );
}

