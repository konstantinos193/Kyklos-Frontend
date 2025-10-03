"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface HeaderContextType {
  showAnnouncement: boolean;
  setShowAnnouncement: (show: boolean) => void;
  headerHeight: number;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  
  // Calculate header height based on announcement bar visibility
  const headerHeight = showAnnouncement ? 120 : 80; // 40px for announcement + 80px for header

  return (
    <HeaderContext.Provider value={{ showAnnouncement, setShowAnnouncement, headerHeight }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
}
