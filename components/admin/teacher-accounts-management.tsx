"use client";

import { useState, useEffect } from 'react';
import { adminAPI } from '@/lib/api';
import { 
  Users, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Mail,
  Shield,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Key
} from 'lucide-react';

interface TeacherAdmin {
  _id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  specialization?: string;
  permissions?: any;
  createdAt?: string;
  lastLogin?: string;
}

export default function TeacherAccountsManagement() {
  const [teachers, setTeachers] = useState<TeacherAdmin[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<TeacherAdmin[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherAdmin | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0,
  });

  const [newTeacher, setNewTeacher] = useState({
    email: '',
    password: '',
    name: '',
    role: 'super_admin',
    isActive: true,
    specialization: '',
  });

  useEffect(() => {
    loadTeachers();
  }, [pagination.page, filterRole, filterStatus]);

  useEffect(() => {
    filterTeachers();
  }, [searchTerm, teachers, filterRole, filterStatus]);

  const loadTeachers = async () => {
    try {
      setIsLoading(true);
      const params: any = {
        page: pagination.page,
        limit: pagination.limit,
      };
      
      if (filterRole !== 'all') {
        params.role = filterRole;
      }
      
      if (searchTerm) {
        params.search = searchTerm;
      }

      const response = await adminAPI.getTeacherAdmins(params);
      
      if (response.success) {
        let teachersData = response.data?.admins || [];
        
        // Apply status filter on client side
        if (filterStatus !== 'all') {
          teachersData = teachersData.filter((t: TeacherAdmin) => 
            filterStatus === 'active' ? t.isActive : !t.isActive
          );
        }
        
        setTeachers(teachersData);
        setPagination({
          ...pagination,
          total: response.data?.pagination?.total || 0,
          totalPages: response.data?.pagination?.totalPages || 0,
        });
      } else {
        setError(response.message || 'Σφάλμα φόρτωσης καθηγητών');
      }
    } catch (error: any) {
      console.error('Error loading teachers:', error);
      setError('Σφάλμα φόρτωσης καθηγητών');
    } finally {
      setIsLoading(false);
    }
  };

  const filterTeachers = () => {
    let filtered = [...teachers];

    if (searchTerm) {
      filtered = filtered.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTeachers(filtered);
  };

  const handleAddTeacher = async () => {
    if (!newTeacher.email || !newTeacher.password || !newTeacher.name) {
      setError('Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newTeacher.email)) {
      setError('Παρακαλώ εισάγετε έγκυρο email');
      return;
    }

    // Password validation
    if (newTeacher.password.length < 6) {
      setError('Ο κωδικός πρέπει να έχει τουλάχιστον 6 χαρακτήρες');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      
      const response = await adminAPI.createTeacherAdmin(newTeacher);
      
      if (response.success) {
        setSuccess('Ο καθηγητής δημιουργήθηκε επιτυχώς');
        setShowAddModal(false);
        setNewTeacher({
          email: '',
          password: '',
          name: '',
          role: 'super_admin',
          isActive: true,
          specialization: '',
        });
        loadTeachers();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.message || 'Σφάλμα δημιουργίας καθηγητή');
      }
    } catch (error: any) {
      console.error('Error creating teacher:', error);
      setError(error.response?.data?.message || 'Σφάλμα δημιουργίας καθηγητή');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateTeacher = async () => {
    if (!selectedTeacher) return;

    if (!selectedTeacher.email || !selectedTeacher.name) {
      setError('Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(selectedTeacher.email)) {
      setError('Παρακαλώ εισάγετε έγκυρο email');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      
      const updateData: any = {
        email: selectedTeacher.email,
        name: selectedTeacher.name,
        role: selectedTeacher.role,
        isActive: selectedTeacher.isActive,
        specialization: selectedTeacher.specialization || null,
      };

      // Only include password if it's being changed (not empty)
      const passwordInput = (document.getElementById('edit-password') as HTMLInputElement)?.value;
      if (passwordInput && passwordInput.length > 0) {
        if (passwordInput.length < 6) {
          setError('Ο κωδικός πρέπει να έχει τουλάχιστον 6 χαρακτήρες');
          setIsSubmitting(false);
          return;
        }
        updateData.password = passwordInput;
      }

      const response = await adminAPI.updateTeacherAdmin(selectedTeacher._id, updateData);
      
      if (response.success) {
        setSuccess('Ο καθηγητής ενημερώθηκε επιτυχώς');
        setShowEditModal(false);
        setSelectedTeacher(null);
        loadTeachers();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.message || 'Σφάλμα ενημέρωσης καθηγητή');
      }
    } catch (error: any) {
      console.error('Error updating teacher:', error);
      setError(error.response?.data?.message || 'Σφάλμα ενημέρωσης καθηγητή');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTeacher = async (id: string) => {
    if (!confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτόν τον καθηγητή;')) {
      return;
    }

    try {
      const response = await adminAPI.deleteTeacherAdmin(id);
      
      if (response.success) {
        setSuccess('Ο καθηγητής διαγράφηκε επιτυχώς');
        loadTeachers();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.message || 'Σφάλμα διαγραφής καθηγητή');
      }
    } catch (error: any) {
      console.error('Error deleting teacher:', error);
      setError(error.response?.data?.message || 'Σφάλμα διαγραφής καθηγητή');
    }
  };

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      'teacher': 'Καθηγητής',
      'admin': 'Διαχειριστής',
      'super_admin': 'Υπερ-Διαχειριστής',
      'moderator': 'Συντονιστής',
    };
    return labels[role] || role;
  };

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      'teacher': 'bg-blue-100 text-blue-800',
      'admin': 'bg-green-100 text-green-800',
      'super_admin': 'bg-purple-100 text-purple-800',
      'moderator': 'bg-yellow-100 text-yellow-800',
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Διαχείριση Λογαριασμών Καθηγητών</h2>
          <p className="text-sm sm:text-base text-gray-600">Διαχείριση λογαριασμών καθηγητών με πρόσβαση στο πίνακα διαχείρισης</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-[#E7B109] text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-[#D97706] transition-colors flex items-center gap-2 text-sm sm:text-base whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          Νέος Καθηγητής
        </button>
      </div>

      {/* Success/Error Messages */}
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

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Ρόλος</label>
            <select
              value={filterRole}
              onChange={(e) => {
                setFilterRole(e.target.value);
                setPagination({ ...pagination, page: 1 });
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
            >
              <option value="all">Όλοι</option>
              <option value="super_admin">Υπερ-Διαχειριστής</option>
              <option value="admin">Διαχειριστής</option>
              <option value="moderator">Συντονιστής</option>
              <option value="teacher">Καθηγητής (Παλιό)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Κατάσταση</label>
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setPagination({ ...pagination, page: 1 });
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
            >
              <option value="all">Όλα</option>
              <option value="active">Ενεργοί</option>
              <option value="inactive">Ανενεργοί</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={loadTeachers}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Ανανέωση
            </button>
          </div>
        </div>
      </div>

      {/* Teachers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Όνομα</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ρόλος</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ειδικότητα</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Κατάσταση</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Τελευταία Σύνδεση</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ενέργειες</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTeachers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    Δεν βρέθηκαν καθηγητές
                  </td>
                </tr>
              ) : (
                filteredTeachers.map((teacher) => (
                  <tr key={teacher._id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {teacher.email}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(teacher.role)}`}>
                        {getRoleLabel(teacher.role)}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {teacher.specialization ? 
                          teacher.specialization === 'math' ? 'Μαθηματικά' :
                          teacher.specialization === 'physics' ? 'Φυσική' :
                          teacher.specialization === 'chemistry' ? 'Χημεία' :
                          teacher.specialization === 'biology' ? 'Βιολογία' :
                          teacher.specialization === 'greek' ? 'Νέα Ελληνικά' :
                          teacher.specialization === 'ancient-greek' ? 'Αρχαία Ελληνικά' :
                          teacher.specialization === 'history' ? 'Ιστορία' :
                          teacher.specialization === 'latin' ? 'Λατινικά' :
                          teacher.specialization === 'economics' ? 'Οικονομικά' :
                          teacher.specialization === 'informatics' ? 'Πληροφορική' :
                          teacher.specialization
                          : '-'}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      {teacher.isActive ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3" />
                          Ενεργός
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          <XCircle className="w-3 h-3" />
                          Ανενεργός
                        </span>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {teacher.lastLogin 
                        ? new Date(teacher.lastLogin).toLocaleDateString('el-GR', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        : 'Ποτέ'}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedTeacher(teacher);
                            setShowEditModal(true);
                          }}
                          className="text-[#E7B109] hover:text-[#D97706]"
                          title="Επεξεργασία"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTeacher(teacher._id)}
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
          {filteredTeachers.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-500">
              Δεν βρέθηκαν καθηγητές
            </div>
          ) : (
            filteredTeachers.map((teacher) => (
              <div key={teacher._id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">{teacher.name}</h3>
                    <div className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                      <Mail className="w-3 h-3" />
                      <span className="truncate">{teacher.email}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(teacher.role)}`}>
                        {getRoleLabel(teacher.role)}
                      </span>
                      {teacher.isActive ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3" />
                          Ενεργός
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          <XCircle className="w-3 h-3" />
                          Ανενεργός
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => {
                        setSelectedTeacher(teacher);
                        setShowEditModal(true);
                      }}
                      className="text-[#E7B109] hover:text-[#D97706] p-1"
                      title="Επεξεργασία"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTeacher(teacher._id)}
                      className="text-red-600 hover:text-red-800 p-1"
                      title="Διαγραφή"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="space-y-1 text-xs text-gray-600">
                  {teacher.specialization && (
                    <div>
                      <span className="font-medium">Ειδικότητα:</span>{' '}
                      {teacher.specialization === 'math' ? 'Μαθηματικά' :
                       teacher.specialization === 'physics' ? 'Φυσική' :
                       teacher.specialization === 'chemistry' ? 'Χημεία' :
                       teacher.specialization === 'biology' ? 'Βιολογία' :
                       teacher.specialization === 'greek' ? 'Νέα Ελληνικά' :
                       teacher.specialization === 'ancient-greek' ? 'Αρχαία Ελληνικά' :
                       teacher.specialization === 'history' ? 'Ιστορία' :
                       teacher.specialization === 'latin' ? 'Λατινικά' :
                       teacher.specialization === 'economics' ? 'Οικονομικά' :
                       teacher.specialization === 'informatics' ? 'Πληροφορική' :
                       teacher.specialization}
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Τελευταία Σύνδεση:</span>{' '}
                    {teacher.lastLogin 
                      ? new Date(teacher.lastLogin).toLocaleDateString('el-GR', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : 'Ποτέ'}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Εμφάνιση {(pagination.page - 1) * pagination.limit + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} από {pagination.total}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                disabled={pagination.page === 1}
                className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Προηγούμενο
              </button>
              <button
                onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                disabled={pagination.page >= pagination.totalPages}
                className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Επόμενο
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Teacher Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Νέος Καθηγητής</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Όνομα *</label>
                <input
                  type="text"
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={newTeacher.email}
                  onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Κωδικός *</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newTeacher.password}
                    onChange={(e) => setNewTeacher({ ...newTeacher, password: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Ελάχιστο 6 χαρακτήρες</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ρόλος</label>
                <input
                  type="text"
                  value="Υπερ-Διαχειριστής"
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Όλοι οι καθηγητές είναι αυτόματα Υπερ-Διαχειριστές</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ειδικότητα</label>
                <select
                  value={newTeacher.specialization}
                  onChange={(e) => setNewTeacher({ ...newTeacher, specialization: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                >
                  <option value="">Επιλέξτε ειδικότητα</option>
                  <option value="math">Μαθηματικά</option>
                  <option value="physics">Φυσική</option>
                  <option value="chemistry">Χημεία</option>
                  <option value="biology">Βιολογία</option>
                  <option value="greek">Νέα Ελληνικά</option>
                  <option value="ancient-greek">Αρχαία Ελληνικά</option>
                  <option value="history">Ιστορία</option>
                  <option value="latin">Λατινικά</option>
                  <option value="economics">Οικονομικά</option>
                  <option value="informatics">Πληροφορική</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newTeacher.isActive}
                    onChange={(e) => setNewTeacher({ ...newTeacher, isActive: e.target.checked })}
                    className="rounded border-gray-300 text-[#E7B109] focus:ring-[#E7B109]"
                  />
                  <span className="text-sm font-medium text-gray-700">Ενεργός λογαριασμός</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setError('');
                  setNewTeacher({
                    email: '',
                    password: '',
                    name: '',
                    role: 'teacher',
                    isActive: true,
                    specialization: '',
                  });
                }}
                className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Ακύρωση
              </button>
              <button
                onClick={handleAddTeacher}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base bg-[#E7B109] text-white rounded-lg hover:bg-[#D97706] disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? 'Αποθήκευση...' : 'Αποθήκευση'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Teacher Modal */}
      {showEditModal && selectedTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Επεξεργασία Καθηγητή</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Όνομα *</label>
                <input
                  type="text"
                  value={selectedTeacher.name}
                  onChange={(e) => setSelectedTeacher({ ...selectedTeacher, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={selectedTeacher.email}
                  onChange={(e) => setSelectedTeacher({ ...selectedTeacher, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Νέος Κωδικός
                  <span className="text-gray-500 text-xs ml-2">(Αφήστε κενό για να παραμείνει ο ίδιος)</span>
                </label>
                <div className="relative">
                  <input
                    id="edit-password"
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent pr-10"
                    placeholder="Αφήστε κενό για να παραμείνει ο ίδιος"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Ελάχιστο 6 χαρακτήρες</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ρόλος</label>
                <input
                  type="text"
                  value={getRoleLabel(selectedTeacher.role)}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Όλοι οι καθηγητές είναι αυτόματα Υπερ-Διαχειριστές</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ειδικότητα</label>
                <select
                  value={selectedTeacher.specialization || ''}
                  onChange={(e) => setSelectedTeacher({ ...selectedTeacher, specialization: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                >
                  <option value="">Επιλέξτε ειδικότητα</option>
                  <option value="math">Μαθηματικά</option>
                  <option value="physics">Φυσική</option>
                  <option value="chemistry">Χημεία</option>
                  <option value="biology">Βιολογία</option>
                  <option value="greek">Νέα Ελληνικά</option>
                  <option value="ancient-greek">Αρχαία Ελληνικά</option>
                  <option value="history">Ιστορία</option>
                  <option value="latin">Λατινικά</option>
                  <option value="economics">Οικονομικά</option>
                  <option value="informatics">Πληροφορική</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedTeacher.isActive}
                    onChange={(e) => setSelectedTeacher({ ...selectedTeacher, isActive: e.target.checked })}
                    className="rounded border-gray-300 text-[#E7B109] focus:ring-[#E7B109]"
                  />
                  <span className="text-sm font-medium text-gray-700">Ενεργός λογαριασμός</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedTeacher(null);
                  setError('');
                }}
                className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Ακύρωση
              </button>
              <button
                onClick={handleUpdateTeacher}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base bg-[#E7B109] text-white rounded-lg hover:bg-[#D97706] disabled:opacity-50 transition-colors"
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

