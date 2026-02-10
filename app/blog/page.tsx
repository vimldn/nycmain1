'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'
import { getAllPosts } from '@/lib/blog-utils'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Search } from 'lucide-react'

export default function BlogIndexPage({ searchParams }: { searchParams?: { page?: string; tag?: string } }) {
  const [searchQuery, setSearchQuery] = useState('')
  const allPosts = getAllPosts()
  const activeTag = searchParams?.tag

  // Filter by search query and tag
  const filteredPosts = useMemo(() => {
    let posts = allPosts

    // Filter by tag if active
    if (activeTag) {
      posts = posts.filter((p) => (p.tags || []).includes(activeTag))
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      posts = posts.filter((p) =>
        p.title.toLowerCase().includes(query) ||
        p.excerpt.toLowerCase().includes(query)
      )
    }

    return posts
  }, [allPosts, activeTag, searchQuery])

  const pageSize = 12
  const pageNum = Math.max(1, Number.parseInt(searchParams?.page || '1', 10) || 1)
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize))
  const page = Math.min(pageNum, totalPages)
  const start = (page - 1) * pageSize
  const shown = filteredPosts.slice(start, start + pageSize)

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 pt-28">
        <h1 className="text-3xl md:text-4xl font-black mb-2">NYC Renter Guides</h1>
        <p className="text-[var(--text-secondary)] mb-8 max-w-3xl">
          Checklists and walkthrough tips you can use on a tour. with photos and tables included.
        </p>

        {/* Search Box */}
        <div className="mb-6">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={20} />
            <input
              type="text"
              placeholder="Search articles by title or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          {searchQuery && (
            <p className="text-sm text-[var(--text-muted)] mt-2">
              Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} matching "{searchQuery}"
            </p>
          )}
        </div>

        {/* Tag Filter */}
        {allPosts.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            <Link
              href="/blog"
              className={`px-3 py-1 rounded-full border border-[var(--border-primary)] text-xs transition ${!activeTag ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'}`}
            >
              All
            </Link>
            {Array.from(new Set(allPosts.flatMap((p) => p.tags || []))).sort().map((t) => (
              <Link
                key={t}
                href={`/blog?tag=${encodeURIComponent(t)}`}
                className={`px-3 py-1 rounded-full border border-[var(--border-primary)] text-xs transition ${activeTag === t ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'}`}
              >
                {t}
              </Link>
            ))}
          </div>
        )}

        {/* Articles Grid */}
        {shown.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="card overflow-hidden hover:translate-y-[-2px] transition group"
              >
                {p.featuredImage ? (
                  <div className="aspect-[16/9] w-full overflow-hidden bg-[var(--bg-secondary)]">
                    <img
                      src={p.featuredImage}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/9] w-full bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-emerald-500/10" />
                )}
                <div className="p-5">
                  <h2 className="font-bold leading-snug mb-2 group-hover:text-blue-400 transition">{p.title}</h2>
                  <div className="text-xs text-[var(--text-muted)] mb-2">
                    {p.dateISO ? new Date(p.dateISO).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : ''}
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[var(--text-muted)]">No articles found matching your search.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && !searchQuery && (
          <div className="flex items-center justify-center gap-3 mt-10">
            <Link
              href={`/blog?page=${Math.max(1, page - 1)}${activeTag ? `&tag=${encodeURIComponent(activeTag)}` : ''}`}
              className={`px-4 py-2 rounded-xl border border-[var(--border-primary)] text-sm transition ${page <= 1 ? 'opacity-40 pointer-events-none' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'}`}
            >
              Prev
            </Link>
            <div className="text-sm text-[var(--text-muted)]">
              Page {page} of {totalPages}
            </div>
            <Link
              href={`/blog?page=${Math.min(totalPages, page + 1)}${activeTag ? `&tag=${encodeURIComponent(activeTag)}` : ''}`}
              className={`px-4 py-2 rounded-xl border border-[var(--border-primary)] text-sm transition ${page >= totalPages ? 'opacity-40 pointer-events-none' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'}`}
            >
              Next
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
