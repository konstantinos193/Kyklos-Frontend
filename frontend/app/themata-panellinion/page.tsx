"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function ThemataPanellinionPage() {
  const [status, setStatus] = useState<"checking" | "not_logged_in" | "no_access" | "has_access">("checking");

  useEffect(() => {
    const check = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('studentToken') : null;
        if (!token) {
          setStatus("not_logged_in");
          return;
        }
        // Verify and get student data
        const res = await api.post('/api/auth/student-verify');
        const hasAccess = !!res.data?.student?.hasAccessToThemata;
        if (hasAccess) {
          window.location.href = '/student/exam-materials';
        } else {
          setStatus("no_access");
        }
      } catch (e: any) {
        setStatus("not_logged_in");
      }
    };
    check();
  }, []);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
          Θέματα Πανελληνίων
        </h1>
        <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-[#E7B109] to-[#D97706] rounded-full mx-auto mb-4 sm:mb-6"></div>
        {status === "checking" && (
          <p className="text-base sm:text-lg text-gray-600">Έλεγχος πρόσβασης...</p>
        )}
        {status === "not_logged_in" && (
          <div className="space-y-4">
            <p className="text-base sm:text-lg text-gray-600">Για να δείτε τα θέματα, παρακαλώ συνδεθείτε.</p>
            <a href="/student-login" className="inline-flex px-5 py-2.5 bg-[#E7B109] text-white rounded-lg hover:bg-[#D97706]">Σύνδεση Μαθητή</a>
          </div>
        )}
        {status === "no_access" && (
          <div className="space-y-4">
            <p className="text-base sm:text-lg text-gray-600">Δεν έχετε πρόσβαση. Επικοινωνήστε με το φροντιστήριο.</p>
            <a href="/contact" className="inline-flex px-5 py-2.5 border border-[#E7B109] text-[#E7B109] rounded-lg hover:bg-yellow-50">Επικοινωνία</a>
          </div>
        )}
      </div>
    </main>
  );
}


