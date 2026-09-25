-- Newsletter subscriber capture.
-- Anyone may subscribe (INSERT); only the signed-in editor may read the list.

create table public.newsletter_subscribers (
  id bigint generated always as identity primary key,
  email text not null,
  source text not null default 'site',
  created_at timestamptz not null default now()
);

-- Case-insensitive uniqueness so 'A@x.com' and 'a@x.com' are one subscriber.
create unique index newsletter_subscribers_email_key
  on public.newsletter_subscribers (lower(email));

alter table public.newsletter_subscribers enable row level security;

-- Public subscription: insert only, no read-back of anyone else's email.
create policy "anyone can subscribe"
  on public.newsletter_subscribers for insert
  to anon, authenticated
  with check (true);

-- Only the editor session can read subscriber rows (admin count/list).
create policy "authenticated users can read subscribers"
  on public.newsletter_subscribers for select
  to authenticated
  using (true);
