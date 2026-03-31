import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { getPostBySlug, extractFaqsFromHtml } from '@/lib/blog-utils'
import { allRawPosts } from '@/content/blog'
import BlogSidebar from '@/components/BlogSidebar'
import BlogServiceLinks from '@/components/BlogServiceLinks'
import ViolationsLookupBanner from '@/components/ViolationsLookupBanner'
import ServiceBanner from '@/components/ServiceBanner'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FaqJsonLd, ArticleJsonLd } from '@/components/seo'
import { getRelevantService } from '@/lib/service-matcher'

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
 */
function splitHtmlAfterFirstH2BeforeFirstH3(html: string): { beforeHtml: string; afterHtml: string } {
  const h2OpenRe = /<h2\b[^>]*>/i
  const h2Open = h2OpenRe.exec(html)
  if (!h2Open || h2Open.index == null) return { beforeHtml: html, afterHtml: '' }

  const afterH2Open = html.slice(h2Open.index)
  const h2CloseRe = /<\/h2\s*>/i
  const h2Close = h2CloseRe.exec(afterH2Open)
  if (!h2Close || h2Close.index == null) return { beforeHtml: html, afterHtml: '' }

  const afterFirstH2Index = h2Open.index + h2Close.index + h2Close[0].length
  const rest = html.slice(afterFirstH2Index)

  const h3Re = /<h3\b[^>]*>/i
  const h3Match = h3Re.exec(rest)
  const h3Idx = h3Match && h3Match.index != null ? afterFirstH2Index + h3Match.index : -1

  const h2NextRe = /<h2\b[^>]*>/i
  const h2NextMatch = h2NextRe.exec(rest)
  const h2NextIdx = h2NextMatch && h2NextMatch.index != null ? afterFirstH2Index + h2NextMatch.index : -1

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
  const { beforeHtml, afterHtml } = splitHtmlAfterFirstH2BeforeFirstH3(post.html)

  // Pick a service banner if the post relates to one of our 16 services,
  // otherwise fall back to the ViolationsLookupBanner
  const matchedService = getRelevantService(post.title, post.slug, post.tags || [], post.excerpt)

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Header />
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        headline={post.title}
        url={`/blog/${params.slug}`}
        description={post.metaDescription || post.excerpt}
        datePublished={post.dateISO}
        dateModified={post.dateISO}
        imageUrl={post.featuredImage}
      />

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
                    className="px-3 py-1  border border-[var(--border-primary)] text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition"
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

              {matchedService ? (
                <ServiceBanner service={matchedService} className="my-7" />
              ) : (
                <ViolationsLookupBanner
                  postSlug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  tags={post.tags || []}
                  className="my-7"
                />
              )}

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
