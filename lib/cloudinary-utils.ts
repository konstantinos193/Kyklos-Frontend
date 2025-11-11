/**
 * Utility functions for handling Cloudinary URLs
 */

/**
 * Normalizes Cloudinary PDF URLs to ensure they're accessible
 * For files uploaded as 'image' type (old uploads), we use the proxy endpoint
 * For files uploaded as 'raw' type, the URL should work as-is
 */
export function normalizeCloudinaryPdfUrl(url: string, fileId?: string): string {
  if (!url || typeof url !== 'string') {
    return url;
  }

  // Check if it's a Cloudinary URL
  if (!url.includes('res.cloudinary.com')) {
    return url;
  }

  // If it's an old upload (image type) and we have a file ID, use the proxy endpoint
  const resourceType = getCloudinaryResourceType(url);
  if (resourceType === 'image' && fileId) {
    // Use the Next.js API route to proxy the request to the backend
    // This ensures the request goes through Next.js and can be properly handled
    return `/api/panhellenic-archive/${fileId}/proxy`;
  }
  
  // For new uploads (raw type), return the URL as-is
  // Remove any existing query parameters or fragments that might interfere
  const cleanUrl = url.split('#')[0].split('?')[0];
  
  // Ensure the URL ends with .pdf if it's a PDF file
  if (cleanUrl.toLowerCase().endsWith('.pdf')) {
    return cleanUrl;
  }
  
  return url;
}

/**
 * Checks if a URL is a Cloudinary URL
 */
export function isCloudinaryUrl(url: string): boolean {
  return url?.includes('res.cloudinary.com') || url?.includes('cloudinary.com');
}

/**
 * Gets the resource type from a Cloudinary URL
 */
export function getCloudinaryResourceType(url: string): 'image' | 'raw' | 'video' | 'unknown' {
  if (!isCloudinaryUrl(url)) {
    return 'unknown';
  }

  if (url.includes('/image/upload/')) {
    return 'image';
  }
  if (url.includes('/raw/upload/')) {
    return 'raw';
  }
  if (url.includes('/video/upload/')) {
    return 'video';
  }

  return 'unknown';
}

