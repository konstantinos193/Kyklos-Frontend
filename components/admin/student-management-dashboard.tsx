"use client";

import { useState, useEffect } from 'react';
import { adminAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
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
  Copy
} from 'lucide-react';

interface Student {
  id: string;
  studentId: string;
  name: string;
  firstName: string;
  lastName: string;
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
  accessLevel: 'basic' | 'premium' | 'vip';
  examAccess: string[];
  createdBy: string;
  notes: string;
}

interface StudentStats {
  total: number;
  active: number;
  inactive: number;
  newThisMonth: number;
  averageProgress: number;
}

export default function StudentManagementDashboard() {
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterGrade, setFilterGrade] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [generatedKeys, setGeneratedKeys] = useState<string[]>([]);
  const [generatingKeys, setGeneratingKeys] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    grade: '',
    school: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    subjects: [] as string[],
    notes: ''
  });
  const [addingStudent, setAddingStudent] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showSubjectAccessModal, setShowSubjectAccessModal] = useState(false);
  const [selectedStudentForAccess, setSelectedStudentForAccess] = useState<Student | null>(null);
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([]);
  const [studentSubjectAccess, setStudentSubjectAccess] = useState<string[]>([]);
  const [updatingAccess, setUpdatingAccess] = useState(false);
  const [showBulkAccessModal, setShowBulkAccessModal] = useState(false);
  const [selectedStudentsForBulk, setSelectedStudentsForBulk] = useState<string[]>([]);
  const [bulkSubjectAccess, setBulkSubjectAccess] = useState<string[]>([]);
  const [updatingBulkAccess, setUpdatingBulkAccess] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'email' | 'enrollmentDate' | 'status'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [stats, setStats] = useState<StudentStats>({
    total: 0,
    active: 0,
    inactive: 0,
    newThisMonth: 0,
    averageProgress: 0
  });

  // Load students from API
  useEffect(() => {
    loadStudents();
    loadAvailableSubjects();
  }, []);

  const loadAvailableSubjects = async () => {
    try {
      // Match the subjects from curriculum page
      const subjects = [
        'Μαθηματικά',
        'Φυσική',
        'Χημεία',
        'Βιολογία',
        'Άλγεβρα',
        'Γεωμετρία',
        'Αρχαία',
        'Έκθεση - Λογοτεχνία',
        'Ιστορία',
        'Λατινικά',
        'ΑΟΘ / Οικονομικά',
        'Πληροφορική'
      ];
      setAvailableSubjects(subjects);
    } catch (error) {
      console.error('Error loading subjects:', error);
    }
  };

  const loadStudents = async () => {
    try {
      setIsLoading(true);
      
      const response = await adminAPI.getStudents();

      if (response.success) {
        // Transform API data to match component interface
        const students: Student[] = response.data.students.map((student: any) => ({
          id: student._id,
          studentId: student.uniqueKey,
          name: `${student.firstName} ${student.lastName}`,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          phone: student.phone,
          grade: student.grade,
          subjects: student.subjects || [],
          enrollmentDate: new Date(student.registrationDate).toLocaleDateString('el-GR'),
          lastActivity: student.lastLogin ? new Date(student.lastLogin).toLocaleDateString('el-GR') : 'Ποτέ',
          status: student.status || 'active',
          progress: 0, // Not available in current API
          totalHours: 0, // Not available in current API
          nextClass: 'Δεν έχει προγραμματιστεί', // Not available in current API
          accessLevel: 'basic', // Not available in current API
          examAccess: [], // Not available in current API
          createdBy: 'admin', // Not available in current API
          notes: student.notes || ''
        }));

        setStudents(students);
        setFilteredStudents(students);
        
        // Calculate stats
        const activeStudents = students.filter(s => s.status === 'active').length;
        const inactiveStudents = students.filter(s => s.status === 'inactive').length;
        const newThisMonth = students.filter(s => {
          const enrollmentDate = new Date(s.enrollmentDate);
          const now = new Date();
          const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return enrollmentDate >= thirtyDaysAgo;
        }).length;

        setStats({
          total: students.length,
          active: activeStudents,
          inactive: inactiveStudents,
          newThisMonth: newThisMonth,
          averageProgress: 0 // Not available in current API
        });
      } else {
        console.error('Error loading students:', response.message);
        // Set empty data on error
        setStudents([]);
        setFilteredStudents([]);
        setStats({
          total: 0,
          active: 0,
          inactive: 0,
          newThisMonth: 0,
          averageProgress: 0
        });
      }
    } catch (error) {
      console.error('Error loading students:', error);
      // Set empty data on error
      setStudents([]);
      setFilteredStudents([]);
      setStats({
        total: 0,
        active: 0,
        inactive: 0,
        newThisMonth: 0,
        averageProgress: 0
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateStudentIds = async () => {
    try {
      setGeneratingKeys(true);
      const response = await adminAPI.generateStudentKeys(5);

      if (response.success) {
        setGeneratedKeys(response.data.previewKeys);
        setShowKeyModal(true);
      } else {
        console.error('Error generating student IDs:', response.message);
        toast({
          title: "Σφάλμα",
          description: `Σφάλμα κατά τη δημιουργία κωδικών μαθητών: ${response.message}`,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error generating student IDs:', error);
      toast({
        title: "Σφάλμα",
        description: "Σφάλμα κατά τη σύνδεση με τον διακομιστή",
        variant: "destructive"
      });
    } finally {
      setGeneratingKeys(false);
    }
  };

  const copyKeyToClipboard = async (key: string) => {
    try {
      await navigator.clipboard.writeText(key);
      toast({
        title: "Επιτυχία",
        description: "Κωδικός αντιγράφηκε στο clipboard!",
      });
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = key;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      toast({
        title: "Επιτυχία",
        description: "Κωδικός αντιγράφηκε στο clipboard!",
      });
    }
  };

  const copyAllKeysToClipboard = async () => {
    try {
      const allKeys = generatedKeys.join('\n');
      await navigator.clipboard.writeText(allKeys);
      toast({
        title: "Επιτυχία",
        description: "Όλοι οι κωδικοί αντιγράφηκαν στο clipboard!",
      });
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      const textArea = document.createElement('textarea');
      textArea.value = generatedKeys.join('\n');
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      toast({
        title: "Επιτυχία",
        description: "Όλοι οι κωδικοί αντιγράφηκαν στο clipboard!",
      });
    }
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields individually
    const errors: Record<string, string> = {};
    
    if (!newStudent.firstName?.trim()) {
      errors.firstName = 'Υποχρεωτικό πεδίο';
    }
    if (!newStudent.lastName?.trim()) {
      errors.lastName = 'Υποχρεωτικό πεδίο';
    }
    if (!newStudent.email?.trim()) {
      errors.email = 'Υποχρεωτικό πεδίο';
    }
    if (!newStudent.phone?.trim()) {
      errors.phone = 'Υποχρεωτικό πεδίο';
    }
    if (!newStudent.grade?.trim()) {
      errors.grade = 'Υποχρεωτικό πεδίο';
    }
    if (!newStudent.school?.trim()) {
      errors.school = 'Υποχρεωτικό πεδίο';
    }
    if (!newStudent.parentName?.trim()) {
      errors.parentName = 'Υποχρεωτικό πεδίο';
    }
    if (!newStudent.parentPhone?.trim()) {
      errors.parentPhone = 'Υποχρεωτικό πεδίο';
    }
    
    // Set errors and scroll to first error
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      // Scroll to first error field
      const firstErrorField = Object.keys(errors)[0];
      const element = document.querySelector(`[data-field="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    // Clear errors if validation passes
    setFieldErrors({});
    
    // Validate phone numbers have at least some digits
    const phoneDigits = (newStudent.phone || '').replace(/\D/g, '');
    const parentPhoneDigits = (newStudent.parentPhone || '').replace(/\D/g, '');
    
    if (!phoneDigits || phoneDigits.length === 0) {
      toast({
        title: "Επικύρωση",
        description: "Παρακαλώ εισαγάγετε έγκυρο τηλέφωνο (10 ψηφία)",
        variant: "destructive"
      });
      return;
    }
    
    if (!parentPhoneDigits || parentPhoneDigits.length === 0) {
      toast({
        title: "Επικύρωση",
        description: "Παρακαλώ εισαγάγετε έγκυρο τηλέφωνο γονέα (10 ψηφία)",
        variant: "destructive"
      });
      return;
    }

    // Normalize phone numbers - Greek tutoring center, always extract 10 digits
    const normalizePhone = (phone: string) => {
      if (!phone || phone.trim() === '') {
        return '';
      }
      
      // Extract only digits (removes +30, 0030, spaces, dashes, letters, etc.)
      const digitsOnly = phone.replace(/\D/g, '');
      
      // If no digits found, return empty string (will fail validation)
      if (digitsOnly.length === 0) {
        return '';
      }
      
      // For Greek numbers, extract exactly 10 digits
      // If starts with 30 (country code), remove it
      if (digitsOnly.length >= 12 && digitsOnly.startsWith('30')) {
        return digitsOnly.slice(2, 12); // Remove '30', take next 10 digits
      }
      // If more than 10 digits, take last 10 (handles cases like 485656115156)
      else if (digitsOnly.length > 10) {
        return digitsOnly.slice(-10); // Take last 10 digits
      }
      // If exactly 10 digits, perfect!
      else if (digitsOnly.length === 10) {
        return digitsOnly;
      }
      // If less than 10, return the digits (will fail backend validation with clear message)
      else {
        return digitsOnly;
      }
    };

    // Normalize phone numbers before sending
    const normalizedPhone = normalizePhone(newStudent.phone || '');
    const normalizedParentPhone = normalizePhone(newStudent.parentPhone || '');
    
    const studentData = {
      ...newStudent,
      phone: normalizedPhone,
      parentPhone: normalizedParentPhone,
      // Remove parentEmail if empty
      parentEmail: newStudent.parentEmail?.trim() || undefined
    };

    // Remove debug logging in production
    // console.log('Sending student data:', JSON.stringify(studentData, null, 2));

    try {
      setAddingStudent(true);
      const response = await adminAPI.createStudent(studentData);
      
      if (response.success) {
        toast({
          title: "Επιτυχία!",
          description: "Μαθητής προστέθηκε επιτυχώς!",
          variant: "success",
        });
        setShowAddStudentModal(false);
        setFieldErrors({});
        setNewStudent({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          grade: '',
          school: '',
          parentName: '',
          parentPhone: '',
          parentEmail: '',
          subjects: [],
          notes: ''
        });
        loadStudents(); // Reload the list
      } else {
        // Show detailed error messages from backend
        const errorMsg = response.errors 
          ? response.errors.map((err: any) => `${err.param || 'Field'}: ${err.msg || err.message}`).join(', ')
          : response.message || 'Σφάλμα κατά την προσθήκη μαθητή';
        toast({
          title: "Σφάλμα",
          description: `Σφάλμα κατά την προσθήκη μαθητή: ${errorMsg}`,
          variant: "destructive"
        });
      }
    } catch (error: any) {
      // Show backend validation errors if available
      if (error.response?.data) {
        const errorData = error.response.data;
        let errorMsg = '';
        
        if (errorData.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
          // Format validation errors
          errorMsg = errorData.errors.map((err: any) => {
            // Map field names to Greek
            const fieldNames: Record<string, string> = {
              'phone': 'Τηλέφωνο',
              'parentPhone': 'Τηλέφωνο Γονέα',
              'email': 'Email',
              'parentEmail': 'Email Γονέα',
              'firstName': 'Όνομα',
              'lastName': 'Επώνυμο',
              'grade': 'Τάξη',
              'school': 'Σχολείο',
              'parentName': 'Όνομα Γονέα'
            };
            const fieldName = fieldNames[err.path || err.param || err.field] || err.path || err.param || err.field || 'Πεδίο';
            const message = err.msg || err.message || 'Σφάλμα επικύρωσης';
            return `${fieldName}: ${message}`;
          }).join('\n');
        } else {
          errorMsg = errorData.message || 'Σφάλμα κατά την προσθήκη μαθητή';
        }
        
        toast({
          title: "Σφάλμα",
          description: `Σφάλμα κατά την προσθήκη μαθητή: ${errorMsg}`,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Σφάλμα",
          description: `Σφάλμα κατά την προσθήκη μαθητή: ${error.message || 'Δεν ήταν δυνατή η σύνδεση με τον διακομιστή'}`,
          variant: "destructive"
        });
      }
    } finally {
      setAddingStudent(false);
    }
  };

  const handleOpenSubjectAccess = (student: Student) => {
    setSelectedStudentForAccess(student);
    setStudentSubjectAccess(student.subjects || []);
    setShowSubjectAccessModal(true);
  };

  const handleUpdateSubjectAccess = async () => {
    if (!selectedStudentForAccess) return;

    try {
      setUpdatingAccess(true);
      
      // Update student's subject access
      const response = await adminAPI.updateStudent(selectedStudentForAccess.id, {
        subjects: studentSubjectAccess
      });

      if (response.success) {
        toast({
          title: "Επιτυχία!",
          description: "Πρόσβαση στα μαθήματα ενημερώθηκε επιτυχώς!",
        });
        setShowSubjectAccessModal(false);
        loadStudents(); // Reload the list
      } else {
        toast({
          title: "Σφάλμα",
          description: `Σφάλμα κατά την ενημέρωση πρόσβασης: ${response.message}`,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error updating subject access:', error);
      toast({
        title: "Σφάλμα",
        description: "Σφάλμα κατά την ενημέρωση πρόσβασης",
        variant: "destructive"
      });
    } finally {
      setUpdatingAccess(false);
    }
  };

  const toggleSubjectAccess = (subject: string) => {
    setStudentSubjectAccess(prev => {
      if (prev.includes(subject)) {
        return prev.filter(s => s !== subject);
      } else {
        return [...prev, subject];
      }
    });
  };

  const selectAllSubjects = () => {
    setStudentSubjectAccess([...availableSubjects]);
  };

  const clearAllSubjects = () => {
    setStudentSubjectAccess([]);
  };

  const handleOpenBulkAccess = () => {
    setSelectedStudentsForBulk([]);
    setBulkSubjectAccess([]);
    setShowBulkAccessModal(true);
  };

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudentsForBulk(prev => {
      if (prev.includes(studentId)) {
        return prev.filter(id => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };

  const selectAllStudents = () => {
    setSelectedStudentsForBulk(students.map(s => s.id));
  };

  const clearStudentSelection = () => {
    setSelectedStudentsForBulk([]);
  };

  const toggleBulkSubjectAccess = (subject: string) => {
    setBulkSubjectAccess(prev => {
      if (prev.includes(subject)) {
        return prev.filter(s => s !== subject);
      } else {
        return [...prev, subject];
      }
    });
  };

  const selectAllBulkSubjects = () => {
    setBulkSubjectAccess([...availableSubjects]);
  };

  const clearAllBulkSubjects = () => {
    setBulkSubjectAccess([]);
  };

  const handleUpdateBulkAccess = async () => {
    if (selectedStudentsForBulk.length === 0) {
      toast({
        title: "Επικύρωση",
        description: "Παρακαλώ επιλέξτε τουλάχιστον έναν μαθητή",
        variant: "destructive"
      });
      return;
    }

    if (bulkSubjectAccess.length === 0) {
      toast({
        title: "Επικύρωση",
        description: "Παρακαλώ επιλέξτε τουλάχιστον ένα μάθημα",
        variant: "destructive"
      });
      return;
    }

    try {
      setUpdatingBulkAccess(true);
      
      // Update all selected students' subject access
      const updatePromises = selectedStudentsForBulk.map(studentId => 
        adminAPI.updateStudent(studentId, {
          subjects: bulkSubjectAccess
        })
      );

      const results = await Promise.all(updatePromises);
      const successCount = results.filter(r => r.success).length;

      toast({
        title: "Επιτυχία!",
        description: `Ενημερώθηκαν ${successCount} από ${selectedStudentsForBulk.length} μαθητές επιτυχώς!`,
      });
      setShowBulkAccessModal(false);
      loadStudents(); // Reload the list
    } catch (error) {
      console.error('Error updating bulk access:', error);
      toast({
        title: "Σφάλμα",
        description: "Σφάλμα κατά την ενημέρωση μαζικής πρόσβασης",
        variant: "destructive"
      });
    } finally {
      setUpdatingBulkAccess(false);
    }
  };

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
      {/* Simple Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Μαθητές</h2>
          <p className="text-gray-600">Διαχείριση μαθητών και πρόσβασης σε εξετάσεις</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowAddStudentModal(true)}
            className="bg-[#E7B109] text-white px-4 py-2 rounded-lg hover:bg-[#D97706] transition-colors"
          >
            + Προσθήκη Μαθητή
          </button>
        </div>
      </div>

      {/* Simple Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Συνολικοί Μαθητές</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          <div className="text-sm text-gray-600">Ενεργοί</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-blue-600">{stats.newThisMonth}</div>
          <div className="text-sm text-gray-600">Νέοι</div>
        </div>
      </div>

      {/* Simple Search */}
      <div className="bg-white p-4 rounded-lg border">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Αναζήτηση μαθητών..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
          />
          <select
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
          >
            <option value="all">Όλες οι τάξεις</option>
            <option value="Α' Λυκείου">Α' Λυκείου</option>
            <option value="Β' Λυκείου">Β' Λυκείου</option>
            <option value="Γ' Λυκείου">Γ' Λυκείου</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
          >
            <option value="all">Όλες οι καταστάσεις</option>
            <option value="active">Ενεργός</option>
            <option value="inactive">Ανενεργός</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="px-4 py-3 border-b bg-gray-50">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">Μαθητές ({filteredStudents.length})</h3>
            <button 
              onClick={handleOpenBulkAccess}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Μαζική Πρόσβαση
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Κωδικός</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Όνομα</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Τάξη</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Μαθήματα</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Κατάσταση</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ενέργειες</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                        {student.studentId}
                      </div>
                      <button
                        onClick={() => copyKeyToClipboard(student.studentId)}
                        className="p-1.5 text-gray-500 hover:text-[#E7B109] hover:bg-gray-100 rounded transition-colors"
                        title="Αντιγραφή κωδικού"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.grade}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {(student.subjects || []).slice(0, 2).map((subject, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {subject}
                        </span>
                      ))}
                      {(student.subjects || []).length > 2 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          +{(student.subjects || []).length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                      {getStatusText(student.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenSubjectAccess(student)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                        title="Διαχείριση Μαθημάτων"
                      >
                        Μαθήματα
                      </button>
                      <button
                        onClick={() => {
                          setSelectedStudent(student);
                          setShowModal(true);
                        }}
                        className="text-gray-600 hover:text-gray-800 text-sm"
                        title="Λεπτομέρειες"
                      >
                        Προβολή
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-500 mb-4">Δεν βρέθηκαν μαθητές</div>
            <button 
              onClick={() => setShowAddStudentModal(true)}
              className="bg-[#E7B109] text-white px-4 py-2 rounded-lg hover:bg-[#D97706] transition-colors"
            >
              Προσθήκη Πρώτου Μαθητή
            </button>
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
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Κωδικός Μαθητή</h4>
                    <p className="text-lg font-mono font-medium text-gray-900 bg-gray-100 px-3 py-2 rounded">
                      {selectedStudent.studentId}
                    </p>
                  </div>
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
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Επίπεδο Πρόσβασης</h4>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      selectedStudent.accessLevel === 'basic' ? 'text-blue-600 bg-blue-100' :
                      selectedStudent.accessLevel === 'premium' ? 'text-purple-600 bg-purple-100' :
                      'text-yellow-600 bg-yellow-100'
                    }`}>
                      {selectedStudent.accessLevel === 'basic' ? 'Βασικό' :
                       selectedStudent.accessLevel === 'premium' ? 'Premium' : 'VIP'}
                    </span>
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

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Πρόσβαση σε Υλικά Εξετάσεων</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudent.examAccess.map((access, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                      >
                        {access}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Σημειώσεις</h4>
                  <p className="text-lg text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {selectedStudent.notes || 'Δεν υπάρχουν σημειώσεις'}
                  </p>
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

      {/* Key Generation Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Δημιουργημένοι Κωδικοί Μαθητών</h3>
                <button
                  onClick={() => setShowKeyModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Κλείσιμο</span>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-800">Οδηγίες Χρήσης</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Αυτοί οι κωδικοί μπορούν να χρησιμοποιηθούν για την εγγραφή νέων μαθητών. 
                    Κάθε κωδικός είναι μοναδικός και μπορεί να χρησιμοποιηθεί μόνο μία φορά.
                  </p>
                </div>

                <div className="space-y-3">
                  {generatedKeys.map((key, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                        <code className="font-mono text-lg font-bold text-gray-900 bg-white px-3 py-1 rounded border">
                          {key}
                        </code>
                      </div>
                      <button
                        onClick={() => copyKeyToClipboard(key)}
                        className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Αντιγραφή
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={copyAllKeysToClipboard}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Αντιγραφή Όλων
                  </button>
                  <button
                    onClick={() => setShowKeyModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Κλείσιμο
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddStudentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Προσθήκη Νέου Μαθητή</h3>
                <button
                  onClick={() => setShowAddStudentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Κλείσιμο</span>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleAddStudent} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Όνομα *</label>
                    <input
                      type="text"
                      data-field="firstName"
                      value={newStudent.firstName}
                      onChange={(e) => {
                        setNewStudent({...newStudent, firstName: e.target.value});
                        if (fieldErrors.firstName) {
                          setFieldErrors({...fieldErrors, firstName: ''});
                        }
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent ${
                        fieldErrors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {fieldErrors.firstName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Επώνυμο *</label>
                    <input
                      type="text"
                      data-field="lastName"
                      value={newStudent.lastName}
                      onChange={(e) => {
                        setNewStudent({...newStudent, lastName: e.target.value});
                        if (fieldErrors.lastName) {
                          setFieldErrors({...fieldErrors, lastName: ''});
                        }
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent ${
                        fieldErrors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {fieldErrors.lastName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      data-field="email"
                      value={newStudent.email}
                      onChange={(e) => {
                        setNewStudent({...newStudent, email: e.target.value});
                        if (fieldErrors.email) {
                          setFieldErrors({...fieldErrors, email: ''});
                        }
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent ${
                        fieldErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {fieldErrors.email && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Τηλέφωνο *</label>
                    <input
                      type="tel"
                      data-field="phone"
                      value={newStudent.phone}
                      onChange={(e) => {
                        // Only allow digits, spaces, +, and dashes - filter out letters
                        const value = e.target.value.replace(/[^\d\s+\-]/g, '');
                        setNewStudent({...newStudent, phone: value});
                        if (fieldErrors.phone) {
                          setFieldErrors({...fieldErrors, phone: ''});
                        }
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent ${
                        fieldErrors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="π.χ. 6900000000"
                      maxLength={15}
                    />
                    {fieldErrors.phone && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.phone}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">Απλά πληκτρολογήστε τον αριθμό (10 ψηφία)</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Τάξη *</label>
                    <select
                      data-field="grade"
                      value={newStudent.grade}
                      onChange={(e) => {
                        setNewStudent({...newStudent, grade: e.target.value});
                        if (fieldErrors.grade) {
                          setFieldErrors({...fieldErrors, grade: ''});
                        }
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent ${
                        fieldErrors.grade ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Επιλέξτε τάξη</option>
                      <option value="Α Λυκείου">Α' Λυκείου</option>
                      <option value="Β Λυκείου">Β' Λυκείου</option>
                      <option value="Γ Λυκείου">Γ' Λυκείου</option>
                      <option value="Α Γυμνασίου">Α' Γυμνασίου</option>
                      <option value="Β Γυμνασίου">Β' Γυμνασίου</option>
                      <option value="Γ Γυμνασίου">Γ' Γυμνασίου</option>
                    </select>
                    {fieldErrors.grade && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.grade}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Σχολείο *</label>
                    <input
                      type="text"
                      data-field="school"
                      value={newStudent.school}
                      onChange={(e) => {
                        setNewStudent({...newStudent, school: e.target.value});
                        if (fieldErrors.school) {
                          setFieldErrors({...fieldErrors, school: ''});
                        }
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent ${
                        fieldErrors.school ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {fieldErrors.school && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.school}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Όνομα Γονέα *</label>
                    <input
                      type="text"
                      data-field="parentName"
                      value={newStudent.parentName}
                      onChange={(e) => {
                        setNewStudent({...newStudent, parentName: e.target.value});
                        if (fieldErrors.parentName) {
                          setFieldErrors({...fieldErrors, parentName: ''});
                        }
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent ${
                        fieldErrors.parentName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {fieldErrors.parentName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.parentName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Τηλέφωνο Γονέα *</label>
                    <input
                      type="tel"
                      data-field="parentPhone"
                      value={newStudent.parentPhone}
                      onChange={(e) => {
                        // Only allow digits, spaces, +, and dashes
                        const value = e.target.value.replace(/[^\d\s+\-]/g, '');
                        setNewStudent({...newStudent, parentPhone: value});
                        if (fieldErrors.parentPhone) {
                          setFieldErrors({...fieldErrors, parentPhone: ''});
                        }
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent ${
                        fieldErrors.parentPhone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="π.χ. 6900000000"
                      maxLength={15}
                    />
                    {fieldErrors.parentPhone && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.parentPhone}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">Απλά πληκτρολογήστε τον αριθμό (10 ψηφία)</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Γονέα (προαιρετικό)</label>
                    <input
                      type="email"
                      value={newStudent.parentEmail || ''}
                      onChange={(e) => setNewStudent({...newStudent, parentEmail: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                      placeholder="parent@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Μαθήματα (προαιρετικό)</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {[
                      'Μαθηματικά',
                      'Φυσική',
                      'Χημεία',
                      'Βιολογία',
                      'Άλγεβρα',
                      'Γεωμετρία',
                      'Αρχαία',
                      'Έκθεση - Λογοτεχνία',
                      'Ιστορία',
                      'Λατινικά',
                      'ΑΟΘ / Οικονομικά',
                      'Πληροφορική'
                    ].map((subject) => (
                      <label key={subject} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newStudent.subjects.includes(subject)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewStudent({
                                ...newStudent,
                                subjects: [...newStudent.subjects, subject]
                              });
                            } else {
                              setNewStudent({
                                ...newStudent,
                                subjects: newStudent.subjects.filter(s => s !== subject)
                              });
                            }
                          }}
                          className="w-4 h-4 text-[#E7B109] border-gray-300 rounded focus:ring-[#E7B109]"
                        />
                        <span className="text-sm text-gray-700">{subject}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Σημειώσεις</label>
                  <textarea
                    value={newStudent.notes}
                    onChange={(e) => setNewStudent({...newStudent, notes: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent h-20"
                    placeholder="Προαιρετικές σημειώσεις..."
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddStudentModal(false);
                      setFieldErrors({});
                    }}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Ακύρωση
                  </button>
                  <button
                    type="submit"
                    disabled={addingStudent}
                    className="px-6 py-2 bg-[#E7B109] text-white rounded-lg hover:bg-[#D97706] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {addingStudent ? 'Προσθήκη...' : 'Προσθήκη Μαθητή'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Subject Access Management Modal */}
      {showSubjectAccessModal && selectedStudentForAccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Διαχείριση Πρόσβασης Μαθημάτων</h3>
                  <p className="text-sm text-gray-600">
                    Μαθητής: <span className="font-medium">{selectedStudentForAccess.name}</span>
                  </p>
                </div>
                <button
                  onClick={() => setShowSubjectAccessModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Κλείσιμο</span>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={selectAllSubjects}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Επιλογή Όλων
                  </button>
                  <button
                    onClick={clearAllSubjects}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Αφαίρεση Όλων
                  </button>
                  <div className="flex-1"></div>
                  <div className="text-sm text-gray-600 flex items-center">
                    Επιλεγμένα: <span className="font-medium ml-1">{studentSubjectAccess.length}</span> / {availableSubjects.length}
                  </div>
                </div>

                {/* Subjects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {availableSubjects.map((subject) => (
                    <div
                      key={subject}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        studentSubjectAccess.includes(subject)
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                      onClick={() => toggleSubjectAccess(subject)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{subject}</span>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          studentSubjectAccess.includes(subject)
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {studentSubjectAccess.includes(subject) && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Current Access Summary */}
                {studentSubjectAccess.length > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2">Τρέχουσα Πρόσβαση:</h4>
                    <div className="flex flex-wrap gap-2">
                      {studentSubjectAccess.map((subject) => (
                        <span
                          key={subject}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    onClick={() => setShowSubjectAccessModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Ακύρωση
                  </button>
                  <button
                    onClick={handleUpdateSubjectAccess}
                    disabled={updatingAccess}
                    className="px-6 py-2 bg-[#E7B109] text-white rounded-lg hover:bg-[#D97706] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {updatingAccess ? 'Ενημέρωση...' : 'Ενημέρωση Πρόσβασης'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Access Management Modal */}
      {showBulkAccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Μαζική Διαχείριση Πρόσβασης Μαθημάτων</h3>
                  <p className="text-sm text-gray-600">
                    Επιλέξτε μαθητές και μαθήματα για μαζική ενημέρωση πρόσβασης
                  </p>
                </div>
                <button
                  onClick={() => setShowBulkAccessModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Κλείσιμο</span>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Students Selection */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-gray-900">Επιλογή Μαθητών</h4>
                    <div className="flex gap-2">
                      <button
                        onClick={selectAllStudents}
                        className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        Όλοι
                      </button>
                      <button
                        onClick={clearStudentSelection}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                      >
                        Καθαρισμός
                      </button>
                    </div>
                  </div>
                  
                  <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
                    {filteredStudents.map((student) => (
                      <div
                        key={student.id}
                        className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                          selectedStudentsForBulk.includes(student.id)
                            ? 'bg-blue-50 border-blue-200'
                            : ''
                        }`}
                        onClick={() => toggleStudentSelection(student.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.grade} - {student.email}</p>
                          </div>
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            selectedStudentsForBulk.includes(student.id)
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300'
                          }`}>
                            {selectedStudentsForBulk.includes(student.id) && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    Επιλεγμένοι: <span className="font-medium">{selectedStudentsForBulk.length}</span> / {filteredStudents.length}
                  </div>
                </div>

                {/* Subjects Selection */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-gray-900">Επιλογή Μαθημάτων</h4>
                    <div className="flex gap-2">
                      <button
                        onClick={selectAllBulkSubjects}
                        className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        Όλα
                      </button>
                      <button
                        onClick={clearAllBulkSubjects}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                      >
                        Καθαρισμός
                      </button>
                    </div>
                  </div>
                  
                  <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-1 gap-2 p-3">
                      {availableSubjects.map((subject) => (
                        <div
                          key={subject}
                          className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                            bulkSubjectAccess.includes(subject)
                              ? 'border-blue-500 bg-blue-50 text-blue-900'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                          }`}
                          onClick={() => toggleBulkSubjectAccess(subject)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{subject}</span>
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              bulkSubjectAccess.includes(subject)
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-300'
                            }`}>
                              {bulkSubjectAccess.includes(subject) && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    Επιλεγμένα: <span className="font-medium">{bulkSubjectAccess.length}</span> / {availableSubjects.length}
                  </div>
                </div>
              </div>

              {/* Summary */}
              {(selectedStudentsForBulk.length > 0 || bulkSubjectAccess.length > 0) && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Σύνοψη Ενημέρωσης:</h4>
                  <p className="text-sm text-blue-700">
                    Θα ενημερωθούν <span className="font-medium">{selectedStudentsForBulk.length}</span> μαθητές 
                    με πρόσβαση σε <span className="font-medium">{bulkSubjectAccess.length}</span> μαθήματα
                  </p>
                  {bulkSubjectAccess.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-blue-700 mb-1">Μαθήματα:</p>
                      <div className="flex flex-wrap gap-1">
                        {bulkSubjectAccess.map((subject) => (
                          <span
                            key={subject}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t mt-6">
                <button
                  onClick={() => setShowBulkAccessModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Ακύρωση
                </button>
                <button
                  onClick={handleUpdateBulkAccess}
                  disabled={updatingBulkAccess || selectedStudentsForBulk.length === 0 || bulkSubjectAccess.length === 0}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {updatingBulkAccess ? 'Ενημέρωση...' : 'Ενημέρωση Μαζικής Πρόσβασης'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
