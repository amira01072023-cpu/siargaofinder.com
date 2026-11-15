-- Drop old SiargaoFinder Jobs tables after Jobs removal.
-- Confirmed empty on 2026-10-01 before preparing this cleanup.
-- Run manually in the Siargao Supabase project SQL editor or through a DB migration tool.

drop table if exists public.jobs cascade;
drop table if exists public.job_posts cascade;
drop table if exists public.job_listings cascade;
drop table if exists public.job_applications cascade;
drop table if exists public.jobseeker_profiles cascade;
drop table if exists public.employer_profiles cascade;
drop table if exists public.employers cascade;
drop table if exists public.companies cascade;
drop table if exists public.candidate_profiles cascade;
drop table if exists public.resumes cascade;
drop table if exists public.cv_uploads cascade;
drop table if exists public.saved_jobs cascade;
drop table if exists public.job_alerts cascade;
