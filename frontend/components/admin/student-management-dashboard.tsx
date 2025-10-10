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
  CheckCircle
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  grade: string;
  subjects: string[];
  enrollmentDate: string;
  lastActivity: string;
  status: 'active' | 'inactive' | 'suspended';
  progress: number;
  totalHours: number;
  nextClass: string;
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

  const [stats, setStats] = useState<StudentStats>({
    total: 0,
    active: 0,
    inactive: 0,
    newThisMonth: 0,
    averageProgress: 0
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockStudents: Student[] = [
      {
        id: '1',
        name: 'Μαρία Παπαδοπούλου',
        email: 'maria.papadopoulou@email.com',
        phone: '2101234567',
        grade: 'Γ\' Λυκείου',
        subjects: ['Μαθηματικά', 'Φυσική', 'Χημεία'],
        enrollmentDate: '2024-01-15',
        lastActivity: '2024-01-20',
        status: 'active',
        progress: 85,
        totalHours: 120,
        nextClass: '2024-01-25 10:00'
      },
      {
        id: '2',
        name: 'Γιάννης Κωνσταντίνου',
        email: 'giannis.konstantinou@email.com',
        phone: '2109876543',
        grade: 'Β\' Λυκείου',
        subjects: ['Βιολογία', 'Χημεία'],
        enrollmentDate: '2024-01-10',
        lastActivity: '2024-01-19',
        status: 'active',
        progress: 72,
        totalHours: 95,
        nextClass: '2024-01-24 14:00'
      },
      {
        id: '3',
        name: 'Ελένη Δημητρίου',
        email: 'elena.dimitriou@email.com',
        phone: '2105555555',
        grade: 'Γ\' Λυκείου',
        subjects: ['Ιστορία', 'Αρχαία Ελληνικά'],
        enrollmentDate: '2023-12-01',
        lastActivity: '2024-01-18',
        status: 'inactive',
        progress: 45,
        totalHours: 60,
        nextClass: 'Δεν έχει προγραμματιστεί'
      }
    ];

    setStudents(mockStudents);
    setFilteredStudents(mockStudents);
    
    // Calculate stats
    const activeStudents = mockStudents.filter(s => s.status === 'active').length;
    const inactiveStudents = mockStudents.filter(s => s.status === 'inactive').length;
    const newThisMonth = mockStudents.filter(s => 
      new Date(s.enrollmentDate) >= new Date('2024-01-01')
    ).length;
    const averageProgress = mockStudents.reduce((sum, s) => sum + s.progress, 0) / mockStudents.length;

    setStats({
      total: mockStudents.length,
      active: activeStudents,
      inactive: inactiveStudents,
      newThisMonth,
      averageProgress: Math.round(averageProgress)
    });

    setIsLoading(false);
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = students;

    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.phone.includes(searchTerm)
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

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
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
                  Πρόοδος
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Κατάσταση
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Επόμενο Μάθημα
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ενέργειες
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                      <div className="text-sm text-gray-500">{student.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.grade}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {student.subjects.map((subject, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-[#E7B109] h-2 rounded-full"
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                      {getStatusIcon(student.status)}
                      {getStatusText(student.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.nextClass}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedStudent(student);
                          setShowModal(true);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
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
                    <p className="text-lg text-gray-900">{selectedStudent.name}</p>
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
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Μαθήματα</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudent.subjects.map((subject, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Πρόοδος</h4>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                        <div
                          className="bg-[#E7B109] h-2 rounded-full"
                          style={{ width: `${selectedStudent.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-lg font-medium text-gray-900">{selectedStudent.progress}%</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Συνολικές Ώρες</h4>
                    <p className="text-lg text-gray-900">{selectedStudent.totalHours} ώρες</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Ημερομηνία Εγγραφής</h4>
                    <p className="text-lg text-gray-900">
                      {new Date(selectedStudent.enrollmentDate).toLocaleDateString('el-GR')}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Τελευταία Δραστηριότητα</h4>
                    <p className="text-lg text-gray-900">
                      {new Date(selectedStudent.lastActivity).toLocaleDateString('el-GR')}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Επόμενο Μάθημα</h4>
                  <p className="text-lg text-gray-900">{selectedStudent.nextClass}</p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Κλείσιμο
                </button>
                <button className="px-4 py-2 bg-[#E7B109] text-white rounded-lg hover:bg-[#D97706] transition-colors">
                  Επεξεργασία
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
