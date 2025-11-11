"use client";

import { usePathname } from "next/navigation";
import { FooterLogo } from "./footer/footer-logo";
import { FooterLinks } from "./footer/footer-links";
import { FooterContact } from "./footer/footer-contact";
import { FooterNewsletter } from "./footer/footer-newsletter";
import { FooterBottom } from "./footer/footer-bottom";
import { ScrollToTop } from "./footer/scroll-to-top";
import { footerData } from "./footer/data";

export function Footer() {
  const pathname = usePathname();
  
  // Hide footer only on admin pages (they have their own layout)
  // Student pages will use the main footer
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden" role="contentinfo">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E7B109] to-[#D97706]"></div>
        <div className="absolute top-20 left-20 w-80 h-80 bg-[#E7B109]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-4 gap-12 py-20">
          {/* Logo & Social Links */}
          <div className="space-y-6">
            <FooterLogo 
              logo={footerData.logo} 
              socialLinks={footerData.socialLinks} 
            />
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <FooterLinks quickLinks={footerData.quickLinks} />
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <FooterContact contact={footerData.contact} />
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <FooterNewsletter />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-8 py-12">
          {/* Logo & Social Links - Always visible on mobile */}
          <FooterLogo 
            logo={footerData.logo} 
            socialLinks={footerData.socialLinks} 
          />

          {/* Quick Links - Always visible on mobile */}
          <FooterLinks quickLinks={footerData.quickLinks} />

          {/* Contact Info - Always visible on mobile */}
          <FooterContact contact={footerData.contact} />

          {/* Newsletter - Always visible on mobile */}
          <FooterNewsletter />
        </div>

        {/* Bottom Bar */}
        <FooterBottom legal={footerData.legal} />
      </div>
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </footer>
  );
}
