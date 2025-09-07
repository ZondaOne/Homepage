import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, MessageCircle, Globe, User } from 'lucide-react';
import GlitchLogo from '../GlitchLogo/GlitchLogo';
import './Navbar.css';

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
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

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <>
      <motion.nav 
        className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`} 
        ref={navRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="navbar-container">
          {/* Logo Section */}
          <div className="navbar-brand">
            <button onClick={() => navigateToSection('home')} className="navbar-logo">
              <div className="navbar-logo-wrapper">
                <GlitchLogo />
              </div>
              <span className="logo-text">ZONDA</span>
            </button>
          </div>

          {/* Main Navigation Menu */}
          <div className="navbar-nav">
            <div className="navbar-menu">
              <div className="nav-item">
                <button 
                  onClick={() => handleDropdownToggle('products')} 
                  className="navbar-link dropdown-toggle"
                >
                  Products
                  <svg className="dropdown-arrow" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M4.5 6L8 9.5L11.5 6H4.5Z"/>
                  </svg>
                </button>
                <AnimatePresence>
                  {activeDropdown === 'products' && (
                    <motion.div
                      className="dropdown-menu"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button onClick={() => navigateToSection('products')} className="dropdown-item">All Products</button>
                      <button onClick={() => navigateToSection('solutions')} className="dropdown-item">Solutions</button>
                      <button onClick={() => navigateToSection('services')} className="dropdown-item">Services</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button onClick={() => navigateToSection('consulting')} className="navbar-link">Consulting</button>
              
              <div className="nav-item">
                <button 
                  onClick={() => handleDropdownToggle('support')} 
                  className="navbar-link dropdown-toggle"
                >
                  Support
                  <svg className="dropdown-arrow" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M4.5 6L8 9.5L11.5 6H4.5Z"/>
                  </svg>
                </button>
                <AnimatePresence>
                  {activeDropdown === 'support' && (
                    <motion.div
                      className="dropdown-menu"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button onClick={() => navigateToSection('support')} className="dropdown-item">Help Center</button>
                      <button onClick={() => navigateToSection('documentation')} className="dropdown-item">Documentation</button>
                      <button onClick={() => navigateToSection('community')} className="dropdown-item">Community</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button onClick={() => navigateToSection('about')} className="navbar-link">About</button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="navbar-actions">
            <button className="action-btn" aria-label="Search">
              <Search size={18} />
            </button>
            <button className="action-btn" aria-label="Support">
              <MessageCircle size={18} />
            </button>
            <button className="action-btn" aria-label="Language">
              <Globe size={18} />
            </button>
            <button className="cta-button" onClick={() => navigateToSection('contact')}>
              Contact Sales
            </button>
            <button className="action-btn user-btn" aria-label="User account">
              <User size={18} />
            </button>
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
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mobile-menu-content">
                <button onClick={() => navigateToSection('home')} className="mobile-menu-link">Home</button>
                <button onClick={() => navigateToSection('products')} className="mobile-menu-link">Products</button>
                <button onClick={() => navigateToSection('consulting')} className="mobile-menu-link">Consulting</button>
                <button onClick={() => navigateToSection('support')} className="mobile-menu-link">Support</button>
                <button onClick={() => navigateToSection('about')} className="mobile-menu-link">About</button>
                <div className="mobile-menu-actions">
                  <button className="mobile-cta-button" onClick={() => navigateToSection('contact')}>
                    Contact Sales
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Overlay for dropdowns */}
      {activeDropdown && (
        <div 
          className="dropdown-overlay" 
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </>
  );
};

export default Navbar;