import { HoursCurriculum } from './hours-types';

export const physicsHours: HoursCurriculum = [
  {
    groupTitle: 'Γυμνάσιο',
    sections: [
      { title: "Β' Γυμνασίου", items: [ { label: 'Φυσική', hours: 1 } ] },
      { title: "Γ' Γυμνασίου", items: [ { label: 'Φυσική', hours: 4 } ] },
    ],
  },
  {
    groupTitle: 'Λύκειο',
    sections: [
      { title: "Α' Λυκείου", items: [ { label: 'Φυσική', hours: 3 } ] },
    ],
  },
  {
    groupTitle: "Β' Λυκείου",
    sections: [
      { title: 'Θετική Κατεύθυνση', items: [ { label: 'Φυσική Κατεύθυνσης', hours: 2 }, { label: 'Φυσική Γενικής/Προετοιμασία Γ΄', hours: 2 } ] },
      { title: 'Υγείας', items: [ { label: 'Φυσική Κατεύθυνσης', hours: 2 }, { label: 'Φυσική Γενικής/Προετοιμασία Γ΄', hours: 2 } ] },
    ],
  },
  {
    groupTitle: "Γ' Λυκείου",
    sections: [
      { title: 'Θετική Κατεύθυνση', items: [ { label: 'Φυσική', hours: 4 } ] },
      { title: 'Υγείας', items: [ { label: 'Φυσική', hours: 4 } ] },
    ],
  },
];


