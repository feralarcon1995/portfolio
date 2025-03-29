"use client"

import { motion } from "framer-motion"
import styles from "@/pages/projects/projectdetail.module.scss"
import { Project } from "@/data/projectsData"

interface ProjectSummaryProps {
  project: Project
}

export default function ProjectSummary({ project }: ProjectSummaryProps) {
  return (
    <motion.section
      className={styles.summarySection}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
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
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ color: project.colors.primary }}
      >
        Project Overview
      </motion.h2>

      <motion.p
        className={styles.summary}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {project.summary}
      </motion.p>

      <div className={styles.projectMeta}>
        <motion.div
          className={styles.metaItem}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3>Role</h3>
          <p>{project.role}</p>
        </motion.div>

        <motion.div
          className={styles.metaItem}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3>Duration</h3>
          <p>{project.duration}</p>
        </motion.div>
      </div>
    </motion.section>
  )
}

