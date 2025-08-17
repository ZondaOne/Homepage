import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Image, 
  Wand2, 
  Layers, 
  Zap, 
  Cloud, 
  Users, 
  ArrowRight,
  ExternalLink,
  Cpu,
  Database,
  Shield,
  Workflow
} from 'lucide-react';
import Navbar from '../../../components/Navbar/Navbar';
import AnimatedBackground from '../../../components/Background/AnimatedBackground';
import ParallaxCarousel from '../../../components/ParallaxCarousel/ParallaxCarousel';
import Button from '../../../components/Button/Button';
import PixelPerfectLogo from '../../../components/PixelPerfectLogo/PixelPerfectLogo';
import Footer from '../../../components/Footer/Footer';
import './PixelPerfect.css';

gsap.registerPlugin(ScrollTrigger);

const PixelPerfect: React.FC = () => {
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
      src: "/pixelperfect/homepage.png",
      alt: "PixelPerfect Homepage Interface",
      title: "AI-Powered Interface",
      description: "Clean and intuitive interface for professional image editing"
    },
    {
      src: "/pixelperfect/background-removal.png",
      alt: "Background Removal Tool",
      title: "Smart Background Removal",
      description: "Precise object detection for seamless background replacement"
    },
    {
      src: "/pixelperfect/image-generation.png",
      alt: "AI Image Generation",
      title: "AI Image Generation",
      description: "Create stunning images from text descriptions using AI"
    }
  ];

  const architectureComponents = [
    {
      icon: <Cpu size={32} />,
      title: "AI Processing Engine",
      description: "Advanced neural networks for image analysis and enhancement",
      tech: "TensorFlow, PyTorch"
    },
    {
      icon: <Database size={32} />,
      title: "Cloud Storage",
      description: "Secure, scalable storage with global CDN distribution",
      tech: "AWS S3, CloudFront"
    },
    {
      icon: <Shield size={32} />,
      title: "Security Layer",
      description: "End-to-end encryption and privacy protection",
      tech: "AES-256, OAuth 2.0"
    },
    {
      icon: <Workflow size={32} />,
      title: "Processing Pipeline",
      description: "Optimized workflow for real-time image processing",
      tech: "Node.js, Redis"
    }
  ];

  const features = [
    {
      icon: <Wand2 size={24} />,
      title: "AI-Driven Auto-Enhancement",
      description: "Automatically improve brightness, contrast, and saturation with machine learning algorithms that understand your content.",
      benefits: ["50% faster editing", "Professional results", "One-click enhancement"]
    },
    {
      icon: <Layers size={24} />,
      title: "Background Removal & Replacement",
      description: "Precise object detection and segmentation for seamless background manipulation and creative compositing.",
      benefits: ["Pixel-perfect edges", "Smart object detection", "Creative freedom"]
    },
    {
      icon: <Zap size={24} />,
      title: "Batch Processing",
      description: "Process hundreds of images simultaneously with consistent quality and automated workflows.",
      benefits: ["Bulk operations", "Time efficiency", "Consistent results"]
    },
    {
      icon: <Cloud size={24} />,
      title: "Cloud-Based Collaboration",
      description: "Real-time collaboration tools with version control and shared workspaces for creative teams.",
      benefits: ["Team workflows", "Version history", "Global access"]
    }
  ];

  return (
    <div className="pixelperfect-page">
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
              <PixelPerfectLogo size={64} />
            </div>
            <h1 className="hero-title animated-gradient-text-fast">PixelPerfect</h1>
            <p className="hero-subtitle">
              AI-powered image editing tool that revolutionizes creative workflows with 
              intelligent automation and <span className="animated-gradient-subtle">professional-grade results</span>
            </p>
            <div className="hero-status">
              <span className="status-badge beta">Beta</span>
            </div>
            <div className="hero-actions">
              <Button
                variant="primary"
                size="lg"
                icon={ExternalLink}
                iconPosition="right"
                onClick={() => window.open('https://pixelperfect.zonda.one', '_blank')}
              >
                Try Beta Version
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

      {/* Overview Section */}
      <section 
        id="overview" 
        className="section overview-section" 
        ref={addToRefs}
      >
        <div className="container">
          <div className="section-header">
            <h2 className="section-title animated-gradient-text">Redefining Image Editing</h2>
            <p className="section-subtitle">
              PixelPerfect combines the power of artificial intelligence with intuitive design 
              to deliver professional-grade image editing capabilities that adapt to your creative vision.
            </p>
          </div>

          <div className="overview-grid">
            <div className="overview-card glass glass-hover">
              <div className="card-icon">
                <Image size={32} />
              </div>
              <h3>Smart Enhancement</h3>
              <p>AI algorithms analyze and enhance your images automatically, understanding context and content for optimal results.</p>
            </div>
            <div className="overview-card glass glass-hover">
              <div className="card-icon">
                <Users size={32} />
              </div>
              <h3>Team Collaboration</h3>
              <p>Built-in collaboration tools enable seamless teamwork with real-time editing, comments, and version control.</p>
            </div>
            <div className="overview-card glass glass-hover">
              <div className="card-icon">
                <Zap size={32} />
              </div>
              <h3>Lightning Fast</h3>
              <p>Optimized processing pipeline ensures rapid editing and rendering, even for high-resolution images and batch operations.</p>
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
            title="See PixelPerfect in Action"
            subtitle="Explore the interface and discover how AI-powered editing transforms your creative workflow"
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
            <h2 className="section-title animated-gradient-text">Technical Architecture</h2>
            <p className="section-subtitle">
              Built on modern, scalable infrastructure designed for performance, reliability, and security
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

          <div className="architecture-diagram glass">
            <h3>System Flow</h3>
            <div className="flow-container">
              <div className="flow-step">
                <div className="step-circle">1</div>
                <span>Image Upload</span>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">
                <div className="step-circle">2</div>
                <span>AI Analysis</span>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">
                <div className="step-circle">3</div>
                <span>Processing</span>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">
                <div className="step-circle">4</div>
                <span>Enhanced Output</span>
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
            <h2 className="section-title animated-gradient-text">Powerful Features</h2>
            <p className="section-subtitle">
              Every tool designed to enhance your creative workflow and deliver professional results
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
            <h2 className="cta-title animated-gradient-text-fast">Ready to Transform Your Images?</h2>
            <p className="cta-description">
              Join the beta and experience the future of AI-powered image editing. 
              Get early access to cutting-edge features and help shape the product.
            </p>
            <div className="cta-actions">
              <Button
                variant="primary"
                size="lg"
                icon={ExternalLink}
                iconPosition="right"
                onClick={() => window.open('https://pixelperfect.zonda.one', '_blank')}
              >
                Start Free Beta
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => scrollToSection('contact')}
              >
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer onNavigate={scrollToSection} />
    </div>
  );
};

export default PixelPerfect;