'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  BookOpen, 
  User, 
  LogOut,
  Award,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  grade: string;
  accessLevel: 'basic' | 'premium' | 'vip';
}

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    } catch (error) {
      console.error('Error parsing student data:', error);
      router.push('/student-login');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('student');
    localStorage.removeItem('studentToken');
    router.push('/');
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
          <p className="text-gray-600">Φόρτωση...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return null;
  }

  const navigation = [
    {
      name: 'Πίνακας',
      href: '/student/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Υλικά Εξετάσεων',
      href: '/student/exam-materials',
      icon: FileText,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              {/* Logo/Title */}
              <Link href="/student/dashboard" className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-[#E7B109]" />
                <span className="text-xl font-bold text-gray-900">ΚΥΚΛΟΣ</span>
              </Link>

              {/* Navigation */}
              <nav className="hidden md:flex gap-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-[#E7B109] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {student.firstName} {student.lastName}
                  </div>
                  <div className="text-xs text-gray-500">{student.grade}</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getAccessLevelColor(student.accessLevel)}`}>
                  <div className="flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    {getAccessLevelText(student.accessLevel)}
                  </div>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Αποσύνδεση</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t bg-white">
          <nav className="flex gap-1 p-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex flex-1 items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[#E7B109] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}

