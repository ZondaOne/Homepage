import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './GlitchLogo.css';

interface GlitchLogoProps {
  size?: number;
  className?: string;
}

const GlitchLogo: React.FC<GlitchLogoProps> = ({ size = 120, className = '' }) => {
  const logoRef = useRef<HTMLDivElement>(null);

  const logoVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateY: -90 
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 100,
        duration: 1.2
      }
    }
  };

  return (
    <motion.div
      ref={logoRef}
      className={`glitch-logo ${className}`}
      variants={logoVariants}
      initial="hidden"
      animate="visible"
      style={{ width: size, height: size }}
    >
      <div className="logo-main">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 500 500" 
          width={size} 
          height={size}
          className="zonda-logo"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff"/>
              <stop offset="50%" stopColor="#6366f1"/>
              <stop offset="100%" stopColor="#8b5cf6"/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#glow)">
            <path 
              d="M 88.478 186.141 L 147.278 101.441 L 257.616 101.606 L 316.242 186.175 L 88.478 186.141 Z" 
              fill="url(#logoGradient)"
              className="logo-path"
            />
            <path 
              d="M 151.162 214.519 L 254.816 214.785 L 123.855 401.854 L 88.385 304.265 L 151.162 214.519 Z" 
              fill="url(#logoGradient)"
              className="logo-path"
            />
            <path 
              d="M 375.69 100 L 412.058 198.385 L 348.108 288.629 L 243.925 288.629 L 375.69 100 Z" 
              fill="url(#logoGradient)"
              className="logo-path"
            />
            <path 
              d="M 183.137 316.443 L 410.625 316.222 L 353.087 400.362 L 241.446 400.15 L 183.137 316.443 Z" 
              fill="url(#logoGradient)"
              className="logo-path"
            />
          </g>
        </svg>
      </div>
      
      <div className="logo-glitch logo-glitch-1">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 500 500" 
          width={size} 
          height={size}
          className="zonda-logo"
        >
          <g>
            <path 
              d="M 88.478 186.141 L 147.278 101.441 L 257.616 101.606 L 316.242 186.175 L 88.478 186.141 Z" 
              fill="var(--rgb-red)"
              className="logo-path"
            />
            <path 
              d="M 151.162 214.519 L 254.816 214.785 L 123.855 401.854 L 88.385 304.265 L 151.162 214.519 Z" 
              fill="var(--rgb-red)"
              className="logo-path"
            />
            <path 
              d="M 375.69 100 L 412.058 198.385 L 348.108 288.629 L 243.925 288.629 L 375.69 100 Z" 
              fill="var(--rgb-red)"
              className="logo-path"
            />
            <path 
              d="M 183.137 316.443 L 410.625 316.222 L 353.087 400.362 L 241.446 400.15 L 183.137 316.443 Z" 
              fill="var(--rgb-red)"
              className="logo-path"
            />
          </g>
        </svg>
      </div>

      <div className="logo-glitch logo-glitch-2">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 500 500" 
          width={size} 
          height={size}
          className="zonda-logo"
        >
          <g>
            <path 
              d="M 88.478 186.141 L 147.278 101.441 L 257.616 101.606 L 316.242 186.175 L 88.478 186.141 Z" 
              fill="var(--rgb-cyan)"
              className="logo-path"
            />
            <path 
              d="M 151.162 214.519 L 254.816 214.785 L 123.855 401.854 L 88.385 304.265 L 151.162 214.519 Z" 
              fill="var(--rgb-cyan)"
              className="logo-path"
            />
            <path 
              d="M 375.69 100 L 412.058 198.385 L 348.108 288.629 L 243.925 288.629 L 375.69 100 Z" 
              fill="var(--rgb-cyan)"
              className="logo-path"
            />
            <path 
              d="M 183.137 316.443 L 410.625 316.222 L 353.087 400.362 L 241.446 400.15 L 183.137 316.443 Z" 
              fill="var(--rgb-cyan)"
              className="logo-path"
            />
          </g>
        </svg>
      </div>
    </motion.div>
  );
};

export default GlitchLogo;