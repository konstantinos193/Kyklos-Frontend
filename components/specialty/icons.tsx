interface IconProps {
  className?: string;
}

export function BookIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <img
      src="/svg's/file.svg"
      alt="File"
      className={className}
      style={{ shapeRendering: 'geometricPrecision' }}
    />
  );
}

export function DocumentIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <img
      src="/svg's/download.svg"
      alt="Download"
      className={className}
      style={{ shapeRendering: 'geometricPrecision' }}
    />
  );
}

export function TrophyIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <img
      src="/svg's/trophy.svg"
      alt="Trophy"
      className={className}
      style={{ 
        shapeRendering: 'geometricPrecision',
        filter: 'brightness(0) invert(1)'
      }}
    />
  );
}
