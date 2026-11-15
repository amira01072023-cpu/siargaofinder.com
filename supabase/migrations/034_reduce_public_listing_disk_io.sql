-- Reduce Disk IO from public directory browsing and lightweight analytics.
-- Run during a quiet traffic window from the Siargao Supabase project.

create extension if not exists pg_trgm;

do $$
begin
  if to_regclass('public.business_listings') is not null
    and exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = 'business_listings'
        and column_name = 'municipality'
    )
    and exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = 'business_listings'
        and column_name = 'id'
    ) then
    create index if not exists idx_business_listings_municipality_id_desc
    on public.business_listings (municipality, id desc);
  end if;

  if to_regclass('public.business_listings') is not null
    and exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = 'business_listings'
        and column_name = 'category'
    )
    and exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = 'business_listings'
        and column_name = 'id'
    ) then
    create index if not exists idx_business_listings_category_id_desc
    on public.business_listings (category, id desc);
  end if;

  if to_regclass('public.business_listings') is not null
    and exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = 'business_listings'
        and column_name = 'listing_score'
    )
    and exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = 'business_listings'
        and column_name = 'id'
    ) then
    create index if not exists idx_business_listings_score_id_desc
    on public.business_listings (listing_score desc, id desc)
    where listing_score is not null;
  end if;

  if to_regclass('public.business_listings') is not null
    and exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = 'business_listings'
        and column_name = 'business_name'
    ) then
    create index if not exists idx_business_listings_name_trgm
    on public.business_listings
    using gin (business_name gin_trgm_ops);
  end if;

  if to_regclass('public.business_listings') is not null
    and exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = 'business_listings'
        and column_name = 'category'
    ) then
    create index if not exists idx_business_listings_category_trgm
    on public.business_listings
    using gin (category gin_trgm_ops);
  end if;

  if to_regclass('public.business_listings') is not null
    and exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = 'business_listings'
        and column_name = 'municipality'
    ) then
    create index if not exists idx_business_listings_municipality_trgm
    on public.business_listings
    using gin (municipality gin_trgm_ops);
  end if;
end $$;

do $$
begin
  if to_regclass('public.site_visits') is not null
    and exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'site_visits'
      and column_name = 'created_at'
  ) then
    create index if not exists idx_site_visits_created_at
    on public.site_visits (created_at desc);
  end if;

  if to_regclass('public.site_visits') is not null
    and exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = 'site_visits'
        and column_name = 'path'
    )
    and exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = 'site_visits'
        and column_name = 'created_at'
    ) then
    create index if not exists idx_site_visits_path_created_at
    on public.site_visits (path, created_at desc);
  end if;
end $$;
