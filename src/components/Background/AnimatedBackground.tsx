import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './AnimatedBackground.css';

const AnimatedBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create floating particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      containerRef.current.appendChild(particle);
      particlesRef.current.push(particle);
    }

    // Animate particles
    particlesRef.current.forEach((particle, index) => {
      gsap.to(particle, {
        y: -100,
        duration: gsap.utils.random(15, 25),
        repeat: -1,
        ease: "none",
        delay: index * 0.5
      });

      gsap.to(particle, {
        x: gsap.utils.random(-50, 50),
        duration: gsap.utils.random(8, 12),
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: index * 0.3
      });
    });

    return () => {
      particlesRef.current.forEach(particle => {
        particle.remove();
      });
      particlesRef.current = [];
    };
  }, []);

  return (
    <div className="animated-background" ref={containerRef}>
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>
      <div className="grid-overlay"></div>
    </div>
  );
};

export default AnimatedBackground;