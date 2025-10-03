export interface NewsletterFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface NewsletterContent {
  title: string;
  subtitle: string;
  description: string;
  features: NewsletterFeature[];
  privacyText: string;
  successMessage: string;
  errorMessage: string;
}
