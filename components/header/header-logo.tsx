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
          width={120}
          height={40}
          className="object-contain"
        />
      ) : (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-lg">{logo.symbol}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900 tracking-tight leading-tight">
              {logo.text.split(' ')[0]}
            </span>
            <span className="text-sm text-gray-600 font-medium leading-tight">
              {logo.text.split(' ').slice(1).join(' ')}
            </span>
          </div>
        </div>
      )}
    </a>
  );
}
