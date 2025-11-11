export interface Subject {
  name: string;
  hours: number;
  description: string;
  icon: string;
}

export interface ProgramLevel {
  id: string;
  name: string;
  description: string;
  duration: string;
  subjects: Subject[];
  totalHours: number;
  color: "blue" | "green" | "purple" | "yellow" | "red" | "indigo";
}

export interface ProgramFeature {
  title: string;
  description: string;
  icon: string;
}

export interface ProgramCTA {
  label: string;
  href: string;
  description: string;
}

export interface ProgramData {
  title: string;
  subtitle: string;
  background: {
    gradient: string;
  };
  levels: ProgramLevel[];
  features: ProgramFeature[];
  cta: ProgramCTA;
}