import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import Button from '../Button/Button';
import './ProductCard.css';

interface ProductCardProps {
  title: string;
  description: string;
  features: string[];
  status: 'live' | 'beta' | 'coming-soon';
  gradient: string;
  icon: React.ReactNode;
  onLearnMore?: () => void;
  onTryNow?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  features,
  status,
  gradient,
  icon,
  onLearnMore,
  onTryNow
}) => {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        type: "tween" as const,
      }
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'live':
        return 'var(--accent-cyan)';
      case 'beta':
        return 'var(--accent-orange)';
      case 'coming-soon':
        return 'var(--text-muted)';
      default:
        return 'var(--accent-primary)';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'live':
        return 'Live';
      case 'beta':
        return 'Beta';
      case 'coming-soon':
        return 'Coming Soon';
      default:
        return 'Available';
    }
  };

  return (
    <motion.div
      className="product-card"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div 
        className="product-card-gradient"
        style={{ background: gradient }}
      />
      
      <div className="product-card-content">
        <div className="product-header">
          <div className="product-icon">
            {icon}
          </div>
          
          <div className="product-status">
            <span 
              className="status-badge"
              style={{ color: getStatusColor() }}
            >
              {getStatusText()}
            </span>
          </div>
        </div>

        <div className="product-info">
          <h3 className="product-title">{title}</h3>
          <p className="product-description">{description}</p>

          <ul className="product-features">
            {features.map((feature, index) => (
              <li key={index} className="feature-item">
                <span className="feature-dot" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="product-actions">
          {status === 'live' && onTryNow && (
            <Button
              variant="primary"
              size="md"
              icon={ExternalLink}
              iconPosition="right"
              onClick={onTryNow}
            >
              Try Now
            </Button>
          )}
          
          {status === 'beta' && onTryNow && (
            <Button
              variant="neon"
              size="md"
              icon={ExternalLink}
              iconPosition="right"
              onClick={onTryNow}
            >
              Join Beta
            </Button>
          )}
          
          {onLearnMore && (
            <Button
              variant="ghost"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
              onClick={onLearnMore}
            >
              Learn More
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;