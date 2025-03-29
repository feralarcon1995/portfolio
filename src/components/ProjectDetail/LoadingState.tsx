"use client"

import { motion } from "framer-motion"
import styles from "@/pages/projects/projectdetail.module.scss"
import { Layout } from "@/layouts/Layout"

export default function LoadingState() {
  return (
    <Layout title="Loading Project...">
      <div className={styles.loadingContainer}>
        <motion.div
          className={styles.loadingCircle}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
    </Layout>
  )
}

