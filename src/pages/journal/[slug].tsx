import type { GetStaticPaths, GetStaticProps } from 'next'
import { Layout } from '@/layouts/Layout'
import {
  journalExperiences,
  getJournalBySlug,
  type JournalExperience,
} from '@/data/journalExperiences'
import JournalArticle from '@/components/Journal/JournalArticle'
import { getSiteUrl } from '@/lib/siteUrl'

type PageProps = {
  entry: JournalExperience
}

export default function JournalEntryPage({ entry }: PageProps) {
  const siteUrl = getSiteUrl()
  return (
    <Layout
      title={`${entry.company} · Journal`}
      description={entry.description}
      image={`${siteUrl}${entry.image}`}
      type="article"
      showCircularText={false}
    >
      <JournalArticle entry={entry} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: journalExperiences.map((e) => ({ params: { slug: e.slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  const slug = ctx.params?.slug
  if (typeof slug !== 'string') return { notFound: true }
  const entry = getJournalBySlug(slug)
  if (!entry) return { notFound: true }
  return { props: { entry } }
}
