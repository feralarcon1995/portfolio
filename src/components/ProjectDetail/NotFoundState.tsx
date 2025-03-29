"use client"

import { motion } from "framer-motion"
import styles from "@/pages/projects/projectdetail.module.scss"
import { Layout } from "@/layouts/Layout"

interface NotFoundStateProps {
  onBackClick: () => void
}

export default function NotFoundState({ onBackClick }: NotFoundStateProps) {
  return (
    <Layout title="Project Not Found">
      <motion.div
        className={styles.notFoundContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Project Not Found</h1>
        <p>The project you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <motion.button
          className={styles.backButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBackClick}
        >
          Back to Projects
        </motion.button>
      </motion.div>
    </Layout>
  )
}

