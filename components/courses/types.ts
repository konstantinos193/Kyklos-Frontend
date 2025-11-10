export interface CourseSubject {
  name: string;
  hours: number;
  description?: string;
  icon?: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  duration: string;
  applyText?: string;
  applyHref: string;
  moreHref: string;
  subjects?: CourseSubject[];
}

export interface CoursesContent {
  title: string;
  subtitle: string;
  courses: Course[];
}
