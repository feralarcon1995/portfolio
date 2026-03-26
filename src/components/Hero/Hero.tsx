import React, { useCallback, useMemo, useRef } from 'react'
import { motion, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import styles from './hero.module.scss'
import { useLenisScroll } from '@/hooks/useLenisScroll'
import { SplitLines } from '@/components/SplitWordsReveal/SplitWordsReveal'

import LinkedinIcon from '@/icons/LinkedinIcon'
import XIcon from '@/icons/XIcon'
import GithubIcon from '@/icons/GithubIcon'
import Link from 'next/link'

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null)
  const { elementProgressMotion, lenis } = useLenisScroll(heroRef as React.RefObject<HTMLElement>)

  const bgOpacity = useTransform(elementProgressMotion, [0, 1], [0.08, 0])
  const bgY = useTransform(elementProgressMotion, [0, 1], [0, -80])
  const arrowOpacity = useTransform(elementProgressMotion, [0, 0.6], [1, 0])

  const circularText = useMemo(
    () => ' LET\'S TALK * CONTACT *  GET IN TOUCH *',
    [],
  )

  const goContact = useCallback(() => {
    if (typeof window === 'undefined') return
    const el = document.getElementById('contact')
    if (!el) return

    const isMobile = window.innerWidth < 768
    if (lenis) {
      lenis.scrollTo(el, { offset: 0, immediate: isMobile })
      return
    }

    el.scrollIntoView({ behavior: isMobile ? 'auto' : 'smooth' })
  }, [lenis])

  return (
    <section ref={heroRef} className={styles.container}>
      <motion.div className={styles.bgWord} style={{ opacity: bgOpacity, y: bgY }}>
        MEDICENFERPY
      </motion.div>

      <div className={styles.scanline} />

      <div className={styles.content}>
        <div className={styles.heroText}>
          <div className={styles.label}>
            <SplitLines
              lines={[{ text: 'SYSTEM_INIT_SUCCESS // 2020' }]}
              stagger={0.028}
              delayChildren={0.05}
            />
          </div>

          <h1 className={styles.title}>
            <SplitLines
              rootBlock
              lines={[
                { text: 'LOOKING FOR A' },
                { text: 'WEB SOLUTION?', className: styles.titleAccent },
              ]}
              stagger={0.055}
              delayChildren={0.12}
            />
          </h1>

          <motion.p
            className={styles.subtitle}
            initial={{ y: 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
          >
            Engineering immersive digital architectures where performance meets editorial aesthetic. Crafting the next generation of visual experiences.
          </motion.p>

          <motion.div
            className={styles.socialRow}
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="https://www.linkedin.com/in/feralarcon1995/" target="_blank" aria-label="LinkedIn">
              <LinkedinIcon />
            </Link>
            <Link href="https://github.com/feralarcon1995" target="_blank" aria-label="GitHub">
              <GithubIcon />
            </Link>
            <Link href="https://x.com/medicenferpy" target="_blank" aria-label="X">
              <XIcon />
            </Link>
          </motion.div>

          <motion.p
            className={styles.bottomNote}
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.74, ease: [0.22, 1, 0.36, 1] }}
          >
            let&apos;s make this crazy idea come true, together working as a team.
          </motion.p>
        </div>

        <motion.button
          type="button"
          className={styles.badge}
          onClick={goContact}
          aria-label="Ir a Contact"
        >
          <div className={styles.badgeSpin} aria-hidden="true">
            <svg viewBox="0 0 100 100" className={styles.badgeSvg}>
              <defs>
                <path
                  id="badgePath"
                  d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0"
                />
              </defs>
              <text className={styles.badgeText}>
                <textPath href="#badgePath" startOffset="0%">
                  {circularText}
                </textPath>
              </text>
            </svg>
          </div>
          <motion.div className={styles.badgeCenter} style={{ opacity: 1 }} whileHover={{ y: -2 }}>
            <ArrowDown size={26} />
          </motion.div>
        </motion.button>

        <motion.div className={styles.arrowPrompt} style={{ opacity: arrowOpacity }}>
          <span>Scroll</span>
          <ArrowDown size={18} />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero