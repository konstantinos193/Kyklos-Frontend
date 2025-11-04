import { useEffect, useState } from 'react';

interface UseImagePreloadOptions {
  images: string[];
  priority?: boolean;
}

export function useImagePreload({ images, priority = false }: UseImagePreloadOptions) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!priority) {
      setIsLoading(false);
      return;
    }

    const preloadImages = async () => {
      const promises = images.map((src) => {
        return new Promise<string>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(src);
          img.onerror = () => reject(src);
          img.src = src;
        });
      });

      try {
        const loadedSrcs = await Promise.allSettled(promises);
        const successful = loadedSrcs
          .filter((result): result is PromiseFulfilledResult<string> => result.status === 'fulfilled')
          .map(result => result.value);
        
        setLoadedImages(new Set(successful));
      } catch (error) {
        console.warn('Some images failed to preload:', error);
      } finally {
        setIsLoading(false);
      }
    };

    preloadImages();
  }, [images, priority]);

  return { loadedImages, isLoading };
}
