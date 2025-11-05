'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  BookOpen, 
  FileText, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Award,
  ArrowRight,
  Download,
  Search
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
  totalExams: number;
  completedExams: number;
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
}

export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [totalMaterials, setTotalMaterials] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const studentData = localStorage.getItem('student');
    const studentToken = localStorage.getItem('studentToken');

    if (!studentData || !studentToken) {
      router.push('/student-login');
      return;
    }

    try {
      const parsedStudent = JSON.parse(studentData);
      setStudent(parsedStudent);
      loadStats(parsedStudent);
    } catch (error) {
      console.error('Error parsing student data:', error);
      router.push('/student-login');
    }
  }, [router]);

  const loadStats = async (studentData: Student) => {
    try {
      setIsLoading(true);
      
      const token = localStorage.getItem('studentToken');
      if (!token) {
        router.push('/student-login');
        return;
      }

      const response = await fetch(`${getApiUrl()}/api/exam-materials?limit=1`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        setTotalMaterials(data.pagination?.total || data.data?.length || 0);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E7B109] mx-auto mb-4"></div>
          <p className="text-gray-600">Φόρτωση πίνακα μαθητή...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Καλώς ήρθατε, {student.firstName}!
        </h1>
        <p className="text-gray-600">
          Αυτός είναι ο προσωπικός σας πίνακας ελέγχου. Έχετε πρόσβαση σε όλα τα υλικά εξετάσεων που σας ανήκουν.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Συνολικά Υλικά</CardTitle>
            <FileText className="h-5 w-5 text-[#E7B109]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalMaterials}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Διαθέσιμα υλικά εξετάσεων
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Τελευταία Σύνδεση</CardTitle>
            <Clock className="h-5 w-5 text-[#CE3B49]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {student.lastLogin 
                ? new Date(student.lastLogin).toLocaleDateString('el-GR', { 
                    day: 'numeric', 
                    month: 'short',
                    year: 'numeric'
                  })
                : 'Ποτέ'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Τελευταία δραστηριότητα
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Επίπεδο Πρόσβασης</CardTitle>
            <Award className="h-5 w-5 text-[#D97706]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {getAccessLevelText(student.accessLevel)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Επίπεδο χρήστη
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Exam Materials Card */}
        <Card className="hover:shadow-xl transition-all duration-300 border-2 border-[#E7B109]/20 hover:border-[#E7B109]">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-[#E7B109] rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Υλικά Εξετάσεων</CardTitle>
                <CardDescription>
                  Πρόσβαση σε θέματα και λύσεις
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Περιήγηση, αναζήτηση και λήψη υλικών εξετάσεων σύμφωνα με το επίπεδο πρόσβασής σας.
            </p>
            <Link href="/student/exam-materials">
              <Button className="w-full bg-[#E7B109] hover:bg-[#D97706] text-white">
                <Search className="w-4 h-4 mr-2" />
                Περιήγηση Υλικών
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Quick Stats Card */}
        <Card className="hover:shadow-xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-300">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Πρόοδος</CardTitle>
                <CardDescription>
                  Στατιστικά και επιδόσεις
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Συνολικά υλικά</span>
                <span className="font-bold text-lg">{totalMaterials}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Τάξη</span>
                <span className="font-bold text-lg">{student.grade}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Επίπεδο πρόσβασης</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getAccessLevelColor(student.accessLevel)}`}>
                  {getAccessLevelText(student.accessLevel)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Τελευταία Δραστηριότητα</CardTitle>
          <CardDescription>
            Οι τελευταίες ενέργειές σας στο σύστημα
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Clock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>Δεν υπάρχει πρόσφατη δραστηριότητα</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
