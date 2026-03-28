import type { MetadataRoute } from 'next'
import { locationsData } from '@/lib/locations-data'
import { services } from '@/lib/services-data'
import { GUIDES } from '@/lib/guides-data'
import { allRawPosts } from '@/content/blog'

const BASE_URL = 'https://www.buildinghealthx.com'

const today = new Date().toISOString().split('T')[0]

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Static pages ──────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`,                priority: 1.0,  changeFrequency: 'daily'   },
    { url: `${BASE_URL}/locations`,       priority: 0.9,  changeFrequency: 'weekly'  },
    { url: `${BASE_URL}/services`,        priority: 0.9,  changeFrequency: 'weekly'  },
    { url: `${BASE_URL}/blog`,            priority: 0.8,  changeFrequency: 'daily'   },
    { url: `${BASE_URL}/blog/tags`,       priority: 0.6,  changeFrequency: 'weekly'  },
    { url: `${BASE_URL}/guides`,          priority: 0.8,  changeFrequency: 'weekly'  },
    { url: `${BASE_URL}/news`,            priority: 0.7,  changeFrequency: 'daily'   },
    { url: `${BASE_URL}/data-sources`,    priority: 0.5,  changeFrequency: 'monthly' },
    { url: `${BASE_URL}/press`,           priority: 0.5,  changeFrequency: 'monthly' },
    { url: `${BASE_URL}/privacy-policy`,  priority: 0.3,  changeFrequency: 'yearly'  },
    { url: `${BASE_URL}/terms-of-service`,priority: 0.3,  changeFrequency: 'yearly'  },
  ].map(page => ({ ...page, lastModified: today }))

  // ── Location pages (/locations/[location]) ────────────────────────────────
  const locationSlugs = Object.keys(locationsData)

  const locationPages: MetadataRoute.Sitemap = locationSlugs.map(slug => ({
    url: `${BASE_URL}/locations/${slug}`,
    lastModified: today,
    changeFrequency: 'monthly',
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
  const blogSlugs = [...new Set(allRawPosts.map(post => post.folder))]

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
