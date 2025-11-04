import useSWR from 'swr';
import { blogAPI } from '@/lib/api';

// SWR configuration for optimal performance
const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 60000, // 1 minute
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  refreshInterval: 0, // Disable automatic refresh
};

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      'Cache-Control': 'public, max-age=300', // 5 minutes cache
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return response.json();
};

// Hook for getting blog posts
export function useBlogPosts(params: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  featured?: boolean;
} = {}) {
  const { page = 1, limit = 10, category, search, featured } = params;
  
  // Create cache key
  const cacheKey = `/api/blog?${new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(category && { category }),
    ...(search && { search }),
    ...(featured !== undefined && { featured: featured.toString() }),
  }).toString()}`;

  const { data, error, isLoading, mutate } = useSWR(
    cacheKey,
    () => blogAPI.getPosts(params),
    {
      ...swrConfig,
      // Keep data fresh for 5 minutes
      dedupingInterval: 300000,
    }
  );

  return {
    posts: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    isError: error,
    mutate, // For manual revalidation
    cached: data?.cached || false,
  };
}

// Hook for getting single blog post
export function useBlogPost(id: string) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/api/blog/${id}` : null,
    () => blogAPI.getPost(id),
    {
      ...swrConfig,
      // Keep single post fresh for 10 minutes
      dedupingInterval: 600000,
    }
  );

  return {
    post: data?.data,
    isLoading,
    isError: error,
    mutate,
    cached: data?.cached || false,
  };
}

// Hook for getting blog categories
export function useBlogCategories() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/blog/categories',
    () => blogAPI.getCategories(),
    {
      ...swrConfig,
      // Keep categories fresh for 30 minutes
      dedupingInterval: 1800000,
    }
  );

  return {
    categories: data?.data || [],
    isLoading,
    isError: error,
    mutate,
    cached: data?.cached || false,
  };
}

// Hook for getting featured posts
export function useFeaturedPosts(limit: number = 3) {
  return useBlogPosts({ featured: true, limit });
}

// Hook for getting posts by category
export function usePostsByCategory(category: string, limit: number = 10) {
  return useBlogPosts({ category, limit });
}
