import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Wave from "../HeroWave/HeroWave";
import "./Hero.css";

const Hero: React.FC = () => {
  const words = ["revolution", "evolution", "transformation", "innovation", "future"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000); // cambia cada 2 segundos
    return () => clearInterval(interval);
  }, []);

  const mainTextVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.4, duration: 0.8, type: "spring" as const, stiffness: 100 },
    },
  };

  const subTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 1.0, duration: 0.7 },
    },
  };

  // 🔧 Fix: no animamos `y` para evitar conflicto con transform del layout
  const ctaVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 1.2, duration: 0.5 },
    },
  };

  return (
    <div className="hero">
      <Wave />

      {/* Texto a la izquierda (centrado vertical por el flex del contenedor .hero) */}
      <div className="hero-container">
        <motion.h1
          className="hero-main-title"
          variants={mainTextVariants}
          initial="hidden"
          animate="visible"
        >
          The <span className="keyword">visual</span> and{" "}
          <span className="keyword">digital</span>{" "}
          <motion.span
            key={index}
            className="keyword"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {words[index]}
          </motion.span>{" "}
          your brand <span className="keyword">deserves</span>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          variants={subTextVariants}
          initial="hidden"
          animate="visible"
        >
          We craft <span className="keyword">impactful</span> experiences through{" "}
          <span className="keyword">design</span> and{" "}
          <span className="keyword">technology</span>.
        </motion.p>
      </div>

      {/* CTA a la derecha (centrado vertical por el flex del contenedor .hero) */}
      <motion.div
        className="hero-cta"
        variants={ctaVariants}
        initial="hidden"
        animate="visible"
      >
        <button>Learn More</button>
      </motion.div>
    </div>
  );
};

export default Hero;
