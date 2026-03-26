'use client'

import { motion } from 'framer-motion'
import { Space_Grotesk, Manrope } from 'next/font/google'
import { useState, useEffect, useRef } from 'react'
import styles from './preloader.module.scss'

const preHead = Space_Grotesk({
  subsets: ['latin'],
  variable: '--pl-head',
  weight: ['600', '700'],
})

const preBody = Manrope({
  subsets: ['latin'],
  variable: '--pl-body',
  weight: ['500', '600', '700'],
})

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.06 },
  },
}

const processItem = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
  },
}

const ease = [0.22, 1, 0.36, 1] as const

export default function PreLoader({ onLoadingComplete }: { onLoadingComplete?: () => void }) {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null)
  const completeOnce = useRef(false)

  useEffect(() => {
    const totalDuration = 2600
    const intervalTime = 32
    const totalSteps = totalDuration / intervalTime
    const increment = 100 / totalSteps

    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment
        if (next >= 100) {
          if (progressInterval.current) {
            clearInterval(progressInterval.current)
            progressInterval.current = null
          }
          return 100
        }
        return next
      })
    }, intervalTime)

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [])

  useEffect(() => {
    if (progress < 100 || exiting) return
    const t = window.setTimeout(() => setExiting(true), 40)
    return () => window.clearTimeout(t)
  }, [progress, exiting])

  useEffect(() => {
    if (!exiting) return
    const t = window.setTimeout(() => {
      if (completeOnce.current) return
      completeOnce.current = true
      onLoadingComplete?.()
    }, 360)
    return () => window.clearTimeout(t)
  }, [exiting, onLoadingComplete])

  const year = new Date().getFullYear()
  const pct = Math.min(100, Math.round(progress))

  return (
    <motion.div
      className={`${preHead.variable} ${preBody.variable} ${styles.overlay}`}
      initial={{ opacity: 1 }}
      animate={exiting ? { opacity: 0, y: -14 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.36, ease }}
    >
      <div className={styles.gridBg} aria-hidden />
      <div className={styles.scanline} aria-hidden />

      <main className={styles.main}>
        <div className={styles.metaLeft}>
          <span className={styles.metaAccent}>BOOT_SEQUENCE: INITIALIZED</span>
          <span className={styles.metaMuted}>KERNEL_VERSION: 4.2.0-MEDICEN</span>
        </div>
        <div className={styles.metaRight}>
          <span className={styles.metaDim}>LATENCY: 12MS</span>
          <span className={styles.metaDim}>ENCRYPTION: AES-256</span>
        </div>

        <div className={styles.centerWrap}>
          <div className={styles.titleGroup}>
            <motion.div
              className={styles.cornerTl}
              initial={{ x: 48, y: 48, opacity: 0 }}
              animate={exiting ? { opacity: 0 } : { x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.42, ease }}
            />
            <motion.div
              className={styles.cornerBr}
              initial={{ x: -48, y: -48, opacity: 0 }}
              animate={exiting ? { opacity: 0 } : { x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.42, ease }}
            />
            <motion.h1
              className={styles.title}
              initial={{ opacity: 0, y: 24 }}
              animate={exiting ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: exiting ? 0 : 0.08, ease }}
            >
              MEDICENFERPY
            </motion.h1>
          </div>

          <motion.div className={styles.processGrid} variants={stagger} initial="hidden" animate="visible">
            <motion.div className={styles.process} variants={processItem}>
              <span className={styles.processLabel}>Process 01</span>
              <span className={styles.processValue}>SYSTEM_BOOT: OK</span>
            </motion.div>
            <motion.div className={styles.process} variants={processItem}>
              <span className={styles.processLabel}>Process 02</span>
              <span className={styles.processValue}>CORE_READY</span>
            </motion.div>
            <motion.div className={styles.process} variants={processItem}>
              <span className={styles.processLabel}>Process 03</span>
              <span className={styles.processValue}>STABLE_CONNECTION</span>
            </motion.div>
          </motion.div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.progressRow}>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${pct}%` }} />
            </div>
            <span className={styles.progressLabel}>INITIALIZING... {pct}%</span>
          </div>
          <button
            type="button"
            className={styles.enterBtn}
            disabled={progress < 100}
            onClick={() => progress >= 100 && setExiting(true)}
          >
            <span className={styles.btnCornerTl} aria-hidden />
            <span className={styles.btnCornerBr} aria-hidden />
            ENTER_SYSTEM
          </button>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <span className={styles.footerBrand}>OS_INTERFACE_v.2.4</span>
          <span className={styles.footerCopy}>©{year} MEDICEN_FERPY_OS</span>
        </div>
        <div className={styles.footerLinks}>
          <a className={styles.footerLink} href="https://github.com/feralarcon1995" target="_blank" rel="noopener noreferrer">
            GITHUB
          </a>
          <a className={styles.footerLink} href="https://www.linkedin.com/in/feralarcon1995/" target="_blank" rel="noopener noreferrer">
            LINKEDIN
          </a>
          <a className={styles.footerLink} href="https://x.com/medicenferpy" target="_blank" rel="noopener noreferrer">
            X
          </a>
        </div>
      </footer>

      <div className={styles.decorCorner} aria-hidden>
        <div className={styles.decorInner} />
      </div>
    </motion.div>
  )
}
