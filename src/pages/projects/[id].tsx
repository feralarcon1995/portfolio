"use client"

import { useRouter } from "next/router"
import { Suspense } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import dynamic from "next/dynamic"
import styles from "./projectdetail.module.scss"
import { Layout } from "@/layouts/Layout"
import { projectData } from "@/data/projectsData"

const HeroSection = dynamic(() => import("@/components/ProjectDetail/HeroSection"), { ssr: false })
const ProjectSummary = dynamic(() => import("@/components/ProjectDetail/ProjectSummary"), { ssr: false })
const ProjectDescription = dynamic(() => import("@/components/ProjectDetail/ProjectDescription"), { ssr: false })
const FeaturesSection = dynamic(() => import("@/components/ProjectDetail/FeaturesSection"), { ssr: false })
const ChallengesHighlights = dynamic(() => import("@/components/ProjectDetail/ChallengesHighlights"), { ssr: false })
const ProjectLinks = dynamic(() => import("@/components/ProjectDetail/ProjectLinks"), { ssr: false })
const NextProject = dynamic(() => import("@/components/ProjectDetail/NextProject"), { ssr: false })
const ProjectImages = dynamic(() => import("@/components/ProjectDetail/ProjectImages"), { ssr: false })

const LoadingState = dynamic(() => import("@/components/ProjectDetail/LoadingState"))
const NotFoundState = dynamic(() => import("@/components/ProjectDetail/NotFoundState"))

export default function ProjectDetail() {
  const router = useRouter()
  const { id } = router.query

  const { scrollYProgress } = useScroll()
  const springScrollY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  if (!id) {
    return <LoadingState />
  }

  const project = projectData.find((p) => p.id === id)

  if (!project) {
    return <NotFoundState onBackClick={() => router.push("/")} />
  }

  const nextProject = projectData.find((p) => p.id === project.next)

  return (
    <Layout title={`${project.title} - Project Details`}>
      <motion.section
        className={styles.projectDetailContainer}
        style={{
          '--primary-color': project.colors.primary,
          '--secondary-color': project.colors.secondary,
          '--background-color': project.colors.background,
          '--text-color': project.colors.text,
        } as React.CSSProperties}
      >
        <Suspense fallback={<LoadingState />}>
          <HeroSection project={project} />

          <motion.article className={styles.projectContent}>
            <ProjectSummary project={project} />
            <ProjectImages project={project} />
            <ProjectDescription project={project} textReveal={springScrollY} />
            <FeaturesSection project={project} />

            {(project.challenges || project.highlights) && (
              <ChallengesHighlights
                challenges={project.challenges}
                highlights={project.highlights}
                primaryColor={project.colors.primary}
              />
            )}

            <ProjectLinks project={project} primaryColor={project.colors.primary} />
            {nextProject && <NextProject nextProject={nextProject} primaryColor={project.colors.primary} />}
          </motion.article>
        </Suspense>
      </motion.section>
    </Layout>
  )
}
