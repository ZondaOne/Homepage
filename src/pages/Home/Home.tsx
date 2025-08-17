import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Shield, Globe } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import AnimatedBackground from '../../components/Background/AnimatedBackground';
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
      <AnimatedBackground />
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
            <h2 className="section-title centered animated-gradient-text-fast">Our Products</h2>
            <p className="section-subtitle">
              Cutting-edge tools designed for the <span className="animated-gradient-subtle">digital-first generation</span>
            </p>
          </div>

          <div className="products-grid">
            <ProductCard
              title="PixelPerfect"
              description="AI-powered image editing tool that revolutionizes creative workflows with intelligent automation and professional-grade results."
              features={[
                "AI-driven auto-enhancement",
                "Background removal & replacement",
                "Smart object recognition",
                "Batch processing capabilities",
                "Cloud-based collaboration"
              ]}
              status="beta"
              gradient="linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))"
              icon={<PixelPerfectLogo size={24} />}
              onTryNow={() => window.open('https://pixelperfect.zonda.one', '_blank')}
              onLearnMore={() => navigate('/products/pixelperfect')}
            />

            <ProductCard
              title="Comerzia"
              description="Web app for managing orders and clients with dashboard for insights and automatic notification via email or SMS."
              features={[
                "Order management system",
                "Client database",
                "Analytics dashboard",
                "Email notifications",
                "SMS notifications"
              ]}
              status="beta"
              gradient="linear-gradient(135deg, var(--accent-cyan), var(--accent-primary))"
              icon={<Zap size={24} />}
              onLearnMore={() => navigate('/products/comerzia')}
            />

            <ProductCard
              title="ComChat"
              description="A fully customizable chatbot for commerces and companies. Can be text or multimodal, have specific context for any type of activity and delegate to professional technical for help when necessary. Support for local LLMs for maximum privacy if required."
              features={[
                "Text and multimodal support",
                "Customizable for any business",
                "Professional technical delegation",
                "Local LLM support",
                "Maximum privacy protection"
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
                Built for Innovation, Tailored for You
              </h2>
              <p className="section-description">
                We're a young startup focused on developing innovative applications and 
                delivering custom solutions to individuals and companies. ZONDA specializes 
                in creating powerful web applications using a diverse technological stack, 
                adapting our approach to meet each project's unique needs and requirements.
              </p>
              <div className="stats-grid">
                <div className="stat-item glass">
                  <span className="stat-number">3</span>
                  <span className="stat-label">Products</span>
                </div>
                <div className="stat-item glass">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Remote</span>
                </div>
                <div className="stat-item glass">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Innovation</span>
                </div>
              </div>
            </div>
            <div className="content-right">
              <div className="feature-card glass glass-hover">
                <div className="feature-icon"><Zap size={24} /></div>
                <h3>Custom Solutions</h3>
                <p>Tailored web applications designed to meet your specific business needs</p>
              </div>
              <div className="feature-card glass glass-hover">
                <div className="feature-icon"><Globe size={24} /></div>
                <h3>Tech Versatility</h3>
                <p>Working with diverse technologies to choose the best stack for each project</p>
              </div>
              <div className="feature-card glass glass-hover">
                <div className="feature-icon"><Shield size={24} /></div>
                <h3>Client-Focused</h3>
                <p>From individuals to enterprises, we deliver solutions that drive results</p>
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
              <h2 className="section-title animated-gradient-text-fast">Let's Build Something Amazing</h2>
              <p className="section-description">
                Got an idea? Want to collaborate? Or just want to say hi? 
                We're always excited to connect with fellow innovators, creators, 
                and dreamers. Drop us a line and let's start the conversation.
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