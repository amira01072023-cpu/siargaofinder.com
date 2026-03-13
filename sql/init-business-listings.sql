-- Run in Siargao Supabase SQL Editor

create table if not exists public.business_listings (
  id bigint primary key,
  business_name text,
  category text,
  emirate text,
  city text,
  address text,
  phone text,
  email text,
  website_url text,
  source_url text,
  source_name text,
  last_verified_at timestamptz,
  created_at timestamptz,
  services text
);

alter table public.business_listings enable row level security;

drop policy if exists "public read business listings" on public.business_listings;
create policy "public read business listings"
on public.business_listings
for select
to anon, authenticated
using (true);
