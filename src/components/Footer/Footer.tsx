'use client'

import React, { useRef } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import styles from './Footer.module.scss'
import Link from 'next/link'
import { ArrowUp } from 'lucide-react'
import Magnet from '../Magnet/Magnet'
import { useLenisScroll } from '@/hooks/useLenisScroll'

const connectLinks = [
  { id: 'github', label: 'GITHUB', url: 'https://github.com/feralarcon1995' },
  { id: 'linkedin', label: 'LINKEDIN', url: 'https://www.linkedin.com/in/feralarcon1995/' },
  { id: 'readcv', label: 'READ.CV', url: 'https://read.cv/' }
]

const navigateLinks = [
  { id: 'selected', label: 'SELECTED_WORKS', url: '/#projects' },
  { id: 'manifesto', label: 'MANIFESTO', url: '/#about' },
  { id: 'init', label: 'INIT_SYNC', url: '/#contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const footerRef = useRef<HTMLElement | null>(null)
  const { elementProgressMotion } = useLenisScroll(footerRef)

  const gridX = useTransform(elementProgressMotion, [0, 0.75, 1], [0, 96, 158])
  const gridOpacity = useTransform(elementProgressMotion, [0, 0.52, 1], [0.35, 1, 0.82])
  const smoothGridX = useSpring(gridX, { stiffness: 52, damping: 19 })
  const smoothGridOpacity = useSpring(gridOpacity, { stiffness: 68, damping: 23 })

  const brandY = useTransform(elementProgressMotion, [0, 0.7, 1], [0, -32, -52])
  const brandOpacity = useTransform(elementProgressMotion, [0, 0.62, 1], [1, 1, 0.38])
  const smoothBrandY = useSpring(brandY, { stiffness: 68, damping: 23 })
  const smoothBrandOpacity = useSpring(brandOpacity, { stiffness: 84, damping: 27 })

  const colShift = useTransform(elementProgressMotion, [0, 0.72, 1], [0, 14, 28])
  const smoothColShift = useSpring(colShift, { stiffness: 58, damping: 21 })

  const outline1Y = useTransform(elementProgressMotion, [0, 1], [0, -36])
  const outline2Y = useTransform(elementProgressMotion, [0, 1], [0, -82])
  const smoothOutline1Y = useSpring(outline1Y, { stiffness: 50, damping: 20 })
  const smoothOutline2Y = useSpring(outline2Y, { stiffness: 50, damping: 20 })

  const bottomY = useTransform(elementProgressMotion, [0, 1], [0, -18])
  const bottomOpacity = useTransform(elementProgressMotion, [0, 0.48, 1], [0.45, 1, 0.9])
  const smoothBottomY = useSpring(bottomY, { stiffness: 58, damping: 21 })
  const smoothBottomOpacity = useSpring(bottomOpacity, { stiffness: 72, damping: 25 })

  const scrollToTop = () => {
    if (typeof window === 'undefined') return
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer ref={footerRef} id="footer" className={styles.footer}>
      <div className={styles.footerBgLines} aria-hidden="true">
        <motion.div className={styles.footerOutline1} style={{ y: smoothOutline1Y, opacity: 0.08 }}>
          SYSTEM_FOOTER
        </motion.div>
        <motion.div className={styles.footerOutline2} style={{ y: smoothOutline2Y, opacity: 0.06 }}>
          END_NODE
        </motion.div>
      </div>
      <motion.div className={styles.grid} style={{ x: smoothGridX, opacity: smoothGridOpacity }}>
        <motion.div className={styles.brand} style={{ y: smoothBrandY, opacity: smoothBrandOpacity }}>
          <div className={styles.brandTitle}>MEDICENFERPY</div>
          <div className={styles.brandSub}>FULLSTACK DEVELOPER &amp; VISUAL LOGIC ENGINEERING.</div>
        </motion.div>

        <motion.div className={styles.col} style={{ x: smoothColShift }}>
          <div className={styles.colTitle}>CONNECT_</div>
          <nav className={styles.nav}>
            {connectLinks.map((item) => (
              <Magnet key={item.id} padding={70} disabled={false} magnetStrength={35}>
                <a className={styles.navItem} href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.label}
                </a>
              </Magnet>
            ))}
          </nav>
        </motion.div>

        <motion.div className={styles.col} style={{ x: smoothColShift }}>
          <div className={styles.colTitle}>NAVIGATE_</div>
          <nav className={styles.nav}>
            {navigateLinks.map((item) => (
              <Link key={item.id} className={styles.navItemMuted} href={item.url}>
                {item.label}
              </Link>
            ))}
          </nav>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.bottom}
        style={{ y: smoothBottomY, opacity: smoothBottomOpacity }}
      >
        <div className={styles.bottomLeft}>© {year} MEDICENFERPY. ALL RIGHTS RESERVED.</div>

        <div className={styles.bottomRight}>
          <div className={styles.end}>END_OF_TRANSMISSION // {year}</div>
          <button type="button" className={styles.toTop} onClick={scrollToTop} aria-label="Back to top">
            <ArrowUp size={18} />
          </button>
        </div>
      </motion.div>
    </footer>
  )
}
