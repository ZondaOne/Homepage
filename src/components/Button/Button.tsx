import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import './Button.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'neon';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  onClick,
  disabled = false,
  className = ''
}) => {
  const buttonVariants = {
    hover: {
      scale: 1.02,
      y: -2,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98,
      y: 0
    }
  };

  const glowVariants = {
    hover: {
      opacity: 0.8,
      scale: 1.1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.button
      className={`modern-button modern-button--${variant} modern-button--${size} ${className}`}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      disabled={disabled}
    >
      {variant === 'neon' && (
        <motion.div 
          className="button-glow"
          variants={glowVariants}
        />
      )}
      
      <div className="button-content">
        {Icon && iconPosition === 'left' && (
          <Icon className="button-icon button-icon--left" size={16} />
        )}
        
        <span className="button-text">{children}</span>
        
        {Icon && iconPosition === 'right' && (
          <Icon className="button-icon button-icon--right" size={16} />
        )}
      </div>
      
      <div className="button-border" />
    </motion.button>
  );
};

export default Button;