'use client';

import { X, ExternalLink, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { PanhellenicFile } from '@/lib/panhellenic-data';
import { useState, useEffect, useMemo } from 'react';
import React from 'react';
import dynamic from 'next/dynamic';
import { normalizeCloudinaryPdfUrl, isCloudinaryUrl } from '@/lib/cloudinary-utils';

// Configure PDF.js worker before importing components
// Use the version that matches react-pdf's pdfjs-dist dependency
if (typeof window !== 'undefined') {
  import('react-pdf').then((mod) => {
    // Use the version from the installed pdfjs-dist package
    const version = mod.pdfjs.version;
    // Try local worker first, fallback to CDN with matching version
    mod.pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;
    // If local fails, it will fallback, but we set it here
  });
}

// Dynamically import react-pdf to avoid SSR issues
const Document = dynamic(
  () => import('react-pdf').then((mod) => {
    // Ensure worker is configured with matching version
    if (typeof window !== 'undefined') {
      const version = mod.pdfjs.version;
      // Use local worker file that matches the version
      mod.pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;
    }
    return mod.Document;
  }),
  { ssr: false }
);

const Page = dynamic(
  () => import('react-pdf').then((mod) => mod.Page),
  { ssr: false }
);

interface PdfViewerReactProps {
  file: PanhellenicFile | null;
  onClose: () => void;
}

export function PdfViewerReact({ file, onClose }: PdfViewerReactProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [useFallback, setUseFallback] = useState<boolean>(false);
  const pageRefs = React.useRef<{ [key: number]: HTMLDivElement | null }>({});
  const hasManualZoom = React.useRef<boolean>(false);

  // Worker is configured at module level, no need for useEffect

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (file) {
      // Disable body scroll
      document.body.style.overflow = 'hidden';
      return () => {
        // Re-enable body scroll when component unmounts
        document.body.style.overflow = '';
      };
    }
  }, [file]);

  useEffect(() => {
    if (file) {
      setPageNumber(1);
      setLoading(true);
      setError(null);
      setUseFallback(true); // Use iframe (native PDF) as primary method
      // Reset page refs when file changes
      pageRefs.current = {};
      // Reset manual zoom flag when file changes
      hasManualZoom.current = false;

      // Set a timeout to detect if PDF fails to load (e.g., 401 errors)
      // Iframe onError doesn't always fire for HTTP errors, so we use a timeout
      const loadTimeout = setTimeout(() => {
        setLoading((currentLoading) => {
          if (currentLoading) {
            // Still loading after timeout - might be an access issue
            if (isCloudinaryUrl(file.url)) {
              setError('Το PDF δεν φορτώνει. Ενδέχεται να μην είναι προσβάσιμο. Παρακαλώ δοκιμάστε να το ανοίξετε σε νέα καρτέλα ή να το ανεβάσετε ξανά.');
            } else {
              setError('Το PDF δεν φορτώνει. Παρακαλώ δοκιμάστε να το ανοίξετε σε νέα καρτέλα.');
            }
            return false;
          }
          return currentLoading;
        });
      }, 10000); // 10 second timeout

      return () => {
        clearTimeout(loadTimeout);
      };
    }
  }, [file]);

  // Normalize the PDF URL for Cloudinary files
  const normalizedUrl = useMemo(() => {
    if (!file?.url) return null;
    return normalizeCloudinaryPdfUrl(file.url, file.id);
  }, [file?.url, file?.id]);

  // Calculate optimal initial scale to fit PDF to window
  useEffect(() => {
    const calculateOptimalScale = () => {
      if (typeof window === 'undefined') return 1.0;
      
      // Standard A4 PDF dimensions in points (at 72 DPI)
      const pdfWidth = 595; // A4 width in points
      const pdfHeight = 842; // A4 height in points
      
      // Get available space (accounting for modal padding, header, etc.)
      const modalPadding = 32; // 2rem = 32px on each side
      const headerHeight = 64; // Approximate header height
      const footerHeight = 0; // No footer for iframe
      const verticalPadding = 16; // Some padding
      
      const availableWidth = window.innerWidth - (modalPadding * 2);
      const availableHeight = window.innerHeight - headerHeight - footerHeight - (verticalPadding * 2);
      
      // Calculate scale to fit both width and height, use the smaller one to ensure it fits
      const scaleX = availableWidth / pdfWidth;
      const scaleY = availableHeight / pdfHeight;
      const fitScale = Math.min(scaleX, scaleY) * 0.95; // 0.95 to add some margin
      
      return Math.max(0.5, Math.min(2.0, fitScale)); // Clamp between 0.5 and 2.0
    };
    
    if (!hasManualZoom.current && useFallback) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        const optimalScale = calculateOptimalScale();
        setScale(optimalScale);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [file, useFallback]);

  useEffect(() => {
    // Scroll to the current page when pageNumber changes
    if (pageRefs.current[pageNumber]) {
      pageRefs.current[pageNumber]?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }, [pageNumber]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  }

  function onDocumentLoadError(error: Error) {
    console.error('Error loading PDF with react-pdf:', error);
    // Try fallback iframe viewer
    setUseFallback(true);
    setLoading(false);
    setError(null);
  }

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(numPages, prev + 1));
  };

  const zoomIn = () => {
    hasManualZoom.current = true;
    setScale((prev) => Math.min(3, prev + 0.2));
  };

  const zoomOut = () => {
    hasManualZoom.current = true;
    setScale((prev) => Math.max(0.5, prev - 0.2));
  };

  const handleOpenInNewTab = () => {
    if (file) {
      window.open(normalizedUrl || file.url, '_blank');
    }
  };

  // Memoize document options to prevent unnecessary reloads
  const documentOptions = useMemo(
    () => ({
      workerSrc: '/pdf.worker.min.mjs',
      cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.296/cmaps/',
      cMapPacked: true,
    }),
    []
  );

  if (!file) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-hidden"
      onClick={(e) => {
        // Close on background click
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      onWheel={(e) => {
        // Prevent background scrolling
        e.stopPropagation();
      }}
      onTouchMove={(e) => {
        // Prevent background scrolling on mobile
        e.stopPropagation();
      }}
    >
      <div className="relative h-full w-full max-w-7xl bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200/50">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200/60 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#CE3B49]/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#CE3B49]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {file.displayName}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {!loading && !error && (
              <div className="flex items-center gap-1 mr-2 px-2 py-1 bg-gray-100 rounded-lg">
                <button
                  onClick={zoomOut}
                  className="rounded-md p-1.5 text-gray-600 hover:text-gray-900 hover:bg-white transition-all duration-200"
                  aria-label="Μείωση"
                  title="Μείωση"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <span className="text-xs font-medium text-gray-700 min-w-[50px] text-center px-2">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  onClick={zoomIn}
                  className="rounded-md p-1.5 text-gray-600 hover:text-gray-900 hover:bg-white transition-all duration-200"
                  aria-label="Μεγέθυνση"
                  title="Μεγέθυνση"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
              </div>
            )}
            <button
              onClick={handleOpenInNewTab}
              className="rounded-lg p-2.5 text-gray-600 hover:text-[#CE3B49] hover:bg-[#CE3B49]/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#CE3B49]/20"
              aria-label="Άνοιγμα σε νέα καρτέλα"
              title="Άνοιγμα σε νέα καρτέλα"
            >
              <ExternalLink className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-2.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Κλείσιμο"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden relative bg-gradient-to-br from-gray-50 to-gray-100">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/80 backdrop-blur-sm">
              <div className="text-center">
                <div className="relative">
                  <div className="animate-spin rounded-full h-14 w-14 border-4 border-gray-200 mx-auto"></div>
                  <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-[#CE3B49] mx-auto absolute top-0 left-0"></div>
                </div>
                <p className="text-gray-700 font-medium mt-6 text-sm">Φόρτωση PDF...</p>
              </div>
            </div>
          )}

          {useFallback ? (
            // Primary: Use iframe for native PDF viewing (without toolbar)
            <div className="w-full h-full bg-white overflow-auto" style={{ overscrollBehavior: 'contain' }}>
              <div 
                className="origin-top-left transition-transform duration-200"
                style={{ 
                  transform: `scale(${scale})`,
                  width: `${100 / scale}%`,
                  height: `${100 / scale}%`,
                  minHeight: '100%'
                }}
              >
                <iframe
                  src={normalizedUrl ? `${normalizedUrl}#toolbar=0&navpanes=0&view=FitH` : file.url}
                  className="w-full h-full border-0"
                  title={file.displayName}
                  onLoad={() => setLoading(false)}
                  onError={(e) => {
                    console.error('PDF iframe error:', e);
                    // Check if it's a Cloudinary URL with 401 error
                    if (isCloudinaryUrl(file.url)) {
                      setError('Το PDF δεν είναι προσβάσιμο. Παρακαλώ διαγράψτε και ανεβάστε ξανά το αρχείο από τον πίνακα διαχείρισης.');
                    } else {
                      setError('Δεν ήταν δυνατή η προβολή του PDF');
                    }
                    setLoading(false);
                  }}
                />
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Σφάλμα</h3>
              <p className="text-gray-600 mb-6 max-w-md">{error}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setUseFallback(true);
                    setError(null);
                    setLoading(true);
                  }}
                  className="rounded-lg bg-gray-600 px-5 py-2.5 text-white hover:bg-gray-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  Δοκιμή με iframe
                </button>
                <button
                  onClick={handleOpenInNewTab}
                  className="rounded-lg bg-[#CE3B49] px-5 py-2.5 text-white hover:bg-[#B8323F] transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  Άνοιγμα σε νέα καρτέλα
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center py-8 px-4 sm:px-6 min-h-full">
              <div className="w-full max-w-6xl">
                <Document
                  file={normalizedUrl || file.url}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  options={documentOptions}
                  loading={
                    <div className="flex items-center justify-center p-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CE3B49]"></div>
                    </div>
                  }
                  error={
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                      <p className="text-gray-600 mb-4">Σφάλμα φόρτωσης PDF</p>
                      <button
                        onClick={() => {
                          setUseFallback(true);
                          setError(null);
                          setLoading(true);
                        }}
                        className="rounded-md bg-[#CE3B49] px-4 py-2 text-white hover:bg-[#B8323F] transition-colors"
                      >
                        Δοκιμή με iframe
                      </button>
                    </div>
                  }
                >
                  <div className="flex flex-col items-center gap-8 py-4">
                    {Array.from(new Array(numPages), (el, index) => {
                      const currentPageNum = index + 1;
                      return (
                        <div
                          key={`page_${currentPageNum}`}
                          ref={(el) => {
                            pageRefs.current[currentPageNum] = el;
                          }}
                          className={`flex justify-center w-full transition-all duration-200 ${
                            pageNumber === currentPageNum ? 'ring-2 ring-[#CE3B49] ring-offset-4 rounded-sm' : ''
                          }`}
                        >
                          <Page
                            pageNumber={currentPageNum}
                            scale={scale}
                            className="shadow-2xl border border-gray-300 rounded-sm bg-white"
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            width={undefined}
                            height={undefined}
                          />
                        </div>
                      );
                    })}
                  </div>
                </Document>
              </div>
            </div>
          )}
        </div>

        {/* Footer with page controls - only show for react-pdf viewer */}
        {!loading && !error && !useFallback && numPages > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200/60 bg-gradient-to-r from-white to-gray-50">
            <button
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-sm hover:shadow-md disabled:hover:shadow-sm"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Προηγούμενη</span>
            </button>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
              <span className="text-sm font-medium text-gray-700">
                Σελίδα <span className="text-[#CE3B49] font-semibold">{pageNumber}</span> από <span className="text-gray-600">{numPages}</span>
              </span>
            </div>
            <button
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-sm hover:shadow-md disabled:hover:shadow-sm"
            >
              <span>Επόμενη</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

