"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@/components/icons";
import { FooterData } from "./types";

interface FooterMobileMenuProps {
  quickLinks: FooterData["quickLinks"];
  contact: FooterData["contact"];
}

export function FooterMobileMenu({ quickLinks, contact }: FooterMobileMenuProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  return (
    <div className="lg:hidden space-y-4">
      {/* Quick Links Mobile */}
      <div className="border-b border-gray-700 pb-4">
        <button
          onClick={() => toggleSection("links")}
          className="flex items-center justify-between w-full text-left"
          aria-expanded={expandedSections.has("links")}
        >
          <h3 className="text-lg font-semibold text-[#E7B109]">Γρήγοροι Σύνδεσμοι</h3>
          {expandedSections.has("links") ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-400" />
          )}
        </button>
        {expandedSections.has("links") && (
          <nav className="mt-4" aria-label="Footer navigation">
            <ul className="space-y-3" role="list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-[#3BA99C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#3BA99C] focus:ring-offset-2 focus:ring-offset-[#1F1F1F] rounded-sm block py-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Contact Mobile */}
      <div className="border-b border-gray-700 pb-4">
        <button
          onClick={() => toggleSection("contact")}
          className="flex items-center justify-between w-full text-left"
          aria-expanded={expandedSections.has("contact")}
        >
          <h3 className="text-lg font-semibold text-[#E7B109]">Επικοινωνία</h3>
          {expandedSections.has("contact") ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-400" />
          )}
        </button>
        {expandedSections.has("contact") && (
          <div className="mt-4">
            <address className="not-italic">
              <ul className="space-y-3" role="list">
                <li>
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-gray-300 hover:text-[#3BA99C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#3BA99C] focus:ring-offset-2 focus:ring-offset-[#1F1F1F] rounded-sm block py-1"
                  >
                    📞 {contact.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-gray-300 hover:text-[#3BA99C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#3BA99C] focus:ring-offset-2 focus:ring-offset-[#1F1F1F] rounded-sm block py-1"
                  >
                    ✉️ {contact.email}
                  </a>
                </li>
                <li className="text-gray-300 py-1">
                  📍 {contact.address.street}, {contact.address.city} {contact.address.postalCode}
                </li>
              </ul>
            </address>
          </div>
        )}
      </div>
    </div>
  );
}
