import { HoursCurriculum } from './hours-types';

export const ancientGreekHours: HoursCurriculum = [
  {
    groupTitle: 'Λύκειο',
    sections: [
      { title: "Α' Λυκείου", items: [ { label: 'Αρχαία', hours: 2 } ] },
    ],
  },
  {
    groupTitle: "Β' Λυκείου",
    sections: [
      { title: 'Θεωρητική', items: [ { label: "Αρχαία Α' Μέρος", hours: 2 }, { label: "Αρχαία Β' Μέρος", hours: 1 } ] },
    ],
  },
  {
    groupTitle: "Γ' Λυκείου",
    sections: [
      { title: 'Θεωρητική', items: [ { label: 'Αρχαία', hours: 5 } ] },
    ],
  },
];


