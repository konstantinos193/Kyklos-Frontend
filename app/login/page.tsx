import type { Metadata } from 'next';
import StudentLoginForm from '@/components/auth/student-login-form';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Είσοδος Μαθητή | ΚΥΚΛΟΣ',
  description: 'Σελίδα εισόδου μαθητών στην πλατφόρμα του φροντιστηρίου ΚΥΚΛΟΣ.',
  path: '/login',
  type: 'website',
  noindex: true,
});

export default function LoginPage() {
  return <StudentLoginForm redirectTo="/student/dashboard" />;
}
