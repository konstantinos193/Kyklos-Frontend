'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { adminAPI } from '@/lib/api';
import { 
  BookOpen, 
  FileText, 
  Download,
  Image,
  Search,
  Filter
} from 'lucide-react';

interface Exercise {
  _id: string;
  title: string;
  description?: string;
  textContent?: string;
  subject: string;
  grade?: string;
  teacherName: string;
  files?: Array<{
    url: string;
    secureUrl: string;
    publicId: string;
    fileName: string;
    fileType: string;
    fileSize: number;
  }>;
  createdAt: string;
}

const SUBJECTS = [
  { value: 'math', label: 'Μαθηματικά' },
  { value: 'physics', label: 'Φυσική' },
  { value: 'chemistry', label: 'Χημεία' },
  { value: 'biology', label: 'Βιολογία' },
  { value: 'greek', label: 'Νέα Ελληνικά' },
  { value: 'ancient-greek', label: 'Αρχαία Ελληνικά' },
  { value: 'history', label: 'Ιστορία' },
  { value: 'latin', label: 'Λατινικά' },
  { value: 'economics', label: 'Οικονομικά' },
  { value: 'informatics', label: 'Πληροφορική' },
];

export default function StudentExercisesPage() {
  const router = useRouter();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    const studentToken = localStorage.getItem('studentToken');
    if (!studentToken) {
      router.push('/student-login');
      return;
    }
    loadExercises();
  }, [router]);

  useEffect(() => {
    filterExercises();
  }, [searchTerm, filterSubject, exercises]);

  const loadExercises = async () => {
    try {
      setIsLoading(true);
      const response = await adminAPI.getStudentExercises({ limit: 100 });
      
      if (response.success) {
        setExercises(response.data?.exercises || []);
      }
    } catch (error: any) {
      console.error('Error loading exercises:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterExercises = () => {
    let filtered = [...exercises];

    if (searchTerm) {
      filtered = filtered.filter(e =>
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.teacherName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterSubject !== 'all') {
      filtered = filtered.filter(e => e.subject === filterSubject);
    }

    setFilteredExercises(filtered);
  };

  const getSubjectLabel = (subject: string) => {
    return SUBJECTS.find(s => s.value === subject)?.label || subject;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E7B109] mx-auto mb-4"></div>
          <p className="text-gray-600">Φόρτωση ασκήσεων...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ασκήσεις</h1>
        <p className="text-gray-600">Προβολή και λήψη ασκήσεων από τους καθηγητές σας</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Αναζήτηση</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Αναζήτηση..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Μάθημα</label>
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
            >
              <option value="all">Όλα τα μαθήματα</option>
              {SUBJECTS.map(subject => (
                <option key={subject.value} value={subject.value}>{subject.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Exercises Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Δεν βρέθηκαν ασκήσεις</p>
          </div>
        ) : (
          filteredExercises.map((exercise) => (
            <div
              key={exercise._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedExercise(exercise)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{exercise.title}</h3>
                  {exercise.description && (
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{exercise.description}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {getSubjectLabel(exercise.subject)}
                  </span>
                  {exercise.grade && (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      {exercise.grade}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">Καθηγητής: {exercise.teacherName}</p>
                {exercise.files && exercise.files.length > 0 && (
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    {exercise.files.length} {exercise.files.length === 1 ? 'αρχείο' : 'αρχεία'}
                  </p>
                )}
              </div>

              <button className="w-full mt-4 px-4 py-2 bg-[#E7B109] text-white rounded-lg hover:bg-[#D97706] transition-colors text-sm font-medium">
                Προβολή
              </button>
            </div>
          ))
        )}
      </div>

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{selectedExercise.title}</h2>
              <button
                onClick={() => setSelectedExercise(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                  {getSubjectLabel(selectedExercise.subject)}
                </span>
                {selectedExercise.grade && (
                  <span className="px-3 py-1 text-sm font-semibold rounded-full bg-gray-100 text-gray-800">
                    {selectedExercise.grade}
                  </span>
                )}
              </div>

              {selectedExercise.description && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Περιγραφή</h3>
                  <p className="text-gray-700">{selectedExercise.description}</p>
                </div>
              )}

              {selectedExercise.textContent && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Κείμενο Άσκησης</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedExercise.textContent}</p>
                  </div>
                </div>
              )}

              {selectedExercise.files && selectedExercise.files.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Αρχεία</h3>
                  <div className="space-y-2">
                    {selectedExercise.files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          {file.fileType.startsWith('image/') ? (
                            <Image className="w-5 h-5 text-gray-400" />
                          ) : (
                            <FileText className="w-5 h-5 text-gray-400" />
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900">{file.fileName}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(file.fileSize)}</p>
                          </div>
                        </div>
                        <a
                          href={file.secureUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-[#E7B109] text-white rounded-lg hover:bg-[#D97706] transition-colors text-sm flex items-center gap-1"
                        >
                          <Download className="w-4 h-4" />
                          Λήψη
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-sm text-gray-500">
                Καθηγητής: {selectedExercise.teacherName} | 
                Ημερομηνία: {new Date(selectedExercise.createdAt).toLocaleDateString('el-GR')}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedExercise(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Κλείσιμο
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

