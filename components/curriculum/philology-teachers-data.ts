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

export const philologyTeachers: Teacher[] = [
  {
    id: 'phil-1',
    name: 'Παππά Δώρα',
    title: '',
    specialization: '',
    experience: 0,
    education: 'Τμήμα Φιλοσοφικής Ιωαννίνων',
    email: '',
    phone: '',
    rating: 0,
    subjects: ['Αρχαία', 'Έκθεση - Λογοτεχνία', 'Ιστορία', 'Λατινικά'],
    availability: '',
    bio: ''
  },
  {
    id: 'phil-2',
    name: 'Μπισκανάκη Βασιλική',
    title: '',
    specialization: '',
    experience: 0,
    education: 'Τμήμα Φιλολογίας Α.Π.Θ.',
    email: '',
    phone: '',
    rating: 0,
    subjects: ['Αρχαία', 'Έκθεση - Λογοτεχνία', 'Ιστορία', 'Λατινικά'],
    availability: '',
    bio: ''
  }
];


