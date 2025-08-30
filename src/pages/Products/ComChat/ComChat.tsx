import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  MessageCircle, 
  Brain, 
  FileText,
  Lock,
  Server,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import Navbar from '../../../components/Navbar/Navbar';
import Button from '../../../components/Button/Button';
import Footer from '../../../components/Footer/Footer';
import './ComChat.css';

gsap.registerPlugin(ScrollTrigger);

const ComChat: React.FC = () => {
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
      icon: <Brain size={32} />,
      title: "Custom Training",
      description: "Train the chatbot on your specific business data, documents, and conversation patterns for accurate responses."
    },
    {
      icon: <MessageCircle size={32} />,
      title: "Human-like Tone",
      description: "Natural conversation style that matches your brand voice and maintains engaging, professional interactions."
    },
    {
      icon: <FileText size={32} />,
      title: "Text & Multimodal",
      description: "Handle text conversations, process images, and analyze documents for comprehensive customer support."
    },
    {
      icon: <Lock size={32} />,
      title: "Privacy Mode",
      description: "Run completely local with on-premises language models for maximum data privacy and security."
    },
    {
      icon: <Server size={32} />,
      title: "Local LLMs",
      description: "Deploy using local language models to keep all data on your infrastructure and maintain full control."
    }
  ];


  return (
    <div className="comchat-page">
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
              <MessageCircle size={80} />
            </div>
            <h1 className="section-title">ComChat</h1>
            <p className="hero-description">
              Custom chatbot for business that learns from your data. 
              Human-like conversations with text or multimodal support and privacy-focused local deployment.
            </p>
            <div className="hero-actions">
              <Button
                variant="primary"
                size="lg"
                icon={ExternalLink}
                iconPosition="right"
                onClick={() => window.open('https://comchat.zonda.one', '_blank')}
              >
                Request Demo
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
              ComChat creates intelligent conversational AI that understands your business context. 
              Train on your data, deploy securely, and maintain complete control over customer interactions.
            </p>
          </div>

          <div className="chat-demo">
            <div className="chat-container">
              <div className="chat-header">
                <div className="chat-status">
                  <div className="status-dot"></div>
                  <span>Customer Support</span>
                </div>
              </div>
              
              <div className="chat-messages">
                <div className="message user-message">
                  <div className="message-avatar user-avatar"></div>
                  <div className="message-bubble user-bubble">
                    <p>Hi! I'm looking for a refund on my order from last week.</p>
                  </div>
                </div>
                
                <div className="message bot-message">
                  <div className="message-bubble bot-bubble">
                    <p>I'd be happy to help with that! Let me pull up your recent orders. What's the email address on your account?</p>
                  </div>
                  <div className="message-avatar bot-avatar"></div>
                </div>
                
                <div className="message user-message">
                  <div className="message-avatar user-avatar"></div>
                  <div className="message-bubble user-bubble">
                    <p>sarah.chen@email.com</p>
                  </div>
                </div>
                
                <div className="message bot-message">
                  <div className="message-bubble bot-bubble">
                    <p>Perfect! I see your order #4729 from March 15th. I can process that refund for you right away.</p>
                  </div>
                  <div className="message-avatar bot-avatar"></div>
                </div>
                
                <div className="message user-message">
                  <div className="message-avatar user-avatar"></div>
                  <div className="message-bubble user-bubble">
                    <p>Wow, that was fast! Thank you!</p>
                  </div>
                </div>
                
                <div className="typing-indicator">
                  <div className="typing-dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                  <span>Bot is typing...</span>
                </div>
              </div>
            </div>
          </div>

          <div className="about-stats">
            <div className="stat-card">
              <div className="stat-number">Custom</div>
              <div className="stat-label">Training</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-card">
              <div className="stat-number">Local</div>
              <div className="stat-label">Deployment</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-card">
              <div className="stat-number">Multi</div>
              <div className="stat-label">Modal</div>
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
              Intelligent conversational AI with privacy-focused deployment options.
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
              ComChat is in active development with core features being implemented and tested.
            </p>
            
            <div className="status-grid">
              <div className="status-item">
                <div className="status-indicator in-progress"></div>
                <span>Core AI training pipeline</span>
              </div>
              <div className="status-item">
                <div className="status-indicator in-progress"></div>
                <span>Multimodal capabilities</span>
              </div>
              <div className="status-item">
                <div className="status-indicator planned"></div>
                <span>Local LLM deployment</span>
              </div>
              <div className="status-item">
                <div className="status-indicator planned"></div>
                <span>Beta testing program</span>
              </div>
            </div>

            <div className="try-now">
              <Button
                variant="primary"
                size="lg"
                icon={ExternalLink}
                iconPosition="right"
                onClick={() => window.open('https://comchat.zonda.one', '_blank')}
              >
                Request Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={scrollToSection} />
    </div>
  );
};

export default ComChat;