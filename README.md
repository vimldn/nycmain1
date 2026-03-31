# ACRIS Financial Health — Deployment Package

Drop these files into your project root. Nothing else needs to change.

## Files

| File | Action |
|------|--------|
| `app/api/acris/[bbl]/route.ts` | NEW — standalone ACRIS API route |
| `components/ACRISPanel.tsx` | NEW — self-contained financial health component |
| `app/building/[bbl]/page.tsx` | MODIFIED — two lines added (import + `<ACRISPanel bbl={bbl} />`) |
| `supabase_migration.sql` | RUN ONCE in Supabase SQL editor (optional but recommended) |

## Environment variables

No API key required. ACRIS is fully public via NYC Open Data.

Add to `.env.local` (or Vercel project settings):

```
# Optional — raises rate limit from 1,000/hr to effectively unlimited.
# Get a free token at: https://data.cityofnewyork.us/profile/app_tokens
NYC_OPEN_DATA_APP_TOKEN=your_token_here
```

## Supabase cache table (optional)

Run `supabase_migration.sql` once in your Supabase SQL editor.
Without it the route still works — Next.js fetch cache is used as fallback.
With it you get persistent 48hr caching across deploys.
