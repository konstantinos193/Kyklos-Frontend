"use client";

import { useState, useEffect } from 'react';
import { Users, BookOpen, Mail, TrendingUp, Eye, Heart, MessageCircle, Calendar, Clock } from 'lucide-react';
import { api } from '@/lib/api';

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<any>;
  color: string;
}

function StatCard({ title, value, change, changeType, icon: Icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <p className={`text-sm flex items-center mt-2 ${
            changeType === 'positive' ? 'text-green-600' : 
            changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
          }`}>
            <TrendingUp className="w-4 h-4 mr-1" />
            {change}
          </p>
        </div>
        <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
          <Icon className={`w-6 h-6`} style={{ color }} />
        </div>
      </div>
    </div>
  );
}

export function StatsOverview() {
  const [stats, setStats] = useState({
    totalSubscribers: 0,
    activePosts: 0,
    newSubscribers: 0,
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Fetch newsletter stats
        const newsletterResponse = await api.get('/api/newsletter/stats');
        const newsletterStats = newsletterResponse.data;
        
        // Fetch blog stats
        const blogResponse = await api.get('/api/blog');
        const blogData = blogResponse.data;
        
        // Calculate stats
        const totalViews = blogData.data?.reduce((sum: number, post: any) => sum + (post.views || 0), 0) || 0;
        const totalLikes = blogData.data?.reduce((sum: number, post: any) => sum + (post.likes || 0), 0) || 0;
        
        setStats({
          totalSubscribers: newsletterStats.data?.active || 0,
          activePosts: blogData.data?.length || 0,
          newSubscribers: newsletterStats.data?.thisMonth || 0,
          totalViews,
          totalLikes,
          totalComments: 0 // Comments not implemented yet
        });
        
        setLastUpdate(new Date());
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Set fallback data
        setStats({
          totalSubscribers: 0,
          activePosts: 0,
          newSubscribers: 0,
          totalViews: 0,
          totalLikes: 0,
          totalComments: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    
    // Refresh stats every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Στατιστικά Επισκόπησης</h2>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-2" />
          Τελευταία ενημέρωση: {lastUpdate.toLocaleString('el-GR')}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Εγγεγραμμένοι στο Newsletter"
          value={stats.totalSubscribers.toLocaleString()}
          change={`+${stats.newSubscribers} νέοι αυτόν τον μήνα`}
          changeType={stats.newSubscribers > 0 ? "positive" : "neutral"}
          icon={Users}
          color="#3B82F6"
        />
        <StatCard
          title="Δημοσιευμένα Άρθρα"
          value={stats.activePosts}
          change={`${stats.activePosts > 0 ? 'Ενεργά' : 'Δεν υπάρχουν άρθρα'}`}
          changeType={stats.activePosts > 0 ? "positive" : "neutral"}
          icon={BookOpen}
          color="#10B981"
        />
        <StatCard
          title="Νέοι Εγγεγραμμένοι"
          value={stats.newSubscribers}
          change="αυτόν τον μήνα"
          changeType={stats.newSubscribers > 0 ? "positive" : "neutral"}
          icon={Mail}
          color="#F59E0B"
        />
        <StatCard
          title="Συνολικές Προβολές"
          value={stats.totalViews.toLocaleString()}
          change="όλων των άρθρων"
          changeType="positive"
          icon={Eye}
          color="#8B5CF6"
        />
        <StatCard
          title="Συνολικές Αρέσεις"
          value={stats.totalLikes.toLocaleString()}
          change="όλων των άρθρων"
          changeType="positive"
          icon={Heart}
          color="#EF4444"
        />
        <StatCard
          title="Μέσος Όρος Προβολών"
          value={stats.activePosts > 0 ? Math.round(stats.totalViews / stats.activePosts) : 0}
          change="ανά άρθρο"
          changeType="positive"
          icon={TrendingUp}
          color="#06B6D4"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Γρήγορες Ενέργειες</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <BookOpen className="w-5 h-5 mr-2 text-gray-400" />
            <span className="text-gray-600">Νέο Άρθρο</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <Mail className="w-5 h-5 mr-2 text-gray-400" />
            <span className="text-gray-600">Newsletter</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <Calendar className="w-5 h-5 mr-2 text-gray-400" />
            <span className="text-gray-600">Προγραμματισμός</span>
          </button>
        </div>
      </div>
    </div>
  );
}