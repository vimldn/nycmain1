import type { MetadataRoute } from 'next'
import { locations } from '@/lib/locations-data'
import { services } from '@/lib/services-data'
import { GUIDES } from '@/lib/guides-data'
import { allRawPosts } from '@/content/blog'

const BASE_URL = 'https://www.buildinghealthx.com'

const today = new Date().toISOString().split('T')[0]

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Static pages ──────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`,                 lastModified: today, changeFrequency: 'daily'   as const, priority: 1.0 },
    { url: `${BASE_URL}/locations`,        lastModified: today, changeFrequency: 'weekly'  as const, priority: 0.9 },
    { url: `${BASE_URL}/services`,         lastModified: today, changeFrequency: 'weekly'  as const, priority: 0.9 },
    { url: `${BASE_URL}/blog`,             lastModified: today, changeFrequency: 'daily'   as const, priority: 0.8 },
    { url: `${BASE_URL}/blog/tags`,        lastModified: today, changeFrequency: 'weekly'  as const, priority: 0.6 },
    { url: `${BASE_URL}/guides`,           lastModified: today, changeFrequency: 'weekly'  as const, priority: 0.8 },
    { url: `${BASE_URL}/news`,             lastModified: today, changeFrequency: 'daily'   as const, priority: 0.7 },
    { url: `${BASE_URL}/data-sources`,     lastModified: today, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${BASE_URL}/press`,            lastModified: today, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${BASE_URL}/privacy-policy`,   lastModified: today, changeFrequency: 'yearly'  as const, priority: 0.3 },
    { url: `${BASE_URL}/terms-of-service`, lastModified: today, changeFrequency: 'yearly'  as const, priority: 0.3 },
  ]

  // ── Location pages (/locations/[location]) ────────────────────────────────
  const locationSlugs = Object.keys(locations)

  const locationPages: MetadataRoute.Sitemap = locationSlugs.map(slug => ({
    url: `${BASE_URL}/locations/${slug}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // ── Service pages (/services/[service]) ───────────────────────────────────
  const serviceSlugs = Object.keys(services)

  const servicePages: MetadataRoute.Sitemap = serviceSlugs.flatMap(slug => [
    {
      url: `${BASE_URL}/services/${slug}`,
      lastModified: today,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/${slug}/questions-to-ask`,
      lastModified: today,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ])

  // ── Service × Location pages (/services/[service]/[location]) ────────────
  const serviceLocationPages: MetadataRoute.Sitemap = serviceSlugs.flatMap(service =>
    locationSlugs.map(location => ({
      url: `${BASE_URL}/services/${service}/${location}`,
      lastModified: today,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  // ── Blog posts (/blog/[slug]) ─────────────────────────────────────────────
  const blogSlugs = Array.from(new Set(allRawPosts.map(post => post.folder)))

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map(slug => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // ── Guide pages (/guides/[slug]) ──────────────────────────────────────────
  const guidePages: MetadataRoute.Sitemap = GUIDES.map(guide => ({
    url: `${BASE_URL}/guides/${guide.slug}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...locationPages,
    ...servicePages,
    ...serviceLocationPages,
    ...blogPages,
    ...guidePages,
  ]
}
