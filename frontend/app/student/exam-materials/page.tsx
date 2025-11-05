"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface ExamMaterial {
  _id: string;
  title: string;
  description: string;
  subject: string;
  grade: string;
  year: number;
  type: string;
}

export default function StudentExamMaterialsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [materials, setMaterials] = useState<ExamMaterial[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError("");

        const token = typeof window !== "undefined" ? localStorage.getItem("studentToken") : null;
        if (!token) {
          setHasAccess(false);
          setError("Δεν έχετε συνδεθεί. Παρακαλώ συνδεθείτε για να συνεχίσετε.");
          return;
        }

        // Try to fetch materials; backend will return 403 if no access
        const response = await api.get("/api/exam-materials", { params: { limit: 50 } });
        if (response.data?.success) {
          setHasAccess(true);
          setMaterials(response.data.data || []);
        } else {
          setHasAccess(false);
          setError("Δεν έχετε πρόσβαση στα θέματα πανελληνίων. Παρακαλώ επικοινωνήστε με το φροντιστήριο.");
        }
      } catch (err: any) {
        if (err?.response?.status === 403) {
          setHasAccess(false);
          setError("Δεν έχετε πρόσβαση στα θέματα πανελληνίων. Παρακαλώ επικοινωνήστε με το φροντιστήριο.");
        } else if (err?.response?.status === 401) {
          setHasAccess(false);
          setError("Το session σας έληξε ή δεν έχετε συνδεθεί.");
        } else {
          setHasAccess(false);
          setError("Παρουσιάστηκε σφάλμα. Δοκιμάστε ξανά αργότερα.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Θέματα Πανελληνίων</h1>
        <div className="w-16 h-1 bg-gradient-to-r from-[#E7B109] to-[#D97706] rounded-full mt-3" />
      </div>

      {isLoading && (
        <div className="text-gray-600">Φόρτωση...</div>
      )}

      {!isLoading && hasAccess === false && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
          {error || "Δεν έχετε πρόσβαση στα θέματα πανελληνίων. Παρακαλώ επικοινωνήστε με το φροντιστήριο."}
          <div className="mt-4">
            <a href="/contact" className="text-[#E7B109] underline">Επικοινωνήστε μαζί μας</a>
          </div>
        </div>
      )}

      {!isLoading && hasAccess && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((m) => (
            <div key={m._id} className="p-5 bg-white rounded-xl shadow border border-gray-100">
              <div className="text-xs text-gray-500 mb-1">{m.subject} • {m.grade} • {m.year}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{m.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{m.description}</p>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {m.type}
                </span>
                <a href={`/api/exam-materials/download/${m._id}`} className="text-[#E7B109] hover:text-[#D97706] text-sm font-medium">
                  Λήψη
                </a>
              </div>
            </div>
          ))}
          {materials.length === 0 && (
            <div className="text-gray-600">Δεν βρέθηκαν υλικά.</div>
          )}
        </div>
      )}
    </main>
  );
}


