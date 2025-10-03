export interface Course {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  duration: string;
  applyText?: string;
  applyHref: string;
  moreHref: string;
}

export interface CoursesContent {
  title: string;
  subtitle: string;
  courses: Course[];
}
