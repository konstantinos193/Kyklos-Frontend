export interface Teacher {
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

export const economicsTeachers: Teacher[] = [
  {
    id: 'eco-1',
    name: 'Ζαχαρής Δημήτριος',
    title: '',
    specialization: '',
    experience: 0,
    education: 'Οικονομικό Πανεπιστήμιο Αθηνών (πρώην Α.Σ.Ο.Ε.Ε.)',
    email: '',
    phone: '',
    rating: 0,
    subjects: [],
    availability: '',
    bio: ''
  }
];


