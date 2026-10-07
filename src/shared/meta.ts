import { site } from '../content/site'
import type { Section } from '../content/types'

export function pageTitle(section: Section | null): string {
  if (!section) return `Not found | ${site.name}`
  if (section.id === 'home') return `${site.name} | Full-stack engineer`
  return `${section.title} | ${site.name}`
}

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/** Head tags for the prerendered HTML of one route. */
export function headTags(section: Section | null): string {
  const title = escape(pageTitle(section))
  const description = escape(section?.description ?? 'This page could not be found.')
  const url = `${site.url}${section && section.path !== '/' ? section.path : '/'}`
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    section ? `<link rel="canonical" href="${url}" />` : `<meta name="robots" content="noindex" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escape(site.name)}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${site.url}/og.png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ].join('\n    ')
}
