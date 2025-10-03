import StudentLoginForm from '@/components/auth/student-login-form';

export const metadata = {
  title: 'Student Login - ΚΥΚΛΟΣ Φροντιστήριο',
  description: 'Login to your student account using your unique student key',
};

export default function StudentLoginPage() {
  return <StudentLoginForm />;
}
