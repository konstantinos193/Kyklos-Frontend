"use client";

import { usePathname } from 'next/navigation';

interface AdminLayoutWrapperProps {
  children: React.ReactNode;
}

export function AdminLayoutWrapper({ children }: AdminLayoutWrapperProps) {
  const pathname = usePathname();
  
  // Check if this is an admin route
  const isAdminRoute = pathname.startsWith('/admin');
  
  if (isAdminRoute) {
    // For admin routes, only render the children (no header/footer)
    return <>{children}</>;
  }
  
  // For regular routes, render everything including header and footer
  return <>{children}</>;
}
