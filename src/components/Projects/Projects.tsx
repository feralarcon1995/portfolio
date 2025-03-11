import React, { useState, useRef, useEffect } from 'react';
import styles from './projects.module.scss';
import { projectData } from '@/data/projectsData';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  firstImg: string;
}

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const getOffsetPosition = () => {
    if (windowWidth <= 768) {
      return {
        x: mousePosition.x + (windowWidth * 0.9),
        y: mousePosition.y - (windowWidth * 0.1)
      };
    }
    else if (windowWidth <= 1024) {
      return {
        x: mousePosition.x + (windowWidth * 0.7),
        y: mousePosition.y - (windowWidth * 0.1)
      };
    }
    else {
      return {
        x: mousePosition.x + 50,
        y: mousePosition.y - 50
      };
    }
  };

  const cursorPosition = getOffsetPosition();

  return (
    <section
      id="projects"
      className={styles.projects_container}
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      <div className={styles.projects_title}>
        <h1>Some of my works.</h1>
        <h2>Click on the project to see more  details.</h2>
      </div>

      <article className={styles.projects_list_container}>
        <ul className={styles.projects_list}>
          {projectData.map((project: Project) => (
            <motion.li
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className={styles.list_item_container}
            >
              <Link href={`/projects/${project.id}`} >
                <motion.div
                  className={styles.project_item}
                  whileHover={{
                    backgroundColor: '#f5f5f5',
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <h3>{project.title}</h3>
                  <motion.div
                    className={styles.arrow}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                </motion.div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </article>

      {hoveredProject && (
        <motion.div
          className={styles.cursor_follower}
          animate={{
            x: cursorPosition.x - 800,
            y: cursorPosition.y - 400,
            opacity: 1,
            scale: 1
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        >
          <img
            src={projectData.find(p => p.id === hoveredProject)?.firstImg}
            alt={projectData.find(p => p.id === hoveredProject)?.title}
          />
        </motion.div>
      )}
    </section>
  );
}