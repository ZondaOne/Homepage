import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, User, Building2, ExternalLink } from 'lucide-react';
import './Reviews.css';

gsap.registerPlugin(ScrollTrigger);

interface Review {
  id: string;
  name: string;
  company?: string;
  isCompany: boolean;
  serviceType: string;
  rating: number;
  review: string;
  link?: string;
  avatar?: string;
}

const reviewsData: Review[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    company: 'TechFlow Solutions',
    isCompany: true,
    serviceType: 'Custom Web App',
    rating: 5,
    review: 'ZONDA delivered exactly what we needed - a sleek, fast web application that perfectly matches our brand. Their attention to detail is incredible.',
    link: 'https://techflow.com',
    avatar: '/api/placeholder/60/60'
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    isCompany: false,
    serviceType: 'E-commerce Platform',
    rating: 5,
    review: 'From concept to launch, ZONDA made my online store vision come to life. The dashboard is intuitive and the performance is outstanding.',
    avatar: '/api/placeholder/60/60'
  },
  {
    id: '3',
    name: 'Elena Vasquez',
    company: 'Creative Studio Pro',
    isCompany: true,
    serviceType: 'Portfolio Website',
    rating: 5,
    review: 'Working with ZONDA was a game-changer. They understand design and translate it into flawless code. Highly recommended for creative professionals.',
    link: 'https://creativestudiopro.com'
  },
  {
    id: '4',
    name: 'David Kim',
    isCompany: false,
    serviceType: 'Business Dashboard',
    rating: 4,
    review: 'The analytics dashboard ZONDA built helps me track everything in real-time. Clean interface, powerful features, and great support.',
    avatar: '/api/placeholder/60/60'
  },
  {
    id: '5',
    name: 'Luna Martinez',
    company: 'Startup Accelerator',
    isCompany: true,
    serviceType: 'Multi-platform App',
    rating: 5,
    review: 'ZONDA took our complex requirements and built something beautiful and functional. Their tech stack knowledge is impressive.',
    link: 'https://startupaccelerator.io'
  },
  {
    id: '6',
    name: 'Alex Thompson',
    isCompany: false,
    serviceType: 'API Integration',
    rating: 5,
    review: 'Seamless integration of multiple APIs into one cohesive system. ZONDA made the complex simple and delivered on time.',
    avatar: '/api/placeholder/60/60'
  },
  {
    id: '7',
    name: 'Sofia Gonzalez',
    company: 'Digital Nomad Co',
    isCompany: true,
    serviceType: 'SaaS Platform',
    rating: 5,
    review: 'ZONDA transformed our concept into a fully functional SaaS platform. Their expertise in scalable architecture is unmatched.',
    link: 'https://digitalnomadco.com'
  },
  {
    id: '8',
    name: 'Ryan Mitchell',
    isCompany: false,
    serviceType: 'Mobile App Backend',
    rating: 4,
    review: 'Solid backend infrastructure for our mobile app. Fast APIs, reliable data handling, and excellent documentation throughout.',
    avatar: '/api/placeholder/60/60'
  },
  {
    id: '9',
    name: 'Emma Rodriguez',
    company: 'InnovateTech Labs',
    isCompany: true,
    serviceType: 'AI Integration',
    rating: 5,
    review: 'Brilliant work integrating AI features into our existing platform. ZONDA understood our vision and delivered beyond expectations.',
    link: 'https://innovatetechlabs.io',
    avatar: '/api/placeholder/60/60'
  }
];

const Reviews: React.FC = () => {
  const reviewsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicate reviews to create enough content for infinite scrolling
  const duplicatedReviews = [...reviewsData, ...reviewsData, ...reviewsData];

  useEffect(() => {
    if (!reviewsRef.current) return;

    const reviewElements = reviewsRef.current.querySelectorAll('.review-card');
    const numCols = 3;
    const cardWidth = 300;
    const cardHeight = 280;
    const cardGap = 20;
    
    // Create brick/Pinterest layout with offset columns
    const createBrickLayout = () => {
      const containerWidth = reviewsRef.current!.clientWidth;
      const containerHeight = reviewsRef.current!.clientHeight;
      
      // Center the grid
      const totalGridWidth = numCols * cardWidth + (numCols - 1) * cardGap;
      const startX = (containerWidth - totalGridWidth) / 2;
      
      reviewElements.forEach((el, index) => {
        const col = index % numCols;
        const row = Math.floor(index / numCols);
        
        // Calculate positions with middle column offset
        let xPos = startX + col * (cardWidth + cardGap);
        let yPos = row * (cardHeight + cardGap);
        
        // Offset middle column (column 1) to create brick effect
        if (col === 1) {
          yPos += (cardHeight + cardGap) / 2;
        }
        
        gsap.set(el, {
          x: xPos,
          y: yPos,
          rotation: 0,
          opacity: 1
        });
        
        // Create infinite vertical scrolling - continuous upward movement
        gsap.to(el, {
          y: yPos - (containerHeight + cardHeight + 100),
          duration: 20 + (index % 3) * 2, // Slightly different speeds per column
          ease: "none",
          repeat: -1,
          repeatDelay: 0,
          onRepeat: () => {
            // When card exits top, immediately place it at bottom
            const totalRows = Math.ceil(reviewElements.length / numCols);
            const newBottomY = (totalRows * (cardHeight + cardGap)) + containerHeight;
            if (col === 1) {
              gsap.set(el, { y: newBottomY + (cardHeight + cardGap) / 2 });
            } else {
              gsap.set(el, { y: newBottomY });
            }
          }
        });
      });
    };

    createBrickLayout();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`star ${i < rating ? 'filled' : 'empty'}`}
      />
    ));
  };

  const renderAvatar = (review: Review) => {
    if (review.avatar) {
      return (
        <img
          src={review.avatar}
          alt={review.name}
          className="review-avatar"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling?.classList.remove('hidden');
          }}
        />
      );
    }
    
    return (
      <div className="review-avatar-default">
        {review.isCompany ? (
          <Building2 size={24} />
        ) : (
          <User size={24} />
        )}
      </div>
    );
  };

  return (
    <section className="reviews-section" ref={containerRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title centered animated-gradient-text-fast">
            Trusted by Innovators
          </h2>
          <p className="section-subtitle">
            Real feedback from real clients who trusted us to bring their{' '}
            <span className="animated-gradient-subtle">digital vision</span> to life
          </p>
        </div>
        
        <div className="reviews-container" ref={reviewsRef}>
          {duplicatedReviews.map((review, index) => (
            <div key={`${review.id}-${index}`} className="review-card glass glass-hover">
              <div className="review-header">
                <div className="review-avatar-container">
                  {renderAvatar(review)}
                  <div className="review-avatar-default hidden">
                    {review.isCompany ? (
                      <Building2 size={24} />
                    ) : (
                      <User size={24} />
                    )}
                  </div>
                </div>
                
                <div className="review-info">
                  <div className="review-name-container">
                    <h4 className="review-name">{review.name}</h4>
                    {review.link && (
                      <a
                        href={review.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="review-link"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                  {review.company && (
                    <p className="review-company">{review.company}</p>
                  )}
                  <div className="review-rating">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>
              
              <div className="review-content">
                <p className="review-service">{review.serviceType}</p>
                <p className="review-text">{review.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;