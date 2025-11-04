'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  BookOpen, 
  FileText, 
  Download, 
  Search, 
  Filter,
  Lock, 
  User, 
  Calendar,
  Clock,
  Award,
  Eye,
  CheckCircle
} from 'lucide-react';
import { getApiUrl } from '@/lib/api-url';

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  grade: string;
  subjects: string[];
  accessLevel: 'basic' | 'premium' | 'vip';
  lastLogin: string;
}

interface ExamMaterial {
  id: string;
  title: string;
  subject: string;
  grade: string;
  year: number;
  type: 'exam' | 'solution' | 'practice';
  accessLevel: 'basic' | 'premium' | 'vip';
  isLocked: boolean;
  description: string;
  fileSize: string;
  uploadDate: string;
  downloadCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export default function ExamMaterialsPage() {
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [examMaterials, setExamMaterials] = useState<ExamMaterial[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<ExamMaterial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if student is logged in
    const studentData = localStorage.getItem('student');
    const studentToken = localStorage.getItem('studentToken');

    if (!studentData || !studentToken) {
      router.push('/student-login?redirect=/student/exam-materials');
      return;
    }

    try {
      const parsedStudent = JSON.parse(studentData);
      setStudent(parsedStudent);
      loadExamMaterials(parsedStudent);
    } catch (error) {
      console.error('Error parsing student data:', error);
      router.push('/student-login');
    }
  }, [router]);

  const loadExamMaterials = async (studentData: Student) => {
    try {
      setIsLoading(true);
      
      const token = localStorage.getItem('studentToken');
      if (!token) {
        router.push('/student-login?redirect=/student/exam-materials');
        return;
      }

      const response = await fetch(`${getApiUrl()}/api/exam-materials`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        // Transform API data to match component interface
        const materials: ExamMaterial[] = data.data.map((material: any) => ({
          id: material._id,
          title: material.title,
          subject: material.subject,
          grade: material.grade,
          year: material.year,
          type: material.type,
          accessLevel: material.accessLevel,
          isLocked: false, // API handles access control
          description: material.description,
          fileSize: material.formattedFileSize || 'Unknown',
          uploadDate: new Date(material.createdAt).toLocaleDateString('el-GR'),
          downloadCount: material.downloadCount || 0,
          difficulty: material.metadata?.difficulty || 'medium',
          tags: material.tags || []
        }));

        setExamMaterials(materials);
        setFilteredMaterials(materials);
      } else {
        setError(data.message || 'Δεν ήταν δυνατή η φόρτωση των υλικών εξετάσεων');
      }
    } catch (error) {
      console.error('Error loading exam materials:', error);
      setError('Δεν ήταν δυνατή η σύνδεση με τον διακομιστή');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter materials based on search and filters
  useEffect(() => {
    let filtered = examMaterials;

    if (searchTerm) {
      filtered = filtered.filter(material =>
        material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filterSubject !== 'all') {
      filtered = filtered.filter(material => material.subject === filterSubject);
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(material => material.type === filterType);
    }

    if (filterYear !== 'all') {
      filtered = filtered.filter(material => material.year.toString() === filterYear);
    }

    setFilteredMaterials(filtered);
  }, [examMaterials, searchTerm, filterSubject, filterType, filterYear]);

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'basic': return 'text-blue-600 bg-blue-100';
      case 'premium': return 'text-purple-600 bg-purple-100';
      case 'vip': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAccessLevelText = (level: string) => {
    switch (level) {
      case 'basic': return 'Βασικό';
      case 'premium': return 'Premium';
      case 'vip': return 'VIP';
      default: return 'Άγνωστο';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'exam': return 'Θέματα';
      case 'solution': return 'Λύσεις';
      case 'practice': return 'Προετοιμασία';
      default: return 'Άγνωστο';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Εύκολο';
      case 'medium': return 'Μέτριο';
      case 'hard': return 'Δύσκολο';
      default: return 'Άγνωστο';
    }
  };

  // Handle material download
  const handleDownload = async (material: ExamMaterial) => {
    try {
      const token = localStorage.getItem('studentToken');
      if (!token) {
        router.push('/student-login?redirect=/student/exam-materials');
        return;
      }

      const response = await fetch(`${getApiUrl()}/api/exam-materials/download/${material.id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Create blob and download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = material.title + '.pdf'; // You might want to get the actual file extension
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        // Refresh materials to update download count
        const studentData = JSON.parse(localStorage.getItem('student') || '{}');
        loadExamMaterials(studentData);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Δεν ήταν δυνατό το download του αρχείου');
      }
    } catch (error) {
      console.error('Download error:', error);
      setError('Δεν ήταν δυνατό το download του αρχείου');
    }
  };

  const handleAccessMaterial = (material: ExamMaterial) => {
    if (material.isLocked) {
      return;
    }
    handleDownload(material);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E7B109] mx-auto mb-4"></div>
          <p className="text-gray-600">Φόρτωση υλικών εξετάσεων...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertDescription>
            Δεν έχετε πρόσβαση σε αυτή τη σελίδα. Παρακαλώ συνδεθείτε.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const subjects = [...new Set(examMaterials.map(m => m.subject))];
  const years = [...new Set(examMaterials.map(m => m.year))].sort((a, b) => b - a);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Υλικά Εξετάσεων</h1>
        <p className="text-gray-600">
          Αναζητήστε και κατεβάστε υλικά εξετάσεων για προετοιμασία
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Αναζήτηση υλικών..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={filterSubject} onValueChange={setFilterSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Όλα τα μαθήματα" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Όλα τα μαθήματα</SelectItem>
              {subjects.map(subject => (
                <SelectItem key={subject} value={subject}>{subject}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder="Όλοι οι τύποι" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Όλοι οι τύποι</SelectItem>
              <SelectItem value="exam">Θέματα</SelectItem>
              <SelectItem value="solution">Λύσεις</SelectItem>
              <SelectItem value="practice">Προετοιμασία</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterYear} onValueChange={setFilterYear}>
            <SelectTrigger>
              <SelectValue placeholder="Όλα τα έτη" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Όλα τα έτη</SelectItem>
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-600">
          Εμφανίζονται {filteredMaterials.length} από {examMaterials.length} υλικά
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Filter className="w-4 h-4" />
          <span>Φιλτραρισμένα αποτελέσματα</span>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => (
            <Card key={material.id} className={`${material.isLocked ? 'opacity-60' : 'hover:shadow-lg'} transition-all duration-200`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{material.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {material.subject} - {material.grade} ({material.year})
                    </CardDescription>
                  </div>
                  {material.isLocked && (
                    <Lock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{material.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAccessLevelColor(material.accessLevel)}`}>
                    {getAccessLevelText(material.accessLevel)}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    {getTypeText(material.type)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(material.difficulty)}`}>
                    {getDifficultyText(material.difficulty)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(material.uploadDate).toLocaleDateString('el-GR')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    {material.downloadCount}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{material.fileSize}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(material.uploadDate).toLocaleDateString('el-GR')}
                  </span>
                </div>

                <Button 
                  className="w-full" 
                  disabled={material.isLocked}
                  onClick={() => handleAccessMaterial(material)}
                >
                  {material.isLocked ? (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Κλειδωμένο
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Προβολή
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Δεν βρέθηκαν υλικά</h3>
          <p className="text-gray-500">Δοκιμάστε να αλλάξετε τα φίλτρα αναζήτησης</p>
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mt-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
