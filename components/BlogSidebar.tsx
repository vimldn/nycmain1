import Link from 'next/link'
import { getRecentPosts, BlogPostMeta } from '@/lib/blog-utils'

export default function BlogSidebar({ currentSlug }: { currentSlug?: string }) {
  const recent = getRecentPosts(5).filter((p) => p.slug !== currentSlug)

  return (
    <aside className="space-y-4">
      <div className="card p-5">
        <h3 style={{ fontFamily:'"Bebas Neue", sans-serif', fontSize:'18px', letterSpacing:'.06em', marginBottom:'12px' }}>Recent Articles</h3>
        <div className="space-y-3">
          {recent.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="block group"
            >
              <div className="text-sm font-semibold leading-snug group-hover:underline">{p.title}</div>
              <div className="text-xs text-[#666] mt-1 line-clamp-2">{p.excerpt}</div>
            </Link>
          ))}
        </div>
      </div>

      <div className="card p-5">
        <h3 style={{ fontFamily:'"Bebas Neue", sans-serif', fontSize:'18px', letterSpacing:'.06em', marginBottom:'8px' }}>Check a Building</h3>
        <p className="text-sm text-[#666] mb-3">
          Pull NYC open data for any address and see what’s changing over time.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center w-full px-4 py-2 bg-[#0b8a7a] hover:bg-[#076d5f] transition text-white font-semibold"
        >
          Search an address
        </Link>
      </div>
    </aside>
  )
}
