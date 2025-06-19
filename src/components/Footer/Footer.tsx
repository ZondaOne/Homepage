import React from 'react';
import { ExternalLink} from 'lucide-react';
import Button from '../Button/Button';
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
          <div className="footer-left">
            <div className="footer-logo">
              <span className="logo-text">ZONDA</span>
            </div>
            <p className="footer-description">
              Empowering the next generation of digital innovation.
            </p>
            <div className="footer-stats">
              <div className="footer-stat">
                <span className="stat-number">∞</span>
                <span className="stat-label">Possibilities</span>
              </div>
              <div className="footer-stat">
                <span className="stat-number">2025</span>
                <span className="stat-label">Founded</span>
              </div>
            </div>
          </div>
          
          <div className="footer-right">
            <div className="footer-section">
              <h4 className="footer-section-title">Products</h4>
              <div className="footer-links">
                <button 
                  onClick={() => scrollToSection('products')} 
                  className="footer-link"
                >
                  PixelPerfect
                </button>
                <button 
                  onClick={() => scrollToSection('products')} 
                  className="footer-link"
                >
                  ZondaFlow
                </button>
                <button 
                  onClick={() => scrollToSection('products')} 
                  className="footer-link"
                >
                  SecureVault
                </button>
              </div>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-section-title">Company</h4>
              <div className="footer-links">
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="footer-link"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="footer-link"
                >
                  Contact
                </button>
                <a href="#careers" className="footer-link">
                  Careers
                </a>
              </div>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-section-title">Connect</h4>
              <div className="footer-social">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  icon={ExternalLink} 
                  iconPosition="left"
                  onClick={() => window.open('https://linkedin.com', '_blank')}
                >
                  LinkedIn
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  icon={ExternalLink} 
                  iconPosition="left"
                  onClick={() => window.open('https://twitter.com', '_blank')}
                >
                  Twitter
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  icon={ExternalLink} 
                  iconPosition="left"
                  onClick={() => window.open('https://github.com', '_blank')}
                >
                  GitHub
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 ZONDA. All rights reserved. Built with passion for innovation.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;