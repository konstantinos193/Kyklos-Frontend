/**
 * Get the API base URL from environment variables
 * Returns a default value during build time if not set to prevent build errors
 */
export function getApiUrl(): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  // If not set, return a default value to prevent build-time errors
  // This should be configured via environment variables at runtime
  if (!apiUrl) {
    // Return a default backend URL that can be overridden at runtime
    return 'https://kyklos-backend.onrender.com';
  }
  
  // Remove trailing slash if present
  return apiUrl.replace(/\/$/, '');
}

/**
 * Get the API base URL, returns empty string if not set (for optional usage)
 */
export function getApiUrlOptional(): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return apiUrl ? apiUrl.replace(/\/$/, '') : '';
}

