'use client';

import { FileDown, Eye } from 'lucide-react';
import { PanhellenicFile } from '@/lib/panhellenic-data';

interface PdfDownloadCardProps {
  file: PanhellenicFile;
  onView?: (file: PanhellenicFile) => void;
}

export function PdfDownloadCard({ file, onView }: PdfDownloadCardProps) {
  const handleDownload = async () => {
    try {
      // Fetch the file as a blob to ensure it downloads instead of opening
      const response = await fetch(file.url);
      if (!response.ok) {
        throw new Error('Failed to fetch file');
      }
      
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = file.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the blob URL
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download error:', error);
      // Fallback: try direct download if fetch fails
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleView = () => {
    if (onView) {
      onView(file);
    } else {
      // Fallback: open in new tab
      window.open(file.url, '_blank');
    }
  };

  return (
    <div className="group relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#CE3B49] hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {file.displayName}
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            {file.subject === 'math' && 'Μαθηματικά'}
            {file.subject === 'physics' && 'Φυσική'}
            {file.subject === 'ximia' && 'Χημεία'}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0 flex gap-2">
          <button
            onClick={handleView}
            className="rounded-md bg-gray-100 p-2 text-gray-700 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            aria-label={`Προβολή ${file.displayName}`}
            title="Προβολή"
          >
            <Eye className="h-5 w-5" />
          </button>
          <button
            onClick={handleDownload}
            className="rounded-md bg-[#CE3B49] p-2 text-white transition-colors hover:bg-[#B8323F] focus:outline-none focus:ring-2 focus:ring-[#CE3B49] focus:ring-offset-2"
            aria-label={`Κατέβασμα ${file.displayName}`}
            title="Κατέβασμα"
          >
            <FileDown className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

