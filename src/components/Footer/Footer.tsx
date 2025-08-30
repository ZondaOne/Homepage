import React from 'react';
import './Footer.css';

interface FooterProps {
  onNavigate?: (sectionId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToSection = (sectionId: string) => {
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-links">
            <button onClick={() => scrollToSection('about')} className="footer-link">
              About
            </button>
            <button onClick={() => scrollToSection('products')} className="footer-link">
              Products
            </button>
            <button onClick={() => scrollToSection('contact')} className="footer-link">
              Contact
            </button>
            <a href="mailto:team@zonda.one" className="footer-link">
              team@zonda.one
            </a>
          </div>
          
          <div className="footer-bottom">
            <p>© 2025 ZONDA</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;