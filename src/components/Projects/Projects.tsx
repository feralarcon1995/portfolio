import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './projects.module.scss'
import { projectData, Project } from '@/data/projectsData'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { SplitInline } from '@/components/SplitWordsReveal/SplitWordsReveal'

const Projects = React.memo(() => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowWidth, setWindowWidth] = useState<number>(0)
  const sectionRef = useRef<HTMLElement>(null)
  const lastUpdateTime = useRef(0)

  useEffect(() => {
    const updateWindowWidth = () => setWindowWidth(window.innerWidth)
    updateWindowWidth()

    let resizeTimer: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(updateWindowWidth, 120)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const now = performance.now()
      if (now - lastUpdateTime.current < 16) return
      lastUpdateTime.current = now

      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      }
    },
    [],
  )

  const cursorPosition = useMemo(() => {
    if (windowWidth <= 768) return { x: mousePosition.x + windowWidth * 0.9, y: mousePosition.y - windowWidth * 0.1 }
    if (windowWidth <= 1024) return { x: mousePosition.x + windowWidth * 0.7, y: mousePosition.y - windowWidth * 0.1 }
    return { x: mousePosition.x + 50, y: mousePosition.y - 50 }
  }, [mousePosition.x, mousePosition.y, windowWidth])

  const hoveredProjectData = useMemo(
    () => projectData.find((p) => p.id === hoveredProject),
    [hoveredProject],
  )

  const getTileVariant = (index: number) => {
    const variants = [
      { col: 'span 2', mt: 0, shape: 'rectHero', overlayBox: true, mediaHeight: 'hero', sideTitle: false, centerTitle: false },
      { col: 'span 1', mt: 18, shape: 'pill', overlayBox: false, mediaHeight: 'pill', sideTitle: false, centerTitle: false },
      { col: 'span 1', mt: -10, shape: 'hex', overlayBox: false, mediaHeight: 'square', sideTitle: false, centerTitle: false },
      { col: 'span 1', mt: 30, shape: 'rectStandard', overlayBox: false, mediaHeight: 'standard', sideTitle: false, centerTitle: false },
      { col: 'span 1', mt: -20, shape: 'oct', overlayBox: false, mediaHeight: 'square', sideTitle: false, centerTitle: false },
      { col: 'span 1', mt: 12, shape: 'rectVertical', overlayBox: false, mediaHeight: 'vertical', sideTitle: true, centerTitle: false },
      { col: 'span 2', mt: 26, shape: 'wide', overlayBox: true, mediaHeight: 'wide', sideTitle: true, centerTitle: true },
      { col: 'span 1', mt: 0, shape: 'rect', overlayBox: false, mediaHeight: 'squareSmall', sideTitle: false, centerTitle: false },
    ] as const

    return variants[index % variants.length]
  }

  const shapeClassByKey: Record<string, string> = {
    rectHero: styles.shapeRectHero,
    pill: styles.shapePill,
    hex: styles.shapeHex,
    rectStandard: styles.shapeRectStandard,
    oct: styles.shapeOct,
    rectVertical: styles.shapeRectVertical,
    wide: styles.shapeWide,
    rect: styles.shapeRect,
  }

  return (
    <section id="projects" className={styles.projects_container} ref={sectionRef} onMouseMove={handleMouseMove}>
      <div className={styles.projects_bgWords} aria-hidden="true">
        <span className={styles.bgLeft}>WORKS</span>
      </div>

      <div className={styles.header}>
        <div className={styles.kicker}>PROJECT_RESOURCES_V1.0</div>
        <h2 className={styles.selectedTitle}>
          <SplitInline
            segments={[
              { words: ['SELECTED_'] },
              { words: ['WORKS'], className: styles.selectedAccent },
            ]}
            delayChildren={0.07}
          />
        </h2>
        <div className={styles.subRow}>
          <span className={styles.subNote}>Scattered Layout Mode: ACTIVE</span>
          <span className={styles.subCount}>CNT: {projectData.length}_UNITS</span>
        </div>
      </div>

      <div className={styles.worksStage}>
        <div className={styles.worksGrid}>
          {projectData.map((project: Project, index: number) => {
            const v = getTileVariant(index)
            const num = String(index + 1).padStart(2, '0')
            const shapeClass = shapeClassByKey[v.shape] ?? styles.shapeRect

            return (
              <motion.div
                key={project.id}
                className={styles.workTileWrap}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: index * 0.03 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{
                  gridColumn: v.col,
                  marginTop: `${v.mt}px`,
                }}
              >
                <Link href={`/projects/${project.id}`} className={styles.workTileLink}>
                  <div className={`${styles.workMediaMask} ${shapeClass}`} data-title={project.title}>
                    <Image
                      src={project.images[0].src}
                      alt={project.images[0].alt || project.title}
                      fill
                      sizes="(max-width: 900px) 90vw, 520px"
                      className={styles.workImage}
                      priority={index === 0}
                    />
                    <div className={styles.workMediaOverlay} aria-hidden="true" />

                    {v.sideTitle && (
                      <div className={styles.sideTitle} aria-hidden="true">
                        {project.title}
                      </div>
                    )}

                    {v.centerTitle && (
                      <div className={styles.centerTitle} data-title={project.title} aria-hidden="true" />
                    )}

                    <div className={styles.tileNumber} aria-hidden="true">
                      {num}
                    </div>
                  </div>

                  {v.overlayBox && (
                    <div className={styles.overlayBox} aria-hidden="true">
                      <h3 className={styles.overlayTitle}>{project.title}</h3>
                      <p className={styles.overlaySubtitle}>{project.summary.toUpperCase()}</p>
                      <div className={styles.overlayMeta}>
                        <span className={styles.metaTag}>ROLE: {project.role.toUpperCase()}</span>
                        <span className={styles.metaTag}>YEAR: {project.year}</span>
                      </div>
                    </div>
                  )}

                  {!v.overlayBox && (
                    <div className={styles.caption}>
                      <h3 className={styles.captionTitle}>{project.title}</h3>
                      <p className={styles.captionSubtitle}>{project.summary.toUpperCase()}</p>
                    </div>
                  )}
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>

      {hoveredProjectData && (
        <motion.div
          className={styles.cursor_follower}
          animate={{
            x: cursorPosition.x - 320,
            y: cursorPosition.y - 170,
            opacity: 1,
            scale: 1,
          }}
          initial={{
            x: cursorPosition.x,
            y: cursorPosition.y,
            opacity: 0,
            scale: 0.5,
          }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          <Image
            src={hoveredProjectData.images[0].src}
            alt={hoveredProjectData.images[0].alt}
            fill
            sizes="260px"
            className={styles.cursorImage}
            priority
          />
        </motion.div>
      )}
    </section>
  )
})

Projects.displayName = 'Projects'

export default Projects