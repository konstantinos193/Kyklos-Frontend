/**
 * Get the API base URL from environment variables
 * @throws Error if NEXT_PUBLIC_API_URL is not set
 */
export function getApiUrl(): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL environment variable is not set. Please configure it in your .env file.');
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

