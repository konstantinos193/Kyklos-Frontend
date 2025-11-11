'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface Student {
  _id?: string;
  id?: string;
  firstName: string;
  lastName: string;
  grade?: string;
  accessLevel?: 'basic' | 'premium' | 'vip';
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
    const checkAuth = () => {
      // IMPORTANT: Clear any admin tokens - students shouldn't have admin access
      const adminToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
      if (adminToken) {
        console.warn('Admin token detected in student layout, clearing admin session');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');
        localStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('adminToken');
        sessionStorage.removeItem('adminInfo');
        sessionStorage.removeItem('adminLoggedIn');
      }

      const studentData = localStorage.getItem('student');
      const studentToken = localStorage.getItem('studentToken');

      console.log('Student layout auth check:', {
        hasStudentData: !!studentData,
        hasStudentToken: !!studentToken,
        pathname: pathname
      });

      if (!studentData || !studentToken) {
        console.warn('Missing student data or token, redirecting to login');
        // Only redirect if not already on login page
        if (!pathname.includes('/student-login') && !pathname.includes('/login')) {
          window.location.replace('/student-login');
        }
        return;
      }

      try {
        const parsedStudent = JSON.parse(studentData);
        // Verify it's actually student data
        if (!parsedStudent.firstName || !parsedStudent.lastName) {
          console.error('Invalid student data structure:', parsedStudent);
          throw new Error('Invalid student data structure');
        }
        console.log('Student data valid, setting student');
        setStudent(parsedStudent);
        setIsLoading(false);
      } catch (error) {
        console.error('Error parsing student data:', error);
        // Clear invalid data
        localStorage.removeItem('student');
        localStorage.removeItem('studentToken');
        // Only redirect if not already on login page
        if (!pathname.includes('/student-login') && !pathname.includes('/login')) {
          window.location.replace('/student-login');
        }
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, pathname]);


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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content - Header is now provided by the root layout */}
      <main>{children}</main>
    </div>
  );
}

