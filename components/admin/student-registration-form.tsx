'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, UserPlus, GraduationCap, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';

interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  grade: string;
  school: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  subjects: string[];
  location: string;
  notes: string;
}

// Removed key preview feature

const SUBJECTS = [
  'Ελληνική Γλώσσα',
  'Αρχαία Ελληνικά',
  'Λατινικά',
  'Ιστορία',
  'Φιλοσοφία',
  'Μαθηματικά',
  'Φυσική',
  'Χημεία',
  'Βιολογία',
  'Οικονομικά',
  'Πληροφορική'
];

import GRADES from '@/constants/grades';

interface StudentRegistrationFormProps {
  onSuccess?: () => void;
}

export default function StudentRegistrationForm({ onSuccess }: StudentRegistrationFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    grade: '',
    school: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    subjects: [],
    location: 'none',
    notes: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Removed key preview logic

  const handleInputChange = (field: keyof StudentFormData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^(\+30|0030)?[0-9]{10}$/.test(formData.phone)) newErrors.phone = 'Invalid Greek phone number';
    
    if (!formData.grade) newErrors.grade = 'Grade is required';
    if (!formData.school.trim()) newErrors.school = 'School is required';
    if (!formData.parentName.trim()) newErrors.parentName = 'Parent name is required';
    if (!formData.parentPhone.trim()) newErrors.parentPhone = 'Parent phone is required';
    else if (!/^(\+30|0030)?[0-9]{10}$/.test(formData.parentPhone)) newErrors.parentPhone = 'Invalid Greek phone number';
    
    if (formData.parentEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail)) {
      newErrors.parentEmail = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before submitting",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { data } = await api.post('/api/admin/students', formData);

      if (data.success) {
        toast({
          title: "Success!",
          description: `Student ${data.data.firstName} ${data.data.lastName} registered with key: ${data.data.uniqueKey}`,
        });
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          grade: '',
          school: '',
          parentName: '',
          parentPhone: '',
          parentEmail: '',
          subjects: [],
          location: 'none',
          notes: ''
        });
        // no-op
        
        // Call success callback
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to register student",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error registering student:', error);
      toast({
        title: "Error",
        description: "Failed to register student. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-full mx-auto p-2 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Εγγραφή Νέου Μαθητή
          </CardTitle>
          <CardDescription>
            Καταχώριση νέου μαθητή με μοναδικό κωδικό που δημιουργείται αυτόματα.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Key Preview removed per request */}

            {/* Main Form Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              {/* Left Column - Student Information */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                      <UserPlus className="h-5 w-5" />
                      Στοιχεία Μαθητή
                    </CardTitle>
                    <CardDescription>
                      Βασικές πληροφορίες για τον μαθητή
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Όνομα *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="Εισάγετε το όνομα"
                          className={errors.firstName ? 'border-red-500' : ''}
                        />
                        {errors.firstName && (
                          <p className="text-sm text-red-500">{errors.firstName}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">Επώνυμο *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Εισάγετε το επώνυμο"
                          className={errors.lastName ? 'border-red-500' : ''}
                        />
                        {errors.lastName && (
                          <p className="text-sm text-red-500">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="example@email.com"
                          className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Τηλέφωνο *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+30 123 456 7890"
                          className={errors.phone ? 'border-red-500' : ''}
                        />
                        {errors.phone && (
                          <p className="text-sm text-red-500">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="grade">Τάξη *</Label>
                        <Select value={formData.grade} onValueChange={(value) => handleInputChange('grade', value)}>
                          <SelectTrigger className={errors.grade ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Επιλέξτε τάξη" />
                          </SelectTrigger>
                          <SelectContent>
                            {GRADES.map((grade) => (
                              <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.grade && (
                          <p className="text-sm text-red-500">{errors.grade}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="school">Σχολείο *</Label>
                        <Input
                          id="school"
                          value={formData.school}
                          onChange={(e) => handleInputChange('school', e.target.value)}
                          placeholder="Εισάγετε το σχολείο"
                          className={errors.school ? 'border-red-500' : ''}
                        />
                        {errors.school && (
                          <p className="text-sm text-red-500">{errors.school}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

              </div>

              {/* Middle Column - Parent Information */}
              <div className="space-y-6">
                {/* Parent/Guardian Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                      <UserPlus className="h-5 w-5" />
                      Στοιχεία Γονέα/Κηδεμόνα
                    </CardTitle>
                    <CardDescription>
                      Πληροφορίες επικοινωνίας με τον γονέα
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="parentName">Όνομα Γονέα *</Label>
                        <Input
                          id="parentName"
                          value={formData.parentName}
                          onChange={(e) => handleInputChange('parentName', e.target.value)}
                          placeholder="Εισάγετε το όνομα του γονέα"
                          className={errors.parentName ? 'border-red-500' : ''}
                        />
                        {errors.parentName && (
                          <p className="text-sm text-red-500">{errors.parentName}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="parentPhone">Τηλέφωνο Γονέα *</Label>
                        <Input
                          id="parentPhone"
                          value={formData.parentPhone}
                          onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                          placeholder="+30 123 456 7890"
                          className={errors.parentPhone ? 'border-red-500' : ''}
                        />
                        {errors.parentPhone && (
                          <p className="text-sm text-red-500">{errors.parentPhone}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="parentEmail">Email Γονέα (Προαιρετικό)</Label>
                        <Input
                          id="parentEmail"
                          type="email"
                          value={formData.parentEmail}
                          onChange={(e) => handleInputChange('parentEmail', e.target.value)}
                          placeholder="parent@email.com"
                          className={errors.parentEmail ? 'border-red-500' : ''}
                        />
                        {errors.parentEmail && (
                          <p className="text-sm text-red-500">{errors.parentEmail}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Additional Information */}
              <div className="space-y-6">
                {/* Location and Subjects */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Επιπλέον Πληροφορίες
                    </CardTitle>
                    <CardDescription>
                      Τοποθεσία και μαθήματα
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Τοποθεσία</Label>
                      <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Επιλέξτε τοποθεσία" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Κανένα</SelectItem>
                          <SelectItem value="ATH">Αθήνα</SelectItem>
                          <SelectItem value="TH">Θεσσαλονίκη</SelectItem>
                          <SelectItem value="PAT">Πάτρα</SelectItem>
                          <SelectItem value="HER">Ηράκλειο</SelectItem>
                          <SelectItem value="LAR">Λάρισα</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>Μαθήματα (Προαιρετικό)</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {SUBJECTS.map((subject) => (
                          <div key={subject} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <input
                              type="checkbox"
                              id={subject}
                              checked={formData.subjects.includes(subject)}
                              onChange={() => handleSubjectToggle(subject)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <Label htmlFor={subject} className="text-sm font-normal cursor-pointer flex-1">
                              {subject}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Notes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Σημειώσεις
                    </CardTitle>
                    <CardDescription>
                      Επιπλέον σχόλια ή σημειώσεις
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Σημειώσεις (Προαιρετικό)</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        placeholder="Εισάγετε οποιεσδήποτε σημειώσεις..."
                        rows={6}
                        className={errors.notes ? 'border-red-500' : ''}
                      />
                      {errors.notes && (
                        <p className="text-sm text-red-500">{errors.notes}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Submit Buttons */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-end space-x-3">
                  <Button type="button" variant="outline" onClick={() => onSuccess?.()} size="lg">
                    Ακύρωση
                  </Button>
                  <Button type="submit" disabled={isLoading} size="lg" className="min-w-[160px]">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Καταχώριση...
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Καταχώριση Μαθητή
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}