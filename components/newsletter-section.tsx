"use client";

import { useState } from "react";
import { NewsletterForm } from "./newsletter/newsletter-form";
import { newsletterContent } from "./newsletter/data";
import { Mail, AlertCircle, CheckCircle } from "lucide-react";

export function NewsletterSection() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const handleSuccess = (msg: string) => {
    setMessage(msg);
    setMessageType("success");
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);
  };

  const handleError = (msg: string) => {
    setMessage(msg);
    setMessageType("error");
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);
  };

  return (
    <section className="relative py-20 bg-slate-200 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-[#E7B109]/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#E7B109] to-[#D97706] flex items-center justify-center shadow-2xl">
              <Mail className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {newsletterContent.title}
            </h2>
            
            <div className="w-24 h-1 bg-gradient-to-r from-[#E7B109] to-[#D97706] mx-auto mb-6 rounded-full"></div>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {newsletterContent.description}
            </p>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`max-w-md mx-auto mb-8 p-4 rounded-xl flex items-center gap-3 ${
              messageType === "success" 
                ? "bg-green-50 text-green-800 border border-green-200" 
                : "bg-red-50 text-red-800 border border-red-200"
            }`}>
              {messageType === "success" ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <span className="font-medium">{message}</span>
            </div>
          )}

          {/* Newsletter Form */}
          <div className="mb-8">
            <NewsletterForm onSuccess={handleSuccess} onError={handleError} />
            
            <p className="text-sm text-gray-500 mt-4 max-w-md mx-auto">
              {newsletterContent.privacyText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
