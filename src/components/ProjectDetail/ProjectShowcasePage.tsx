'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Space_Grotesk, Manrope } from 'next/font/google'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { Project } from '@/data/projectsData'
import type { ProjectDetailViewModel } from '@/lib/projectDetailViewModel'
import styles from './projectShowcase.module.scss'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-pd-headline',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-pd-body',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const easeOut = [0.16, 1, 0.3, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 44 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: easeOut },
  },
}

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.05 },
  },
}

const staggerSlow = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.08 },
  },
}

const closureSection = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.16, delayChildren: 0.06 },
  },
}

const closureLeft = {
  hidden: { opacity: 0, x: -52, filter: 'blur(12px)' },
  show: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.88, ease: easeOut },
  },
}

const closureRight = {
  hidden: { opacity: 0, x: 52, filter: 'blur(12px)' },
  show: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.88, ease: easeOut },
  },
}

function renderLeadWithAccent(text: string, phrase?: string) {
  if (!phrase || !text.includes(phrase)) {
    return text
  }
  const parts = text.split(phrase)
  return (
    <>
      {parts[0]}
      <span className={styles.accentPhrase}>{phrase}</span>
      {parts.slice(1).join(phrase)}
    </>
  )
}

type Props = {
  vm: ProjectDetailViewModel
  nextProject: Project | undefined
}

