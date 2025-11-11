import { Course } from "@/components/courses/types";

/**
 * Normalizes a grade string by removing apostrophes and extra spaces
 * Example: "Α' Γυμνασίου" -> "Α Γυμνασίου"
 */
function normalizeGrade(grade: string): string {
  return grade
    .replace(/'/g, '') // Remove apostrophes
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim();
}

/**
 * Filters courses based on the grade
 * Matches courses where the title matches the grade (ignoring apostrophes)
 */
export function filterCoursesByGrade(courses: Course[], grade: string): Course[] {
  const normalizedGrade = normalizeGrade(grade);
  
  return courses.filter(course => {
    const normalizedCourseTitle = normalizeGrade(course.title);
    return normalizedCourseTitle === normalizedGrade;
  });
}

