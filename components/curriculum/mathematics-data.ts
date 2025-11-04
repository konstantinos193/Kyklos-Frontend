export type HoursItem = {
  label: string;
  hours: number;
  note?: string;
};

export type MathSection = {
  title: string;
  items: HoursItem[];
};

export type MathCurriculum = {
  groupTitle: string;
  sections: MathSection[];
};

export const mathCurriculum: MathCurriculum[] = [
  {
    groupTitle: 'Γυμνάσιο',
    sections: [
      { title: "Α' Γυμνασίου", items: [ { label: 'Μαθηματικά', hours: 3 } ] },
      { title: "Β' Γυμνασίου", items: [ { label: 'Μαθηματικά', hours: 3 } ] },
      { title: "Γ' Γυμνασίου", items: [ { label: 'Μαθηματικά', hours: 3 } ] },
    ],
  },
  {
    groupTitle: 'Λύκειο',
    sections: [
      {
        title: "Α' Λυκείου",
        items: [
          { label: 'Άλγεβρα', hours: 3 },
          { label: 'Γεωμετρία', hours: 2 },
        ],
      },
    ],
  },
  {
    groupTitle: "Β' Λυκείου",
    sections: [
      { title: 'Θετική Κατεύθυνση', items: [ { label: 'Μαθηματικά Κατεύθυνσης', hours: 2 } ] },
      { title: 'Οικονομίας & Πληροφορικής', items: [ { label: 'Μαθηματικά Κατεύθυνσης', hours: 2 } ] },
    ],
  },
  {
    groupTitle: "Γ' Λυκείου",
    sections: [
      { title: 'Θετική Κατεύθυνση', items: [ { label: 'Μαθηματικά Κατεύθυνσης', hours: 2 } ] },
      { title: 'Οικονομίας & Πληροφορικής', items: [ { label: 'Μαθηματικά Κατεύθυνσης', hours: 2 } ] },
    ],
  },
  {
    groupTitle: 'ΕΠΑΛ',
    sections: [ { title: 'ΕΠΑΛ', items: [ { label: 'Μαθηματικά', hours: 3 } ] } ],
  },
];


