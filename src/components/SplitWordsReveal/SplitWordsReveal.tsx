'use client'

import React, { Fragment, useMemo } from 'react'
import { motion, type Variants } from 'framer-motion'
import styles from './SplitWordsReveal.module.scss'

const wordVariants: Variants = {
  hidden: {
    y: '118%',
    opacity: 0,
  },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.54,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export type SplitLine = {
  text: string
  className?: string
}

export type SplitSegment = {
  words: string[]
  className?: string
}

type SplitLinesProps = {
  lines: SplitLine[]
  className?: string
  stagger?: number
  delayChildren?: number
  once?: boolean
  rootBlock?: boolean
}

export function SplitLines({
  lines,
  className,
  stagger = 0.052,
  delayChildren = 0,
  once = true,
  rootBlock = false,
}: SplitLinesProps) {
  const container = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: stagger,
          delayChildren,
        },
      },
    }),
    [stagger, delayChildren],
  )

  return (
    <motion.span
      className={`${rootBlock ? styles.splitRootBlock : styles.splitRoot} ${className ?? ''}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.25, margin: '0px 0px -10% 0px' }}
      aria-hidden={false}
    >
      {lines.map((line, li) => {
        const words = line.text.split(/\s+/).filter(Boolean)
        return (
          <span key={li} className={`${styles.line} ${line.className ?? ''}`}>
            {words.map((word, wi) => (
              <Fragment key={`${li}-${wi}`}>
                <span className={styles.mask}>
                  <motion.span variants={wordVariants} className={styles.inner}>
                    {word}
                  </motion.span>
                </span>
                {wi < words.length - 1 ? <span className={styles.space}> </span> : null}
              </Fragment>
            ))}
          </span>
        )
      })}
    </motion.span>
  )
}

type SplitInlineProps = {
  segments: SplitSegment[]
  className?: string
  stagger?: number
  delayChildren?: number
  once?: boolean
}

export function SplitInline({
  segments,
  className,
  stagger = 0.052,
  delayChildren = 0,
  once = true,
}: SplitInlineProps) {
  const flat = useMemo(() => {
    const out: { word: string; className?: string }[] = []
    segments.forEach((seg) => {
      seg.words.forEach((w) => out.push({ word: w, className: seg.className }))
    })
    return out
  }, [segments])

  const container = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: stagger,
          delayChildren,
        },
      },
    }),
    [stagger, delayChildren],
  )

  return (
    <motion.span
      className={`${styles.splitRoot} ${className ?? ''}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.25, margin: '0px 0px -10% 0px' }}
    >
      {flat.map((item, i) => (
        <Fragment key={i}>
          <span className={styles.mask}>
            <motion.span variants={wordVariants} className={`${styles.inner} ${item.className ?? ''}`}>
              {item.word}
            </motion.span>
          </span>
          {i < flat.length - 1 ? <span className={styles.space}> </span> : null}
        </Fragment>
      ))}
    </motion.span>
  )
}

export { wordVariants }
