interface IconProps {
  className?: string;
}

export function BookIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg 
      className={className} 
      fill="currentColor" 
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: 'geometricPrecision' }}
    >
      <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
      <path d="M2 4h20v16H2V4zm2 2v12h16V6H4z"/>
    </svg>
  );
}

export function DocumentIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg 
      className={className} 
      fill="currentColor" 
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: 'geometricPrecision' }}
    >
      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
    </svg>
  );
}

export function TrophyIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg 
      className={className} 
      fill="currentColor" 
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: 'geometricPrecision' }}
    >
      <path d="M7,4V2A1,1 0 0,1 8,1H16A1,1 0 0,1 17,2V4H20A1,1 0 0,1 21,5V7A1,1 0 0,1 20,8H19V9A5,5 0 0,1 14,14H10A5,5 0 0,1 5,9V8H4A1,1 0 0,1 3,7V5A1,1 0 0,1 4,4H7M9,3V4H15V3H9M7,6V9A3,3 0 0,0 10,12H14A3,3 0 0,0 17,9V6H7M9,8H15V9A1,1 0 0,1 14,10H10A1,1 0 0,1 9,9V8Z"/>
    </svg>
  );
}
