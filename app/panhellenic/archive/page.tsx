import { subjectGroups } from '@/lib/panhellenic-data';
import { SubjectSection } from '@/components/panhellenic/subject-section';

export default function PanhellenicArchivePage() {
  return (
    <main className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-semibold text-gray-900">Αρχείο Θεμάτων</h1>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600">
          Συγκεντρωτικό αρχείο θεμάτων και λύσεων προηγούμενων ετών.
        </p>

        {subjectGroups.length > 0 ? (
          <section className="mt-6 sm:mt-8 space-y-6">
            {subjectGroups.map((subjectGroup) => (
              <SubjectSection key={subjectGroup.subject} subjectGroup={subjectGroup} />
            ))}
          </section>
        ) : (
          <section className="mt-6 sm:mt-8 space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
              <h2 className="text-base sm:text-lg font-medium text-gray-900">Έτη</h2>
              <p className="mt-2 text-sm text-gray-600">Σύντομα θα προστεθεί λίστα ανά έτος και μάθημα.</p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}


