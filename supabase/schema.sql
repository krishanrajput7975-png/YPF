-- NGO Management System - Supabase schema
-- Paste this into Supabase SQL editor.

-- Extensions
create extension if not exists pgcrypto;

-- Status enum
do $$ begin
  create type public.member_status as enum ('pending', 'approved');
exception
  when duplicate_object then null;
end $$;

-- Members
create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  father_name text,
  dob date,
  designation text,
  area text,
  district text,
  state text,
  mobile text not null,
  blood_group text,
  photo_url text,
  status public.member_status not null default 'pending',
  created_at timestamptz not null default now()
);

create index if not exists members_created_at_idx on public.members (created_at desc);
create index if not exists members_mobile_idx on public.members (mobile);
create index if not exists members_area_idx on public.members (area);

-- CMS content (key-value)
create table if not exists public.content (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- News updates
create table if not exists public.news_updates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  image text,
  date date not null default current_date,
  created_at timestamptz not null default now()
);

create index if not exists news_updates_date_idx on public.news_updates (date desc);

-- Contact messages
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at desc);

-- RLS
alter table public.members enable row level security;
alter table public.content enable row level security;
alter table public.news_updates enable row level security;
alter table public.contact_messages enable row level security;

-- Policies
-- Public can insert member applications
do $$ begin
  create policy "public_insert_members" on public.members
    for insert to anon, authenticated
    with check (true);
exception
  when duplicate_object then null;
end $$;

-- Public can read approved members for verification (and admins will have full access)
do $$ begin
  create policy "public_select_approved_members" on public.members
    for select to anon, authenticated
    using (status = 'approved');
exception
  when duplicate_object then null;
end $$;

-- Content and news: public read
do $$ begin
  create policy "public_select_content" on public.content
    for select to anon, authenticated
    using (true);
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create policy "public_select_news_updates" on public.news_updates
    for select to anon, authenticated
    using (true);
exception
  when duplicate_object then null;
end $$;

-- Public can submit contact messages
do $$ begin
  create policy "public_insert_contact_messages" on public.contact_messages
    for insert to anon, authenticated
    with check (true);
exception
  when duplicate_object then null;
end $$;

-- Admin/CMS can read/manage messages via service role
do $$ begin
  create policy "service_role_manage_contact_messages" on public.contact_messages
    for all to service_role
    using (true)
    with check (true);
exception
  when duplicate_object then null;
end $$;

-- Admin-only write: easiest approach is to allow only authenticated and check a JWT claim/role later.
-- For now, restrict write access to authenticated users only (tighten after admin role strategy chosen).
do $$ begin
  create policy "auth_write_content" on public.content
    for all to authenticated
    using (true)
    with check (true);
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create policy "auth_write_news_updates" on public.news_updates
    for all to authenticated
    using (true)
    with check (true);
exception
  when duplicate_object then null;
end $$;

-- NOTE: For members approval/edit/delete, we'll do policies based on admin role in Phase B.

-- Storage
-- A single bucket for all site assets uploaded from CMS (carousel, gallery, branding).
insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do nothing;

-- Allow public read of the bucket objects (images are used on the public website)
-- Note: storage.objects policies are in the storage schema.

do $$ begin
  create policy "public_read_site_media" on storage.objects
    for select to public
    using (bucket_id = 'site-media');
exception
  when duplicate_object then null;
end $$;

-- Allow only service role to write/delete in the bucket.
-- (CMS uses server-side service role key; no Supabase Auth sign-in needed.)
do $$ begin
  create policy "service_role_write_site_media" on storage.objects
    for insert to service_role
    with check (bucket_id = 'site-media');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create policy "service_role_delete_site_media" on storage.objects
    for delete to service_role
    using (bucket_id = 'site-media');
exception
  when duplicate_object then null;
end $$;

-- Tighten CMS writes: only service role can modify content/news.
-- Public can still read; members insert stays public.
drop policy if exists "auth_write_content" on public.content;
drop policy if exists "auth_write_news_updates" on public.news_updates;

do $$ begin
  create policy "service_role_write_content" on public.content
    for all to service_role
    using (true)
    with check (true);
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create policy "service_role_write_news_updates" on public.news_updates
    for all to service_role
    using (true)
    with check (true);
exception
  when duplicate_object then null;
end $$;
