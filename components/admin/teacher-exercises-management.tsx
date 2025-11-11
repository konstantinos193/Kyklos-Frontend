"use client";

import { useState, useEffect } from 'react';
import { adminAPI } from '@/lib/api';
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Upload,
  FileText,
  Image,
  X,
  Download,
  Eye
} from 'lucide-react';

interface Exercise {
  _id: string;
  title: string;
  description?: string;
  textContent?: string;
  subject: string;
  grade?: string;
  teacherId: string;
  teacherName: string;
  files?: Array<{
    url: string;
    secureUrl: string;
    publicId: string;
    fileName: string;
    fileType: string;
    fileSize: number;
  }>;
  isActive: boolean;
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

export default function TeacherExercisesManagement() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const [newExercise, setNewExercise] = useState({
    title: '',
    description: '',
    subject: '',
    grade: '',
    textContent: '',
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      setIsLoading(true);
      const response = await adminAPI.getTeacherExercises({ limit: 100 });
      
      if (response.success) {
        setExercises(response.data?.exercises || []);
      } else {
        setError(response.message || 'Σφάλμα φόρτωσης ασκήσεων');
      }
    } catch (error: any) {
      console.error('Error loading exercises:', error);
      setError('Σφάλμα φόρτωσης ασκήσεων');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateExercise = async () => {
    if (!newExercise.title || !newExercise.subject) {
      setError('Παρακαλώ συμπληρώστε τίτλο και μάθημα');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      
      const formData = new FormData();
      formData.append('title', newExercise.title);
      formData.append('description', newExercise.description);
      formData.append('subject', newExercise.subject);
      if (newExercise.grade) formData.append('grade', newExercise.grade);
      if (newExercise.textContent) formData.append('textContent', newExercise.textContent);
      
      selectedFiles.forEach((file) => {
        formData.append('files', file);
      });

      const response = await adminAPI.createExercise(formData);
      
      if (response.success) {
        setSuccess('Η άσκηση δημιουργήθηκε επιτυχώς');
        setShowAddModal(false);
        setNewExercise({ title: '', description: '', subject: '', grade: '', textContent: '' });
        setSelectedFiles([]);
        loadExercises();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.message || 'Σφάλμα δημιουργίας άσκησης');
      }
    } catch (error: any) {
      console.error('Error creating exercise:', error);
      setError(error.response?.data?.message || 'Σφάλμα δημιουργίας άσκησης');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteExercise = async (id: string) => {
    if (!confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτή την άσκηση;')) {
      return;
    }

    try {
      const response = await adminAPI.deleteExercise(id);
      
      if (response.success) {
        setSuccess('Η άσκηση διαγράφηκε επιτυχώς');
        loadExercises();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.message || 'Σφάλμα διαγραφής άσκησης');
      }
    } catch (error: any) {
      console.error('Error deleting exercise:', error);
      setError(error.response?.data?.message || 'Σφάλμα διαγραφής άσκησης');
    }
  };

  const getSubjectLabel = (subject: string) => {
    return SUBJECTS.find(s => s.value === subject)?.label || subject;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E7B109] mx-auto mb-4"></div>
          <p className="text-gray-600">Φόρτωση δεδομένων...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Διαχείριση Ασκήσεων</h2>
          <p className="text-sm sm:text-base text-gray-600">Δημιουργήστε και διαχειριστείτε ασκήσεις για τους μαθητές σας</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-[#E7B109] text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-[#D97706] transition-colors flex items-center gap-2 text-sm sm:text-base whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          Νέα Άσκηση
        </button>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Τίτλος</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Μάθημα</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Τάξη</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Αρχεία</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ενέργειες</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {exercises.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Δεν υπάρχουν ασκήσεις
                  </td>
                </tr>
              ) : (
                exercises.map((exercise) => (
                  <tr key={exercise._id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{exercise.title}</div>
                      {exercise.description && (
                        <div className="text-xs text-gray-500 mt-1">{exercise.description}</div>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {getSubjectLabel(exercise.subject)}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {exercise.grade || '-'}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {exercise.files?.length || 0} αρχεία
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDeleteExercise(exercise._id)}
                          className="text-red-600 hover:text-red-800"
                          title="Διαγραφή"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-gray-200">
          {exercises.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-500">
              Δεν υπάρχουν ασκήσεις
            </div>
          ) : (
            exercises.map((exercise) => (
              <div key={exercise._id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">{exercise.title}</h3>
                    {exercise.description && (
                      <p className="text-xs text-gray-500 line-clamp-2">{exercise.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteExercise(exercise._id)}
                    className="text-red-600 hover:text-red-800 flex-shrink-0 p-1"
                    title="Διαγραφή"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
                    {getSubjectLabel(exercise.subject)}
                  </span>
                  {exercise.grade && (
                    <span className="text-gray-600">Τάξη: {exercise.grade}</span>
                  )}
                  <span className="text-gray-600">{exercise.files?.length || 0} αρχεία</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Exercise Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-3xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Νέα Άσκηση</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Τίτλος *</label>
                <input
                  type="text"
                  value={newExercise.title}
                  onChange={(e) => setNewExercise({ ...newExercise, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Μάθημα *</label>
                <select
                  value={newExercise.subject}
                  onChange={(e) => setNewExercise({ ...newExercise, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                  required
                >
                  <option value="">Επιλέξτε μάθημα</option>
                  {SUBJECTS.map(subject => (
                    <option key={subject.value} value={subject.value}>{subject.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Τάξη</label>
                <input
                  type="text"
                  value={newExercise.grade}
                  onChange={(e) => setNewExercise({ ...newExercise, grade: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                  placeholder="π.χ. Γ' Λυκείου"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Περιγραφή</label>
                <textarea
                  value={newExercise.description}
                  onChange={(e) => setNewExercise({ ...newExercise, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Κείμενο Άσκησης</label>
                <textarea
                  value={newExercise.textContent}
                  onChange={(e) => setNewExercise({ ...newExercise, textContent: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                  placeholder="Εισάγετε το κείμενο της άσκησης..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Αρχεία (PDF, Εικόνες, κτλ.)</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) {
                      setSelectedFiles(Array.from(e.target.files));
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                  accept=".pdf,.png,.jpg,.jpeg,.gif,.doc,.docx"
                />
                {selectedFiles.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText className="w-4 h-4" />
                        <span>{file.name}</span>
                        <button
                          onClick={() => setSelectedFiles(selectedFiles.filter((_, i) => i !== index))}
                          className="text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setError('');
                  setNewExercise({ title: '', description: '', subject: '', grade: '', textContent: '' });
                  setSelectedFiles([]);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Ακύρωση
              </button>
              <button
                onClick={handleCreateExercise}
                disabled={isSubmitting}
                className="px-4 py-2 bg-[#E7B109] text-white rounded-lg hover:bg-[#D97706] disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? 'Αποθήκευση...' : 'Αποθήκευση'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

