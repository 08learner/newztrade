// Content read adapter — the single async read path for all NewzTrade pages.
// Reads from the connected Supabase project; on any failure (or missing env),
// falls back to the bundled demo source in lib/data.ts so the site never blanks.
// Page/component code consumes the async getters below and never touches the
// database client directly.

import { cache } from "react"
import { createClient } from "@supabase/supabase-js"
import { getSupabasePublicEnv } from "@/lib/supabase/env"
import {
  allArticles as fallbackArticles,
  instruments as fallbackInstruments,
  tickerQuotes as fallbackQuotes,
  glossaryTerms as fallbackGlossary,
  marketEvents as fallbackEvents,
  type Article,
  type Category,
  type GlossaryTerm,
  type Instrument,
  type MarketEvent,
  type MarketEventType,
  type Quote,
} from "@/lib/data"
import { buildDigests, type Digest } from "@/lib/digest"

export interface SiteContent {
  articles: Article[]
  instruments: Instrument[]
  tickerQuotes: Quote[]
  glossaryTerms: GlossaryTerm[]
  marketEvents: MarketEvent[]
  digests: Digest[]
  source: "supabase" | "fallback"
}

function fallbackContent(): SiteContent {
  const ctx = { allArticles: fallbackArticles, tickerQuotes: fallbackQuotes }
  return {
    articles: fallbackArticles,
    instruments: fallbackInstruments,
    tickerQuotes: fallbackQuotes,
    glossaryTerms: fallbackGlossary,
    marketEvents: fallbackEvents,
    digests: buildDigests(ctx),
    source: "fallback",
  }
}

interface ArticleRow {
  slug: string
  title: string
  excerpt: string
  body: string
  category: string
  source: string
  author: string
  published_at: string
  read_minutes: number
  image: string
  featured: boolean
  sort_order: number
}

interface InstrumentRow {
  slug: string
  symbol: string
  name: string
  market: string
  price: string
  change_pct: number
  blurb: string
  keywords: string[]
  sort_order: number
}

interface QuoteRow {
  symbol: string
  name: string
  price: string
  change_pct: number
  sort_order: number
}

interface GlossaryRow {
  slug: string
  term: string
  definition: string
  body: string
  keywords: string[]
  sort_order: number
}

interface EventRow {
  id: number
  date: string
  type: MarketEventType
  title: string
  description: string
}

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const env = getSupabasePublicEnv()
  if (!env.configured) return fallbackContent()

  try {
    const supabase = createClient(env.url!, env.key!, {
      auth: { persistSession: false, autoRefreshToken: false },
    })

    // Never let a slow database hang a page render — fall back to bundled
    // content after a bounded wait.
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("content fetch timeout")), 3500)
    )

    const [articles, instruments, quotes, glossary, events] = await Promise.race([
      Promise.all([
      supabase.from("articles").select("*").order("sort_order"),
      supabase.from("instruments").select("*").order("sort_order"),
      supabase.from("ticker_quotes").select("*").order("sort_order"),
      supabase.from("glossary_terms").select("*").order("sort_order"),
      supabase.from("market_events").select("*").order("date"),
      ]),
      timeout,
    ])

    const anyError =
      articles.error || instruments.error || quotes.error || glossary.error || events.error
    const empty =
      !articles.data?.length ||
      !instruments.data?.length ||
      !quotes.data?.length ||
      !glossary.data?.length

    if (anyError || empty) return fallbackContent()

    const mappedArticles: Article[] = (articles.data as ArticleRow[]).map((r) => ({
      id: r.slug,
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt,
      body: r.body,
      category: r.category as Category,
      source: r.source,
      author: r.author,
      publishedAt: r.published_at,
      readMinutes: r.read_minutes,
      image: r.image,
    }))

    const mappedInstruments: Instrument[] = (instruments.data as InstrumentRow[]).map(
      (r) => ({
        slug: r.slug,
        symbol: r.symbol,
        name: r.name,
        market: r.market as Instrument["market"],
        price: r.price,
        changePct: Number(r.change_pct),
        blurb: r.blurb,
        keywords: r.keywords ?? [],
      })
    )

    const mappedQuotes: Quote[] = (quotes.data as QuoteRow[]).map((r) => ({
      symbol: r.symbol,
      name: r.name,
      price: r.price,
      changePct: Number(r.change_pct),
    }))

    const mappedGlossary: GlossaryTerm[] = (glossary.data as GlossaryRow[]).map((r) => ({
      slug: r.slug,
      term: r.term,
      definition: r.definition,
      body: r.body,
      keywords: r.keywords ?? [],
    }))

    const mappedEvents: MarketEvent[] = ((events.data ?? []) as EventRow[]).map((r) => ({
      date: r.date,
      type: r.type,
      title: r.title,
      description: r.description,
    }))

    return {
      articles: mappedArticles,
      instruments: mappedInstruments,
      tickerQuotes: mappedQuotes,
      glossaryTerms: mappedGlossary,
      marketEvents: mappedEvents,
      digests: buildDigests({
        allArticles: mappedArticles,
        tickerQuotes: mappedQuotes,
      }),
      source: "supabase",
    }
  } catch {
    return fallbackContent()
  }
})

// ---------------------------------------------------------------------------
// NEPSE listed-company directory (649 real securities seeded from the live
// NEPSE API into public.nepse_companies). Separate from getSiteContent so its
// fallback invariants stay untouched; an unreachable/missing table yields [].
// ---------------------------------------------------------------------------

export interface NepseCompany {
  symbol: string
  companyName: string
  sectorName: string
  instrumentType: string
  status: string
}

interface NepseCompanyRow {
  symbol: string
  company_name: string
  sector_name: string
  instrument_type: string
  status: string
}

