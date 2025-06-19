import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import GlitchLogo from '../GlitchLogo/GlitchLogo';
import Button from '../Button/Button';
import './Hero.css';

const Hero: React.FC = () => {
  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.8,
        duration: 0.8,
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  const subtitleVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.2,
        duration: 0.6
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.6,
        duration: 0.5
      }
    }
  };

  return (
    <div className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-logo-section">
            <GlitchLogo size={320} />
          </div>

          <motion.h1 
            className="hero-title animated-gradient-text"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            ZONDA
          </motion.h1>

          <motion.p 
            className="hero-subtitle"
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
          >
            Empowering the next generation of digital innovation.
            <br />
            <span className="subtitle-highlight animated-gradient-subtle">We build software that shapes tomorrow.</span>
          </motion.p>

          <motion.div 
            className="hero-cta"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
          >
            <Button 
              variant="primary" 
              size="lg" 
              icon={Sparkles} 
              iconPosition="left"
              onClick={() => {
                const element = document.getElementById('about');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Discover Our Vision
            </Button>
            
            <Button 
              variant="ghost" 
              size="lg" 
              icon={ArrowRight} 
              iconPosition="right"
              onClick={() => {
                const element = document.getElementById('products');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Our Products
            </Button>
          </motion.div>
        </div>

        {/* <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <div className="scroll-line"></div>
          <span className="scroll-text">Explore</span>
        </motion.div> */}
      </div>
    </div>
  );
};

export default Hero;