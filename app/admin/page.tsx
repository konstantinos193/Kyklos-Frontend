"use client";

import { useState, useEffect } from 'react';
import NewsManagement from '@/components/admin/news-management';
import StatsOverview from '@/components/admin/stats-overview';
import SettingsPanel from '@/components/admin/settings-panel';
import { ServerStatus } from '@/components/admin/server-status';
import StudentManagementDashboard from '@/components/admin/student-management-dashboard';
import TeacherAccountsManagement from '@/components/admin/teacher-accounts-management';
import TeacherExercisesManagement from '@/components/admin/teacher-exercises-management';
import PanhellenicArchiveUpload from '@/components/admin/panhellenic-archive-upload';
import { 
  FileText, 
  BarChart3, 
  Settings, 
  Users, 
  BookOpen,
  Shield,
  Bell,
  Database,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { adminAPI } from '@/lib/api';
import { getApiUrl } from '@/lib/api-url';

type TabType = 'overview' | 'students' | 'teacher-accounts' | 'exercises' | 'news' | 'settings' | 'archive';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminInfo, setAdminInfo] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminStats, setAdminStats] = useState({
    totalUsers: 0,
    totalBlogs: 0,
    totalEmails: 0,
    totalViews: 0,
    // Stats for StatsOverview component
    totalSubscribers: 0,
    activePosts: 0,
    newSubscribers: 0,
    totalLikes: 0,
    totalComments: 0
  });

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      // IMPORTANT: Only check for admin tokens, not student tokens
      const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
      const storedAdminInfo = localStorage.getItem('adminInfo') || sessionStorage.getItem('adminInfo');
      
      // If student tokens exist, clear them - students shouldn't access admin panel
      const studentToken = localStorage.getItem('studentToken') || sessionStorage.getItem('studentToken');
      if (studentToken) {
        console.warn('Student token detected in admin panel, clearing student session');
        localStorage.removeItem('student');
        localStorage.removeItem('studentToken');
        sessionStorage.removeItem('student');
        sessionStorage.removeItem('studentToken');
      }
      
      if (token && storedAdminInfo) {
        try {
          const adminData = JSON.parse(storedAdminInfo);
          // Verify it's actually admin data, not student data
          if (!adminData.email || !adminData.role) {
            throw new Error('Invalid admin data structure');
          }
          setAdminInfo(adminData);
          setIsAuthenticated(true);
          loadAdminData();
        } catch (error) {
          console.error('Error parsing admin info:', error);
          // Clear invalid data
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminInfo');
          localStorage.removeItem('adminLoggedIn');
          sessionStorage.removeItem('adminToken');
          sessionStorage.removeItem('adminInfo');
          sessionStorage.removeItem('adminLoggedIn');
          window.location.replace('/admin/login');
        }
      } else {
        // No admin token found, redirect to login
        window.location.replace('/admin/login');
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
      if (token) {
        await fetch(`${getApiUrl()}/api/admin/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear all tokens and admin info
      localStorage.removeItem('adminLoggedIn');
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminInfo');
      sessionStorage.removeItem('adminToken');
      sessionStorage.removeItem('adminInfo');
      window.location.href = '/admin/login';
    }
  };

  const loadAdminData = async () => {
    try {
      setIsLoading(true);
      const res = await adminAPI.getStats();
      if (res?.success && res.data) {
        setAdminStats({
          totalUsers: res.data.totalUsers,
          totalBlogs: res.data.totalBlogs,
          totalEmails: res.data.totalSubscribers,
          totalViews: res.data.totalViews,
          // Map data for StatsOverview component
          totalSubscribers: res.data.totalSubscribers || 0,
          activePosts: res.data.totalBlogs || 0,
          newSubscribers: 0, // This would need to be calculated from newsletter data
          totalLikes: 0, // This would need to be calculated from blog data
          totalComments: 0 // Comments not implemented yet
        });
      } else {
        setAdminStats({ 
          totalUsers: 0, 
          totalBlogs: 0, 
          totalEmails: 0, 
          totalViews: 0,
          totalSubscribers: 0,
          activePosts: 0,
          newSubscribers: 0,
          totalLikes: 0,
          totalComments: 0
        });
      }
    } catch (e: any) {
      console.error('Error loading admin data:', e);
      // Check if it's an authentication error
      if (e?.response?.status === 401) {
        // Only logout if it's a real auth error, not a network issue
        if (e?.code !== 'ECONNABORTED' && e?.message !== 'Request aborted') {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminInfo');
          sessionStorage.removeItem('adminToken');
          sessionStorage.removeItem('adminInfo');
          window.location.href = '/admin/login';
          return;
        }
      }
      // Don't logout on API errors, just show empty stats
      setAdminStats({ 
        totalUsers: 0, 
        totalBlogs: 0, 
        totalEmails: 0, 
        totalViews: 0,
        totalSubscribers: 0,
        activePosts: 0,
        newSubscribers: 0,
        totalLikes: 0,
        totalComments: 0
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {

    loadAdminData();
  }, []);

  const tabs = [
    { id: 'overview', label: 'Επισκόπηση', icon: BarChart3 },
    { id: 'students', label: 'Διαχείριση Μαθητών', icon: Users },
    { id: 'teacher-accounts', label: 'Λογαριασμοί Καθηγητών', icon: Shield },
    { id: 'exercises', label: 'Ασκήσεις', icon: BookOpen },
    { id: 'archive', label: 'Αρχείο Πανελληνίων', icon: FileText },
    { id: 'news', label: 'Διαχείριση Νέα', icon: Bell },
    { id: 'settings', label: 'Ρυθμίσεις', icon: Settings }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E7B109] mx-auto mb-4"></div>
          <p className="text-gray-600">Φόρτωση πίνακα διαχείρισης...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Πίνακας Διαχείρισης</h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Διαχείριση ΚΥΚΛΟΣ Φροντιστήριο</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4" />
                <span className="hidden md:inline">Πρόσβαση Διαχειριστή</span>
              </div>
              <button className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#E7B109] text-white rounded-lg hover:bg-[#D97706] transition-colors">
                <Bell className="w-4 h-4" />
                <span className="hidden md:inline">Ειδοποιήσεις</span>
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Αποσύνδεση</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex gap-4 lg:gap-8">
          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div className={`
            fixed lg:static inset-y-0 left-0 z-50
            w-64 bg-white shadow-xl lg:shadow-none
            transform transition-transform duration-300 ease-in-out
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            lg:flex-shrink-0
            pt-16 lg:pt-0
            overflow-y-auto
          `}>
            <nav className="space-y-2 p-4 lg:p-0">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as TabType);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-[#E7B109] text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-sm sm:text-base">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 w-full">
            {activeTab === 'overview' && <StatsOverview stats={adminStats} />}
            {activeTab === 'students' && <StudentManagementDashboard />}
            {activeTab === 'teacher-accounts' && <TeacherAccountsManagement />}
            {activeTab === 'exercises' && <TeacherExercisesManagement />}
            {activeTab === 'archive' && <PanhellenicArchiveUpload />}
            {activeTab === 'news' && <NewsManagement />}
            {activeTab === 'settings' && <SettingsPanel />}
          </div>
        </div>
      </div>
    </div>
  );
}
