"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import styles from "@/pages/projects/projectdetail.module.scss"
import { Project } from "@/data/projectsData"

interface NextProjectProps {
  nextProject: Project
  primaryColor: string
}

export default function NextProject({ nextProject, primaryColor }: NextProjectProps) {
  return (
    <motion.section
      className={styles.nextProjectSection}
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

      <motion.h2 style={{ color: primaryColor }}>Next Project</motion.h2>

      <Link href={`/projects/${nextProject.id}`} passHref>
        <motion.div
          className={styles.nextProjectCard}
          whileHover={{
            scale: 1.03,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.nextProjectInfo}>
            <h3>{nextProject.title}</h3>
            <p>{nextProject.category}</p>
            <motion.span className={styles.viewProject} whileHover={{ x: 5 }}>
              View Project →
            </motion.span>
          </div>
          <div className={styles.nextProjectImageContainer}>
            <Image
              src={nextProject.firstImg || "/placeholder.svg"}
              alt={nextProject.title}
              width={300}
              height={200}
              className={styles.nextProjectImage}
            />
            <motion.div
              className={styles.nextProjectOverlay}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      </Link>
    </motion.section>
  )
}

