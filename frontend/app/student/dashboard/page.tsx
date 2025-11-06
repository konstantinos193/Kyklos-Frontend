"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function StudentDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await api.post('/api/auth/student-verify');
        setStudent(res.data?.student);
      } catch (e: any) {
        setError("Δεν έχετε συνδεθεί.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Πίνακας Μαθητή</h1>

      {loading && <div className="text-gray-600">Φόρτωση...</div>}
      {!loading && error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">{error}</div>
      )}

      {!loading && student && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Καλώς ήρθες, {student.firstName} {student.lastName}</h2>
            <p className="text-gray-600">Τάξη: {student.grade}</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Πρόσβαση στα "Θέματα Πανελληνίων"</h3>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              student.hasAccessToThemata ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
            }`}>
              {student.hasAccessToThemata ? 'Έχετε πρόσβαση' : 'Δεν έχετε πρόσβαση'}
            </span>
            <div className="mt-4">
              {student.hasAccessToThemata ? (
                <a href="/student/exam-materials" className="inline-flex px-4 py-2 bg-[#E7B109] text-white rounded-lg hover:bg-[#D97706]">Μετάβαση στα Θέματα</a>
              ) : (
                <a href="/contact" className="inline-flex px-4 py-2 border border-[#E7B109] text-[#E7B109] rounded-lg hover:bg-yellow-50">Επικοινωνία για πρόσβαση</a>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}



