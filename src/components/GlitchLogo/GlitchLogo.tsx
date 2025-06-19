import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './GlitchLogo.css';

interface GlitchLogoProps {
  size?: number;
  className?: string;
}

const GlitchLogo: React.FC<GlitchLogoProps> = ({ size = 200, className = '' }) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (logoRef.current) {
        const rect = logoRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate global mouse influence - no distance limitation
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Normalize mouse position relative to viewport
        const normalizedX = (e.clientX / viewportWidth) * 2 - 1; // -1 to 1
        const normalizedY = (e.clientY / viewportHeight) * 2 - 1; // -1 to 1
        
        // Calculate direction vector from logo center to mouse
        const directionX = (e.clientX - centerX) / viewportWidth;
        const directionY = (e.clientY - centerY) / viewportHeight;
        
        // Calculate distance for intensity
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );
        const maxDistance = Math.sqrt(viewportWidth * viewportWidth + viewportHeight * viewportHeight);
        const intensity = 1 - (distance / maxDistance); // 0 to 1
        
        setMousePosition({ 
          x: normalizedX * intensity * 2, 
          y: normalizedY * intensity * 2 
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      style={{ 
        width: size, 
        height: size,
        '--mouse-x': mousePosition.x,
        '--mouse-y': mousePosition.y
      } as React.CSSProperties}
    >
      {/* Liquid Metal Waves */}
      <div className="liquid-waves">
        <div 
          className="liquid-wave wave-primary"
          style={{
            transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * 25}px) scale(${1 + Math.abs(mousePosition.x) * 0.2})`,
            opacity: Math.max(0.04, Math.abs(mousePosition.x) * 0.15 + Math.abs(mousePosition.y) * 0.15)
          }}
        />
        <div 
          className="liquid-wave wave-secondary"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 18}px) scale(${1 + Math.abs(mousePosition.y) * 0.15})`,
            opacity: Math.max(0.03, Math.abs(mousePosition.y) * 0.12 + Math.abs(mousePosition.x) * 0.08)
          }}
        />
        <div 
          className="liquid-wave wave-cyan"
          style={{
            transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 22}px) scale(${1 + Math.abs(mousePosition.x + mousePosition.y) * 0.1})`,
            opacity: Math.max(0.02, Math.abs(mousePosition.x + mousePosition.y) * 0.1)
          }}
        />
        <div 
          className="liquid-wave wave-pink"
          style={{
            transform: `translate(${mousePosition.x * 12}px, ${mousePosition.y * 8}px) rotate(${mousePosition.x * 15}deg)`,
            opacity: Math.max(0.02, Math.abs(mousePosition.x) * 0.08)
          }}
        />
        <div 
          className="liquid-wave wave-orange"
          style={{
            transform: `translate(${mousePosition.x * 18}px, ${mousePosition.y * -12}px) scale(${1 + Math.abs(mousePosition.y) * 0.12})`,
            opacity: Math.max(0.01, Math.abs(mousePosition.y) * 0.06)
          }}
        />
      </div>

      {/* Main Logo */}
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
              <stop offset="50%" stopColor="#f8f9fa"/>
              <stop offset="100%" stopColor="#e9ecef"/>
            </linearGradient>
            <filter id="subtleGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#subtleGlow)">
            <path 
              d="M 88.478 186.141 L 147.278 101.441 L 257.616 101.606 L 316.242 186.175 L 88.478 186.141 Z" 
              fill="url(#logoGradient)"
              className="logo-path main-path logo-piece-1"
              style={{ transformOrigin: '202px 144px' }}
            />
            <path 
              d="M 151.162 214.519 L 254.816 214.785 L 123.855 401.854 L 88.385 304.265 L 151.162 214.519 Z" 
              fill="url(#logoGradient)"
              className="logo-path main-path logo-piece-2"
              style={{ transformOrigin: '171px 308px' }}
            />
            <path 
              d="M 375.69 100 L 412.058 198.385 L 348.108 288.629 L 243.925 288.629 L 375.69 100 Z" 
              fill="url(#logoGradient)"
              className="logo-path main-path logo-piece-3"
              style={{ transformOrigin: '328px 194px' }}
            />
            <path 
              d="M 183.137 316.443 L 410.625 316.222 L 353.087 400.362 L 241.446 400.15 L 183.137 316.443 Z" 
              fill="url(#logoGradient)"
              className="logo-path main-path logo-piece-4"
              style={{ transformOrigin: '296px 358px' }}
            />
          </g>
        </svg>
      </div>
      
      {/* RGB Split Layers */}
      <div 
        className="logo-split logo-split-red"
        style={{
          transform: `translate(${mousePosition.x * 1}px, ${mousePosition.y * 0.8}px)`,
          opacity: Math.min(0.15, Math.abs(mousePosition.x) * 0.1 + Math.abs(mousePosition.y) * 0.1)
        }}
      >
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
              fill="var(--accent-primary)"
              className="logo-path split-path logo-piece-1"
              style={{ transformOrigin: '202px 144px' }}
            />
            <path 
              d="M 151.162 214.519 L 254.816 214.785 L 123.855 401.854 L 88.385 304.265 L 151.162 214.519 Z" 
              fill="var(--accent-primary)"
              className="logo-path split-path logo-piece-2"
              style={{ transformOrigin: '171px 308px' }}
            />
            <path 
              d="M 375.69 100 L 412.058 198.385 L 348.108 288.629 L 243.925 288.629 L 375.69 100 Z" 
              fill="var(--accent-primary)"
              className="logo-path split-path logo-piece-3"
              style={{ transformOrigin: '328px 194px' }}
            />
            <path 
              d="M 183.137 316.443 L 410.625 316.222 L 353.087 400.362 L 241.446 400.15 L 183.137 316.443 Z" 
              fill="var(--accent-primary)"
              className="logo-path split-path logo-piece-4"
              style={{ transformOrigin: '296px 358px' }}
            />
          </g>
        </svg>
      </div>

      <div 
        className="logo-split logo-split-cyan"
        style={{
          transform: `translate(${mousePosition.x * -0.8}px, ${mousePosition.y * -1}px)`,
          opacity: Math.min(0.12, Math.abs(mousePosition.x) * 0.08 + Math.abs(mousePosition.y) * 0.08)
        }}
      >
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
              fill="var(--accent-cyan)"
              className="logo-path split-path logo-piece-1"
              style={{ transformOrigin: '202px 144px' }}
            />
            <path 
              d="M 151.162 214.519 L 254.816 214.785 L 123.855 401.854 L 88.385 304.265 L 151.162 214.519 Z" 
              fill="var(--accent-cyan)"
              className="logo-path split-path logo-piece-2"
              style={{ transformOrigin: '171px 308px' }}
            />
            <path 
              d="M 375.69 100 L 412.058 198.385 L 348.108 288.629 L 243.925 288.629 L 375.69 100 Z" 
              fill="var(--accent-cyan)"
              className="logo-path split-path logo-piece-3"
              style={{ transformOrigin: '328px 194px' }}
            />
            <path 
              d="M 183.137 316.443 L 410.625 316.222 L 353.087 400.362 L 241.446 400.15 L 183.137 316.443 Z" 
              fill="var(--accent-cyan)"
              className="logo-path split-path logo-piece-4"
              style={{ transformOrigin: '296px 358px' }}
            />
          </g>
        </svg>
      </div>

      <div 
        className="logo-split logo-split-secondary"
        style={{
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * -0.5}px)`,
          opacity: Math.min(0.1, Math.abs(mousePosition.x) * 0.05 + Math.abs(mousePosition.y) * 0.05)
        }}
      >
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
              fill="var(--accent-secondary)"
              className="logo-path split-path logo-piece-1"
              style={{ transformOrigin: '202px 144px' }}
            />
            <path 
              d="M 151.162 214.519 L 254.816 214.785 L 123.855 401.854 L 88.385 304.265 L 151.162 214.519 Z" 
              fill="var(--accent-secondary)"
              className="logo-path split-path logo-piece-2"
              style={{ transformOrigin: '171px 308px' }}
            />
            <path 
              d="M 375.69 100 L 412.058 198.385 L 348.108 288.629 L 243.925 288.629 L 375.69 100 Z" 
              fill="var(--accent-secondary)"
              className="logo-path split-path logo-piece-3"
              style={{ transformOrigin: '328px 194px' }}
            />
            <path 
              d="M 183.137 316.443 L 410.625 316.222 L 353.087 400.362 L 241.446 400.15 L 183.137 316.443 Z" 
              fill="var(--accent-secondary)"
              className="logo-path split-path logo-piece-4"
              style={{ transformOrigin: '296px 358px' }}
            />
          </g>
        </svg>
      </div>
    </motion.div>
  );
};

export default GlitchLogo;