"use client";

import { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Mail, 
  Phone,
  Calendar,
  GraduationCap,
  BookOpen,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Lock,
  Unlock
} from 'lucide-react';
import { adminAPI } from '@/lib/api';

interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  grade: string;
  subjects: string[];
  registrationDate: string;
  lastLogin: string | null;
  status: 'active' | 'inactive' | 'graduated' | 'suspended';
  hasAccessToThemata?: boolean;
  uniqueKey?: string;
  studentId?: string;
}

interface StudentStats {
  total: number;
  active: number;
  inactive: number;
  newThisMonth: number;
  averageProgress: number;
}

export default function StudentManagementDashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterGrade, setFilterGrade] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());
  const [isUpdatingAccess, setIsUpdatingAccess] = useState(false);
  const [error, setError] = useState<string>('');

  const [stats, setStats] = useState<StudentStats>({
    total: 0,
    active: 0,
    inactive: 0,
    newThisMonth: 0,
    averageProgress: 0
  });

  // Fetch students from API
  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus, filterGrade]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchStudents();
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await adminAPI.getStudents({
        page: 1,
        limit: 100,
        search: searchTerm || undefined,
        status: filterStatus !== 'all' ? filterStatus : undefined,
        grade: filterGrade !== 'all' ? filterGrade : undefined,
        sortBy: 'registrationDate',
        sortOrder: 'desc'
      });

      if (response.success && response.data) {
        const studentsData = response.data.students || response.data || [];
        setStudents(studentsData);
        setFilteredStudents(studentsData);
        
        // Calculate stats
        const activeStudents = studentsData.filter((s: Student) => s.status === 'active').length;
        const inactiveStudents = studentsData.filter((s: Student) => s.status === 'inactive').length;
        const thisMonth = new Date();
        thisMonth.setDate(1);
        const newThisMonth = studentsData.filter((s: Student) => 
          new Date(s.registrationDate) >= thisMonth
        ).length;

        setStats({
          total: studentsData.length,
          active: activeStudents,
          inactive: inactiveStudents,
          newThisMonth,
          averageProgress: 0 // Not available from backend
        });
      }
    } catch (err: any) {
      console.error('Error fetching students:', err);
      setError(err.response?.data?.message || 'Σφάλμα φόρτωσης μαθητών');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and search functionality
  useEffect(() => {
    let filtered = students;

    if (searchTerm) {
      filtered = filtered.filter(student =>
        `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.phone.includes(searchTerm) ||
        student.uniqueKey?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(student => student.status === filterStatus);
    }

    if (filterGrade !== 'all') {
      filtered = filtered.filter(student => student.grade === filterGrade);
    }

    setFilteredStudents(filtered);
  }, [students, searchTerm, filterStatus, filterGrade]);

  // Handle exam access toggle for single student
  const handleToggleExamAccess = async (student: Student, hasAccess: boolean) => {
    try {
      setIsUpdatingAccess(true);
      setError('');
      await adminAPI.grantExamAccess(student._id, hasAccess);
      
      // Update local state
      setStudents(prev => prev.map(s => 
        s._id === student._id 
          ? { ...s, hasAccessToThemata: hasAccess }
          : s
      ));
      
      // Update selected student if it's the same
      if (selectedStudent?._id === student._id) {
        setSelectedStudent({ ...selectedStudent, hasAccessToThemata: hasAccess });
      }
      
      // Refresh data
      await fetchStudents();
    } catch (err: any) {
      console.error('Error updating exam access:', err);
      setError(err.response?.data?.message || 'Σφάλμα ενημέρωσης πρόσβασης');
    } finally {
      setIsUpdatingAccess(false);
    }
  };

  // Handle bulk exam access
  const handleBulkExamAccess = async (hasAccess: boolean) => {
    if (selectedStudents.size === 0) {
      setError('Παρακαλώ επιλέξτε τουλάχιστον έναν μαθητή');
      return;
    }

    try {
      setIsUpdatingAccess(true);
      setError('');
      const studentIds = Array.from(selectedStudents);
      await adminAPI.bulkGrantExamAccess(studentIds, hasAccess);
      
      // Update local state
      setStudents(prev => prev.map(s => 
        selectedStudents.has(s._id)
          ? { ...s, hasAccessToThemata: hasAccess }
          : s
      ));
      
      // Clear selection
      setSelectedStudents(new Set());
      
      // Refresh data
      await fetchStudents();
    } catch (err: any) {
      console.error('Error bulk updating exam access:', err);
      setError(err.response?.data?.message || 'Σφάλμα μαζικής ενημέρωσης πρόσβασης');
    } finally {
      setIsUpdatingAccess(false);
    }
  };

  // Toggle student selection
  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(studentId)) {
        newSet.delete(studentId);
      } else {
        newSet.add(studentId);
      }
      return newSet;
    });
  };

  // Toggle all students selection
  const toggleAllSelection = () => {
    if (selectedStudents.size === filteredStudents.length) {
      setSelectedStudents(new Set());
    } else {
      setSelectedStudents(new Set(filteredStudents.map(s => s._id)));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'suspended':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ενεργός';
      case 'inactive':
        return 'Ανενεργός';
      case 'suspended':
        return 'Ανασταλμένος';
      default:
        return 'Άγνωστο';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'inactive':
        return 'text-yellow-600 bg-yellow-50';
      case 'suspended':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E7B109] mx-auto mb-4"></div>
          <p className="text-gray-600">Φόρτωση δεδομένων μαθητών...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Διαχείριση Μαθητών</h2>
          <p className="text-gray-600">Διαχείριση και παρακολούθηση των μαθητών</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#E7B109] text-white rounded-lg hover:bg-[#D97706] transition-colors">
          <Plus className="w-4 h-4" />
          Προσθήκη Μαθητή
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Συνολικοί Μαθητές</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Ενεργοί</p>
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Ανενεργοί</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inactive}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Νέοι Αυτόν τον Μήνα</p>
              <p className="text-2xl font-bold text-gray-900">{stats.newThisMonth}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Αναζήτηση με όνομα, email ή τηλέφωνο..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
            >
              <option value="all">Όλες οι Καταστάσεις</option>
              <option value="active">Ενεργοί</option>
              <option value="inactive">Ανενεργοί</option>
              <option value="suspended">Ανασταλμένοι</option>
            </select>

            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
            >
              <option value="all">Όλες οι Τάξεις</option>
              <option value="Α' Λυκείου">Α' Λυκείου</option>
              <option value="Β' Λυκείου">Β' Λυκείου</option>
              <option value="Γ' Λυκείου">Γ' Λυκείου</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedStudents.size > 0 && (
        <div className="bg-[#E7B109] text-white rounded-xl shadow-sm p-4 flex items-center justify-between">
          <span className="font-medium">
            {selectedStudents.size} μαθητή/ές επιλέχθηκαν
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleBulkExamAccess(true)}
              disabled={isUpdatingAccess}
              className="px-4 py-2 bg-white text-[#E7B109] rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              {isUpdatingAccess ? 'Ενημέρωση...' : 'Χορήγηση Πρόσβασης'}
            </button>
            <button
              onClick={() => handleBulkExamAccess(false)}
              disabled={isUpdatingAccess}
              className="px-4 py-2 bg-white text-[#E7B109] rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              {isUpdatingAccess ? 'Ενημέρωση...' : 'Ανάκληση Πρόσβασης'}
            </button>
            <button
              onClick={() => setSelectedStudents(new Set())}
              className="px-4 py-2 bg-white text-[#E7B109] rounded-lg hover:bg-gray-100 transition-colors"
            >
              Ακύρωση
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedStudents.size === filteredStudents.length && filteredStudents.length > 0}
                    onChange={toggleAllSelection}
                    className="rounded border-gray-300 text-[#E7B109] focus:ring-[#E7B109]"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Μαθητής
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Τάξη
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Μαθήματα
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Κατάσταση
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Πρόσβαση Θεμάτων
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ενέργειες
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedStudents.has(student._id)}
                      onChange={() => toggleStudentSelection(student._id)}
                      className="rounded border-gray-300 text-[#E7B109] focus:ring-[#E7B109]"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {student.firstName} {student.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                      <div className="text-sm text-gray-500">{student.phone}</div>
                      {student.uniqueKey && (
                        <div className="text-xs text-gray-400">Κλειδί: {student.uniqueKey}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.grade}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {student.subjects && student.subjects.length > 0 ? (
                        student.subjects.map((subject, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {subject}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-400">Δεν υπάρχουν μαθήματα</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                      {getStatusIcon(student.status)}
                      {getStatusText(student.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      student.hasAccessToThemata 
                        ? 'text-green-600 bg-green-50' 
                        : 'text-red-600 bg-red-50'
                    }`}>
                      {student.hasAccessToThemata ? (
                        <>
                          <Unlock className="w-3 h-3" />
                          Έχει Πρόσβαση
                        </>
                      ) : (
                        <>
                          <Lock className="w-3 h-3" />
                          Δεν Έχει Πρόσβαση
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedStudent(student);
                          setShowModal(true);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                        title="Προβολή Λεπτομερειών"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Δεν βρέθηκαν μαθητές</h3>
            <p className="text-gray-500">Δοκιμάστε να αλλάξετε τα φίλτρα αναζήτησης</p>
          </div>
        )}
      </div>

      {/* Student Details Modal */}
      {showModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Στοιχεία Μαθητή</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Κλείσιμο</span>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Ονοματεπώνυμο</h4>
                    <p className="text-lg text-gray-900">{selectedStudent.firstName} {selectedStudent.lastName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Email</h4>
                    <p className="text-lg text-gray-900">{selectedStudent.email}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Τηλέφωνο</h4>
                    <p className="text-lg text-gray-900">{selectedStudent.phone}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Τάξη</h4>
                    <p className="text-lg text-gray-900">{selectedStudent.grade}</p>
                  </div>
                  {selectedStudent.uniqueKey && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Μοναδικό Κλειδί</h4>
                      <p className="text-lg text-gray-900 font-mono">{selectedStudent.uniqueKey}</p>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Μαθήματα</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudent.subjects && selectedStudent.subjects.length > 0 ? (
                      selectedStudent.subjects.map((subject, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                        >
                          {subject}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-400">Δεν υπάρχουν μαθήματα</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Ημερομηνία Εγγραφής</h4>
                    <p className="text-lg text-gray-900">
                      {new Date(selectedStudent.registrationDate).toLocaleDateString('el-GR')}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Τελευταία Σύνδεση</h4>
                    <p className="text-lg text-gray-900">
                      {selectedStudent.lastLogin 
                        ? new Date(selectedStudent.lastLogin).toLocaleDateString('el-GR')
                        : 'Δεν έχει συνδεθεί ποτέ'}
                    </p>
                  </div>
                </div>

                {/* Exam Access Section */}
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Πρόσβαση στα Θέματα Πανελληνίων</h4>
                      <p className="text-sm text-gray-500">
                        {selectedStudent.hasAccessToThemata 
                          ? 'Ο μαθητής έχει πρόσβαση στα θέματα πανελληνίων'
                          : 'Ο μαθητής δεν έχει πρόσβαση στα θέματα πανελληνίων'}
                      </p>
                    </div>
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                      selectedStudent.hasAccessToThemata 
                        ? 'text-green-600 bg-green-50' 
                        : 'text-red-600 bg-red-50'
                    }`}>
                      {selectedStudent.hasAccessToThemata ? (
                        <>
                          <Unlock className="w-4 h-4" />
                          Έχει Πρόσβαση
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          Δεν Έχει Πρόσβαση
                        </>
                      )}
                    </span>
                  </div>
                  <button
                    onClick={() => handleToggleExamAccess(selectedStudent, !selectedStudent.hasAccessToThemata)}
                    disabled={isUpdatingAccess}
                    className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedStudent.hasAccessToThemata
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    } disabled:opacity-50`}
                  >
                    {isUpdatingAccess 
                      ? 'Ενημέρωση...' 
                      : selectedStudent.hasAccessToThemata
                        ? 'Ανάκληση Πρόσβασης'
                        : 'Χορήγηση Πρόσβασης'
                    }
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 border-t pt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Κλείσιμο
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
