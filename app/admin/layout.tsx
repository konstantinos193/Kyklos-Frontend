"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getApiUrl } from '@/lib/api-url';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if admin is logged in
    const checkAuth = async () => {
      // Check both localStorage and sessionStorage for token
      const adminToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
      const adminInfo = localStorage.getItem('adminInfo') || sessionStorage.getItem('adminInfo');
      
      if (adminToken && adminInfo) {
        try {
          // Verify token with backend
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
            router.push('/admin/login');
          }
        } catch (error) {
          // Network error, clear all storage and redirect
          localStorage.removeItem('adminLoggedIn');
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminInfo');
          sessionStorage.removeItem('adminLoggedIn');
          sessionStorage.removeItem('adminToken');
          sessionStorage.removeItem('adminInfo');
          router.push('/admin/login');
        }
      } else {
        router.push('/admin/login');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

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
    </div>
  );
}