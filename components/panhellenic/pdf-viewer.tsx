'use client';

import { X, ExternalLink } from 'lucide-react';
import { PanhellenicFile } from '@/lib/panhellenic-data';
import { useState } from 'react';

interface PdfViewerProps {
  file: PanhellenicFile | null;
  onClose: () => void;
}

export function PdfViewer({ file, onClose }: PdfViewerProps) {
  const [hasError, setHasError] = useState(false);

  if (!file) return null;

  const handleOpenInNewTab = () => {
    window.open(file.url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div className="relative h-full w-full max-w-6xl bg-white rounded-lg shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{file.displayName}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenInNewTab}
              className="rounded-md p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-label="Άνοιγμα σε νέα καρτέλα"
              title="Άνοιγμα σε νέα καρτέλα"
            >
              <ExternalLink className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="rounded-md p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#CE3B49]"
              aria-label="Κλείσιμο"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden relative bg-gray-100">
          {hasError ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">Δεν ήταν δυνατή η προβολή του PDF εντός της σελίδας.</p>
              <button
                onClick={handleOpenInNewTab}
                className="rounded-md bg-[#CE3B49] px-4 py-2 text-white hover:bg-[#B8323F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#CE3B49] focus:ring-offset-2"
              >
                Άνοιγμα σε νέα καρτέλα
              </button>
            </div>
          ) : (
            <object
              data={`${file.url}#toolbar=1&navpanes=1&scrollbar=1`}
              type="application/pdf"
              className="w-full h-full"
              onError={() => setHasError(true)}
            >
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-4">Το PDF δεν μπορεί να προβληθεί εντός της σελίδας.</p>
                <button
                  onClick={handleOpenInNewTab}
                  className="rounded-md bg-[#CE3B49] px-4 py-2 text-white hover:bg-[#B8323F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#CE3B49] focus:ring-offset-2"
                >
                  Άνοιγμα σε νέα καρτέλα
                </button>
              </div>
            </object>
          )}
        </div>
      </div>
    </div>
  );
}

