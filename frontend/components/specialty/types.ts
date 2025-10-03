export interface SpecialtyItem {
  id: string;
  title: string;
  href: string;
  target?: string;
  icon: string;
  isActive?: boolean;
}

export interface SpecialtyContent {
  items: SpecialtyItem[];
}
