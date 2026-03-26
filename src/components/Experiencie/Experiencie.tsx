import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useTransform, useMotionValueEvent } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import styles from './style.module.scss'
import { useLenisScroll } from '@/hooks/useLenisScroll'
import { SplitLines } from '@/components/SplitWordsReveal/SplitWordsReveal'
import { journalExperiences, type JournalExperience } from '@/data/journalExperiences'

const Experiencie = () => {
  const experienceRef = useRef<HTMLElement | null>(null)
  const { elementProgressMotion } = useLenisScroll(experienceRef as unknown as React.RefObject<HTMLElement>)
  const [hasEntered, setHasEntered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  useMotionValueEvent(elementProgressMotion, 'change', (v: number) => {
    if (!hasEntered && v >= 0.12) setHasEntered(true)
  })

  const headerX = useTransform(elementProgressMotion, [0, 0.55], [220, 0])
  const headerOpacity = useTransform(elementProgressMotion, [0, 0.32, 0.72, 1], [0, 1, 1, 0.85])

  const titleY = useTransform(elementProgressMotion, [0, 0.62, 1], [0, -40, -72])
  const titleOpacity = useTransform(elementProgressMotion, [0, 0.68, 1], [1, 1, 0.35])

  const bgTickerY = useTransform(elementProgressMotion, [0, 1], [0, -72])

  const outline1Y = useTransform(elementProgressMotion, [0, 1], [0, -42])
  const outline2Y = useTransform(elementProgressMotion, [0, 1], [0, -98])

  const pathX = useTransform(elementProgressMotion, [0, 0.72, 1], [0, 32, 56])
  const pathOpacity = useTransform(elementProgressMotion, [0, 0.55, 1], [0.55, 1, 0.35])

  const listX = useTransform(elementProgressMotion, [0, 0.78, 1], [0, 56, 96])
  const listOpacity = useTransform(elementProgressMotion, [0, 0.62, 1], [1, 1, 0.12])

  return (
    <section ref={experienceRef} className={styles.container} id="experiencie">
      <div className={styles.journalBgLines} aria-hidden="true">
        <motion.div
          className={styles.journalOutline1}
          style={{ y: outline1Y, opacity: 0.09 }}
        >
          ARCHIVE_LOG
        </motion.div>
        <motion.div
          className={styles.journalOutline2}
          style={{ y: outline2Y, opacity: 0.06 }}
        >
          TIMELINE_SYNC
        </motion.div>
      </div>

      <motion.div
        className={styles.bgTicker}
        aria-hidden="true"
        style={{ y: isMobile ? 0 : bgTickerY }}
      >
        JOURNAL_
      </motion.div>

      <motion.header className={styles.header} style={{ x: isMobile ? 0 : headerX, opacity: isMobile ? 1 : headerOpacity }}>
        <motion.h2 className={styles.title} style={{ y: isMobile ? 0 : titleY, opacity: isMobile ? 1 : titleOpacity }}>
          <SplitLines rootBlock lines={[{ text: 'Journal_' }]} delayChildren={0.08} />
        </motion.h2>
        <motion.div
          className={styles.path}
          style={{ x: isMobile ? 0 : pathX, opacity: isMobile ? 1 : pathOpacity }}
        >
          PATH: /USER/FERNANDO/HISTORY
        </motion.div>
      </motion.header>

      <motion.div
        className={styles.list}
        style={{ x: isMobile ? 0 : listX, opacity: isMobile ? 1 : listOpacity }}
        initial={isMobile ? undefined : 'hidden'}
        animate={isMobile ? undefined : hasEntered ? 'visible' : 'hidden'}
        variants={
          isMobile
            ? undefined
            : {
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08, delayChildren: 0.05 }
              },
            }
        }
      >
        {journalExperiences.map((exp, index) => (
          <JournalEntry key={exp.slug} exp={exp} index={index} isMobile={isMobile} />
        ))}
      </motion.div>
    </section>
  )
}

const JournalEntry = ({
  exp,
  index,
  isMobile,
}: {
  exp: JournalExperience
  index: number
  isMobile: boolean
}) => {
  const dateParts = exp.date.split(' - ')

  return (
    <Link
      href={`/journal/${exp.slug}`}
      className={styles.rowLink}
      data-cursor-text={`${exp.title} // ${exp.company}`}
    >
      <motion.article
        className={`${styles.row} ${styles.image_container_link}`}
        variants={
          isMobile
            ? undefined
            : {
              hidden: { opacity: 0, y: 22 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.02 },
              },
            }
        }
        initial={isMobile ? { opacity: 1, y: 0 } : undefined}
        animate={isMobile ? { opacity: 1, y: 0 } : undefined}
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <div className={styles.year} aria-label={exp.date}>
          {dateParts.length > 1 ? (
            <>
              <span style={{ display: 'block' }}>{dateParts[0]}</span>
              <span style={{ display: 'block' }}>{dateParts.slice(1).join(' - ')}</span>
            </>
          ) : (
            exp.date
          )}
        </div>

        <div className={styles.company}>
          <h3 className={styles.companyName}>{exp.company}</h3>
          <div className={styles.role}>{exp.title}</div>
        </div>

        <p className={styles.description}>{exp.description}</p>

        <div className={styles.arrow} aria-hidden="true">
          <ArrowRight size={22} />
        </div>
      </motion.article>
    </Link>
  )
}

export default Experiencie