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
          <a href="mailto:team@zonda.one" className="footer-email">
            team@zonda.one
          </a>
          <p className="footer-copyright">© 2025 ZONDA</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;