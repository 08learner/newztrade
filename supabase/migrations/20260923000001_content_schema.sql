-- NewzTrade content schema: public read-only content tables.
-- The site is fully public; the app never writes. Operator edits happen in
-- Supabase directly, so RLS grants SELECT to everyone and nothing else.

create table if not exists public.articles (
  slug text primary key,
  title text not null,
  excerpt text not null,
  body text not null,
  category text not null,
  source text not null,
  author text not null,
  published_at timestamptz not null,
  read_minutes integer not null,
  image text not null,
  featured boolean not null default false,
  sort_order integer not null default 0
);

create table if not exists public.instruments (
  slug text primary key,
  symbol text not null,
  name text not null,
  market text not null,
  price text not null,
  change_pct numeric not null,
  blurb text not null,
  keywords text[] not null default '{}',
  sort_order integer not null default 0
);

create table if not exists public.ticker_quotes (
  symbol text primary key,
  name text not null,
  price text not null,
  change_pct numeric not null,
  sort_order integer not null default 0
);

create table if not exists public.glossary_terms (
  slug text primary key,
  term text not null,
  definition text not null,
  body text not null,
  keywords text[] not null default '{}',
  sort_order integer not null default 0
);

create table if not exists public.market_events (
  id bigint generated always as identity primary key,
  date date not null,
  type text not null check (type in ('Earnings', 'Holiday', 'Macro', 'IPO')),
  title text not null,
  description text not null
);

alter table public.articles enable row level security;
alter table public.instruments enable row level security;
alter table public.ticker_quotes enable row level security;
alter table public.glossary_terms enable row level security;
alter table public.market_events enable row level security;

create policy "articles are publicly readable"
  on public.articles for select using (true);
create policy "instruments are publicly readable"
  on public.instruments for select using (true);
create policy "ticker quotes are publicly readable"
  on public.ticker_quotes for select using (true);
create policy "glossary terms are publicly readable"
  on public.glossary_terms for select using (true);
create policy "market events are publicly readable"
  on public.market_events for select using (true);
