import { FooterData } from "./types";

interface FooterLinksProps {
  quickLinks: FooterData["quickLinks"];
}

export function FooterLinks({ quickLinks }: FooterLinksProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">Γρήγοροι Σύνδεσμοι</h3>
        <div className="w-12 h-1 bg-gradient-to-r from-[#E7B109] to-[#D97706] rounded-full"></div>
      </div>
      
      <nav aria-label="Footer navigation">
        <ul className="space-y-4" role="list">
          {quickLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-gray-300 hover:text-[#E7B109] transition-all duration-300 hover:translate-x-2 focus:outline-none focus:ring-2 focus:ring-[#E7B109] focus:ring-offset-2 focus:ring-offset-gray-900 rounded-sm text-lg font-medium"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
