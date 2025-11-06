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

export const physicsTeachers: Teacher[] = [
  {
    id: 'phys-1',
    name: 'Μήτσιος Κωνσταντίνος',
    title: '',
    specialization: '',
    experience: 0,
    education: 'Τμήμα Φυσικής Πανεπιστήμιο Ιωαννίνων',
    email: '',
    phone: '',
    rating: 0,
    subjects: [],
    availability: '',
    bio: ''
  },
  {
    id: 'phys-2',
    name: 'Κολιούλης Κωνσταντίνος',
    title: '',
    specialization: '',
    experience: 0,
    education: 'Τμήμα Φυσικής Πανεπιστήμιο Ιωαννίνων — Μεταπτυχιακό στην Ειδική Εκπαίδευση - Πανεπιστήμιο Frederick Κύπρος',
    email: '',
    phone: '',
    rating: 0,
    subjects: [],
    availability: '',
    bio: ''
  },
  {
    id: 'phys-3',
    name: 'Σταμούλης Φάνης',
    title: '',
    specialization: '',
    experience: 0,
    education: 'Τμήμα Φυσικής Ε.Κ.Π.Α. — Μεταπτυχιακό Φυσικής Περιβάλλοντος Α.Π.Θ.',
    email: '',
    phone: '',
    rating: 0,
    subjects: [],
    availability: '',
    bio: ''
  }
];
