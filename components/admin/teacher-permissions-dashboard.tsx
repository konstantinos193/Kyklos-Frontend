"use client";

import { useState, useEffect } from 'react';
import { adminAPI } from '@/lib/api';
import { 
  Shield, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Download,
  Settings,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  BookOpen
} from 'lucide-react';

interface TeacherPermission {
  _id: string;
  teacher: string | { _id: string; name: string; email: string };
  teacherName: string;
  examMaterial: string | { _id: string; title: string; subject: string; grade: string; year: number };
  permissionType: 'view' | 'download' | 'manage' | 'full';
  grantedBy: string | { _id: string; name: string; email: string };
  grantedByName: string;
  grantedAt: string;
  expiresAt?: string;
  isActive: boolean;
  notes?: string;
}

interface Teacher {
  _id: string;
  name: string;
  email: string;
}

interface ExamMaterial {
  _id: string;
  title: string;
  subject: string;
  grade: string;
  year: number;
  type: string;
}

export default function TeacherPermissionsDashboard() {
  const [permissions, setPermissions] = useState<TeacherPermission[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [examMaterials, setExamMaterials] = useState<ExamMaterial[]>([]);
  const [filteredPermissions, setFilteredPermissions] = useState<TeacherPermission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTeacher, setFilterTeacher] = useState<string>('all');
  const [filterPermissionType, setFilterPermissionType] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<TeacherPermission | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  
  const [newPermission, setNewPermission] = useState({
    teacherId: '',
    examMaterialId: '',
    permissionType: 'view' as 'view' | 'download' | 'manage' | 'full',
    expiresAt: '',
    notes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterPermissions();
  }, [searchTerm, filterTeacher, filterPermissionType, permissions]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      
      // Load permissions, teachers, and exam materials in parallel
      const [permissionsRes, teachersRes, materialsRes] = await Promise.all([
        adminAPI.getTeacherPermissions({ limit: 100 }),
        adminAPI.getTeachers().catch(() => ({ data: [] })),
        adminAPI.getExamMaterials({ limit: 100 }).catch(() => ({ data: [] }))
      ]);

      if (permissionsRes.success) {
        setPermissions(permissionsRes.data?.permissions || []);
      }
      
      if (teachersRes.data) {
        setTeachers(teachersRes.data || []);
      }
      
      if (materialsRes.data) {
        setExamMaterials(materialsRes.data || []);
      }
    } catch (error: any) {
      console.error('Error loading data:', error);
      setError('Σφάλμα φόρτωσης δεδομένων');
    } finally {
      setIsLoading(false);
    }
  };

  const filterPermissions = () => {
    let filtered = [...permissions];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(p => {
        const teacherName = typeof p.teacher === 'object' ? p.teacher.name : p.teacherName || '';
        const materialTitle = typeof p.examMaterial === 'object' ? p.examMaterial.title : '';
        return (
          teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          materialTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.notes?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    // Teacher filter
    if (filterTeacher !== 'all') {
      filtered = filtered.filter(p => {
        const teacherId = typeof p.teacher === 'object' ? p.teacher._id : p.teacher;
        return teacherId === filterTeacher;
      });
    }

    // Permission type filter
    if (filterPermissionType !== 'all') {
      filtered = filtered.filter(p => p.permissionType === filterPermissionType);
    }

    setFilteredPermissions(filtered);
  };

  const handleAddPermission = async () => {
    if (!newPermission.teacherId || !newPermission.examMaterialId) {
      setError('Παρακαλώ επιλέξτε καθηγητή και εκπαιδευτικό υλικό');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      
      const permissionData = {
        teacherId: newPermission.teacherId,
        examMaterialId: newPermission.examMaterialId,
        permissionType: newPermission.permissionType,
        expiresAt: newPermission.expiresAt || undefined,
        notes: newPermission.notes || undefined
      };

      const response = await adminAPI.grantTeacherPermission(permissionData);
      
      if (response.success) {
        setSuccess('Η άδεια παραχωρήθηκε επιτυχώς');
        setShowAddModal(false);
        setNewPermission({
          teacherId: '',
          examMaterialId: '',
          permissionType: 'view',
          expiresAt: '',
          notes: ''
        });
        loadData();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.message || 'Σφάλμα παραχώρησης άδειας');
      }
    } catch (error: any) {
      console.error('Error granting permission:', error);
      setError(error.response?.data?.message || 'Σφάλμα παραχώρησης άδειας');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdatePermission = async () => {
    if (!selectedPermission) return;

    try {
      setIsSubmitting(true);
      setError('');
      
      const updateData = {
        permissionType: selectedPermission.permissionType,
        expiresAt: selectedPermission.expiresAt || null,
        isActive: selectedPermission.isActive,
        notes: selectedPermission.notes || undefined
      };

      const response = await adminAPI.updateTeacherPermission(selectedPermission._id, updateData);
      
      if (response.success) {
        setSuccess('Η άδεια ενημερώθηκε επιτυχώς');
        setShowEditModal(false);
        setSelectedPermission(null);
        loadData();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.message || 'Σφάλμα ενημέρωσης άδειας');
      }
    } catch (error: any) {
      console.error('Error updating permission:', error);
      setError(error.response?.data?.message || 'Σφάλμα ενημέρωσης άδειας');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRevokePermission = async (id: string) => {
    if (!confirm('Είστε σίγουροι ότι θέλετε να ανακαλέσετε αυτή την άδεια;')) {
      return;
    }

    try {
      const response = await adminAPI.revokeTeacherPermission(id);
      
      if (response.success) {
        setSuccess('Η άδεια ανακαλέστηκε επιτυχώς');
        loadData();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.message || 'Σφάλμα ανακαλέσεως άδειας');
      }
    } catch (error: any) {
      console.error('Error revoking permission:', error);
      setError(error.response?.data?.message || 'Σφάλμα ανακαλέσεως άδειας');
    }
  };

  const getPermissionTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'view': 'Προβολή',
      'download': 'Λήψη',
      'manage': 'Διαχείριση',
      'full': 'Πλήρης'
    };
    return labels[type] || type;
  };

  const getPermissionTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'view': 'bg-blue-100 text-blue-800',
      'download': 'bg-green-100 text-green-800',
      'manage': 'bg-yellow-100 text-yellow-800',
      'full': 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const isExpired = (expiresAt?: string) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Διαχείριση Δικαιωμάτων Καθηγητών</h2>
          <p className="text-gray-600">Διαχείριση πρόσβασης καθηγητών σε εκπαιδευτικό υλικό</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-[#E7B109] text-white px-4 py-2 rounded-lg hover:bg-[#D97706] transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Νέα Άδεια
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Καθηγητής</label>
            <select
              value={filterTeacher}
              onChange={(e) => setFilterTeacher(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
            >
              <option value="all">Όλοι</option>
              {teachers.map(teacher => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Τύπος Δικαιώματος</label>
            <select
              value={filterPermissionType}
              onChange={(e) => setFilterPermissionType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
            >
              <option value="all">Όλα</option>
              <option value="view">Προβολή</option>
              <option value="download">Λήψη</option>
              <option value="manage">Διαχείριση</option>
              <option value="full">Πλήρης</option>
            </select>
          </div>
        </div>
      </div>

      {/* Permissions Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Καθηγητής</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Υλικό</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Τύπος</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Λήξη</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Κατάσταση</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ενέργειες</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPermissions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Δεν βρέθηκαν άδειες
                  </td>
                </tr>
              ) : (
                filteredPermissions.map((permission) => {
                  const teacherName = typeof permission.teacher === 'object' 
                    ? permission.teacher.name 
                    : permission.teacherName || 'Άγνωστος';
                  const material = typeof permission.examMaterial === 'object' 
                    ? permission.examMaterial 
                    : null;
                  const expired = isExpired(permission.expiresAt);

                  return (
                    <tr key={permission._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{teacherName}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {material ? material.title : 'Άγνωστο'}
                        </div>
                        {material && (
                          <div className="text-xs text-gray-500">
                            {material.subject} - {material.grade} ({material.year})
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPermissionTypeColor(permission.permissionType)}`}>
                          {getPermissionTypeLabel(permission.permissionType)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {permission.expiresAt 
                          ? new Date(permission.expiresAt).toLocaleDateString('el-GR')
                          : 'Χωρίς λήξη'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {!permission.isActive ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                            <XCircle className="w-3 h-3" />
                            Ανενεργή
                          </span>
                        ) : expired ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                            <Clock className="w-3 h-3" />
                            Έληξε
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3" />
                            Ενεργή
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedPermission(permission);
                              setShowEditModal(true);
                            }}
                            className="text-[#E7B109] hover:text-[#D97706]"
                            title="Επεξεργασία"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleRevokePermission(permission._id)}
                            className="text-red-600 hover:text-red-800"
                            title="Αναίρεση"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Permission Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Νέα Άδεια</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Καθηγητής *</label>
                <select
                  value={newPermission.teacherId}
                  onChange={(e) => setNewPermission({ ...newPermission, teacherId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                  required
                >
                  <option value="">Επιλέξτε καθηγητή</option>
                  {teachers.map(teacher => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.name} ({teacher.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Εκπαιδευτικό Υλικό *</label>
                <select
                  value={newPermission.examMaterialId}
                  onChange={(e) => setNewPermission({ ...newPermission, examMaterialId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                  required
                >
                  <option value="">Επιλέξτε υλικό</option>
                  {examMaterials.map(material => (
                    <option key={material._id} value={material._id}>
                      {material.title} - {material.subject} ({material.grade}, {material.year})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Τύπος Δικαιώματος *</label>
                <select
                  value={newPermission.permissionType}
                  onChange={(e) => setNewPermission({ ...newPermission, permissionType: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                  required
                >
                  <option value="view">Προβολή</option>
                  <option value="download">Λήψη</option>
                  <option value="manage">Διαχείριση</option>
                  <option value="full">Πλήρης</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ημερομηνία Λήξης</label>
                <input
                  type="datetime-local"
                  value={newPermission.expiresAt}
                  onChange={(e) => setNewPermission({ ...newPermission, expiresAt: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Σημειώσεις</label>
                <textarea
                  value={newPermission.notes}
                  onChange={(e) => setNewPermission({ ...newPermission, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                  placeholder="Προαιρετικές σημειώσεις..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setError('');
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Ακύρωση
              </button>
              <button
                onClick={handleAddPermission}
                disabled={isSubmitting}
                className="px-4 py-2 bg-[#E7B109] text-white rounded-lg hover:bg-[#D97706] disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? 'Αποθήκευση...' : 'Αποθήκευση'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Permission Modal */}
      {showEditModal && selectedPermission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Επεξεργασία Άδειας</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Τύπος Δικαιώματος</label>
                <select
                  value={selectedPermission.permissionType}
                  onChange={(e) => setSelectedPermission({ ...selectedPermission, permissionType: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                >
                  <option value="view">Προβολή</option>
                  <option value="download">Λήψη</option>
                  <option value="manage">Διαχείριση</option>
                  <option value="full">Πλήρης</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ημερομηνία Λήξης</label>
                <input
                  type="datetime-local"
                  value={selectedPermission.expiresAt ? new Date(selectedPermission.expiresAt).toISOString().slice(0, 16) : ''}
                  onChange={(e) => setSelectedPermission({ ...selectedPermission, expiresAt: e.target.value || undefined })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                />
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedPermission.isActive}
                    onChange={(e) => setSelectedPermission({ ...selectedPermission, isActive: e.target.checked })}
                    className="rounded border-gray-300 text-[#E7B109] focus:ring-[#E7B109]"
                  />
                  <span className="text-sm font-medium text-gray-700">Ενεργή</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Σημειώσεις</label>
                <textarea
                  value={selectedPermission.notes || ''}
                  onChange={(e) => setSelectedPermission({ ...selectedPermission, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                  placeholder="Προαιρετικές σημειώσεις..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedPermission(null);
                  setError('');
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Ακύρωση
              </button>
              <button
                onClick={handleUpdatePermission}
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

