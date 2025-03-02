"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import styles from "./Testimonials.module.scss";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  position: string;
  linkedin?: string;
  color?: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
}

const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials,
  autoPlay = true,
  interval = 10000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isTouching, setIsTouching] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!autoPlay || isTouching) return;

    const timer = setInterval(() => {
      nextTestimonial();
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, currentIndex, isTouching]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouching(true);
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouching) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - startX;
    const diffY = currentY - startY;

    if (isMobile) {
      x.set(diffX);
    } else {
      y.set(diffY);
    }
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
    const xValue = x.get();
    const yValue = y.get();

    if (isMobile) {
      // If swiped left by more than 50px, show next testimonial
      if (xValue < -50) {
        nextTestimonial();
      }
      // If swiped right by more than 50px, show previous testimonial
      else if (xValue > 50) {
        prevTestimonial();
      }
      // Reset the x position
      x.set(0);
    } else {
      // If swiped up by more than 50px, show next testimonial
      if (yValue < -50) {
        nextTestimonial();
      }
      // If swiped down by more than 50px, show previous testimonial
      else if (yValue > 50) {
        prevTestimonial();
      }
      // Reset the y position
      y.set(0);
    }
  };

  const opacity = useTransform(
    isMobile ? x : y,
    [-200, 0, 200],
    [0.2, 1, 0.2]
  );

  const scale = useTransform(
    isMobile ? x : y,
    [-200, 0, 200],
    [0.8, 1, 0.8]
  );

  return (
    <div className={styles.testimonialContainer}>
      <div className={styles.testimonialWrapper}>
        <div className={styles.testimonialContent}>
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[currentIndex].id}
              className={styles.testimonial}
              style={{
                backgroundColor: testimonials[currentIndex].color || '#2D2D3A',
                opacity,
                scale,
                x: isMobile ? x : 0,
                y: isMobile ? 0 : y,
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1.0]
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className={styles.quoteContainer}>
                <svg className={styles.quoteIcon} width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 24V15.4286C0 13.4653 0.304 11.6376 0.912 9.94531C1.52 8.2531 2.36267 6.76442 3.44 5.47927C4.51733 4.19412 5.79733 3.17501 7.28 2.42193C8.76267 1.66886 10.3787 1.20764 12.128 1.03827L14 4.57143C11.4187 5.0803 9.45067 6.18456 8.096 7.88421C6.74133 9.58386 6.064 11.3835 6.064 13.2831H14V24H0ZM18 24V15.4286C18 13.4653 18.304 11.6376 18.912 9.94531C19.52 8.2531 20.3627 6.76442 21.44 5.47927C22.5173 4.19412 23.7973 3.17501 25.28 2.42193C26.7627 1.66886 28.3787 1.20764 30.128 1.03827L32 4.57143C29.4187 5.0803 27.4507 6.18456 26.096 7.88421C24.7413 9.58386 24.064 11.3835 24.064 13.2831H32V24H18Z" fill="rgba(255,255,255,0.1)" />
                </svg>

                <p className={styles.quote}>{testimonials[currentIndex].quote}</p>
              </div>
              <div className={styles.authorInfo}>
                <h3 className={styles.authorName}>{testimonials[currentIndex].author}</h3>
                <div className={styles.authorDetails}>
                  <p className={styles.authorPosition}>
                    {testimonials[currentIndex].position}
                  </p>
                  {testimonials[currentIndex].linkedin && (
                    <a
                      href={testimonials[currentIndex].linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkedinLink}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#0A66C2" className={styles.linkedinIcon}>
                        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.navigationColumn}>
          <motion.button
            className={styles.navButton}
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobile ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>}

          </motion.button>

          <div className={styles.indicators}>
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                className={`${styles.indicator} ${index === currentIndex ? styles.active : ""}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          <motion.button
            className={styles.navButton}
            onClick={nextTestimonial}
            aria-label="Next testimonial"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobile ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 6 15 12 9 18"></polyline>
            </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>}

          </motion.button>
        </div>
      </div>

      <div className={styles.swipeIndicator}>
        <span>Swipe {isMobile ? 'left/right' : 'up/down'} to navigate testimonials</span>
      </div>
    </div>
  );
};

export default Testimonials;