import type { GetServerSideProps } from 'next'
import { journalExperiences } from '@/data/journalExperiences'
import { projectData } from '@/data/projectsData'
import { getSiteUrl } from '@/lib/siteUrl'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const base = getSiteUrl()
  const lastmod = new Date().toISOString()
  const paths = [
    '',
    ...journalExperiences.map((e) => `/journal/${e.slug}`),
    ...projectData.map((p) => `/projects/${p.id}`),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map((path) => {
    const priority = path === '' ? '1.0' : path.startsWith('/projects') ? '0.8' : '0.7'
    return `  <url>
    <loc>${base}${path}</loc>
    <changefreq>monthly</changefreq>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`
  })
  .join('\n')}
</urlset>`

  res.setHeader('Content-Type', 'text/xml; charset=utf-8')
  res.write(xml)
  res.end()

  return { props: {} }
}

export default function SitemapXml() {
  return null
}
