import Link from 'next/link'
import { ChevronRight, Wrench, MapPin } from 'lucide-react'
import {
  getServicesForTags,
  detectLocationFromPost,
  getNearbyLocations,
  SERVICE_NAMES,
} from '@/lib/tag-service-map'
import { locations } from '@/lib/locations-data'

type Props = {
  tags: string[]
  postSlug: string
  postTitle?: string
}

export default function BlogServiceLinks({ tags, postSlug, postTitle }: Props) {
  const serviceSlugList = getServicesForTags(tags)
  const detectedLocation = detectLocationFromPost(postSlug, postTitle)
  const locationData = detectedLocation ? locations[detectedLocation] : null
  const nearbyLocations = detectedLocation ? getNearbyLocations(detectedLocation) : []

  if (serviceSlugList.length === 0) return null

  return (
    <div className="mt-10 space-y-6 border-t border-[var(--border-primary)] pt-8">

      {/* Services that can help */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Wrench className="w-4 h-4 text-blue-400" />
          <h3 className="font-bold text-base">Services that can help</h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {serviceSlugList.map((slug) => {
            const href = detectedLocation
              ? `/services/${slug}/${detectedLocation}`
              : `/services/${slug}`
            const label = detectedLocation && locationData
              ? `${SERVICE_NAMES[slug]} in ${locationData.name}`
              : `${SERVICE_NAMES[slug]} in NYC`

            return (
              <Link
                key={slug}
                href={href}
                className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] hover:border-blue-500/40 hover:bg-blue-500/5 transition group"
              >
                <span className="text-sm font-medium group-hover:text-blue-400 transition">
                  {label}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition flex-shrink-0" />
              </Link>
            )
          })}
        </div>
      </div>

      {/* Nearby neighbourhoods — only shown for location-specific posts */}
      {detectedLocation && nearbyLocations.length > 0 && locationData && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-base">
              Other services near {locationData.name}
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {nearbyLocations.map(({ slug, name }) => (
              <Link
                key={slug}
                href={`/locations/${slug}`}
                className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] hover:border-cyan-500/40 hover:bg-cyan-500/5 transition group"
              >
                <span className="text-sm font-medium group-hover:text-cyan-400 transition">
                  Renter services in {name}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition flex-shrink-0" />
              </Link>
            ))}

            {/* Link to the detected location page itself */}
            <Link
              href={`/locations/${detectedLocation}`}
              className="flex items-center justify-between p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/15 transition group sm:col-span-2"
            >
              <span className="text-sm font-semibold text-cyan-400">
                View all services in {locationData.name} →
              </span>
              <ChevronRight className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
