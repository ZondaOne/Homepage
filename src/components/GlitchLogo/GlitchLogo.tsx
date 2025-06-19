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
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (logoRef.current) {
        const rect = logoRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate direction and distance from logo center to mouse
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Normalize and scale the influence
        const viewportDiagonal = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
        const intensity = Math.max(0.1, 1 - (distance / viewportDiagonal));
        
        // Create smooth directional influence
        const influence = 3;
        const normalizedX = (deltaX / window.innerWidth) * intensity * influence;
        const normalizedY = (deltaY / window.innerHeight) * intensity * influence;
        
        setMousePosition({ x: normalizedX, y: normalizedY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Entrance animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const pieceVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.6,
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
      rotate: Math.random() * 60 - 30
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
        duration: 1.5
      }
    }
  };

  const liquidVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 1.2,
        duration: 1,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <motion.div
      ref={logoRef}
      className={`glitch-logo ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ 
        width: size, 
        height: size
      }}
    >
      {/* Liquid Metal Particles */}
      <motion.div 
        className="liquid-container"
        variants={liquidVariants}
      >
        {/* Main particles */}
        <div 
          className="liquid-particle particle-primary"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 15}px)`,
            opacity: Math.max(0.3, Math.abs(mousePosition.x) * 0.4 + Math.abs(mousePosition.y) * 0.3)
          }}
        />
        <div 
          className="liquid-particle particle-secondary"
          style={{
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * 20}px)`,
            opacity: Math.max(0.25, Math.abs(mousePosition.y) * 0.35 + Math.abs(mousePosition.x) * 0.25)
          }}
        />
        <div 
          className="liquid-particle particle-accent"
          style={{
            transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * -10}px)`,
            opacity: Math.max(0.2, Math.abs(mousePosition.x + mousePosition.y) * 0.3)
          }}
        />
        <div 
          className="liquid-particle particle-pink"
          style={{
            transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -18}px)`,
            opacity: Math.max(0.15, Math.abs(mousePosition.x) * 0.25 + Math.abs(mousePosition.y) * 0.2)
          }}
        />
        <div 
          className="liquid-particle particle-extra-1"
          style={{
            transform: `translate(${mousePosition.x * 12}px, ${mousePosition.y * 8}px)`,
            opacity: Math.max(0.1, Math.abs(mousePosition.y) * 0.2)
          }}
        />
        <div 
          className="liquid-particle particle-extra-2"
          style={{
            transform: `translate(${mousePosition.x * -8}px, ${mousePosition.y * 12}px)`,
            opacity: Math.max(0.12, Math.abs(mousePosition.x) * 0.18)
          }}
        />
      </motion.div>

      {/* RGB Split Logo Layers */}
      <div 
        className="logo-split-layer logo-split-primary"
        style={{
          transform: `translate(${mousePosition.x * 6}px, ${mousePosition.y * 4}px)`,
          opacity: Math.max(0.4, Math.min(0.8, Math.abs(mousePosition.x) * 0.6 + Math.abs(mousePosition.y) * 0.5))
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 500 500" 
          width={size} 
          height={size}
          className="split-logo-svg"
        >
          <path d="M 88.478 186.141 L 147.278 101.441 L 257.616 101.606 L 316.242 186.175 L 88.478 186.141 Z" fill="var(--accent-primary)" className="split-logo-piece" />
          <path d="M 151.162 214.519 L 254.816 214.785 L 123.855 401.854 L 88.385 304.265 L 151.162 214.519 Z" fill="var(--accent-primary)" className="split-logo-piece" />
          <path d="M 375.69 100 L 412.058 198.385 L 348.108 288.629 L 243.925 288.629 L 375.69 100 Z" fill="var(--accent-primary)" className="split-logo-piece" />
          <path d="M 183.137 316.443 L 410.625 316.222 L 353.087 400.362 L 241.446 400.15 L 183.137 316.443 Z" fill="var(--accent-primary)" className="split-logo-piece" />
        </svg>
      </div>

      <div 
        className="logo-split-layer logo-split-secondary"
        style={{
          transform: `translate(${mousePosition.x * -4}px, ${mousePosition.y * -5}px)`,
          opacity: Math.max(0.3, Math.min(0.7, Math.abs(mousePosition.x) * 0.5 + Math.abs(mousePosition.y) * 0.4))
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 500 500" 
          width={size} 
          height={size}
          className="split-logo-svg"
        >
          <path d="M 88.478 186.141 L 147.278 101.441 L 257.616 101.606 L 316.242 186.175 L 88.478 186.141 Z" fill="var(--accent-secondary)" className="split-logo-piece" />
          <path d="M 151.162 214.519 L 254.816 214.785 L 123.855 401.854 L 88.385 304.265 L 151.162 214.519 Z" fill="var(--accent-secondary)" className="split-logo-piece" />
          <path d="M 375.69 100 L 412.058 198.385 L 348.108 288.629 L 243.925 288.629 L 375.69 100 Z" fill="var(--accent-secondary)" className="split-logo-piece" />
          <path d="M 183.137 316.443 L 410.625 316.222 L 353.087 400.362 L 241.446 400.15 L 183.137 316.443 Z" fill="var(--accent-secondary)" className="split-logo-piece" />
        </svg>
      </div>

      {/* Main Logo Pieces */}
      <div className="logo-pieces">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 500 500" 
          width={size} 
          height={size}
          className="main-logo-svg"
        >
          <defs>
            <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--logo-color)" stopOpacity="0.95"/>
              <stop offset="50%" stopColor="var(--logo-color)" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="var(--logo-color)" stopOpacity="0.85"/>
            </linearGradient>
            <filter id="logoGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Logo Piece 1 - Top */}
          <motion.path 
            d="M 88.478 186.141 L 147.278 101.441 L 257.616 101.606 L 316.242 186.175 L 88.478 186.141 Z" 
            fill="url(#mainGradient)"
            filter="url(#logoGlow)"
            className={`logo-piece piece-1 ${isHovered ? 'hovered' : ''}`}
            variants={pieceVariants}
          />
          
          {/* Logo Piece 2 - Bottom Left */}
          <motion.path 
            d="M 151.162 214.519 L 254.816 214.785 L 123.855 401.854 L 88.385 304.265 L 151.162 214.519 Z" 
            fill="url(#mainGradient)"
            filter="url(#logoGlow)"
            className={`logo-piece piece-2 ${isHovered ? 'hovered' : ''}`}
            variants={pieceVariants}
          />
          
          {/* Logo Piece 3 - Right */}
          <motion.path 
            d="M 375.69 100 L 412.058 198.385 L 348.108 288.629 L 243.925 288.629 L 375.69 100 Z" 
            fill="url(#mainGradient)"
            filter="url(#logoGlow)"
            className={`logo-piece piece-3 ${isHovered ? 'hovered' : ''}`}
            variants={pieceVariants}
          />
          
          {/* Logo Piece 4 - Bottom */}
          <motion.path 
            d="M 183.137 316.443 L 410.625 316.222 L 353.087 400.362 L 241.446 400.15 L 183.137 316.443 Z" 
            fill="url(#mainGradient)"
            filter="url(#logoGlow)"
            className={`logo-piece piece-4 ${isHovered ? 'hovered' : ''}`}
            variants={pieceVariants}
          />
        </svg>
      </div>

      {/* RGB Split Layers - More Sophisticated */}
      <div 
        className="split-layer split-red"
        style={{
          transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 1.5}px)`,
          opacity: Math.min(0.2, Math.abs(mousePosition.x) * 0.4 + Math.abs(mousePosition.y) * 0.3)
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 500 500" 
          width={size} 
          height={size}
        >
          <g className="split-group">
            <path d="M 88.478 186.141 L 147.278 101.441 L 257.616 101.606 L 316.242 186.175 L 88.478 186.141 Z" fill="var(--accent-primary)" className="split-piece"/>
            <path d="M 151.162 214.519 L 254.816 214.785 L 123.855 401.854 L 88.385 304.265 L 151.162 214.519 Z" fill="var(--accent-primary)" className="split-piece"/>
            <path d="M 375.69 100 L 412.058 198.385 L 348.108 288.629 L 243.925 288.629 L 375.69 100 Z" fill="var(--accent-primary)" className="split-piece"/>
            <path d="M 183.137 316.443 L 410.625 316.222 L 353.087 400.362 L 241.446 400.15 L 183.137 316.443 Z" fill="var(--accent-primary)" className="split-piece"/>
          </g>
        </svg>
      </div>

      <div 
        className="split-layer split-secondary"
        style={{
          transform: `translate(${mousePosition.x * -1.5}px, ${mousePosition.y * -2}px)`,
          opacity: Math.min(0.15, Math.abs(mousePosition.x) * 0.3 + Math.abs(mousePosition.y) * 0.25)
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 500 500" 
          width={size} 
          height={size}
        >
          <g className="split-group">
            <path d="M 88.478 186.141 L 147.278 101.441 L 257.616 101.606 L 316.242 186.175 L 88.478 186.141 Z" fill="var(--accent-secondary)" className="split-piece"/>
            <path d="M 151.162 214.519 L 254.816 214.785 L 123.855 401.854 L 88.385 304.265 L 151.162 214.519 Z" fill="var(--accent-secondary)" className="split-piece"/>
            <path d="M 375.69 100 L 412.058 198.385 L 348.108 288.629 L 243.925 288.629 L 375.69 100 Z" fill="var(--accent-secondary)" className="split-piece"/>
            <path d="M 183.137 316.443 L 410.625 316.222 L 353.087 400.362 L 241.446 400.15 L 183.137 316.443 Z" fill="var(--accent-secondary)" className="split-piece"/>
          </g>
        </svg>
      </div>

      <div 
        className="split-layer split-accent"
        style={{
          transform: `translate(${mousePosition.x * 1}px, ${mousePosition.y * -1}px)`,
          opacity: Math.min(0.1, Math.abs(mousePosition.x) * 0.2 + Math.abs(mousePosition.y) * 0.15)
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 500 500" 
          width={size} 
          height={size}
        >
          <g className="split-group">
            <path d="M 88.478 186.141 L 147.278 101.441 L 257.616 101.606 L 316.242 186.175 L 88.478 186.141 Z" fill="var(--accent-orange)" className="split-piece"/>
            <path d="M 151.162 214.519 L 254.816 214.785 L 123.855 401.854 L 88.385 304.265 L 151.162 214.519 Z" fill="var(--accent-orange)" className="split-piece"/>
            <path d="M 375.69 100 L 412.058 198.385 L 348.108 288.629 L 243.925 288.629 L 375.69 100 Z" fill="var(--accent-orange)" className="split-piece"/>
            <path d="M 183.137 316.443 L 410.625 316.222 L 353.087 400.362 L 241.446 400.15 L 183.137 316.443 Z" fill="var(--accent-orange)" className="split-piece"/>
          </g>
        </svg>
      </div>
    </motion.div>
  );
};

export default GlitchLogo;