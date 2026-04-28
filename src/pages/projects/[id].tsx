import type { GetStaticPaths, GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import { Layout } from '@/layouts/Layout'
import { projectData, type Project } from '@/data/projectsData'
import { buildProjectDetailViewModel } from '@/lib/projectDetailViewModel'
import ProjectShowcasePage from '@/components/ProjectDetail/ProjectShowcasePage'
import { getSiteUrl } from '@/lib/siteUrl'

const Footer = dynamic(() => import('@/components/Footer/Footer'), { ssr: true })

type PageProps = {
  project: Project
}

export default function ProjectDetail({ project }: PageProps) {
  const nextProject = projectData.find((p) => p.id === project.next)
  const vm = buildProjectDetailViewModel(project)
  const siteUrl = getSiteUrl()
  const imagePath = project.heroImage || project.images[0]?.src || '/hero.png'

  return (
    <Layout
      title={project.title}
      description={project.summary}
      image={`${siteUrl}${imagePath}`}
      type="article"
      showCircularText={false}
    >
      <ProjectShowcasePage vm={vm} nextProject={nextProject} />
      <Footer />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: projectData.map((project) => ({ params: { id: project.id } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  const id = ctx.params?.id
  if (typeof id !== 'string') return { notFound: true }

  const project = projectData.find((item) => item.id === id)
  if (!project) return { notFound: true }

  return {
    props: { project },
  }
}
