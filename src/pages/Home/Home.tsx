import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Shield, Globe } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import ProductCard from '../../components/ProductCard/ProductCard';
import Button from '../../components/Button/Button';
// import Reviews from '../../components/Reviews/Reviews';
import PixelPerfectLogo from '../../components/PixelPerfectLogo/PixelPerfectLogo';
import Footer from '../../components/Footer/Footer';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const sectionsRef = useRef<HTMLElement[]>([]);
  const [state, handleSubmit] = useForm(process.env.REACT_APP_FORMSPREE_ID!);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle hash-based navigation
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      // Wait a bit for the page to render
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 300);
    }
  }, [location.hash]);

  useEffect(() => {
    // Parallax scroll effects for sections
    sectionsRef.current.forEach((section, index) => {
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

  return (
    <div className="home">
      <Navbar />
      
      <section id="home">
        <Hero />
      </section>

      <section 
        id="products" 
        className="section products-section" 
        ref={addToRefs}
      >
        <div className="container">
          <div className="section-header">
            <h2 className="section-title centered animated-gradient-text-fast">Products</h2>
            <p className="section-subtitle">
              Web applications built to solve <span className="animated-gradient-subtle">real business problems</span>
            </p>
          </div>

          <div className="products-grid">
            <ProductCard
              title="PixelPerfect"
              description="Web-based image editor with background removal, batch processing, and automated enhancements. Built for creators who need quick, professional results."
              features={[
                "Remove backgrounds automatically",
                "Enhance images with one click",
                "Process multiple images at once",
                "Generate images with AI",
                "Export in various formats"
              ]}
              status="beta"
              gradient="linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))"
              icon={<PixelPerfectLogo size={24} />}
              onTryNow={() => window.open('https://pixelperfect.zonda.one', '_blank')}
              onLearnMore={() => navigate('/products/pixelperfect')}
            />

            <ProductCard
              title="Comerzia"
              description="Business management dashboard for tracking orders and clients. View analytics, manage inventory, and send automated notifications via email and SMS."
              features={[
                "Track orders and clients",
                "Business analytics dashboard",
                "Inventory management",
                "Email and SMS notifications",
                "Export reports and data"
              ]}
              status="beta"
              gradient="linear-gradient(135deg, var(--accent-cyan), var(--accent-primary))"
              icon={<Zap size={24} />}
              onLearnMore={() => navigate('/products/comerzia')}
            />

            <ProductCard
              title="ComChat"
              description="Custom chatbot for your business website. Handles customer questions, escalates to human support when needed, and can work with your existing data and documents."
              features={[
                "Custom training on your content",
                "Escalate to human support",
                "Multiple chat channels",
                "Analytics and reporting",
                "Privacy-focused options"
              ]}
              status="beta"
              gradient="linear-gradient(135deg, var(--accent-pink), var(--accent-secondary))"
              icon={<Shield size={24} />}
              onLearnMore={() => navigate('/products/comchat')}
            />
          </div>
        </div>
      </section>
      
      <section 
        id="about" 
        className="section about-section" 
        ref={addToRefs}
      >
        <div className="container">
          <div className="content-grid">
            <div className="content-left">
              <h2 className="section-title animated-gradient-text">
                About ZONDA
              </h2>
              <p className="section-description">
                We develop web applications for businesses and individuals. 
                Our team builds practical tools that help you manage your work more efficiently. 
                From image editing to business management, we create software that solves real problems.
              </p>
              <div className="stats-grid">
                <div className="stat-item glass">
                  <span className="stat-number">3</span>
                  <span className="stat-label">Products</span>
                </div>
                <div className="stat-item glass">
                  <span className="stat-number">2024</span>
                  <span className="stat-label">Founded</span>
                </div>
                <div className="stat-item glass">
                  <span className="stat-number">Remote</span>
                  <span className="stat-label">Team</span>
                </div>
              </div>
            </div>
            <div className="content-right">
              <div className="feature-card glass glass-hover">
                <div className="feature-icon"><Zap size={24} /></div>
                <h3>Web Applications</h3>
                <p>Custom web apps built for your specific business requirements</p>
              </div>
              <div className="feature-card glass glass-hover">
                <div className="feature-icon"><Globe size={24} /></div>
                <h3>Modern Technology</h3>
                <p>Using current web technologies and best practices for reliable results</p>
              </div>
              <div className="feature-card glass glass-hover">
                <div className="feature-icon"><Shield size={24} /></div>
                <h3>Support Included</h3>
                <p>Ongoing maintenance and support for all our applications</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* <Reviews /> */}
      
      <section 
        id="contact" 
        className="section contact-section" 
        ref={addToRefs}
      >
        <div className="container">
          <div className="contact-content">
            <div className="contact-left">
              <h2 className="section-title animated-gradient-text-fast">Get in Touch</h2>
              <p className="section-description">
                Need a custom web application or have questions about our products? 
                We'd love to hear from you. Send us a message and we'll get back to you soon.
              </p>
            
            </div>
            
            <div className="contact-right">
              {state.succeeded ? (
                <div className="form-success-message glass">
                  <h3>✓ Thank you for your message!</h3>
                  <p>We've received your message and will get back to you soon.</p>
                </div>
              ) : (
                <form className="contact-form glass" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input 
                      type="text" 
                      name="name"
                      placeholder="Your Name" 
                      className="form-input glass"
                      required 
                    />
                    <ValidationError 
                      prefix="Name" 
                      field="name"
                      errors={state.errors}
                      className="validation-error"
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="email" 
                      name="email"
                      placeholder="Email Address" 
                      className="form-input glass"
                      required 
                    />
                    <ValidationError 
                      prefix="Email" 
                      field="email"
                      errors={state.errors}
                      className="validation-error"
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="text" 
                      name="company"
                      placeholder="Company (optional)" 
                      className="form-input glass"
                    />
                    <ValidationError 
                      prefix="Company" 
                      field="company"
                      errors={state.errors}
                      className="validation-error"
                    />
                  </div>
                  <div className="form-group">
                    <textarea 
                      name="message"
                      placeholder="What's on your mind?" 
                      className="form-textarea glass"
                      rows={4}
                      required
                    ></textarea>
                    <ValidationError 
                      prefix="Message" 
                      field="message"
                      errors={state.errors}
                      className="validation-error"
                    />
                  </div>
                  
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={state.submitting}
                  >
                    {state.submitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Footer onNavigate={scrollToSection} />
    </div>
  );
};

export default Home;