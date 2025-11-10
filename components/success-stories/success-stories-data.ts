export interface SuccessStory {
  id: string;
  studentName: string;
  university: string;
  ranking: string;
  scores: {
    subject: string;
    score: number;
  }[];
  question: string;
  answer: string;
  image: string;
}

export const successStories: SuccessStory[] = [
  {
    id: '1',
    studentName: 'Μαρια Παπαδωπουλου',
    university: 'Ιατρική Θεσσαλονίκης',
    ranking: '1η στον τομέα Υγείας',
    scores: [
      { subject: 'Έκθεση', score: 17.6 },
      { subject: 'Φυσική', score: 19.6 },
      { subject: 'Χημεία', score: 19.9 },
      { subject: 'Βιολογία', score: 19.2 }
    ],
    question: 'Ποιο ήταν το πρώτο σου συναίσθημα όταν είδες τα αποτελέσματα;',
    answer: 'Ένιωσα μεγάλη ικανοποίηση αφού ανταμείφθηκαν οι κόποι όλων αυτών των χρόνων και πραγματοποιήθηκε ένα μεγάλο μου όνειρο.',
    image: '/mariapapadopoulou.png'
  },
  {
    id: '2',
    studentName: 'Μαρια Παπαδωπουλου',
    university: 'Ιατρική Θεσσαλονίκης',
    ranking: '1η στον τομέα Υγείας',
    scores: [],
    question: 'Ποια συμβουλή θα έδινες σε ένα μαθητή που ξεκινά τώρα την προετοιμασία;',
    answer: 'Θεωρώ πως είναι πολύ σημαντικό να υπάρχει πρόγραμμα. Είναι απαραίτητο και το πολύωρο διάβασμα, αλλά και δραστηριότητες που επιδρούν θετικά στην ψυχολογία μας.',
    image: '/mariapapadopoulou.png'
  },
  {
    id: '3',
    studentName: 'Μαρια Παπαδωπουλου',
    university: 'Ιατρική Θεσσαλονίκης',
    ranking: '1η στον τομέα Υγείας',
    scores: [],
    question: 'Από ποια χρονιά ξεκίνησες να διαβάζεις οργανωμένα ώστε να πετύχεις το στόχο σου και ποιοι σε βοήθησαν σε αυτό;',
    answer: 'Προσωπικά ξεκίνησα να διαβάζω συστηματικά ήδη από την Α\' Λυκείου και οι ώρες διαβάσματος αυξήθηκαν σταδιακά τα επόμενα χρόνια. Στην προσπάθειά μου όλα αυτά τα χρόνια με στήριξαν η οικογένειά μου και οι καθηγητές μου στο φροντιστήριο.',
    image: '/mariapapadopoulou.png'
  },
  {
    id: '4',
    studentName: 'Μαρια Παπαδωπουλου',
    university: 'Ιατρική Θεσσαλονίκης',
    ranking: '1η στον τομέα Υγείας',
    scores: [],
    question: 'Περιέγραψέ μας το φροντιστήριο με τρεις λέξεις.',
    answer: 'Στήριξη, καθοδήγηση, δέσιμο.',
    image: '/mariapapadopoulou.png'
  },
  {
    id: '5',
    studentName: 'Μαρια Παπαδωπουλου',
    university: 'Ιατρική Θεσσαλονίκης',
    ranking: '1η στον τομέα Υγείας',
    scores: [],
    question: 'Ποια είναι τα όνειρά σου για το μέλλον;',
    answer: 'Όνειρό μου είναι να ασχοληθώ με το κομμάτι της έρευνας και να συμμετέχω σε εθελοντικές δράσεις ως γιατρός.',
    image: '/mariapapadopoulou.png'
  }
];
