"use client";

import Link from "next/link";
import { Course } from "./types";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'epal':
        return 'bg-[#E7B109] text-white';
      case 'lykeioy':
        return 'bg-[#CE3B49] text-white';
      case 'gymnasioy':
        return 'bg-[#D97706] text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden">
      {/* Category Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold shadow-lg ${getCategoryColor(course.category)}`}>
          {course.categoryLabel}
        </span>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#E7B109] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-500 rounded-full blur-2xl"></div>
      </div>

      {/* Content */}
      <div className="relative p-8">
        {/* Title */}
        <h4 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#E7B109] transition-colors duration-300">
          {course.title}
        </h4>

        {/* Duration */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5 text-[#E7B109]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span className="font-semibold text-lg">{course.duration}</span>
          </div>
        </div>

        {/* Apply Text (if exists) */}
        {course.applyText && (
          <div className="mb-6 p-4 bg-gradient-to-r from-[#E7B109]/10 to-blue-500/10 rounded-xl border border-[#E7B109]/20">
            <p className="text-sm text-gray-700 font-semibold text-center">
              {course.applyText}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href={course.applyHref}
            className="block w-full bg-gradient-to-r from-[#E7B109] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white text-center py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Επικοινωνία
          </Link>
          <Link
            href={course.moreHref}
            className="block w-full border-2 border-gray-200 hover:border-[#E7B109] text-gray-700 hover:text-[#E7B109] text-center py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:bg-[#E7B109]/5 flex items-center justify-center gap-2"
          >
            Περισσότερα
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E7B109]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}
