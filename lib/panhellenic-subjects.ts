// All supported subjects for panhellenic archive
export type ArchiveSubject = 
  | 'math' 
  | 'physics' 
  | 'ximia' 
  | 'biology'
  | 'greek-literature'
  | 'ancient-greek'
  | 'history'
  | 'latin'
  | 'economics'
  | 'informatics'
  | 'algebra'
  | 'geometry';

export const SUBJECT_LABELS: Record<ArchiveSubject, string> = {
  'math': 'Μαθηματικά',
  'physics': 'Φυσική',
  'ximia': 'Χημεία',
  'biology': 'Βιολογία',
  'greek-literature': 'Έκθεση - Λογοτεχνία',
  'ancient-greek': 'Αρχαία',
  'history': 'Ιστορία',
  'latin': 'Λατινικά',
  'economics': 'ΑΟΘ / Οικονομικά',
  'informatics': 'Πληροφορική',
  'algebra': 'Άλγεβρα',
  'geometry': 'Γεωμετρία',
};

export const SUBJECT_ORDER: ArchiveSubject[] = [
  'math',
  'algebra',
  'geometry',
  'physics',
  'ximia',
  'biology',
  'greek-literature',
  'ancient-greek',
  'history',
  'latin',
  'economics',
  'informatics',
];

