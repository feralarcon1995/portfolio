"use client"

import { motion } from 'framer-motion';
import { Calendar, Code2, Users, Target, Code } from 'lucide-react';
import styles from '../../pages/projects/projectdetail.module.scss';
import { Project } from '@/data/projectsData';

interface ProjectSummaryProps {
  project: Project;
}

const ProjectSummary: React.FC<ProjectSummaryProps> = ({ project }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className={styles.summaryContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className={styles.summarySection}>
        <motion.div className={styles.summaryContent} variants={itemVariants}>
          <motion.div className={styles.summaryText} variants={itemVariants}>
            <motion.h2 variants={itemVariants}>Project Overview</motion.h2>
            <motion.p variants={itemVariants}>{project.summary}</motion.p>
          </motion.div>

          <motion.div className={styles.summaryGrid} variants={itemVariants}>
            <motion.div className={styles.summaryCard} variants={itemVariants}>
              <Calendar className={styles.summaryIcon} />
              <div className={styles.summaryInfo}>
                <h3>Year</h3>
                <p>{project.year}</p>
              </div>
            </motion.div>

            <motion.div className={styles.summaryCard} variants={itemVariants}>
              <Users className={styles.summaryIcon} />
              <div className={styles.summaryInfo}>
                <h3>Role</h3>
                <p>{project.role}</p>
              </div>
            </motion.div>

            <motion.div className={styles.summaryCard} variants={itemVariants}>
              <Target className={styles.summaryIcon} />
              <div className={styles.summaryInfo}>
                <h3>Duration</h3>
                <p>{project.duration}</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div className={styles.techStackSection} variants={itemVariants}>
            <div className={styles.techStackHeader}>
              <Code2 size={24} />
              <h3>Tech Stack</h3>
            </div>
            <div className={styles.techTags}>
              {project.secondary.map((tech, index) => (
                <motion.div
                  key={index}
                  className={styles.techTag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Code size={16} />
                  <span>{tech}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProjectSummary;

