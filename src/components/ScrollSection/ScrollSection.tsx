import React, { useEffect, useState } from 'react';
import './ScrollSection.css';

interface Pillar {
  id: number;
  title: string;
  text: string;
}

const ScrollSection: React.FC = () => {
  const [visiblePillars, setVisiblePillars] = useState<Set<number>>(new Set());
  const [titleInView, setTitleInView] = useState(false);

  const pillars: Pillar[] = [
    {
      id: 1,
      title: "Innovation",
      text: "At Zonda, we merge creativity and technology to craft next-generation solutions that shape the future.",
    },
    {
      id: 2,
      title: "Scalability",
      text: "We design platforms engineered to evolve and grow alongside your business — without limits.",
    },
    {
      id: 3,
      title: "Trust",
      text: "Partnerships built on transparency and accountability. Your mission becomes our mission.",
    },
    {
      id: 4,
      title: "Impact",
      text: "Our solutions create measurable change — empowering industries, communities, and people worldwide.",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const pillarElements = document.querySelectorAll('.pillar-block');
      const titleElement = document.querySelector('.main-title') as HTMLElement;
      const newVisiblePillars = new Set<number>();
      const windowHeight = window.innerHeight;

      if (titleElement) {
        const rect = titleElement.getBoundingClientRect();
        if (rect.top <= windowHeight * 0.6 && rect.bottom >= windowHeight * 0.4) {
          setTitleInView(true);
        } else {
          setTitleInView(false);
        }
      }

      pillarElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= windowHeight * 0.8 && rect.bottom >= windowHeight * 0.2) {
          newVisiblePillars.add(index);
        }
      });

      setVisiblePillars(newVisiblePillars);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="scroll-section">

     

      {/* Scrollable content */}
      <div className="scroll-section-content">
        <div className="spacer-top"></div>

        {pillars.map((pillar, index) => (
          <div
            key={pillar.id}
            className={`pillar-wrapper ${
              index % 3 === 0
                ? 'pillar-left'
                : index % 3 === 1
                ? 'pillar-right'
                : 'pillar-center'
            }`}
          >
            <div className={`pillar-block ${visiblePillars.has(index) ? 'visible' : ''}`}>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-text">{pillar.text}</p>
            </div>
          </div>
        ))}

        <div className="spacer-bottom"></div>
      </div>
    </section>
  );
};

export default ScrollSection;
