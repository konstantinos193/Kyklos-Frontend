/**
 * Image optimization utilities for better performance
 */

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  priority?: boolean;
}

/**
 * Generate optimized image URL with Next.js Image optimization
 */
export function getOptimizedImageUrl(
  src: string,
  options: ImageOptimizationOptions = {}
): string {
  const {
    width = 800,
    height = 600,
    quality = 75,
    format = 'webp',
    priority = false
  } = options;

  // For external images, return as-is (Next.js will handle optimization)
  if (src.startsWith('http')) {
    return src;
  }

  // For local images, return as-is (Next.js will handle optimization)
  return src;
}

/**
 * Generate responsive image sizes for different breakpoints
 */
export function getResponsiveSizes(breakpoints: string[] = []): string {
  const defaultBreakpoints = [
    '(max-width: 640px) 100vw',
    '(max-width: 1024px) 50vw',
    '(max-width: 1280px) 33vw',
    '25vw'
  ];

  const sizes = breakpoints.length > 0 ? breakpoints : defaultBreakpoints;
  return sizes.join(', ');
}

/**
 * Generate blur data URL for placeholder
 */
export function generateBlurDataURL(width: number = 10, height: number = 10): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';
  
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f3f4f6');
  gradient.addColorStop(1, '#e5e7eb');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL('image/jpeg', 0.1);
}

/**
 * Check if image should be prioritized based on viewport position
 */
export function shouldPrioritizeImage(index: number, totalImages: number): boolean {
  // Prioritize first 4 images (above the fold)
  return index < 4;
}

/**
 * Get optimal quality based on image size and importance
 */
export function getOptimalQuality(
  isPriority: boolean = false,
  imageSize: 'small' | 'medium' | 'large' = 'medium'
): number {
  if (isPriority) {
    return imageSize === 'large' ? 85 : 80;
  }
  
  return imageSize === 'small' ? 60 : imageSize === 'medium' ? 70 : 75;
}
