export type HoursItem = {
  label: string;
  hours: number;
  note?: string;
};

export type HoursSection = {
  title: string;
  items: HoursItem[];
};

export type HoursGroup = {
  groupTitle: string;
  sections: HoursSection[];
};

export type HoursCurriculum = HoursGroup[];


