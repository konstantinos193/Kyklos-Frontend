"use client";

import { CourseCard } from "./course-card";
import { Course } from "./types";

interface CoursesGridProps {
  courses: Course[];
}

export function CoursesGrid({ courses }: CoursesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course, index) => (
        <div
          key={course.id}
          className="animate-fadeInUp"
          style={{
            animationDelay: `${index * 100}ms`,
            animationFillMode: 'both'
          }}
        >
          <CourseCard course={course} />
        </div>
      ))}
    </div>
  );
}
