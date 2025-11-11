"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react';
import { getApiUrl } from '@/lib/api-url';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const checkExistingAuth = async () => {
      try {
        // IMPORTANT: Only check for admin tokens, ignore student tokens
        const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
        const adminInfo = localStorage.getItem('adminInfo') || sessionStorage.getItem('adminInfo');
        
        // If student tokens exist, clear them to prevent confusion
        const studentToken = localStorage.getItem('studentToken') || sessionStorage.getItem('studentToken');
        if (studentToken) {
          // Student is logged in, they shouldn't be on admin login page
          // Clear student tokens if they somehow ended up here
          localStorage.removeItem('student');
          localStorage.removeItem('studentToken');
          sessionStorage.removeItem('student');
          sessionStorage.removeItem('studentToken');
        }
        
        if (token && adminInfo) {
          // Verify token with backend - ensure it's actually an admin token
          const response = await fetch(`${getApiUrl()}/api/admin/auth/verify`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          
          if (response.ok) {
            // Token is valid, redirect to admin panel
            window.location.replace('/admin');
            return;
          } else {
            // Token is invalid, clear storage
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminInfo');
            localStorage.removeItem('adminLoggedIn');
            sessionStorage.removeItem('adminToken');
            sessionStorage.removeItem('adminInfo');
            sessionStorage.removeItem('adminLoggedIn');
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
        // Clear potentially corrupted data
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');
        localStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('adminToken');
        sessionStorage.removeItem('adminInfo');
        sessionStorage.removeItem('adminLoggedIn');
      } finally {
        setIsChecking(false);
      }
    };

    checkExistingAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${getApiUrl()}/api/admin/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Show the actual error message from backend
        setError(data.message || `Login failed: ${response.statusText}`);
        return;
      }

      if (data.success) {
        // Handle both old and new response structures
        const adminData = data.admin || data.data?.admin;
        
        if (!adminData) {
          setError('Invalid response from server');
          return;
        }

        // IMPORTANT: Clear any student tokens to prevent cross-contamination
        localStorage.removeItem('student');
        localStorage.removeItem('studentToken');
        sessionStorage.removeItem('student');
        sessionStorage.removeItem('studentToken');

        // Store token based on remember me preference
        const adminInfo = {
          email: adminData.email,
          name: adminData.name,
          role: adminData.role,
          loginTime: new Date().toISOString()
        };

        if (rememberMe) {
          // Store in localStorage for persistent login (survives browser restart)
          localStorage.setItem('adminToken', data.token);
          localStorage.setItem('adminInfo', JSON.stringify(adminInfo));
          localStorage.setItem('adminLoggedIn', 'true');
        } else {
          // Store in sessionStorage for session-only login (cleared on browser close)
          sessionStorage.setItem('adminToken', data.token);
          sessionStorage.setItem('adminInfo', JSON.stringify(adminInfo));
          sessionStorage.setItem('adminLoggedIn', 'true');
        }
        
        // Always store in sessionStorage as well for API client compatibility
        sessionStorage.setItem('adminToken', data.token);
        sessionStorage.setItem('adminInfo', JSON.stringify(adminInfo));
        
        // Redirect to admin panel - use replace to prevent back button issues
        window.location.replace('/admin');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while checking existing auth
  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-[#E7B109] mx-auto mb-4"></div>
          <p className="text-sm sm:text-base text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[#E7B109] rounded-full mb-3 sm:mb-4">
            <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-sm sm:text-base text-gray-600">Συνδεθείτε για να διαχειριστείτε το σύστημα</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="inline w-4 h-4 mr-2" />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent transition-colors"
                placeholder="admin@example.com"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="inline w-4 h-4 mr-2" />
                Κωδικός
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#E7B109] bg-gray-100 border-gray-300 rounded focus:ring-[#E7B109] focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-700">Θυμήσου με</span>
              </label>
              <div className="text-xs text-gray-500">
                {rememberMe ? 'Συνδεδεμένος μόνιμα' : 'Σύνδεση μόνο για αυτή τη συνεδρία'}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#E7B109] text-white py-3 px-4 rounded-lg hover:bg-[#D97706] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Σύνδεση...
                </div>
              ) : (
                'Σύνδεση'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
            <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Demo Credentials:</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <p><strong>Email:</strong> grkyklos-@hotmail.gr</p>
              <p><strong>Password:</strong> admin123</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Note: Make sure the admin user exists in your database. If not, run the seeder script.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}