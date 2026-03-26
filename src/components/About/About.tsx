import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useSpring, useTransform } from 'framer-motion'
import { useLenisScroll } from '@/hooks/useLenisScroll'
import { SplitInline } from '@/components/SplitWordsReveal/SplitWordsReveal'
import styles from './about.module.scss'

const About = React.memo(() => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { elementProgressMotion } = useLenisScroll(sectionRef as unknown as React.RefObject<HTMLElement>)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 768
  })

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  // Ajuste del timing: tu "centro visual" ocurre antes de 0.5 en algunos layouts,
  // así que evitamos que el título/info se desarmen demasiado pronto.
  // Evita que el headline invada la capa del "outline" cuando la sección está centrada.
  const titleY = useTransform(elementProgressMotion, [0, 0.6, 1], [0, -72, -110])
  const titleOpacity = useTransform(elementProgressMotion, [0, 0.65, 1], [1, 1, 0])

  const contentX = useTransform(elementProgressMotion, [0, 0.8, 1], [0, 120, 220])
  const contentOpacity = useTransform(elementProgressMotion, [0, 0.65, 1], [1, 1, 0.08])

  const imageX = useTransform(elementProgressMotion, [0, 1], [0, 140])
  const imageScale = useTransform(elementProgressMotion, [0, 1], [1, 0.92])

  const outline1Y = useTransform(elementProgressMotion, [0, 1], [0, -35])
  const outline2Y = useTransform(elementProgressMotion, [0, 1], [0, -95])

  const smoothTitleY = useSpring(titleY, { stiffness: 80, damping: 25 })
  const smoothTitleOpacity = useSpring(titleOpacity, { stiffness: 100, damping: 30 })
  const smoothContentX = useSpring(contentX, { stiffness: 60, damping: 20 })
  const smoothContentOpacity = useSpring(contentOpacity, { stiffness: 70, damping: 25 })
  const smoothImageX = useSpring(imageX, { stiffness: 50, damping: 18 })
  const smoothImageScale = useSpring(imageScale, { stiffness: 60, damping: 22 })

  return (
    <section ref={sectionRef} className={styles.container} id="about">
      <div className={styles.bgLines} aria-hidden="true">
        <motion.div
          className={styles.outline1}
          style={{
            opacity: 0.09,
            y: isMobile ? 0 : outline1Y,
          }}
        >
          BUENOS AIRES // 1995
        </motion.div>
        <motion.div
          className={styles.outline2}
          style={{
            opacity: 0.06,
            y: isMobile ? 0 : outline2Y,
          }}
        >
          CREATIVE_SYSTEMS
        </motion.div>
      </div>

      <div className={styles.grid}>
        <motion.div
          className={styles.imageCard}
          style={{
            x: isMobile ? 0 : smoothImageX,
            scale: isMobile ? 1 : smoothImageScale,
          }}
        >
          <Image
            src="/images/me.png"
            alt="Fernando Alarcon"
            fill
            sizes="(max-width: 768px) 100vw, 42vw"
            className={styles.image}
            loading="lazy"
          />
          <div className={styles.imageBorder} aria-hidden="true" />
          <div className={styles.profileLabel} aria-hidden="true">
            DEV_PROFILE
          </div>
        </motion.div>

        <motion.div
          className={styles.manifesto}
          style={{ x: isMobile ? 0 : smoothContentX, opacity: isMobile ? 1 : smoothContentOpacity }}
        >
          <div className={styles.kicker}>
            <span className={styles.kickerLine} />
            <span className={styles.kickerText}>IDENTITY_MANIFESTO</span>
          </div>

          <motion.h2
            style={{
              y: isMobile ? 0 : smoothTitleY,
              opacity: isMobile ? 1 : smoothTitleOpacity,
            }}
            className={styles.headline}
          >
            <SplitInline
              segments={[
                { words: ['Born', 'in'] },
                { words: ['Buenos', 'Aires'], className: styles.italic },
                { words: [', 1995.'] },
              ]}
              delayChildren={0.06}
            />
          </motion.h2>

          <p className={styles.lead}>
            My name&apos;s Fernando Alarcon, and I&apos;m all about giving my best in everything I do. I believe that
            in today&apos;s digital world, there&apos;s always a need for more solutions to make the customer experience
            even better. That&apos;s where I come in.
          </p>

          <p className={styles.lead}>
            I&apos;m passionate about contributing everything I know in my field to meet those demands and help push
            things forward.
          </p>

          <div className={styles.blocks}>
            <div className={styles.block}>
              <div className={styles.blockTitleRow}>
                <span className={styles.dot} />
                <span className={styles.blockTitle}>Core Tech Stack</span>
              </div>
              <div className={styles.blockValue}>React, Next.js, TypeScript</div>
              <div className={styles.blockValue}>Framer Motion, GSAP, Lenis</div>
              <div className={styles.blockValue}>Tailwind, Bootstrap, SCSS</div>
              <div className={styles.blockValue}>HTML, CSS, JavaScript</div>
              <div className={styles.blockValue}>Figma, Photoshop, Illustrator</div>

            </div>
            <div className={styles.block}>
              <div className={styles.blockTitleRow}>
                <span className={styles.dot} />
                <span className={styles.blockTitle}>Primary Focus</span>
              </div>
              <div className={styles.blockValue}>Interactive systems &amp; Pixel Perfect UI</div>
              <div className={styles.blockValue}>Responsive UI &amp; Crafting</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
})

About.displayName = 'About'

export default About
