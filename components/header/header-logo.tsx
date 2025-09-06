import Image from "next/image";
import type { HeaderLogo as HeaderLogoType } from "./types";

interface HeaderLogoProps {
  logo: HeaderLogoType;
  isScrolled: boolean;
}

export function HeaderLogo({ logo, isScrolled }: HeaderLogoProps) {
  return (
    <a href={logo.href} className="flex items-center">
      {logo.image ? (
        <Image
          src={logo.image}
          alt={logo.text}
          width={isScrolled ? 100 : 120}
          height={isScrolled ? 32 : 40}
          className="object-contain transition-all duration-300"
        />
      ) : (
        <div className="flex items-center gap-2 sm:gap-3">
          <div className={`bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm transition-all duration-300 ${
            isScrolled ? 'w-8 h-8' : 'w-10 h-10'
          }`}>
            <span className={`text-white font-bold transition-all duration-300 ${
              isScrolled ? 'text-sm' : 'text-lg'
            }`}>{logo.symbol}</span>
          </div>
          <div className="flex flex-col">
            <span className={`font-bold text-gray-900 tracking-tight leading-tight transition-all duration-300 ${
              isScrolled ? 'text-base' : 'text-lg'
            }`}>
              {logo.text.split(' ')[0]}
            </span>
            <span className={`text-gray-600 font-medium leading-tight transition-all duration-300 ${
              isScrolled ? 'text-xs' : 'text-sm'
            }`}>
              {logo.text.split(' ').slice(1).join(' ')}
            </span>
          </div>
        </div>
      )}
    </a>
  );
}
