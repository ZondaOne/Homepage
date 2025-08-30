import React from 'react';

interface ComerziaLogoProps {
  size?: number;
  className?: string;
}

const ComerziaLogo: React.FC<ComerziaLogoProps> = ({ 
  size = 40, 
  className = '' 
}) => {
  const logoWidth = size * 2.4; // Adjust ratio for combined letters  
  const logoHeight = size;

  return (
    <svg
      width={logoWidth}
      height={logoHeight}
      viewBox="0 0 280 190"
      className={className}
      style={{ fill: 'currentColor' }}
    >
      {/* Letter C */}
      <g transform="translate(0, 0) scale(0.85)">
        <path d="M 193.586 307.882 L 193.858 329.576 L 132.299 294.594 C 132.299 294.594 132.028 226.527 132.299 226.256 C 132.57 225.985 193.858 260.967 193.858 260.967 L 193.858 278.865 L 218.535 292.153 L 218.264 246.052 L 108.164 183.409 L 107.351 308.966 L 218.806 373.236 L 218.535 321.712 L 193.586 307.882 Z" 
              transform="translate(-107, -183)" />
      </g>
      
      {/* Letter M */}
      <g transform="translate(90, 60) scale(0.85)">
        <path d="M 250.535 219.205 L 178.129 178.257 L 234.535 177.714 L 234.535 137.037 L 315.618 183.138 L 339.754 168.494 L 227.213 103.681 L 209.315 113.986 L 209.044 155.206 L 136.909 155.206 L 113.588 168.765 L 226.399 234.391 L 250.535 219.205 Z" 
              transform="translate(-113, -103)" />
      </g>
      
      {/* Letter Z */}
      <g transform="translate(200, 0) scale(0.85)">
        <path d="M 344.906 281.848 L 277.382 320.085 L 345.448 206.731 L 344.906 183.409 L 233.993 246.866 L 234.535 274.797 L 297.72 239.001 L 234.264 345.305 L 233.993 372.965 L 345.448 308.966 L 344.906 281.848 Z" 
              transform="translate(-234, -183)" />
      </g>
    </svg>
  );
};

export default ComerziaLogo;