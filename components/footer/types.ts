export interface SocialLink {
  name: string;
  href: string;
  icon: null;
}

export interface QuickLink {
  label: string;
  href: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
  };
}

export interface FooterData {
  logo: {
    text: string;
    symbol: string;
    description: string;
    image?: string;
  };
  quickLinks: QuickLink[];
  contact: ContactInfo;
  socialLinks: SocialLink[];
  legal: {
    copyright: string;
    termsHref: string;
    privacyHref: string;
  };
}
