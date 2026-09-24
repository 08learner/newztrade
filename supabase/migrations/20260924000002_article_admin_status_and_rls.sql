-- Admin publishing workflow: draft/published status + owner-only write access.
-- Public readers keep reading published articles only; the authenticated editor
-- (Supabase Auth email/password) can read, insert, update and delete everything.

alter table public.articles
  add column if not exists status text not null default 'published';

alter table public.articles
  drop constraint if exists articles_status_check;
alter table public.articles
  add constraint articles_status_check check (status in ('draft', 'published'));

-- Existing rows become published by the default above; make it explicit.
update public.articles set status = 'published' where status is null;

-- Replace the wide-open public read with published-only visibility.
drop policy if exists "articles are publicly readable" on public.articles;

create policy "published articles are publicly readable"
  on public.articles for select
  using (status = 'published');

create policy "authenticated users can read all articles"
  on public.articles for select to authenticated
  using (true);

create policy "authenticated users can insert articles"
  on public.articles for insert to authenticated
  with check (true);

create policy "authenticated users can update articles"
  on public.articles for update to authenticated
  using (true) with check (true);

create policy "authenticated users can delete articles"
  on public.articles for delete to authenticated
  using (true);
