'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  BookOpen, 
  Lock, 
  User, 
  ArrowRight,
  Shield,
  Clock
} from 'lucide-react';

export default function ThemataPanellinionPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if student is logged in
    const studentData = localStorage.getItem('student');
    const studentToken = localStorage.getItem('studentToken');

    if (studentData && studentToken) {
      // Student is logged in, redirect to exam materials
      router.push('/student/exam-materials');
    }
  }, [router]);

  const handleStudentLogin = () => {
    router.push('/student-login?redirect=/student/exam-materials');
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
          Θέματα Πανελληνίων
        </h1>
        <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-[#E7B109] to-[#D97706] rounded-full mx-auto mb-4 sm:mb-6"></div>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
          Συγκεντρωμένα θέματα και ενδεικτικές λύσεις για προετοιμασία.
        </p>
      </div>

      {/* Access Control Notice */}
      <div className="max-w-4xl mx-auto mb-12">
        <Alert className="border-amber-200 bg-amber-50">
          <Shield className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>Πρόσβαση μόνο για εγγεγραμμένους μαθητές:</strong> Για να αποκτήσετε πρόσβαση στα υλικά εξετάσεων, 
            πρέπει να συνδεθείτε με τον κωδικό μαθητή που σας έδωσε ο καθηγητής σας.
          </AlertDescription>
        </Alert>
      </div>

      {/* Login Card */}
      <div className="max-w-md mx-auto mb-12">
        <Card className="border-2 border-[#E7B109]">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-[#E7B109] rounded-full flex items-center justify-center mb-4">
              <User className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-xl">Σύνδεση Μαθητή</CardTitle>
            <CardDescription>
              Συνδεθείτε για πρόσβαση στα υλικά εξετάσεων
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleStudentLogin}
              className="w-full bg-[#E7B109] hover:bg-[#D97706] text-white"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Σύνδεση με Κωδικό Μαθητή
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Preview of Available Materials */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Διαθέσιμα Υλικά Εξετάσεων
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="relative opacity-75">
            <div className="absolute top-4 right-4">
              <Lock className="w-5 h-5 text-gray-400" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Γλώσσα & Λογοτεχνία
              </CardTitle>
              <CardDescription>Θέματα προηγούμενων ετών και ύλη</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>2020-2024</span>
                </div>
                <p>Θέματα, λύσεις και αναλυτικές εξηγήσεις</p>
              </div>
            </CardContent>
          </Card>

          <Card className="relative opacity-75">
            <div className="absolute top-4 right-4">
              <Lock className="w-5 h-5 text-gray-400" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-600" />
                Μαθηματικά
              </CardTitle>
              <CardDescription>Ενότητες, εκφωνήσεις και λύσεις</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>2020-2024</span>
                </div>
                <p>Πλήρη ύλη με βήμα-βήμα λύσεις</p>
              </div>
            </CardContent>
          </Card>

          <Card className="relative opacity-75">
            <div className="absolute top-4 right-4">
              <Lock className="w-5 h-5 text-gray-400" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-600" />
                Θετικές Επιστήμες
              </CardTitle>
              <CardDescription>Φυσική, Χημεία, Βιολογία</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>2020-2024</span>
                </div>
                <p>Εξειδικευμένα υλικά για κάθε μάθημα</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            Δεν έχετε κωδικό μαθητή; Επικοινωνήστε με το φροντιστήριο.
          </p>
          <Button 
            variant="outline" 
            onClick={() => router.push('/contact')}
            className="text-[#E7B109] border-[#E7B109] hover:bg-[#E7B109] hover:text-white"
          >
            Επικοινωνία
          </Button>
        </div>
      </div>
    </main>
  );
}


