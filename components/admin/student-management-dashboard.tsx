'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  Users,
  GraduationCap,
  UserCheck,
  UserX,
  Calendar,
  Mail,
  Phone
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';
import StudentRegistrationForm from './student-registration-form';

interface Student {
  _id: string;
  uniqueKey: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  grade: string;
  school: string;
  status: 'active' | 'inactive' | 'graduated' | 'suspended';
  registrationDate: string;
  subjects: string[];
  parentName: string;
  parentPhone: string;
  parentEmail?: string;
  notes?: string;
}

interface StudentStats {
  totalStudents: number;
  activeStudents: number;
  graduatedStudents: number;
  recentRegistrations: number;
  studentsByGrade: Array<{ _id: string; count: number }>;
  studentsByStatus: Array<{ _id: string; count: number }>;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalStudents: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function StudentManagementDashboard() {
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [stats, setStats] = useState<StudentStats | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  
  // Filters
  const [filters, setFilters] = useState({
    search: '',
    grade: 'all',
    status: 'all',
    page: 1,
    limit: 20,
    sortBy: 'registrationDate',
    sortOrder: 'desc'
  });

  // Load students and stats
  useEffect(() => {
    loadStudents();
    loadStats();
  }, [filters]);

  const loadStudents = async () => {
    setIsLoading(true);
    try {
      const effectiveFilters: any = { ...filters };
      if (effectiveFilters.grade === 'all') delete effectiveFilters.grade;
      if (effectiveFilters.status === 'all') delete effectiveFilters.status;

      const { data } = await api.get('/api/admin/students', { params: effectiveFilters });

      if (data.success) {
        setStudents(data.data.students);
        setPagination(data.data.pagination);
      } else {
        toast({
          title: "Σφάλμα",
          description: data.message || "Αποτυχία φόρτωσης μαθητών",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error loading students:', error);
      toast({
        title: "Σφάλμα",
        description: "Αποτυχία φόρτωσης μαθητών. Προσπάθησε ξανά.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const { data } = await api.get('/api/admin/students/stats/overview');

      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filtering
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const handleDeleteStudent = async (studentId: string) => {
    if (!confirm('Σίγουρα θέλεις να διαγράψεις αυτόν τον μαθητή; Η ενέργεια δεν αναιρείται.')) {
      return;
    }

    try {
      const { data } = await api.delete(`/api/admin/students/${studentId}`);

      if (data.success) {
        toast({
        title: "Επιτυχία",
        description: "Ο μαθητής διαγράφηκε επιτυχώς"
        });
        loadStudents();
        loadStats();
      } else {
        toast({
        title: "Σφάλμα",
        description: data.message || "Αποτυχία διαγραφής μαθητή",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      toast({
      title: "Σφάλμα",
      description: "Αποτυχία διαγραφής μαθητή. Προσπάθησε ξανά.",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: 'default' as const, label: 'Active', icon: UserCheck },
      inactive: { variant: 'secondary' as const, label: 'Inactive', icon: UserX },
      graduated: { variant: 'outline' as const, label: 'Graduated', icon: GraduationCap },
      suspended: { variant: 'destructive' as const, label: 'Suspended', icon: UserX }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('el-GR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Σύνολο Μαθητών</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ενεργοί Μαθητές</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.activeStudents}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Απόφοιτοι</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.graduatedStudents}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Πρόσφατοι (30 ημέρες)</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.recentRegistrations}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Διαχείριση Μαθητών</CardTitle>
              <CardDescription>Διαχείριση εγγραφών και στοιχείων μαθητών</CardDescription>
            </div>
            <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Εγγραφή Νέου Μαθητή
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:!max-w-[95vw] !max-w-[95vw] !w-[95vw] max-h-[95vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Εγγραφή Νέου Μαθητή</DialogTitle>
                  <DialogDescription>
                    Καταχώριση νέου μαθητή με μοναδικό κωδικό που δημιουργείται αυτόματα.
                  </DialogDescription>
                </DialogHeader>
                <StudentRegistrationForm onSuccess={() => {
                  setIsRegistrationOpen(false);
                  loadStudents();
                  loadStats();
                }} />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search">Αναζήτηση</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Αναζήτηση με όνομα, email ή κωδικό..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="sm:w-48">
              <Label htmlFor="grade">Τάξη</Label>
              <Select value={filters.grade} onValueChange={(value) => handleFilterChange('grade', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Όλες οι τάξεις" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Όλες οι τάξεις</SelectItem>
                  <SelectItem value="Γ Λυκείου">Γ Λυκείου</SelectItem>
                  <SelectItem value="Β Λυκείου">Β Λυκείου</SelectItem>
                  <SelectItem value="Α Λυκείου">Α Λυκείου</SelectItem>
                  <SelectItem value="Γ Γυμνασίου">Γ Γυμνασίου</SelectItem>
                  <SelectItem value="Β Γυμνασίου">Β Γυμνασίου</SelectItem>
                  <SelectItem value="Α Γυμνασίου">Α Γυμνασίου</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="sm:w-48">
              <Label htmlFor="status">Κατάσταση</Label>
              <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Όλες οι καταστάσεις" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Όλες οι καταστάσεις</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="graduated">Graduated</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Students Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Κωδικός Μαθητή</TableHead>
                  <TableHead>Ονοματεπώνυμο</TableHead>
                  <TableHead>Τάξη</TableHead>
                  <TableHead>Σχολείο</TableHead>
                  <TableHead>Κατάσταση</TableHead>
                  <TableHead>Ημερομηνία Εγγραφής</TableHead>
                  <TableHead>Ενέργειες</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                        <span className="ml-2">Φόρτωση μαθητών...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : students.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Δεν βρέθηκαν μαθητές
                    </TableCell>
                  </TableRow>
                ) : (
                  students.map((student) => (
                    <TableRow key={student._id}>
                      <TableCell className="font-mono text-sm">
                        {student.uniqueKey}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{student.firstName} {student.lastName}</div>
                          <div className="text-sm text-muted-foreground">{student.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{student.school}</TableCell>
                      <TableCell>{getStatusBadge(student.status)}</TableCell>
                      <TableCell>{formatDate(student.registrationDate)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedStudent(student)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {/* TODO: Edit student */}}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteStudent(student._id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Εμφάνιση {((pagination.currentPage - 1) * filters.limit) + 1} έως{' '}
                {Math.min(pagination.currentPage * filters.limit, pagination.totalStudents)} από{' '}
                {pagination.totalStudents} μαθητές
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Προηγούμενη
                </Button>
                <span className="text-sm">
                  Σελίδα {pagination.currentPage} από {pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                >
                  Επόμενη
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Student Details Modal */}
      {selectedStudent && (
        <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Student Details</DialogTitle>
              <DialogDescription>
                Complete information for {selectedStudent.firstName} {selectedStudent.lastName}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Student Key</Label>
                  <div className="font-mono text-sm bg-gray-100 p-2 rounded">
                    {selectedStudent.uniqueKey}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="mt-1">
                    {getStatusBadge(selectedStudent.status)}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4" />
                    {selectedStudent.email}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Phone</Label>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4" />
                    {selectedStudent.phone}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Grade</Label>
                  <div className="text-sm">{selectedStudent.grade}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium">School</Label>
                  <div className="text-sm">{selectedStudent.school}</div>
                </div>
              </div>
              
              {selectedStudent.subjects.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Subjects</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedStudent.subjects.map((subject) => (
                      <Badge key={subject} variant="secondary" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <Label className="text-sm font-medium">Parent Information</Label>
                <div className="text-sm space-y-1">
                  <div>Name: {selectedStudent.parentName}</div>
                  <div>Phone: {selectedStudent.parentPhone}</div>
                  {selectedStudent.parentEmail && (
                    <div>Email: {selectedStudent.parentEmail}</div>
                  )}
                </div>
              </div>
              
              {selectedStudent.notes && (
                <div>
                  <Label className="text-sm font-medium">Notes</Label>
                  <div className="text-sm bg-gray-50 p-2 rounded">
                    {selectedStudent.notes}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
