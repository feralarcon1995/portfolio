"use client"

import { motion } from "framer-motion"
import styles from "@/pages/projects/projectdetail.module.scss"
import { AlertTriangle, Star } from "lucide-react"

interface ChallengesHighlightsProps {
  challenges?: string[]
  highlights?: string[]
  primaryColor: string
}

export default function ChallengesHighlights({ challenges, highlights, primaryColor }: ChallengesHighlightsProps) {
  return (
    <section className={styles.challengesHighlightsSection}>
      <div className={styles.challengesContainer}>
        <motion.div
          className={styles.contentWrapper}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {challenges && (
            <motion.div
              className={styles.challenges}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.h2 style={{ color: primaryColor }}>Challenges</motion.h2>
              <div className={styles.challengesList}>
                {challenges.map((challenge, index) => (
                  <motion.div
                    key={index}
                    className={styles.challengeItem}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1 * index,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{ scale: 1.02, x: 10 }}
                  >
                    <motion.div
                      className={styles.challengeIcon}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <AlertTriangle size={16} />
                    </motion.div>
                    <span>{challenge}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {highlights && (
            <motion.div
              className={styles.highlights}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.h2 style={{ color: primaryColor }}>Highlights</motion.h2>
              <div className={styles.highlightsList}>
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    className={styles.highlightItem}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1 * index,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{ scale: 1.02, x: -10 }}
                  >
                    <motion.div
                      className={styles.highlightIcon}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Star size={16} />
                    </motion.div>
                    <span>{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

