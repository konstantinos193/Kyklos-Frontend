export interface AboutContent {
  title: string;
  titleAccent: string;
  description: string[];
  cta: {
    label: string;
    href: string;
  };
}

export interface AboutImage {
  src: string;
  alt: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export interface FloatingIcon {
  icon: React.ComponentType<{ className?: string }>;
  position: 'top-right' | 'middle-left' | 'bottom-right' | 'bottom-left';
  color: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
  animation: 'bounce' | 'pulse' | 'spin' | 'ping';
  delay?: number;
}