export default function ProjectShowcasePage({ vm, nextProject }: Props) {
  const g = vm.gallery
  const img0 = g[0]
  const img1 = g[1]
  const img2 = g[2]
  const solutionRest = vm.solutionParagraphs.slice(1)
  const hasSolutionBody = solutionRest.length > 0

  const { scrollYProgress } = useScroll()
  const decoY = useTransform(scrollYProgress, [0, 0.22], [0, 100])

  const imgFilterClass = (idx: number) => {
    if (idx === 0) return `${styles.figureImg} ${styles.figureImgContrast}`
    if (idx === 2) return `${styles.figureImg} ${styles.figureImgContrastHigh}`
    return styles.figureImg
  }

  const quoteBlock = (
    <div className={styles.quoteBlock}>
      <h3 className={styles.quoteTitle}>THE_VISUAL_LANGUAGE</h3>
      <p className={styles.quoteText}>&ldquo;{vm.visualQuote}&rdquo;</p>
    </div>
  )

  const renderGallery = () => {
    if (g.length === 0) {
      return <div className={styles.galleryGridSingle}>{quoteBlock}</div>
    }

    return (
      <motion.div
        className={styles.galleryBento}
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
      >
        {img0 ? (
          <motion.figure
            variants={fadeUp}
            className={`${styles.figure} ${styles.bentoHero}`}
          >
            <div className={styles.figureImgWrap}>
              <Image
                src={img0.src}
                alt={img0.alt}
                fill
                className={imgFilterClass(0)}
                sizes="100vw"
              />
            </div>
            <figcaption className={styles.figureCaption}>{img0.caption}</figcaption>
          </motion.figure>
        ) : null}

        {g.length >= 2 ? (
          <>
            <motion.div variants={fadeUp} className={styles.bentoQuote}>
              {quoteBlock}
            </motion.div>
            {img1 ? (
              <motion.figure
                variants={fadeUp}
                className={`${styles.figure} ${styles.bentoMid}`}
              >
                <div className={styles.figureImgWrap}>
                  <Image
                    src={img1.src}
                    alt={img1.alt}
                    fill
                    className={imgFilterClass(1)}
                    sizes="(max-width: 899px) 100vw, 58vw"
                  />
                </div>
                <figcaption className={styles.figureCaption}>{img1.caption}</figcaption>
              </motion.figure>
            ) : null}
          </>
        ) : (
          <motion.div variants={fadeUp} className={styles.bentoQuoteFull}>
            {quoteBlock}
          </motion.div>
        )}

        {g.length >= 3 && img2 ? (
          <motion.figure
            variants={fadeUp}
            className={`${styles.figure} ${styles.bentoTail}`}
          >
            <div className={styles.figureImgWrap}>
              <Image
                src={img2.src}
                alt={img2.alt}
                fill
                className={imgFilterClass(2)}
                sizes="(max-width: 899px) 100vw, 70vw"
              />
            </div>
            <figcaption className={styles.figureCaption}>{img2.caption}</figcaption>
          </motion.figure>
        ) : null}
      </motion.div>
    )
  }

  return (
    <div className={`${spaceGrotesk.variable} ${manrope.variable} ${styles.root}`}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <motion.div
            className={styles.heroInner}
            initial="hidden"
            animate="show"
            variants={stagger}
          >
            <motion.p className={styles.kicker} variants={fadeUp}>
              {vm.kicker}
            </motion.p>
            <motion.h1 className={styles.title} variants={fadeUp}>
              {vm.titleLine1}
              {vm.titleLine2 ? (
                <>
                  <br />
                  {vm.titleLine2}
                </>
              ) : null}
            </motion.h1>
            <motion.div className={styles.heroRow} variants={fadeUp}>
              <p className={styles.heroSummary}>{vm.heroSummary}</p>
              <div className={styles.heroAside}>
                <span className={styles.yearGhost}>{vm.yearDisplay}</span>
                <div className={styles.scrollHint}>
                  <span className={styles.scrollLabel}>SCROLL_TO_EXPLORE</span>
                  <span className={`material-symbols-outlined ${styles.scrollIcon}`} aria-hidden>
                    arrow_downward
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            className={styles.decoWord}
            style={{ y: decoY }}
            aria-hidden
          >
            {vm.decoWord}
          </motion.div>
        </section>

        <motion.section
          className={styles.overview}
          aria-labelledby="overview-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.75, ease: easeOut }}
        >
          <div className={styles.overviewGrid}>
            <div>
              <h2 id="overview-heading" className={styles.sectionTitle}>
                PROJECT OVERVIEW
              </h2>
              <p className={styles.overviewText}>{vm.overview}</p>
              <div className={styles.tags}>
                {vm.tags.map((t) => (
                  <span key={t} className={styles.tag}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.metaGrid}>
              <div className={styles.metaCell}>
                <p className={styles.metaLabel}>Year</p>
                <p className={styles.metaValue}>{vm.meta.year}</p>
              </div>
              <div className={styles.metaCell}>
                <p className={styles.metaLabel}>Role</p>
                <p className={styles.metaValue}>{vm.meta.role}</p>
              </div>
              <div className={styles.metaCell}>
                <p className={styles.metaLabel}>Duration</p>
                <p className={styles.metaValue}>{vm.meta.duration}</p>
              </div>
              <div className={styles.metaCell}>
                <p className={styles.metaLabel}>Client</p>
                <p className={styles.metaValue}>{vm.meta.client}</p>
              </div>
            </div>
          </div>
        </motion.section>

        <section className={styles.gallery} aria-label="Project gallery">
          {renderGallery()}
        </section>

        <motion.section
          className={styles.narrative}
          aria-labelledby="solution-heading"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <div className={styles.narrativeGlow} aria-hidden />
          <div className={styles.narrativeInner}>
            <div className={styles.narrativeRule} aria-hidden />
            <h2 id="solution-heading" className={styles.narrativeTitle}>
              THE_SOLUTION
            </h2>
            <div className={styles.narrativeStack}>
              {vm.solutionParagraphs[0] ? (
                <p className={styles.narrativeLead}>
                  {renderLeadWithAccent(vm.solutionParagraphs[0], vm.solutionAccentPhrase)}
                </p>
              ) : null}
              {hasSolutionBody ? (
                <div className={styles.narrativeBodyWrap}>
                  {solutionRest.map((para, i) => (
                    <p
                      key={i}
                      className={i === 0 ? styles.narrativeBodyLead : styles.narrativeBodyMuted}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </motion.section>

        <section className={styles.features} aria-labelledby="features-heading">
          <motion.h2
            id="features-heading"
            className={styles.featuresLabel}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.9 }}
            transition={{ duration: 0.65, ease: easeOut }}
          >
            KEY FEATURES
          </motion.h2>
          <motion.div
            className={styles.featuresGrid}
            variants={staggerSlow}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
          >
            {vm.features.map((f) => (
              <motion.div key={f.title} className={styles.featureCard} variants={fadeUp}>
                <span className={`material-symbols-outlined ${styles.featureIcon}`} aria-hidden>
                  {f.icon}
                </span>
                <h4 className={styles.featureTitle}>{f.title}</h4>
                <p className={styles.featureDesc}>{f.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {(vm.liveUrl || vm.githubUrl) && (
          <motion.section
            className={styles.linksSection}
            aria-label="Project links"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            <div className={styles.linksRow}>
              {vm.liveUrl ? (
                <a
                  href={vm.liveUrl}
                  className={styles.linkPrimary}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LIVE_DEMO
                  <span className="material-symbols-outlined">open_in_new</span>
                </a>
              ) : null}
              {vm.githubUrl ? (
                <a
                  href={vm.githubUrl}
                  className={styles.linkSecondary}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  VIEW_ON_GITHUB
                  <span className="material-symbols-outlined">terminal</span>
                </a>
              ) : null}
            </div>
          </motion.section>
        )}

        <motion.section
          className={styles.closure}
          variants={closureSection}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div className={styles.closureInner}>
            <motion.div className={styles.closureCol} variants={closureLeft}>
              <Link href="/#projects" className={styles.closureBack}>
                <p className={styles.closureEyebrow}>BACK_TO_INDEX</p>
                <span className={styles.closureBackTitle}>RETURN HOME</span>
              </Link>
            </motion.div>
            <motion.div className={styles.closureCol} variants={closureRight}>
              {nextProject ? (
                <Link href={`/projects/${nextProject.id}`} className={styles.closureNext}>
                  <p className={`${styles.closureEyebrow} ${styles.closureEyebrowAccent}`}>
                    NEXT_PROJECT
                  </p>
                  <span className={styles.closureNextRow}>
                    <h3 className={styles.closureNextTitle}>
                      {nextProject.title.toUpperCase()}
                    </h3>
                    <span className={styles.closureNextArrow} aria-hidden>
                      →
                    </span>
                  </span>
                  <span className={styles.closureNextLine} aria-hidden />
                </Link>
              ) : (
                <Link href="/#projects" className={styles.closureNext}>
                  <p className={`${styles.closureEyebrow} ${styles.closureEyebrowAccent}`}>
                    NEXT_PROJECT
                  </p>
                  <span className={styles.closureNextRow}>
                    <h3 className={styles.closureNextTitle}>ALL WORK</h3>
                    <span className={styles.closureNextArrow} aria-hidden>
                      →
                    </span>
                  </span>
                  <span className={styles.closureNextLine} aria-hidden />
                </Link>
              )}
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}
