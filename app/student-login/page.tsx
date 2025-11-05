'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import StudentLoginForm from '@/components/auth/student-login-form';

function StudentLoginInner() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/student/dashboard';
  return <StudentLoginForm redirectTo={redirectTo} />;
}

export default function StudentLoginPage() {
  return (
    <Suspense fallback={null}>
      <StudentLoginInner />
    </Suspense>
  );
}
