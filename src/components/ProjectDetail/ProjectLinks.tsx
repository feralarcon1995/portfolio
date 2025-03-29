"use client"

import { motion } from "framer-motion"
import styles from "@/pages/projects/projectdetail.module.scss"
import { Project } from "@/data/projectsData"
import Magnet from "../Magnet/Magnet"

interface ProjectLinksProps {
  project: Project
}

export default function ProjectLinks({ project }: ProjectLinksProps) {
  return (
    <motion.section
      className={styles.linksSection}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className={styles.sectionDecoration}
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      <motion.h2 style={{ color: project.colors.primary }}>Project Links</motion.h2>

      <div className={styles.linksContainer}>
        {project.githubLink !== "empty" && (
          <Magnet padding={50} disabled={false} magnetStrength={10}>
            <motion.a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectLink}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#333",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.linkIcon}
              >
                <path
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              View on GitHub
            </motion.a>
          </Magnet>
         
        )}
        <Magnet padding={50} disabled={false} magnetStrength={10}>
          <motion.a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.projectLink} ${styles.liveLink}`}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.linkIcon}
            >
              <path
                d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M15 3h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            View Live Site
          </motion.a>
        </Magnet>

      </div>
    </motion.section>
  )
}

