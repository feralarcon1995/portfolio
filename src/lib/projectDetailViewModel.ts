import { formatProjectTechLabel, type Project } from '@/data/projectsData'

export type GalleryAspect = 'tall' | 'wide' | 'square'

export type ProjectDetailGalleryItem = {
  src: string
  alt: string
  caption: string
  aspect: GalleryAspect
}

export type ProjectDetailFeatureItem = {
  icon: string
  title: string
  description: string
}

export type ProjectDetailViewModel = {
  kicker: string
  titleLine1: string
  titleLine2: string
  decoWord: string
  heroSummary: string
  yearDisplay: string
  overview: string
  tags: string[]
  meta: {
    year: string
    role: string
    duration: string
    client: string
  }
  gallery: ProjectDetailGalleryItem[]
  visualQuote: string
  solutionParagraphs: string[]
  solutionAccentPhrase?: string
  features: ProjectDetailFeatureItem[]
  liveUrl: string | null
  githubUrl: string | null
}

const DEFAULT_ASPECTS: GalleryAspect[] = ['tall', 'wide', 'square']
const DEFAULT_FEATURE_ICONS = [
  'bolt',
  'layers',
  'grid_view',
  'code',
  'palette',
  'speed',
  'database',
  'widgets',
] as const

function isUsableUrl(url: string | undefined): url is string {
  return Boolean(url && url !== 'empty')
}

function splitTitle(title: string): [string, string] {
  const t = title.trim()
  const space = t.indexOf(' ')
  if (space === -1) return [t.toUpperCase(), '']
  return [t.slice(0, space).toUpperCase(), t.slice(space + 1).toUpperCase()]
}

function decoFromTitle(title: string): string {
  const letters = title.replace(/[^a-zA-Z0-9]/g, '')
  const chunk = letters.slice(0, 3).toUpperCase()
  return chunk || 'PRJ'
}

export function buildProjectDetailViewModel(project: Project): ProjectDetailViewModel {
  const [d1, d2] = project.heroTitleLines ?? splitTitle(project.title)
  const titleLine1 = d1
  const titleLine2 = d2

  const kicker =
    project.heroKicker ??
    `${project.category.toUpperCase().replace(/\s+/g, '_')} // BUILD`

  const overview =
    project.overviewBody ??
    [project.description, project.text[0]].filter(Boolean).join('\n\n')

  const tags = [...project.secondary, ...project.technologies.map(formatProjectTechLabel)]
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 12)

  const gallery: ProjectDetailGalleryItem[] = project.images.map((img, i) => {
    const aspect =
      img.aspect ?? DEFAULT_ASPECTS[i % DEFAULT_ASPECTS.length]
    const caption =
      img.caption ??
      `Fig ${String(i + 1).padStart(2, '0')}. ${img.alt}`
    return {
      src: img.src,
      alt: img.alt,
      caption,
      aspect,
    }
  })

  const icons = project.featureIcons ?? []
  const features: ProjectDetailFeatureItem[] = project.features.map((f, i) => ({
    icon: icons[i] ?? DEFAULT_FEATURE_ICONS[i % DEFAULT_FEATURE_ICONS.length],
    title: f.title,
    description: f.description,
  }))

  const solutionParagraphs =
    project.solutionParagraphs?.length ? project.solutionParagraphs : project.text

  return {
    kicker,
    titleLine1,
    titleLine2,
    decoWord: project.heroDeco ?? decoFromTitle(project.title),
    heroSummary: project.summary,
    yearDisplay: project.year,
    overview,
    tags,
    meta: {
      year: project.year,
      role: project.role,
      duration: project.duration,
      client: project.client ?? 'Portfolio',
    },
    gallery,
    visualQuote:
      project.visualQuote ??
      project.highlights[0] ??
      project.summary,
    solutionParagraphs,
    solutionAccentPhrase: project.solutionAccentPhrase,
    features,
    liveUrl: isUsableUrl(project.live) ? project.live : null,
    githubUrl: isUsableUrl(project.github) ? project.github : null,
  }
}
