import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Create axios instance with optimized configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
  // Enable request/response compression
  decompress: true,
});

// Request interceptor for logging and optimization
apiClient.interceptors.request.use(
  (config) => {
    // Create a deep clone to avoid mutating read-only structures
    const cfg = {
      ...config,
      headers: { ...(config.headers as any) },
      params: config.params ? { ...config.params } : undefined
    };
    
    // Add cache control headers for GET requests
    if (cfg.method === 'get') {
      cfg.headers['Cache-Control'] = 'public, max-age=300'; // 5 minutes
    }
    
    // Add request timestamp for debugging
    (cfg as any).metadata = { startTime: Date.now() };
    
    return cfg;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and performance monitoring
apiClient.interceptors.response.use(
  (response) => {
    // Log performance metrics
    const duration = Date.now() - (response.config as any).metadata?.startTime;
    if (duration > 5000) { // Only warn for calls over 5 seconds
      console.warn(`Slow API call: ${response.config.url} took ${duration}ms`);
    }
    
    return response;
  },
  (error) => {
    // Enhanced error handling
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      if (status === 429) {
        console.error('Rate limit exceeded');
      } else if (status >= 500) {
        console.error('Server error:', data?.message);
      }
    } else if (error.request) {
      // Network error
      console.error('Network error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

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
    const response = await apiClient.get('/api/blog', { params });
    return response.data;
  },

  // Get single blog post
  getPost: async (id: string) => {
    const response = await apiClient.get(`/api/blog/${id}`);
    return response.data;
  },

  // Get blog categories
  getCategories: async () => {
    const response = await apiClient.get('/api/blog/categories');
    return response.data;
  },
};

export const newsletterAPI = {
  // Subscribe to newsletter
  subscribe: async (email: string, name?: string) => {
    const response = await apiClient.post('/api/newsletter/subscribe', {
      email: email.trim(),
      name: name?.trim(),
    });
    return response.data;
  },

  // Unsubscribe from newsletter
  unsubscribe: async (email: string) => {
    const response = await apiClient.post('/api/newsletter/unsubscribe', {
      email: email.trim(),
    });
    return response.data;
  },
};

// Health check
export const healthAPI = {
  check: async () => {
    const response = await apiClient.get('/health');
    return response.data;
  },
};

// Admin
export const adminAPI = {
  getStats: async (): Promise<{
    success: boolean;
    data?: { totalUsers: number; totalBlogs: number; totalSubscribers: number; totalViews: number };
  }> => {
    const response = await apiClient.get('/api/admin/stats');
    return response.data;
  },
};

// Export the axios instance as 'api' for convenience
export const api = apiClient;

export default apiClient;
