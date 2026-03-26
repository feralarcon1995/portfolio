'use client'

import { useEffect, useLayoutEffect, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Footer from '@/components/Footer/Footer'
import { useSmoothScroll } from '@/components/SmoothScroll/SmoothScrollProvider'
import {
  JOURNAL_STACK_CARD_LABELS,
  type JournalExperience,
} from '@/data/journalExperiences'
import styles from '@/pages/journal/journalEntry.module.scss'

const ease = [0.22, 1, 0.36, 1] as const

const viewport = {
  once: true,
  amount: 0.18,
  margin: '0px 0px -72px 0px',
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease },
  },
}

const fadeUpSlow = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.06 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
}

const stackCellReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
}

export default function JournalArticle({ entry }: { entry: JournalExperience }) {
  const { lenis } = useSmoothScroll()
  const prefersReducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 768
  })

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const forceVisible = prefersReducedMotion || isMobile
  const initialVariant = forceVisible ? 'visible' : 'hidden'

  useLayoutEffect(() => {
    const goTop = () => {
      if (typeof window === 'undefined') return
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
        ; (document.body as HTMLElement).scrollTop = 0
      lenis?.scrollTo(0, { immediate: true })
    }
    goTop()
    const id = requestAnimationFrame(goTop)
    const id2 = window.setTimeout(goTop, 0)
    return () => {
      cancelAnimationFrame(id)
      window.clearTimeout(id2)
    }
  }, [lenis, entry.slug])

  const period = entry.date.toUpperCase()
  const techLine = entry.stack.map((s) => s.name).join(' // ')
  const station = entry.date.toLowerCase().includes('current')
    ? 'CURRENT_STATION'
    : 'ARCHIVED_RUN'

  return (
    <>
      <article className={styles.root}>
        <motion.div
          initial={initialVariant}
          animate={forceVisible ? 'visible' : undefined}
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
        >
          <Link href="/#experiencie" className={styles.back} scroll={false}>
            <ArrowLeft size={14} strokeWidth={2} aria-hidden />
            BACK_TO_JOURNAL
          </Link>
        </motion.div>

        <motion.header
          className={styles.hero}
          initial={initialVariant}
          animate={forceVisible ? 'visible' : undefined}
          whileInView="visible"
          viewport={viewport}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } },
          }}
        >
          <motion.div className={styles.entryTag} variants={staggerItem}>
            <div className={styles.entryTagInner}>
              {`■ ENTRY_${entry.entryCode} // ${station}`}
            </div>
          </motion.div>

          <motion.div
            className={styles.headGrid}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.02 } },
            }}
          >
            <motion.div className={styles.titleBlock} variants={staggerItem}>
              <h1 className={styles.company}>
                {entry.company.toUpperCase()}
                <span className={styles.companySuffix}>{' //'}</span>
              </h1>
              <p className={styles.role}>{entry.title}</p>
              {entry.link_company && (
                <a
                  className={styles.companyLink}
                  href={entry.link_company}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OPEN_ORG_NODE →
                </a>
              )}
            </motion.div>

            <motion.div className={styles.meta} variants={staggerItem}>
              <div className={styles.metaBlock}>
                <span className={styles.metaLabel}>PERIOD</span>
                <span className={styles.metaValue}>{period}</span>
              </div>
              <div className={styles.metaBlock}>
                <span className={styles.metaLabel}>LOCATION</span>
                <span className={styles.metaValue}>{entry.location}</span>
              </div>
              <div className={styles.metaBlock}>
                <span className={styles.metaLabel}>TECHNOLOGY</span>
                <span className={styles.metaValueAccent}>{techLine}</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.header>

        <div className={styles.grid2}>
          <motion.div
            className={styles.copyCol}
            initial={initialVariant}
            animate={forceVisible ? 'visible' : undefined}
            whileInView="visible"
            viewport={viewport}
            variants={staggerContainer}
          >
            {entry.bodyParagraphs.map((para, i) => (
              <motion.div key={i} className={styles.copyBlock} variants={staggerItem}>
                <span className={styles.copyIndex}>{String(i + 1).padStart(2, '0')}</span>
                <p className={styles.copyText}>{para}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className={styles.visualCol}
            initial={initialVariant}
            animate={forceVisible ? 'visible' : undefined}
            whileInView="visible"
            viewport={viewport}
            variants={fadeUpSlow}
          >
            <div className={styles.visualFrame}>
              <Image
                src={entry.image}
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 480px"
                className={styles.visualImg}
                priority
              />
            </div>
            <div className={styles.visualCaption}>VISUAL_PROBE_{entry.entryCode}</div>
          </motion.div>
        </div>

        <motion.section
          className={styles.stackSection}
          aria-labelledby="stack-heading"
          initial={initialVariant}
          animate={forceVisible ? 'visible' : undefined}
          whileInView="visible"
          viewport={viewport}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
          }}
        >
          <motion.div className={styles.stackHead} variants={staggerItem}>
            <h2 id="stack-heading" className={styles.stackTitle}>
              STACK_COMPOSITION
            </h2>
            <span className={styles.stackCount}>
              {`${String(entry.stack.length).padStart(2, '0')} // NODES`}
            </span>
          </motion.div>
          <motion.div className={styles.stackRow} variants={staggerContainer}>
            {entry.stack.map((item, i) => {
              const label =
                i < JOURNAL_STACK_CARD_LABELS.length
                  ? JOURNAL_STACK_CARD_LABELS[i]
                  : `LAYER_${String(i + 1).padStart(2, '0')}`
              return (
                <motion.div key={item.id} className={styles.stackCell} variants={stackCellReveal}>
                  <div className={styles.stackLabel}>{label}</div>
                  <p className={styles.stackName}>{item.name}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.section>

        {entry.testimonials.length > 0 && (
          <motion.section
            className={
              entry.testimonials.length === 1
                ? `${styles.testimonials} ${styles.testimonialsSingle}`
                : styles.testimonials
            }
            aria-labelledby="testimonials-heading"
            initial={initialVariant}
            animate={forceVisible ? 'visible' : undefined}
            whileInView="visible"
            viewport={viewport}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
            }}
          >
            <motion.h2 id="testimonials-heading" className={styles.testimonialsTitle} variants={staggerItem}>
              SIGNALS_RECEIVED
            </motion.h2>
            {entry.testimonials.map((t) => (
              <motion.figure
                key={t.id}
                className={styles.testimonialCard}
                style={
                  {
                    ['--card-accent' as string]: t.color,
                  } as CSSProperties
                }
                variants={staggerItem}
              >
                <blockquote className={styles.testimonialQuote}>{t.quote}</blockquote>
                <figcaption className={styles.testimonialFooter}>
                  <span className={styles.testimonialAuthor}>{t.author}</span>
                  <span className={styles.testimonialRole}>{t.position}</span>
                  <a
                    className={styles.testimonialLink}
                    href={t.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LINKEDIN_PROFILE
                  </a>
                </figcaption>
              </motion.figure>
            ))}
          </motion.section>
        )}
      </article>
      <Footer />
    </>
  )
}
