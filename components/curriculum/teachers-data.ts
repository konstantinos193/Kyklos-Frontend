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
    id: '1',
    name: 'placeholder_name25',
    title: 'Καθηγητής Μαθηματικών',
    specialization: 'Άλγεβρα & Ανάλυση',
    experience: 20,
    education: 'Διδάκτωρ Μαθηματικών - ΕΚΠΑ',
    email: 'nikolaos.papadopoulos@kyklos.edu.gr',
    phone: '210-100-2000',
    rating: 5,
    subjects: ['Μαθηματικά', 'Άλγεβρα', 'Ανάλυση'],
    availability: 'Δευτέρα-Παρασκευή 8:00-16:00',
    bio: 'Ειδικεύεται στην άλγεβρα και ανάλυση με 20 χρόνια εμπειρία στη διδασκαλία. Έχει δημοσιεύσει πολυάριθμες εργασίες και συμμετέχει σε ερευνητικά προγράμματα. Εξαιρετικός στη διδασκαλία των πιο δύσκολων θεμάτων.'
  },
  {
    id: '2',
    name: 'placeholder_name26',
    title: 'Καθηγήτρια Μαθηματικών',
    specialization: 'Γεωμετρία & Στερεομετρία',
    experience: 16,
    education: 'Μεταπτυχιακό Μαθηματικών - ΑΠΘ',
    email: 'anastasia.georgiou@kyklos.edu.gr',
    phone: '210-300-4000',
    rating: 4,
    subjects: ['Μαθηματικά', 'Γεωμετρία', 'Στερεομετρία'],
    availability: 'Δευτέρα-Τετάρτη-Παρασκευή 9:00-17:00',
    bio: 'Ειδικευμένη στη γεωμετρία και στερεομετρία. Χρησιμοποιεί διαγραμμώσεις και οπτικά εργαλεία για καλύτερη κατανόηση των γεωμετρικών εννοιών. Εξαιρετική στη διδασκαλία με πρακτικά παραδείγματα.'
  },
  {
    id: '3',
    name: 'placeholder_name27',
    title: 'Καθηγητής Μαθηματικών',
    specialization: 'Τριγωνομετρία & Συναρτήσεις',
    experience: 13,
    education: 'Διδάκτωρ Μαθηματικών - ΕΚΠΑ',
    email: 'dimitris.konstantinou@kyklos.edu.gr',
    phone: '210-500-6000',
    rating: 5,
    subjects: ['Μαθηματικά', 'Τριγωνομετρία', 'Συναρτήσεις'],
    availability: 'Τρίτη-Πέμπτη 10:00-18:00',
    bio: 'Ειδικεύεται στην τριγωνομετρία και συναρτήσεις. Έχει αναπτύξει ιδιαίτερες μεθόδους διδασκαλίας που βοηθούν τους μαθητές να κατανοήσουν τα πιο αφηρημένα μαθηματικά θέματα.'
  },
  {
    id: '4',
    name: 'placeholder_name23',
    title: 'Καθηγήτρια Μαθηματικών',
    specialization: 'Στατιστική & Πιθανότητες',
    experience: 11,
    education: 'Μεταπτυχιακό Στατιστικής - ΑΠΘ',
    email: 'elena.antoniou@kyklos.edu.gr',
    phone: '210-700-8000',
    rating: 4,
    subjects: ['Μαθηματικά', 'Στατιστική', 'Πιθανότητες'],
    availability: 'Δευτέρα-Τετάρτη 14:00-20:00',
    bio: 'Ειδικευμένη στη στατιστική και πιθανότητες. Χρησιμοποιεί πραγματικά παραδείγματα και εργαλεία για να κάνει τα στατιστικά θέματα πιο κατανοητά και ενδιαφέροντα.'
  },
  {
    id: '5',
    name: 'placeholder_name24',
    title: 'Καθηγητής Μαθηματικών',
    specialization: 'Διαφορικές Εξισώσεις & Λογισμός',
    experience: 8,
    education: 'Διδάκτωρ Μαθηματικών - ΕΚΠΑ',
    email: 'giannis.nikolaou@kyklos.edu.gr',
    phone: '210-900-0000',
    rating: 5,
    subjects: ['Μαθηματικά', 'Διαφορικές Εξισώσεις', 'Λογισμός'],
    availability: 'Τρίτη-Πέμπτη 8:00-16:00',
    bio: 'Νέος καθηγητής με σύγχρονη προσέγγιση στη διδασκαλία. Ειδικεύεται στη λογισμό και διαφορικές εξισώσεις. Χρησιμοποιεί τεχνολογικά εργαλεία και διαδραστικές μεθόδους.'
  }
];
