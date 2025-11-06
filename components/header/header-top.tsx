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
    <div className="bg-slate-200 text-slate-600 py-2 text-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center">
          {/* Left side - Contact Info */}
          <div className="hidden sm:block">
            <ul className="flex flex-wrap items-center gap-4">
              <li className="flex items-center gap-1 hover:text-gray-800 transition-colors">
                <LocationIcon className="w-3 h-3" />
                <span>Βασιλέως Κωνσταντίνου 42, Αρτα</span>
              </li>
              <li className="flex items-center gap-1 hover:text-gray-800 transition-colors">
                <PhoneIcon className="w-3 h-3" />
                <span>2681026671</span>
              </li>
              <li className="flex items-center gap-1 hover:text-gray-800 transition-colors">
                <MailIcon className="w-3 h-3" />
                <span>grkyklos-@hotmail.gr</span>
              </li>
            </ul>
          </div>

          {/* Right side - Links and Social */}
          <div className="ml-auto flex items-center gap-3 sm:gap-4">
            <Link 
              href={accountRoute}
              className="transition-colors font-medium"
              style={{ color: '#CE3B49' }}
            >
              Λογαριασμός
            </Link>
            <div className="hidden xs:flex items-center gap-3">
              <a href="#" className="hover:text-gray-800 transition-colors">FAQ</a>
              <a href="#" className="hover:text-gray-800 transition-colors">Contact</a>
            </div>
            <div className="flex items-center gap-2 ml-1">
              <a href="https://www.facebook.com/share/1AiwsWnW15/?mibextid=wwXIfr" className="hover:text-gray-800 transition-colors" aria-label="Facebook">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/frontistirio_kyklos?igsh=MWg0cms4NXRleWJudA==" className="hover:text-gray-800 transition-colors" aria-label="Instagram">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="https://www.tiktok.com/@frontistirio_kyklos_1990?_t=ZN-8zYFeNjMcNi&_r=1" className="hover:text-gray-800 transition-colors" aria-label="TikTok">
                <TikTokIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
