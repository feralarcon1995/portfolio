"use client"

import { motion, type MotionValue, useTransform } from "framer-motion"
import styles from "@/pages/projects/projectdetail.module.scss"
import { Project } from "@/data/projectsData"

interface ProjectDescriptionProps {
  project: Project
  textReveal: MotionValue<number>
}

export default function ProjectDescription({ project, textReveal }: ProjectDescriptionProps) {
  // Text reveal on scroll
  const opacity = useTransform(textReveal, [0.1, 0.3], [0, 1])

  return (
    <motion.section className={styles.descriptionSection} style={{ opacity }}>
      <article className={styles.descriptionContainer}>
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
          style={{
            color: project.colors.primary,
            width: "100%",
          }}
        >
          About the Project
        </motion.h2>

        <div className={styles.textContainer}>
          {project.text.map((paragraph: string, index: number) => (
            <motion.p
              key={index}
              className={styles.descriptionParagraph}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </article>
    </motion.section>
  )
}

