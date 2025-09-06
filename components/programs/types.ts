export interface ProgramFeature {
  name: string;
  description?: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  features: ProgramFeature[];
  price?: {
    amount: string;
    period: string;
  };
  duration?: string;
  level: "beginner" | "intermediate" | "advanced" | "all";
  isPopular?: boolean;
}

export interface ProgramsSectionData {
  header: {
    title: string;
    subtitle: string;
    description: string;
  };
  programs: Program[];
  cta: {
    label: string;
    href: string;
  };
  background: {
    gradient: string;
  };
}
