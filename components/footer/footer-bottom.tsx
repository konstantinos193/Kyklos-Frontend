import { FooterData } from "./types";

interface FooterBottomProps {
  legal: FooterData["legal"];
}

export function FooterBottom({ legal }: FooterBottomProps) {
  return (
    <div className="border-t border-gray-700 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 text-sm">{legal.copyright}</p>
        <nav aria-label="Legal links">
          <div className="flex gap-6 text-sm">
            <a
              href={legal.termsHref}
              className="text-gray-400 hover:text-[#3BA99C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#3BA99C] focus:ring-offset-2 focus:ring-offset-[#1F1F1F] rounded-sm"
            >
              Όροι Χρήσης
            </a>
            <a
              href={legal.privacyHref}
              className="text-gray-400 hover:text-[#3BA99C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#3BA99C] focus:ring-offset-2 focus:ring-offset-[#1F1F1F] rounded-sm"
            >
              Πολιτική Απορρήτου
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
