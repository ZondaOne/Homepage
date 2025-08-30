import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './ProductCard.css';

interface ProductCardProps {
  title: string;
  subtitle: string;
  gradient?: string;
  icon: React.ReactNode;
  isComingSoon?: boolean;
  onLearnMore?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  subtitle,
  gradient,
  icon,
  isComingSoon = false,
  onLearnMore
}) => {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring" as const,
        bounce: 0.3
      }
    }
  };

  return (
    <motion.div
      className={`product-card ${isComingSoon ? 'coming-soon' : ''}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="product-card-visual" style={{ background: gradient }}>
        <div className="product-visual-icon">
          {icon}
        </div>
      </div>
      
      <div className="product-card-content">
        <div className="product-info">
          <h3 className="product-title">{title}</h3>
          <p className="product-subtitle">{subtitle}</p>
        </div>

        {onLearnMore && (
          <button className="product-learn-more" onClick={onLearnMore}>
            {isComingSoon ? 'Coming Soon' : 'Learn more'}
            <ArrowRight />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;