"use client";

import { SWRConfig } from 'swr';
import { ReactNode } from 'react';

interface BlogProviderProps {
  children: ReactNode;
}

export function BlogProvider({ children }: BlogProviderProps) {
  return (
    <SWRConfig
      value={{
        // Global SWR configuration for optimal performance
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        dedupingInterval: 60000, // 1 minute
        errorRetryCount: 3,
        errorRetryInterval: 5000,
        refreshInterval: 0,
        
        // Global fetcher with error handling
        fetcher: async (url: string) => {
          const response = await fetch(url, {
            headers: {
              'Cache-Control': 'public, max-age=300',
            },
          });
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          
          return response.json();
        },
        
        // Global error handler
        onError: (error) => {
          console.error('SWR Error:', error);
        },
        
        // Global loading state
        loadingTimeout: 3000,
      }}
    >
      {children}
    </SWRConfig>
  );
}
