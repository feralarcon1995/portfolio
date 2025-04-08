"use client"

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './ProjectImages.module.scss';
import { Project } from "@/data/projectsData"

interface ProjectImagesProps {
  project: Project
}

const ProjectImages: React.FC<ProjectImagesProps> = ({ project }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.section
      className={styles.imagesSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className={styles.imagesGrid}>
        {project.images.map((image, index) => (
          <motion.div
            key={index}
            className={styles.imageWrapper}
            variants={imageVariants}
          >
            <Image
              src={image.src}
              alt={`${project.title} screenshot ${index + 1}`}
              fill
              className={styles.projectImage}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={90}
              priority={index === 0}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ProjectImages;

