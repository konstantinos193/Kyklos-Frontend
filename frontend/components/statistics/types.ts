export interface StatCard {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface TextBanner {
  text: string;
  color: 'blue' | 'magenta' | 'green';
  position: 'top' | 'middle' | 'bottom';
}

export interface StatisticsContent {
  title: string;
  subtitle?: string;
  stats: StatCard[];
  image: {
    src: string;
    alt: string;
  };
  banners: TextBanner[];
}