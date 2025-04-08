"use client"

import type React from "react"

import { useMotionValue, useTransform } from "framer-motion"
import { motion } from "framer-motion"
import styles from "@/pages/projects/projectdetail.module.scss"
import { useEffect, useState } from "react"
import { Project } from "@/data/projectsData"

interface FeaturesSectionProps {
  project: Project
}

type Feature = Project['features'][number];

export default function FeaturesSection({ project }: FeaturesSectionProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }

  const x = useTransform(mouseX, [0, windowSize.width], [-10, 10])
  const y = useTransform(mouseY, [0, windowSize.height], [-10, 10])

  return (
    <motion.section className={styles.featuresSection} onMouseMove={handleMouseMove}>
      <div className={styles.featuresContainer}>
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
          Key Features
        </motion.h2>

        <div className={styles.featuresGrid}>
          {project.features.map((feature: Feature, index: number) => (
            <motion.div
              key={index}
              className={styles.featureCard}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.1 * index,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                y: -15,
              }}
            >
              <div className={styles.title_container}>
                <h3>{feature.title}</h3>
                <div className={styles.featureIcon}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 16V12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 8H12.01"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <p>{feature.description}</p>
              <motion.div
                className={styles.featureCardBackground}
                style={{
                  x: x,
                  y: y,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

