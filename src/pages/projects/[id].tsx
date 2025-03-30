"use client"

import { useRouter } from "next/router"
import { useRef, Suspense, useEffect } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import dynamic from "next/dynamic"
import styles from "./projectdetail.module.scss"
import { Layout } from "@/layouts/Layout"
import { projectData } from "@/data/projectsData"

const HeroSection = dynamic(() => import("@/components/ProjectDetail/HeroSection"), { ssr: false })
const ProjectSummary = dynamic(() => import("@/components/ProjectDetail/ProjectSummary"), { ssr: false })
const ProjectDescription = dynamic(() => import("@/components/ProjectDetail/ProjectDescription"), { ssr: false })
const TechnologiesSection = dynamic(() => import("@/components/ProjectDetail/TechnologiesSection"), { ssr: false })
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
  const containerRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    if (router.asPath.includes("#projects")) {
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [router.asPath]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

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
      <section ref={containerRef} className={styles.projectDetailContainer}>
        <Suspense fallback={<LoadingState />}>
          <HeroSection project={project} scrollProgress={springScrollY} />

          <article className={styles.projectContent}>
            <ProjectSummary project={project} />

            <ProjectImages
              images={[
                { src: project.firstImg, alt: `${project.title} - Main view` },
                { src: project.secondImg, alt: `${project.title} - Secondary view` },
              ]}
              projectId={id as string}
            />

            <ProjectDescription project={project} textReveal={springScrollY} />

            <TechnologiesSection project={project} />

            <FeaturesSection project={project} />

            {(project.challenges || project.highlights) && (
              <ChallengesHighlights
                challenges={project.challenges}
                highlights={project.highlights}
                primaryColor={project.colors.primary}
              />
            )}

            <ProjectLinks project={project} />

            {nextProject && <NextProject nextProject={nextProject} primaryColor={project.colors.primary} />}

            <motion.div
              className={styles.backToProjects}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={() => router.push("/#projects")}
                className={styles.backButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ← Back to All Projects
              </motion.button>
            </motion.div>
          </article>
        </Suspense>
      </section>
    </Layout>
  )
}
