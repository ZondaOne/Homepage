import { gsap } from 'gsap';

export const fadeInUp = (element: string | Element, delay: number = 0) => {
  return gsap.fromTo(element, 
    { 
      opacity: 0, 
      y: 30 
    },
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.8, 
      ease: "power2.out",
      delay 
    }
  );
};

export const fadeInLeft = (element: string | Element, delay: number = 0) => {
  return gsap.fromTo(element,
    {
      opacity: 0,
      x: -30
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: "power2.out",
      delay
    }
  );
};

export const scaleIn = (element: string | Element, delay: number = 0) => {
  return gsap.fromTo(element,
    {
      scale: 0.8,
      opacity: 0
    },
    {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "back.out(1.7)",
      delay
    }
  );
};

export const glitchEffect = (element: string | Element) => {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
  
  tl.to(element, {
    duration: 0.1,
    skewX: 2,
    ease: "power2.inOut"
  })
  .to(element, {
    duration: 0.05,
    skewX: 0,
    ease: "power2.inOut"
  })
  .to(element, {
    duration: 0.05,
    opacity: 0.8,
    ease: "power2.inOut"
  })
  .to(element, {
    duration: 0.05,
    opacity: 1,
    ease: "power2.inOut"
  });
  
  return tl;
};

export const mouseFollowGlow = (element: string | Element, mouseX: number, mouseY: number) => {
  const rect = (element as Element).getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  const deltaX = (mouseX - centerX) * 0.02;
  const deltaY = (mouseY - centerY) * 0.02;
  
  gsap.to(element, {
    duration: 0.3,
    x: deltaX,
    y: deltaY,
    ease: "power2.out"
  });
};