"use client"

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Calendar, Code2, ArrowDown } from 'lucide-react';
import styles from '../../pages/projects/projectdetail.module.scss';
import GithubIcon from '@/icons/GithubIcon';

interface HeroSectionProps {
  project: {
    title: string;
    category: string;
    description: string;
    year: string;
    technologies: string[];
    heroImage: string;
    github: string;
    live: string;
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({ project }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxX = useTransform(
    scrollYProgress,
    [0, 1],
    [mousePosition.x * 0.1, mousePosition.x * 0.3]
  );
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [mousePosition.y * 0.1, mousePosition.y * 0.3]
  );

  return (
    <section
      ref={containerRef}
      className={styles.heroSection}
      style={{
        '--primary-color': project.colors.primary,
        '--secondary-color': project.colors.secondary,
        '--background-color': project.colors.background,
        '--text-color': project.colors.text,
      } as React.CSSProperties}
    >
      <div className={styles.heroBackground}>
        <motion.div
          className={styles.heroImage}
          style={{
            backgroundImage: `url(${project.heroImage})`,
            x: parallaxX,
            y: parallaxY,
          }}
        />
        <div className={styles.heroOverlay} />
      </div>

      <div className={styles.heroContent}>
        <motion.div
          className={styles.heroText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className={styles.projectCategory}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {project.category}
          </motion.span>

          <motion.h1
            className={styles.projectTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {project.title}
          </motion.h1>

          <motion.p
            className={styles.projectDescription}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {project.description}
          </motion.p>

          <motion.div
            className={styles.projectMeta}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className={styles.metaItem}>
              <Calendar size={20} />
              <span>{project.year}</span>
            </div>
          </motion.div>

          <motion.div
            className={styles.projectLinks}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {project.github && project.github !== "empty" && project.github.trim() !== "" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkButton}
              >
                <GithubIcon />
                <span>View on GitHub</span>
              </a>
            )}
            {project.live && project.live !== "empty" && project.live.trim() !== "" && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkButton}
              >
                <ExternalLink size={20} />
                <span>Live Demo</span>
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span>Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

