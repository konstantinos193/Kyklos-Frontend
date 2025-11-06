import { HoursCurriculum } from './hours-types';

export const chemistryHours: HoursCurriculum = [
  {
    groupTitle: 'Γυμνάσιο',
    sections: [
      { title: "Β' Γυμνασίου", items: [ { label: 'Χημεία', hours: 1 } ] },
      { title: "Γ' Γυμνασίου", items: [ { label: 'Χημεία', hours: 1 } ] },
    ],
  },
  {
    groupTitle: 'Λύκειο',
    sections: [
      { title: "Α' Λυκείου", items: [ { label: 'Χημεία', hours: 2 } ] },
    ],
  },
  {
    groupTitle: "Β' Λυκείου",
    sections: [
      { title: 'Θετική Κατεύθυνση', items: [ { label: "Χημεία Β' Λυκείου/Προετοιμασία Γ΄", hours: 3 } ] },
      { title: 'Υγείας', items: [ { label: "Χημεία Β' Λυκείου/Προετοιμασία Γ΄", hours: 3 } ] },
    ],
  },
  {
    groupTitle: "Γ' Λυκείου",
    sections: [
      { title: 'Θετική Κατεύθυνση', items: [ { label: 'Χημεία', hours: 4 } ] },
      { title: 'Υγείας', items: [ { label: 'Χημεία', hours: 4 } ] },
    ],
  },
];


