import { projectData } from '@/data/projectsData';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Layout } from '@/layouts/Layout';
import { useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import styles from './projectdetail.module.scss';
import useLenis from '@/hooks/useLenis';
import { useInView } from 'framer-motion';
import TextPressure from '@/components/TextPressure/TextPressure';
import Squares from '@/components/Squares/Squares';

export default function ProjectDetail() {
  const router = useRouter();
  const { id } = router.query;
  const containerRef = useRef<HTMLDivElement>(null);

  useLenis();

  const { scrollYProgress } = useScroll();
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

  const scaleProgress = useSpring(scrollYProgress, springConfig);
  const opacity = useTransform(scaleProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scaleProgress, [0, 0.2], [0, -50]);

  if (!id) {
    return (
      <Layout title="Loading Project...">
        <div className={styles.loadingContainer}>
          <motion.div
            className={styles.loadingCircle}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </Layout>
    );
  }

  const project = projectData.find(p => p.id === id);

  if (!project) {
    return (
      <Layout title="Project Not Found">
        <motion.div
          className={styles.notFoundContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Project Not Found</h1>
          <p>The project you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <motion.button
            className={styles.backButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/')}
          >
            Back to Projects
          </motion.button>
        </motion.div>
      </Layout>
    );
  }

  const nextProject = projectData.find((p) => p.id === project.next);

  return (
    <Layout title={`${project.title} - Project Details`}>
      <AnimatePresence mode="wait">
        <motion.div
          className={styles.container}
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.hero}
            style={{ opacity, y }}
          >
            <motion.h1
              className={styles.title}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {project.title}
            </motion.h1>

            <p>{project.summary}</p>
          </motion.div>

          {/* Project Overview */}
          <motion.section
            className={styles.overview}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className={styles.overviewContent}
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.h2 variants={fadeIn}>Project Overview</motion.h2>
              <motion.p variants={fadeIn}>{project.summary}</motion.p>
              <div className={styles.descriptionText}>
                {project.text.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    className={styles.paragraph}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + (index * 0.1), duration: 0.5 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
              <motion.div
                className={styles.challengesList}
                variants={staggerContainer}
              >
                <h3>Key Challenges</h3>
                {project.challenges?.map((challenge, index) => (
                  <motion.div
                    key={index}
                    className={styles.challengeItem}
                    variants={slideIn}
                  >
                    <span>{challenge}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.h2 variants={fadeIn}>Technical Overview</motion.h2>
              <div className={styles.techStack}>
                {project.secondary.map((tech, index) => (
                  <motion.span
                    key={index}
                    className={styles.techBadge}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.section>
          <motion.div
            className={styles.techSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <h3 className={styles.techTitle}>Tech Stack:</h3>
            <ul className={styles.techList}>
              {project.secondary.map((tech, index) => (
                <motion.li
                  key={index}
                  className={styles.techItem}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + (index * 0.1), duration: 0.4 }}
                  whileHover={{
                    scale: 1.05,
                    color: "var(--accent-color)",
                    x: 5
                  }}
                >
                  {tech}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.section
            className={styles.imageGallery}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className={styles.galleryGrid}>
              <motion.div
                className={styles.mainImage}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={project.firstImg}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </motion.div>

              {project.secondImg && (
                <motion.div
                  className={styles.secondaryImage}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <Image
                    src={project.secondImg}
                    alt={`${project.title} detail view`}
                    layout="fill"
                    objectFit="cover"
                  />
                </motion.div>
              )}
            </div>
          </motion.section>

          <motion.section
            className={styles.featuresSection}
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeIn}>Key Features</motion.h2>
            <div className={styles.featuresGrid}>
              {project.features?.map((feature, index) => (
                <motion.div
                  key={index}
                  className={styles.featureCard}
                  variants={fadeInUp}
                >
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            className={styles.technicalDetails}
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >

          </motion.section>


          <motion.div
            className={styles.featuresGrid}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {project.features?.map((feature, index) => (
              <motion.div
                key={index}
                className={styles.featureCard}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.03 }}
              >
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className={styles.projectDetails}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.detailsGrid}>
              <motion.div
                className={styles.detailCard}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h4>Rol</h4>
                <p>{project.role}</p>
              </motion.div>

              <motion.div
                className={styles.detailCard}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h4>Duration</h4>
                <p>{project.duration}</p>
              </motion.div>
            </div>

            <motion.div
              className={styles.highlightsList}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h3>Aspects Highlights</h3>
              <ul>
                {project.highlights?.map((highlight, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {highlight}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Links Section */}
          <motion.div
            className={styles.linksSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            {project.githubLink !== "empty" && (
              <motion.a
                href={project.githubLink}
                className={styles.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, backgroundColor: "#24292e" }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>Ver en GitHub</span>
              </motion.a>
            )}

            <motion.a
              href={project.liveLink}
              className={`${styles.projectLink} ${styles.liveLink}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, backgroundColor: "#6c5ce7" }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              <span>See Live</span>
            </motion.a>
          </motion.div>

          {/* Next Project Section */}
          {nextProject && (
            <motion.div
              className={styles.nextProjectSection}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              <h3 className={styles.nextProjectTitle}>Next Project</h3>
              <Link href={`/projects/${nextProject.id}`} passHref>
                <motion.div
                  className={styles.nextProjectCard}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={styles.nextProjectInfo}>
                    <h4>{nextProject.title}</h4>
                    <p>{nextProject.text[0].substring(0, 80)}...</p>
                  </div>
                  <div className={styles.nextProjectArrow}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}

// Animation variants
const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const slideIn = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};