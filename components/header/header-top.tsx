"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LocationIcon, PhoneIcon, MailIcon, FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/icons";

export function HeaderTop() {
  const [accountRoute, setAccountRoute] = useState<string>('/student-login');

  useEffect(() => {
    // Check which user type is logged in and set appropriate route
    const checkLoginStatus = () => {
      // Check for admin login (check both localStorage and sessionStorage)
      const adminToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
      const adminInfo = localStorage.getItem('adminInfo') || sessionStorage.getItem('adminInfo');
      
      // Check for student login
      const studentData = localStorage.getItem('student');
      const studentToken = localStorage.getItem('studentToken');
      
      // Prioritize admin if both are logged in, otherwise use whichever is logged in
      if (adminToken && adminInfo) {
        setAccountRoute('/admin');
      } else if (studentData && studentToken) {
        setAccountRoute('/student/dashboard');
      } else {
        setAccountRoute('/student-login');
      }
    };

    // Check on mount
    checkLoginStatus();

    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkLoginStatus);

    // Also listen for custom events (for same-tab login/logout)
    const handleAuthChange = () => checkLoginStatus();
    window.addEventListener('auth-change', handleAuthChange);

    // Polling mechanism as fallback for same-tab changes (checks every 2 seconds)
    const intervalId = setInterval(checkLoginStatus, 2000);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('auth-change', handleAuthChange);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="bg-slate-200 text-slate-600 py-1.5 sm:py-2 text-xs sm:text-sm">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Left side - Contact Info */}
          <div className="hidden md:block flex-1">
            <ul className="flex flex-wrap items-center gap-3 lg:gap-4">
              <li className="flex items-center gap-1 hover:text-gray-800 transition-colors">
                <LocationIcon className="w-3 h-3 flex-shrink-0" />
                <span className="whitespace-nowrap">Βασιλέως Κωνσταντίνου 42, Αρτα</span>
              </li>
              <li className="flex items-center gap-1 hover:text-gray-800 transition-colors">
                <PhoneIcon className="w-3 h-3 flex-shrink-0" />
                <span className="whitespace-nowrap">2681026671</span>
              </li>
              <li className="flex items-center gap-1 hover:text-gray-800 transition-colors">
                <MailIcon className="w-3 h-3 flex-shrink-0" />
                <span className="whitespace-nowrap hidden lg:inline">grkyklos-@hotmail.gr</span>
                <span className="whitespace-nowrap lg:hidden">grkyklos-@hotmail...</span>
              </li>
            </ul>
          </div>

          {/* Mobile: Show only phone */}
          <div className="md:hidden flex items-center gap-1">
            <PhoneIcon className="w-3 h-3 flex-shrink-0" />
            <span className="whitespace-nowrap">2681026671</span>
          </div>

          {/* Right side - Links and Social */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <Link 
              href={accountRoute}
              className="transition-colors font-medium whitespace-nowrap text-[10px] sm:text-xs md:text-sm"
              style={{ color: '#CE3B49' }}
            >
              Λογαριασμός
            </Link>
            <div className="hidden lg:flex items-center gap-3">
              <a href="#" className="hover:text-gray-800 transition-colors whitespace-nowrap">FAQ</a>
              <a href="#" className="hover:text-gray-800 transition-colors whitespace-nowrap">Contact</a>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <a href="https://www.facebook.com/share/1AiwsWnW15/?mibextid=wwXIfr" className="hover:text-gray-800 transition-colors" aria-label="Facebook">
                <FacebookIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a href="https://www.instagram.com/frontistirio_kyklos?igsh=MWg0cms4NXRleWJudA==" className="hover:text-gray-800 transition-colors" aria-label="Instagram">
                <InstagramIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a href="https://www.tiktok.com/@frontistirio_kyklos_1990?_t=ZN-8zYFeNjMcNi&_r=1" className="hover:text-gray-800 transition-colors" aria-label="TikTok">
                <TikTokIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
