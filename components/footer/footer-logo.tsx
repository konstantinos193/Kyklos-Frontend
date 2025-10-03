import Image from "next/image";
import { FooterData } from "./types";
import { FacebookIcon, InstagramIcon, TwitterIcon, LinkedInIcon, TikTokIcon } from "@/components/icons";

interface FooterLogoProps {
  logo: FooterData["logo"];
  socialLinks: FooterData["socialLinks"];
}

export function FooterLogo({ logo, socialLinks }: FooterLogoProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        {logo.image ? (
          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={logo.image}
              alt={logo.text}
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="w-16 h-16 bg-gradient-to-br from-[#E7B109] to-[#D97706] rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-3xl">{logo.symbol}</span>
          </div>
        )}
        <div>
          <h3 className="text-2xl font-bold text-white mb-1">{logo.text}</h3>
          <div className="w-12 h-1 bg-gradient-to-r from-[#E7B109] via-[#CE3B49] to-[#D97706] rounded-full"></div>
        </div>
      </div>
      
      <p className="text-gray-300 leading-relaxed text-lg max-w-md">
        {logo.description}
      </p>
      
      <div className="flex gap-3" role="list" aria-label="Social media links">
        {socialLinks.map((social) => {
          const getIcon = () => {
            switch (social.name) {
              case "Facebook": return <FacebookIcon className="w-5 h-5" />;
              case "Instagram": return <InstagramIcon className="w-5 h-5" />;
              case "Twitter": return <TwitterIcon className="w-5 h-5" />;
              case "LinkedIn": return <LinkedInIcon className="w-5 h-5" />;
              case "TikTok": return <TikTokIcon className="w-5 h-5 brightness-0 invert" />;
              default: return null;
            }
          };
          
          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-700 hover:bg-[#CE3B49] rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#CE3B49] focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label={`Follow us on ${social.name}`}
            >
              {getIcon()}
            </a>
          );
        })}
      </div>
    </div>
  );
}
