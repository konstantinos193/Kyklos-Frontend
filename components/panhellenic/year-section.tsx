import { PdfDownloadCard } from './pdf-download-card';
import { PanhellenicFile } from '@/lib/panhellenic-data';

interface YearSectionProps {
  year: number;
  files: PanhellenicFile[];
}

export function YearSection({ year, files }: YearSectionProps) {
  if (files.length === 0) {
    return null;
  }

  // Group files by subject
  const mathFiles = files.filter(f => f.subject === 'math');
  const physicsFiles = files.filter(f => f.subject === 'physics');
  const ximiaFiles = files.filter(f => f.subject === 'ximia');

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
        Έτος {year}
      </h2>
      <div className="space-y-4">
        {mathFiles.length > 0 && (
          <div>
            <h3 className="text-base font-medium text-gray-700 mb-2">Μαθηματικά</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {mathFiles.map((file) => (
                <PdfDownloadCard key={file.fileName} file={file} />
              ))}
            </div>
          </div>
        )}
        {physicsFiles.length > 0 && (
          <div>
            <h3 className="text-base font-medium text-gray-700 mb-2">Φυσική</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {physicsFiles.map((file) => (
                <PdfDownloadCard key={file.fileName} file={file} />
              ))}
            </div>
          </div>
        )}
        {ximiaFiles.length > 0 && (
          <div>
            <h3 className="text-base font-medium text-gray-700 mb-2">Χημεία</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ximiaFiles.map((file) => (
                <PdfDownloadCard key={file.fileName} file={file} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

