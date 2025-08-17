import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Button from '../Button/Button';
import './Navbar.css';

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToSection = (sectionId: string) => {
    if (location.pathname === '/') {
      // If we're on the home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on another page, navigate to home with hash
      navigate(`/#${sectionId}`);
      // Small delay to ensure navigation completes before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        delay: 0.5
      }
    }
  };

  return (
    <motion.nav 
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`} 
      ref={navRef}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => navigateToSection('home')}>
          <span className="logo-text">ZONDA</span>
        </div>
        
        <div className="navbar-menu">
          <button onClick={() => navigateToSection('home')} className="navbar-link">
            Home
          </button>
          <button onClick={() => navigateToSection('products')} className="navbar-link">
            Products
          </button>
          <button onClick={() => navigateToSection('about')} className="navbar-link">
            About
          </button>
          <button onClick={() => navigateToSection('contact')} className="navbar-link">
            Contact
          </button>
        </div>

        <div className="navbar-cta">
          <Button 
            variant="primary" 
            size="sm"
            icon={ExternalLink}
            iconPosition="right"
            onClick={() => navigateToSection('contact')}
          >
            Get Started
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;