export interface StudentImage {
  id: string;
  src: string;
  alt: string;
}

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  department: string;
}

export interface TestimonialsContent {
  title: string;
  subtitle: string;
  studentImages: StudentImage[];
  testimonials: Testimonial[];
}
