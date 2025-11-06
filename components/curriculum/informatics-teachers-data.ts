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

export const informaticsTeachers: Teacher[] = [
  {
    id: 'inf-1',
    name: 'Ρίζου Δέσποινα',
    title: '',
    specialization: '',
    experience: 0,
    education: 'Τμήμα Επιστήμης Υπολογιστών Ιωαννίνων',
    email: '',
    phone: '',
    rating: 0,
    subjects: [],
    availability: '',
    bio: ''
  }
];


