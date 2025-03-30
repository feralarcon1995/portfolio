"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"
import styles from "./ProjectImages.module.scss"

interface ImageProps {
  src: string
  alt: string
}

interface ProjectImagesProps {
  images: ImageProps[]
  projectId: string
}

const ProjectImages = ({ images, projectId }: ProjectImagesProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const firstImageY = useTransform(smoothScrollProgress, [0, 1], ["0%", "20%"])
  const secondImageY = useTransform(smoothScrollProgress, [0, 1], ["0%", "-55%"])

  const firstImageScale = useTransform(smoothScrollProgress, [0, 0.5, 1], [1, 1.05, 1.1])
  const secondImageScale = useTransform(smoothScrollProgress, [0, 0.5, 1], [1, 1.08, 1.15])

  const firstImageOpacity = useTransform(smoothScrollProgress, [0, 0.3, 0.6, 1], [0.6, 1, 1, 0.8])
  const secondImageOpacity = useTransform(smoothScrollProgress, [0, 0.3, 0.7, 1], [0.6, 0.8, 1, 1])

  if (!images || images.length < 2) {
    return null
  }

  return (
    <div ref={containerRef} className={styles.projectImagesContainer}>
      <div className={styles.imagesWrapper}>
        <motion.div
          className={styles.imageContainer}
          style={{
            y: firstImageY,
            scale: firstImageScale,
            opacity: firstImageOpacity,
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={styles.imageWrapper}>
            <Image
              src={images[0].src || "/placeholder.svg"}
              alt={images[0].alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.image}
              priority
            />
          </div>
        </motion.div>

        <motion.div
          className={styles.imageContainer}
          style={{
            y: secondImageY,
            scale: secondImageScale,
            opacity: secondImageOpacity,
          }}
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className={styles.imageWrapper}>
            <Image
              src={images[1].src}
              alt={images[1].alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.image}
              priority
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProjectImages

