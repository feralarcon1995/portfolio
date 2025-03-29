"use client"

import { motion } from "framer-motion"
import styles from "@/pages/projects/projectdetail.module.scss"

interface ChallengesHighlightsProps {
  challenges?: string[]
  highlights?: string[]
  primaryColor: string
}

export default function ChallengesHighlights({ challenges, highlights, primaryColor }: ChallengesHighlightsProps) {
  return (
    <div className={styles.challengesHighlightsSection}>
      {challenges && (
        <motion.div
          className={styles.challenges}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
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

          <motion.h2 style={{ color: primaryColor }}>Challenges</motion.h2>

          <ul className={styles.bulletList}>
            {challenges.map((challenge, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                whileHover={{
                  x: 10,
                  color: primaryColor,
                  transition: { duration: 0.2 },
                }}
              >
                <motion.span className={styles.bulletPoint} />
                {challenge}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {highlights && (
        <motion.div
          className={styles.highlights}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className={styles.sectionDecoration}
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              background: `linear-gradient(90deg, 
                  transparent, 
                  ${primaryColor}33, 
                  transparent
                )`,
            }}
          />

          <motion.h2 style={{ color: primaryColor }}>Highlights</motion.h2>

          <ul className={styles.bulletList}>
            {highlights.map((highlight, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                whileHover={{
                  x: 10,
                  color: primaryColor,
                  transition: { duration: 0.2 },
                }}
              >
                <motion.span
                  className={styles.bulletPoint}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                {highlight}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  )
}

