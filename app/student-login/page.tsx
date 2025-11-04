'use client';

import { useSearchParams } from 'next/navigation';
import StudentLoginForm from '@/components/auth/student-login-form';

export default function StudentLoginPage() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/student/dashboard';

  return <StudentLoginForm redirectTo={redirectTo} />;
}
