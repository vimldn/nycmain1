// Date-based publishing filter for blog posts
// Add this to your blog page component or getStaticPaths

import { allRawPosts } from '@/content/blog'

/**
 * Filter posts by publish date
 * Posts without publishDate are always shown (existing content)
 * Posts with publishDate only show after that date
 */
export function getPublishedPosts() {
  const now = new Date()
  
  return allRawPosts.filter(post => {
    // If no publishDate, it's already published (existing articles)
    if (!post.publishDate) return true
    
    // Check if publishDate has passed
    const publishDate = new Date(post.publishDate)
    return publishDate <= now
  })
}

/**
 * Use in generateStaticParams to only generate pages for published posts
 */
export async function generateStaticParams() {
  const publishedPosts = getPublishedPosts()
  
  return publishedPosts.map(post => ({
    slug: post.folder
  }))
}

/**
 * Optional: Get scheduled posts count for admin dashboard
 */
export function getScheduledPostsCount() {
  const now = new Date()
  
  return allRawPosts.filter(post => {
    if (!post.publishDate) return false
    const publishDate = new Date(post.publishDate)
    return publishDate > now
  }).length
}

/**
 * Optional: Preview mode - show all posts including scheduled
 * Use when ?preview=true is in URL
 */
export function getAllPosts(includeScheduled = false) {
  if (includeScheduled) {
    return allRawPosts
  }
  return getPublishedPosts()
}
