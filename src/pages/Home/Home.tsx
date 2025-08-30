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
import ComerziaLogo from '../../components/ComerziaLogo/ComerziaLogo';
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
            <h2 className="section-title centered">Our Work</h2>
            <p className="section-subtitle">
              Tools we've built to make work easier
            </p>
          </div>

          <div className="products-grid">
            <ProductCard
              title="PixelPerfect"
              subtitle="Professional image editing made simple"
              gradient="linear-gradient(135deg, #FF914D, #FF3131)"
              icon={<PixelPerfectLogo size={64} />}
              onLearnMore={() => navigate('/products/pixelperfect')}
            />

            <ProductCard
              title="Comerzia"
              subtitle="Business management that works"
              gradient="linear-gradient(135deg, #007AFF, #FF914D)"
              icon={<ComerziaLogo size={64} />}
              onLearnMore={() => navigate('/products/comerzia')}
            />

            <ProductCard
              title="ComChat"
              subtitle="Customer service, automated"
              gradient="linear-gradient(135deg, #FF2D92, #FF3131)"
              icon={<Shield size={64} />}
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
          <div className="about-content">
            <h2 className="section-title centered">About Us</h2>
            <p className="about-headline">
              We build tools that solve real problems.
            </p>
            <p className="about-description">
              Simple, powerful apps that help you work better. 
              No complexity, no confusion. Just tools that work.
            </p>
            
            <div className="founders-placeholder">
              <div className="founders-image">
                <img src="/founders.png" alt="Founders" className="founders-photo" />
              </div>
            </div>
            
            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">4</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <span className="stat-number">2025</span>
                <span className="stat-label">Founded</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <span className="stat-number">Remote</span>
                <span className="stat-label">Team</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* <Reviews /> */}
      
      <section id="contact" className="contact-section" ref={addToRefs}>
        <div className="container">
          <div className="contact-content">
            <div className="contact-header">
              <h2 className="section-title centered">Let's create something together.</h2>
              <p className="contact-subtitle">
                Ready to bring your vision to life? Let's start the conversation.
              </p>
            </div>
            
            {state.succeeded ? (
              <div className="contact-success">
                <div className="success-icon">✓</div>
                <h3>Message sent successfully</h3>
                <p>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="name">Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name" 
                      className="form-input"
                      required 
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email" 
                      className="form-input"
                      required 
                    />
                  </div>
                </div>
                
                <div className="form-field">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    className="form-textarea"
                    rows={4}
                    required
                  ></textarea>
                </div>
                
                <Button 
                  type="submit"
                  disabled={state.submitting}
                  className="contact-submit-button"
                >
                  {state.submitting ? 'Sending...' : 'Send Message'}
                </Button>
                
                <div className="form-validation">
                  <ValidationError prefix="Name" field="name" errors={state.errors} />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
      
      <Footer onNavigate={scrollToSection} />
    </div>
  );
};

export default Home;