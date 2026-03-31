-- Run this once in your Supabase SQL editor to enable ACRIS caching.
-- The API route will work without this (falls back to Next.js fetch cache),
-- but adding this table gives you persistent 48hr caching across deploys.

create table if not exists acris_cache (
  bbl          text primary key,
  payload      jsonb not null,
  refreshed_at timestamptz not null default now()
);

-- Optional: auto-delete stale rows older than 7 days
create index if not exists acris_cache_refreshed on acris_cache (refreshed_at);
