-- TRS BVM website — online content storage.
-- Run this ONCE in Supabase: Dashboard -> SQL Editor -> New query -> paste -> Run.

-- 1. The content table: a single row (id = 1) holding all the website's content as JSON.
create table if not exists public.site_content (
  id integer primary key default 1 check (id = 1),
  data jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by text
);

alter table public.site_content enable row level security;

-- Everyone (the public website) may READ the content.
drop policy if exists "Anyone can read the site content" on public.site_content;
create policy "Anyone can read the site content"
  on public.site_content for select to anon, authenticated using (true);

-- Only signed-in admins may CHANGE it. Keep "Allow new users to sign up" switched OFF in
-- Authentication -> Providers -> Email, so the only accounts that exist are the ones you create.
drop policy if exists "Admins can add content" on public.site_content;
create policy "Admins can add content"
  on public.site_content for insert to authenticated with check (true);

drop policy if exists "Admins can update content" on public.site_content;
create policy "Admins can update content"
  on public.site_content for update to authenticated using (true) with check (true);

-- 2. The photo / video storage bucket (public to view, admins only to upload).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'uploads', 'uploads', true, 52428800,
  array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'video/mp4', 'video/webm', 'video/quicktime']
)
on conflict (id) do update
  set public = true,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Anyone can view uploads" on storage.objects;
create policy "Anyone can view uploads"
  on storage.objects for select using (bucket_id = 'uploads');

drop policy if exists "Admins can upload files" on storage.objects;
create policy "Admins can upload files"
  on storage.objects for insert to authenticated with check (bucket_id = 'uploads');

drop policy if exists "Admins can replace files" on storage.objects;
create policy "Admins can replace files"
  on storage.objects for update to authenticated using (bucket_id = 'uploads');

drop policy if exists "Admins can delete files" on storage.objects;
create policy "Admins can delete files"
  on storage.objects for delete to authenticated using (bucket_id = 'uploads');
