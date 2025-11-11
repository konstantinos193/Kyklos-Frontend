'use client';

import { PdfDownloadCard } from './pdf-download-card';
import { SubjectGroup, PanhellenicFile } from '@/lib/panhellenic-data';
import { useState } from 'react';
import { PdfViewerReact } from './pdf-viewer-react';

interface SubjectSectionProps {
  subjectGroup: SubjectGroup;
}

export function SubjectSection({ subjectGroup }: SubjectSectionProps) {
  const [viewingFile, setViewingFile] = useState<PanhellenicFile | null>(null);

  if (subjectGroup.files.length === 0) {
    return null;
  }

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
          {subjectGroup.displayName}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {subjectGroup.files.map((file) => (
            <PdfDownloadCard 
              key={file.fileName} 
              file={file} 
              onView={setViewingFile}
            />
          ))}
        </div>
      </div>
      {viewingFile && (
        <PdfViewerReact 
          file={viewingFile} 
          onClose={() => setViewingFile(null)} 
        />
      )}
    </>
  );
}

