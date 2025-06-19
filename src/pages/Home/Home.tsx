import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Zap, Shield, Globe } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import AnimatedBackground from '../../components/Background/AnimatedBackground';
import ProductCard from '../../components/ProductCard/ProductCard';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const sectionsRef = useRef<HTMLElement[]>([]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
              status="live"
              gradient="linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))"
              icon={<Palette size={24} />}
              onTryNow={() => window.open('https://pixelperfect.zonda.com', '_blank')}
              onLearnMore={() => console.log('Learn more about PixelPerfect')}
            />

            <ProductCard
              title="ZondaFlow"
              description="Next-generation workflow automation platform that streamlines business processes with intelligent orchestration."
              features={[
                "Visual workflow builder",
                "API integrations",
                "Real-time monitoring",
                "Custom triggers & actions",
                "Analytics dashboard"
              ]}
              status="beta"
              gradient="linear-gradient(135deg, var(--accent-cyan), var(--accent-primary))"
              icon={<Zap size={24} />}
              onTryNow={() => window.open('https://flow.zonda.com', '_blank')}
              onLearnMore={() => console.log('Learn more about ZondaFlow')}
            />

            <ProductCard
              title="SecureVault"
              description="Enterprise-grade security platform providing comprehensive protection for digital assets and sensitive data."
              features={[
                "End-to-end encryption",
                "Multi-factor authentication",
                "Threat detection",
                "Compliance reporting",
                "Zero-trust architecture"
              ]}
              status="coming-soon"
              gradient="linear-gradient(135deg, var(--accent-pink), var(--accent-secondary))"
              icon={<Shield size={24} />}
              onLearnMore={() => console.log('Learn more about SecureVault')}
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
                Born Digital, Built for Tomorrow
              </h2>
              <p className="section-description">
                We're a young, ambitious software startup on a mission to reshape how 
                people interact with technology. Founded by passionate developers and 
                designers, ZONDA combines cutting-edge AI, intuitive design, and 
                lightning-fast performance to create tools that actually work.
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
                <h3>Rapid Innovation</h3>
                <p>We ship fast, iterate quickly, and never stop improving</p>
              </div>
              <div className="feature-card glass glass-hover">
                <div className="feature-icon"><Globe size={24} /></div>
                <h3>Global Mindset</h3>
                <p>Building for users worldwide with localized experiences</p>
              </div>
              <div className="feature-card glass glass-hover">
                <div className="feature-icon"><Shield size={24} /></div>
                <h3>User-First</h3>
                <p>Every decision is made with our users' best interests in mind</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
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
              <form className="contact-form glass">
                <div className="form-group">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="form-input glass"
                    required 
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="form-input glass"
                    required 
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    placeholder="Company" 
                    className="form-input glass"
                  />
                </div>
                <div className="form-group">
                  <textarea 
                    placeholder="What's on your mind?" 
                    className="form-textarea glass"
                    rows={4}
                    required
                  ></textarea>
                </div>
                <Button variant="primary">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <Footer onNavigate={scrollToSection} />
    </div>
  );
};

export default Home;