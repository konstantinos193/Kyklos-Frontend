import StudentLoginForm from '@/components/auth/student-login-form';

export default function LoginPage() {
  return <StudentLoginForm redirectTo="/student/dashboard" />;
}
