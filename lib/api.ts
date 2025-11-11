import axios from 'axios';
import { getApiUrl } from './api-url';
import TokenManager from './token-manager';

// Lazy initialization of API client to avoid build-time errors
let apiClient: ReturnType<typeof axios.create> | null = null;

function getApiClient() {
  if (!apiClient) {
    const API_BASE_URL = getApiUrl();
    apiClient = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000, // 10 seconds timeout
      headers: {
        'Content-Type': 'application/json',
      },
      // Enable request/response compression
      decompress: true,
    });
    
    // Set up interceptors
    setupInterceptors(apiClient);
  }
  return apiClient;
}

// Track if we're currently refreshing a token to prevent multiple refresh attempts
let isRefreshingAdmin = false;
let isRefreshingStudent = false;
let failedAdminQueue: Array<{ resolve: (value?: any) => void; reject: (reason?: any) => void }> = [];
let failedStudentQueue: Array<{ resolve: (value?: any) => void; reject: (reason?: any) => void }> = [];

function setupInterceptors(client: ReturnType<typeof axios.create>) {
  // Request interceptor for authentication and optimization
  client.interceptors.request.use(
    async (config) => {
      // Add authentication token - check for both admin and student tokens
      if (typeof window !== 'undefined') {
        // Check if this is an admin API call or student API call
        const isAdminAPI = config.url?.includes('/api/admin/') || 
                          config.url?.includes('/api/teacher-permissions') ||
                          config.url?.includes('/api/exercises/teacher') ||
                          config.url?.includes('/api/exam-materials/admin') ||
                          config.url?.includes('/api/panhellenic-archive') ||
                          (config.url?.includes('/api/news') && ['post', 'put', 'delete'].includes(config.method?.toLowerCase() || ''));
        
        const isStudentAPI = config.url?.includes('/api/exercises/student') ||
                            (config.url?.includes('/api/exam-materials') && !config.url?.includes('/admin'));
        
        // Skip token refresh for refresh endpoints to avoid loops
        const isRefreshEndpoint = config.url?.includes('/auth/refresh') || config.url?.includes('/student-refresh');
        
        if (isAdminAPI && !isRefreshEndpoint) {
          // Check and refresh admin token if needed
          const token = await TokenManager.checkAndRefreshAdminToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } else if (isStudentAPI && !isRefreshEndpoint) {
          // Check and refresh student token if needed
          const token = await TokenManager.checkAndRefreshStudentToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } else if (!isRefreshEndpoint) {
          // For other API calls, try admin token first, then student token
          const adminToken = await TokenManager.checkAndRefreshAdminToken();
          const studentToken = adminToken ? null : await TokenManager.checkAndRefreshStudentToken();
          const token = adminToken || studentToken;
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } else {
          // For refresh endpoints, use existing token without refresh check
          if (isAdminAPI) {
            const token = TokenManager.getAdminToken();
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
          } else if (isStudentAPI) {
            const token = TokenManager.getStudentToken();
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
          }
        }
      }
      
      // Add cache control headers for GET requests
      if (config.method === 'get') {
        config.headers['Cache-Control'] = 'public, max-age=300'; // 5 minutes
      }
      
      // Add request timestamp for debugging
      (config as any).metadata = { startTime: Date.now() };
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor for error handling and performance monitoring
  client.interceptors.response.use(
    (response) => {
      // Log performance metrics
      const duration = Date.now() - (response.config as any).metadata?.startTime;
      if (duration > 1000) {
        console.warn(`Slow API call: ${response.config.url} took ${duration}ms`);
      }
      
      return response;
    },
    async (error) => {
      // Enhanced error handling
      if (error.response) {
        // Server responded with error status
        const { status, data } = error.response;
        const url = error.config?.url || '';
        const originalRequest = error.config;
        
        if (status === 401) {
          console.error('Unauthorized:', data.message || 'Authentication required');
          
          // Determine if this is an admin or student API call
          const isAdminAPI = url.includes('/api/admin/') || 
                           url.includes('/api/teacher-permissions') ||
                           url.includes('/api/exercises/teacher') ||
                           url.includes('/api/exam-materials/admin') ||
                           url.includes('/api/panhellenic-archive') ||
                           (url.includes('/api/news') && ['post', 'put', 'delete'].includes(originalRequest?.method?.toLowerCase() || ''));
          
          const isStudentAPI = url.includes('/api/exercises/student') ||
                              (url.includes('/api/exam-materials') && !url.includes('/admin'));
          
          // Skip refresh for refresh endpoints to avoid loops
          const isRefreshEndpoint = url.includes('/auth/refresh') || url.includes('/student-refresh');
          
          if (typeof window !== 'undefined' && !isRefreshEndpoint) {
            // Don't redirect if we're already on a login page
            const currentPath = window.location.pathname;
            if (currentPath.includes('/login') || currentPath.includes('/student-login')) {
              return Promise.reject(error);
            }
            
            // Try to refresh token
            if (isAdminAPI && !isRefreshingAdmin) {
              isRefreshingAdmin = true;
              
              try {
                const newToken = await TokenManager.refreshAdminToken();
                
                if (newToken && originalRequest) {
                  // Update the original request with new token
                  originalRequest.headers.Authorization = `Bearer ${newToken}`;
                  
                  // Resolve all queued requests
                  failedAdminQueue.forEach(({ resolve }) => resolve());
                  failedAdminQueue = [];
                  
                  // Retry the original request
                  return client(originalRequest);
                } else {
                  // Refresh failed, clear tokens and redirect
                  TokenManager.clearAdminTokens();
                  if (!currentPath.includes('/admin/login')) {
                    window.location.replace('/admin/login');
                  }
                }
              } catch (refreshError) {
                // Refresh failed, clear tokens and redirect
                TokenManager.clearAdminTokens();
                if (!currentPath.includes('/admin/login')) {
                  window.location.replace('/admin/login');
                }
              } finally {
                isRefreshingAdmin = false;
              }
            } else if (isStudentAPI && !isRefreshingStudent) {
              isRefreshingStudent = true;
              
              try {
                const newToken = await TokenManager.refreshStudentToken();
                
                if (newToken && originalRequest) {
                  // Update the original request with new token
                  originalRequest.headers.Authorization = `Bearer ${newToken}`;
                  
                  // Resolve all queued requests
                  failedStudentQueue.forEach(({ resolve }) => resolve());
                  failedStudentQueue = [];
                  
                  // Retry the original request
                  return client(originalRequest);
                } else {
                  // Refresh failed, clear tokens
                  TokenManager.clearStudentTokens();
                  // Don't redirect for student - let component handle it
                }
              } catch (refreshError) {
                // Refresh failed, clear tokens
                TokenManager.clearStudentTokens();
                // Don't redirect for student - let component handle it
              } finally {
                isRefreshingStudent = false;
              }
            } else if (isAdminAPI && isRefreshingAdmin) {
              // Queue this request to retry after refresh
              return new Promise((resolve, reject) => {
                failedAdminQueue.push({ resolve, reject });
              }).then(() => {
                if (originalRequest) {
                  const token = TokenManager.getAdminToken();
                  if (token) {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                  }
                  return client(originalRequest);
                }
                return Promise.reject(error);
              });
            } else if (isStudentAPI && isRefreshingStudent) {
              // Queue this request to retry after refresh
              return new Promise((resolve, reject) => {
                failedStudentQueue.push({ resolve, reject });
              }).then(() => {
                if (originalRequest) {
                  const token = TokenManager.getStudentToken();
                  if (token) {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                  }
                  return client(originalRequest);
                }
                return Promise.reject(error);
              });
            } else if (isAdminAPI) {
              // Refresh endpoint failed or already tried, clear tokens
              TokenManager.clearAdminTokens();
              if (!currentPath.includes('/admin/login')) {
                window.location.replace('/admin/login');
              }
            }
            // For student API calls, don't redirect - let the component handle it
          }
        } else if (status === 403) {
          console.error('Forbidden:', data.message || 'Access denied');
        } else if (status === 429) {
          console.error('Rate limit exceeded');
        } else if (status >= 500) {
          console.error('Server error:', data.message);
        }
      } else if (error.request) {
        // Network error - don't logout on network issues
        console.error('Network error:', error.message);
      }
      
      return Promise.reject(error);
    }
  );
}

// Optimized API functions
export const blogAPI = {
  // Get all blog posts with caching
  getPosts: async (params: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    featured?: boolean;
  } = {}) => {
    const response = await getApiClient().get('/api/blog', { params });
    return response.data;
  },

  // Get single blog post
  getPost: async (id: string) => {
    const response = await getApiClient().get(`/api/blog/${id}`);
    return response.data;
  },

  // Get blog categories
  getCategories: async () => {
    const response = await getApiClient().get('/api/blog/categories');
    return response.data;
  },
};

export const newsAPI = {
  // Get all news posts with caching
  getPosts: async (params: {
    page?: number;
    limit?: number;
    type?: 'announcement' | 'event' | 'seminar';
    search?: string;
    featured?: boolean;
  } = {}) => {
    const response = await getApiClient().get('/api/news', { params });
    return response.data;
  },

  // Get single news post
  getPost: async (id: string) => {
    const response = await getApiClient().get(`/api/news/${id}`);
    return response.data;
  },

  // Get news by type
  getAnnouncements: async () => {
    const response = await getApiClient().get('/api/news/announcements');
    return response.data;
  },

  getEvents: async () => {
    const response = await getApiClient().get('/api/news/events');
    return response.data;
  },

  getSeminars: async () => {
    const response = await getApiClient().get('/api/news/seminars');
    return response.data;
  },

  // Get news types
  getTypes: async () => {
    const response = await getApiClient().get('/api/news/types');
    return response.data;
  },
};

export const newsletterAPI = {
  // Subscribe to newsletter
  subscribe: async (email: string, name?: string) => {
    const response = await getApiClient().post('/api/newsletter/subscribe', {
      email: email.trim(),
      name: name?.trim(),
    });
    return response.data;
  },

  // Unsubscribe from newsletter
  unsubscribe: async (email: string) => {
    const response = await getApiClient().post('/api/newsletter/unsubscribe', {
      email: email.trim(),
    });
    return response.data;
  },
};

// Contact form API
export const contactAPI = {
  submit: async (formData: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) => {
    const response = await getApiClient().post('/contact', formData);
    return response.data;
  },
};

// Health check
export const healthAPI = {
  check: async () => {
    const response = await getApiClient().get('/health');
    return response.data;
  },
};

// Admin API functions
export const adminAPI = {
  getStats: async () => {
    const response = await getApiClient().get('/api/admin/stats');
    return response.data;
  },
  
  getStudents: async (params: {
    page?: number;
    limit?: number;
    search?: string;
    grade?: string;
    status?: string;
  } = {}) => {
    const response = await getApiClient().get('/api/admin/students', { params });
    return response.data;
  },
  
  createStudent: async (studentData: any) => {
    const response = await getApiClient().post('/api/admin/students', studentData);
    return response.data;
  },
  
  updateStudent: async (id: string, studentData: any) => {
    const response = await getApiClient().put(`/api/admin/students/${id}`, studentData);
    return response.data;
  },
  
  deleteStudent: async (id: string) => {
    const response = await getApiClient().delete(`/api/admin/students/${id}`);
    return response.data;
  },

  generateStudentKeys: async (count: number = 5) => {
    const response = await getApiClient().get(`/api/admin/students/key/preview?count=${count}`);
    return response.data;
  },

  getSettings: async () => {
    const response = await getApiClient().get('/api/admin/settings');
    return response.data;
  },

  updateSettings: async (settings: any) => {
    const response = await getApiClient().put('/api/admin/settings', settings);
    return response.data;
  },

  // Teacher Permissions API
  getTeacherPermissions: async (params: {
    page?: number;
    limit?: number;
    teacherId?: string;
    examMaterialId?: string;
    permissionType?: string;
  } = {}) => {
    const response = await getApiClient().get('/api/teacher-permissions', { params });
    return response.data;
  },

  grantTeacherPermission: async (permissionData: {
    teacherId: string;
    examMaterialId: string;
    permissionType: 'view' | 'download' | 'manage' | 'full';
    expiresAt?: string;
    notes?: string;
  }) => {
    const response = await getApiClient().post('/api/teacher-permissions', permissionData);
    return response.data;
  },

  updateTeacherPermission: async (id: string, permissionData: {
    permissionType?: 'view' | 'download' | 'manage' | 'full';
    expiresAt?: string | null;
    isActive?: boolean;
    notes?: string;
  }) => {
    const response = await getApiClient().put(`/api/teacher-permissions/${id}`, permissionData);
    return response.data;
  },

  revokeTeacherPermission: async (id: string) => {
    const response = await getApiClient().delete(`/api/teacher-permissions/${id}`);
    return response.data;
  },

  checkTeacherPermission: async (teacherId: string, examMaterialId: string, action: string) => {
    const response = await getApiClient().get('/api/teacher-permissions/check', {
      params: { teacherId, examMaterialId, action }
    });
    return response.data;
  },

  getTeachers: async () => {
    const response = await getApiClient().get('/api/admin/teachers');
    return response.data;
  },

  getExamMaterials: async (params: {
    page?: number;
    limit?: number;
    subject?: string;
    grade?: string;
  } = {}) => {
    const response = await getApiClient().get('/api/exam-materials/admin', { params });
    return response.data;
  },

  // Panhellenic Archive API
  getArchiveFiles: async (params: {
    subject?: 'math' | 'physics' | 'ximia' | 'biology' | 'greek-literature' | 'ancient-greek' | 'history' | 'latin' | 'economics' | 'informatics' | 'algebra' | 'geometry';
    year?: number;
  } = {}) => {
    const response = await getApiClient().get('/api/panhellenic-archive', { params });
    return response.data;
  },

  uploadArchiveFile: async (file: File, data: {
    displayName: string;
    subject: 'math' | 'physics' | 'ximia' | 'biology' | 'greek-literature' | 'ancient-greek' | 'history' | 'latin' | 'economics' | 'informatics' | 'algebra' | 'geometry';
    year: number;
    description?: string;
  }) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('displayName', data.displayName);
    formData.append('subject', data.subject);
    formData.append('year', data.year.toString());
    if (data.description) {
      formData.append('description', data.description);
    }

    const response = await getApiClient().post('/api/panhellenic-archive', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateArchiveFile: async (id: string, data: {
    displayName?: string;
    subject?: 'math' | 'physics' | 'ximia' | 'biology' | 'greek-literature' | 'ancient-greek' | 'history' | 'latin' | 'economics' | 'informatics' | 'algebra' | 'geometry';
    year?: number;
    description?: string;
  }) => {
    const response = await getApiClient().put(`/api/panhellenic-archive/${id}`, data);
    return response.data;
  },

  deleteArchiveFile: async (id: string) => {
    const response = await getApiClient().delete(`/api/panhellenic-archive/${id}`);
    return response.data;
  },

  toggleArchiveFileActive: async (id: string) => {
    const response = await getApiClient().put(`/api/panhellenic-archive/${id}/toggle-active`);
    return response.data;
  },

  // Teacher Admin Accounts Management
  getTeacherAdmins: async (params: {
    page?: number;
    limit?: number;
    role?: string;
    search?: string;
  } = {}) => {
    const response = await getApiClient().get('/api/admin/admins', { params });
    return response.data;
  },

  getTeacherAdminById: async (id: string) => {
    const response = await getApiClient().get(`/api/admin/admins/${id}`);
    return response.data;
  },

  createTeacherAdmin: async (adminData: {
    email: string;
    password: string;
    name: string;
    role?: string;
    isActive?: boolean;
    permissions?: any;
  }) => {
    const response = await getApiClient().post('/api/admin/admins', adminData);
    return response.data;
  },

  updateTeacherAdmin: async (id: string, adminData: {
    email?: string;
    password?: string;
    name?: string;
    role?: string;
    isActive?: boolean;
    permissions?: any;
  }) => {
    const response = await getApiClient().put(`/api/admin/admins/${id}`, adminData);
    return response.data;
  },

  deleteTeacherAdmin: async (id: string) => {
    const response = await getApiClient().delete(`/api/admin/admins/${id}`);
    return response.data;
  },

  // Exercises API (Teacher)
  getTeacherExercises: async (params: {
    page?: number;
    limit?: number;
    subject?: string;
    grade?: string;
  } = {}) => {
    const response = await getApiClient().get('/api/exercises/teacher', { params });
    return response.data;
  },

  createExercise: async (formData: FormData) => {
    const response = await getApiClient().post('/api/exercises/teacher', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateExercise: async (id: string, exerciseData: {
    title?: string;
    description?: string;
    subject?: string;
    grade?: string;
    textContent?: string;
    isActive?: boolean;
  }) => {
    const response = await getApiClient().put(`/api/exercises/teacher/${id}`, exerciseData);
    return response.data;
  },

  deleteExercise: async (id: string) => {
    const response = await getApiClient().delete(`/api/exercises/teacher/${id}`);
    return response.data;
  },

  addFilesToExercise: async (id: string, formData: FormData) => {
    const response = await getApiClient().post(`/api/exercises/teacher/${id}/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteFileFromExercise: async (id: string, filePublicId: string) => {
    const response = await getApiClient().delete(`/api/exercises/teacher/${id}/files/${filePublicId}`);
    return response.data;
  },

  // Exercises API (Student)
  getStudentExercises: async (params: {
    page?: number;
    limit?: number;
    subject?: string;
  } = {}) => {
    const response = await getApiClient().get('/api/exercises/student', { params });
    return response.data;
  },

  getStudentExerciseById: async (id: string) => {
    const response = await getApiClient().get(`/api/exercises/student/${id}`);
    return response.data;
  },

  // News API
  getNewsPosts: async (params: {
    page?: number;
    limit?: number;
    type?: 'announcement' | 'event' | 'seminar';
    search?: string;
    featured?: boolean;
  } = {}) => {
    const response = await getApiClient().get('/api/news', { params });
    return response.data;
  },

  getNewsPost: async (id: string) => {
    const response = await getApiClient().get(`/api/news/${id}`);
    return response.data;
  },

  createNewsPost: async (newsData: {
    title: string;
    slug?: string;
    excerpt: string;
    content: string;
    type: 'announcement' | 'event' | 'seminar' | 'education' | 'universities';
    author: {
      name: string;
      image?: string;
    };
    image: {
      url: string;
      alt?: string;
      caption?: string;
    };
    tags?: string[];
    status?: string;
    publishDate?: Date;
    eventDate?: Date;
    location?: string;
    readTime?: string;
    featured?: boolean;
    seo?: {
      metaTitle?: string;
      metaDescription?: string;
      keywords?: string[];
    };
  }) => {
    const response = await getApiClient().post('/api/news', newsData);
    return response.data;
  },

  updateNewsPost: async (id: string, newsData: any) => {
    const response = await getApiClient().put(`/api/news/${id}`, newsData);
    return response.data;
  },

  deleteNewsPost: async (id: string) => {
    const response = await getApiClient().delete(`/api/news/${id}`);
    return response.data;
  },

  getNewsTypes: async () => {
    const response = await getApiClient().get('/api/news/types');
    return response.data;
  },

  addNewsFiles: async (id: string, formData: FormData) => {
    const response = await getApiClient().post(`/api/news/${id}/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteNewsFile: async (id: string, filePublicId: string) => {
    const response = await getApiClient().delete(`/api/news/${id}/files/${filePublicId}`);
    return response.data;
  },

  getEducationNews: async () => {
    const response = await getApiClient().get('/api/news/education');
    return response.data;
  },

  getUniversitiesNews: async () => {
    const response = await getApiClient().get('/api/news/universities');
    return response.data;
  }
};

// Export the axios instance getter for convenience
// Using a getter to ensure lazy initialization
export const api = new Proxy({} as ReturnType<typeof axios.create>, {
  get(_target, prop) {
    return getApiClient()[prop as keyof ReturnType<typeof axios.create>];
  }
});

export default getApiClient;
