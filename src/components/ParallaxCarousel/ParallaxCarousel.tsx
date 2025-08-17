import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './ParallaxCarousel.css';

interface CarouselImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface ParallaxCarouselProps {
  images: CarouselImage[];
  title?: string;
  subtitle?: string;
}

const ParallaxCarousel: React.FC<ParallaxCarouselProps> = ({
  images,
  title,
  subtitle
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Auto-advance every 5 seconds
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <motion.div 
      ref={containerRef}
      className="parallax-carousel"
      style={{ y, opacity }}
    >
      <div className="carousel-content">
        {title && (
          <div className="carousel-header">
            <h3 className="carousel-title animated-gradient-text">{title}</h3>
            {subtitle && <p className="carousel-subtitle">{subtitle}</p>}
          </div>
        )}

        <div className="carousel-container">
          <div className="carousel-track">
            {images.map((image, index) => (
              <motion.div
                key={index}
                className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: index === currentIndex ? 1 : 0,
                  scale: index === currentIndex ? 1 : 0.8,
                  x: `${(index - currentIndex) * 100}%`
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <div className="image-container glass">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="carousel-image"
                  />
                  <div className="image-overlay">
                    {image.title && (
                      <h4 className="image-title">{image.title}</h4>
                    )}
                    {image.description && (
                      <p className="image-description">{image.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button 
            className="carousel-nav carousel-nav-prev glass glass-hover"
            onClick={prevSlide}
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>

          <button 
            className="carousel-nav carousel-nav-next glass glass-hover"
            onClick={nextSlide}
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>

          <div className="carousel-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ParallaxCarousel;