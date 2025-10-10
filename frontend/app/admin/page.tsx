"use client";

import { useState, useEffect } from 'react';
import EmailDashboard from '@/components/admin/email-dashboard';
import BlogManagement from '@/components/admin/blog-management';
import StatsOverview from '@/components/admin/stats-overview';
import SettingsPanel from '@/components/admin/settings-panel';
import { ServerStatus } from '@/components/admin/server-status';
import StudentManagementDashboard from '@/components/admin/student-management-dashboard';
import { 
  Mail, 
  FileText, 
  BarChart3, 
  Settings, 
  Users, 
  BookOpen,
  TrendingUp,
  Shield,
  Bell,
  Database,
  LogOut
} from 'lucide-react';
import { adminAPI } from '@/lib/api';

type TabType = 'overview' | 'students' | 'emails' | 'blog' | 'stats' | 'settings';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [adminStats, setAdminStats] = useState({
    totalUsers: 0,
    totalBlogs: 0,
    totalEmails: 0,
    totalViews: 0
  });

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('adminLoggedIn');
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
  };

  useEffect(() => {
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
          });
        } else {
          setAdminStats({ totalUsers: 0, totalBlogs: 0, totalEmails: 0, totalViews: 0 });
        }
      } catch (e) {
        setAdminStats({ totalUsers: 0, totalBlogs: 0, totalEmails: 0, totalViews: 0 });
      } finally {
        setIsLoading(false);
      }
    };

    loadAdminData();
  }, []);

  const tabs = [
    { id: 'overview', label: 'Επισκόπηση', icon: BarChart3 },
    { id: 'students', label: 'Διαχείριση Μαθητών', icon: Users },
    { id: 'emails', label: 'Διαχείριση Email', icon: Mail },
    { id: 'blog', label: 'Διαχείριση Blog', icon: FileText },
    { id: 'stats', label: 'Αναλυτικά', icon: TrendingUp },
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
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Πίνακας Διαχείρισης</h1>
              <p className="text-sm text-gray-600">Διαχείριση ΚΥΚΛΟΣ Φροντιστήριο</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4" />
                <span>Πρόσβαση Διαχειριστή</span>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#E7B109] text-white rounded-lg hover:bg-[#D97706] transition-colors">
                <Bell className="w-4 h-4" />
                Ειδοποιήσεις
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Αποσύνδεση
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-[#E7B109] text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Server Status */}
            <div className="mt-8">
              <ServerStatus />
            </div>

            {/* Quick Stats */}
            <div className="mt-4 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Σύντομα Στατιστικά</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">Χρήστες</span>
                  </div>
                  <span className="font-semibold text-gray-900">{adminStats.totalUsers.toLocaleString('el-GR')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">Άρθρα</span>
                  </div>
                  <span className="font-semibold text-gray-900">{adminStats.totalBlogs.toLocaleString('el-GR')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-600">Συνδρομητές</span>
                  </div>
                  <span className="font-semibold text-gray-900">{adminStats.totalEmails.toLocaleString('el-GR')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-orange-600" />
                    <span className="text-sm text-gray-600">Προβολές</span>
                  </div>
                  <span className="font-semibold text-gray-900">{adminStats.totalViews.toLocaleString('el-GR')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && <StatsOverview stats={adminStats} />}
            {activeTab === 'students' && <StudentManagementDashboard />}
            {activeTab === 'emails' && <EmailDashboard />}
            {activeTab === 'blog' && <BlogManagement />}
            {activeTab === 'stats' && <StatsOverview stats={adminStats} />}
            {activeTab === 'settings' && <SettingsPanel />}
          </div>
        </div>
      </div>
    </div>
  );
}
