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

export const mathematicsTeachers: Teacher[] = [
  {
    id: 'math-1',
    name: 'Κολιούλης Δημήτριος',
    title: '',
    specialization: '',
    experience: 0,
    education: 'Τμήμα Μαθηματικών Ε.Κ.Π.Α.',
    email: '',
    phone: '',
    rating: 0,
    subjects: [],
    availability: '',
    bio: ''
  },
  {
    id: 'math-2',
    name: 'Στάμος Ευάγγελος',
    title: '',
    specialization: '',
    experience: 0,
    education: 'Τμήμα Μαθηματικών Α.Π.Θ.',
    email: '',
    phone: '',
    rating: 0,
    subjects: [],
    availability: '',
    bio: ''
  },
  {
    id: 'math-3',
    name: 'Κολιούλη Αλίκη',
    title: '',
    specialization: '',
    experience: 0,
    education: 'Τμήμα Μαθηματικών Πανεπιστημίου Πατρών — Μεταπτυχιακό στην Ειδική Εκπαίδευση - Πανεπιστήμιο Frederick Κύπρος',
    email: '',
    phone: '',
    rating: 0,
    subjects: [],
    availability: '',
    bio: ''
  },
  {
    id: 'math-4',
    name: 'Καλτσώνης Ανδρέας',
    title: '',
    specialization: '',
    experience: 0,
    education: 'Τμήμα Μαθηματικών Α.Π.Θ.',
    email: '',
    phone: '',
    rating: 0,
    subjects: [],
    availability: '',
    bio: ''
  },
  {
    id: 'math-5',
    name: 'Μπισκονάκη Μαρία',
    title: '',
    specialization: '',
    experience: 0,
    education: 'Τμήμα Μαθηματικών Α.Π.Θ.',
    email: '',
    phone: '',
    rating: 0,
    subjects: [],
    availability: '',
    bio: ''
  }
];
