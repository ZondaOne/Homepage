import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Scissors, 
  Eraser,
  Maximize2, 
  Expand, 
  Wand2,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import Navbar from '../../../components/Navbar/Navbar';
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
      icon: <Scissors size={32} />,
      title: "Background Removal",
      description: "Remove backgrounds from photos with one click. Perfect for product shots and portraits."
    },
    {
      icon: <Eraser size={32} />,
      title: "Object Removal",
      description: "Remove unwanted objects, people, or text from your images seamlessly."
    },
    {
      icon: <Maximize2 size={32} />,
      title: "Image Upscaling",
      description: "Enhance image quality with 2x and 4x upscaling. Make small images crisp and clear."
    },
    {
      icon: <Expand size={32} />,
      title: "Image Enlarger",
      description: "Expand images beyond their borders. Generates new content to fill extended areas."
    },
    {
      icon: <Wand2 size={32} />,
      title: "Generate Images",
      description: "Create new images from text descriptions. Turn ideas into visuals instantly."
    }
  ];

  return (
    <div className="pixelperfect-page">
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
              <PixelPerfectLogo size={80} />
            </div>
            <h1 className="section-title">PixelPerfect</h1>
            <p className="hero-description">
              Professional image editing powered by advanced technology. Remove backgrounds, 
              upscale images, and generate content with precision and ease.
            </p>
            <div className="hero-status">
              <span className="status-badge">Beta</span>
            </div>
            <div className="hero-actions">
              <Button
                variant="primary"
                size="lg"
                icon={ExternalLink}
                iconPosition="right"
                onClick={() => window.open('https://pixelperfect.zonda.one', '_blank')}
              >
                Try Beta
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
              Five powerful image editing tools in one platform. From background removal 
              to image generation, everything you need for professional results.
            </p>
          </div>

          <div className="about-stats">
            <div className="stat-card">
              <div className="stat-number">5</div>
              <div className="stat-label">Core tools</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-card">
              <div className="stat-number">4K</div>
              <div className="stat-label">Max resolution</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-card">
              <div className="stat-number">Free</div>
              <div className="stat-label">Basic plan</div>
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
              Professional-grade tools that deliver precise results every time.
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
              All core services are implemented and currently being deployed. 
              API access and public release coming soon.
            </p>
            
            <div className="status-grid">
              <div className="status-item">
                <div className="status-indicator complete"></div>
                <span>All 5 core services implemented</span>
              </div>
              <div className="status-item">
                <div className="status-indicator in-progress"></div>
                <span>Currently deploying services</span>
              </div>
              <div className="status-item">
                <div className="status-indicator planned"></div>
                <span>API and batch processing (Next)</span>
              </div>
              <div className="status-item">
                <div className="status-indicator planned"></div>
                <span>Public release (Coming soon)</span>
              </div>
            </div>

            <div className="try-now">
              <Button
                variant="primary"
                size="lg"
                icon={ExternalLink}
                iconPosition="right"
                onClick={() => window.open('https://pixelperfect.zonda.one', '_blank')}
              >
                Try Beta Access
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={scrollToSection} />
    </div>
  );
};

export default PixelPerfect;