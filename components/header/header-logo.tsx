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
          className="object-contain transition-all duration-300 max-w-[120px] sm:max-w-[140px] md:max-w-none"
          style={{ height: 'auto' }}
          loading="eager"
          priority
        />
      ) : (
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
          <div className={`bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm transition-all duration-300 ${
            isScrolled ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10'
          }`}>
            <span className={`text-white font-bold transition-all duration-300 ${
              isScrolled ? 'text-xs sm:text-sm' : 'text-sm sm:text-base md:text-lg'
            }`}>{logo.symbol}</span>
          </div>
          <div className="flex flex-col">
            <span className={`font-bold text-gray-900 tracking-tight leading-tight transition-all duration-300 ${
              isScrolled ? 'text-sm sm:text-base' : 'text-base sm:text-lg md:text-lg'
            }`}>
              {logo.text.split(' ')[0]}
            </span>
            <span className={`text-gray-600 font-medium leading-tight transition-all duration-300 ${
              isScrolled ? 'text-[10px] sm:text-xs' : 'text-xs sm:text-sm'
            }`}>
              {logo.text.split(' ').slice(1).join(' ')}
            </span>
          </div>
        </div>
      )}
    </a>
  );
}
