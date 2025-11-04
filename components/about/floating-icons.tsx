"use client";

import Image from "next/image";
import { FloatingIcon } from "./types";

interface FloatingIconsProps {
  icons: FloatingIcon[];
}

export function FloatingIcons({ icons }: FloatingIconsProps) {
  const getIconPosition = (position: FloatingIcon['position']) => {
    switch (position) {
      case 'top-right':
        return 'absolute -top-6 -right-6';
      case 'middle-left':
        return 'absolute top-1/2 -left-6 transform -translate-y-1/2';
      case 'bottom-right':
        return 'absolute -bottom-4 -right-4';
      case 'bottom-left':
        return 'absolute -bottom-2 left-1/4';
      default:
        return '';
    }
  };

  const getIconSize = (size: FloatingIcon['size']) => {
    switch (size) {
      case 'sm':
        return 'w-10 h-10';
      case 'md':
        return 'w-12 h-12';
      case 'lg':
        return 'w-14 h-14';
      case 'xl':
        return 'w-16 h-16';
      default:
        return 'w-12 h-12';
    }
  };

  const getAnimationClass = (animation: FloatingIcon['animation'], delay?: number) => {
    const delayClass = delay ? `delay-${delay}` : '';
    switch (animation) {
      case 'bounce':
        return `animate-bounce ${delayClass}`;
      case 'pulse':
        return `animate-pulse ${delayClass}`;
      case 'spin':
        return `animate-spin ${delayClass}`;
      case 'ping':
        return `animate-ping ${delayClass}`;
      default:
        return `animate-bounce ${delayClass}`;
    }
  };

  return (
    <>
      {icons.map((icon, index) => {
        const IconComponent = icon.icon;
        return (
          <div
            key={index}
            className={`floating-icon ${getIconPosition(icon.position)} ${getIconSize(icon.size)} ${icon.color} rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 ${getAnimationClass(icon.animation, icon.delay)}`}
            style={{
              imageRendering: 'crisp-edges',
              WebkitImageRendering: 'crisp-edges',
              MozImageRendering: 'crisp-edges',
              msImageRendering: 'crisp-edges'
            }}
          >
            {icon.position === 'middle-left' && icon.color === 'bg-blue-600' ? (
              <Image 
                src="/svg's/shield.svg" 
                alt="Shield" 
                width={32}
                height={32}
                className="filter brightness-0 invert"
                style={{ shapeRendering: 'geometricPrecision' }}
                priority
                quality={75}
                unoptimized
              />
            ) : icon.position === 'top-right' && icon.color === 'bg-[#E7B109]' ? (
              <Image 
                src="/svg's/open book.svg" 
                alt="Open Book" 
                width={40}
                height={40}
                className="filter brightness-0 invert"
                style={{ shapeRendering: 'geometricPrecision' }}
                priority
                quality={75}
                unoptimized
              />
            ) : icon.position === 'bottom-left' && icon.color === 'bg-purple-600' ? (
              <Image 
                src="/svg's/trophy.svg" 
                alt="Trophy" 
                width={24}
                height={24}
                className="filter brightness-0 invert"
                style={{ shapeRendering: 'geometricPrecision' }}
                priority
                quality={75}
                unoptimized
              />
            ) : icon.position === 'bottom-right' && icon.color === 'bg-green-600' ? (
              <Image 
                src="/svg's/star.svg" 
                alt="Star" 
                width={32}
                height={32}
                className="filter brightness-0 invert"
                style={{ shapeRendering: 'geometricPrecision' }}
                priority
                quality={75}
                unoptimized
              />
            ) : (
              <IconComponent className="text-white" />
            )}
          </div>
        );
      })}
    </>
  );
}
