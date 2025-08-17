import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  MessageCircle, 
  Brain, 
  Shield, 
  Users, 
  Settings,
  ArrowRight,
  ExternalLink,
  Mic,
  Camera,
  FileText,
  Lock,
  Server,
  Zap,
  Globe,
  Headphones,
  Bot,
  Eye
} from 'lucide-react';
import Navbar from '../../../components/Navbar/Navbar';
import AnimatedBackground from '../../../components/Background/AnimatedBackground';
import ParallaxCarousel from '../../../components/ParallaxCarousel/ParallaxCarousel';
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

  const carouselImages = [
    {
      src: "/comchat/dashboard.jpeg",
      alt: "ComChat Dashboard Overview",
      title: "Intelligent Dashboard",
      description: "Comprehensive analytics and conversation management interface"
    },
    {
      src: "/comchat/demo.jpeg",
      alt: "ComChat Demo Interface",
      title: "Live Demo",
      description: "Experience the power of multimodal AI conversations"
    },
    {
      src: "/comchat/different-activities.jpeg",
      alt: "ComChat Activity Types",
      title: "Versatile Applications",
      description: "Adaptable to various business activities and use cases"
    }
  ];

  const architectureComponents = [
    {
      icon: <Brain size={32} />,
      title: "AI Engine",
      description: "Advanced language models with multimodal capabilities and context awareness",
      tech: "GPT-4, Local LLMs"
    },
    {
      icon: <Server size={32} />,
      title: "Local Deployment",
      description: "On-premises hosting for maximum privacy and data control",
      tech: "Docker, Kubernetes"
    },
    {
      icon: <Shield size={32} />,
      title: "Security Layer",
      description: "Enterprise-grade security with end-to-end encryption",
      tech: "AES-256, Zero Trust"
    },
    {
      icon: <Zap size={32} />,
      title: "Integration Hub",
      description: "Seamless integration with existing business systems and workflows",
      tech: "REST API, Webhooks"
    }
  ];

  const features = [
    {
      icon: <MessageCircle size={24} />,
      title: "Text & Multimodal Support",
      description: "Handle text conversations, voice messages, images, and documents with intelligent processing and contextual understanding.",
      benefits: ["Voice recognition", "Image analysis", "Document processing"]
    },
    {
      icon: <Settings size={24} />,
      title: "Fully Customizable",
      description: "Adapt the chatbot to any business type with custom training data, conversation flows, and brand-specific responses.",
      benefits: ["Custom training", "Brand alignment", "Industry-specific"]
    },
    {
      icon: <Headphones size={24} />,
      title: "Technical Delegation",
      description: "Intelligent escalation system that seamlessly transfers complex queries to human technical professionals.",
      benefits: ["Smart escalation", "Context preservation", "Expert routing"]
    },
    {
      icon: <Lock size={24} />,
      title: "Local LLM Support",
      description: "Deploy language models on-premises for maximum privacy and data control without compromising functionality.",
      benefits: ["Data sovereignty", "Privacy compliance", "Custom models"]
    },
    {
      icon: <Brain size={24} />,
      title: "Context Intelligence",
      description: "Maintains conversation context across sessions and integrates with business data for personalized interactions.",
      benefits: ["Session memory", "Business integration", "Personalization"]
    },
    {
      icon: <Globe size={24} />,
      title: "Multi-Channel Deployment",
      description: "Deploy across websites, mobile apps, messaging platforms, and social media with unified management.",
      benefits: ["Omnichannel support", "Unified analytics", "Consistent experience"]
    }
  ];

  const capabilities = [
    {
      icon: <FileText size={20} />,
      title: "Document Analysis",
      description: "Process and understand PDFs, contracts, and technical documents"
    },
    {
      icon: <Mic size={20} />,
      title: "Voice Interaction",
      description: "Natural speech recognition and voice response capabilities"
    },
    {
      icon: <Camera size={20} />,
      title: "Visual Recognition",
      description: "Analyze images, diagrams, and visual content for context"
    },
    {
      icon: <Bot size={20} />,
      title: "Automated Workflows",
      description: "Execute complex business processes through conversation"
    }
  ];

  return (
    <div className="comchat-page">
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
              <Shield size={64} />
            </div>
            <h1 className="hero-title animated-gradient-text-fast">ComChat</h1>
            <p className="hero-subtitle">
              A fully customizable chatbot for commerces and companies. Can be text or multimodal, 
              have specific context for any type of activity and delegate to 
              <span className="animated-gradient-subtle"> professional technical</span> for help when necessary
            </p>
            <div className="hero-status">
              <span className="status-badge beta">Beta</span>
            </div>
            <div className="hero-features">
              <div className="hero-feature">
                <Eye size={16} />
                <span>Multimodal AI</span>
              </div>
              <div className="hero-feature">
                <Lock size={16} />
                <span>Privacy First</span>
              </div>
              <div className="hero-feature">
                <Users size={16} />
                <span>Expert Delegation</span>
              </div>
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

      {/* Capabilities Section */}
      <section 
        id="capabilities" 
        className="section capabilities-section" 
        ref={addToRefs}
      >
        <div className="container">
          <div className="section-header">
            <h2 className="section-title animated-gradient-text">Advanced AI Capabilities</h2>
            <p className="section-subtitle">
              Powered by cutting-edge AI technology to understand and respond to complex business needs
            </p>
          </div>

          <div className="capabilities-grid">
            {capabilities.map((capability, index) => (
              <motion.div
                key={index}
                className="capability-card glass glass-hover"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="capability-icon">
                  {capability.icon}
                </div>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
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
              <h2 className="section-title animated-gradient-text">Intelligent Conversations, Maximum Privacy</h2>
              <p className="section-description">
                ComChat revolutionizes customer interactions with AI-powered conversations that understand 
                context, process multiple media types, and maintain the highest privacy standards. Whether 
                deployed in the cloud or on-premises, ComChat adapts to your security requirements.
              </p>
              <div className="privacy-highlights">
                <div className="privacy-item">
                  <Shield size={20} />
                  <div>
                    <h4>Data Sovereignty</h4>
                    <p>Keep sensitive data within your infrastructure</p>
                  </div>
                </div>
                <div className="privacy-item">
                  <Lock size={20} />
                  <div>
                    <h4>End-to-End Encryption</h4>
                    <p>Military-grade security for all communications</p>
                  </div>
                </div>
                <div className="privacy-item">
                  <Server size={20} />
                  <div>
                    <h4>Local LLM Deployment</h4>
                    <p>Run AI models entirely on your hardware</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="overview-visual">
              <div className="chat-preview glass">
                <div className="chat-header">
                  <div className="chat-status">
                    <div className="status-dot online"></div>
                    <span>ComChat AI Assistant</span>
                  </div>
                </div>
                <div className="chat-messages">
                  <div className="message user">
                    <span>Can you analyze this contract document?</span>
                  </div>
                  <div className="message ai">
                    <span>I've analyzed the contract. I found 3 key terms that need review. Would you like me to connect you with our legal expert?</span>
                  </div>
                  <div className="message user">
                    <span>Yes, please connect me</span>
                  </div>
                  <div className="message system">
                    <span>🔄 Connecting you with Legal Expert Sarah...</span>
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
            title="ComChat in Action"
            subtitle="Experience intelligent conversations that understand context, process multiple formats, and seamlessly delegate to experts"
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
            <h2 className="section-title animated-gradient-text">Privacy-First Architecture</h2>
            <p className="section-subtitle">
              Designed with security and privacy at its core, supporting both cloud and on-premises deployment
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

          <div className="deployment-options glass">
            <h3>Deployment Options</h3>
            <div className="deployment-grid">
              <div className="deployment-option">
                <Globe size={24} />
                <h4>Cloud Deployment</h4>
                <p>Fully managed service with global CDN and automatic scaling</p>
              </div>
              <div className="deployment-option">
                <Server size={24} />
                <h4>On-Premises</h4>
                <p>Complete control with local hardware deployment and air-gapped security</p>
              </div>
              <div className="deployment-option">
                <Shield size={24} />
                <h4>Hybrid Solution</h4>
                <p>Best of both worlds with flexible data routing and compliance</p>
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
            <h2 className="section-title animated-gradient-text">Comprehensive AI Solutions</h2>
            <p className="section-subtitle">
              Everything you need for intelligent customer interactions with enterprise-grade security
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

      {/* Privacy Section */}
      <section 
        id="privacy" 
        className="section privacy-section" 
        ref={addToRefs}
      >
        <div className="container">
          <motion.div 
            className="privacy-content glass"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="privacy-header">
              <Lock size={48} />
              <h2 className="animated-gradient-text">Maximum Privacy Guaranteed</h2>
            </div>
            <p className="privacy-description">
              Your data stays yours. With local LLM deployment, your conversations and business data 
              never leave your infrastructure. Meet the strictest compliance requirements while 
              maintaining full AI capabilities.
            </p>
            <div className="privacy-features">
              <div className="privacy-feature">
                <div className="feature-check">✓</div>
                <span>GDPR & CCPA Compliant</span>
              </div>
              <div className="privacy-feature">
                <div className="feature-check">✓</div>
                <span>SOC 2 Type II Certified</span>
              </div>
              <div className="privacy-feature">
                <div className="feature-check">✓</div>
                <span>Zero Data Retention</span>
              </div>
              <div className="privacy-feature">
                <div className="feature-check">✓</div>
                <span>Air-Gapped Deployment</span>
              </div>
            </div>
          </motion.div>
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
            <h2 className="cta-title animated-gradient-text-fast">Ready for Intelligent Conversations?</h2>
            <p className="cta-description">
              Join the beta program and experience the future of AI-powered customer interactions. 
              Get early access to multimodal capabilities and help define the next generation of conversational AI.
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
                Request Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer onNavigate={scrollToSection} />
    </div>
  );
};

export default ComChat;