import axios from 'axios';
import { getApiUrl } from './api-url';

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

function setupInterceptors(client: ReturnType<typeof axios.create>) {
  // Request interceptor for authentication and optimization
  client.interceptors.request.use(
    (config) => {
      // Add authentication token
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
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
    (error) => {
      // Enhanced error handling
      if (error.response) {
        // Server responded with error status
        const { status, data } = error.response;
        
        if (status === 401) {
          console.error('Unauthorized:', data.message || 'Authentication required');
          // Only clear tokens and redirect if it's not a stats call
          if (!error.config?.url?.includes('/admin/stats')) {
            if (typeof window !== 'undefined') {
              localStorage.removeItem('adminToken');
              sessionStorage.removeItem('adminToken');
              window.location.href = '/admin/login';
            }
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
