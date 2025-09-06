"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";

interface NewsletterFormProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export function NewsletterForm({ onSuccess, onError }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      onError("Παρακαλώ εισάγετε το email σας");
      return;
    }

    if (!validateEmail(email)) {
      onError("Παρακαλώ εισάγετε ένα έγκυρο email");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      onSuccess("Ευχαριστούμε! Έχετε εγγραφεί επιτυχώς στο newsletter μας.");
      setEmail("");
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      onError("Παρουσιάστηκε σφάλμα. Παρακαλώ δοκιμάστε ξανά.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Εγγραφή Επιτυχής!</h3>
        <p className="text-gray-600">Ευχαριστούμε που εγγραφήκατε στο newsletter μας.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="relative">
        <div className="flex items-center">
          <div className="relative flex-1">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Το email σας..."
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#E7B109] focus:ring-2 focus:ring-[#E7B109]/20 focus:outline-none transition-all duration-300 text-lg"
              disabled={isLoading}
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
              <>
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline">Εγγραφή</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
