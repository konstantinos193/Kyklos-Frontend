"use client";

import { useState, useRef, useEffect } from 'react';
import { adminAPI } from '@/lib/api';
import { 
  Upload, 
  FileText, 
  X, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';

type ArchiveSubject = 
  | 'math' 
  | 'physics' 
  | 'ximia' 
  | 'biology'
  | 'greek-literature'
  | 'ancient-greek'
  | 'history'
  | 'latin'
  | 'economics'
  | 'informatics'
  | 'algebra'
  | 'geometry';

interface ArchiveFile {
  _id: string;
  displayName: string;
  fileName: string;
  subject: ArchiveSubject;
  year: number;
  description?: string;
  fileUrl: string;
  mimeType: string;
  fileSize: number;
  isActive: boolean;
  uploadedByName: string;
  createdAt: string;
}

export default function PanhellenicArchiveUpload() {
  const [files, setFiles] = useState<ArchiveFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [filterYear, setFilterYear] = useState<string>('all');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadData, setUploadData] = useState({
    displayName: '',
    subject: 'math' as ArchiveSubject,
    year: new Date().getFullYear(),
    description: '',
    file: null as File | null,
  });

  const subjectLabels: Record<string, string> = {
    math: 'Μαθηματικά',
    physics: 'Φυσική',
    ximia: 'Χημεία',
    biology: 'Βιολογία',
    'greek-literature': 'Έκθεση - Λογοτεχνία',
    'ancient-greek': 'Αρχαία',
    history: 'Ιστορία',
    latin: 'Λατινικά',
    economics: 'ΑΟΘ / Οικονομικά',
    informatics: 'Πληροφορική',
    algebra: 'Άλγεβρα',
    geometry: 'Γεωμετρία',
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await adminAPI.getArchiveFiles();
      console.log('Archive files response:', response);
      if (response && response.success) {
        setFiles(response.data || []);
        if (!response.data || response.data.length === 0) {
          setError('Δεν υπάρχουν αρχεία. Μπορείτε να ανεβάσετε νέα αρχεία.');
        }
      } else {
        setError('Δεν ήταν δυνατή η φόρτωση των αρχείων. Ελέγξτε τη σύνδεση με τον server.');
      }
    } catch (error: any) {
      console.error('Error loading files:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Άγνωστο σφάλμα';
      setError(`Σφάλμα φόρτωσης αρχείων: ${errorMessage}`);
      setFiles([]); // Clear files on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/gif',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      ];

      if (!allowedTypes.includes(file.type)) {
        setError('Μη υποστηριζόμενος τύπος αρχείου. Επιτρέπονται: PDF, PNG, JPG, GIF, DOC, DOCX, XLS, XLSX, PPT, PPTX');
        return;
      }

      // Validate file size (50MB)
      if (file.size > 50 * 1024 * 1024) {
        setError('Το αρχείο είναι πολύ μεγάλο. Μέγιστο μέγεθος: 50MB');
        return;
      }

      setUploadData({ ...uploadData, file });
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!uploadData.file) {
      setError('Παρακαλώ επιλέξτε αρχείο');
      return;
    }

    if (!uploadData.displayName.trim()) {
      setError('Παρακαλώ εισάγετε όνομα αρχείου');
      return;
    }

    try {
      setIsUploading(true);
      setError('');
      
      const response = await adminAPI.uploadArchiveFile(uploadData.file, {
        displayName: uploadData.displayName,
        subject: uploadData.subject,
        year: uploadData.year,
        description: uploadData.description,
      });

      if (response.success) {
        setSuccess('Το αρχείο ανέβηκε επιτυχώς');
        setShowUploadModal(false);
        setUploadData({
          displayName: '',
          subject: 'math',
          year: new Date().getFullYear(),
          description: '',
          file: null,
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        loadFiles();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.message || 'Σφάλμα κατά το ανέβασμα');
      }
    } catch (error: any) {
      console.error('Error uploading file:', error);
      setError(error.response?.data?.message || 'Σφάλμα κατά το ανέβασμα του αρχείου');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτό το αρχείο;')) {
      return;
    }

    try {
      const response = await adminAPI.deleteArchiveFile(id);
      if (response.success) {
        setSuccess('Το αρχείο διαγράφηκε επιτυχώς');
        loadFiles();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.message || 'Σφάλμα διαγραφής');
      }
    } catch (error: any) {
      console.error('Error deleting file:', error);
      setError(error.response?.data?.message || 'Σφάλμα διαγραφής αρχείου');
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      const response = await adminAPI.toggleArchiveFileActive(id);
      if (response.success) {
        loadFiles();
      }
    } catch (error: any) {
      console.error('Error toggling file active:', error);
      setError(error.response?.data?.message || 'Σφάλμα ενημέρωσης');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('pdf')) return '📄';
    if (mimeType.includes('image')) return '🖼️';
    if (mimeType.includes('word')) return '📝';
    if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return '📊';
    if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return '📊';
    return '📎';
  };

  const filteredFiles = files.filter(file => {
    if (filterSubject !== 'all' && file.subject !== filterSubject) return false;
    if (filterYear !== 'all' && file.year.toString() !== filterYear) return false;
    return true;
  });

  const availableYears = Array.from(new Set(files.map(f => f.year))).sort((a, b) => b - a);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#E7B109] mx-auto mb-4" />
          <p className="text-gray-600">Φόρτωση αρχείων...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Αρχείο Πανελληνίων</h2>
          <p className="text-gray-600">Διαχείριση αρχείων πανελληνίων εξετάσεων</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-[#E7B109] text-white px-4 py-2 rounded-lg hover:bg-[#D97706] transition-colors flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          Ανέβασμα Αρχείου
        </button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Μάθημα</label>
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
            >
              <option value="all">Όλα</option>
              <option value="math">Μαθηματικά</option>
              <option value="physics">Φυσική</option>
              <option value="ximia">Χημεία</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Έτος</label>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
            >
              <option value="all">Όλα</option>
              {availableYears.map(year => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Files List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {filteredFiles.length === 0 && !isLoading ? (
          <div className="p-8 text-center text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium mb-2">Δεν βρέθηκαν αρχεία</p>
            <p className="text-sm text-gray-400 mb-4">
              {files.length === 0 
                ? 'Δεν έχουν ανεβεί αρχεία ακόμα. Κάντε κλικ στο "Ανέβασμα Αρχείου" για να προσθέσετε νέα αρχεία.'
                : 'Δοκιμάστε να αλλάξετε τα φίλτρα για να δείτε περισσότερα αρχεία.'}
            </p>
            {files.length === 0 && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="mt-4 bg-[#E7B109] text-white px-6 py-2 rounded-lg hover:bg-[#D97706] transition-colors inline-flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Ανέβασμα Πρώτου Αρχείου
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Αρχείο</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Μάθημα</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Έτος</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Μέγεθος</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Κατάσταση</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ενέργειες</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFiles.map((file) => (
                  <tr key={file._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{getFileIcon(file.mimeType)}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{file.displayName}</div>
                          <div className="text-xs text-gray-500">{file.fileName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{subjectLabels[file.subject]}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{file.year}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500">{formatFileSize(file.fileSize)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleActive(file._id)}
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${
                          file.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {file.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {file.isActive ? 'Ενεργό' : 'Ανενεργό'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <a
                          href={file.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#E7B109] hover:text-[#D97706]"
                          title="Προβολή"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleDelete(file._id)}
                          className="text-red-600 hover:text-red-800"
                          title="Διαγραφή"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Ανέβασμα Αρχείου</h3>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setError('');
                  setUploadData({
                    displayName: '',
                    subject: 'math',
                    year: new Date().getFullYear(),
                    description: '',
                    file: null,
                  });
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Αρχείο * <span className="text-xs text-gray-500">(PDF, PNG, JPG, GIF, DOC, DOCX, XLS, XLSX, PPT, PPTX - Μέγιστο 50MB)</span>
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  accept=".pdf,.png,.jpg,.jpeg,.gif,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                />
                {uploadData.file && (
                  <p className="mt-2 text-sm text-gray-600">
                    Επιλεγμένο: {uploadData.file.name} ({(uploadData.file.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Όνομα Αρχείου *</label>
                <input
                  type="text"
                  value={uploadData.displayName}
                  onChange={(e) => setUploadData({ ...uploadData, displayName: e.target.value })}
                  placeholder="π.χ. Μαθηματικά 2024"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Μάθημα *</label>
                  <select
                    value={uploadData.subject}
                    onChange={(e) => setUploadData({ ...uploadData, subject: e.target.value as ArchiveSubject })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                  >
                    {Object.entries(subjectLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Έτος *</label>
                  <input
                    type="number"
                    value={uploadData.year}
                    onChange={(e) => setUploadData({ ...uploadData, year: parseInt(e.target.value) })}
                    min="2000"
                    max={new Date().getFullYear() + 1}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Περιγραφή</label>
                <textarea
                  value={uploadData.description}
                  onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                  rows={3}
                  placeholder="Προαιρετική περιγραφή..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setError('');
                  setUploadData({
                    displayName: '',
                    subject: 'math',
                    year: new Date().getFullYear(),
                    description: '',
                    file: null,
                  });
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Ακύρωση
              </button>
              <button
                onClick={handleUpload}
                disabled={isUploading || !uploadData.file || !uploadData.displayName.trim()}
                className="px-4 py-2 bg-[#E7B109] text-white rounded-lg hover:bg-[#D97706] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Ανέβασμα...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Ανέβασμα
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

