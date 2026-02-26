import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { getPostBySlug, extractFaqsFromHtml } from '@/lib/blog-utils'
import { allRawPosts } from '@/content/blog'
import BlogSidebar from '@/components/BlogSidebar'
import BlogServiceLinks from '@/components/BlogServiceLinks'
import ViolationsLookupBanner from '@/components/ViolationsLookupBanner'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FaqJsonLd } from '@/components/seo'

export async function generateStaticParams() {
  return allRawPosts.map((p) => ({ slug: p.folder }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.metaTitle || `${post.title} | Building Health X`,
    description: post.metaDescription || post.excerpt,
  }
}

/**
 * Insert banner after the first H2 "intro content" but BEFORE the first H3 under that H2.
 *
 * Implementation:
 * 1) Find the first <h2 ...>...</h2>
 * 2) From right after that </h2>, find the first <h3 ...>
 *    - If found: split BEFORE that <h3>
 *    - Else: split BEFORE the next <h2 ...> (if any)
 *    - Else: banner goes at the end
 */
function splitHtmlAfterFirstH2BeforeFirstH3(html: string): { beforeHtml: string; afterHtml: string } {
  // 1) Find first <h2 ...>
  const h2OpenRe = /<h2\b[^>]*>/i
  const h2Open = h2OpenRe.exec(html)
  if (!h2Open || h2Open.index == null) return { beforeHtml: html, afterHtml: '' }

  // 2) Find the closing </h2> that corresponds to that first H2 (good enough for generated blog HTML)
  const afterH2Open = html.slice(h2Open.index)
  const h2CloseRe = /<\/h2\s*>/i
  const h2Close = h2CloseRe.exec(afterH2Open)
  if (!h2Close || h2Close.index == null) return { beforeHtml: html, afterHtml: '' }

  const afterFirstH2Index = h2Open.index + h2Close.index + h2Close[0].length
  const rest = html.slice(afterFirstH2Index)

  // Find first <h3 ...> after the first H2
  const h3Re = /<h3\b[^>]*>/i
  const h3Match = h3Re.exec(rest)
  const h3Idx = h3Match && h3Match.index != null ? afterFirstH2Index + h3Match.index : -1

  // Fallback: find next <h2 ...> (i.e., start of the next major section)
  const h2NextRe = /<h2\b[^>]*>/i
  const h2NextMatch = h2NextRe.exec(rest)
  const h2NextIdx = h2NextMatch && h2NextMatch.index != null ? afterFirstH2Index + h2NextMatch.index : -1

  // Choose earliest valid cut among: first H3, else next H2, else end
  let cutIndex = -1
  if (h3Idx !== -1 && h2NextIdx !== -1) cutIndex = Math.min(h3Idx, h2NextIdx)
  else if (h3Idx !== -1) cutIndex = h3Idx
  else if (h2NextIdx !== -1) cutIndex = h2NextIdx
  else cutIndex = -1

  if (cutIndex === -1) return { beforeHtml: html, afterHtml: '' }
  return { beforeHtml: html.slice(0, cutIndex), afterHtml: html.slice(cutIndex) }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) return notFound()

  const faqs = extractFaqsFromHtml(post.html)

  // Banner after first H2 content, before first H3 under that H2
  const { beforeHtml, afterHtml } = splitHtmlAfterFirstH2BeforeFirstH3(post.html)

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Header />
      <FaqJsonLd faqs={faqs} />

      <article className="max-w-7xl mx-auto px-4 py-10 pt-28">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-6 transition"
        >
          <ChevronLeft size={16} />
          Back to all posts
        </Link>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <h1 className="text-3xl md:text-5xl font-black leading-[1.1] mb-3">{post.title}</h1>
            <div className="text-sm text-[var(--text-muted)] mb-6">
              {post.dateISO
                ? new Date(post.dateISO).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                : ''}
            </div>

            {post.tags && post.tags.length ? (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((t) => (
                  <Link
                    key={t}
                    href={`/blog?tag=${encodeURIComponent(t)}`}
                    className="px-3 py-1 rounded-full border border-[var(--border-primary)] text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition"
                  >
                    {t}
                  </Link>
                ))}
              </div>
            ) : null}

            {post.featuredImage ? (
              <div className="card overflow-hidden mb-7">
                <div className="aspect-[16/9] w-full bg-[var(--bg-secondary)]">
                  <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
            ) : null}

            <div className="blog-content">
              <div dangerouslySetInnerHTML={{ __html: beforeHtml }} />

              <ViolationsLookupBanner
                postSlug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                tags={post.tags || []}
                className="my-7"
              />

              <div dangerouslySetInnerHTML={{ __html: afterHtml }} />
            </div>

            <BlogServiceLinks tags={post.tags || []} postSlug={post.slug} postTitle={post.title} />
          </div>

          <BlogSidebar currentSlug={post.slug} />
        </div>
      </article>

      <Footer />
    </div>
  )
}
