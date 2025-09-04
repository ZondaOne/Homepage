import React, { useEffect, useState } from 'react';
import './ScrollSection.css';

interface Review {
  id: number;
  name: string;
  company: string;
  rating: number;
  text: string;
  avatar: string;
}

const ScrollSection: React.FC = () => {
  const [visibleReviews, setVisibleReviews] = useState<Set<number>>(new Set());
  const [titleInView, setTitleInView] = useState(false);

  const reviews: Review[] = [
    {
      id: 1,
      name: "María García",
      company: "Tech Solutions",
      rating: 5,
      text: "Incredible service and attention to detail. They transformed our vision into reality with exceptional professionalism.",
      avatar: "MG"
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      company: "Innovation Labs",
      rating: 5,
      text: "Outstanding quality and creativity. The team exceeded our expectations in every aspect of the project.",
      avatar: "CR"
    },
    {
      id: 3,
      name: "Ana López",
      company: "Digital Ventures",
      rating: 5,
      text: "Professional, reliable, and innovative. They delivered exactly what we needed, on time and within budget.",
      avatar: "AL"
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const reviewElements = document.querySelectorAll('.review-card');
      const titleElement = document.querySelector('.main-title') as HTMLElement;
      const newVisibleReviews = new Set<number>();
      const windowHeight = window.innerHeight;

      if (titleElement) {
        const rect = titleElement.getBoundingClientRect();
        if (rect.top <= windowHeight * 0.6 && rect.bottom >= windowHeight * 0.4) {
          setTitleInView(true);
        } else {
          setTitleInView(false);
        }
      }

      reviewElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= windowHeight * 0.8 && rect.bottom >= windowHeight * 0.2) {
          newVisibleReviews.add(index);
        }
      });

      setVisibleReviews(newVisibleReviews);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="scroll-section">

      {/* Sticky background title */}
      <div className="background-text">
        <h1 className={`main-title ${titleInView ? 'glow' : ''}`}>
          What Makes Us Different
        </h1>
      </div>

      {/* Contenido scrollable */}
      <div className="scroll-section-content">
        <div className="spacer-top"></div>

        {reviews.map((review, index) => (
          <React.Fragment key={review.id}>
            <div
              className={`review-wrapper ${
                index % 3 === 0
                  ? 'review-left'
                  : index % 3 === 1
                  ? 'review-right'
                  : 'review-center'
              }`}
            >
              <div className={`review-card ${visibleReviews.has(index) ? 'visible' : ''}`}>
                <div className="review-header">
                  <div className="avatar">{review.avatar}</div>
                  <div className="review-info">
                    <h3 className="reviewer-name">{review.name}</h3>
                    <p className="reviewer-company">{review.company}</p>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="review-text">"{review.text}"</p>
              </div>
            </div>
            {index < reviews.length - 1 && <div className="spacer-between"></div>}
          </React.Fragment>
        ))}

        <div className="spacer-bottom"></div>
      </div>
    </section>
  );
};

export default ScrollSection;
