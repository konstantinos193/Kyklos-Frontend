'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  BookOpen, 
  Clock, 
  TrendingUp,
  Award,
  ArrowRight,
  Target,
  BarChart3
} from 'lucide-react';
import { adminAPI } from '@/lib/api';

interface Student {
  _id?: string;
  id?: string;
  firstName: string;
  lastName: string;
  grade: string;
  subjects?: string[];
  accessLevel?: 'basic' | 'premium' | 'vip';
  lastLogin?: string;
  totalExams?: number;
  completedExams?: number;
}

interface Exercise {
  _id: string;
  title: string;
  subject: string;
  grade?: string;
  createdAt: string;
  teacherName: string;
}


export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [totalExercises, setTotalExercises] = useState(0);
  const [recentExercises, setRecentExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAuth = () => {
      // IMPORTANT: Clear any admin tokens - students shouldn't have admin access
      const adminToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
      if (adminToken) {
        console.warn('Admin token detected in student dashboard, clearing admin session');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');
        localStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('adminToken');
        sessionStorage.removeItem('adminInfo');
        sessionStorage.removeItem('adminLoggedIn');
      }

      const studentData = localStorage.getItem('student');
      const studentToken = localStorage.getItem('studentToken');

      console.log('Student dashboard auth check:', {
        hasStudentData: !!studentData,
        hasStudentToken: !!studentToken,
        studentDataPreview: studentData ? studentData.substring(0, 100) : null
      });

      if (!studentData || !studentToken) {
        console.warn('Missing student data or token in dashboard');
        // Don't redirect here - the layout will handle it
        // Just set loading to false so we don't show spinner forever
        setIsLoading(false);
        return;
      }

      try {
        const parsedStudent = JSON.parse(studentData);
        // Verify it's actually student data
        if (!parsedStudent.firstName || !parsedStudent.lastName) {
          console.error('Invalid student data structure:', parsedStudent);
          throw new Error('Invalid student data structure');
        }
        
        // Normalize student data to match interface
        const normalizedStudent: Student = {
          id: parsedStudent._id || parsedStudent.id || '',
          firstName: parsedStudent.firstName,
          lastName: parsedStudent.lastName,
          grade: parsedStudent.grade || '',
          subjects: parsedStudent.subjects || [],
          accessLevel: parsedStudent.accessLevel || 'basic',
          lastLogin: parsedStudent.lastLogin || '',
          totalExams: parsedStudent.totalExams || 0,
          completedExams: parsedStudent.completedExams || 0,
        };
        
        setStudent(normalizedStudent);
        loadDashboardData(normalizedStudent);
      } catch (error) {
        console.error('Error parsing student data:', error);
        // Only redirect if it's a real error, not just missing optional fields
        if (error instanceof Error && error.message === 'Invalid student data structure') {
          // Clear invalid data
          localStorage.removeItem('student');
          localStorage.removeItem('studentToken');
          // Don't redirect here - let layout handle it
          setIsLoading(false);
        } else {
          // For other errors, try to continue with partial data
          console.warn('Continuing with partial student data');
          try {
            const parsedStudent = JSON.parse(studentData);
            const normalizedStudent: Student = {
              id: parsedStudent._id || parsedStudent.id || '',
              firstName: parsedStudent.firstName || '',
              lastName: parsedStudent.lastName || '',
              grade: parsedStudent.grade || '',
              subjects: parsedStudent.subjects || [],
              accessLevel: parsedStudent.accessLevel || 'basic',
              lastLogin: parsedStudent.lastLogin || '',
              totalExams: 0,
              completedExams: 0,
            };
            setStudent(normalizedStudent);
            loadDashboardData(normalizedStudent);
          } catch (parseError) {
            console.error('Failed to parse student data even with fallback:', parseError);
            setIsLoading(false);
          }
        }
      }
    };

    checkAuth();
  }, [router]);

  const loadDashboardData = async (studentData: Student) => {
    try {
      setIsLoading(true);
      
      const token = localStorage.getItem('studentToken');
      if (!token) {
        console.error('No student token found');
        setError('Δεν βρέθηκε token. Παρακαλώ συνδεθείτε ξανά.');
        return;
      }

      // Load only exercises data
      const exercisesRes = await Promise.allSettled([
        adminAPI.getStudentExercises({ limit: 1 }).catch(() => ({ success: false, data: { exercises: [] } }))
      ]);

      // Handle exercises response
      if (exercisesRes[0].status === 'fulfilled' && exercisesRes[0].value.success) {
        setTotalExercises(exercisesRes[0].value.data?.pagination?.total || exercisesRes[0].value.data?.exercises?.length || 0);
      }

      // Load recent exercises
      if (token) {
        await loadRecentExercises().catch(err => {
          console.error('Error loading recent exercises:', err);
        });
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setError('Σφάλμα φόρτωσης δεδομένων. Παρακαλώ ανανεώστε τη σελίδα.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadRecentExercises = async () => {
    try {
      const exercisesRes = await adminAPI.getStudentExercises({ limit: 10 });
      
      if (exercisesRes.success && exercisesRes.data?.exercises) {
        setRecentExercises(exercisesRes.data.exercises.slice(0, 10));
      }
    } catch (error) {
      console.error('Error loading recent exercises:', error);
    }
  };

  const getAccessLevelColor = (level?: string) => {
    switch (level) {
      case 'basic': return 'text-blue-600 bg-blue-100';
      case 'premium': return 'text-purple-600 bg-purple-100';
      case 'vip': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAccessLevelText = (level?: string) => {
    switch (level) {
      case 'basic': return 'Βασικό';
      case 'premium': return 'Premium';
      case 'vip': return 'VIP';
      default: return 'Βασικό';
    }
  };

  const getSubjectLabel = (subject: string) => {
    const subjectMap: Record<string, string> = {
      'math': 'Μαθηματικά',
      'physics': 'Φυσική',
      'chemistry': 'Χημεία',
      'biology': 'Βιολογία',
      'greek': 'Νέα Ελληνικά',
      'ancient-greek': 'Αρχαία',
      'history': 'Ιστορία',
      'latin': 'Λατινικά',
      'economics': 'Οικονομικά',
      'informatics': 'Πληροφορική'
    };
    return subjectMap[subject] || subject;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Ποτέ';
    try {
      return new Date(dateString).toLocaleDateString('el-GR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return 'Άγνωστη ημερομηνία';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Καλώς ήρθατε, {student.firstName}! 👋
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                Αυτός είναι ο προσωπικός σας πίνακας ελέγχου. Εδώ μπορείτε να βρείτε τις ασκήσεις που έχουν δημιουργήσει οι καθηγητές σας από το admin panel.
              </p>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${getAccessLevelColor(student.accessLevel)}`}>
              {getAccessLevelText(student.accessLevel)}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Ασκήσεις</CardTitle>
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{totalExercises}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Διαθέσιμες ασκήσεις από καθηγητές
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-[#CE3B49]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Τελευταία Σύνδεση</CardTitle>
              <div className="w-10 h-10 bg-[#CE3B49]/10 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-[#CE3B49]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {student.lastLogin 
                  ? formatDate(student.lastLogin)
                  : 'Ποτέ'}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Τελευταία δραστηριότητα
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-[#D97706]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Επίπεδο Πρόσβασης</CardTitle>
              <div className="w-10 h-10 bg-[#D97706]/10 rounded-lg flex items-center justify-center">
                <Award className="h-5 w-5 text-[#D97706]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {getAccessLevelText(student.accessLevel)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Επίπεδο χρήστη
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Exercises Card */}
          <Card className="hover:shadow-xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-300 bg-gradient-to-br from-white to-blue-50/30">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Ασκήσεις</CardTitle>
                  <CardDescription className="text-base">
                    Ασκήσεις από καθηγητές
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Προσβάστε τις ασκήσεις που έχουν δημιουργήσει οι καθηγητές σας από το admin panel.
              </p>
              <Link href="/student/exercises">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 text-base">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Προβολή Ασκήσεων
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quick Stats Card */}
          <Card className="hover:shadow-xl transition-all duration-300 border-2 border-purple-100 hover:border-purple-300 bg-gradient-to-br from-white to-purple-50/30">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Στατιστικά</CardTitle>
                  <CardDescription className="text-base">
                    Επισκόπηση πρόοδου
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Συνολικές ασκήσεις</span>
                  </div>
                  <span className="font-bold text-lg text-gray-900">{totalExercises}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Τάξη</span>
                  </div>
                  <span className="font-bold text-lg text-gray-900">{student.grade || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Επίπεδο πρόσβασης</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getAccessLevelColor(student.accessLevel)}`}>
                    {getAccessLevelText(student.accessLevel)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Exercises */}
        <Card className="hover:shadow-xl transition-all duration-300 mb-6 sm:mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <CardTitle className="text-xl">Πρόσφατες Ασκήσεις</CardTitle>
                  <CardDescription>Οι τελευταίες ασκήσεις που προστέθηκαν από καθηγητές</CardDescription>
                </div>
              </div>
              <Link href="/student/exercises">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                  Προβολή όλων
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentExercises.length > 0 ? (
              <div className="space-y-3">
                {recentExercises.map((exercise) => (
                  <div
                    key={exercise._id}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => router.push(`/student/exercises`)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{exercise.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                            {getSubjectLabel(exercise.subject)}
                          </span>
                          {exercise.grade && (
                            <span className="text-gray-500">{exercise.grade}</span>
                          )}
                          {exercise.teacherName && (
                            <span className="text-gray-500">από {exercise.teacherName}</span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDate(exercise.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Δεν υπάρχουν πρόσφατες ασκήσεις</p>
                <p className="text-sm mt-2">Οι καθηγητές θα προσθέσουν ασκήσεις από το admin panel</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Subjects Overview */}
        {student.subjects && student.subjects.length > 0 && (
          <Card className="hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <CardTitle className="text-xl">Μαθήματα</CardTitle>
                  <CardDescription>Τα μαθήματα στα οποία έχετε πρόσβαση</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {student.subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
