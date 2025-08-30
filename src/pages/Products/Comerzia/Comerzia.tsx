import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Mail, 
  MessageSquare, 
  Zap,
  ArrowRight,
  ExternalLink,
  Bell,
  TrendingUp,
  Brain
} from 'lucide-react';
import Navbar from '../../../components/Navbar/Navbar';
import Button from '../../../components/Button/Button';
import ComerziaLogo from '../../../components/ComerziaLogo/ComerziaLogo';
import Footer from '../../../components/Footer/Footer';
import './Comerzia.css';

gsap.registerPlugin(ScrollTrigger);

const Comerzia: React.FC = () => {
  const sectionsRef = useRef<HTMLElement[]>([]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    sectionsRef.current.forEach((section) => {
      if (section) {
        gsap.fromTo(section,
          {
            y: 50,
            opacity: 0.8
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1,
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const features = [
    {
      icon: <Users size={32} />,
      title: "Client Management",
      description: "Organize and track all your customers in one place. View contact details, order history, and important notes."
    },
    {
      icon: <ShoppingCart size={32} />,
      title: "Order Tracking",
      description: "Manage orders from start to finish. Track status, update details, and keep everything organized."
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Dashboard & Insights",
      description: "Visual charts and reports to understand your business. See sales trends, customer patterns, and key metrics."
    },
    {
      icon: <Mail size={32} />,
      title: "Email Notifications",
      description: "Automatically notify clients about their orders via email. Customizable templates for different scenarios."
    }
  ];

  return (
    <div className="comerzia-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-visual">
              <ComerziaLogo size={80} />
            </div>
            <h1 className="section-title">Comerzia</h1>
            <p className="hero-description">
              Business management app for handling clients and orders. 
              Get insights through dashboard charts and automatically notify customers about their orders.
            </p>
            <div className="hero-actions">
              <Button
                variant="primary"
                size="lg"
                icon={ExternalLink}
                iconPosition="right"
                onClick={() => window.open('#', '_blank')}
              >
                Try Comerzia
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => scrollToSection('features')}
              >
                See Features
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What it does Section */}
      <section 
        id="about" 
        className="section about-section" 
        ref={addToRefs}
      >
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What it does</h2>
            <p className="section-description">
              Comerzia helps small to medium businesses organize their operations. 
              Track customers, manage orders, and stay connected with automatic notifications.
            </p>
          </div>

          <div className="about-stats">
            <div className="stat-card">
              <div className="stat-number">Web</div>
              <div className="stat-label">Application</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-card">
              <div className="stat-number">Live</div>
              <div className="stat-label">Deployed</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-card">
              <div className="stat-number">4</div>
              <div className="stat-label">Core features</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features" 
        className="section features-section" 
        ref={addToRefs}
      >
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Features</h2>
            <p className="section-description">
              Essential tools for managing your business operations efficiently.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="feature-accent"></div>
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Status Section */}
      <section 
        id="status" 
        className="section status-section" 
        ref={addToRefs}
      >
        <div className="container">
          <div className="status-content">
            <h2 className="section-title">Development Status</h2>
            <p className="status-description">
              Comerzia is actively developed with regular updates and new features.
            </p>
            
            <div className="status-grid">
              <div className="status-item">
                <div className="status-indicator complete"></div>
                <span>App created and deployed</span>
              </div>
              <div className="status-item">
                <div className="status-indicator complete"></div>
                <span>Email notifications working</span>
              </div>
              <div className="status-item">
                <div className="status-indicator in-progress"></div>
                <span>SMS notifications (Next)</span>
              </div>
              <div className="status-item">
                <div className="status-indicator planned"></div>
                <span>WhatsApp notifications</span>
              </div>
              <div className="status-item">
                <div className="status-indicator planned"></div>
                <span>Smart suggestions</span>
              </div>
            </div>

            <div className="try-now">
              <Button
                variant="primary"
                size="lg"
                icon={ExternalLink}
                iconPosition="right"
                onClick={() => window.open('#', '_blank')}
              >
                Try Comerzia
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={scrollToSection} />
    </div>
  );
};

export default Comerzia;