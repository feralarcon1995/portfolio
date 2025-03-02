import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUp } from '@/icons/ArrowUp';
import styles from './ExperienceTimeline.module.scss';
import Magnet from '../Magnet/Magnet';

interface Experience {
  date: string;
  link_company: string;
  thumbnail: string;
  company: string;
  stack: { id: string; name: string }[];
}

interface ExperienceTimelineProps {
  experience: Experience;
  isInView: boolean;
}

const ExperienceTimeline = ({ experience, isInView }: ExperienceTimelineProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
    },
  };

  const techColors: { [key: string]: string } = {
    HTML: '#E44D26',
    CSS: '#264DE4',
    JAVASCRIPT: '#F7DF1E',
    TYPESCRIPT: '#3178C6',
    REACTJS: '#61DAFB',
    NEXTJS: '#000000',
    BOOTSTRAP: '#7952B3',
    GIT: '#F05032',
    SCSS: '#CC6699',
    PYTHON: '#3776AB',
    DJANGO: '#092E20',
    NODEJS: '#339933',
    AWS: '#FF9900',
    'MATERIAL UI': '#0081CB',
  };

  const getColor = (techName: string): string => {
    return techColors[techName.toUpperCase()] || '#6c757d';
  };

  return (
    <motion.div
      className={styles.experienceTimeline}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className={styles.timelineHeader}>
        <motion.div className={styles.dateContainer} variants={itemVariants}>
          <span className={styles.dateLabel}>PERIOD</span>
          <span className={styles.date}>{experience.date}</span>
        </motion.div>
        <Magnet padding={50} disabled={false} magnetStrength={10}>
          <motion.a
            href={experience.link_company}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.companyLink}
            variants={itemVariants}
          >
            <div className={styles.companyLogoWrapper}>
              <Image
                src={experience.thumbnail}
                alt={`${experience.company} logo`}
                width={40}
                height={40}
                className={styles.companyLogo}
                loading="lazy"
              />
            </div>
            <span className={styles.companyName}>{experience.company}</span>
            <ArrowUp className={styles.arrow} />
          </motion.a>
        </Magnet>
      </div>

      <motion.div className={styles.timelineDivider} variants={itemVariants}>
        <span className={styles.dividerLine}></span>
      </motion.div>

      <motion.div className={styles.stackSection} variants={itemVariants}>
        <motion.h3
          className={styles.stackTitle}
          variants={itemVariants}
        >
          Technology Stack
        </motion.h3>

        <motion.div
          className={styles.stackGrid}
          variants={containerVariants}
        >
          {experience.stack.map((tech) => (
            <Magnet key={tech.id} padding={60} disabled={false} magnetStrength={5}>
              <motion.div
                key={tech.id}
                className={styles.stackBadge}
                style={{
                  backgroundColor: `${getColor(tech.name)}15`,
                  borderLeft: `4px solid ${getColor(tech.name)}`
                }}
                variants={itemVariants}
                whileHover={{
                  x: 5,
                  backgroundColor: `${getColor(tech.name)}30`,
                  transition: { duration: 0.2 }
                }}
              >
                <span
                  className={styles.techDot}
                  style={{ backgroundColor: getColor(tech.name) }}
                ></span>
                <span className={styles.techName}>{tech.name}</span>
              </motion.div>
            </Magnet>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ExperienceTimeline;