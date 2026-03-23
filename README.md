# BHX Press Patch — Integration Guide

## Files included

| File | Action |
|---|---|
| `components/AsSeenIn.tsx` | NEW — drop into `/components/` |
| `components/Footer.tsx` | REPLACE — adds "Press" link to Resources nav |
| `app/press/page.tsx` | NEW — drop into `/app/press/` |
| `content/blog/pressLaunch.ts` | NEW — drop into `/content/blog/` |
| `content/blog/index.ts` | REPLACE — adds `pressLaunch` to `allRawPosts` |

## One manual step: Add AsSeenIn to homepage

In `app/page.tsx`, add the import at the top:

```tsx
import AsSeenIn from '@/components/AsSeenIn'
```

Then insert `<AsSeenIn />` between the hero `</section>` closing tag
and the next section ("What You'll Find"). Look for this comment:

```tsx
      {/* Everything below is unchanged */}
```

Add just above it:

```tsx
      <AsSeenIn />
```

That's it. The strip renders between the hero and the first content section.
