"use client"

import { motion } from "framer-motion"
import styles from "@/pages/projects/projectdetail.module.scss"
import { Project } from "@/data/projectsData"

interface TechnologiesSectionProps {
  project: Project
}

export default function TechnologiesSection({ project }: TechnologiesSectionProps) {
  return (
    <motion.section className={styles.technologiesSection}>
      <motion.div
        className={styles.sectionDecoration}
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ color: project.colors.primary }}
      >
        Technologies Used
      </motion.h2>

      <motion.div
        className={styles.techGrid}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {project.secondary.map((tech: string, index: number) => (
          <motion.div
            key={index}
            className={styles.techItem}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.1 + index * 0.05,
              type: "spring",
              stiffness: 200,
            }}
          >
            {tech}
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}

