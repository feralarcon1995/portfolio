export const defaultSiteUrl = 'https://www.feralarcon.com.ar'

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl
  return raw.replace(/\/$/, '')
}
