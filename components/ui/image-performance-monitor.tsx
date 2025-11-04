'use client';

import { useEffect, useState } from 'react';

interface ImagePerformanceData {
  src: string;
  loadTime: number;
  size: number;
  cached: boolean;
}

export function ImagePerformanceMonitor() {
  const [performanceData, setPerformanceData] = useState<ImagePerformanceData[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const imageEntries = entries.filter(entry => entry.name.includes('_next/static/image'));
      
      imageEntries.forEach(entry => {
        const img = entry as PerformanceResourceTiming;
        setPerformanceData(prev => [...prev, {
          src: img.name,
          loadTime: img.responseEnd - img.requestStart,
          size: img.transferSize,
          cached: img.transferSize === 0
        }]);
      });
    });

    observer.observe({ entryTypes: ['resource'] });

    return () => observer.disconnect();
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h4 className="font-bold mb-2">Image Performance</h4>
      <div className="space-y-1">
        {performanceData.slice(-5).map((data, index) => (
          <div key={index} className="flex justify-between">
            <span className="truncate">{data.src.split('/').pop()}</span>
            <span className="text-green-400">{data.loadTime.toFixed(0)}ms</span>
          </div>
        ))}
      </div>
    </div>
  );
}
