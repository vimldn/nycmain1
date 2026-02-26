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
 * Splits HTML after the Nth closing </p>.
 * If there are fewer than N paragraphs, returns [html, ""] so the banner can still render after the content.
 */
function splitHtmlAfterNthParagraph(html: string, n: number): { beforeHtml: string; afterHtml: string } {
  const re = /<\/p\s*>/gi
  let match: RegExpExecArray | null
  let count = 0
  let cutIndex = -1

  while ((match = re.exec(html)) !== null) {
    count += 1
    if (count === n) {
      cutIndex = re.lastIndex // index right AFTER the Nth </p>
      break
    }
  }

  if (cutIndex === -1) {
    return { beforeHtml: html, afterHtml: '' }
  }

  return {
    beforeHtml: html.slice(0, cutIndex),
    afterHtml: html.slice(cutIndex),
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) return notFound()

  const faqs = extractFaqsFromHtml(post.html)

  // Place banner AFTER the 2nd paragraph in the post HTML
  const { beforeHtml, afterHtml } = splitHtmlAfterNthParagraph(post.html, 2)

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

            {/* Post content with banner injected after 2nd paragraph */}
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
