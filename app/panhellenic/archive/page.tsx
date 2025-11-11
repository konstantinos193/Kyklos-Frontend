'use client';

import { useState, useEffect } from 'react';
import { SubjectSection } from '@/components/panhellenic/subject-section';
import { adminAPI } from '@/lib/api';
import { SubjectGroup, PanhellenicFile, subjectGroups as hardcodedSubjectGroups } from '@/lib/panhellenic-data';
import { SUBJECT_LABELS, SUBJECT_ORDER, ArchiveSubject } from '@/lib/panhellenic-subjects';

export default function PanhellenicArchivePage() {
  const [subjectGroups, setSubjectGroups] = useState<SubjectGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadArchiveFiles();
  }, []);

  const loadArchiveFiles = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      // Start with hardcoded files
      const hardcodedFiles: PanhellenicFile[] = [];
      // Use Array.from to ensure proper iteration
      const hardcodedGroups = Array.from(hardcodedSubjectGroups);
      hardcodedGroups.forEach(group => {
        hardcodedFiles.push(...group.files);
      });

      // Try to load files from API
      let apiFiles: PanhellenicFile[] = [];
      try {
        const response = await adminAPI.getArchiveFiles();
        if (response.success && response.data && Array.isArray(response.data)) {
          // Transform API data to match existing structure
          apiFiles = response.data
            .filter((file: any) => file.isActive) // Only show active files
            .map((file: any) => ({
              fileName: file.fileName,
              displayName: file.displayName,
              subject: file.subject,
              year: file.year,
              url: file.fileUrl,
              id: file._id || file.id, // Include ID for proxy endpoint
            }));
        }
      } catch (apiError) {
        console.warn('API error (using hardcoded files only):', apiError);
        // Continue with hardcoded files only
      }

      // Combine hardcoded and API files, avoiding duplicates by URL
      const allFiles: PanhellenicFile[] = [...hardcodedFiles];
      const existingUrls = new Set(hardcodedFiles.map(f => f.url));
      
      apiFiles.forEach(apiFile => {
        // Only add if URL doesn't already exist (avoid duplicates)
        if (!existingUrls.has(apiFile.url)) {
          allFiles.push(apiFile);
          existingUrls.add(apiFile.url);
        }
      });

      // Group files by subject - initialize all subjects
      const grouped: Record<ArchiveSubject, PanhellenicFile[]> = {
        math: [],
        physics: [],
        ximia: [],
        biology: [],
        'greek-literature': [],
        'ancient-greek': [],
        history: [],
        latin: [],
        economics: [],
        informatics: [],
        algebra: [],
        geometry: [],
      };

      allFiles.forEach((file) => {
        if (grouped[file.subject]) {
          grouped[file.subject].push(file);
        }
      });

        // Create subject groups - only show subjects that have files, in order
        const groups: SubjectGroup[] = SUBJECT_ORDER
          .filter((subject): subject is ArchiveSubject => grouped[subject] && grouped[subject].length > 0)
          .map(subject => ({
            subject: subject,
            displayName: SUBJECT_LABELS[subject],
            files: grouped[subject].sort((a, b) => b.year - a.year),
          }));

      setSubjectGroups(groups);
    } catch (err: any) {
      console.error('Error loading archive files:', err);
      // Fallback to hardcoded files only
      setSubjectGroups(hardcodedSubjectGroups);
      setError('Σφάλμα φόρτωσης νέων αρχείων. Εμφανίζονται τα βασικά αρχεία.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <main className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-semibold text-gray-900">Αρχείο Θεμάτων</h1>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600">
            Συγκεντρωτικό αρχείο θεμάτων και λύσεων προηγούμενων ετών.
          </p>
          <div className="mt-8 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E7B109] mx-auto mb-4"></div>
              <p className="text-gray-600">Φόρτωση αρχείων...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-semibold text-gray-900">Αρχείο Θεμάτων</h1>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600">
          Συγκεντρωτικό αρχείο θεμάτων και λύσεων προηγούμενων ετών.
        </p>

        {error && (
          <div className="mt-6 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {subjectGroups.length > 0 ? (
          <section className="mt-6 sm:mt-8 space-y-6">
            {subjectGroups.map((subjectGroup) => (
              <SubjectSection key={subjectGroup.subject} subjectGroup={subjectGroup} />
            ))}
          </section>
        ) : !error ? (
          <section className="mt-6 sm:mt-8 space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
              <h2 className="text-base sm:text-lg font-medium text-gray-900">Έτη</h2>
              <p className="mt-2 text-sm text-gray-600">Δεν υπάρχουν διαθέσιμα αρχεία αυτή τη στιγμή.</p>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
