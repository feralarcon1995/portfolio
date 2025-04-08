"use client"

import { motion } from "framer-motion"
import { ArrowRight, ArrowLeft } from "lucide-react"
import styles from "@/pages/projects/projectdetail.module.scss"
import Image from "next/image"
import { Project } from "@/data/projectsData"
import { useRouter } from "next/router"

interface NextProjectProps {
  nextProject: Project
  primaryColor: string
}

export default function NextProject({ nextProject, primaryColor }: NextProjectProps) {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/#projects").then(() => {
      const projectsSection = document.getElementById("projects")
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth" })
      }
    })
  }

  return (
    <section className={styles.nextProjectSection}>
      <motion.div
        className={styles.nextProjectContainer}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className={styles.nextProjectContent}
          style={{ backgroundColor: `rgba(${primaryColor}, 0.05)` }}
        >
          <motion.div
            className={styles.imageWrapper}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              src={nextProject.images[0].src}
              alt={nextProject.images[0].alt}
              width={400}
              height={300}
              className={styles.projectImage}
            />
          </motion.div>

          <motion.div
            className={styles.textContent}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className={styles.category} style={{ color: primaryColor }}>
              {nextProject.category}
            </span>
            <h2>{nextProject.title}</h2>
            <motion.a
              href={`/projects/${nextProject.id}`}
              className={styles.nextButton}
              style={{ color: primaryColor }}
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              View Project
              <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.backButtonContainer}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            onClick={handleBackClick}
            className={styles.backButton}
            whileHover={{ x: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ArrowLeft size={20} />
            Back to All Projects
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}

