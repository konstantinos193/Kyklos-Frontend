"use client";

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface SubscriberStats {
  total: number;
  active: number;
  inactive: number;
  thisMonth: number;
  lastUpdated: string;
}

interface Subscriber {
  _id: string;
  email: string;
  name: string;
  subscribedAt: string;
  source: string;
  isActive: boolean;
}

interface NewsletterData {
  data: Subscriber[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function EmailDashboard() {
  const [stats, setStats] = useState<SubscriberStats | null>(null);
  const [subscribers, setSubscribers] = useState<NewsletterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [emailServiceReady, setEmailServiceReady] = useState(false);

  // Newsletter form state
  const [newsletterForm, setNewsletterForm] = useState({
    subject: '',
    content: '',
    featuredImage: ''
  });
  const [sendingNewsletter, setSendingNewsletter] = useState(false);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch stats
      const statsResponse = await api.get('/newsletter/stats');
      setStats(statsResponse.data.data);

      // Fetch subscribers
      const subscribersResponse = await api.get(`/newsletter/subscribers?page=${currentPage}&limit=20`);
      setSubscribers(subscribersResponse.data.data);

      // Check email service status
      const emailResponse = await api.get('/newsletter/verify');
      setEmailServiceReady(emailResponse.data.emailServiceReady);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newsletterForm.subject || !newsletterForm.content) {
      alert('Παρακαλώ συμπληρώστε το θέμα και το περιεχόμενο');
      return;
    }

    setSendingNewsletter(true);

    try {
      const response = await api.post('/newsletter/send', newsletterForm);
      
      if (response.data.success) {
        alert(`Newsletter στάλθηκε επιτυχώς! Αποστολή: ${response.data.results.sent}, Αποτυχία: ${response.data.results.failed}`);
        setNewsletterForm({ subject: '', content: '', featuredImage: '' });
      } else {
        alert('Σφάλμα κατά την αποστολή: ' + response.data.message);
      }
    } catch (error: any) {
      alert('Σφάλμα: ' + (error.response?.data?.message || 'Αγνώστο σφάλμα'));
    } finally {
      setSendingNewsletter(false);
    }
  };

  const exportSubscribers = async (format: 'json' | 'csv') => {
    try {
      const response = await api.get(`/newsletter/export?format=${format}`);
      
      if (format === 'csv') {
        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'subscribers.csv';
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        const blob = new Blob([JSON.stringify(response.data.data, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'subscribers.json';
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Export error:', error);
      alert('Σφάλμα κατά την εξαγωγή');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E7B109]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Dashboard</h1>
        <p className="text-gray-600">Διαχείριση newsletter και email marketing</p>
        
        <div className="mt-4 flex items-center gap-4">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            emailServiceReady 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            Email Service: {emailServiceReady ? 'Ready' : 'Not Ready'}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Συνολικοί Εγγεγραμμένοι</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ενεργοί</p>
                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Αυτό το Μήνα</p>
                <p className="text-2xl font-bold text-gray-900">{stats.thisMonth}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ανενεργοί</p>
                <p className="text-2xl font-bold text-gray-900">{stats.inactive}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Form */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Αποστολή Newsletter</h2>
        <form onSubmit={handleSendNewsletter} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Θέμα</label>
            <input
              type="text"
              value={newsletterForm.subject}
              onChange={(e) => setNewsletterForm({...newsletterForm, subject: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
              placeholder="Θέμα του newsletter"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Περιεχόμενο (HTML)</label>
            <textarea
              value={newsletterForm.content}
              onChange={(e) => setNewsletterForm({...newsletterForm, content: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent h-32"
              placeholder="Περιεχόμενο του newsletter (HTML)"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image URL (προαιρετικό)</label>
            <input
              type="url"
              value={newsletterForm.featuredImage}
              onChange={(e) => setNewsletterForm({...newsletterForm, featuredImage: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <button
            type="submit"
            disabled={sendingNewsletter || !emailServiceReady}
            className="bg-gradient-to-r from-[#E7B109] to-[#D97706] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#D97706] hover:to-[#B45309] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {sendingNewsletter ? 'Αποστολή...' : 'Αποστολή Newsletter'}
          </button>
        </form>
      </div>

      {/* Subscribers List */}
      {subscribers && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Εγγεγραμμένοι</h2>
            <div className="flex gap-2">
              <button
                onClick={() => exportSubscribers('csv')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Export CSV
              </button>
              <button
                onClick={() => exportSubscribers('json')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Export JSON
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Όνομα</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ημερομηνία</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Πηγή</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Κατάσταση</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscribers.data.map((subscriber) => (
                  <tr key={subscriber._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subscriber.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subscriber.name || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(subscriber.subscribedAt).toLocaleDateString('el-GR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subscriber.source}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        subscriber.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {subscriber.isActive ? 'Ενεργός' : 'Ανενεργός'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-gray-700">
              Εμφάνιση {((currentPage - 1) * 20) + 1} - {Math.min(currentPage * 20, subscribers.pagination.total)} από {subscribers.pagination.total}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Προηγούμενο
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(subscribers.pagination.pages, prev + 1))}
                disabled={currentPage === subscribers.pagination.pages}
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Επόμενο
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
