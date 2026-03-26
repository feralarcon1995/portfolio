"use client"

import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { Layout } from "@/layouts/Layout"
import { projectData } from "@/data/projectsData"
import { buildProjectDetailViewModel } from "@/lib/projectDetailViewModel"
import ProjectShowcasePage from "@/components/ProjectDetail/ProjectShowcasePage"

const LoadingState = dynamic(() => import("@/components/ProjectDetail/LoadingState"))
const NotFoundState = dynamic(() => import("@/components/ProjectDetail/NotFoundState"))
const Footer = dynamic(() => import("@/components/Footer/Footer"), { ssr: true })

export default function ProjectDetail() {
  const router = useRouter()
  const rawId = router.query.id
  const id = typeof rawId === "string" ? rawId : Array.isArray(rawId) ? rawId[0] : undefined

  if (!id) {
    return <LoadingState />
  }

  const project = projectData.find((p) => p.id === id)

  if (!project) {
    return <NotFoundState onBackClick={() => router.push("/")} />
  }

  const nextProject = projectData.find((p) => p.id === project.next)
  const vm = buildProjectDetailViewModel(project)

  return (
    <Layout title={project.title} description={project.summary} showCircularText={false}>
      <ProjectShowcasePage vm={vm} nextProject={nextProject} />
      <Footer />
    </Layout>
  )
}
