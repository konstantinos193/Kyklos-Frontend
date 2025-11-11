"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getApiUrl } from '@/lib/api-url';
import { Toaster } from '@/components/ui/toaster';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if admin is logged in
    const checkAuth = async () => {
      // IMPORTANT: Don't check auth if we're on the login page - let the login page handle it
      if (pathname?.includes('/admin/login')) {
        setIsLoading(false);
        setIsAuthenticated(false);
        return;
      }

      // IMPORTANT: Only check for admin tokens, clear any student tokens
      const adminToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
      const adminInfo = localStorage.getItem('adminInfo') || sessionStorage.getItem('adminInfo');
      
      // If student tokens exist, clear them - students shouldn't access admin routes
      const studentToken = localStorage.getItem('studentToken') || sessionStorage.getItem('studentToken');
      if (studentToken) {
        console.warn('Student token detected in admin layout, clearing student session');
        localStorage.removeItem('student');
        localStorage.removeItem('studentToken');
        sessionStorage.removeItem('student');
        sessionStorage.removeItem('studentToken');
      }
      
      if (adminToken && adminInfo) {
        try {
          // Verify token with backend - ensure it's actually an admin token
          const response = await fetch(`${getApiUrl()}/api/admin/auth/verify`, {
            headers: {
              'Authorization': `Bearer ${adminToken}`,
            },
          });
          
          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            // Token is invalid, clear all storage and redirect
            localStorage.removeItem('adminLoggedIn');
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminInfo');
            sessionStorage.removeItem('adminLoggedIn');
            sessionStorage.removeItem('adminToken');
            sessionStorage.removeItem('adminInfo');
            // Only redirect if not already on login page
            if (!pathname?.includes('/admin/login')) {
              window.location.replace('/admin/login');
            }
          }
        } catch (error) {
          // Network error, clear all storage and redirect
          localStorage.removeItem('adminLoggedIn');
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminInfo');
          sessionStorage.removeItem('adminLoggedIn');
          sessionStorage.removeItem('adminToken');
          sessionStorage.removeItem('adminInfo');
          // Only redirect if not already on login page
          if (!pathname?.includes('/admin/login')) {
            window.location.replace('/admin/login');
          }
        }
      } else {
        // No token found, but only redirect if not already on login page
        if (!pathname?.includes('/admin/login')) {
          window.location.replace('/admin/login');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E7B109] mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {children}
      <Toaster />
    </div>
  );
}