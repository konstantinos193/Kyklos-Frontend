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

export const biologyTeachers: Teacher[] = [
  {
    id: '1',
    name: 'placeholder_name1',
    title: 'Καθηγήτρια Βιολογίας',
    specialization: 'Μοριακή Βιολογία & Γενετική',
    experience: 15,
    education: 'Διδάκτωρ Βιολογίας - ΕΚΠΑ',
    email: 'maria.papadopoulou@kyklos.edu.gr',
    phone: '210-123-4567',
    rating: 5,
    subjects: ['Βιολογία', 'Γενετική', 'Μοριακή Βιολογία'],
    availability: 'Δευτέρα-Παρασκευή 9:00-17:00',
    bio: 'Ειδικεύεται στη μοριακή βιολογία και γενετική με 15 χρόνια εμπειρία στη διδασκαλία. Έχει δημοσιεύσει πολυάριθμες εργασίες σε διεθνή επιστημονικά περιοδικά και συμμετέχει σε ερευνητικά προγράμματα.'
  },
  {
    id: '2',
    name: 'placeholder_name32',
    title: 'Καθηγητής Βιολογίας',
    specialization: 'Οικολογία & Περιβαλλοντική Βιολογία',
    experience: 12,
    education: 'Μεταπτυχιακό Οικολογίας - ΑΠΘ',
    email: 'konstantinos.antoniou@kyklos.edu.gr',
    phone: '210-234-5678',
    rating: 4,
    subjects: ['Βιολογία', 'Οικολογία', 'Περιβαλλοντική Βιολογία'],
    availability: 'Δευτέρα-Παρασκευή 10:00-18:00',
    bio: 'Ειδικευμένος στην οικολογία και περιβαλλοντική βιολογία. Έχει εργαστεί σε περιβαλλοντικά προγράμματα και διδάσκει με σύγχρονες μεθόδους με έμφαση στην πρακτική εφαρμογή.'
  },
  {
    id: '3',
    name: 'placeholder_name3',
    title: 'Καθηγήτρια Βιολογίας',
    specialization: 'Ανθρώπινη Βιολογία & Ανατομία',
    experience: 10,
    education: 'Διδάκτωρ Ιατρικής - ΕΚΠΑ',
    email: 'elena.dimitriou@kyklos.edu.gr',
    phone: '210-345-6789',
    rating: 5,
    subjects: ['Βιολογία', 'Ανθρώπινη Βιολογία', 'Ανατομία'],
    availability: 'Τρίτη-Πέμπτη 8:00-16:00',
    bio: 'Ιατρός με ειδίκευση στην ανατομία και φυσιολογία. Διδάσκει με πρακτικό τρόπο χρησιμοποιώντας ανατομικά μοντέλα και διαγραμμώσεις για καλύτερη κατανόηση.'
  },
  {
    id: '4',
    name: 'placeholder_name2',
    title: 'Καθηγητής Βιολογίας',
    specialization: 'Κυτταρική Βιολογία & Βιοχημεία',
    experience: 8,
    education: 'Μεταπτυχιακό Βιοχημείας - ΕΚΠΑ',
    email: 'giannis.konstantinou@kyklos.edu.gr',
    phone: '210-456-7890',
    rating: 4,
    subjects: ['Βιολογία', 'Κυτταρική Βιολογία', 'Βιοχημεία'],
    availability: 'Δευτέρα-Τετάρτη-Παρασκευή 9:00-15:00',
    bio: 'Ειδικεύεται στην κυτταρική βιολογία και βιοχημεία. Χρησιμοποιεί πειραματικές μεθόδους και διαδραστικά εργαλεία για να κάνει τη μάθηση πιο ενδιαφέρουσα και κατανοητή.'
  },
  {
    id: '5',
    name: 'placeholder_name33',
    title: 'Καθηγήτρια Βιολογίας',
    specialization: 'Βιοτεχνολογία & Μοριακή Βιολογία',
    experience: 6,
    education: 'Διδάκτωρ Βιοτεχνολογίας - ΑΠΘ',
    email: 'sofia.nikolaou@kyklos.edu.gr',
    phone: '210-567-8901',
    rating: 5,
    subjects: ['Βιολογία', 'Βιοτεχνολογία', 'Μοριακή Βιολογία'],
    availability: 'Τρίτη-Πέμπτη 14:00-20:00',
    bio: 'Νέα καθηγήτρια με σύγχρονη προσέγγιση στη διδασκαλία. Ειδικεύεται στη βιοτεχνολογία και χρησιμοποιεί τεχνολογικά εργαλεία για την παρουσίαση των θεμάτων.'
  }
];
