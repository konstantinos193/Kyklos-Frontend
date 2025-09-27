"use client";

import { LocationIcon, PhoneIcon, MailIcon, FacebookIcon, InstagramIcon } from "@/components/icons";

export function HeaderTop() {
  return (
    <div className="bg-slate-200 text-slate-600 py-2 text-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center">
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
                <span>your-email@example.com</span>
              </li>
            </ul>
          </div>

          {/* Right side - Links and Social */}
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="transition-colors font-medium"
              style={{ color: '#E7B109' }}
            >
              My Account
            </a>
            <a 
              href="#" 
              className="hover:text-gray-800 transition-colors"
            >
              FAQ
            </a>
            <a 
              href="#" 
              className="hover:text-gray-800 transition-colors"
            >
              Contact
            </a>
            <div className="flex items-center gap-2">
              <a 
                href="#" 
                className="hover:text-gray-800 transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="hover:text-gray-800 transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
