import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, Image, Building2 } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import ProductCard from '../../components/ProductCard/ProductCard';
import ScrollSection from '../../components/ScrollSection/ScrollSection';
import Button from '../../components/Button/Button';
import PixelPerfectLogo from '../../components/PixelPerfectLogo/PixelPerfectLogo';
import ComerziaLogo from '../../components/ComerziaLogo/ComerziaLogo';
import Footer from '../../components/Footer/Footer';

import './Home.css';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const sectionsRef = useRef<HTMLElement[]>([]);
  const productsRef = useRef<HTMLDivElement[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  const [state, handleSubmit] = useForm(
    process.env.REACT_APP_FORMSPREE_ID! || 'yourFormIdHere'
  );

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hash-based scroll
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      setTimeout(() => scrollToSection(sectionId), 300);
    }
  }, [location.hash]);

  // Initialize animations after component mounts
  useEffect(() => {
    setIsLoaded(true);

    const timer = setTimeout(() => {
      initializeAnimations();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const initializeAnimations = () => {
    // Clean up existing triggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const isDesktop = window.innerWidth >= 768;
    if (!isDesktop) return;

    // Animate sections
    sectionsRef.current.forEach((section, index) => {
      if (!section) return;

      gsap.fromTo(
        section,
        { opacity: 0, y: 40 }, // estado inicial
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: index * 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true, // no se revierte
          },
        }
      );
    });

    // Animate product cards separately
    productsRef.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        { opacity: 0, y: 40, scale: 0.9 }, // inicial
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          delay: index * 0.15,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });
  };


  const addToSectionRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const addToProductRefs = (el: HTMLDivElement | null) => {
    if (el && !productsRef.current.includes(el)) {
      productsRef.current.push(el);
    }
  };

  // Product data
  const products = [
    {
      title: "PixelPerfect",
      subtitle: "Professional image editing made simple",
      gradient: "linear-gradient(135deg, #FF914D, #FF3131)",
      icon: <PixelPerfectLogo size={48}/>,
      route: '/products/pixelperfect'
    },
    {
      title: "Comerzia", 
      subtitle: "Business management that works",
      gradient: "linear-gradient(135deg, #007AFF, #FF914D)",
      icon: <ComerziaLogo size={48} />,
      route: '/products/comerzia'
    },
    {
      title: "ComChat",
      subtitle: "Customer service, automated", 
      gradient: "linear-gradient(135deg, #FF2D92, #FF3131)",
      icon: <MessageSquare size={48} />,
      route: '/products/comchat'
    }
  ];

  return (
    <div className="home">
      <Navbar />

      <section id="home">
        <Hero />
      </section>
      <div className="section-divider"></div>
      <section id="vision" className="vision-section" ref={addToSectionRefs}>
  <div className="container">
    <h2 className="section-title centered">Our Capabilities</h2>

    <div className="vision-grid">
      {[
        {
          category: "AI & Automation",
          title: "Smart solutions powered by AI",
          description: "We design AI-driven systems that automate tasks, optimize workflows, and scale with your business.",
          image: "https://images.unsplash.com/photo-1617718875775-c5f9800b17fb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          category: "Cloud",
          title: "Scalable infrastructure for growth",
          description: "Secure and scalable cloud solutions to support your applications and data worldwide.",
          image: "https://images.unsplash.com/flagged/photo-1583342108855-f4e9da576393?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          category: "Cybersecurity",
          title: "Protecting your digital assets",
          description: "We implement cutting-edge security protocols to safeguard data, applications, and user trust.",
          image: "https://images.unsplash.com/photo-1706554597534-52032971bb55?q=80&w=1315&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          category: "Product Design",
          title: "Human-centered digital experiences",
          description: "Our design team creates intuitive interfaces and engaging experiences tailored for users.",
          image: "https://images.unsplash.com/photo-1684162204507-0e21d7eeded7?q=80&w=701&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          category: "Data & Analytics",
          title: "Insights that drive decisions",
          description: "We turn complex data into actionable insights to help businesses make smarter moves.",
          image: "https://images.unsplash.com/photo-1706466615160-c32a7fc1bbcf?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          category: "Software Engineering",
          title: "Building reliable tech products",
          description: "From concept to launch, we deliver high-quality software built for performance and scale.",
          image: "https://images.unsplash.com/photo-1576916385844-befd8945138c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          category: "Blockchain",
          title: "Next-gen trust and transparency",
          description: "Decentralized solutions that empower new business models and secure transactions.",
          image: "https://images.unsplash.com/photo-1641418092524-1709c335f860?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          category: "Innovation",
          title: "Shaping the future of technology",
          description: "Exploring emerging technologies to create new opportunities for your business.",
          image: "https://images.unsplash.com/photo-1527698952067-61fc35796fcd?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
      
      ].map((card, index) => (
        <div className="vision-card" key={index}>
          <img src={card.image} alt={card.title} className="vision-card-image" />
          <div className="vision-card-overlay">
            <span className="vision-card-category">{card.category}</span>
            <h3 className="vision-card-title">{card.title}</h3>
          </div>
          <div className="vision-card-description">
            <p>{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<ScrollSection />
<div className="section-divider"></div>
<section id="products" className="products-section" ref={addToSectionRefs}>
  <div className="container">
    <div className="section-header">
      <h2 className="section-title centered">Our Products</h2>
      <p className="section-subtitle">Tools we've built to make work easier and more efficient</p>
    </div>

    <div className="products-grid">
      {products.map((product, index) => (
        <div
          key={product.title}
          ref={addToProductRefs}
          className="product-card-wrapper"
        >
          <ProductCard
            title={product.title}
            subtitle={product.subtitle}
            gradient={product.gradient}
            icon={product.icon}
            onLearnMore={() => navigate(product.route)}
          />
        </div>
      ))}
    </div>
  </div>
</section>




      <section id="about" className="about-section" ref={addToSectionRefs}>
        <div className="container">
          <div className="about-content">
            <h2 className="section-title centered">About Us</h2>
            <h3 className="about-headline">We build tools that solve real problems.</h3>
            <p className="about-description">
              Simple, powerful apps that help you work better. No complexity, no confusion. 
              Just tools that work exactly as they should.
            </p>

            <div className="founders-placeholder">
              <div className="founders-image">
                <img 
                  src="/founders.png" 
                  alt="Our founding team" 
                  className="founders-photo"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">3</span>
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

      <section id="contact" className="contact-section" ref={addToSectionRefs}>
        <div className="container">
          <div className="contact-content">
            <div className="contact-header">
              <h2 className="section-title centered">Let's create something together</h2>
              <p className="contact-subtitle">
                Ready to bring your vision to life? Let's start the conversation.
              </p>
            </div>

            {state.succeeded ? (
              <div className="contact-success">
                <div className="success-icon">✓</div>
                <h3>Message sent successfully!</h3>
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
                      placeholder="Your full name"
                      required 
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className="form-input" 
                      placeholder="your@email.com"
                      required 
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    className="form-textarea" 
                    rows={4} 
                    placeholder="Tell us about your project..."
                    required 
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>

                <Button 
                  type="submit" 
                  disabled={state.submitting} 
                  className="contact-submit-button"
                >
                  {state.submitting ? 'Sending...' : 'Send Message'}
                </Button>
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