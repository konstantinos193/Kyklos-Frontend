"use client";

import { useState } from "react";
import { CloseIcon, MegaphoneIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

interface AnnouncementBarProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function AnnouncementBar({ message, isVisible, onClose }: AnnouncementBarProps) {
  if (!isVisible) return null;

  return (
    <div className="bg-slate-900 text-white py-2 px-4 relative overflow-hidden border-b border-slate-200">
      <div className="container mx-auto flex items-center justify-center gap-3 relative z-10">
        <MegaphoneIcon className="w-4 h-4 flex-shrink-0 text-blue-400" />
        <p className="text-sm font-medium text-center flex-1 text-slate-100">
          {message}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-slate-300 hover:bg-slate-800 hover:text-white p-1 h-auto"
        >
          <CloseIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
