"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import styles from "@/pages/projects/projectdetail.module.scss"

interface ProjectLinksProps {
  project: {
    github: string
    live: string
  }
  primaryColor: string
}

export default function ProjectLinks({ project, primaryColor }: ProjectLinksProps) {
  return (
    <section className={styles.projectLinksSection}>
      <motion.div
        className={styles.linksContainer}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          style={{ color: primaryColor }}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Project Links
        </motion.h2>

        <motion.div
          className={styles.linksWrapper}
          style={{ backgroundColor: `rgba(${primaryColor}, 0.05)` }}
        >
          <motion.div
            className={styles.linkItem}
            whileHover={{ scale: 1.05, x: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkButton}
              style={{ color: primaryColor }}
            >
              <motion.div
                className={styles.iconWrapper}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Github size={24} />
              </motion.div>
              <span>View on GitHub</span>
            </a>
          </motion.div>

          <motion.div
            className={styles.linkItem}
            whileHover={{ scale: 1.05, x: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkButton}
              style={{ color: primaryColor }}
            >
              <motion.div
                className={styles.iconWrapper}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <ExternalLink size={24} />
              </motion.div>
              <span>Live Demo</span>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