export const getNepseCompanies = cache(async (): Promise<NepseCompany[]> => {
  const env = getSupabasePublicEnv()
  if (!env.configured) return []
  try {
    const supabase = createClient(env.url!, env.key!, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("nepse_companies fetch timeout")), 3500)
    )
    const { data, error } = await Promise.race([
      supabase.from("nepse_companies").select("*").order("sort_order"),
      timeout,
    ])
    if (error || !data?.length) return []
    return (data as NepseCompanyRow[]).map((r) => ({
      symbol: r.symbol,
      companyName: r.company_name,
      sectorName: r.sector_name,
      instrumentType: r.instrument_type,
      status: r.status,
    }))
  } catch {
    return []
  }
})

// ---------------------------------------------------------------------------
// Async getters consumed by pages and server components.
// ---------------------------------------------------------------------------

export async function getArticles(): Promise<Article[]> {
  return (await getSiteContent()).articles
}

export async function getFeaturedArticle(): Promise<Article | undefined> {
  const { articles } = await getSiteContent()
  return articles[0]
}

export async function getArticleBySlugAsync(slug: string): Promise<Article | undefined> {
  const { articles } = await getSiteContent()
  return articles.find((a) => a.slug === slug)
}

export async function getArticlesByCategoryAsync(category: Category): Promise<Article[]> {
  const { articles } = await getSiteContent()
  return articles
    .filter((a) => a.category === category)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export async function getInstruments(): Promise<Instrument[]> {
  return (await getSiteContent()).instruments
}

export async function getInstrumentBySlugAsync(
  slug: string
): Promise<Instrument | undefined> {
  const { instruments } = await getSiteContent()
  return instruments.find((i) => i.slug === slug)
}

export async function getInstrumentBySymbolAsync(
  symbol: string
): Promise<Instrument | undefined> {
  const { instruments } = await getSiteContent()
  return instruments.find((i) => i.symbol === symbol)
}

export async function getTickerQuotes(): Promise<Quote[]> {
  return (await getSiteContent()).tickerQuotes
}

export async function getGlossaryTerms(): Promise<GlossaryTerm[]> {
  return (await getSiteContent()).glossaryTerms
}

export async function getGlossaryTermBySlugAsync(
  slug: string
): Promise<GlossaryTerm | undefined> {
  const { glossaryTerms } = await getSiteContent()
  return glossaryTerms.find((t) => t.slug === slug)
}

export async function getMarketEvents(): Promise<MarketEvent[]> {
  return (await getSiteContent()).marketEvents
}

export async function getDigests(): Promise<Digest[]> {
  return (await getSiteContent()).digests
}

export async function getCurrentDigests(): Promise<Digest[]> {
  const { digests } = await getSiteContent()
  const latest = digests.reduce(
    (max, d) => Math.max(max, new Date(d.publishedAt).getTime()),
    0
  )
  return digests.filter((d) => new Date(d.publishedAt).getTime() === latest)
}

export async function getDigestBySlugAsync(slug: string): Promise<Digest | undefined> {
  const { digests } = await getSiteContent()
  return digests.find((d) => d.slug === slug)
}

/** Articles whose text mentions the instrument's name or keywords. */
export async function getRelatedArticlesAsync(
  instrument: Instrument
): Promise<Article[]> {
  const { articles } = await getSiteContent()
  const terms = [
    instrument.name.toLowerCase(),
    instrument.symbol.toLowerCase(),
    ...instrument.keywords.map((k) => k.toLowerCase()),
  ]
  return articles.filter((a) => {
    const haystack = `${a.title} ${a.excerpt} ${a.body}`.toLowerCase()
    return terms.some((t) => haystack.includes(t))
  })
}

/** Deterministic "most read" demo ranking — stable across builds. */
export async function getTrendingArticlesAsync(
  excludeSlug?: string,
  count = 5
): Promise<Article[]> {
  const { articles } = await getSiteContent()
  const score = (slug: string) => {
    let s = 7
    for (const ch of slug) s = (s * 31 + ch.charCodeAt(0)) % 10007
    return s
  }
  return articles
    .filter((a) => a.slug !== excludeSlug)
    .map((a) => ({ a, s: score(a.slug) }))
    .sort((x, y) => y.s - x.s)
    .slice(0, count)
    .map(({ a }) => a)
}

export interface SiteSearchResults {
  articles: Article[]
  instruments: Instrument[]
  glossary: GlossaryTerm[]
  digests: Digest[]
}

/** Case-insensitive search across articles, instruments, glossary and digests. */
export async function searchSite(query: string): Promise<SiteSearchResults> {
  const q = query.trim().toLowerCase()
  const empty: SiteSearchResults = { articles: [], instruments: [], glossary: [], digests: [] }
  if (!q) return empty
  const { articles, instruments, glossaryTerms, digests } = await getSiteContent()
  const matches = (text: string) => text.toLowerCase().includes(q)
  return {
    articles: articles.filter(
      (a) =>
        matches(a.title) ||
        matches(a.excerpt) ||
        matches(a.category) ||
        matches(a.author) ||
        matches(a.body)
    ),
    instruments: instruments.filter(
      (i) =>
        matches(i.symbol) ||
        matches(i.name) ||
        matches(i.market) ||
        i.keywords.some((k) => matches(k))
    ),
    glossary: glossaryTerms.filter(
      (t) => matches(t.term) || matches(t.definition) || t.keywords.some((k) => matches(k))
    ),
    digests: digests.filter((d) =>
      matches(`${d.title} ${d.summary.join(" ")} ${d.keywords.join(" ")}`)
    ),
  }
}
