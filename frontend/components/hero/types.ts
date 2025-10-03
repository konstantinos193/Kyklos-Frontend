export interface HeroTitle {
  main: string;
  subtitle: string;
}

export interface HeroDescription {
  text: string;
  highlights: {
    text: string;
    color: string;
    weight: string;
  }[];
}

export interface HeroCTA {
  label: string;
  variant: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface HeroStat {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  color: string;
}

export interface HeroSlide {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  cta: {
    label: string;
    href: string;
  };
}

export interface HeroData {
  slides: HeroSlide[];
  title: HeroTitle;
  description: HeroDescription;
  ctas: HeroCTA[];
  stats: HeroStat[];
  background: {
    gradient: string;
    overlay?: string;
  };
}
