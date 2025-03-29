"use client"

import { useEffect, useRef } from "react"
import { motion, type MotionValue, useMotionValue, useTransform } from "framer-motion"
import styles from "@/pages/projects/projectdetail.module.scss"
import { Project } from "@/data/projectsData"

interface HeroSectionProps {
  project: Project
  scrollProgress: MotionValue<number>
}

export default function HeroSection({ project, scrollProgress }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null)

  // Mouse position for parallax effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Hero section parallax effects
  const heroOpacity = useTransform(scrollProgress, [0, 0.2], [1, 0])
  const heroY = useTransform(scrollProgress, [0, 0.2], [0, -100])
  const heroScale = useTransform(scrollProgress, [0, 0.2], [1, 0.9])

  // Background parallax effect
  const heroBackgroundX = useTransform(mouseX, [0, window.innerWidth], [-20, 20])
  const heroBackgroundY = useTransform(mouseY, [0, window.innerHeight], [-20, 20])

  // Handle mouse movement for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mouseX, mouseY])

  // Set project colors as CSS variables
  useEffect(() => {
    if (project) {
      document.documentElement.style.setProperty("--project-primary-color", project.colors.primary)
      document.documentElement.style.setProperty("--project-secondary-color", project.colors.secondary)
      document.documentElement.style.setProperty("--project-background", project.colors.background)
      document.documentElement.style.setProperty("--project-text-color", project.colors.text)

      // Versions with transparency for effects
      document.documentElement.style.setProperty("--project-primary-color-light", `${project.colors.primary}1a`)
      document.documentElement.style.setProperty("--project-secondary-color-light", `${project.colors.secondary}1a`)
    }

    return () => {
      // Clean up CSS variables on unmount
      document.documentElement.style.removeProperty("--project-primary-color")
      document.documentElement.style.removeProperty("--project-secondary-color")
      document.documentElement.style.removeProperty("--project-background")
      document.documentElement.style.removeProperty("--project-text-color")
      document.documentElement.style.removeProperty("--project-primary-color-light")
      document.documentElement.style.removeProperty("--project-secondary-color-light")
    }
  }, [project])

  return (
    <motion.div
      ref={heroRef}
      className={styles.heroSection}
      style={{
        opacity: heroOpacity,
        y: heroY,
        scale: heroScale,
      }}
    >
      <div className={styles.heroBackground}>
        <motion.div
          className={styles.heroBackgroundInner}
          style={{
            x: heroBackgroundX,
            y: heroBackgroundY,
          }}
        />
      </div>

      <motion.h1
        className={styles.projectTitle}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {project.title}
      </motion.h1>
      <motion.p
        className={styles.projectCategory}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {project.category}
      </motion.p>

      <motion.div
        className={styles.scrollIndicator}
        animate={{
          y: [0, 10, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <span>Scroll to explore</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 5V19M12 19L5 12M12 19L19 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}

