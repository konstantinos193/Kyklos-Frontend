"use client";

import { useState } from "react";
import { mathematicsTeachers } from "@/components/curriculum/teachers-data";
import { physicsTeachers } from "@/components/curriculum/physics-teachers-data";
import { chemistryTeachers } from "@/components/curriculum/chemistry-teachers-data";
import { philologyTeachers } from "@/components/curriculum/philology-teachers-data";
import { economicsTeachers } from "@/components/curriculum/economics-teachers-data";
import { informaticsTeachers } from "@/components/curriculum/informatics-teachers-data";
import { ChevronDownIcon, ChevronUpIcon } from "@/components/icons";

interface Teacher {
  id: string;
  name: string;
  title: string;
  specialization: string;
  experience: number;
  education: string;
  email: string;
  phone: string;
  image?: string;
  rating: number;
  subjects: string[];
  availability: string;
  bio: string;
}

interface TeacherCategory {
  id: string;
  title: string;
  teachers: Teacher[];
  color: string;
}

const teacherCategories: TeacherCategory[] = [
  {
    id: "mathematics",
    title: "Μαθηματικοί",
    teachers: mathematicsTeachers,
    color: "from-blue-500 to-blue-600"
  },
  {
    id: "physics",
    title: "Φυσικοί",
    teachers: physicsTeachers,
    color: "from-purple-500 to-purple-600"
  },
  {
    id: "chemistry",
    title: "Χημικοί",
    teachers: chemistryTeachers,
    color: "from-green-500 to-green-600"
  },
  {
    id: "philology",
    title: "Φιλόλογοι",
    teachers: philologyTeachers,
    color: "from-[#E7B109] to-[#D97706]"
  },
  {
    id: "economics",
    title: "Οικονομικοί",
    teachers: economicsTeachers,
    color: "from-indigo-500 to-indigo-600"
  },
  {
    id: "informatics",
    title: "Πληροφορική",
    teachers: informaticsTeachers,
    color: "from-cyan-500 to-cyan-600"
  }
];

export function AboutStaff() {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryId: string) => {
    const newOpen = new Set(openCategories);
    if (newOpen.has(categoryId)) {
      newOpen.delete(categoryId);
    } else {
      newOpen.add(categoryId);
    }
    setOpenCategories(newOpen);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-slate-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
              Το <span className="text-[#E7B109]">Εκπαιδευτικό</span> μας{" "}
              <span className="text-[#CE3B49]">Προσωπικό</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#E7B109] via-[#CE3B49] to-[#D97706] rounded-full mx-auto mb-6"></div>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Οι καθηγητές μας είναι εξειδικευμένοι επαγγελματίες με αποδεδειγμένη εμπειρία 
              και βαθιά γνώση της εκπαιδευτικής διαδικασίας.
            </p>
          </div>

          {/* Teacher Categories with Dropdowns */}
          <div className="space-y-3">
            {teacherCategories.map((category) => {
              const isOpen = openCategories.has(category.id);
              const hasTeachers = category.teachers.length > 0;

              return (
                <div
                  key={category.id}
                  className="bg-white rounded-xl shadow-md border border-slate-300/50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-slate-400"
                >
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    disabled={!hasTeachers}
                    className={`w-full px-5 py-4 flex items-center justify-between transition-all duration-200 ${
                      hasTeachers
                        ? "hover:bg-slate-50/80 cursor-pointer active:bg-slate-100"
                        : "cursor-not-allowed opacity-50"
                    } ${isOpen ? "bg-slate-50/50" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-14 h-14 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white font-bold text-base shadow-sm flex-shrink-0`}
                      >
                        {category.title[0]}
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-bold text-slate-900">
                          {category.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {category.teachers.length}{" "}
                          {category.teachers.length === 1
                            ? "Καθηγητής"
                            : "Καθηγητές"}
                        </p>
                      </div>
                    </div>
                    {hasTeachers && (
                      <div className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                        <ChevronDownIcon className="w-5 h-5" />
                      </div>
                    )}
                  </button>

                  {/* Teachers Grid - Collapsible */}
                  {isOpen && hasTeachers && (
                    <div className="px-5 pb-5 pt-3 border-t border-slate-200 bg-slate-50/30">
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.teachers.map((teacher) => (
                          <div
                            key={teacher.id}
                            className="bg-white rounded-lg p-5 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 group"
                          >
                            {/* Avatar */}
                            <div className="mb-3">
                              <div
                                className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center text-white text-lg font-bold shadow-sm mx-auto group-hover:scale-105 transition-transform duration-200`}
                              >
                                {getInitials(teacher.name)}
                              </div>
                            </div>

                            {/* Info */}
                            <div className="text-center space-y-2.5">
                              <div>
                                <h4 className="text-base font-bold text-slate-900 mb-0.5">
                                  {teacher.name}
                                </h4>
                                {teacher.title && (
                                  <p className="text-xs font-medium text-[#CE3B49] mb-1">
                                    {teacher.title}
                                  </p>
                                )}
                                {teacher.specialization && (
                                  <p className="text-xs text-slate-500 italic">
                                    {teacher.specialization}
                                  </p>
                                )}
                              </div>

                              {/* Education */}
                              {teacher.education && (
                                <div className="pt-2.5 border-t border-slate-100">
                                  <p className="text-xs font-semibold text-slate-700 mb-1.5">
                                    Εκπαίδευση:
                                  </p>
                                  <p className="text-xs text-slate-600 leading-relaxed">
                                    {teacher.education}
                                  </p>
                                </div>
                              )}

                              {/* Experience */}
                              {teacher.experience > 0 && (
                                <div className="pt-2">
                                  <span
                                    className={`inline-block bg-gradient-to-r ${category.color} text-white px-2.5 py-1 rounded-full text-xs font-medium shadow-sm`}
                                  >
                                    {teacher.experience}+ χρόνια
                                  </span>
                                </div>
                              )}

                              {/* Subjects */}
                              {teacher.subjects && teacher.subjects.length > 0 && (
                                <div className="pt-2">
                                  <p className="text-xs font-semibold text-slate-700 mb-1.5">
                                    Μαθήματα:
                                  </p>
                                  <div className="flex flex-wrap gap-1 justify-center">
                                    {teacher.subjects.map((subject, idx) => (
                                      <span
                                        key={idx}
                                        className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px]"
                                      >
                                        {subject}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
