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
  Download,
  Settings,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

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

interface TeacherPermission {
  _id: string;
  teacher: Teacher;
  examMaterial: ExamMaterial;
  permissionType: 'view' | 'download' | 'manage' | 'full';
  grantedBy: Teacher;
  grantedAt: string;
  expiresAt?: string;
  isActive: boolean;
  notes?: string;
}

interface TeacherPermissionsManagementProps {
  onClose?: () => void;
}

export default function TeacherPermissionsManagement({ onClose }: TeacherPermissionsManagementProps) {
  const [permissions, setPermissions] = useState<TeacherPermission[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [examMaterials, setExamMaterials] = useState<ExamMaterial[]>([]);
  const [filteredPermissions, setFilteredPermissions] = useState<TeacherPermission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTeacher, setFilterTeacher] = useState('');
  const [filterExamMaterial, setFilterExamMaterial] = useState('');
  const [filterPermissionType, setFilterPermissionType] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<TeacherPermission | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form state for creating/editing permissions
  const [formData, setFormData] = useState({
    teacherId: '',
    examMaterialId: '',
    permissionType: 'view' as 'view' | 'download' | 'manage' | 'full',
    expiresAt: '',
    notes: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      
      const token = localStorage.getItem('adminToken');
      if (!token) {
        console.error('No admin token found');
        return;
      }

      // Load permissions, teachers, and exam materials in parallel
      const [permissionsRes, teachersRes, examMaterialsRes] = await Promise.all([
        fetch('/api/teacher-permissions', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/admin/students', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/exam-materials/admin/list', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      const [permissionsData, teachersData, examMaterialsData] = await Promise.all([
        permissionsRes.json(),
        teachersRes.json(),
        examMaterialsRes.json()
      ]);

      if (permissionsData.success) {
        setPermissions(permissionsData.data.permissions);
        setFilteredPermissions(permissionsData.data.permissions);
      }

      if (teachersData.success) {
        // Transform students to teachers (assuming teachers are admins)
        setTeachers(teachersData.data.students.map((student: any) => ({
          _id: student._id,
          name: `${student.firstName} ${student.lastName}`,
          email: student.email
        })));
      }

      if (examMaterialsData.success) {
        setExamMaterials(examMaterialsData.data);
      }

    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter permissions
  useEffect(() => {
    let filtered = permissions;

    if (searchTerm) {
      filtered = filtered.filter(permission =>
        permission.teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        permission.examMaterial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        permission.permissionType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterTeacher) {
      filtered = filtered.filter(permission => permission.teacher._id === filterTeacher);
    }

    if (filterExamMaterial) {
      filtered = filtered.filter(permission => permission.examMaterial._id === filterExamMaterial);
    }

    if (filterPermissionType) {
      filtered = filtered.filter(permission => permission.permissionType === filterPermissionType);
    }

    setFilteredPermissions(filtered);
  }, [permissions, searchTerm, filterTeacher, filterExamMaterial, filterPermissionType]);

  const handleCreatePermission = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return;

      const response = await fetch('/api/teacher-permissions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        await loadData(); // Reload data
        setShowModal(false);
        setFormData({
          teacherId: '',
          examMaterialId: '',
          permissionType: 'view',
          expiresAt: '',
          notes: ''
        });
        setIsCreating(false);
      } else {
        console.error('Error creating permission:', data.message);
      }
    } catch (error) {
      console.error('Error creating permission:', error);
    }
  };

  const handleUpdatePermission = async () => {
    if (!selectedPermission) return;

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return;

      const response = await fetch(`/api/teacher-permissions/${selectedPermission._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        await loadData(); // Reload data
        setShowModal(false);
        setSelectedPermission(null);
        setFormData({
          teacherId: '',
          examMaterialId: '',
          permissionType: 'view',
          expiresAt: '',
          notes: ''
        });
        setIsCreating(false);
      } else {
        console.error('Error updating permission:', data.message);
      }
    } catch (error) {
      console.error('Error updating permission:', error);
    }
  };

  const handleDeletePermission = async (permissionId: string) => {
    if (!confirm('Είστε σίγουροι ότι θέλετε να αφαιρέσετε αυτή την άδεια;')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return;

      const response = await fetch(`/api/teacher-permissions/${permissionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        await loadData(); // Reload data
      } else {
        console.error('Error deleting permission:', data.message);
      }
    } catch (error) {
      console.error('Error deleting permission:', error);
    }
  };

  const openCreateModal = () => {
    setFormData({
      teacherId: '',
      examMaterialId: '',
      permissionType: 'view',
      expiresAt: '',
      notes: ''
    });
    setIsCreating(true);
    setSelectedPermission(null);
    setShowModal(true);
  };

  const openEditModal = (permission: TeacherPermission) => {
    setFormData({
      teacherId: permission.teacher._id,
      examMaterialId: permission.examMaterial._id,
      permissionType: permission.permissionType,
      expiresAt: permission.expiresAt ? new Date(permission.expiresAt).toISOString().split('T')[0] : '',
      notes: permission.notes || ''
    });
    setIsCreating(false);
    setSelectedPermission(permission);
    setShowModal(true);
  };

  const getPermissionTypeText = (type: string) => {
    switch (type) {
      case 'view': return 'Προβολή';
      case 'download': return 'Download';
      case 'manage': return 'Διαχείριση';
      case 'full': return 'Πλήρης Πρόσβαση';
      default: return 'Άγνωστο';
    }
  };

  const getPermissionTypeColor = (type: string) => {
    switch (type) {
      case 'view': return 'text-blue-600 bg-blue-50';
      case 'download': return 'text-green-600 bg-green-50';
      case 'manage': return 'text-orange-600 bg-orange-50';
      case 'full': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Διαχείριση Αδειών Καθηγητών</h2>
          <p className="text-gray-600">Διαχείριση προσβάσεων καθηγητών στα υλικά εξετάσεων</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#E7B109] text-white rounded-lg hover:bg-[#D97706] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Νέα Άδεια
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Αναζήτηση</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Αναζήτηση..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Καθηγητής</label>
            <select
              value={filterTeacher}
              onChange={(e) => setFilterTeacher(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
            >
              <option value="">Όλοι οι καθηγητές</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Υλικό Εξέτασης</label>
            <select
              value={filterExamMaterial}
              onChange={(e) => setFilterExamMaterial(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
            >
              <option value="">Όλα τα υλικά</option>
              {examMaterials.map((material) => (
                <option key={material._id} value={material._id}>
                  {material.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Τύπος Άδειας</label>
            <select
              value={filterPermissionType}
              onChange={(e) => setFilterPermissionType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
            >
              <option value="">Όλοι οι τύποι</option>
              <option value="view">Προβολή</option>
              <option value="download">Download</option>
              <option value="manage">Διαχείριση</option>
              <option value="full">Πλήρης Πρόσβαση</option>
            </select>
          </div>
        </div>
      </div>

      {/* Permissions List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Καθηγητής
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Υλικό Εξέτασης
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Τύπος Άδειας
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Κατάσταση
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Λήγει
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ενέργειες
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPermissions.map((permission) => (
                <tr key={permission._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {permission.teacher.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {permission.teacher.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {permission.examMaterial.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {permission.examMaterial.subject} - {permission.examMaterial.grade}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPermissionTypeColor(permission.permissionType)}`}>
                      {getPermissionTypeText(permission.permissionType)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {permission.isActive ? (
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500 mr-2" />
                      )}
                      <span className={`text-sm ${permission.isActive ? 'text-green-600' : 'text-red-600'}`}>
                        {permission.isActive ? 'Ενεργή' : 'Ανενεργή'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {permission.expiresAt ? (
                      <div className="flex items-center">
                        {isExpired(permission.expiresAt) ? (
                          <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                        ) : (
                          <Clock className="w-4 h-4 text-yellow-500 mr-2" />
                        )}
                        <span className={`text-sm ${isExpired(permission.expiresAt) ? 'text-red-600' : 'text-gray-600'}`}>
                          {new Date(permission.expiresAt).toLocaleDateString('el-GR')}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Δεν λήγει</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(permission)}
                        className="text-[#E7B109] hover:text-[#D97706]"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePermission(permission._id)}
                        className="text-red-600 hover:text-red-900"
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
      </div>

      {/* Modal for creating/editing permissions */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {isCreating ? 'Νέα Άδεια' : 'Επεξεργασία Άδειας'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Καθηγητής</label>
                <select
                  value={formData.teacherId}
                  onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                >
                  <option value="">Επιλέξτε καθηγητή</option>
                  {teachers.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Υλικό Εξέτασης</label>
                <select
                  value={formData.examMaterialId}
                  onChange={(e) => setFormData({ ...formData, examMaterialId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                >
                  <option value="">Επιλέξτε υλικό</option>
                  {examMaterials.map((material) => (
                    <option key={material._id} value={material._id}>
                      {material.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Τύπος Άδειας</label>
                <select
                  value={formData.permissionType}
                  onChange={(e) => setFormData({ ...formData, permissionType: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                >
                  <option value="view">Προβολή</option>
                  <option value="download">Download</option>
                  <option value="manage">Διαχείριση</option>
                  <option value="full">Πλήρης Πρόσβαση</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ημερομηνία Λήξης</label>
                <input
                  type="date"
                  value={formData.expiresAt}
                  onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Σημειώσεις</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                  placeholder="Προαιρετικές σημειώσεις..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Ακύρωση
              </button>
              <button
                onClick={isCreating ? handleCreatePermission : handleUpdatePermission}
                className="px-4 py-2 bg-[#E7B109] text-white rounded-lg hover:bg-[#D97706] transition-colors"
              >
                {isCreating ? 'Δημιουργία' : 'Ενημέρωση'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
