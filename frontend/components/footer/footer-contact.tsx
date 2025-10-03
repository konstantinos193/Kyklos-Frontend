import { PhoneIcon, MailIcon, LocationIcon } from "@/components/icons";
import { FooterData } from "./types";

interface FooterContactProps {
  contact: FooterData["contact"];
}

export function FooterContact({ contact }: FooterContactProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">Επικοινωνία</h3>
        <div className="w-12 h-1 bg-gradient-to-r from-[#E7B109] to-[#D97706] rounded-full"></div>
      </div>
      
      <address className="not-italic">
        <ul className="space-y-6" role="list">
          <li className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-gray-700 group-hover:bg-[#E7B109] rounded-xl flex items-center justify-center transition-all duration-300">
              <PhoneIcon className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <a
              href={`tel:${contact.phone}`}
              className="text-gray-300 hover:text-[#E7B109] transition-all duration-300 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#E7B109] focus:ring-offset-2 focus:ring-offset-gray-900 rounded-sm"
            >
              {contact.phone}
            </a>
          </li>
          <li className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-gray-700 group-hover:bg-[#E7B109] rounded-xl flex items-center justify-center transition-all duration-300">
              <MailIcon className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <a
              href={`mailto:${contact.email}`}
              className="text-gray-300 hover:text-[#E7B109] transition-all duration-300 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#E7B109] focus:ring-offset-2 focus:ring-offset-gray-900 rounded-sm"
            >
              {contact.email}
            </a>
          </li>
          <li className="flex items-start gap-4 group">
            <div className="w-12 h-12 bg-gray-700 group-hover:bg-[#E7B109] rounded-xl flex items-center justify-center transition-all duration-300 mt-1">
              <LocationIcon className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div className="text-gray-300 text-lg font-medium">
              <div>{contact.address.street}</div>
              <div>{contact.address.city}, {contact.address.postalCode}</div>
            </div>
          </li>
        </ul>
      </address>
    </div>
  );
}
