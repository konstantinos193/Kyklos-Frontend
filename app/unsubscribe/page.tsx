"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';

export default function UnsubscribePage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Παρακαλώ εισάγετε το email σας');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await api.post('/newsletter/unsubscribe', {
        email: email.trim()
      });

      setMessage(response.data.message);
      setMessageType(response.data.success ? 'success' : 'error');
      
      if (response.data.success) {
        setEmail('');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Σφάλμα κατά την απεγγραφή';
      setMessage(errorMessage);
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#E7B109] to-[#D97706] flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-white"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Απεγγραφή από Newsletter</h1>
            <p className="text-gray-600">
              Λυπούμαστε που φεύγετε! Μπορείτε να απεγγραφείτε από το newsletter μας.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleUnsubscribe} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E7B109] focus:ring-2 focus:ring-[#E7B109]/20 focus:outline-none transition-all duration-300"
                placeholder="Το email σας..."
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !email.trim()}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-300 disabled:to-gray-400 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Απεγγραφή...
                </>
              ) : (
                <>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  Απεγγραφή
                </>
              )}
            </button>
          </form>

          {/* Message */}
          {message && (
            <div className={`mt-6 p-4 rounded-xl text-center font-medium ${
              messageType === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {message}
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500 mb-4">
              Αν αλλάξετε γνώμη, μπορείτε να εγγραφείτε ξανά στο newsletter μας.
            </p>
            <a 
              href="/" 
              className="inline-flex items-center gap-2 text-[#E7B109] hover:text-[#D97706] font-medium transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7"></path>
              </svg>
              Επιστροφή στην Αρχική
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
