'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, User, Key, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StudentLoginFormProps {
  onSuccess?: (student: any) => void;
  redirectTo?: string;
}

export default function StudentLoginForm({ onSuccess, redirectTo }: StudentLoginFormProps) {
  const { toast } = useToast();
  const [uniqueKey, setUniqueKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uniqueKey.trim()) {
      setError('Please enter your student key');
      return;
    }

    // Basic format validation
    const keyPattern = /^STU-(\d{4}|\w{2,3}-\d{4})-\d{3}$/;
    if (!keyPattern.test(uniqueKey.toUpperCase())) {
      setError('Invalid student key format. Please check your key and try again.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/student-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uniqueKey: uniqueKey.toUpperCase() }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Welcome back!",
          description: `Hello ${data.student.firstName} ${data.student.lastName}`,
        });

        // Store student data in localStorage or context
        localStorage.setItem('student', JSON.stringify(data.student));
        localStorage.setItem('studentToken', data.token);

        // Call success callback
        if (onSuccess) {
          onSuccess(data.student);
        }

        // Redirect if specified
        if (redirectTo) {
          window.location.href = redirectTo;
        } else {
          // Default redirect to student dashboard
          window.location.href = '/student/dashboard';
        }
      } else {
        setError(data.message || 'Invalid student key. Please check your key and try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Unable to connect to the server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyChange = (value: string) => {
    // Auto-format the key as user types
    let formatted = value.toUpperCase();
    
    // Remove any non-alphanumeric characters except hyphens
    formatted = formatted.replace(/[^A-Z0-9-]/g, '');
    
    setUniqueKey(formatted);
    setError('');
  };

  const exampleKeys = [
    'STU-2024-001',
    'STU-ATH-2024-001',
    'STU-TH-2024-001'
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Student Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your unique student key to access your account
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Access Your Account
            </CardTitle>
            <CardDescription>
              Use the unique key provided by your teacher to log in
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
                <Label htmlFor="uniqueKey">Student Key</Label>
                <div className="relative">
                  <Input
                    id="uniqueKey"
                    type={showKey ? 'text' : 'password'}
                    value={uniqueKey}
                    onChange={(e) => handleKeyChange(e.target.value)}
                    placeholder="STU-2024-001"
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
                  Format: STU-YYYY-XXX or STU-LOC-YYYY-XXX
                </p>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !uniqueKey.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-2">Example student keys:</p>
                <div className="space-y-1">
                  {exampleKeys.map((key, index) => (
                    <div key={index} className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                      {key}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              <p>
                Don't have a student key? Contact your teacher or administrator.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Having trouble logging in?{' '}
            <a href="/contact" className="font-medium text-blue-600 hover:text-blue-500">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
