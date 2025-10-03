"use client";

import { useState } from 'react';
import { newsletterAPI } from '@/lib/api';

interface NewsletterFormProps {
  className?: string;
  showSuccessMessage?: boolean;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export function NewsletterForm({ 
  className = "", 
  showSuccessMessage = true,
  onSuccess,
  onError 
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Παρακαλώ εισάγετε το email σας');
      setMessageType('error');
      onError?.('Παρακαλώ εισάγετε το email σας');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await newsletterAPI.subscribe(email.trim(), name.trim());

      if (response.success) {
        setMessage(response.message);
        setMessageType('success');
        setEmail('');
        setName('');
        onSuccess?.(response.message);
      } else {
        setMessage(response.message);
        setMessageType('error');
        onError?.(response.message);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Σφάλμα κατά την εγγραφή';
      setMessage(errorMessage);
      setMessageType('error');
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="flex items-center">
            <div className="relative flex-1">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              <input
                type="email"
                placeholder="Το email σας..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#E7B109] focus:ring-2 focus:ring-[#E7B109]/20 focus:outline-none transition-all duration-300 text-lg"
                disabled={isLoading}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !email.trim()}
              className="ml-3 bg-gradient-to-r from-[#E7B109] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] disabled:from-gray-300 disabled:to-gray-400 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-5 h-5"
                >
                  <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                  <path d="m21.854 2.147-10.94 10.939"></path>
                </svg>
              )}
              <span className="hidden sm:inline">
                {isLoading ? 'Εγγραφή...' : 'Εγγραφή'}
              </span>
            </button>
          </div>
        </div>

        {/* Optional name field */}
        <div className="relative">
          <input
            type="text"
            placeholder="Το όνομά σας (προαιρετικό)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E7B109] focus:ring-2 focus:ring-[#E7B109]/20 focus:outline-none transition-all duration-300"
            disabled={isLoading}
          />
        </div>

        {/* Message display */}
        {showSuccessMessage && message && (
          <div className={`p-4 rounded-xl text-center font-medium ${
            messageType === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        <p className="text-sm text-gray-500 text-center">
          Δεν θα μοιραστούμε το email σας με τρίτους. Μπορείτε να απεγγραφείτε ανά πάσα στιγμή.
        </p>
      </form>
    </div>
  );
}