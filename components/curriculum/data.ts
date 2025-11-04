export interface CurriculumSubject {
  name: string;
  hours: number;
}

export interface CurriculumSection {
  title: string;
  groups: Array<{
    title?: string;
    subjects: CurriculumSubject[];
  }>;
}

// Structured from your notes (Γυμνάσιο, Λύκειο, κατευθύνσεις, ΕΠΑΛ)
export const curriculumSections: CurriculumSection[] = [
  {
    title: "Γυμνάσιο",
    groups: [
      {
        title: "Α' Γυμνασίου",
        subjects: [
          { name: "Μαθηματικά", hours: 3 },
          { name: "Φιλολογία", hours: 2 },
        ],
      },
      {
        title: "Β' Γυμνασίου",
        subjects: [
          { name: "Μαθηματικά", hours: 3 },
          { name: "Φυσική", hours: 1 },
          { name: "Χημεία", hours: 1 },
          { name: "Φιλολογία", hours: 3 },
        ],
      },
      {
        title: "Γ' Γυμνασίου",
        subjects: [
          { name: "Μαθηματικά", hours: 3 },
          { name: "Φυσική", hours: 2 },
          { name: "Χημεία", hours: 1 },
          { name: "Φιλολογία", hours: 3 },
        ],
      },
    ],
  },
  {
    title: "Α' Λυκείου",
    groups: [
      {
        subjects: [
          { name: "Άλγεβρα", hours: 3 },
          { name: "Γεωμετρία", hours: 2 },
          { name: "Φυσική", hours: 3 },
          { name: "Χημεία", hours: 2 },
          { name: "Έκθεση", hours: 2 },
          { name: "Αρχαία", hours: 2 },
        ],
      },
    ],
  },
  {
    title: "Β' Λυκείου",
    groups: [
      {
        title: "Θεωρητική",
        subjects: [
          { name: "Αρχαία (Απλό)", hours: 2 },
          { name: "Αρχαία (Πιστό)", hours: 1 },
          { name: "Ιστορία", hours: 1 },
          { name: "Λατινικά", hours: 1 },
          { name: "Έκθεση - Λογοτεχνία", hours: 2 },
        ],
      },
      {
        title: "Θετική",
        subjects: [
          { name: "Μαθηματικά Κατεύθυνσης (Β')", hours: 2 },
          { name: "Μαθηματικά Κατεύθυνσης (Γ') προετοιμασία", hours: 2 },
          { name: "Φυσική Κατεύθυνσης / Προετοιμασία Γ'", hours: 2 },
          { name: "Φυσική Γενικής / Προετοιμασία Γ'", hours: 2 },
          { name: "Χημεία Β' / Προετοιμασία Γ'", hours: 3 },
          { name: "Έκθεση - Λογοτεχνία", hours: 2 },
        ],
      },
      {
        title: "Υγείας",
        subjects: [
          { name: "Άλγεβρα", hours: 2 },
          { name: "Φυσική Κατεύθυνσης / Προετοιμασία Γ'", hours: 2 },
          { name: "Φυσική Γενικής / Προετοιμασία Γ'", hours: 2 },
          { name: "Χημεία Β' / Προετοιμασία Γ'", hours: 3 },
          { name: "Έκθεση - Λογοτεχνία", hours: 2 },
          { name: "Βιολογία", hours: 1 },
        ],
      },
      {
        title: "Οικονομίας & Πληροφορικής",
        subjects: [
          { name: "Μαθηματικά Κατεύθυνσης (Β')", hours: 2 },
          { name: "Μαθηματικά Κατεύθυνσης (Γ') προετοιμασία", hours: 2 },
          { name: "Άλγεβρα", hours: 2 },
          { name: "ΑΟΘ", hours: 1 },
          { name: "Ανάπτυξη Εφαρμογών", hours: 1 },
          { name: "Έκθεση - Λογοτεχνία", hours: 2 },
        ],
      },
      {
        title: "ΕΠΑΛ",
        subjects: [
          { name: "Άλγεβρα", hours: 2 },
          { name: "Μαθηματικά Κατεύθυνσης Γ'", hours: 1 },
          { name: "Έκθεση - Λογοτεχνία", hours: 2 },
          { name: "Μαθήματα Ειδικότητας", hours: 2 },
        ],
      },
    ],
  },
  {
    title: "Γ' Λυκείου",
    groups: [
      {
        title: "Θεωρητική",
        subjects: [
          { name: "Έκθεση - Λογοτεχνία", hours: 2 },
          { name: "Αρχαία", hours: 5 },
          { name: "Ιστορία", hours: 3 },
          { name: "Λατινικά", hours: 3 },
        ],
      },
    ],
  },
];


