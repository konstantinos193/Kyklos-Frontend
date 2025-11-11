'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, User, Key, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getApiUrl } from '@/lib/api-url';

interface StudentLoginFormProps {
  onSuccess?: (student: any) => void;
  redirectTo?: string;
}

export default function StudentLoginForm({ onSuccess, redirectTo }: StudentLoginFormProps) {
  const { toast } = useToast();
  const [studentId, setStudentId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentId.trim()) {
      setError('Παρακαλώ εισαγάγετε τον κωδικό μαθητή');
      return;
    }

    // Allow alphanumeric IDs like S12345, 2025-001, etc. Keep it permissive but length-checked
    const idPattern = /^[A-Z0-9-]{3,20}$/i;
    if (!idPattern.test(studentId)) {
      setError('Μη έγκυρη μορφή κωδικού μαθητή. Επιτρέπονται γράμματα/αριθμοί και παύλες.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${getApiUrl()}/api/auth/student-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId: studentId.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle error responses
        setError(data.message || 'Μη έγκυρος κωδικός μαθητή. Ελέγξτε και δοκιμάστε ξανά.');
        return;
      }

      if (data.success) {
        toast({
          title: "Καλώς ήρθατε!",
          description: `${data.student.firstName} ${data.student.lastName}`,
        });

        // IMPORTANT: Clear any admin tokens to prevent cross-contamination
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');
        localStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('adminToken');
        sessionStorage.removeItem('adminInfo');
        sessionStorage.removeItem('adminLoggedIn');

        // Store student data in localStorage or context
        localStorage.setItem('student', JSON.stringify(data.student));
        localStorage.setItem('studentToken', data.token);

        // Call success callback
        if (onSuccess) {
          onSuccess(data.student);
        }

        // Redirect if specified - use window.location.replace to prevent back button issues
        if (redirectTo) {
          window.location.replace(redirectTo);
        } else {
          // Default redirect to student dashboard
          window.location.replace('/student/dashboard');
        }
      } else {
        setError(data.message || 'Μη έγκυρος κωδικός μαθητή. Ελέγξτε και δοκιμάστε ξανά.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Δεν ήταν δυνατή η σύνδεση με τον διακομιστή. Δοκιμάστε αργότερα.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleIdChange = (value: string) => {
    let formatted = value.toUpperCase().replace(/[^A-Z0-9-]/g, '');
    setStudentId(formatted);
    setError('');
  };

  // examples removed per request

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </div>
          <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-extrabold text-gray-900">
            Σύνδεση Μαθητή
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Εισαγάγετε τον κωδικό μαθητή για πρόσβαση στον λογαριασμό σας
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Πρόσβαση στον Λογαριασμό
            </CardTitle>
            <CardDescription>
              Χρησιμοποιήστε τον κωδικό που σας έδωσε ο καθηγητής σας
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="studentId">Κωδικός Μαθητή</Label>
                <div className="relative">
                  <Input
                    id="studentId"
                    type={showKey ? 'text' : 'password'}
                    value={studentId}
                    onChange={(e) => handleIdChange(e.target.value)}
                    placeholder="Κωδικός Μαθητή"
                    className="pr-10 font-mono"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowKey(!showKey)}
                    disabled={isLoading}
                  >
                    {showKey ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Εισαγάγετε τον κωδικό μαθητή που σας δόθηκε από το φροντιστήριο
                </p>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !studentId.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Γίνεται σύνδεση...
                  </>
                ) : (
                  <>
                    Σύνδεση
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Παραλείπονται παραδείγματα κωδικών */}

            <div className="mt-4 text-xs text-gray-500">
            <p>
                Δεν έχετε κωδικό μαθητή; Επικοινωνήστε με το φροντιστήριο.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Έχετε πρόβλημα με τη σύνδεση;{' '}
            <a href="/contact" className="font-medium text-blue-600 hover:text-blue-500">
              Επικοινωνήστε με την υποστήριξη
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
