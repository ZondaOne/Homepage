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
  Database,
  Smartphone,
  Shield,
  Workflow,
  Bell,
  TrendingUp,
  Package,
  Calendar
} from 'lucide-react';
import Navbar from '../../../components/Navbar/Navbar';
import AnimatedBackground from '../../../components/Background/AnimatedBackground';
import ParallaxCarousel from '../../../components/ParallaxCarousel/ParallaxCarousel';
import Button from '../../../components/Button/Button';
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

  const carouselImages = [
    {
      src: "/comerzia/homepage.png",
      alt: "Comerzia Homepage",
      title: "Welcome Dashboard",
      description: "Clean and modern interface for business management"
    },
    {
      src: "/comerzia/dashboard.png",
      alt: "Comerzia Dashboard Overview",
      title: "Comprehensive Dashboard",
      description: "Get real-time insights into your business performance"
    },
    {
      src: "/comerzia/orders-table.png",
      alt: "Order Management Interface",
      title: "Order Management",
      description: "Streamlined workflow for processing and tracking orders"
    },
    {
      src: "/comerzia/clients.png",
      alt: "Client Database",
      title: "Client Management",
      description: "Organize and manage your customer relationships"
    }
  ];

  const architectureComponents = [
    {
      icon: <Database size={32} />,
      title: "Customer Database",
      description: "Centralized customer data management with advanced search and segmentation",
      tech: "PostgreSQL, Redis"
    },
    {
      icon: <Workflow size={32} />,
      title: "Order Processing Engine",
      description: "Automated workflow system for order lifecycle management",
      tech: "Node.js, Bull Queue"
    },
    {
      icon: <Bell size={32} />,
      title: "Notification Service",
      description: "Multi-channel communication system with smart triggers",
      tech: "Twilio, SendGrid"
    },
    {
      icon: <Shield size={32} />,
      title: "Security & Analytics",
      description: "Real-time analytics with enterprise-grade security",
      tech: "Elasticsearch, JWT"
    }
  ];

  const features = [
    {
      icon: <ShoppingCart size={24} />,
      title: "Order Management System",
      description: "Complete order lifecycle management from creation to fulfillment with real-time status tracking and automated workflows.",
      benefits: ["Order tracking", "Status automation", "Fulfillment management"]
    },
    {
      icon: <Users size={24} />,
      title: "Client Database",
      description: "Comprehensive customer relationship management with detailed profiles, purchase history, and segmentation tools.",
      benefits: ["Customer profiles", "Purchase history", "Smart segmentation"]
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Analytics Dashboard",
      description: "Real-time business insights with customizable reports, sales analytics, and performance metrics.",
      benefits: ["Real-time insights", "Custom reports", "Performance tracking"]
    },
    {
      icon: <Mail size={24} />,
      title: "Email Notifications",
      description: "Automated email communication system with customizable templates and trigger-based messaging.",
      benefits: ["Automated emails", "Custom templates", "Smart triggers"]
    },
    {
      icon: <MessageSquare size={24} />,
      title: "SMS Notifications",
      description: "Direct SMS communication for urgent updates, order confirmations, and customer engagement.",
      benefits: ["Instant delivery", "Order updates", "Customer engagement"]
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Business Intelligence",
      description: "Advanced analytics and forecasting tools to help you make data-driven business decisions.",
      benefits: ["Sales forecasting", "Trend analysis", "ROI tracking"]
    }
  ];

  const stats = [
    { number: "99.9%", label: "Uptime" },
    { number: "50%", label: "Time Saved" },
    { number: "24/7", label: "Support" },
    { number: "< 2s", label: "Response Time" }
  ];

  return (
    <div className="comerzia-page">
      <AnimatedBackground />
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
            <div className="hero-icon">
              <Zap size={64} />
            </div>
            <h1 className="hero-title animated-gradient-text-fast">Comerzia</h1>
            <p className="hero-subtitle">
              Web app for managing orders and clients with dashboard for insights and 
              <span className="animated-gradient-subtle"> automatic notification</span> via email or SMS
            </p>
            <div className="hero-status">
              <span className="status-badge beta">Beta</span>
            </div>
            <div className="hero-actions">
              <Button
                variant="neon"
                size="lg"
                icon={ExternalLink}
                iconPosition="right"
                onClick={() => console.log('Join Beta')}
              >
                Join Beta Program
              </Button>
              <Button
                variant="ghost"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => scrollToSection('features')}
              >
                Explore Features
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        id="stats" 
        className="section stats-section" 
        ref={addToRefs}
      >
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card glass glass-hover"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="stat-number animated-gradient-text">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section 
        id="overview" 
        className="section overview-section" 
        ref={addToRefs}
      >
        <div className="container">
          <div className="overview-content">
            <div className="overview-text">
              <h2 className="section-title animated-gradient-text">Complete Business Management Solution</h2>
              <p className="section-description">
                Comerzia streamlines your entire business operation with intelligent order management, 
                comprehensive client database, and actionable insights. From order creation to customer 
                communication, everything you need is unified in one powerful platform.
              </p>
              <div className="overview-highlights">
                <div className="highlight-item">
                  <Package size={20} />
                  <span>Streamlined order processing</span>
                </div>
                <div className="highlight-item">
                  <Users size={20} />
                  <span>Centralized customer management</span>
                </div>
                <div className="highlight-item">
                  <Calendar size={20} />
                  <span>Automated notifications</span>
                </div>
              </div>
            </div>
            <div className="overview-visual">
              <div className="feature-showcase glass">
                <div className="showcase-header">
                  <h3>Dashboard Preview</h3>
                </div>
                <div className="showcase-content">
                  <div className="metric-row">
                    <span>Orders Today</span>
                    <span className="metric-value">127</span>
                  </div>
                  <div className="metric-row">
                    <span>New Customers</span>
                    <span className="metric-value">23</span>
                  </div>
                  <div className="metric-row">
                    <span>Revenue</span>
                    <span className="metric-value">$12,450</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Gallery */}
      <section 
        id="gallery" 
        className="section gallery-section" 
        ref={addToRefs}
      >
        <div className="container">
          <ParallaxCarousel
            images={carouselImages}
            title="Experience Comerzia in Action"
            subtitle="Discover how intelligent automation and insightful analytics transform your business operations"
          />
        </div>
      </section>

      {/* Architecture Section */}
      <section 
        id="architecture" 
        className="section architecture-section" 
        ref={addToRefs}
      >
        <div className="container">
          <div className="section-header">
            <h2 className="section-title animated-gradient-text">Built for Scale & Performance</h2>
            <p className="section-subtitle">
              Enterprise-grade architecture designed to grow with your business while maintaining peak performance
            </p>
          </div>

          <div className="architecture-grid">
            {architectureComponents.map((component, index) => (
              <motion.div
                key={index}
                className="architecture-card glass glass-hover"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="arch-icon">
                  {component.icon}
                </div>
                <h3>{component.title}</h3>
                <p>{component.description}</p>
                <div className="tech-stack">
                  <span className="tech-badge">{component.tech}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="integration-flow glass">
            <h3>Integration Ecosystem</h3>
            <div className="integration-grid">
              <div className="integration-item">
                <Mail size={24} />
                <span>Email Services</span>
              </div>
              <div className="integration-item">
                <Smartphone size={24} />
                <span>SMS Gateway</span>
              </div>
              <div className="integration-item">
                <ShoppingCart size={24} />
                <span>E-commerce</span>
              </div>
              <div className="integration-item">
                <BarChart3 size={24} />
                <span>Analytics</span>
              </div>
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
            <h2 className="section-title animated-gradient-text">Comprehensive Feature Set</h2>
            <p className="section-subtitle">
              Everything you need to manage orders, customers, and communications in one integrated platform
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card glass glass-hover"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="feature-header">
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                  <h3>{feature.title}</h3>
                </div>
                <p className="feature-description">{feature.description}</p>
                <ul className="feature-benefits">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex}>{benefit}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        id="cta" 
        className="section cta-section" 
        ref={addToRefs}
      >
        <div className="container">
          <motion.div 
            className="cta-content glass"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="cta-title animated-gradient-text-fast">Ready to Streamline Your Business?</h2>
            <p className="cta-description">
              Join the beta program and be among the first to experience the future of business management. 
              Get exclusive access to cutting-edge features and help shape the product roadmap.
            </p>
            <div className="cta-actions">
              <Button
                variant="neon"
                size="lg"
                icon={ExternalLink}
                iconPosition="right"
                onClick={() => console.log('Join Beta')}
              >
                Join Beta Program
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => scrollToSection('contact')}
              >
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer onNavigate={scrollToSection} />
    </div>
  );
};

export default Comerzia;