"use client";

import { GradeCard } from "./grade-card";
import { Course } from "@/components/courses/types";

interface CurriculumSectionProps {
  courses: Course[];
}

export function CurriculumSection({ courses }: CurriculumSectionProps) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Header */}
      <div className="text-center mb-20">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Πρόγραμμα Σπουδών
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#E7B109] to-[#D97706] mx-auto mb-6 rounded-full"></div>
        <p className="text-2xl text-gray-600 font-light max-w-2xl mx-auto">
          Λυκείου - Γυμνασίου - ΕΠΑΛ
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <GradeCard
            key={course.id}
            course={course}
            animationDelay={index * 100}
          />
        ))}
      </div>
    </div>
  );
}

