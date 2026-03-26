import type { GetStaticPaths, GetStaticProps } from 'next'
import { Layout } from '@/layouts/Layout'
import {
  journalExperiences,
  getJournalBySlug,
  type JournalExperience,
} from '@/data/journalExperiences'
import JournalArticle from '@/components/Journal/JournalArticle'

type PageProps = {
  entry: JournalExperience
}

export default function JournalEntryPage({ entry }: PageProps) {
  return (
    <Layout title={`${entry.company} · Journal`} showCircularText={false}>
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
