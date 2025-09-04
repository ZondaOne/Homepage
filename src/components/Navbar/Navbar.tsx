import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import GlitchLogo from '../GlitchLogo/GlitchLogo';
import './Navbar.css';

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const navVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, delay: 0.2 } }
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const } },
    open: { opacity: 1, height: "auto" as const, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const } }
  };

  return (
    <motion.nav 
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`} 
      ref={navRef}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Logo + ZONDA pegado a la izquierda */}
      <div className="navbar-left">
        <button onClick={() => navigateToSection('home')} className="navbar-logo">
          <div className="navbar-logo-wrapper">
            <GlitchLogo />
          </div>
          <span className="logo-text">ZONDA</span>
        </button>
      </div>

      {/* Contenedor principal del menú centrado */}
      <div className="navbar-container">
        <div className="navbar-menu">
          <button onClick={() => navigateToSection('home')} className="navbar-link">Home</button>
          <button onClick={() => navigateToSection('products')} className="navbar-link">Products</button>
          <button onClick={() => navigateToSection('about')} className="navbar-link">About</button>
          <button onClick={() => navigateToSection('contact')} className="navbar-link">Contact</button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="mobile-menu-content">
              <button onClick={() => navigateToSection('home')} className="mobile-menu-link">Home</button>
              <button onClick={() => navigateToSection('products')} className="mobile-menu-link">Products</button>
              <button onClick={() => navigateToSection('about')} className="mobile-menu-link">About</button>
              <button onClick={() => navigateToSection('contact')} className="mobile-menu-link">Contact</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
