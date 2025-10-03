export interface DropdownItem {
  label: string;
  href: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  isActive?: boolean;
  isDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

export interface HeaderButton {
  label: string;
  variant: "outline" | "default" | "ghost";
  href?: string;
  onClick?: () => void;
}

export interface HeaderLogo {
  symbol: string;
  text: string;
  href: string;
  image?: string;
}

export interface HeaderData {
  logo: HeaderLogo;
  navigation: NavigationItem[];
  buttons: HeaderButton[];
  mobileMenuTitle: string;
}
