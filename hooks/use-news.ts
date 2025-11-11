import useSWR from 'swr';
import { newsAPI, adminAPI } from '@/lib/api';

// SWR configuration for optimal performance
const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 60000, // 1 minute
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  refreshInterval: 0, // Disable automatic refresh
};

// Hook for getting news posts
export function useNewsPosts(params: {
  page?: number;
  limit?: number;
  type?: 'announcement' | 'event' | 'seminar' | 'education' | 'universities';
  search?: string;
  featured?: boolean;
} = {}) {
  const { page = 1, limit = 10, type, search, featured } = params;
  
  // Create cache key
  const cacheKey = `/api/news?${new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(type && { type }),
    ...(search && { search }),
    ...(featured !== undefined && { featured: featured.toString() }),
  }).toString()}`;

  const { data, error, isLoading, mutate } = useSWR(
    cacheKey,
    () => newsAPI.getPosts(params),
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

// Hook for getting single news post
export function useNewsPost(id: string) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/api/news/${id}` : null,
    () => newsAPI.getPost(id),
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

// Hook for getting news by type
export function useAnnouncements() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/news/announcements',
    () => newsAPI.getAnnouncements(),
    {
      ...swrConfig,
      dedupingInterval: 300000,
    }
  );

  return {
    posts: data?.data || [],
    isLoading,
    isError: error,
    mutate,
    cached: data?.cached || false,
  };
}

export function useEvents() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/news/events',
    () => newsAPI.getEvents(),
    {
      ...swrConfig,
      dedupingInterval: 300000,
    }
  );

  return {
    posts: data?.data || [],
    isLoading,
    isError: error,
    mutate,
    cached: data?.cached || false,
  };
}

export function useSeminars() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/news/seminars',
    () => newsAPI.getSeminars(),
    {
      ...swrConfig,
      dedupingInterval: 300000,
    }
  );

  return {
    posts: data?.data || [],
    isLoading,
    isError: error,
    mutate,
    cached: data?.cached || false,
  };
}

export function useEducationNews() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/news/education',
    () => adminAPI.getEducationNews(),
    {
      ...swrConfig,
      dedupingInterval: 300000,
    }
  );

  return {
    posts: data?.data || [],
    isLoading,
    isError: error,
    mutate,
    cached: data?.cached || false,
  };
}

export function useUniversitiesNews() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/news/universities',
    () => adminAPI.getUniversitiesNews(),
    {
      ...swrConfig,
      dedupingInterval: 300000,
    }
  );

  return {
    posts: data?.data || [],
    isLoading,
    isError: error,
    mutate,
    cached: data?.cached || false,
  };
}

// Hook for getting news types
export function useNewsTypes() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/news/types',
    () => newsAPI.getTypes(),
    {
      ...swrConfig,
      // Keep types fresh for 30 minutes
      dedupingInterval: 1800000,
    }
  );

  return {
    types: data?.data || [],
    isLoading,
    isError: error,
    mutate,
    cached: data?.cached || false,
  };
}

// Hook for getting featured news
export function useFeaturedNews(limit: number = 3) {
  return useNewsPosts({ featured: true, limit });
}

